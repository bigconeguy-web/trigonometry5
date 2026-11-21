export function ensureBaseHref(rawHtml: string, baseHref: string): string {
  const safeBase = String(baseHref || '').trim();
  if (!safeBase) return rawHtml || '';

  const baseTagMatch = (rawHtml || '').match(/<base\b([^>]*)>/i);
  if (baseTagMatch) {
    const attrs = baseTagMatch[1] || '';
    const hrefMatch = attrs.match(/\bhref\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/i);
    const existingHref = (hrefMatch ? hrefMatch[1] || hrefMatch[2] || hrefMatch[3] || '' : '').trim();
    // Rewrite broken root-relative or non-HTTP(s) base tags so blob: frames don't resolve assets to blob:/...
    if (/^https?:\/\//i.test(existingHref)) {
      return rawHtml;
    }
    return rawHtml.replace(/<base\b[^>]*>/i, `<base href="${safeBase}">`);
  }

  if (/<head\b[^>]*>/i.test(rawHtml)) {
    return rawHtml.replace(/(<head\b[^>]*>)/i, `$1<base href="${safeBase}">`);
  }
  return `<base href="${safeBase}">${rawHtml}`;
}

export function buildFallbackGameFetchUrls(primaryUrl: string): string[] {
  const url = String(primaryUrl || '').trim();
  if (!url) return [];
  const urls = [url];

  // Rewrite cdn.jsdelivr.net/gh/<owner>/<repo>@<ref>/<path> -> fastly, raw.githubusercontent (bypasses 20MB jsDelivr cap), rawcdn.githack
  const ghCdnMatch = url.match(
    /^https?:\/\/(?:cdn|fastly|gcore)\.jsdelivr\.net\/gh\/([^/]+)\/([^/@]+)(?:@([^/]+))?\/(.+)$/i
  );
  if (ghCdnMatch) {
    const owner = ghCdnMatch[1];
    const repo = ghCdnMatch[2];
    const ref = ghCdnMatch[3] || 'main';
    const path = ghCdnMatch[4];
    const rawPath = path
      .split('/')
      .map((s) => {
        try {
          return encodeURIComponent(decodeURIComponent(s));
        } catch {
          return s;
        }
      })
      .join('/');

    const candidates = [
      `https://fastly.jsdelivr.net/gh/${owner}/${repo}@${ref}/${rawPath}`,
      `https://raw.githubusercontent.com/${owner}/${repo}/${ref}/${rawPath}`,
      `https://rawcdn.githack.com/${owner}/${repo}/${ref}/${rawPath}`
    ];
    for (const c of candidates) {
      if (!urls.includes(c)) urls.push(c);
    }
  }

  return urls;
}

export function buildDirectEmbedUrl(primaryUrl: string): string {
  const url = String(primaryUrl || '').trim();
  const ghCdnMatch = url.match(
    /^https?:\/\/(?:cdn|fastly|gcore)\.jsdelivr\.net\/gh\/([^/]+)\/([^/@]+)(?:@([^/]+))?\/(.+)$/i
  );
  if (ghCdnMatch) {
    const owner = ghCdnMatch[1];
    const repo = ghCdnMatch[2];
    const ref = ghCdnMatch[3] || 'main';
    const path = ghCdnMatch[4];
    // rawcdn.githack serves proper text/html MIME + CORS unlike jsDelivr large-file 403 or raw.githubusercontent text/plain
    return `https://rawcdn.githack.com/${owner}/${repo}/${ref}/${path}`;
  }
  return url;
}

export function getBlobStorageShimTag(): string {
  const scriptBody = `(function(){
    if(window.__gnStorageShimApplied)return;
    window.__gnStorageShimApplied=true;
    function createMemoryStorage(){
      var data=Object.create(null);
      var api={
        getItem:function(k){k=String(k);return Object.prototype.hasOwnProperty.call(data,k)?data[k]:null;},
        setItem:function(k,v){data[String(k)]=String(v);},
        removeItem:function(k){delete data[String(k)];},
        clear:function(){data=Object.create(null);},
        key:function(i){var keys=Object.keys(data);return(i>=0&&i<keys.length)?keys[i]:null;},
        get length(){return Object.keys(data).length;}
      };
      if(typeof Proxy==="function"){
        return new Proxy(api,{
          get:function(target,prop){
            if(prop in target)return target[prop];
            return Object.prototype.hasOwnProperty.call(data,prop)?data[prop]:undefined;
          },
          set:function(target,prop,val){
            if(prop in target){target[prop]=val;return true;}
            data[String(prop)]=String(val);
            return true;
          },
          deleteProperty:function(target,prop){
            delete data[String(prop)];
            return true;
          },
          has:function(target,prop){
            return(prop in target)||Object.prototype.hasOwnProperty.call(data,prop);
          },
          ownKeys:function(){return Object.keys(data);}
        });
      }
      return api;
    }
    ["localStorage","sessionStorage"].forEach(function(prop){
      var blocked=false;
      try{
        var s=window[prop];
        if(!s){blocked=true;}
        else{s.setItem("__gn_test","1");s.removeItem("__gn_test");}
      }catch(e){blocked=true;}
      if(blocked){
        var fallback=createMemoryStorage();
        try{
          Object.defineProperty(window,prop,{configurable:true,get:function(){return fallback;}});
        }catch(err){}
      }
    });
    try{
      void document.cookie;
    }catch(e){
      var cookieJar="";
      try{
        Object.defineProperty(document,"cookie",{
          configurable:true,
          get:function(){return cookieJar;},
          set:function(v){
            var pair=String(v||"").split(";")[0].trim();
            if(pair){cookieJar=cookieJar?(cookieJar+"; "+pair):pair;}
          }
        });
      }catch(err){}
    }
    try{
      if(!window.PokiSDK){
        var ok=function(){return Promise.resolve(true);};
        var noop=function(){};
        window.PokiSDK={init:ok,initWithVideoHB:ok,gameLoadingStart:noop,gameLoadingFinished:noop,gameLoadingProgress:noop,gameplayStart:noop,gameplayStop:noop,happyTime:noop,commercialBreak:ok,rewardedBreak:ok,displayAd:noop,destroyAd:noop,setDebug:noop};
      }
    }catch(e){}
  })();`;
  return '<script data-gn-shim="blob-storage">' + scriptBody + '<' + '/script>';
}

export function getSafePerformanceTag(): string {
  // Never replace requestAnimationFrame or setTimeout loops (breaks Unity, Godot, Construct, and dt physics)
  const scriptBody = `(function(){
    if(window.__gnPerfBoost)return;
    window.__gnPerfBoost=true;
    var nativeGetContext=HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext=function(type,attrs){
      if(type==="webgl"||type==="webgl2"||type==="experimental-webgl"){
        var nextAttrs=Object.assign({},attrs||{},{powerPreference:"high-performance"});
        return nativeGetContext.call(this,type,nextAttrs);
      }
      return nativeGetContext.call(this,type,attrs);
    };
    try{
      Object.defineProperty(document,"hidden",{configurable:true,get:function(){return false;}});
      Object.defineProperty(document,"visibilityState",{configurable:true,get:function(){return "visible";}});
    }catch(e){}
  })();`;
  return '<script data-gn-fps="high-perf">' + scriptBody + '<' + '/script>';
}

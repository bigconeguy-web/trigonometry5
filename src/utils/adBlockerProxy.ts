export const AD_SCRIPT_SRC_BLOCKLIST: RegExp[] = [
  /googlesyndication\.com/i,
  /doubleclick\.net/i,
  /googleadservices\.com/i,
  /imasdk\.googleapis\.com/i,
  /googletagmanager\.com/i,
  /google-analytics\.com/i,
  /adinplay\.com/i,
  /gamemonetize\.com/i,
  /gamedistribution\.com/i,
  /sdk\.poki\.com/i,
  /poki\.com\/.*sdk/i,
  /crazygames\.com/i,
  /cpmstar\.com/i,
  /adnxs\.com/i,
  /criteo\.(com|net)/i,
  /pubmatic\.com/i,
  /taboola\.com/i,
  /outbrain\.com/i,
  /adservice\.google/i,
  /Jump_Gamemonetize\.js/i,
  /(?:^|\/)js\/all\.js(?:[?#]|$)/i,
];

export const INLINE_AD_SCRIPT_PATTERNS: RegExp[] = [
  /window\.dataLayer\s*=/i,
  /googletagmanager\.com\/gtag/i,
  /adsbygoogle\s*=\s*window\.adsbygoogle/i,
  /googlesyndication/i,
  /gamemonetize\.com/i,
  /gamedistribution\.com/i,
  /google_vignette/i,
];

export const AD_BLOCK_PRELUDE_HTML = `<style data-adblock="true">
ins.adsbygoogle,
[data-ad-slot],
[data-ad-client],
[id*="google_ads"],
[class*="ad-rail"],
#ad-rail,
.adsbygoogle,
.ad-container,
.ad-banner {
  display: none !important;
  visibility: hidden !important;
  pointer-events: none !important;
  width: 0 !important;
  height: 0 !important;
}
</style>
<script data-adblock="true">
(function () {
  var noop = function () {};
  var resolved = function (val) { return Promise.resolve(val); };

  // Block popup windows and ad redirects cleanly
  try { window.open = function () { return null; }; } catch (e) {}
  try { window.alert = noop; } catch (e) {}

  // Intercept dynamically injected ad scripts/iframes (e.g. adinplay, googlesyndication, doubleclick)
  var adUrlRe = /googlesyndication\\.com|doubleclick\\.net|googleadservices\\.com|imasdk\\.googleapis\\.com|googletagmanager\\.com|google-analytics\\.com|adinplay\\.com|gamemonetize\\.com|gamedistribution\\.com|sdk\\.poki\\.com|crazygames\\.com|cpmstar\\.com|adnxs\\.com|criteo\\.(com|net)|pubmatic\\.com|taboola\\.com|outbrain\\.com|adservice\\.google/i;
  var isAdEl = function (node) {
    if (!node || !node.tagName) return false;
    var tag = node.tagName.toUpperCase();
    if (tag !== 'SCRIPT' && tag !== 'IFRAME') return false;
    var src = node.getAttribute && (node.getAttribute('src') || node.src);
    return typeof src === 'string' && adUrlRe.test(src);
  };
  var neutralizeAdNode = function (node) {
    if (!isAdEl(node)) return false;
    try { node.setAttribute('type', 'javascript/blocked'); } catch (e) {}
    try { node.removeAttribute('src'); } catch (e) {}
    setTimeout(function () {
      if (typeof node.onload === 'function') { try { node.onload(); } catch (e) {} }
    }, 0);
    return true;
  };
  var origAppend = Node.prototype.appendChild;
  Node.prototype.appendChild = function (child) {
    if (neutralizeAdNode(child)) return child;
    return origAppend.call(this, child);
  };
  var origInsert = Node.prototype.insertBefore;
  Node.prototype.insertBefore = function (child, ref) {
    if (neutralizeAdNode(child)) return child;
    return origInsert.call(this, child, ref);
  };
  var origSetAttr = Element.prototype.setAttribute;
  Element.prototype.setAttribute = function (name, value) {
    if (typeof name === 'string' && name.toLowerCase() === 'src' && typeof value === 'string' && adUrlRe.test(value)) {
      if (this.tagName === 'SCRIPT' || this.tagName === 'IFRAME') return;
    }
    return origSetAttr.call(this, name, value);
  };
  if (typeof window.fetch === 'function') {
    var origFetch = window.fetch;
    window.fetch = function (input, init) {
      var u = typeof input === 'string' ? input : (input && input.url) || '';
      if (typeof u === 'string' && adUrlRe.test(u)) {
        return Promise.resolve(new Response('', { status: 200, statusText: 'OK' }));
      }
      return origFetch.call(this, input, init);
    };
  }

  // Google Analytics / Tag Manager stubs
  window.dataLayer = window.dataLayer || [];
  window.gtag = noop;
  window.ga = noop;

  // Google AdSense / GPT / H5 Games Ads stubs (instant non-blocking adBreak)
  window.adsbygoogle = { push: noop, loaded: true };
  window.googletag = window.googletag || {
    cmd: [],
    pubads: function () {
      return {
        enableSingleRequest: noop,
        collapseEmptyDivs: noop,
        refresh: noop,
        addEventListener: noop,
      };
    },
    enableServices: noop,
    display: noop,
  };
  window.adConfig = noop;
  window.adBreak = function (o) {
    if (o && typeof o.beforeAd === 'function') { try { o.beforeAd(); } catch (e) {} }
    if (o && typeof o.afterAd === 'function') { try { o.afterAd(); } catch (e) {} }
    if (o && typeof o.adBreakDone === 'function') {
      try { o.adBreakDone({ breakStatus: 'dismissed' }); } catch (e) {}
    }
  };

  // GameMonetize / GameDistribution SDK stubs
  window.sdk = {
    showBanner: function () { return resolved(); },
    preloadAd: noop,
  };
  window.gdsdk = {
    showAd: function () { return resolved(); },
    preloadAd: function () { return resolved(); },
  };

  // CrazyGames SDK v2/v3 ad stubs
  window.CrazyGames = window.CrazyGames || {
    SDK: {
      init: function () { return resolved(); },
      ad: {
        requestAd: function (type, cb) {
          if (cb && typeof cb.adFinished === 'function') { try { cb.adFinished(); } catch (e) {} }
        },
        hasAdblock: function () { return resolved(false); },
      },
      game: {
        gameplayStart: noop,
        gameplayStop: noop,
        happytime: noop,
        loadingStart: noop,
        loadingStop: noop,
      },
    },
  };

  // PokiSDK non-blocking fallback (only if not yet defined)
  if (typeof window.PokiSDK === 'undefined') {
    window.PokiSDK = {
      init: function () { return resolved(true); },
      initWithVideoHB: function () { return resolved(true); },
      gameLoadingStart: noop,
      gameLoadingFinished: noop,
      gameLoadingProgress: noop,
      gameplayStart: noop,
      gameplayStop: noop,
      happyTime: noop,
      commercialBreak: function () { return resolved(); },
      rewardedBreak: function () { return resolved(true); },
      displayAd: noop,
      destroyAd: noop,
      setDebug: noop,
    };
  }
})();
</script>`;

export function getBaseHrefDirectory(sourceUrl: string): string {
  const cleanUrl = sourceUrl.split('#')[0].split('?')[0];
  const lastSlash = cleanUrl.lastIndexOf('/');
  if (lastSlash === -1) return `${cleanUrl}/`;
  return cleanUrl.slice(0, lastSlash + 1);
}

export function sanitizeStudyModuleHtml(rawHtml: string, sourceUrl: string): string {
  let html = rawHtml || '';

  // 1. Strip ad rail templates & ins.adsbygoogle blocks
  html = html.replace(/<template\b[^>]*data-ad-rail-template[^>]*>[\s\S]*?<\/template>/gi, '');
  html = html.replace(/<ins\b[^>]*class=["'][^"']*adsbygoogle[^"']*["'][^>]*>[\s\S]*?<\/ins>/gi, '');

  // 2. Strip matching ad iframes
  html = html.replace(/<iframe\b[^>]*src=["']([^"']+)["'][^>]*>[\s\S]*?<\/iframe>/gi, (match, src) => {
    if (AD_SCRIPT_SRC_BLOCKLIST.some((re) => re.test(src))) {
      return '';
    }
    return match;
  });

  // 3. Strip external & inline ad/tracking <script> tags
  html = html.replace(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi, (fullMatch, attrs: string, body: string) => {
    const srcMatch = attrs.match(/\bsrc\s*=\s*["']([^"']+)["']/i);
    if (srcMatch && srcMatch[1]) {
      if (AD_SCRIPT_SRC_BLOCKLIST.some((re) => re.test(srcMatch[1]))) {
        return '';
      }
      return fullMatch;
    }
    if (body && INLINE_AD_SCRIPT_PATTERNS.some((re) => re.test(body))) {
      return '';
    }
    return fullMatch;
  });

  // 4. Preserve existing <base href> if present; otherwise inject <base href="${baseDir}">
  const hasBase = /<base\b[^>]*href=/i.test(html);
  const baseTag = hasBase ? '' : `<base href="${getBaseHrefDirectory(sourceUrl)}">`;
  const injection = `${baseTag}\n${AD_BLOCK_PRELUDE_HTML}\n`;

  if (/<head\b[^>]*>/i.test(html)) {
    // If <base> already exists, insert AD_BLOCK_PRELUDE_HTML right after <base ...> so it stays early in <head>
    if (hasBase) {
      html = html.replace(/(<base\b[^>]*>)/i, `$1\n${AD_BLOCK_PRELUDE_HTML}`);
    } else {
      html = html.replace(/(<head\b[^>]*>)/i, `$1\n${injection}`);
    }
  } else if (/<html\b[^>]*>/i.test(html)) {
    html = html.replace(/(<html\b[^>]*>)/i, `$1\n<head>${injection}</head>`);
  } else {
    html = `<!DOCTYPE html><html><head>${injection}</head><body>${html}</body></html>`;
  }

  return html;
}

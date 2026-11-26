var e=Object.create,t=Object.defineProperty,n=Object.getOwnPropertyDescriptor,r=Object.getOwnPropertyNames,i=Object.getPrototypeOf,a=Object.prototype.hasOwnProperty,o=(e,t)=>()=>(t||(e((t={exports:{}}).exports,t,t.exports),e=null),t.exports),s=(e,i,o,s)=>{if(i&&typeof i==`object`||typeof i==`function`)for(var c=r(i),l=0,u=c.length,d;l<u;l++)d=c[l],!a.call(e,d)&&d!==o&&t(e,d,{get:(e=>i[e]).bind(null,d),enumerable:!(s=n(i,d))||s.enumerable});return e},c=(n,r,o)=>(o=n==null?{}:e(i(n)),s(r||!n||!n.__esModule||!a.call(n,`default`)?t(o,`default`,{value:n,enumerable:!0}):o,n));(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var l=o((e=>{function t(e,t){var n=e.length;e.push(t);a:for(;0<n;){var r=n-1>>>1,a=e[r];if(0<i(a,t))e[r]=t,e[n]=a,n=r;else break a}}function n(e){return e.length===0?null:e[0]}function r(e){if(e.length===0)return null;var t=e[0],n=e.pop();if(n!==t){e[0]=n;a:for(var r=0,a=e.length,o=a>>>1;r<o;){var s=2*(r+1)-1,c=e[s],l=s+1,u=e[l];if(0>i(c,n))l<a&&0>i(u,c)?(e[r]=u,e[l]=n,r=l):(e[r]=c,e[s]=n,r=s);else if(l<a&&0>i(u,n))e[r]=u,e[l]=n,r=l;else break a}}return t}function i(e,t){var n=e.sortIndex-t.sortIndex;return n===0?e.id-t.id:n}if(e.unstable_now=void 0,typeof performance==`object`&&typeof performance.now==`function`){var a=performance;e.unstable_now=function(){return a.now()}}else{var o=Date,s=o.now();e.unstable_now=function(){return o.now()-s}}var c=[],l=[],u=1,d=null,f=3,p=!1,m=!1,h=!1,g=!1,_=typeof setTimeout==`function`?setTimeout:null,v=typeof clearTimeout==`function`?clearTimeout:null,y=typeof setImmediate<`u`?setImmediate:null;function b(e){for(var i=n(l);i!==null;){if(i.callback===null)r(l);else if(i.startTime<=e)r(l),i.sortIndex=i.expirationTime,t(c,i);else break;i=n(l)}}function ee(e){if(h=!1,b(e),!m){if(n(c)!==null)m=!0,te||(te=!0,ie());else{var t=n(l);t!==null&&se(ee,t.startTime-e)}}}var te=!1,x=-1,ne=5,S=-1;function re(){return g?!0:!(e.unstable_now()-S<ne)}function C(){if(g=!1,te){var t=e.unstable_now();S=t;var i=!0;try{a:{m=!1,h&&(h=!1,v(x),x=-1),p=!0;var a=f;try{b:{for(b(t),d=n(c);d!==null&&!(d.expirationTime>t&&re());){var o=d.callback;if(typeof o==`function`){d.callback=null,f=d.priorityLevel;var s=o(d.expirationTime<=t);if(t=e.unstable_now(),typeof s==`function`){d.callback=s,b(t),i=!0;break b}d===n(c)&&r(c),b(t)}else r(c);d=n(c)}if(d!==null)i=!0;else{var u=n(l);u!==null&&se(ee,u.startTime-t),i=!1}}break a}finally{d=null,f=a,p=!1}i=void 0}}finally{i?ie():te=!1}}}var ie;if(typeof y==`function`)ie=function(){y(C)};else if(typeof MessageChannel<`u`){var ae=new MessageChannel,oe=ae.port2;ae.port1.onmessage=C,ie=function(){oe.postMessage(null)}}else ie=function(){_(C,0)};function se(t,n){x=_(function(){t(e.unstable_now())},n)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(e){e.callback=null},e.unstable_forceFrameRate=function(e){0>e||125<e?console.error(`forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported`):ne=0<e?Math.floor(1e3/e):5},e.unstable_getCurrentPriorityLevel=function(){return f},e.unstable_next=function(e){switch(f){case 1:case 2:case 3:var t=3;break;default:t=f}var n=f;f=t;try{return e()}finally{f=n}},e.unstable_requestPaint=function(){g=!0},e.unstable_runWithPriority=function(e,t){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var n=f;f=e;try{return t()}finally{f=n}},e.unstable_scheduleCallback=function(r,i,a){var o=e.unstable_now();switch(typeof a==`object`&&a?(a=a.delay,a=typeof a==`number`&&0<a?o+a:o):a=o,r){case 1:var s=-1;break;case 2:s=250;break;case 5:s=1073741823;break;case 4:s=1e4;break;default:s=5e3}return s=a+s,r={id:u++,callback:i,priorityLevel:r,startTime:a,expirationTime:s,sortIndex:-1},a>o?(r.sortIndex=a,t(l,r),n(c)===null&&r===n(l)&&(h?(v(x),x=-1):h=!0,se(ee,a-o))):(r.sortIndex=s,t(c,r),m||p||(m=!0,te||(te=!0,ie()))),r},e.unstable_shouldYield=re,e.unstable_wrapCallback=function(e){var t=f;return function(){var n=f;f=t;try{return e.apply(this,arguments)}finally{f=n}}}})),u=o(((e,t)=>{t.exports=l()})),d=o((e=>{var t=Symbol.for(`react.transitional.element`),n=Symbol.for(`react.portal`),r=Symbol.for(`react.fragment`),i=Symbol.for(`react.strict_mode`),a=Symbol.for(`react.profiler`),o=Symbol.for(`react.consumer`),s=Symbol.for(`react.context`),c=Symbol.for(`react.forward_ref`),l=Symbol.for(`react.suspense`),u=Symbol.for(`react.memo`),d=Symbol.for(`react.lazy`),f=Symbol.for(`react.activity`),p=Symbol.for(`react.view_transition`),m=Symbol.iterator;function h(e){return typeof e!=`object`||!e?null:(e=m&&e[m]||e[`@@iterator`],typeof e==`function`?e:null)}var g={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},_=Object.assign,v={};function y(e,t,n){this.props=e,this.context=t,this.refs=v,this.updater=n||g}y.prototype.isReactComponent={},y.prototype.setState=function(e,t){if(typeof e!=`object`&&typeof e!=`function`&&e!=null)throw Error(`takes an object of state variables to update or a function which returns an object of state variables.`);this.updater.enqueueSetState(this,e,t,`setState`)},y.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,`forceUpdate`)};function b(){}b.prototype=y.prototype;function ee(e,t,n){this.props=e,this.context=t,this.refs=v,this.updater=n||g}var te=ee.prototype=new b;te.constructor=ee,_(te,y.prototype),te.isPureReactComponent=!0;var x=Array.isArray;function ne(){}var S={H:null,A:null,T:null,S:null},re=Object.prototype.hasOwnProperty;function C(e,n,r){var i=r.ref;return{$$typeof:t,type:e,key:n,ref:i===void 0?null:i,props:r}}function ie(e,t){return C(e.type,t,e.props)}function ae(e){return typeof e==`object`&&!!e&&e.$$typeof===t}function oe(e){var t={"=":`=0`,":":`=2`};return`$`+e.replace(/[=:]/g,function(e){return t[e]})}var se=/\/+/g;function ce(e,t){return typeof e==`object`&&e&&e.key!=null?oe(``+e.key):t.toString(36)}function le(e){switch(e.status){case`fulfilled`:return e.value;case`rejected`:throw e.reason;default:switch(typeof e.status==`string`?e.then(ne,ne):(e.status=`pending`,e.then(function(t){e.status===`pending`&&(e.status=`fulfilled`,e.value=t)},function(t){e.status===`pending`&&(e.status=`rejected`,e.reason=t)})),e.status){case`fulfilled`:return e.value;case`rejected`:throw e.reason}}throw e}function ue(e,r,i,a,o){var s=typeof e;(s===`undefined`||s===`boolean`)&&(e=null);var c=!1;if(e===null)c=!0;else switch(s){case`bigint`:case`string`:case`number`:c=!0;break;case`object`:switch(e.$$typeof){case t:case n:c=!0;break;case d:return c=e._init,ue(c(e._payload),r,i,a,o)}}if(c)return o=o(e),c=a===``?`.`+ce(e,0):a,x(o)?(i=``,c!=null&&(i=c.replace(se,`$&/`)+`/`),ue(o,r,i,``,function(e){return e})):o!=null&&(ae(o)&&(o=ie(o,i+(o.key==null||e&&e.key===o.key?``:(``+o.key).replace(se,`$&/`)+`/`)+c)),r.push(o)),1;c=0;var l=a===``?`.`:a+`:`;if(x(e))for(var u=0;u<e.length;u++)a=e[u],s=l+ce(a,u),c+=ue(a,r,i,s,o);else if(u=h(e),typeof u==`function`)for(e=u.call(e),u=0;!(a=e.next()).done;)a=a.value,s=l+ce(a,u++),c+=ue(a,r,i,s,o);else if(s===`object`){if(typeof e.then==`function`)return ue(le(e),r,i,a,o);throw r=String(e),Error(`Objects are not valid as a React child (found: `+(r===`[object Object]`?`object with keys {`+Object.keys(e).join(`, `)+`}`:r)+`). If you meant to render a collection of children, use an array instead.`)}return c}function de(e,t,n){if(e==null)return e;var r=[],i=0;return ue(e,r,``,``,function(e){return t.call(n,e,i++)}),r}function fe(e){if(e._status===-1){var t=e._result,n=t();n.then(function(t){(e._status===0||e._status===-1)&&(e._status=1,e._result=t,n.status===void 0&&(n.status=`fulfilled`,n.value=t))},function(t){(e._status===0||e._status===-1)&&(e._status=2,e._result=t,n.status===void 0&&(n.status=`rejected`,n.reason=t))}),e._status===-1&&(e._status=0,e._result=n)}if(e._status===1)return e._result.default;throw e._result}var pe=typeof reportError==`function`?reportError:function(e){if(typeof window==`object`&&typeof window.ErrorEvent==`function`){var t=new window.ErrorEvent(`error`,{bubbles:!0,cancelable:!0,message:typeof e==`object`&&e&&typeof e.message==`string`?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process==`object`&&typeof process.emit==`function`){process.emit(`uncaughtException`,e);return}console.error(e)};function me(e){var t=S.T,n={};n.types=t===null?null:t.types,S.T=n;try{var r=e(),i=S.S;i!==null&&i(n,r),typeof r==`object`&&r&&typeof r.then==`function`&&r.then(ne,pe)}catch(e){pe(e)}finally{t!==null&&n.types!==null&&(t.types=n.types),S.T=t}}function he(e){var t=S.T;if(t!==null){var n=t.types;n===null?t.types=[e]:n.indexOf(e)===-1&&n.push(e)}else me(he.bind(null,e))}var ge={map:de,forEach:function(e,t,n){de(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return de(e,function(){t++}),t},toArray:function(e){return de(e,function(e){return e})||[]},only:function(e){if(!ae(e))throw Error(`React.Children.only expected to receive a single React element child.`);return e}};e.Activity=f,e.Children=ge,e.Component=y,e.Fragment=r,e.Profiler=a,e.PureComponent=ee,e.StrictMode=i,e.Suspense=l,e.ViewTransition=p,e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=S,e.__COMPILER_RUNTIME={__proto__:null,c:function(e){return S.H.useMemoCache(e)}},e.addTransitionType=he,e.cache=function(e){return function(){return e.apply(null,arguments)}},e.cacheSignal=function(){return null},e.cloneElement=function(e,t,n){if(e==null)throw Error(`The argument must be a React element, but you passed `+e+`.`);var r=_({},e.props),i=e.key;if(t!=null)for(a in t.key!==void 0&&(i=``+t.key),t)!re.call(t,a)||a===`key`||a===`__self`||a===`__source`||a===`ref`&&t.ref===void 0||(r[a]=t[a]);var a=arguments.length-2;if(a===1)r.children=n;else if(1<a){for(var o=Array(a),s=0;s<a;s++)o[s]=arguments[s+2];r.children=o}return C(e.type,i,r)},e.createContext=function(e){return e={$$typeof:s,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null},e.Provider=e,e.Consumer={$$typeof:o,_context:e},e},e.createElement=function(e,t,n){var r,i={},a=null;if(t!=null)for(r in t.key!==void 0&&(a=``+t.key),t)re.call(t,r)&&r!==`key`&&r!==`__self`&&r!==`__source`&&(i[r]=t[r]);var o=arguments.length-2;if(o===1)i.children=n;else if(1<o){for(var s=Array(o),c=0;c<o;c++)s[c]=arguments[c+2];i.children=s}if(e&&e.defaultProps)for(r in o=e.defaultProps,o)i[r]===void 0&&(i[r]=o[r]);return C(e,a,i)},e.createRef=function(){return{current:null}},e.forwardRef=function(e){return{$$typeof:c,render:e}},e.isValidElement=ae,e.lazy=function(e){return{$$typeof:d,_payload:{_status:-1,_result:e},_init:fe}},e.memo=function(e,t){return{$$typeof:u,type:e,compare:t===void 0?null:t}},e.startTransition=me,e.unstable_useCacheRefresh=function(){return S.H.useCacheRefresh()},e.use=function(e){return S.H.use(e)},e.useActionState=function(e,t,n){return S.H.useActionState(e,t,n)},e.useCallback=function(e,t){return S.H.useCallback(e,t)},e.useContext=function(e){return S.H.useContext(e)},e.useDebugValue=function(){},e.useDeferredValue=function(e,t){return S.H.useDeferredValue(e,t)},e.useEffect=function(e,t){return S.H.useEffect(e,t)},e.useEffectEvent=function(e){return S.H.useEffectEvent(e)},e.useId=function(){return S.H.useId()},e.useImperativeHandle=function(e,t,n){return S.H.useImperativeHandle(e,t,n)},e.useInsertionEffect=function(e,t){return S.H.useInsertionEffect(e,t)},e.useLayoutEffect=function(e,t){return S.H.useLayoutEffect(e,t)},e.useMemo=function(e,t){return S.H.useMemo(e,t)},e.useOptimistic=function(e,t){return S.H.useOptimistic(e,t)},e.useReducer=function(e,t,n){return S.H.useReducer(e,t,n)},e.useRef=function(e){return S.H.useRef(e)},e.useState=function(e){return S.H.useState(e)},e.useSyncExternalStore=function(e,t,n){return S.H.useSyncExternalStore(e,t,n)},e.useTransition=function(){return S.H.useTransition()},e.version=`19.3.1`})),f=o(((e,t)=>{t.exports=d()})),p=o((e=>{var t=f();function n(e){var t=`https://react.dev/errors/`+e;if(1<arguments.length){t+=`?args[]=`+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+=`&args[]=`+encodeURIComponent(arguments[n])}return`Minified React error #`+e+`; visit `+t+` for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`}function r(){}var i={d:{f:r,r:function(){throw Error(n(522))},D:r,C:r,L:r,m:r,X:r,S:r,M:r},p:0,findDOMNode:null},a=Symbol.for(`react.portal`),o=Symbol.for(`react.recoverable`),s=Symbol.for(`react.optimistic_key`);function c(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:a,key:r==null?null:r===s?s:``+r,children:e,containerInfo:t,implementation:n}}var l=t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function u(e,t){if(e===`font`)return``;if(typeof t==`string`)return t===`use-credentials`?t:``}e.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=i,e.browser=function(e){return{$$typeof:o,_reason:e}},e.createPortal=function(e,t){var r=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)throw Error(n(299));return c(e,t,null,r)},e.flushSync=function(e){var t=l.T,n=i.p;try{if(l.T=null,i.p=2,e)return e()}finally{l.T=t,i.p=n,i.d.f()}},e.preconnect=function(e,t){typeof e==`string`&&(t?(t=t.crossOrigin,t=typeof t==`string`?t===`use-credentials`?t:``:void 0):t=null,i.d.C(e,t))},e.prefetchDNS=function(e){typeof e==`string`&&i.d.D(e)},e.preinit=function(e,t){if(typeof e==`string`&&t&&typeof t.as==`string`){var n=t.as,r=u(n,t.crossOrigin),a=typeof t.integrity==`string`?t.integrity:void 0,o=typeof t.fetchPriority==`string`?t.fetchPriority:void 0;n===`style`?i.d.S(e,typeof t.precedence==`string`?t.precedence:void 0,{crossOrigin:r,integrity:a,fetchPriority:o}):n===`script`&&i.d.X(e,{crossOrigin:r,integrity:a,fetchPriority:o,nonce:typeof t.nonce==`string`?t.nonce:void 0})}},e.preinitModule=function(e,t){if(typeof e==`string`){if(typeof t==`object`&&t){if(t.as==null||t.as===`script`){var n=u(t.as,t.crossOrigin);i.d.M(e,{crossOrigin:n,integrity:typeof t.integrity==`string`?t.integrity:void 0,nonce:typeof t.nonce==`string`?t.nonce:void 0,fetchPriority:typeof t.fetchPriority==`string`?t.fetchPriority:void 0})}}else t??i.d.M(e)}},e.preload=function(e,t){if(typeof e==`string`&&typeof t==`object`&&t&&typeof t.as==`string`){var n=t.as,r=u(n,t.crossOrigin);i.d.L(e,n,{crossOrigin:r,integrity:typeof t.integrity==`string`?t.integrity:void 0,nonce:typeof t.nonce==`string`?t.nonce:void 0,type:typeof t.type==`string`?t.type:void 0,fetchPriority:typeof t.fetchPriority==`string`?t.fetchPriority:void 0,referrerPolicy:typeof t.referrerPolicy==`string`?t.referrerPolicy:void 0,imageSrcSet:typeof t.imageSrcSet==`string`?t.imageSrcSet:void 0,imageSizes:typeof t.imageSizes==`string`?t.imageSizes:void 0,media:typeof t.media==`string`?t.media:void 0})}},e.preloadModule=function(e,t){if(typeof e==`string`){if(t){var n=u(t.as,t.crossOrigin);i.d.m(e,{as:typeof t.as==`string`&&t.as!==`script`?t.as:void 0,crossOrigin:n,integrity:typeof t.integrity==`string`?t.integrity:void 0,nonce:typeof t.nonce==`string`?t.nonce:void 0,fetchPriority:typeof t.fetchPriority==`string`?t.fetchPriority:void 0})}else i.d.m(e)}},e.requestFormReset=function(e){i.d.r(e)},e.unstable_batchedUpdates=function(e,t){return e(t)},e.useFormState=function(e,t,n){return l.H.useFormState(e,t,n)},e.useFormStatus=function(){return l.H.useHostTransitionStatus()},e.version=`19.3.1`})),m=o(((e,t)=>{function n(){if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<`u`&&typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE==`function`)try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(e){console.error(e)}}n(),t.exports=p()})),h=o((e=>{var t=u(),n=f(),r=m();function i(e){var t=`https://react.dev/errors/`+e;if(1<arguments.length){t+=`?args[]=`+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+=`&args[]=`+encodeURIComponent(arguments[n])}return`Minified React error #`+e+`; visit `+t+` for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`}function a(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function o(e){for(var t=e,n=t;n&&!n.alternate;)t=n,t.flags&4098&&(e=t.return),n=t.return;for(;t.return;)t=t.return;return t.tag===3?e:null}function s(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function c(e){if(e.tag===31){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function l(e){if(o(e)!==e)throw Error(i(188))}function d(e){var t=e.alternate;if(!t){if(t=o(e),t===null)throw Error(i(188));return t===e?e:null}for(var n=e,r=t;;){var a=n.return;if(a===null)break;var s=a.alternate;if(s===null){if(r=a.return,r!==null){n=r;continue}break}if(a.child===s.child){for(s=a.child;s;){if(s===n)return l(a),e;if(s===r)return l(a),t;s=s.sibling}throw Error(i(188))}if(n.return!==r.return)n=a,r=s;else{for(var c=!1,u=a.child;u;){if(u===n){c=!0,n=a,r=s;break}if(u===r){c=!0,r=a,n=s;break}u=u.sibling}if(!c){for(u=s.child;u;){if(u===n){c=!0,n=s,r=a;break}if(u===r){c=!0,r=s,n=a;break}u=u.sibling}if(!c)throw Error(i(189))}}if(n.alternate!==r)throw Error(i(190))}if(n.tag!==3)throw Error(i(188));return n.stateNode.current===n?e:t}function p(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e;for(e=e.child;e!==null;){if(t=p(e),t!==null)return t;e=e.sibling}return null}function h(e,t,n,r,i,a){for(;e!==null;){if((e.tag===5||e.tag===27||e.tag===6)&&n(e,r,i,a)||(e.tag!==22||e.memoizedState===null)&&(t||e.tag!==5&&e.tag!==27)&&h(e.child,t,n,r,i,a))return!0;e=e.sibling}return!1}function g(e){for(e=e.return;e!==null;){if(e.tag===3||e.tag===5||e.tag===27)return e;e=e.return}return null}function _(e){var t=!1;for(e=e.return;e!==null&&(e.tag===4&&(t=!0),e.tag!==3&&e.tag!==5&&e.tag!==27);)e=e.return;return t}function v(e){var t=[null,null],n=g(e);return n===null||y(t,e,n.child,{foundSelf:!1}),t}function y(e,t,n,r){for(;n!==null;){if(n===t)r.foundSelf=!0;else if(n.tag===5||n.tag===27||n.tag===6){if(r.foundSelf)return e[1]=n,!0;e[0]=n}else if((n.tag!==22||n.memoizedState===null)&&y(e,t,n.child,r))return!0;n=n.sibling}return!1}function b(e){switch(e.tag){case 5:case 27:case 6:return e.stateNode;case 3:return e.stateNode.containerInfo;default:throw Error(i(559))}}var ee=null,te=null;function x(e,t,n){return e===n||e===t&&(ee=e,!0)}function ne(e,t,n){return e===n?(te=e,!1):e===t&&(te!==null&&(ee=e),!0)}function S(e){if(e===null)return null;do e=e===null?null:e.return;while(e&&e.tag!==5&&e.tag!==27&&e.tag!==3);return e||null}function re(e,t,n){for(var r=0,i=e;i;i=n(i))r++;i=0;for(var a=t;a;a=n(a))i++;for(;0<r-i;)e=n(e),r--;for(;0<i-r;)t=n(t),i--;for(;r--;){if(e===t||t!==null&&e===t.alternate)return e;e=n(e),t=n(t)}return null}var C=Object.assign,ie=Symbol.for(`react.element`),ae=Symbol.for(`react.transitional.element`),oe=Symbol.for(`react.portal`),se=Symbol.for(`react.fragment`),ce=Symbol.for(`react.strict_mode`),le=Symbol.for(`react.profiler`),ue=Symbol.for(`react.consumer`),de=Symbol.for(`react.context`),fe=Symbol.for(`react.forward_ref`),pe=Symbol.for(`react.suspense`),me=Symbol.for(`react.suspense_list`),he=Symbol.for(`react.memo`),ge=Symbol.for(`react.lazy`),_e=Symbol.for(`react.activity`),ve=Symbol.for(`react.legacy_hidden`),ye=Symbol.for(`react.memo_cache_sentinel`),be=Symbol.for(`react.view_transition`),xe=Symbol.for(`react.recoverable`),Se=Symbol.iterator;function Ce(e){return typeof e!=`object`||!e?null:(e=Se&&e[Se]||e[`@@iterator`],typeof e==`function`?e:null)}var we=Symbol.for(`react.client.reference`);function Te(e){if(e==null)return null;if(typeof e==`function`)return e.$$typeof===we?null:e.displayName||e.name||null;if(typeof e==`string`)return e;switch(e){case se:return`Fragment`;case le:return`Profiler`;case ce:return`StrictMode`;case pe:return`Suspense`;case me:return`SuspenseList`;case _e:return`Activity`;case be:return`ViewTransition`}if(typeof e==`object`)switch(e.$$typeof){case oe:return`Portal`;case de:return e.displayName||`Context`;case ue:return(e._context.displayName||`Context`)+`.Consumer`;case fe:var t=e.render;return e=e.displayName,e||=(e=t.displayName||t.name||``,e===``?`ForwardRef`:`ForwardRef(`+e+`)`),e;case he:return t=e.displayName||null,t===null?Te(e.type)||`Memo`:t;case ge:t=e._payload,e=e._init;try{return Te(e(t))}catch{}}return null}var Ee=Array.isArray,w=n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,T=r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,De={pending:!1,data:null,method:null,action:null},Oe=[],ke=-1;function Ae(e){return{current:e}}function E(e){0>ke||(e.current=Oe[ke],Oe[ke]=null,ke--)}function D(e,t){ke++,Oe[ke]=e.current,e.current=t}var je=Ae(null),Me=Ae(null),Ne=Ae(null),Pe=Ae(null);function Fe(e,t){switch(D(Ne,t),D(Me,e),D(je,null),t.nodeType){case 9:case 11:e=(e=t.documentElement)&&(e=e.namespaceURI)?up(e):0;break;default:if(e=t.tagName,t=t.namespaceURI)t=up(t),e=dp(t,e);else switch(e){case`svg`:e=1;break;case`math`:e=2;break;default:e=0}}E(je),D(je,e)}function Ie(){E(je),E(Me),E(Ne)}function Le(e){var t=e.memoizedState;t!==null&&(sh._currentValue=t.memoizedState,D(Pe,e)),t=je.current;var n=dp(t,e.type);t!==n&&(D(Me,e),D(je,n))}function Re(e){Me.current===e&&(E(je),E(Me)),Pe.current===e&&(E(Pe),sh._currentValue=De)}var ze,Be;function Ve(e){if(ze===void 0)try{throw Error()}catch(e){var t=e.stack.trim().match(/\n( *(at )?)/);ze=t&&t[1]||``,Be=-1<e.stack.indexOf(`
    at`)?` (<anonymous>)`:-1<e.stack.indexOf(`@`)?`@unknown:0:0`:``}return`
`+ze+e+Be}var He=!1;function Ue(e,t){if(!e||He)return``;He=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var r={DetermineComponentFrameRoot:function(){try{if(t){var n=function(){throw Error()};if(Object.defineProperty(n.prototype,"props",{set:function(){throw Error()}}),typeof Reflect==`object`&&Reflect.construct){try{Reflect.construct(n,[])}catch(e){var r=e}Reflect.construct(e,[],n)}else{try{n.call()}catch(e){r=e}n=!1;try{var i=Object.getOwnPropertyDescriptor(e.prototype,`props`);Object.defineProperty(e.prototype,"props",{configurable:!0,set:function(){throw Error()}}),n=!0,new e}finally{n&&(i===void 0?delete e.prototype.props:Object.defineProperty(e.prototype,"props",i))}}}else{try{throw Error()}catch(e){r=e}(n=e())&&typeof n.catch==`function`&&n.catch(function(){})}}catch(e){if(e&&r&&typeof e.stack==`string`)return[e.stack,r.stack]}return[null,null]}};r.DetermineComponentFrameRoot.displayName=`DetermineComponentFrameRoot`;var i=Object.getOwnPropertyDescriptor(r.DetermineComponentFrameRoot,`name`);i&&i.configurable&&Object.defineProperty(r.DetermineComponentFrameRoot,"name",{value:`DetermineComponentFrameRoot`});var a=r.DetermineComponentFrameRoot(),o=a[0],s=a[1];if(o&&s){var c=o.split(`
`),l=s.split(`
`);for(i=r=0;r<c.length&&!c[r].includes(`DetermineComponentFrameRoot`);)r++;for(;i<l.length&&!l[i].includes(`DetermineComponentFrameRoot`);)i++;if(r===c.length||i===l.length)for(r=c.length-1,i=l.length-1;1<=r&&0<=i&&c[r]!==l[i];)i--;for(;1<=r&&0<=i;r--,i--)if(c[r]!==l[i]){if(r!==1||i!==1)do if(r--,i--,0>i||c[r]!==l[i]){var u=`
`+c[r].replace(` at new `,` at `);return e.displayName&&u.includes(`<anonymous>`)&&(u=u.replace(`<anonymous>`,e.displayName)),u}while(1<=r&&0<=i);break}}}finally{He=!1,Error.prepareStackTrace=n}return(n=e?e.displayName||e.name:``)?Ve(n):``}function We(e,t){switch(e.tag){case 26:case 27:case 5:return Ve(e.type);case 16:return Ve(`Lazy`);case 13:return e.child!==t&&t!==null?Ve(`Suspense Fallback`):Ve(`Suspense`);case 19:return Ve(`SuspenseList`);case 0:case 15:return Ue(e.type,!1);case 11:return Ue(e.type.render,!1);case 1:return Ue(e.type,!0);case 31:return Ve(`Activity`);case 30:return Ve(`ViewTransition`);default:return``}}function Ge(e){try{var t=``,n=null;do t+=We(e,n),n=e,e=e.return;while(e);return t}catch(e){return`
Error generating stack: `+e.message+`
`+e.stack}}var Ke=Object.prototype.hasOwnProperty,qe=t.unstable_scheduleCallback,Je=t.unstable_cancelCallback,Ye=t.unstable_shouldYield,Xe=t.unstable_requestPaint,Ze=t.unstable_now,Qe=t.unstable_getCurrentPriorityLevel,$e=t.unstable_ImmediatePriority,et=t.unstable_UserBlockingPriority,tt=t.unstable_NormalPriority,nt=t.unstable_LowPriority,rt=t.unstable_IdlePriority,it=t.log,at=t.unstable_setDisableYieldValue,ot=null,st=null;function ct(e){if(typeof it==`function`&&at(e),st&&typeof st.setStrictMode==`function`)try{st.setStrictMode(ot,e)}catch{}}var O=Math.clz32?Math.clz32:dt,lt=Math.log,ut=Math.LN2;function dt(e){return e>>>=0,e===0?32:31-(lt(e)/ut|0)|0}var ft=256,pt=262144,mt=4194304;function ht(e){var t=e&42;if(t!==0)return t;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&-e;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function gt(e,t,n){var r=e.pendingLanes;if(r===0)return 0;var i=0,a=e.suspendedLanes,o=e.pingedLanes;e=e.warmLanes;var s=r&134217727;return s===0?(s=r&~a,s===0?o===0?n||(n=r&~e,n!==0&&(i=ht(n))):i=ht(o):i=ht(s)):(r=s&~a,r===0?(o&=s,o===0?n||(n=s&~e,n!==0&&(i=ht(n))):i=ht(o)):i=ht(r)),i===0?0:t!==0&&t!==i&&(t&a)===0&&(a=i&-i,n=t&-t,a>=n||a===32&&n&4194048)?t:i}function _t(e,t){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&t)===0}function vt(e,t){t&8&&(t|=t&32);var n=e.entangledLanes;if(n!==0)for(e=e.entanglements,n&=t;0<n;){var r=31-O(n),i=1<<r;t|=e[r],n&=~i}return t}function yt(e,t){switch(e){case 1:case 2:case 4:case 8:case 64:return t+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function bt(){var e=mt;return mt<<=1,!(mt&62914560)&&(mt=4194304),e}function xt(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function St(e,t){e.pendingLanes|=t,t!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function Ct(e,t,n,r,i,a){var o=e.pendingLanes;e.pendingLanes=n,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=n,e.entangledLanes&=n,e.errorRecoveryDisabledLanes&=n,e.shellSuspendCounter=0;var s=e.entanglements,c=e.expirationTimes,l=e.hiddenUpdates;for(n=o&~n;0<n;){var u=31-O(n),d=1<<u;s[u]=0,c[u]=-1;var f=l[u];if(f!==null)for(l[u]=null,u=0;u<f.length;u++){var p=f[u];p!==null&&(p.lane&=-536870913)}n&=~d}r!==0&&wt(e,r,0),a!==0&&i===0&&e.tag!==0&&(e.suspendedLanes|=a&~(o&~t))}function wt(e,t,n){e.pendingLanes|=t,e.suspendedLanes&=~t;var r=31-O(t);e.entangledLanes|=t,e.entanglements[r]=e.entanglements[r]|1073741824|n&261930}function Tt(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-O(n),i=1<<r;i&t|e[r]&t&&(e[r]|=t),n&=~i}}function Et(e,t){var n=t&-t;return n=n&42?1:Dt(n),(n&(e.suspendedLanes|t))===0?n:0}function Dt(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function Ot(e){return e&=-e,2<e?8<e?e&134217727?32:268435456:8:2}function kt(){var e=T.p;return e===0?(e=window.event,e===void 0?32:Ch(e.type)):e}function At(e,t){var n=T.p;try{return T.p=e,t()}finally{T.p=n}}var jt=Math.random().toString(36).slice(2),Mt=`__reactFiber$`+jt,Nt=`__reactProps$`+jt,Pt=`__reactContainer$`+jt,Ft=`__reactEvents$`+jt,It=`__reactListeners$`+jt,Lt=`__reactHandles$`+jt,Rt=`__reactResources$`+jt,zt=`__reactMarker$`+jt,Bt=`__reactLoad$`+jt;function Vt(e){delete e[Mt],delete e[Nt],delete e[It],delete e[Lt]}function Ht(e){var t;if(t=e[Mt])return t;for(var n=e.parentNode;n;){if(t=n[Pt]||n[Mt]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=fm(e);e!==null;){if(n=e[Mt])return n;e=fm(e)}return t}e=n,n=e.parentNode}return null}function Ut(e){if(e=e[Mt]||e[Pt]){var t=e.tag;if(t===5||t===6||t===13||t===31||t===26||t===27||t===3)return e}return null}function Wt(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e.stateNode;throw Error(i(33))}function Gt(e){var t=e[Rt];return t||=e[Rt]={hoistableStyles:new Map,hoistableScripts:new Map},t}function Kt(e){e[zt]=!0}function qt(e){e[Bt]=void 0}var Jt=new Set,Yt={};function Xt(e,t){Zt(e,t),Zt(e+`Capture`,t)}function Zt(e,t){for(Yt[e]=t,e=0;e<t.length;e++)Jt.add(t[e])}var Qt=RegExp(`^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$`),$t={},en={};function tn(e){return Ke.call(en,e)?!0:Ke.call($t,e)?!1:Qt.test(e)?en[e]=!0:($t[e]=!0,!1)}var k=!1;function nn(){var e=k;return k=!1,e}function rn(e,t,n){if(tn(t)){if(n===null)e.removeAttribute(t);else{switch(typeof n){case`undefined`:case`function`:case`symbol`:e.removeAttribute(t);return;case`boolean`:var r=t.toLowerCase().slice(0,5);if(r!==`data-`&&r!==`aria-`){e.removeAttribute(t);return}}e.setAttribute(t,n)}}}function an(e,t,n){if(n===null)e.removeAttribute(t);else{switch(typeof n){case`undefined`:case`function`:case`symbol`:case`boolean`:e.removeAttribute(t);return}e.setAttribute(t,n)}}function on(e,t,n,r){if(r===null)e.removeAttribute(n);else{switch(typeof r){case`undefined`:case`function`:case`symbol`:case`boolean`:e.removeAttribute(n);return}e.setAttributeNS(t,n,r)}}function sn(e){switch(typeof e){case`bigint`:case`boolean`:case`number`:case`string`:case`undefined`:return e;case`object`:return e;default:return``}}function cn(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()===`input`&&(t===`checkbox`||t===`radio`)}function ln(e,t,n){var r=Object.getOwnPropertyDescriptor(e.constructor.prototype,t);if(!e.hasOwnProperty(t)&&r!==void 0&&typeof r.get==`function`&&typeof r.set==`function`){var i=r.get,a=r.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return i.call(this)},set:function(e){n=``+e,a.call(this,e)}}),Object.defineProperty(e,t,{enumerable:r.enumerable}),{getValue:function(){return n},setValue:function(e){n=``+e},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function un(e){if(!e._valueTracker){var t=cn(e)?`checked`:`value`;e._valueTracker=ln(e,t,``+e[t])}}function dn(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r=``;return e&&(r=cn(e)?e.checked?`true`:`false`:e.value),e=r,e!==n&&(t.setValue(e),!0)}var fn=/[\n"\\]/g;function pn(e){return e.replace(fn,function(e){return`\\`+e.charCodeAt(0).toString(16)+` `})}function mn(e,t,n,r,i,a,o,s){e.name=``,o!=null&&typeof o!=`function`&&typeof o!=`symbol`&&typeof o!=`boolean`?e.type=o:e.removeAttribute(`type`),t==null?o!==`submit`&&o!==`reset`||e.removeAttribute(`value`):o===`number`?(t===0&&e.value===``||e.value!=t)&&(e.value=``+sn(t)):e.value!==``+sn(t)&&(e.value=``+sn(t)),t==null?n==null?r!=null&&e.removeAttribute(`value`):gn(e,sn(n)):o===`number`&&e.value==t?gn(e,sn(e.value)):gn(e,sn(t)),i==null&&a!=null&&(e.defaultChecked=!!a),i!=null&&(e.checked=i&&typeof i!=`function`&&typeof i!=`symbol`),s!=null&&typeof s!=`function`&&typeof s!=`symbol`&&typeof s!=`boolean`?e.name=``+sn(s):e.removeAttribute(`name`)}function hn(e,t,n,r,i,a,o,s){if(a!=null&&typeof a!=`function`&&typeof a!=`symbol`&&typeof a!=`boolean`&&(e.type=a),t!=null||n!=null){if(!(a!==`submit`&&a!==`reset`||t!=null)){un(e);return}n=n==null?``:``+sn(n),t=t==null?n:``+sn(t),s||t===e.value||(e.value=t),e.defaultValue=t}r??=i,r=typeof r!=`function`&&typeof r!=`symbol`&&!!r,e.checked=s?e.checked:!!r,e.defaultChecked=!!r,o!=null&&typeof o!=`function`&&typeof o!=`symbol`&&typeof o!=`boolean`&&(e.name=o),un(e)}function gn(e,t){e.defaultValue!==``+t&&(e.defaultValue=``+t)}function _n(e,t,n,r){if(e=e.options,t){t={};for(var i=0;i<n.length;i++)t[`$`+n[i]]=!0;for(n=0;n<e.length;n++)i=t.hasOwnProperty(`$`+e[n].value),e[n].selected!==i&&(e[n].selected=i),i&&r&&(e[n].defaultSelected=!0)}else{for(n=``+sn(n),t=null,i=0;i<e.length;i++){if(e[i].value===n){e[i].selected=!0,r&&(e[i].defaultSelected=!0);return}t!==null||e[i].disabled||(t=e[i])}t!==null&&(t.selected=!0)}}function vn(e,t,n){t!=null&&(t=``+sn(t),t!==e.value&&(e.value=t),n==null)?e.defaultValue!==t&&(e.defaultValue=t):e.defaultValue=n==null?``:``+sn(n)}function yn(e,t,n,r){if(t==null){if(r!=null){if(n!=null)throw Error(i(92));if(Ee(r)){if(1<r.length)throw Error(i(93));r=r[0]}n=r}n??=``,t=n}n=sn(t),e.defaultValue=n,r=e.textContent,r===n&&r!==``&&r!==null&&(e.value=r),un(e)}function bn(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var xn=new Set(`animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp`.split(` `));function Sn(e,t,n){var r=t.indexOf(`--`)===0;n==null||typeof n==`boolean`||n===``?r?e.setProperty(t,``):t===`float`?e.cssFloat=``:e[t]=``:r?e.setProperty(t,n):typeof n!=`number`||n===0||xn.has(t)?t===`float`?e.cssFloat=n:e[t]=(``+n).trim():e[t]=n+`px`}function Cn(e,t,n){if(t!=null&&typeof t!=`object`)throw Error(i(62));if(e=e.style,n!=null){for(var r in n)!n.hasOwnProperty(r)||t!=null&&t.hasOwnProperty(r)||(r.indexOf(`--`)===0?e.setProperty(r,``):r===`float`?e.cssFloat=``:e[r]=``,k=!0);for(var a in t)r=t[a],t.hasOwnProperty(a)&&n[a]!==r&&(Sn(e,a,r),k=!0)}else for(var o in t)t.hasOwnProperty(o)&&Sn(e,o,t[o])}function wn(e){if(e.indexOf(`-`)===-1)return!1;switch(e){case`annotation-xml`:case`color-profile`:case`font-face`:case`font-face-src`:case`font-face-uri`:case`font-face-format`:case`font-face-name`:case`missing-glyph`:return!1;default:return!0}}var Tn=new Map([[`acceptCharset`,`accept-charset`],[`htmlFor`,`for`],[`httpEquiv`,`http-equiv`],[`crossOrigin`,`crossorigin`],[`accentHeight`,`accent-height`],[`alignmentBaseline`,`alignment-baseline`],[`arabicForm`,`arabic-form`],[`baselineShift`,`baseline-shift`],[`capHeight`,`cap-height`],[`clipPath`,`clip-path`],[`clipRule`,`clip-rule`],[`colorInterpolation`,`color-interpolation`],[`colorInterpolationFilters`,`color-interpolation-filters`],[`colorProfile`,`color-profile`],[`colorRendering`,`color-rendering`],[`dominantBaseline`,`dominant-baseline`],[`enableBackground`,`enable-background`],[`fillOpacity`,`fill-opacity`],[`fillRule`,`fill-rule`],[`floodColor`,`flood-color`],[`floodOpacity`,`flood-opacity`],[`fontFamily`,`font-family`],[`fontSize`,`font-size`],[`fontSizeAdjust`,`font-size-adjust`],[`fontStretch`,`font-stretch`],[`fontStyle`,`font-style`],[`fontVariant`,`font-variant`],[`fontWeight`,`font-weight`],[`glyphName`,`glyph-name`],[`glyphOrientationHorizontal`,`glyph-orientation-horizontal`],[`glyphOrientationVertical`,`glyph-orientation-vertical`],[`horizAdvX`,`horiz-adv-x`],[`horizOriginX`,`horiz-origin-x`],[`imageRendering`,`image-rendering`],[`letterSpacing`,`letter-spacing`],[`lightingColor`,`lighting-color`],[`markerEnd`,`marker-end`],[`markerMid`,`marker-mid`],[`markerStart`,`marker-start`],[`maskType`,`mask-type`],[`overlinePosition`,`overline-position`],[`overlineThickness`,`overline-thickness`],[`paintOrder`,`paint-order`],[`panose-1`,`panose-1`],[`pointerEvents`,`pointer-events`],[`renderingIntent`,`rendering-intent`],[`shapeRendering`,`shape-rendering`],[`stopColor`,`stop-color`],[`stopOpacity`,`stop-opacity`],[`strikethroughPosition`,`strikethrough-position`],[`strikethroughThickness`,`strikethrough-thickness`],[`strokeDasharray`,`stroke-dasharray`],[`strokeDashoffset`,`stroke-dashoffset`],[`strokeLinecap`,`stroke-linecap`],[`strokeLinejoin`,`stroke-linejoin`],[`strokeMiterlimit`,`stroke-miterlimit`],[`strokeOpacity`,`stroke-opacity`],[`strokeWidth`,`stroke-width`],[`textAnchor`,`text-anchor`],[`textDecoration`,`text-decoration`],[`textRendering`,`text-rendering`],[`transformOrigin`,`transform-origin`],[`underlinePosition`,`underline-position`],[`underlineThickness`,`underline-thickness`],[`unicodeBidi`,`unicode-bidi`],[`unicodeRange`,`unicode-range`],[`unitsPerEm`,`units-per-em`],[`vAlphabetic`,`v-alphabetic`],[`vHanging`,`v-hanging`],[`vIdeographic`,`v-ideographic`],[`vMathematical`,`v-mathematical`],[`vectorEffect`,`vector-effect`],[`vertAdvY`,`vert-adv-y`],[`vertOriginX`,`vert-origin-x`],[`vertOriginY`,`vert-origin-y`],[`wordSpacing`,`word-spacing`],[`writingMode`,`writing-mode`],[`xmlnsXlink`,`xmlns:xlink`],[`xHeight`,`x-height`]]),En=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function Dn(e){return En.test(``+e)?`javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')`:e}function On(){}var kn=null;function An(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var jn=null,Mn=null;function Nn(e){var t=Ut(e);if(t&&(e=t.stateNode)){var n=e[Nt]||null;a:switch(e=t.stateNode,t.type){case`input`:if(mn(e,n.value,n.defaultValue,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name),t=n.name,n.type===`radio`&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll(`input[name="`+pn(``+t)+`"][type="radio"]`),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var a=r[Nt]||null;if(!a)throw Error(i(90));mn(r,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name)}}for(t=0;t<n.length;t++)r=n[t],r.form===e.form&&dn(r)}break a;case`textarea`:vn(e,n.value,n.defaultValue);break a;case`select`:t=n.value,t!=null&&_n(e,!!n.multiple,t,!1)}}}var Pn=!1;function Fn(e,t,n){if(Pn)return e(t,n);Pn=!0;try{return e(t)}finally{if(Pn=!1,(jn!==null||Mn!==null)&&(zd(),jn&&(t=jn,e=Mn,Mn=jn=null,Nn(t),e)))for(t=0;t<e.length;t++)Nn(e[t])}}function In(e,t){var n=e.stateNode;if(n===null)return null;var r=n[Nt]||null;if(r===null)return null;n=r[t];a:switch(t){case`onClick`:case`onClickCapture`:case`onDoubleClick`:case`onDoubleClickCapture`:case`onMouseDown`:case`onMouseDownCapture`:case`onMouseMove`:case`onMouseMoveCapture`:case`onMouseUp`:case`onMouseUpCapture`:case`onMouseEnter`:(r=!r.disabled)||(e=e.type,r=e!==`button`&&e!==`input`&&e!==`select`&&e!==`textarea`),e=!r;break a;default:e=!1}if(e)return null;if(n&&typeof n!=`function`)throw Error(i(231,t,typeof n));return n}var Ln=typeof window<`u`&&window.document!==void 0&&window.document.createElement!==void 0,Rn=!1;if(Ln)try{var zn={};Object.defineProperty(zn,"passive",{get:function(){Rn=!0}}),window.addEventListener(`test`,zn,zn),window.removeEventListener(`test`,zn,zn)}catch{Rn=!1}var Bn=null,Vn=null,Hn=null;function Un(){if(Hn)return Hn;var e,t=Vn,n=t.length,r,i=`value`in Bn?Bn.value:Bn.textContent,a=i.length;for(e=0;e<n&&t[e]===i[e];e++);var o=n-e;for(r=1;r<=o&&t[n-r]===i[a-r];r++);return Hn=i.slice(e,1<r?1-r:void 0)}function Wn(e){var t=e.keyCode;return`charCode`in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function Gn(){return!0}function Kn(){return!1}function qn(e){function t(t,n,r,i,a){for(var o in this._reactName=t,this._targetInst=r,this.type=n,this.nativeEvent=i,this.target=a,this.currentTarget=null,e)e.hasOwnProperty(o)&&(t=e[o],this[o]=t?t(i):i[o]);return this.isDefaultPrevented=(i.defaultPrevented==null?!1===i.returnValue:i.defaultPrevented)?Gn:Kn,this.isPropagationStopped=Kn,this}return C(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var e=this.nativeEvent;e&&(e.preventDefault?e.preventDefault():typeof e.returnValue!=`unknown`&&(e.returnValue=!1),this.isDefaultPrevented=Gn)},stopPropagation:function(){var e=this.nativeEvent;e&&(e.stopPropagation?e.stopPropagation():typeof e.cancelBubble!=`unknown`&&(e.cancelBubble=!0),this.isPropagationStopped=Gn)},persist:function(){},isPersistent:Gn}),t}var Jn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Yn=qn(Jn),Xn=C({},Jn,{view:0,detail:0}),Zn=qn(Xn),Qn,$n,er,tr=C({},Xn,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:fr,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return`movementX`in e?e.movementX:(e!==er&&(er&&e.type===`mousemove`?(Qn=e.screenX-er.screenX,$n=e.screenY-er.screenY):$n=Qn=0,er=e),Qn)},movementY:function(e){return`movementY`in e?e.movementY:$n}}),nr=qn(tr),rr=qn(C({},tr,{dataTransfer:0})),ir=qn(C({},Xn,{relatedTarget:0})),ar=qn(C({},Jn,{animationName:0,elapsedTime:0,pseudoElement:0})),or=qn(C({},Jn,{clipboardData:function(e){return`clipboardData`in e?e.clipboardData:window.clipboardData}})),sr=qn(C({},Jn,{data:0})),cr={Esc:`Escape`,Spacebar:` `,Left:`ArrowLeft`,Up:`ArrowUp`,Right:`ArrowRight`,Down:`ArrowDown`,Del:`Delete`,Win:`OS`,Menu:`ContextMenu`,Apps:`ContextMenu`,Scroll:`ScrollLock`,MozPrintableKey:`Unidentified`},lr={8:`Backspace`,9:`Tab`,12:`Clear`,13:`Enter`,16:`Shift`,17:`Control`,18:`Alt`,19:`Pause`,20:`CapsLock`,27:`Escape`,32:` `,33:`PageUp`,34:`PageDown`,35:`End`,36:`Home`,37:`ArrowLeft`,38:`ArrowUp`,39:`ArrowRight`,40:`ArrowDown`,45:`Insert`,46:`Delete`,112:`F1`,113:`F2`,114:`F3`,115:`F4`,116:`F5`,117:`F6`,118:`F7`,119:`F8`,120:`F9`,121:`F10`,122:`F11`,123:`F12`,144:`NumLock`,145:`ScrollLock`,224:`Meta`},ur={Alt:`altKey`,Control:`ctrlKey`,Meta:`metaKey`,Shift:`shiftKey`};function dr(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=ur[e])?!!t[e]:!1}function fr(){return dr}var pr=qn(C({},Xn,{key:function(e){if(e.key){var t=cr[e.key]||e.key;if(t!==`Unidentified`)return t}return e.type===`keypress`?(e=Wn(e),e===13?`Enter`:String.fromCharCode(e)):e.type===`keydown`||e.type===`keyup`?lr[e.keyCode]||`Unidentified`:``},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:fr,charCode:function(e){return e.type===`keypress`?Wn(e):0},keyCode:function(e){return e.type===`keydown`||e.type===`keyup`?e.keyCode:0},which:function(e){return e.type===`keypress`?Wn(e):e.type===`keydown`||e.type===`keyup`?e.keyCode:0}})),mr=qn(C({},tr,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0})),hr=qn(C({},Jn,{submitter:0})),gr=qn(C({},Xn,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:fr})),_r=qn(C({},Jn,{propertyName:0,elapsedTime:0,pseudoElement:0})),vr=qn(C({},tr,{deltaX:function(e){return`deltaX`in e?e.deltaX:`wheelDeltaX`in e?-e.wheelDeltaX:0},deltaY:function(e){return`deltaY`in e?e.deltaY:`wheelDeltaY`in e?-e.wheelDeltaY:`wheelDelta`in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0})),yr=qn(C({},Jn,{newState:0,oldState:0,source:0})),br=[9,13,27,32],xr=Ln&&`CompositionEvent`in window,Sr=null;Ln&&`documentMode`in document&&(Sr=document.documentMode);var Cr=Ln&&`TextEvent`in window&&!Sr,wr=Ln&&(!xr||Sr&&8<Sr&&11>=Sr),Tr=` `,Er=!1;function Dr(e,t){switch(e){case`keyup`:return br.indexOf(t.keyCode)!==-1;case`keydown`:return t.keyCode!==229;case`keypress`:case`mousedown`:case`focusout`:return!0;default:return!1}}function Or(e){return e=e.detail,typeof e==`object`&&`data`in e?e.data:null}var kr=!1;function Ar(e,t){switch(e){case`compositionend`:return Or(t);case`keypress`:return t.which===32?(Er=!0,Tr):null;case`textInput`:return e=t.data,e===Tr&&Er?null:e;default:return null}}function jr(e,t){if(kr)return e===`compositionend`||!xr&&Dr(e,t)?(e=Un(),Hn=Vn=Bn=null,kr=!1,e):null;switch(e){case`paste`:return null;case`keypress`:if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case`compositionend`:return wr&&t.locale!==`ko`?null:t.data;default:return null}}var Mr={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Nr(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t===`input`?!!Mr[e.type]:t===`textarea`}function Pr(e,t,n,r){jn?Mn?Mn.push(r):Mn=[r]:jn=r,t=Jf(t,`onChange`),0<t.length&&(n=new Yn(`onChange`,`change`,null,n,r),e.push({event:n,listeners:t}))}var Fr=null,Ir=null;function Lr(e){Vf(e,0)}function Rr(e){if(dn(Wt(e)))return e}function zr(e,t){if(e===`change`)return t}var Br=!1;if(Ln){var Vr;if(Ln){var Hr=`oninput`in document;if(!Hr){var Ur=document.createElement(`div`);Ur.setAttribute(`oninput`,`return;`),Hr=typeof Ur.oninput==`function`}Vr=Hr}else Vr=!1;Br=Vr&&(!document.documentMode||9<document.documentMode)}function Wr(){Fr&&(Fr.detachEvent(`onpropertychange`,Gr),Ir=Fr=null)}function Gr(e){if(e.propertyName===`value`&&Rr(Ir)){var t=[];Pr(t,Ir,e,An(e)),Fn(Lr,t)}}function Kr(e,t,n){e===`focusin`?(Wr(),Fr=t,Ir=n,Fr.attachEvent(`onpropertychange`,Gr)):e===`focusout`&&Wr()}function qr(e){if(e===`selectionchange`||e===`keyup`||e===`keydown`)return Rr(Ir)}function Jr(e,t){if(e===`click`)return Rr(t)}function Yr(e,t){if(e===`input`||e===`change`)return Rr(t)}function Xr(e,t){return e===t&&(e!==0||1/e==1/t)||e!==e&&t!==t}var Zr=typeof Object.is==`function`?Object.is:Xr;function Qr(e,t){if(Zr(e,t))return!0;if(typeof e!=`object`||!e||typeof t!=`object`||!t)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var i=n[r];if(!Ke.call(t,i)||!Zr(e[i],t[i]))return!1}return!0}function $r(e){if(e||=typeof document<`u`?document:void 0,e===void 0)return null;try{return e.activeElement||e.body}catch{return e.body}}function ei(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function ti(e,t){var n=ei(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}a:{for(;n;){if(n.nextSibling){n=n.nextSibling;break a}n=n.parentNode}n=void 0}n=ei(n)}}function ni(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?ni(e,t.parentNode):`contains`in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function ri(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var t=$r(e.document);t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href==`string`}catch{n=!1}if(n)e=t.contentWindow;else break;t=$r(e.document)}return t}function ii(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t===`input`&&(e.type===`text`||e.type===`search`||e.type===`tel`||e.type===`url`||e.type===`password`)||t===`textarea`||e.contentEditable===`true`)}var ai=Ln&&`documentMode`in document&&11>=document.documentMode,oi=null,si=null,ci=null,li=!1;function ui(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;li||oi==null||oi!==$r(r)||(r=oi,`selectionStart`in r&&ii(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),ci&&Qr(ci,r)||(ci=r,r=Jf(si,`onSelect`),0<r.length&&(t=new Yn(`onSelect`,`select`,null,t,n),e.push({event:t,listeners:r}),t.target=oi)))}function di(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n[`Webkit`+e]=`webkit`+t,n[`Moz`+e]=`moz`+t,n}var fi={animationend:di(`Animation`,`AnimationEnd`),animationiteration:di(`Animation`,`AnimationIteration`),animationstart:di(`Animation`,`AnimationStart`),transitionrun:di(`Transition`,`TransitionRun`),transitionstart:di(`Transition`,`TransitionStart`),transitioncancel:di(`Transition`,`TransitionCancel`),transitionend:di(`Transition`,`TransitionEnd`)},pi={},mi={};Ln&&(mi=document.createElement(`div`).style,`AnimationEvent`in window||(delete fi.animationend.animation,delete fi.animationiteration.animation,delete fi.animationstart.animation),`TransitionEvent`in window||delete fi.transitionend.transition);function hi(e){if(pi[e])return pi[e];if(!fi[e])return e;var t=fi[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in mi)return pi[e]=t[n];return e}var gi=hi(`animationend`),_i=hi(`animationiteration`),vi=hi(`animationstart`),yi=hi(`transitionrun`),bi=hi(`transitionstart`),xi=hi(`transitioncancel`),Si=hi(`transitionend`),Ci=new Map,wi=`abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error fullscreenChange fullscreenError gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel`.split(` `);wi.push(`scrollEnd`);function Ti(e,t){Ci.set(e,t),Xt(t,[e])}var Ei=0;function Di(e,t){if(e.name!=null&&e.name!==`auto`)return e.name;if(t.autoName!==null)return t.autoName;e=bd.identifierPrefix;var n=Ei++;return e=`_`+e+`t_`+n.toString(32)+`_`,t.autoName=e}function Oi(e){if(e==null||typeof e==`string`)return e;var t=null,n=Od;if(n!==null)for(var r=0;r<n.length;r++){var i=e[n[r]];if(i!=null){if(i===`none`)return`none`;t=t==null?i:t+(` `+i)}}return t??e.default}function ki(e,t){return e=Oi(e),t=Oi(t),t==null?e===`auto`?null:e:t===`auto`?null:t}var Ai=typeof reportError==`function`?reportError:function(e){if(typeof window==`object`&&typeof window.ErrorEvent==`function`){var t=new window.ErrorEvent(`error`,{bubbles:!0,cancelable:!0,message:typeof e==`object`&&e&&typeof e.message==`string`?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process==`object`&&typeof process.emit==`function`){process.emit(`uncaughtException`,e);return}console.error(e)},ji=[],Mi=0,Ni=0;function Pi(){for(var e=Mi,t=Ni=Mi=0;t<e;){var n=ji[t];ji[t++]=null;var r=ji[t];ji[t++]=null;var i=ji[t];ji[t++]=null;var a=ji[t];if(ji[t++]=null,r!==null&&i!==null){var o=r.pending;o===null?i.next=i:(i.next=o.next,o.next=i),r.pending=i}a!==0&&Ri(n,i,a)}}function Fi(e,t,n,r){ji[Mi++]=e,ji[Mi++]=t,ji[Mi++]=n,ji[Mi++]=r,Ni|=r,e.lanes|=r,e=e.alternate,e!==null&&(e.lanes|=r)}function Ii(e,t,n,r){return Fi(e,t,n,r),zi(e)}function Li(e,t){return Fi(e,null,null,t),zi(e)}function Ri(e,t,n){e.lanes|=n;var r=e.alternate;r!==null&&(r.lanes|=n);for(var i=!1,a=e.return;a!==null;)a.childLanes|=n,r=a.alternate,r!==null&&(r.childLanes|=n),a.tag===22&&(e=a.stateNode,e===null||e._visibility&1||(i=!0)),e=a,a=a.return;return e.tag===3?(a=e.stateNode,i&&t!==null&&(i=31-O(n),e=a.hiddenUpdates,r=e[i],r===null?e[i]=[t]:r.push(t),t.lane=n|536870912),a):null}function zi(e){if(50<kd)throw kd=0,Ad=null,Error(i(185));for(var t=e.return;t!==null;)e=t,t=e.return;return e.tag===3?e.stateNode:null}var Bi={};function Vi(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Hi(e,t,n,r){return new Vi(e,t,n,r)}function Ui(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Wi(e,t){var n=e.alternate;return n===null?(n=Hi(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&1206910976,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n.refCleanup=e.refCleanup,n}function Gi(e,t){e.flags&=1206910978;var n=e.alternate;return n===null?(e.childLanes=0,e.lanes=t,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=n.childLanes,e.lanes=n.lanes,e.child=n.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=n.memoizedProps,e.memoizedState=n.memoizedState,e.updateQueue=n.updateQueue,e.type=n.type,t=n.dependencies,e.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),e}function Ki(e,t,n,r,a,o){var s=0;if(r=e,typeof r==`function`)Ui(r)&&(s=1);else if(typeof r==`string`)s=qm(e,n,je.current)?26:e===`html`||e===`head`||e===`body`?27:5;else a:switch(r){case _e:return e=Hi(31,n,t,a),e.elementType=_e,e.lanes=o,e;case se:return qi(n.children,a,o,t);case ce:s=8,a|=24;break;case le:return e=Hi(12,n,t,a|2),e.elementType=le,e.lanes=o,e;case pe:return e=Hi(13,n,t,a),e.elementType=pe,e.lanes=o,e;case me:return e=Hi(19,n,t,a),e.elementType=me,e.lanes=o,e;case ve:case be:return e=a|32,e=Hi(30,n,t,e),e.elementType=be,e.lanes=o,e.stateNode={autoName:null,paired:null,clones:null,ref:null},e;default:if(typeof r==`object`&&r)switch(r.$$typeof){case de:s=10;break a;case ue:s=9;break a;case fe:s=11;break a;case he:s=14;break a;case ge:s=16,r=null;break a}s=29,n=Error(i(130,e===null?`null`:typeof e,``)),r=null}return t=Hi(s,n,t,a),t.elementType=e,t.type=r,t.lanes=o,t}function qi(e,t,n,r){return e=Hi(7,e,r,t),e.lanes=n,e}function Ji(e,t,n){return e=Hi(6,e,null,t),e.lanes=n,e}function Yi(e){var t=Hi(18,null,null,0);return t.stateNode=e,t}function Xi(e,t,n){return t=Hi(4,e.children===null?[]:e.children,e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}var Zi=new WeakMap;function Qi(e,t){if(typeof e==`object`&&e){var n=Zi.get(e);return n===void 0?(t={value:e,source:t,stack:Ge(t)},Zi.set(e,t),t):n}return{value:e,source:t,stack:Ge(t)}}var $i=[],ea=0,ta=null,na=0,ra=[],ia=0,aa=null,oa=1,sa=``;function ca(e,t){$i[ea++]=na,$i[ea++]=ta,ta=e,na=t}function la(e,t,n){ra[ia++]=oa,ra[ia++]=sa,ra[ia++]=aa,aa=e;var r=oa;e=sa;var i=32-O(r)-1;r&=~(1<<i),n+=1;var a=32-O(t)+i;if(30<a){var o=i-i%5;a=(r&(1<<o)-1).toString(32),r>>=o,i-=o,oa=1<<32-O(t)+i|n<<i|r,sa=a+e}else oa=1<<a|n<<i|r,sa=e}function ua(e){e.return!==null&&(ca(e,1),la(e,1,0))}function da(e){for(;e===ta;)ta=$i[--ea],$i[ea]=null,na=$i[--ea],$i[ea]=null;for(;e===aa;)aa=ra[--ia],ra[ia]=null,sa=ra[--ia],ra[ia]=null,oa=ra[--ia],ra[ia]=null}function fa(e,t){ra[ia++]=oa,ra[ia++]=sa,ra[ia++]=aa,oa=t.id,sa=t.overflow,aa=e}var A=null,j=null,M=!1,pa=null,ma=!1,ha=Error(i(519));function ga(e){throw Sa(Qi(Error(i(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?`text`:`HTML`,``)),e)),ha}function _a(e){var t=e.stateNode,n=e.type,r=e.memoizedProps;switch(t[Mt]=e,t[Nt]=r,n){case`dialog`:Q(`cancel`,t),Q(`close`,t);break;case`iframe`:case`object`:case`embed`:Q(`load`,t);break;case`video`:case`audio`:for(n=0;n<zf.length;n++)Q(zf[n],t);break;case`source`:Q(`error`,t);break;case`img`:case`image`:case`link`:Q(`error`,t),Q(`load`,t);break;case`details`:Q(`toggle`,t);break;case`input`:Q(`invalid`,t),hn(t,r.value,r.defaultValue,r.checked,r.defaultChecked,r.type,r.name,!0);break;case`select`:Q(`invalid`,t);break;case`textarea`:Q(`invalid`,t),yn(t,r.value,r.defaultValue,r.children)}n=r.children,typeof n!=`string`&&typeof n!=`number`&&typeof n!=`bigint`||t.textContent===``+n||!0===r.suppressHydrationWarning||ep(t.textContent,n)?(r.popover!=null&&(Q(`beforetoggle`,t),Q(`toggle`,t)),r.onScroll!=null&&Q(`scroll`,t),r.onScrollEnd!=null&&Q(`scrollend`,t),r.onClick!=null&&(t.onclick=On),t=!0):t=!1,t||ga(e,!0)}function va(e){for(A=e.return;A;)switch(A.tag){case 5:case 31:case 13:ma=!1;return;case 27:case 3:ma=!0;return;default:A=A.return}}function ya(e){if(e!==A)return!1;if(!M)return va(e),M=!0,!1;var t=e.tag,n;if((n=t!==3&&t!==27)&&((n=t===5)&&(n=e.type,n=n===`form`||n===`button`||pp(e.type,e.memoizedProps)),n=!n),n&&j&&ga(e),va(e),t===13){if(e=e.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(i(317));j=dm(e)}else if(t===31){if(e=e.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(i(317));j=dm(e)}else t===27?(t=j,Sp(e.type)?(e=um,um=null,j=e):j=t):j=A?lm(e.stateNode.nextSibling):null;return!0}function ba(){j=A=null,M=!1}function xa(){var e=pa;return e!==null&&(pd===null?pd=e:pd.push.apply(pd,e),pa=null),e}function Sa(e){pa===null?pa=[e]:pa.push(e)}var Ca=Ae(null),wa=null,Ta=null;function Ea(e,t,n){D(Ca,t._currentValue),t._currentValue=n}function Da(e){e._currentValue=Ca.current,E(Ca)}function Oa(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)===t?r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t):(e.childLanes|=t,r!==null&&(r.childLanes|=t)),e===n)break;e=e.return}}function ka(e,t,n,r){var a=e.child;for(a!==null&&(a.return=e);a!==null;){var o=a.dependencies;if(o!==null){var s=a.child;o=o.firstContext;a:for(;o!==null;){var c=o;o=a;for(var l=0;l<t.length;l++)if(c.context===t[l]){o.lanes|=n,c=o.alternate,c!==null&&(c.lanes|=n),Oa(o.return,n,e),r||(s=null);break a}o=c.next}}else if(a.tag===18){if(s=a.return,s===null)throw Error(i(341));s.lanes|=n,o=s.alternate,o!==null&&(o.lanes|=n),Oa(s,n,e),s=null}else a.tag===13&&a.memoizedState!==null&&a.memoizedState.dehydrated===null?(a.lanes|=n,s=a.alternate,s!==null&&(s.lanes|=n),Oa(a.return,n,e),s=a.child,s=s===null?null:s.sibling):s=a.child;if(s!==null)s.return=a;else for(s=a;s!==null;){if(s===e){s=null;break}if(a=s.sibling,a!==null){a.return=s.return,s=a;break}s=s.return}a=s}}function Aa(e,t,n,r){e=null;for(var a=t,o=!1;a!==null;){if(!o){if(a.flags&524288)o=!0;else if(a.flags&262144)break}if(a.tag===10){var s=a.alternate;if(s===null)throw Error(i(387));if(s=s.memoizedProps,s!==null){var c=a.type;Zr(a.pendingProps.value,s.value)||(e===null?e=[c]:e.push(c))}}else if(a===Pe.current){if(s=a.alternate,s===null)throw Error(i(387));s.memoizedState.memoizedState!==a.memoizedState.memoizedState&&(e===null?e=[sh]:e.push(sh))}a=a.return}return e!==null&&ka(t,e,n,r),t.flags|=262144,e!==null}function ja(e){for(e=e.firstContext;e!==null;){if(!Zr(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function Ma(e){wa=e,Ta=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function Na(e){return Fa(wa,e)}function Pa(e,t){return wa===null&&Ma(e),Fa(e,t)}function Fa(e,t){var n=t._currentValue;if(t={context:t,memoizedValue:n,next:null},Ta===null){if(e===null)throw Error(i(308));Ta=t,e.dependencies={lanes:0,firstContext:t},e.flags|=524288}else Ta=Ta.next=t;return n}var Ia=typeof AbortController<`u`?AbortController:function(){var e=[],t=this.signal={aborted:!1,addEventListener:function(t,n){e.push(n)}};this.abort=function(){t.aborted=!0,e.forEach(function(e){return e()})}},La=t.unstable_scheduleCallback,Ra=t.unstable_NormalPriority,N={$$typeof:de,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function za(){return{controller:new Ia,data:new Map,refCount:0}}function Ba(e){e.refCount--,e.refCount===0&&La(Ra,function(){e.controller.abort()})}function Va(e,t){if(e.pendingLanes&4194048){var n=e.transitionTypes;for(n===null&&(n=e.transitionTypes=[]),e=0;e<t.length;e++){var r=t[e];n.indexOf(r)===-1&&n.push(r)}}}var Ha=null;function Ua(e){var t=e.transitionTypes;return e.transitionTypes=null,t}var Wa=null,Ga=0,Ka=0,qa=null;function Ja(e,t){if(Wa===null){var n=Wa=[];Ga=0,Ka=Pf(),qa={status:`pending`,value:void 0,then:function(e){n.push(e)}}}return Ga++,t.then(Ya,Ya),t}function Ya(){if(--Ga===0&&(Ha=null,Wa!==null)){qa!==null&&(qa.status=`fulfilled`);var e=Wa;Wa=null,Ka=0,qa=null;for(var t=0;t<e.length;t++)(0,e[t])()}}function Xa(e,t){var n=[],r={status:`pending`,value:null,reason:null,then:function(e){n.push(e)}};return e.then(function(){r.status=`fulfilled`,r.value=t;for(var e=0;e<n.length;e++)(0,n[e])(t)},function(e){for(r.status=`rejected`,r.reason=e,e=0;e<n.length;e++)(0,n[e])(void 0)}),r}var Za=w.S;w.S=function(e,t){if(gd=Ze(),typeof t==`object`&&t&&typeof t.then==`function`&&Ja(e,t),Ha!==null)for(var n=bf;n!==null;)Va(n,Ha),n=n.next;if(n=e.types,n!==null){for(var r=bf;r!==null;)Va(r,n),r=r.next;if(Ka!==0){r=Ha,r===null&&(r=Ha=[]);for(var i=0;i<n.length;i++){var a=n[i];r.indexOf(a)===-1&&r.push(a)}}}Za!==null&&Za(e,t)};var Qa=Ae(null);function $a(){var e=Qa.current;return e===null?G.pooledCache:e}function eo(e,t){t===null?D(Qa,Qa.current):D(Qa,t.pool)}function to(){var e=$a();return e===null?null:{parent:N._currentValue,pool:e}}var no=Error(i(460)),ro=Error(i(474)),io=Error(i(542)),ao={then:function(){}};function oo(e){return e=e.status,e===`fulfilled`||e===`rejected`}function so(e,t,n){switch(n=e[n],n===void 0?e.push(t):n!==t&&(t.then(On,On),t=n),t.status){case`fulfilled`:return t.value;case`rejected`:throw e=t.reason,fo(e),e===void 0&&!(`reason`in t)?Error(i(600)):e;default:if(typeof t.status==`string`)t.then(On,On);else{if(e=G,e!==null&&100<e.shellSuspendCounter)throw Error(i(482));e=t,e.status=`pending`,e.then(function(e){if(t.status===`pending`){var n=t;n.status=`fulfilled`,n.value=e}},function(e){if(t.status===`pending`){var n=t;n.status=`rejected`,n.reason=e}})}switch(t.status){case`fulfilled`:return t.value;case`rejected`:throw e=t.reason,fo(e),e}throw lo=t,no}}function co(e){try{var t=e._init;return t(e._payload)}catch(e){throw typeof e==`object`&&e&&typeof e.then==`function`?(lo=e,no):e}}var lo=null;function uo(){if(lo===null)throw Error(i(459));var e=lo;return lo=null,e}function fo(e){if(e===no||e===io)throw Error(i(483))}var po=null,mo=0;function ho(e){var t=mo;return mo+=1,po===null&&(po=[]),so(po,e,t)}function go(e,t){t=t.props.ref,e.ref=t===void 0?null:t}function _o(e,t){throw t.$$typeof===ie?Error(i(525)):(e=Object.prototype.toString.call(t),Error(i(31,e===`[object Object]`?`object with keys {`+Object.keys(t).join(`, `)+`}`:e)))}function vo(e){function t(t,n){if(e){var r=t.deletions;r===null?(t.deletions=[n],t.flags|=16):r.push(n)}}function n(n,r){if(!e)return null;for(;r!==null;)t(n,r),r=r.sibling;return null}function r(e){for(var t=new Map;e!==null;)e.key===null?t.set(e.index,e):t.set(e.key,e),e=e.sibling;return t}function a(e,t){return e=Wi(e,t),e.index=0,e.sibling=null,e}function o(t,n,r){return t.index=r,e?(r=t.alternate,r===null?(t.flags|=134217730,n):(r=r.index,r<n?(t.flags|=2,n):r)):(t.flags|=1048576,n)}function s(t){return e&&t.alternate===null&&(t.flags|=134217730),t}function c(e,t,n,r){return t===null||t.tag!==6?(t=Ji(n,e.mode,r),t.return=e,t):(t=a(t,n),t.return=e,t)}function l(e,t,n,r){var i=n.type;return i===se?(e=d(e,t,n.props.children,r,n.key),go(e,n),e):t!==null&&(t.elementType===i||typeof i==`object`&&i&&i.$$typeof===ge&&co(i)===t.type)?(t=a(t,n.props),go(t,n),t.return=e,t):(t=Ki(n.type,n.key,n.props,null,e.mode,r),go(t,n),t.return=e,t)}function u(e,t,n,r){return t===null||t.tag!==4||t.stateNode.containerInfo!==n.containerInfo||t.stateNode.implementation!==n.implementation?(t=Xi(n,e.mode,r),t.return=e,t):(t=a(t,n.children||[]),t.return=e,t)}function d(e,t,n,r,i){return t===null||t.tag!==7?(t=qi(n,e.mode,r,i),t.return=e,t):(t=a(t,n),t.return=e,t)}function f(e,t,n){if(typeof t==`string`&&t!==``||typeof t==`number`||typeof t==`bigint`)return t=Ji(``+t,e.mode,n),t.return=e,t;if(typeof t==`object`&&t){switch(t.$$typeof){case ae:return n=Ki(t.type,t.key,t.props,null,e.mode,n),go(n,t),n.return=e,n;case oe:return t=Xi(t,e.mode,n),t.return=e,t;case ge:return t=co(t),f(e,t,n)}if(Ee(t)||Ce(t))return t=qi(t,e.mode,n,null),t.return=e,t;if(typeof t.then==`function`)return f(e,ho(t),n);if(t.$$typeof===de)return f(e,Pa(e,t),n);_o(e,t)}return null}function p(e,t,n,r){var i=t===null?null:t.key;if(typeof n==`string`&&n!==``||typeof n==`number`||typeof n==`bigint`)return i===null?c(e,t,``+n,r):null;if(typeof n==`object`&&n){switch(n.$$typeof){case ae:return n.key===i?l(e,t,n,r):null;case oe:return n.key===i?u(e,t,n,r):null;case ge:return n=co(n),p(e,t,n,r)}if(Ee(n)||Ce(n))return i===null?d(e,t,n,r,null):null;if(typeof n.then==`function`)return p(e,t,ho(n),r);if(n.$$typeof===de)return p(e,t,Pa(e,n),r);_o(e,n)}return null}function m(e,t,n,r,i){if(typeof r==`string`&&r!==``||typeof r==`number`||typeof r==`bigint`)return e=e.get(n)||null,c(t,e,``+r,i);if(typeof r==`object`&&r){switch(r.$$typeof){case ae:return e=e.get(r.key===null?n:r.key)||null,l(t,e,r,i);case oe:return e=e.get(r.key===null?n:r.key)||null,u(t,e,r,i);case ge:return r=co(r),m(e,t,n,r,i)}if(Ee(r)||Ce(r))return e=e.get(n)||null,d(t,e,r,i,null);if(typeof r.then==`function`)return m(e,t,n,ho(r),i);if(r.$$typeof===de)return m(e,t,n,Pa(t,r),i);_o(t,r)}return null}function h(i,a,s,c){for(var l=null,u=null,d=a,h=a=0,g=null;d!==null&&h<s.length;h++){d.index>h?(g=d,d=null):g=d.sibling;var _=p(i,d,s[h],c);if(_===null){d===null&&(d=g);break}e&&d&&_.alternate===null&&t(i,d),a=o(_,a,h),u===null?l=_:u.sibling=_,u=_,d=g}if(h===s.length)return n(i,d),M&&ca(i,h),l;if(d===null){for(;h<s.length;h++)d=f(i,s[h],c),d!==null&&(a=o(d,a,h),u===null?l=d:u.sibling=d,u=d);return M&&ca(i,h),l}for(d=r(d);h<s.length;h++)g=m(d,i,h,s[h],c),g!==null&&(e&&(_=g.alternate,_!==null&&d.delete(_.key===null?h:_.key)),a=o(g,a,h),u===null?l=g:u.sibling=g,u=g);return e&&d.forEach(function(e){return t(i,e)}),M&&ca(i,h),l}function g(a,s,c,l){if(c==null)throw Error(i(151));for(var u=null,d=null,h=s,g=s=0,_=null,v=c.next();h!==null&&!v.done;g++,v=c.next()){h.index>g?(_=h,h=null):_=h.sibling;var y=p(a,h,v.value,l);if(y===null){h===null&&(h=_);break}e&&h&&y.alternate===null&&t(a,h),s=o(y,s,g),d===null?u=y:d.sibling=y,d=y,h=_}if(v.done)return n(a,h),M&&ca(a,g),u;if(h===null){for(;!v.done;g++,v=c.next())v=f(a,v.value,l),v!==null&&(s=o(v,s,g),d===null?u=v:d.sibling=v,d=v);return M&&ca(a,g),u}for(h=r(h);!v.done;g++,v=c.next())v=m(h,a,g,v.value,l),v!==null&&(e&&(_=v.alternate,_!==null&&h.delete(_.key===null?g:_.key)),s=o(v,s,g),d===null?u=v:d.sibling=v,d=v);return e&&h.forEach(function(e){return t(a,e)}),M&&ca(a,g),u}function _(e,r,o,c){if(typeof o==`object`&&o&&o.type===se&&o.key===null&&o.props.ref===void 0&&(o=o.props.children),typeof o==`object`&&o){switch(o.$$typeof){case ae:a:{for(var l=o.key;r!==null;){if(r.key===l){if(l=o.type,l===se){if(r.tag===7){n(e,r.sibling),c=a(r,o.props.children),go(c,o),c.return=e,e=c;break a}}else if(r.elementType===l||typeof l==`object`&&l&&l.$$typeof===ge&&co(l)===r.type){n(e,r.sibling),c=a(r,o.props),go(c,o),c.return=e,e=c;break a}n(e,r);break}t(e,r),r=r.sibling}o.type===se?(c=qi(o.props.children,e.mode,c,o.key),go(c,o),c.return=e,e=c):(c=Ki(o.type,o.key,o.props,null,e.mode,c),go(c,o),c.return=e,e=c)}return s(e);case oe:a:{for(l=o.key;r!==null;){if(r.key===l){if(r.tag===4&&r.stateNode.containerInfo===o.containerInfo&&r.stateNode.implementation===o.implementation){n(e,r.sibling),c=a(r,o.children||[]),c.return=e,e=c;break a}n(e,r);break}t(e,r),r=r.sibling}c=Xi(o,e.mode,c),c.return=e,e=c}return s(e);case ge:return o=co(o),_(e,r,o,c)}if(Ee(o))return h(e,r,o,c);if(Ce(o)){if(l=Ce(o),typeof l!=`function`)throw Error(i(150));return o=l.call(o),g(e,r,o,c)}if(typeof o.then==`function`)return _(e,r,ho(o),c);if(o.$$typeof===de)return _(e,r,Pa(e,o),c);_o(e,o)}return typeof o==`string`&&o!==``||typeof o==`number`||typeof o==`bigint`?(o=``+o,r!==null&&r.tag===6?(n(e,r.sibling),c=a(r,o),c.return=e,e=c):(n(e,r),c=Ji(o,e.mode,c),c.return=e,e=c),s(e)):n(e,r)}return function(e,t,n,r){try{mo=0;var i=_(e,t,n,r);return po=null,i}catch(t){if(t===no||t===io)throw t;var a=Hi(29,t,null,e.mode);return a.lanes=r,a.return=e,a}}}var yo=vo(!0),bo=vo(!1),xo=!1;function So(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function Co(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function wo(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function To(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,W&2){var i=r.pending;return i===null?t.next=t:(t.next=i.next,i.next=t),r.pending=t,t=zi(e),Ri(e,null,n),t}return Fi(e,r,t,n),zi(e)}function Eo(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,n&4194048)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,Tt(e,n)}}function Do(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var i=null,a=null;if(n=n.firstBaseUpdate,n!==null){do{var o={lane:n.lane,tag:n.tag,payload:n.payload,callback:null,next:null};a===null?i=a=o:a=a.next=o,n=n.next}while(n!==null);a===null?i=a=t:a=a.next=t}else i=a=t;n={baseState:r.baseState,firstBaseUpdate:i,lastBaseUpdate:a,shared:r.shared,callbacks:r.callbacks},e.updateQueue=n}else e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}var Oo=!1;function ko(){if(Oo){var e=qa;if(e!==null)throw e}}function Ao(e,t,n,r){Oo=!1;var i=e.updateQueue;xo=!1;var a=i.firstBaseUpdate,o=i.lastBaseUpdate,s=i.shared.pending;if(s!==null){i.shared.pending=null;var c=s,l=c.next;c.next=null,o===null?a=l:o.next=l,o=c;var u=e.alternate;u!==null&&(u=u.updateQueue,s=u.lastBaseUpdate,s!==o&&(s===null?u.firstBaseUpdate=l:s.next=l,u.lastBaseUpdate=c))}if(a!==null){var d=i.baseState;o=0,u=l=c=null,s=a;do{var f=s.lane&-536870913,p=f!==s.lane;if(p?(q&f)===f:(r&f)===f){f!==0&&f===Ka&&(Oo=!0),u!==null&&(u=u.next={lane:0,tag:s.tag,payload:s.payload,callback:null,next:null});a:{var m=e,h=s;f=t;var g=n;switch(h.tag){case 1:if(m=h.payload,typeof m==`function`){d=m.call(g,d,f);break a}d=m;break a;case 3:m.flags=m.flags&-65537|128;case 0:if(m=h.payload,f=typeof m==`function`?m.call(g,d,f):m,f==null)break a;d=C({},d,f);break a;case 2:xo=!0}}f=s.callback,f!==null&&(e.flags|=64,p&&(e.flags|=8192),p=i.callbacks,p===null?i.callbacks=[f]:p.push(f))}else p={lane:f,tag:s.tag,payload:s.payload,callback:s.callback,next:null},u===null?(l=u=p,c=d):u=u.next=p,o|=f;if(s=s.next,s===null){if(s=i.shared.pending,s===null)break;p=s,s=p.next,p.next=null,i.lastBaseUpdate=p,i.shared.pending=null}}while(1);u===null&&(c=d),i.baseState=c,i.firstBaseUpdate=l,i.lastBaseUpdate=u,a===null&&(i.shared.lanes=0),sd|=o,e.lanes=o,e.memoizedState=d}}function jo(e,t){if(typeof e!=`function`)throw Error(i(191,e));e.call(t)}function Mo(e,t){var n=e.callbacks;if(n!==null)for(e.callbacks=null,e=0;e<n.length;e++)jo(n[e],t)}var No=Ae(null),Po=Ae(0);function Fo(e,t){e=od,D(Po,e),D(No,t),od=e|t.baseLanes}function Io(){D(Po,od),D(No,No.current)}function Lo(){od=Po.current,E(No),E(Po)}var Ro=Ae(null),zo=null;function Bo(e){var t=e.alternate;D(Go,Go.current&1),D(Ro,e),zo===null&&(t===null||No.current!==null||t.memoizedState!==null)&&(zo=e)}function Vo(e){D(Go,Go.current),D(Ro,e),zo===null&&(zo=e)}function Ho(e){e.tag===22?(D(Go,Go.current),D(Ro,e),zo===null&&(zo=e)):Uo()}function Uo(){D(Go,Go.current),D(Ro,Ro.current)}function Wo(e){E(Ro),zo===e&&(zo=null),E(Go)}var Go=Ae(0);function Ko(e,t){D(Ro,Ro.current),D(Go,t)}function qo(e){E(Go),E(Ro),zo===e&&(zo=null)}function Jo(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||om(n)||sm(n)))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==`independent`){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var Yo=0,P=null,F=null,I=null,Xo=!1,Zo=!1,Qo=!1,$o=0,es=0,ts=null,ns=0;function L(){throw Error(i(321))}function rs(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!Zr(e[n],t[n]))return!1;return!0}function is(e,t,n,r,i,a){return Yo=a,P=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,w.H=e===null||e.memoizedState===null?bc:xc,Qo=!1,a=n(r,i),Qo=!1,Zo&&(a=os(t,n,r,i)),as(e),a}function as(e){w.H=yc;var t=F!==null&&F.next!==null;if(Yo=0,I=F=P=null,Xo=!1,es=0,ts=null,t)throw Error(i(300));e===null||z||(e=e.dependencies,e!==null&&ja(e)&&(z=!0))}function os(e,t,n,r){P=e;var a=0;do{if(Zo&&(ts=null),es=0,Zo=!1,25<=a)throw Error(i(301));if(a+=1,I=F=null,e.updateQueue!=null){var o=e.updateQueue;o.lastEffect=null,o.events=null,o.stores=null,o.memoCache!=null&&(o.memoCache.index=0)}w.H=Sc,o=t(n,r)}while(Zo);return o}function ss(){var e=w.H,t=e.useState()[0];return t=typeof t.then==`function`?ps(t):t,e=e.useState()[0],(F===null?null:F.memoizedState)!==e&&(P.flags|=1024),t}function cs(){var e=$o!==0;return $o=0,e}function ls(e,t,n){t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~n}function us(e){if(Xo){for(e=e.memoizedState;e!==null;){var t=e.queue;t!==null&&(t.pending=null),e=e.next}Xo=!1}Yo=0,I=F=P=null,Zo=!1,es=$o=0,ts=null}function ds(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return I===null?P.memoizedState=I=e:I=I.next=e,I}function R(){if(F===null){var e=P.alternate;e=e===null?null:e.memoizedState}else e=F.next;var t=I===null?P.memoizedState:I.next;if(t!==null)I=t,F=e;else{if(e===null)throw P.alternate===null?Error(i(467)):Error(i(310));F=e,e={memoizedState:F.memoizedState,baseState:F.baseState,baseQueue:F.baseQueue,queue:F.queue,next:null},I===null?P.memoizedState=I=e:I=I.next=e}return I}function fs(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function ps(e){var t=es;return es+=1,ts===null&&(ts=[]),e=so(ts,e,t),t=P,(I===null?t.memoizedState:I.next)===null&&(t=t.alternate,w.H=t===null||t.memoizedState===null?bc:xc),e}function ms(e){if(typeof e==`object`&&e){if(typeof e.then==`function`)return ps(e);if(e.$$typeof===xe)return;if(e.$$typeof===de)return Na(e)}throw Error(i(438,String(e)))}function hs(e){var t=null,n=P.updateQueue;if(n!==null&&(t=n.memoCache),t==null){var r=P.alternate;r!==null&&(r=r.updateQueue,r!==null&&(r=r.memoCache,r!=null&&(t={data:r.data.map(function(e){return e.slice()}),index:0})))}if(t??={data:[],index:0},n===null&&(n=fs(),P.updateQueue=n),n.memoCache=t,n=t.data[t.index],n===void 0)for(n=t.data[t.index]=Array(e),r=0;r<e;r++)n[r]=ye;return t.index++,n}function gs(e,t){return typeof t==`function`?t(e):t}function _s(e){return vs(R(),F,e)}function vs(e,t,n){var r=e.queue;if(r===null)throw Error(i(311));r.lastRenderedReducer=n;var a=e.baseQueue,o=r.pending;if(o!==null){if(a!==null){var s=a.next;a.next=o.next,o.next=s}t.baseQueue=a=o,r.pending=null}if(o=e.baseState,a===null)e.memoizedState=o;else{t=a.next;var c=s=null,l=null,u=t,d=!1;do{var f=u.lane&-536870913;if(f===u.lane?(Yo&f)===f:(q&f)===f){var p=u.revertLane;if(p===0)l!==null&&(l=l.next={lane:0,revertLane:0,gesture:null,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null}),f===Ka&&(d=!0);else if((Yo&p)===p){u=u.next,p===Ka&&(d=!0);continue}else f={lane:0,revertLane:u.revertLane,gesture:null,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null},l===null?(c=l=f,s=o):l=l.next=f,P.lanes|=p,sd|=p;f=u.action,Qo&&n(o,f),o=u.hasEagerState?u.eagerState:n(o,f)}else p={lane:f,revertLane:u.revertLane,gesture:u.gesture,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null},l===null?(c=l=p,s=o):l=l.next=p,P.lanes|=f,sd|=f;u=u.next}while(u!==null&&u!==t);if(l===null?s=o:l.next=c,!Zr(o,e.memoizedState)&&(z=!0,d&&(n=qa,n!==null)))throw n;e.memoizedState=o,e.baseState=s,e.baseQueue=l,r.lastRenderedState=o}return a===null&&(r.lanes=0),[e.memoizedState,r.dispatch]}function ys(e){var t=R(),n=t.queue;if(n===null)throw Error(i(311));n.lastRenderedReducer=e;var r=n.dispatch,a=n.pending,o=t.memoizedState;if(a!==null){n.pending=null;var s=a=a.next;do o=e(o,s.action),s=s.next;while(s!==a);Zr(o,t.memoizedState)||(z=!0),t.memoizedState=o,t.baseQueue===null&&(t.baseState=o),n.lastRenderedState=o}return[o,r]}function bs(e,t,n){var r=P,a=R(),o=M;if(o){if(n===void 0)throw Error(i(407));n=n()}else n=t();var s=!Zr((F||a).memoizedState,n);if(s&&(a.memoizedState=n,z=!0),a=a.queue,Gs(Cs.bind(null,r,a,e),[e]),e=a.getSnapshot!==t||s||I!==null&&!!(I.memoizedState.tag&1),Bs(e?9:8,{destroy:void 0},Ss.bind(null,r,a,n,t),null),e){if(r.flags|=2048,G===null)throw Error(i(349));o||Yo&127||xs(r,t,n)}return n}function xs(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=P.updateQueue,t===null?(t=fs(),P.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function Ss(e,t,n,r){t.value=n,t.getSnapshot=r,ws(t)&&Ts(e)}function Cs(e,t,n){return n(function(){ws(t)&&Ts(e)})}function ws(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!Zr(e,n)}catch{return!0}}function Ts(e){var t=Li(e,2);t!==null&&Pd(t,e,2)}function Es(e){var t=ds();if(typeof e==`function`){var n=e;if(e=n(),Qo){ct(!0);try{n()}finally{ct(!1)}}}return t.memoizedState=t.baseState=e,t.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:gs,lastRenderedState:e},t}function Ds(e,t,n,r){return e.baseState=n,vs(e,F,typeof r==`function`?r:gs)}function Os(e,t,n,r,a){if(gc(e))throw Error(i(485));if(e=t.action,e!==null){var o={payload:a,action:e,next:null,isTransition:!0,status:`pending`,value:null,reason:null,listeners:[],then:function(e){o.listeners.push(e)}};w.T===null?o.isTransition=!1:n(!0),r(o),n=t.pending,n===null?(o.next=t.pending=o,ks(t,o)):(o.next=n.next,t.pending=n.next=o)}}function ks(e,t){var n=t.action,r=t.payload,i=e.state;if(t.isTransition){var a=w.T,o={};o.types=a===null?null:a.types,w.T=o;try{var s=n(i,r),c=w.S;c!==null&&c(o,s),As(e,t,s)}catch(n){Ms(e,t,n)}finally{a!==null&&o.types!==null&&(a.types=o.types),w.T=a}}else try{a=n(i,r),As(e,t,a)}catch(n){Ms(e,t,n)}}function As(e,t,n){typeof n==`object`&&n&&typeof n.then==`function`?n.then(function(n){js(e,t,n)},function(n){return Ms(e,t,n)}):js(e,t,n)}function js(e,t,n){t.status=`fulfilled`,t.value=n,Ns(t),e.state=n,t=e.pending,t!==null&&(n=t.next,n===t?e.pending=null:(n=n.next,t.next=n,ks(e,n)))}function Ms(e,t,n){var r=e.pending;if(e.pending=null,r!==null){r=r.next;do t.status=`rejected`,t.reason=n,Ns(t),t=t.next;while(t!==r)}e.action=null}function Ns(e){e=e.listeners;for(var t=0;t<e.length;t++)(0,e[t])()}function Ps(e,t){return t}function Fs(e,t){if(M){var n=G.formState;if(n!==null){a:{var r=P;if(M){if(j){b:{for(var i=j,a=ma;i.nodeType!==8;)if(!a||(i=lm(i.nextSibling),i===null)){i=null;break b}a=i.data,i=a===`F!`||a===`F`?i:null}if(i){j=lm(i.nextSibling),r=i.data===`F!`;break a}}ga(r)}r=!1}r&&(t=n[0])}}return n=ds(),n.memoizedState=n.baseState=t,r={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Ps,lastRenderedState:t},n.queue=r,n=pc.bind(null,P,r),r.dispatch=n,r=Es(!1),a=hc.bind(null,P,!1,r.queue),r=ds(),i={state:t,dispatch:null,action:e,pending:null},r.queue=i,n=Os.bind(null,P,i,a,n),i.dispatch=n,r.memoizedState=e,[t,n,!1]}function Is(e){return Ls(R(),F,e)}function Ls(e,t,n){if(t=vs(e,t,Ps)[0],e=_s(gs)[0],typeof t==`object`&&t&&typeof t.then==`function`)try{var r=ps(t)}catch(e){throw e===no?io:e}else r=t;t=R();var i=t.queue,a=i.dispatch;return n!==t.memoizedState&&(P.flags|=2048,Bs(9,{destroy:void 0},Rs.bind(null,i,n),null)),[r,a,e]}function Rs(e,t){e.action=t}function zs(e){var t=R(),n=F;if(n!==null)return Ls(t,n,e);R(),t=t.memoizedState,n=R();var r=n.queue.dispatch;return n.memoizedState=e,[t,r,!1]}function Bs(e,t,n,r){return e={tag:e,create:n,deps:r,inst:t,next:null},t=P.updateQueue,t===null&&(t=fs(),P.updateQueue=t),n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e),e}function Vs(){return R().memoizedState}function Hs(e,t,n,r){var i=ds();P.flags|=e,i.memoizedState=Bs(1|t,{destroy:void 0},n,r===void 0?null:r)}function Us(e,t,n,r){var i=R();r=r===void 0?null:r;var a=i.memoizedState.inst;F!==null&&r!==null&&rs(r,F.memoizedState.deps)?i.memoizedState=Bs(t,a,n,r):(P.flags|=e,i.memoizedState=Bs(1|t,a,n,r))}function Ws(e,t){Hs(8390656,8,e,t)}function Gs(e,t){Us(2048,8,e,t)}function Ks(e){P.flags|=4;var t=P.updateQueue;if(t===null)t=fs(),P.updateQueue=t,t.events=[e];else{var n=t.events;n===null?t.events=[e]:n.push(e)}}function qs(e){var t=R().memoizedState;return Ks({ref:t,nextImpl:e}),function(){if(W&2)throw Error(i(440));return t.impl.apply(void 0,arguments)}}function Js(e,t){return Us(4,2,e,t)}function Ys(e,t){return Us(4,4,e,t)}function Xs(e,t){if(typeof t==`function`){e=e();var n=t(e);return function(){typeof n==`function`?n():t(null)}}if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function Zs(e,t,n){n=n==null?null:n.concat([e]),Us(4,4,Xs.bind(null,t,e),n)}function Qs(){}function $s(e,t){var n=R();t=t===void 0?null:t;var r=n.memoizedState;return t!==null&&rs(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function ec(e,t){var n=R();t=t===void 0?null:t;var r=n.memoizedState;if(t!==null&&rs(t,r[1]))return r[0];if(r=e(),Qo){ct(!0);try{e()}finally{ct(!1)}}return n.memoizedState=[r,t],r}function tc(e,t,n){return n===void 0||Yo&1073741824&&!(q&261930)?e.memoizedState=t:(e.memoizedState=n,e=Md(),P.lanes|=e,sd|=e,n)}function nc(e,t,n,r){return Zr(n,t)?n:No.current===null?!(Yo&106)||Yo&1073741824&&!(q&261930)?(z=!0,e.memoizedState=n):(e=Md(),P.lanes|=e,sd|=e,t):(e=tc(e,n,r),Zr(e,t)||(z=!0),e)}function rc(e,t,n,r,i){var a=T.p;T.p=a!==0&&8>a?a:8;var o=w.T,s={};s.types=o===null?null:o.types,w.T=s,hc(e,!1,t,n);try{var c=i(),l=w.S;l!==null&&l(s,c),typeof c==`object`&&c&&typeof c.then==`function`?mc(e,t,Xa(c,r),jd(e)):mc(e,t,r,jd(e))}catch(n){mc(e,t,{then:function(){},status:`rejected`,reason:n},jd())}finally{T.p=a,o!==null&&s.types!==null&&(o.types=s.types),w.T=o}}function ic(){}function ac(e,t,n,r){if(e.tag!==5)throw Error(i(476));var a=oc(e).queue;rc(e,a,t,De,n===null?ic:function(){return sc(e),n(r)})}function oc(e){var t=e.memoizedState;if(t!==null)return t;t={memoizedState:De,baseState:De,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:gs,lastRenderedState:De},next:null};var n={};return t.next={memoizedState:n,baseState:n,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:gs,lastRenderedState:n},next:null},e.memoizedState=t,e=e.alternate,e!==null&&(e.memoizedState=t),t}function sc(e){var t=oc(e);t.next===null&&(t=e.alternate.memoizedState),mc(e,t.next.queue,{},jd())}function cc(){return Na(sh)}function lc(){return R().memoizedState}function uc(){return R().memoizedState}function dc(e){for(var t=e.return;t!==null;){switch(t.tag){case 24:case 3:var n=jd();e=wo(n);var r=To(t,e,n);r!==null&&(Pd(r,t,n),Eo(r,t,n)),t={cache:za()},e.payload=t;return}t=t.return}}function fc(e,t,n){var r=jd();n={lane:r,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null},gc(e)?_c(t,n):(n=Ii(e,t,n,r),n!==null&&(Pd(n,e,r),vc(n,t,r)))}function pc(e,t,n){mc(e,t,n,jd())}function mc(e,t,n,r){var i={lane:r,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null};if(gc(e))_c(t,i);else{var a=e.alternate;if(e.lanes===0&&(a===null||a.lanes===0)&&(a=t.lastRenderedReducer,a!==null))try{var o=t.lastRenderedState,s=a(o,n);if(i.hasEagerState=!0,i.eagerState=s,Zr(s,o))return Fi(e,t,i,0),G===null&&Pi(),!1}catch{}if(n=Ii(e,t,i,r),n!==null)return Pd(n,e,r),vc(n,t,r),!0}return!1}function hc(e,t,n,r){if(r={lane:2,revertLane:Pf(),gesture:null,action:r,hasEagerState:!1,eagerState:null,next:null},gc(e)){if(t)throw Error(i(479))}else t=Ii(e,n,r,2),t!==null&&Pd(t,e,2)}function gc(e){var t=e.alternate;return e===P||t!==null&&t===P}function _c(e,t){Zo=Xo=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function vc(e,t,n){if(n&4194048){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,Tt(e,n)}}var yc={readContext:Na,use:ms,useCallback:L,useContext:L,useEffect:L,useImperativeHandle:L,useLayoutEffect:L,useInsertionEffect:L,useMemo:L,useReducer:L,useRef:L,useState:L,useDebugValue:L,useDeferredValue:L,useTransition:L,useSyncExternalStore:L,useId:L,useHostTransitionStatus:L,useFormState:L,useActionState:L,useOptimistic:L,useMemoCache:L,useCacheRefresh:L,useEffectEvent:L},bc={readContext:Na,use:ms,useCallback:function(e,t){return ds().memoizedState=[e,t===void 0?null:t],e},useContext:Na,useEffect:Ws,useImperativeHandle:function(e,t,n){n=n==null?null:n.concat([e]),Hs(4194308,4,Xs.bind(null,t,e),n)},useLayoutEffect:function(e,t){return Hs(4194308,4,e,t)},useInsertionEffect:function(e,t){Hs(4,2,e,t)},useMemo:function(e,t){var n=ds();t=t===void 0?null:t;var r=e();if(Qo){ct(!0);try{e()}finally{ct(!1)}}return n.memoizedState=[r,t],r},useReducer:function(e,t,n){var r=ds();if(n!==void 0){var i=n(t);if(Qo){ct(!0);try{n(t)}finally{ct(!1)}}}else i=t;return r.memoizedState=r.baseState=i,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:i},r.queue=e,e=e.dispatch=fc.bind(null,P,e),[r.memoizedState,e]},useRef:function(e){var t=ds();return e={current:e},t.memoizedState=e},useState:function(e){e=Es(e);var t=e.queue,n=pc.bind(null,P,t);return t.dispatch=n,[e.memoizedState,n]},useDebugValue:Qs,useDeferredValue:function(e,t){return tc(ds(),e,t)},useTransition:function(){var e=Es(!1);return e=rc.bind(null,P,e.queue,!0,!1),ds().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,t,n){var r=P,a=ds();if(M){if(n===void 0)throw Error(i(407));n=n()}else{if(n=t(),G===null)throw Error(i(349));q&127||xs(r,t,n)}a.memoizedState=n;var o={value:n,getSnapshot:t};return a.queue=o,Ws(Cs.bind(null,r,o,e),[e]),r.flags|=2048,Bs(9,{destroy:void 0},Ss.bind(null,r,o,n,t),null),n},useId:function(){var e=ds(),t=G.identifierPrefix;if(M){var n=sa,r=oa;n=(r&~(1<<32-O(r)-1)).toString(32)+n,t=`_`+t+`R_`+n,n=$o++,0<n&&(t+=`H`+n.toString(32)),t+=`_`}else n=ns++,t=`_`+t+`r_`+n.toString(32)+`_`;return e.memoizedState=t},useHostTransitionStatus:cc,useFormState:Fs,useActionState:Fs,useOptimistic:function(e){var t=ds();t.memoizedState=t.baseState=e;var n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return t.queue=n,t=hc.bind(null,P,!0,n),n.dispatch=t,[e,t]},useMemoCache:hs,useCacheRefresh:function(){return ds().memoizedState=dc.bind(null,P)},useEffectEvent:function(e){var t=ds(),n={impl:e};return t.memoizedState=n,function(){if(W&2)throw Error(i(440));return n.impl.apply(void 0,arguments)}}},xc={readContext:Na,use:ms,useCallback:$s,useContext:Na,useEffect:Gs,useImperativeHandle:Zs,useInsertionEffect:Js,useLayoutEffect:Ys,useMemo:ec,useReducer:_s,useRef:Vs,useState:function(){return _s(gs)},useDebugValue:Qs,useDeferredValue:function(e,t){return nc(R(),F.memoizedState,e,t)},useTransition:function(){var e=_s(gs)[0],t=R().memoizedState;return[typeof e==`boolean`?e:ps(e),t]},useSyncExternalStore:bs,useId:lc,useHostTransitionStatus:cc,useFormState:Is,useActionState:Is,useOptimistic:function(e,t){return Ds(R(),F,e,t)},useMemoCache:hs,useCacheRefresh:uc,useEffectEvent:qs},Sc={readContext:Na,use:ms,useCallback:$s,useContext:Na,useEffect:Gs,useImperativeHandle:Zs,useInsertionEffect:Js,useLayoutEffect:Ys,useMemo:ec,useReducer:ys,useRef:Vs,useState:function(){return ys(gs)},useDebugValue:Qs,useDeferredValue:function(e,t){var n=R();return F===null?tc(n,e,t):nc(n,F.memoizedState,e,t)},useTransition:function(){var e=ys(gs)[0],t=R().memoizedState;return[typeof e==`boolean`?e:ps(e),t]},useSyncExternalStore:bs,useId:lc,useHostTransitionStatus:cc,useFormState:zs,useActionState:zs,useOptimistic:function(e,t){var n=R();return F===null?(n.baseState=e,[e,n.queue.dispatch]):Ds(n,F,e,t)},useMemoCache:hs,useCacheRefresh:uc,useEffectEvent:qs};function Cc(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:C({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var wc={enqueueSetState:function(e,t,n){e=e._reactInternals;var r=jd(),i=wo(r);i.payload=t,n!=null&&(i.callback=n),t=To(e,i,r),t!==null&&(Pd(t,e,r),Eo(t,e,r))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=jd(),i=wo(r);i.tag=1,i.payload=t,n!=null&&(i.callback=n),t=To(e,i,r),t!==null&&(Pd(t,e,r),Eo(t,e,r))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=jd(),r=wo(n);r.tag=2,t!=null&&(r.callback=t),t=To(e,r,n),t!==null&&(Pd(t,e,n),Eo(t,e,n))}};function Tc(e,t,n,r,i,a,o){return e=e.stateNode,typeof e.shouldComponentUpdate==`function`?e.shouldComponentUpdate(r,a,o):t.prototype&&t.prototype.isPureReactComponent?!Qr(n,r)||!Qr(i,a):!0}function Ec(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps==`function`&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps==`function`&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&wc.enqueueReplaceState(t,t.state,null)}function Dc(e,t){var n=t;if(`ref`in t)for(var r in n={},t)r!==`ref`&&(n[r]=t[r]);if(e=e.defaultProps)for(var i in n===t&&(n=C({},n)),e)n[i]===void 0&&(n[i]=e[i]);return n}function Oc(e){Ai(e)}function kc(e){console.error(e)}function Ac(e){Ai(e)}function jc(e,t){try{var n=e.onUncaughtError;n(t.value,{componentStack:t.stack})}catch(e){setTimeout(function(){throw e})}}function Mc(e,t,n){try{var r=e.onCaughtError;r(n.value,{componentStack:n.stack,errorBoundary:t.tag===1?t.stateNode:null})}catch(e){setTimeout(function(){throw e})}}function Nc(e,t,n){return n=wo(n),n.tag=3,n.payload={element:null},n.callback=function(){jc(e,t)},n}function Pc(e){return e=wo(e),e.tag=3,e}function Fc(e,t,n,r){var i=n.type.getDerivedStateFromError;if(typeof i==`function`){var a=r.value;e.payload=function(){return i(a)},e.callback=function(){Mc(t,n,r)}}var o=n.stateNode;o!==null&&typeof o.componentDidCatch==`function`&&(e.callback=function(){Mc(t,n,r),typeof i!=`function`&&(yd===null?yd=new Set([this]):yd.add(this));var e=r.stack;this.componentDidCatch(r.value,{componentStack:e===null?``:e})})}function Ic(e,t,n,r,a){if(n.flags|=32768,typeof r==`object`&&r&&typeof r.then==`function`){if(t=n.alternate,t!==null&&Aa(t,n,a,!0),n=Ro.current,n!==null){switch(n.tag){case 31:case 13:case 19:return zo===null?Kd():n.alternate===null&&Y===0&&(Y=3),n.flags&=-257,n.flags|=65536,n.lanes=a,r===ao?n.flags|=16384:(t=n.updateQueue,t===null?n.updateQueue=new Set([r]):t.add(r),mf(e,r,a)),!1;case 22:return n.flags|=65536,r===ao?n.flags|=16384:(t=n.updateQueue,t===null?(t={transitions:null,markerInstances:null,retryQueue:new Set([r])},n.updateQueue=t):(n=t.retryQueue,n===null?t.retryQueue=new Set([r]):n.add(r)),mf(e,r,a)),!1}throw Error(i(435,n.tag))}return mf(e,r,a),Kd(),!1}if(M)return t=Ro.current,t===null?(r!==ha&&(t=Error(i(423),{cause:r}),Sa(Qi(t,n))),e=e.current.alternate,e.flags|=65536,a&=-a,e.lanes|=a,r=Qi(r,n),a=Nc(e.stateNode,r,a),Do(e,a),Y!==4&&(Y=2)):(!(t.flags&65536)&&(t.flags|=256),t.flags|=65536,t.lanes=a,r!==ha&&(e=Error(i(422),{cause:r}),Sa(Qi(e,n)))),!1;var o=Error(i(520),{cause:r});if(o=Qi(o,n),fd===null?fd=[o]:fd.push(o),Y!==4&&(Y=2),t===null)return!0;r=Qi(r,n),n=t;do{switch(n.tag){case 3:return n.flags|=65536,e=a&-a,n.lanes|=e,e=Nc(n.stateNode,r,e),Do(n,e),!1;case 1:if(t=n.type,o=n.stateNode,!(n.flags&128)&&(typeof t.getDerivedStateFromError==`function`||o!==null&&typeof o.componentDidCatch==`function`&&(yd===null||!yd.has(o))))return n.flags|=65536,a&=-a,n.lanes|=a,a=Pc(a),Fc(a,e,n,r),Do(n,a),!1;break;case 22:if(n.memoizedState!==null)return n.flags|=65536,!1}n=n.return}while(n!==null);return!1}var Lc=Error(i(461)),z=!1;function B(e,t,n,r){t.child=e===null?bo(t,null,n,r):yo(t,e.child,n,r)}function Rc(e,t,n,r,i){n=n.render;var a=t.ref;if(`ref`in r){var o={};for(var s in r)s!==`ref`&&(o[s]=r[s])}else o=r;return Ma(t),r=is(e,t,n,o,a,i),s=cs(),e!==null&&!z?(ls(e,t,i),fl(e,t,i)):(M&&s&&ua(t),t.flags|=1,B(e,t,r,i),t.child)}function zc(e,t,n,r,i){if(e===null){var a=n.type;return typeof a==`function`&&!Ui(a)&&a.defaultProps===void 0&&n.compare===null?(t.tag=15,t.type=a,Bc(e,t,a,r,i)):(e=Ki(n.type,null,r,t,t.mode,i),e.ref=t.ref,e.return=t,t.child=e)}if(a=e.child,!pl(e,i)){var o=a.memoizedProps;if(n=n.compare,n=n===null?Qr:n,n(o,r)&&e.ref===t.ref)return fl(e,t,i)}return t.flags|=1,e=Wi(a,r),e.ref=t.ref,e.return=t,t.child=e}function Bc(e,t,n,r,i){if(e!==null){var a=e.memoizedProps;if(Qr(a,r)&&e.ref===t.ref){if(z=!1,t.pendingProps=r=a,pl(e,i))e.flags&131072&&(z=!0);else return t.lanes=e.lanes,fl(e,t,i)}}return Jc(e,t,n,r,i)}function Vc(e,t,n,r){var i=r.children,a=e===null?null:e.memoizedState;if(e===null&&t.stateNode===null&&(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),r.mode===`hidden`){if(t.flags&128){if(a=a===null?n:a.baseLanes|n,e!==null){for(r=t.child=e.child,i=0;r!==null;)i=i|r.lanes|r.childLanes,r=r.sibling;r=i&~a}else r=0,t.child=null;return Uc(e,t,a,n,r)}if(n&536870912)t.memoizedState={baseLanes:0,cachePool:null},e!==null&&eo(t,a===null?null:a.cachePool),a===null?Io():Fo(t,a),Ho(t);else return r=t.lanes=536870912,Uc(e,t,a===null?n:a.baseLanes|n,n,r)}else a===null?(e!==null&&eo(t,null),Io(),Uo()):(eo(t,a.cachePool),Fo(t,a),Uo(),t.memoizedState=null);return B(e,t,i,n),t.child}function Hc(e,t){return e!==null&&e.tag===22||t.stateNode!==null||(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),t.sibling}function Uc(e,t,n,r,i){var a=$a();return a=a===null?null:{parent:N._currentValue,pool:a},t.memoizedState={baseLanes:n,cachePool:a},e!==null&&eo(t,null),Io(),Ho(t),e!==null&&Aa(e,t,r,!0),t.childLanes=i,null}function Wc(e,t){return t=rl({mode:t.mode,children:t.children},e.mode),t.ref=e.ref,e.child=t,t.return=e,t}function Gc(e,t,n){return yo(t,e.child,null,n),e=Wc(t,t.pendingProps),e.flags|=2,Wo(t),t.memoizedState=null,e}function Kc(e,t,n){var r=t.pendingProps,a=!!(t.flags&128);if(t.flags&=-129,e===null){if(M){if(r.mode===`hidden`)return e=Wc(t,r),t.lanes=536870912,e.memoizedState={baseLanes:0,cachePool:null},Hc(null,e);if(Vo(t),(e=j)?(e=am(e,ma),e=e!==null&&e.data===`&`?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:aa===null?null:{id:oa,overflow:sa},retryLane:536870912,hydrationErrors:null},n=Yi(e),n.return=t,t.child=n,A=t,j=null)):e=null,e===null)throw ga(t);return t.lanes=536870912,null}return Wc(t,r)}var o=e.memoizedState;if(o!==null){var s=o.dehydrated;if(Vo(t),a){if(t.flags&256)t.flags&=-257,t=Gc(e,t,n);else if(t.memoizedState!==null)t.child=e.child,t.flags|=128,t=null;else throw Error(i(558))}else if(z||Aa(e,t,n,!1),a=(n&e.childLanes)!==0,z||a){if(No.current===null){if(r=G,r!==null&&(s=Et(r,n),s!==0&&s!==o.retryLane))throw o.retryLane=s,Li(e,s),Pd(r,e,s),Lc;Kd()}t=Gc(e,t,n)}else e=o.treeContext,j=lm(s.nextSibling),A=t,M=!0,pa=null,ma=!1,e!==null&&fa(t,e),t=Wc(t,r),t.flags|=134221824;return t}return e=Wi(e.child,{mode:r.mode,children:r.children}),e.ref=t.ref,t.child=e,e.return=t,e}function qc(e,t){var n=t.ref;if(n===null)e!==null&&e.ref!==null&&(t.flags|=4194816);else{if(typeof n!=`function`&&typeof n!=`object`)throw Error(i(284));(e===null||e.ref!==n)&&(t.flags|=4194816)}}function Jc(e,t,n,r,i){return Ma(t),n=is(e,t,n,r,void 0,i),r=cs(),e!==null&&!z?(ls(e,t,i),fl(e,t,i)):(M&&r&&ua(t),t.flags|=1,B(e,t,n,i),t.child)}function Yc(e,t,n,r,i,a){return Ma(t),t.updateQueue=null,n=os(t,r,n,i),as(e),r=cs(),e!==null&&!z?(ls(e,t,a),fl(e,t,a)):(M&&r&&ua(t),t.flags|=1,B(e,t,n,a),t.child)}function Xc(e,t,n,r,i){if(Ma(t),t.stateNode===null){var a=Bi,o=n.contextType;typeof o==`object`&&o&&(a=Na(o)),a=new n(r,a),t.memoizedState=a.state!==null&&a.state!==void 0?a.state:null,a.updater=wc,t.stateNode=a,a._reactInternals=t,a=t.stateNode,a.props=r,a.state=t.memoizedState,a.refs={},So(t),o=n.contextType,a.context=typeof o==`object`&&o?Na(o):Bi,a.state=t.memoizedState,o=n.getDerivedStateFromProps,typeof o==`function`&&(Cc(t,n,o,r),a.state=t.memoizedState),typeof n.getDerivedStateFromProps==`function`||typeof a.getSnapshotBeforeUpdate==`function`||typeof a.UNSAFE_componentWillMount!=`function`&&typeof a.componentWillMount!=`function`||(o=a.state,typeof a.componentWillMount==`function`&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount==`function`&&a.UNSAFE_componentWillMount(),o!==a.state&&wc.enqueueReplaceState(a,a.state,null),Ao(t,r,a,i),ko(),a.state=t.memoizedState),typeof a.componentDidMount==`function`&&(t.flags|=4194308),r=!0}else if(e===null){a=t.stateNode;var s=t.memoizedProps,c=Dc(n,s);a.props=c;var l=a.context,u=n.contextType;o=Bi,typeof u==`object`&&u&&(o=Na(u));var d=n.getDerivedStateFromProps;u=typeof d==`function`||typeof a.getSnapshotBeforeUpdate==`function`,s=t.pendingProps!==s,u||typeof a.UNSAFE_componentWillReceiveProps!=`function`&&typeof a.componentWillReceiveProps!=`function`||(s||l!==o)&&Ec(t,a,r,o),xo=!1;var f=t.memoizedState;a.state=f,Ao(t,r,a,i),ko(),l=t.memoizedState,s||f!==l||xo?(typeof d==`function`&&(Cc(t,n,d,r),l=t.memoizedState),(c=xo||Tc(t,n,c,r,f,l,o))?(u||typeof a.UNSAFE_componentWillMount!=`function`&&typeof a.componentWillMount!=`function`||(typeof a.componentWillMount==`function`&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount==`function`&&a.UNSAFE_componentWillMount()),typeof a.componentDidMount==`function`&&(t.flags|=4194308)):(typeof a.componentDidMount==`function`&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=l),a.props=r,a.state=l,a.context=o,r=c):(typeof a.componentDidMount==`function`&&(t.flags|=4194308),r=!1)}else{a=t.stateNode,Co(e,t),o=t.memoizedProps,u=Dc(n,o),a.props=u,d=t.pendingProps,f=a.context,l=n.contextType,c=Bi,typeof l==`object`&&l&&(c=Na(l)),s=n.getDerivedStateFromProps,(l=typeof s==`function`||typeof a.getSnapshotBeforeUpdate==`function`)||typeof a.UNSAFE_componentWillReceiveProps!=`function`&&typeof a.componentWillReceiveProps!=`function`||(o!==d||f!==c)&&Ec(t,a,r,c),xo=!1,f=t.memoizedState,a.state=f,Ao(t,r,a,i),ko();var p=t.memoizedState;o!==d||f!==p||xo||e!==null&&e.dependencies!==null&&ja(e.dependencies)?(typeof s==`function`&&(Cc(t,n,s,r),p=t.memoizedState),(u=xo||Tc(t,n,u,r,f,p,c)||e!==null&&e.dependencies!==null&&ja(e.dependencies))?(l||typeof a.UNSAFE_componentWillUpdate!=`function`&&typeof a.componentWillUpdate!=`function`||(typeof a.componentWillUpdate==`function`&&a.componentWillUpdate(r,p,c),typeof a.UNSAFE_componentWillUpdate==`function`&&a.UNSAFE_componentWillUpdate(r,p,c)),typeof a.componentDidUpdate==`function`&&(t.flags|=4),typeof a.getSnapshotBeforeUpdate==`function`&&(t.flags|=1024)):(typeof a.componentDidUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=p),a.props=r,a.state=p,a.context=c,r=u):(typeof a.componentDidUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),r=!1)}return a=r,qc(e,t),r=!!(t.flags&128),a||r?(a=t.stateNode,n=r&&typeof n.getDerivedStateFromError!=`function`?null:a.render(),t.flags|=1,e!==null&&r?(t.child=yo(t,e.child,null,i),t.child=yo(t,null,n,i)):B(e,t,n,i),t.memoizedState=a.state,e=t.child):e=fl(e,t,i),e}function Zc(e,t,n,r){return ba(),t.flags|=256,B(e,t,n,r),t.child}var Qc={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function $c(e){return{baseLanes:e,cachePool:to()}}function el(e,t,n){return e=e===null?0:e.childLanes&~n,t&&(e|=ud),e}function tl(e,t,n){var r=t.pendingProps,i=!1,a=!!(t.flags&128),o;if((o=a)||(o=e!==null&&e.memoizedState===null?!1:!!(Go.current&2)),o&&(i=!0,t.flags&=-129),o=!!(t.flags&32),t.flags&=-33,e===null){if(M){if(i?Bo(t):Uo(),(e=j)?(e=am(e,ma),e=e!==null&&e.data!==`&`?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:aa===null?null:{id:oa,overflow:sa},retryLane:536870912,hydrationErrors:null},n=Yi(e),n.return=t,t.child=n,A=t,j=null)):e=null,e===null)throw ga(t);return t.lanes=sm(e)?32:536870912,null}return a=r.children,r=r.fallback,i?(Uo(),i=t.mode,a=rl({mode:`hidden`,children:a},i),r=qi(r,i,n,null),a.return=t,r.return=t,a.sibling=r,t.child=a,r=t.child,r.memoizedState=$c(n),r.childLanes=el(e,o,n),t.memoizedState=Qc,Hc(null,r)):(Bo(t),nl(t,a))}var s=e.memoizedState;if(s!==null){var c=s.dehydrated;if(c!==null)return al(e,t,a,o,r,c,s,n)}return i?(Uo(),i=r.fallback,a=t.mode,s=e.child,c=s.sibling,r=Wi(s,{mode:`hidden`,children:r.children}),r.subtreeFlags=s.subtreeFlags&1206910976,c===null?(i=qi(i,a,n,null),i.flags|=2):i=Wi(c,i),i.return=t,r.return=t,r.sibling=i,t.child=r,Hc(null,r),r=t.child,i=e.child.memoizedState,i===null?i=$c(n):(a=i.cachePool,a===null?a=to():(s=N._currentValue,a=a.parent===s?a:{parent:s,pool:s}),i={baseLanes:i.baseLanes|n,cachePool:a}),r.memoizedState=i,r.childLanes=el(e,o,n),t.memoizedState=Qc,Hc(e.child,r)):(Bo(t),n=e.child,e=n.sibling,n=Wi(n,{mode:`visible`,children:r.children}),n.return=t,n.sibling=null,e!==null&&(o=t.deletions,o===null?(t.deletions=[e],t.flags|=16):o.push(e)),t.child=n,t.memoizedState=null,n)}function nl(e,t){return t=rl({mode:`visible`,children:t},e.mode),t.return=e,e.child=t}function rl(e,t){return e=Hi(22,e,null,t),e.lanes=0,e}function il(e,t,n){return yo(t,e.child,null,n),e=nl(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function al(e,t,n,r,a,o,s,c){if(n)return t.flags&256?(Bo(t),t.flags&=-257,il(e,t,c)):t.memoizedState===null?(Uo(),o=a.fallback,s=t.mode,a=rl({mode:`visible`,children:a.children},s),o=qi(o,s,c,null),o.flags|=2,a.return=t,o.return=t,a.sibling=o,t.child=a,yo(t,e.child,null,c),a=t.child,a.memoizedState=$c(c),a.childLanes=el(e,r,c),t.memoizedState=Qc,Hc(null,a)):(Uo(),t.child=e.child,t.flags|=128,null);if(Bo(t),sm(o)){if(r=o.nextSibling&&o.nextSibling.dataset,r)var l=r.dgst;return r=l,r!==``&&(a=Error(i(419)),a.stack=``,a.digest=r,Sa({value:a,source:null,stack:null})),il(e,t,c)}if(z||Aa(e,t,c,!1),r=(c&e.childLanes)!==0,z||r){if(No.current!==null)return il(e,t,c);if(r=G,r!==null&&(a=Et(r,c),a!==0&&a!==s.retryLane))throw s.retryLane=a,Li(e,a),Pd(r,e,a),Lc;return om(o)||Kd(),il(e,t,c)}return om(o)?(t.flags|=192,t.child=e.child,null):(e=s.treeContext,j=lm(o.nextSibling),A=t,M=!0,pa=null,ma=!1,e!==null&&fa(t,e),t=nl(t,a.children),t.flags|=134221824,t)}function ol(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),Oa(e.return,t,n)}function sl(e){for(var t=null;e!==null;){var n=e.alternate;n!==null&&Jo(n)===null&&(t=e),e=e.sibling}return t}function cl(e,t,n,r,i,a){var o=e.memoizedState;o===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:i,treeForkCount:a}:(o.isBackwards=t,o.rendering=null,o.renderingStartTime=0,o.last=r,o.tail=n,o.tailMode=i,o.treeForkCount=a)}function ll(e){var t=e.child;for(e.child=null;t!==null;){var n=t.sibling;t.sibling=e.child,e.child=t,t=n}}function ul(e,t,n){var r=t.pendingProps,i=r.revealOrder,a=r.tail;r=r.children;var o=Go.current;if(t.flags&128)return Ko(t,o),null;var s=!!(o&2);if(s?(o=o&1|2,t.flags|=128):o&=1,Ko(t,o),i===`backwards`&&e!==null?(ll(e),B(e,t,r,n),ll(e)):B(e,t,r,n),r=M?na:0,!s&&e!==null&&e.flags&128)a:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&ol(e,n,t);else if(e.tag===19)ol(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break a;for(;e.sibling===null;){if(e.return===null||e.return===t)break a;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(i){case`backwards`:n=sl(t.child),n===null?(i=t.child,t.child=null):(i=n.sibling,n.sibling=null,ll(t)),cl(t,!0,i,null,a,r);break;case`unstable_legacy-backwards`:for(n=null,i=t.child,t.child=null;i!==null;){if(e=i.alternate,e!==null&&Jo(e)===null){t.child=i;break}e=i.sibling,i.sibling=n,n=i,i=e}cl(t,!0,n,null,a,r);break;case`together`:cl(t,!1,null,null,void 0,r);break;case`independent`:t.memoizedState=null;break;default:n=sl(t.child),n===null?(i=t.child,t.child=null):(i=n.sibling,n.sibling=null),cl(t,!1,i,n,a,r)}return t.child}function dl(e,t,n){var r=t.pendingProps;return Ea(t,t.type,r.value),B(e,t,r.children,n),t.child}function fl(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),sd|=t.lanes,(n&t.childLanes)===0){if(e!==null){if(Aa(e,t,n,!1),(n&t.childLanes)===0)return null}else return null}if(e!==null&&t.child!==e.child)throw Error(i(153));if(t.child!==null){for(e=t.child,n=Wi(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=Wi(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function pl(e,t){return(e.lanes&t)!==0||(e=e.dependencies,!!(e!==null&&ja(e)))}function ml(e,t,n){switch(t.tag){case 3:Fe(t,t.stateNode.containerInfo),Ea(t,N,e.memoizedState.cache),ba();break;case 27:case 5:Le(t);break;case 4:Fe(t,t.stateNode.containerInfo);break;case 10:Ea(t,t.type,t.memoizedProps.value);break;case 31:if(t.memoizedState!==null)return t.flags|=128,Vo(t),null;break;case 13:var r=t.memoizedState;if(r!==null){if(r.dehydrated!==null)return Bo(t),t.flags|=128,null;r=Aa(e,t,n,!1);var i=t.child.childLanes;return r||(n&i)!==0?tl(e,t,n):(Bo(t),e=fl(e,t,n),e===null?null:e.sibling)}Bo(t);break;case 19:if(t.flags&128)return ul(e,t,n);if(i=!!(e.flags&128),r=(n&t.childLanes)!==0,r||=(Aa(e,t,n,!1),(n&t.childLanes)!==0),i){if(r)return ul(e,t,n);t.flags|=128}if(i=t.memoizedState,i!==null&&(i.rendering=null,i.tail=null,i.lastEffect=null),Ko(t,Go.current),r)break;return null;case 22:return t.lanes=0,Vc(e,t,n,t.pendingProps);case 24:Ea(t,N,e.memoizedState.cache)}return fl(e,t,n)}function hl(e,t,n){if(e!==null){if(e.memoizedProps!==t.pendingProps)z=!0;else{if(!pl(e,n)&&!(t.flags&128))return z=!1,ml(e,t,n);z=!!(e.flags&131072)}}else z=!1,M&&t.flags&1048576&&la(t,na,t.index);switch(t.lanes=0,t.tag){case 16:a:{var r=t.pendingProps;if(e=co(t.elementType),t.type=e,typeof e==`function`)Ui(e)?(r=Dc(e,r),t.tag=1,t=Xc(null,t,e,r,n)):(t.tag=0,t=Jc(null,t,e,r,n));else{if(e!=null){var a=e.$$typeof;if(a===fe){t.tag=11,t=Rc(null,t,e,r,n);break a}if(a===he){t.tag=14,t=zc(null,t,e,r,n);break a}if(a===de){t.tag=10,t.type=e,t=dl(null,t,n);break a}}throw t=Te(e)||e,Error(i(306,t,``))}}return t;case 0:return Jc(e,t,t.type,t.pendingProps,n);case 1:return r=t.type,a=Dc(r,t.pendingProps),Xc(e,t,r,a,n);case 3:a:{if(Fe(t,t.stateNode.containerInfo),e===null)throw Error(i(387));r=t.pendingProps;var o=t.memoizedState;a=o.element,Co(e,t),Ao(t,r,null,n);var s=t.memoizedState;if(r=s.cache,Ea(t,N,r),r!==o.cache&&ka(t,[N],n,!0),ko(),r=s.element,o.isDehydrated){if(o={element:r,isDehydrated:!1,cache:s.cache},t.updateQueue.baseState=o,t.memoizedState=o,t.flags&256){t=Zc(e,t,r,n);break a}if(r!==a){a=Qi(Error(i(424)),t),Sa(a),t=Zc(e,t,r,n);break a}switch(e=t.stateNode.containerInfo,e.nodeType){case 9:e=e.body;break;default:e=e.nodeName===`HTML`?e.ownerDocument.body:e}for(j=lm(e.firstChild),A=t,M=!0,pa=null,ma=!0,n=bo(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|134221824,n=n.sibling}else{if(ba(),r===a){t=fl(e,t,n);break a}B(e,t,r,n)}t=t.child}return t;case 26:return qc(e,t),e===null?(n=Nm(t.type,null,t.pendingProps,null))?t.memoizedState=n:M||(t.stateNode=fp(t.type,t.pendingProps,Ne.current,t)):t.memoizedState=Nm(t.type,e.memoizedProps,t.pendingProps,e.memoizedState),null;case 27:return Le(t),e===null&&M&&(r=t.stateNode=hm(t.type,t.pendingProps,Ne.current),A=t,ma=!0,a=j,Sp(t.type)?(um=a,j=lm(r.firstChild)):j=a),B(e,t,t.pendingProps.children,n),qc(e,t),e===null&&(t.flags|=4194304),t.child;case 5:return e===null&&M&&((a=r=j)&&(r=rm(r,t.type,t.pendingProps,ma),r===null?a=!1:(t.stateNode=r,A=t,j=lm(r.firstChild),ma=!1,a=!0)),a||ga(t)),Le(t),a=t.type,o=t.pendingProps,s=e===null?null:e.memoizedProps,r=o.children,pp(a,o)?r=null:s!==null&&pp(a,s)&&(t.flags|=32),t.memoizedState!==null&&(a=is(e,t,ss,null,null,n),sh._currentValue=a),qc(e,t),B(e,t,r,n),t.child;case 6:return e===null&&M&&((e=n=j)&&(n=im(n,t.pendingProps,ma),n===null?e=!1:(t.stateNode=n,A=t,j=null,e=!0)),e||ga(t)),null;case 13:return tl(e,t,n);case 4:return Fe(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=yo(t,null,r,n):B(e,t,r,n),t.child;case 11:return Rc(e,t,t.type,t.pendingProps,n);case 7:return r=t.pendingProps,qc(e,t),B(e,t,r,n),t.child;case 8:return B(e,t,t.pendingProps.children,n),t.child;case 12:return B(e,t,t.pendingProps.children,n),t.child;case 10:return dl(e,t,n);case 9:return a=t.type._context,r=t.pendingProps.children,Ma(t),a=Na(a),r=r(a),t.flags|=1,B(e,t,r,n),t.child;case 14:return zc(e,t,t.type,t.pendingProps,n);case 15:return Bc(e,t,t.type,t.pendingProps,n);case 19:return ul(e,t,n);case 31:return Kc(e,t,n);case 22:return Vc(e,t,n,t.pendingProps);case 24:return Ma(t),r=Na(N),e===null?(a=$a(),a===null&&(a=G,o=za(),a.pooledCache=o,o.refCount++,o!==null&&(a.pooledCacheLanes|=n),a=o),t.memoizedState={parent:r,cache:a},So(t),Ea(t,N,a)):((e.lanes&n)!==0&&(Co(e,t),Ao(t,null,null,n),ko()),a=e.memoizedState,o=t.memoizedState,a.parent===r?(r=o.cache,Ea(t,N,r),r!==a.cache&&ka(t,[N],n,!0)):(a={parent:r,cache:r},t.memoizedState=a,t.lanes===0&&(t.memoizedState=t.updateQueue.baseState=a),Ea(t,N,r))),B(e,t,t.pendingProps.children,n),t.child;case 30:return t.stateNode===null&&(t.stateNode={autoName:null,paired:null,clones:null,ref:null}),r=t.pendingProps,r.name!=null&&r.name!==`auto`?t.flags|=e===null?18882560:18874368:M&&ua(t),e!==null&&e.memoizedProps.name!==r.name?t.flags|=4194816:qc(e,t),B(e,t,r.children,n),t.child;case 29:throw t.pendingProps}throw Error(i(156,t.tag))}function gl(e){e.flags|=4}function _l(e,t,n,r,i){var a;if((a=!!(e.mode&32))&&(a=n===null?Jm(t,r):Jm(t,r)&&(r.src!==n.src||r.srcSet!==n.srcSet)),a){if(e.flags|=16777216,(i&335544128)===i){if(e.stateNode.complete)e.flags|=8192;else if(Ud())e.flags|=8192;else throw lo=ao,ro}}else e.flags&=-16777217}function vl(e,t){if(t.type!==`stylesheet`||t.state.loading&4)e.flags&=-16777217;else if(e.flags|=16777216,!Ym(t)){if(Ud())e.flags|=8192;else throw lo=ao,ro}}function yl(e,t){t!==null&&(e.flags|=4),e.flags&16384&&(t=e.tag===22?536870912:bt(),e.lanes|=t,dd|=t)}function bl(e,t){if(!M)switch(e.tailMode){case`visible`:break;case`collapsed`:for(var n=e.tail,r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null;break;default:for(t=e.tail,n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null}}function V(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags&1206910976,r|=i.flags&1206910976,i.return=e,i=i.sibling;else for(i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags,r|=i.flags,i.return=e,i=i.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function xl(e,t,n){var r=t.pendingProps;switch(da(t),t.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return V(t),null;case 1:return V(t),null;case 3:return n=t.stateNode,r=null,e!==null&&(r=e.memoizedState.cache),t.memoizedState.cache!==r&&(t.flags|=2048),Da(N),Ie(),n.pendingContext&&(n.context=n.pendingContext,n.pendingContext=null),(e===null||e.child===null)&&(ya(t)?gl(t):e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,xa())),V(t),null;case 26:var a=t.type,o=t.memoizedState;return e===null?(gl(t),o===null?(V(t),_l(t,a,null,r,n)):(V(t),vl(t,o))):o?o===e.memoizedState?(V(t),t.flags&=-16777217):(gl(t),V(t),vl(t,o)):(e=e.memoizedProps,e!==r&&gl(t),V(t),_l(t,a,e,r,n)),null;case 27:if(Re(t),n=Ne.current,a=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==r&&gl(t);else{if(!r){if(t.stateNode===null)throw Error(i(166));return V(t),t.subtreeFlags&=-33554433,null}e=je.current,ya(t)?_a(t,e):(e=hm(a,r,n),t.stateNode=e,gl(t))}return V(t),t.subtreeFlags&=-33554433,null;case 5:if(Re(t),a=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==r&&gl(t);else{if(!r){if(t.stateNode===null)throw Error(i(166));return V(t),t.subtreeFlags&=-33554433,null}if(o=je.current,ya(t))_a(t,o);else{var s=lp(Ne.current);switch(o){case 1:o=s.createElementNS(`http://www.w3.org/2000/svg`,a);break;case 2:o=s.createElementNS(`http://www.w3.org/1998/Math/MathML`,a);break;default:switch(a){case`svg`:o=s.createElementNS(`http://www.w3.org/2000/svg`,a);break;case`math`:o=s.createElementNS(`http://www.w3.org/1998/Math/MathML`,a);break;case`script`:o=s.createElement(`div`),o.innerHTML=`<script><\/script>`,o=o.removeChild(o.firstChild);break;case`select`:o=typeof r.is==`string`?s.createElement(`select`,{is:r.is}):s.createElement(`select`),r.multiple?o.multiple=!0:r.size&&(o.size=r.size);break;default:o=typeof r.is==`string`?s.createElement(a,{is:r.is}):s.createElement(a)}}o[Mt]=t,o[Nt]=r;a:for(s=t.child;s!==null;){if(s.tag===5||s.tag===6)o.appendChild(s.stateNode);else if(s.tag!==4&&s.tag!==27&&s.child!==null){s.child.return=s,s=s.child;continue}if(s===t)break a;for(;s.sibling===null;){if(s.return===null||s.return===t)break a;s=s.return}s.sibling.return=s.return,s=s.sibling}t.stateNode=o;a:switch(np(o,a,r),a){case`button`:case`input`:case`select`:case`textarea`:r=!!r.autoFocus;break a;case`img`:r=!0;break a;default:r=!1}r&&gl(t)}}return V(t),t.subtreeFlags&=-33554433,_l(t,t.type,e===null?null:e.memoizedProps,t.pendingProps,n),null;case 6:if(e&&t.stateNode!=null)e.memoizedProps!==r&&gl(t);else{if(typeof r!=`string`&&t.stateNode===null)throw Error(i(166));if(e=Ne.current,ya(t)){if(e=t.stateNode,n=t.memoizedProps,r=null,a=A,a!==null)switch(a.tag){case 27:case 5:r=a.memoizedProps}e[Mt]=t,e=!!(e.nodeValue===n||r!==null&&!0===r.suppressHydrationWarning||ep(e.nodeValue,n)),e||ga(t,!0)}else e=lp(e).createTextNode(r),e[Mt]=t,t.stateNode=e}return V(t),null;case 31:if(n=t.memoizedState,e===null||e.memoizedState!==null){if(r=ya(t),n!==null){if(e===null){if(!r)throw Error(i(318));if(e=t.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(i(557));e[Mt]=t}else ba(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;V(t),e=!1}else n=xa(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=n),e=!0;if(!e)return t.flags&256?(Wo(t),t):(Wo(t),null);if(t.flags&128)throw Error(i(558))}return V(t),null;case 13:if(r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(a=ya(t),r!==null&&r.dehydrated!==null){if(e===null){if(!a)throw Error(i(318));if(a=t.memoizedState,a=a===null?null:a.dehydrated,!a)throw Error(i(317));a[Mt]=t}else ba(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;V(t),a=!1}else a=xa(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=a),a=!0;if(!a)return t.flags&256?(Wo(t),t):(Wo(t),null)}return Wo(t),t.flags&128?(t.lanes=n,t):(n=r!==null,e=e!==null&&e.memoizedState!==null,n&&(r=t.child,a=null,r.alternate!==null&&r.alternate.memoizedState!==null&&r.alternate.memoizedState.cachePool!==null&&(a=r.alternate.memoizedState.cachePool.pool),o=null,r.memoizedState!==null&&r.memoizedState.cachePool!==null&&(o=r.memoizedState.cachePool.pool),o!==a&&(r.flags|=2048)),n!==e&&n&&(t.child.flags|=8192),yl(t,t.updateQueue),V(t),null);case 4:return Ie(),e===null&&Wf(t.stateNode.containerInfo),t.flags|=67108864,V(t),null;case 10:return Da(t.type),V(t),null;case 19:if(qo(t),r=t.memoizedState,r===null)return V(t),null;if(a=!!(t.flags&128),o=r.rendering,o===null){if(a)bl(r,!1);else{if(Y!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(o=Jo(e),o!==null){for(t.flags|=128,bl(r,!1),e=o.updateQueue,t.updateQueue=e,yl(t,e),t.subtreeFlags=0,e=n,n=t.child;n!==null;)Gi(n,e),n=n.sibling;return Ko(t,Go.current&1|2),M&&ca(t,r.treeForkCount),t.child}e=e.sibling}r.tail!==null&&Ze()>_d&&(t.flags|=128,a=!0,bl(r,!1),t.lanes=4194304)}}else{if(!a){if(e=Jo(o),e!==null){if(t.flags|=128,a=!0,e=e.updateQueue,t.updateQueue=e,yl(t,e),bl(r,!0),r.tail===null&&r.tailMode!==`collapsed`&&r.tailMode!==`visible`&&!o.alternate&&!M)return V(t),null}else 2*Ze()-r.renderingStartTime>_d&&n!==536870912&&(t.flags|=128,a=!0,bl(r,!1),t.lanes=4194304)}r.isBackwards?(o.sibling=t.child,t.child=o):(e=r.last,e===null?t.child=o:e.sibling=o,r.last=o)}if(r.tail!==null){e=r.tail;a:{for(n=e;n!==null;){if(n.alternate!==null){n=!1;break a}n=n.sibling}n=!0}return r.rendering=e,r.tail=e.sibling,r.renderingStartTime=Ze(),e.sibling=null,o=Go.current,o=a?o&1|2:o&1,r.tailMode===`visible`||r.tailMode===`collapsed`||!n||M?Ko(t,o):(n=o,D(Ro,t),D(Go,n),zo===null&&(zo=t)),M&&ca(t,r.treeForkCount),e}return V(t),null;case 22:case 23:return Wo(t),Lo(),r=t.memoizedState!==null,e===null?r&&(t.flags|=8192):e.memoizedState!==null!==r&&(t.flags|=8192),r?n&536870912&&!(t.flags&128)&&(V(t),t.subtreeFlags&6&&(t.flags|=8192)):V(t),n=t.updateQueue,n!==null&&yl(t,n.retryQueue),n=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),r=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(r=t.memoizedState.cachePool.pool),r!==n&&(t.flags|=2048),e!==null&&E(Qa),null;case 24:return n=null,e!==null&&(n=e.memoizedState.cache),t.memoizedState.cache!==n&&(t.flags|=2048),Da(N),V(t),null;case 25:return null;case 30:return t.flags|=33554432,V(t),null}throw Error(i(156,t.tag))}function Sl(e,t){switch(da(t),t.tag){case 1:return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return Da(N),Ie(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 26:case 27:case 5:return Re(t),null;case 31:if(t.memoizedState!==null){if(Wo(t),t.alternate===null)throw Error(i(340));ba()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 13:if(Wo(t),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(i(340));ba()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return qo(t),e=t.flags,e&65536?(t.flags=e&-65537|128,e=t.memoizedState,e!==null&&(e.rendering=null,e.tail=null),t.flags|=4,t):null;case 4:return Ie(),null;case 10:return Da(t.type),null;case 22:case 23:return Wo(t),Lo(),e!==null&&E(Qa),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 24:return Da(N),null;case 25:return null;default:return null}}function Cl(e,t){switch(da(t),t.tag){case 3:Da(N),Ie();break;case 26:case 27:case 5:Re(t);break;case 4:Ie();break;case 31:t.memoizedState!==null&&Wo(t);break;case 13:Wo(t);break;case 19:qo(t);break;case 10:Da(t.type);break;case 22:case 23:Wo(t),Lo(),e!==null&&E(Qa);break;case 24:Da(N)}}function wl(e,t){try{var n=t.updateQueue,r=n===null?null:n.lastEffect;if(r!==null){var i=r.next;n=i;do{if((n.tag&e)===e){r=void 0;var a=n.create,o=n.inst;r=a(),o.destroy=r}n=n.next}while(n!==i)}}catch(e){Z(t,t.return,e)}}function Tl(e,t,n){try{var r=t.updateQueue,i=r===null?null:r.lastEffect;if(i!==null){var a=i.next;r=a;do{if((r.tag&e)===e){var o=r.inst,s=o.destroy;if(s!==void 0){o.destroy=void 0,i=t;var c=n,l=s;try{l()}catch(e){Z(i,c,e)}}}r=r.next}while(r!==a)}}catch(e){Z(t,t.return,e)}}function El(e){var t=e.updateQueue;if(t!==null){var n=e.stateNode;try{Mo(t,n)}catch(t){Z(e,e.return,t)}}}function Dl(e,t,n){n.props=Dc(e.type,e.memoizedProps),n.state=e.memoizedState;try{n.componentWillUnmount()}catch(n){Z(e,t,n)}}function Ol(e,t){try{var n=e.ref;if(n!==null){switch(e.tag){case 26:case 27:case 5:var r=e.stateNode;break;case 30:var i=e.stateNode,a=Di(e.memoizedProps,i);(i.ref===null||i.ref.name!==a)&&(i.ref=Pp(a)),r=i.ref;break;case 7:if(e.stateNode===null){var o=new Fp(e);h(e.child,!1,Qp,o,void 0,void 0),e.stateNode=o}r=e.stateNode;break;default:r=e.stateNode}typeof n==`function`?e.refCleanup=n(r):n.current=r}}catch(n){Z(e,t,n)}}function kl(e,t){var n=e.ref,r=e.refCleanup;if(n!==null){if(typeof r==`function`)try{r()}catch(n){Z(e,t,n)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof n==`function`)try{n(null)}catch(n){Z(e,t,n)}else n.current=null}}function Al(e,t){if((e.tag===5||e.tag===27||e.tag===6)&&e.alternate===null&&t!==null)for(var n=0;n<t.length;n++)em(e.stateNode,t[n])}function jl(e){for(var t=e.return;t!==null&&(Pl(t)&&em(e.stateNode,t.stateNode),!Nl(t));)t=t.return}function Ml(e){for(var t=e.return;t!==null&&(Pl(t)&&tm(e.stateNode,t.stateNode),!Nl(t));)t=t.return}function Nl(e){return e.tag===5||e.tag===3||e.tag===27}function Pl(e){return e&&e.tag===7&&e.stateNode!==null}function Fl(e){var t=e.type,n=e.memoizedProps,r=e.stateNode;try{a:switch(t){case`button`:case`input`:case`select`:case`textarea`:n.autoFocus&&r.focus();break a;case`img`:n.src?r.src=n.src:n.srcSet&&(r.srcset=n.srcSet)}}catch(t){Z(e,e.return,t)}}function Il(e,t,n){try{var r=e.stateNode;ip(r,e.type,n,t),r[Nt]=t}catch(t){Z(e,e.return,t)}}function Ll(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&Sp(e.type)||e.tag===4}function Rl(e){a:for(;;){for(;e.sibling===null;){if(e.return===null||Ll(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&Sp(e.type)||e.flags&2||e.child===null||e.tag===4)continue a;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function zl(e,t,n,r){var i=e.tag;if(i===5||i===6)i=e.stateNode,t?(n.nodeType===9?n.body:n.nodeName===`HTML`?n.ownerDocument.body:n).insertBefore(i,t):(t=n.nodeType===9?n.body:n.nodeName===`HTML`?n.ownerDocument.body:n,t.appendChild(i),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=On)),Al(e,r),k=!0;else if(i!==4&&(i===27&&(Al(e,r),r=null,Sp(e.type)&&(n=e.stateNode,t=null)),e=e.child,e!==null))for(zl(e,t,n,r),e=e.sibling;e!==null;)zl(e,t,n,r),e=e.sibling}function Bl(e,t,n,r){var i=e.tag;if(i===5||i===6)i=e.stateNode,t?n.insertBefore(i,t):n.appendChild(i),Al(e,r),k=!0;else if(i!==4&&(i===27&&(Al(e,r),r=null,Sp(e.type)&&(n=e.stateNode)),e=e.child,e!==null))for(Bl(e,t,n,r),e=e.sibling;e!==null;)Bl(e,t,n,r),e=e.sibling}function Vl(e){var t=e.stateNode,n=e.memoizedProps;try{for(var r=e.type,i=t.attributes;i.length;)t.removeAttributeNode(i[0]);np(t,r,n),t[Mt]=e,t[Nt]=n}catch(t){Z(e,e.return,t)}}var Hl=!1,Ul=null;function Wl(e){(e.tag===30||e.subtreeFlags&33554432)&&(Hl=!0)}var Gl=null;function Kl(){var e=Gl;return Gl=null,e}var ql=0;function Jl(e,t,n,r,i){return ql=0,Yl(e.child,t,n,r,i)}function Yl(e,t,n,r,i){for(var a=!1;e!==null;){if(e.tag===5){var o=e.stateNode;if(r!==null){var s=Op(o);r.push(s),s.view&&(a=!0)}else a||Op(o).view&&(a=!0);Hl=!0,Tp(o,ql===0?t:t+`_`+ql,n),ql++}else e.tag===22&&e.memoizedState!==null||e.tag===30&&i||Yl(e.child,t,n,r,i)&&(a=!0);e=e.sibling}return a}function Xl(e,t){for(;e!==null;)e.tag===5?Ep(e.stateNode,e.memoizedProps):e.tag===22&&e.memoizedState!==null||e.tag===30&&t||Xl(e.child,t),e=e.sibling}function Zl(e){if(e.subtreeFlags&18874368)for(e=e.child;e!==null;){if((e.tag!==22||e.memoizedState===null)&&(Zl(e),e.tag===30&&e.flags&18874368&&e.stateNode.paired)){var t=e.memoizedProps;if(t.name==null||t.name===`auto`)throw Error(i(544));var n=t.name;t=ki(t.default,t.share),t!==`none`&&(Jl(e,n,t,null,!1)||Xl(e.child,!1))}e=e.sibling}}function Ql(e,t){if(e.tag===30){var n=e.stateNode,r=e.memoizedProps,i=Di(r,n),a=ki(r.default,n.paired?r.share:r.enter);a===`none`?Zl(e):Jl(e,i,a,null,!1)?(Zl(e),n.paired||t||Nd(e,r.onEnter)):Xl(e.child,!1)}else if(e.subtreeFlags&33554432)for(e=e.child;e!==null;)Ql(e,t),e=e.sibling;else Zl(e)}function $l(e){if(Ul!==null&&Ul.size!==0){var t=Ul;if(e.subtreeFlags&18874368)for(e=e.child;e!==null;){if(e.tag!==22||e.memoizedState===null){if(e.tag===30&&e.flags&18874368){var n=e.memoizedProps,r=n.name;if(r!=null&&r!==`auto`){var i=t.get(r);if(i!==void 0){var a=ki(n.default,n.share);if(a!==`none`&&(Jl(e,r,a,null,!1)?(a=e.stateNode,i.paired=a,a.paired=i,Nd(e,n.onShare)):Xl(e.child,!1)),t.delete(r),t.size===0)break}}}$l(e)}e=e.sibling}}}function eu(e){if(e.tag===30){var t=e.memoizedProps,n=Di(t,e.stateNode),r=Ul===null?void 0:Ul.get(n),i=ki(t.default,r===void 0?t.exit:t.share);i!==`none`&&(Jl(e,n,i,null,!1)?r===void 0?Nd(e,t.onExit):(i=e.stateNode,r.paired=i,i.paired=r,Ul.delete(n),Nd(e,t.onShare)):Xl(e.child,!1)),Ul!==null&&$l(e)}else if(e.subtreeFlags&33554432)for(e=e.child;e!==null;)eu(e),e=e.sibling;else Ul!==null&&$l(e)}function tu(e){for(e=e.child;e!==null;){if(e.tag===30){var t=e.memoizedProps,n=Di(t,e.stateNode);t=ki(t.default,t.update),e.flags&=-5,t!==`none`&&Jl(e,n,t,e.memoizedState=[],!1)}else e.subtreeFlags&33554432&&tu(e);e=e.sibling}}function nu(e){if(e.subtreeFlags&18874368)for(e=e.child;e!==null;){if(e.tag!==22||e.memoizedState===null){if(e.tag===30&&e.flags&18874368){var t=e.stateNode;t.paired!==null&&(t.paired=null,Xl(e.child,!1))}nu(e)}e=e.sibling}}function ru(e){if(e.tag===30)e.stateNode.paired=null,Xl(e.child,!1),nu(e);else if(e.subtreeFlags&33554432)for(e=e.child;e!==null;)ru(e),e=e.sibling;else nu(e)}function iu(e){for(e=e.child;e!==null;)e.tag===30?Xl(e.child,!1):e.subtreeFlags&33554432&&iu(e),e=e.sibling}function au(e,t,n,r,i,a,o){for(var s=!1;t!==null;){if(t.tag===5){var c=t.stateNode;if(a!==null&&ql<a.length){var l=a[ql],u=Op(c);(l.view||u.view)&&(s=!0);var d;if(d=!(e.flags&4)){if(u.clip)d=!0;else{d=l.rect;var f=u.rect;d=d.y!==f.y||d.x!==f.x||d.height!==f.height||d.width!==f.width}}d&&(e.flags|=4),u.abs?u=!l.abs:(l=l.rect,u=u.rect,u=l.height!==u.height||l.width!==u.width),u&&(e.flags|=32)}else e.flags|=32;e.flags&4&&Tp(c,ql===0?n:n+`_`+ql,i),s&&e.flags&4||(Gl===null&&(Gl=[]),Gl.push(c,ql===0?r:r+`_`+ql,t.memoizedProps)),ql++}else(t.tag!==22||t.memoizedState===null)&&(t.tag===30&&o?e.flags|=t.flags&32:au(e,t.child,n,r,i,a,o)&&(s=!0));t=t.sibling}return s}function ou(e,t){for(e=e.child;e!==null;){if(e.tag===30){var n=e.memoizedProps,r=e.stateNode,i=Di(n,r),a=ki(n.default,n.update);if(t){r=r.clones;var o=r===null?null:r.map(kp)}else o=e.memoizedState,e.memoizedState=null;r=e;var s=e.child;ql=0,i=au(r,s,i,i,a,o,!1),e.flags&4&&i&&(t||Nd(e,n.onUpdate))}else e.subtreeFlags&33554432&&ou(e,t);e=e.sibling}}var su=!1,H=!1,cu=!1,lu=!1,uu=typeof WeakSet==`function`?WeakSet:Set,du=null,fu=!1,pu=!1,mu=!1,hu=!1;function gu(e,t,n){if(e=e.containerInfo,sp=gh,e=ri(e),ii(e)){if(`selectionStart`in e)var r={start:e.selectionStart,end:e.selectionEnd};else a:{r=(r=e.ownerDocument)&&r.defaultView||window;var i=r.getSelection&&r.getSelection();if(i&&i.rangeCount!==0){r=i.anchorNode;var a=i.anchorOffset,o=i.focusNode;i=i.focusOffset;try{r.nodeType,o.nodeType}catch{r=null;break a}var s=0,c=-1,l=-1,u=0,d=0,f=e,p=null;b:for(;;){for(var m;f!==r||a!==0&&f.nodeType!==3||(c=s+a),f!==o||i!==0&&f.nodeType!==3||(l=s+i),f.nodeType===3&&(s+=f.nodeValue.length),(m=f.firstChild)!==null;)p=f,f=m;for(;;){if(f===e)break b;if(p===r&&++u===a&&(c=s),p===o&&++d===i&&(l=s),(m=f.nextSibling)!==null)break;f=p,p=f.parentNode}f=m}r=c===-1||l===-1?null:{start:c,end:l}}else r=null}r||={start:0,end:0}}else r=null;for(cp={focusedElem:e,selectionRange:r},gh=!1,n=(n&335544064)===n,du=t,t=n?9270:1024;du!==null;){if(e=du,n&&(r=e.deletions,r!==null))for(a=0;a<r.length;a++)n&&eu(r[a]);if(e.alternate===null&&e.flags&2)n&&Wl(e),_u(n);else{if(e.tag===22){if(r=e.alternate,e.memoizedState!==null){r!==null&&r.memoizedState===null&&n&&eu(r),_u(n);continue}if(r!==null&&r.memoizedState!==null){n&&Wl(e),_u(n);continue}}r=e.child,(e.subtreeFlags&t)!==0&&r!==null?(r.return=e,du=r):(n&&tu(e),_u(n))}}Ul=null}function _u(e){for(;du!==null;){var t=du,n=e,r=t.alternate,a=t.flags;switch(t.tag){case 0:case 11:case 15:break;case 1:if(a&1024&&r!==null){n=void 0,a=r.memoizedProps,r=r.memoizedState;var o=t.stateNode;try{var s=Dc(t.type,a);n=o.getSnapshotBeforeUpdate(s,r),o.__reactInternalSnapshotBeforeUpdate=n}catch(e){Z(t,t.return,e)}}break;case 3:if(a&1024){if(r=t.stateNode.containerInfo,n=r.nodeType,n===9)nm(r);else if(n===1)switch(r.nodeName){case`HEAD`:case`HTML`:case`BODY`:nm(r);break;default:r.textContent=``}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;case 30:n&&r!==null&&(n=Di(r.memoizedProps,r.stateNode),a=t.memoizedProps,a=ki(a.default,a.update),a!==`none`&&Jl(r,n,a,r.memoizedState=[],!0));break;default:if(a&1024)throw Error(i(163))}if(r=t.sibling,r!==null){r.return=t.return,du=r;break}du=t.return}}function vu(e,t,n){var r=n.flags;switch(n.tag){case 0:case 11:case 15:Lu(e,n),r&4&&wl(5,n);break;case 1:if(Lu(e,n),r&4){if(e=n.stateNode,t===null)try{e.componentDidMount()}catch(e){Z(n,n.return,e)}else{var i=Dc(n.type,t.memoizedProps);t=t.memoizedState;try{e.componentDidUpdate(i,t,e.__reactInternalSnapshotBeforeUpdate)}catch(e){Z(n,n.return,e)}}}r&64&&El(n),r&512&&Ol(n,n.return);break;case 3:if(Lu(e,n),r&64&&(e=n.updateQueue,e!==null)){if(t=null,n.child!==null)switch(n.child.tag){case 27:case 5:t=n.child.stateNode;break;case 1:t=n.child.stateNode}try{Mo(e,t)}catch(e){Z(n,n.return,e)}}break;case 27:t===null&&r&4&&Vl(n);case 26:case 5:Lu(e,n),t===null&&r&4&&Fl(n),r&512&&Ol(n,n.return);break;case 12:Lu(e,n);break;case 31:Lu(e,n),r&4&&Eu(e,n);break;case 13:Lu(e,n),r&4&&Du(e,n),r&64&&(e=n.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(n=_f.bind(null,n),cm(e,n))));break;case 22:if(r=n.memoizedState!==null||su,!r){var a=t!==null&&t.memoizedState!==null||H;t=su,i=H,su=r,(H=a)&&!i?(r=2,n.subtreeFlags&8772&&(r|=1),zu(e,n,r)):Lu(e,n),su=t,H=i}break;case 30:Lu(e,n),r&512&&Ol(n,n.return);break;case 7:r&512&&Ol(n,n.return);default:Lu(e,n)}}function yu(e,t){for(e=e.child;e!==null;)bu(e,t),e=e.sibling}function bu(e,t){switch(e.tag){case 5:case 26:try{var n=e.stateNode;if(t){var r=n.style;typeof r.setProperty==`function`?r.setProperty(`display`,`none`,`important`):r.display=`none`}else{var i=e.stateNode,a=e.memoizedProps.style,o=a!=null&&a.hasOwnProperty(`display`)?a.display:null;i.style.display=o==null||typeof o==`boolean`?``:(``+o).trim()}}catch(t){Z(e,e.return,t)}xu(e,t);break;case 6:try{e.stateNode.nodeValue=t?``:e.memoizedProps,k=!0}catch(t){Z(e,e.return,t)}break;case 18:try{var s=e.stateNode;t?wp(s,!0):wp(e.stateNode,!1)}catch(t){Z(e,e.return,t)}break;case 22:case 23:e.memoizedState===null&&yu(e,t);break;default:yu(e,t)}}function xu(e,t){if(e.subtreeFlags&67108864)for(e=e.child;e!==null;){a:{var n=e,r=t;switch(n.tag){case 4:bu(n,r);break a;case 22:n.memoizedState===null&&xu(n,r);break a;default:xu(n,r)}}e=e.sibling}}function Su(e){var t=e.alternate;t!==null&&(e.alternate=null,Su(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&Vt(t)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var U=null,Cu=!1;function wu(e,t,n){for(n=n.child;n!==null;)Tu(e,t,n),n=n.sibling}function Tu(e,t,n){if(st&&typeof st.onCommitFiberUnmount==`function`)try{st.onCommitFiberUnmount(ot,n)}catch{}switch(n.tag){case 26:H||kl(n,t),wu(e,t,n),n.memoizedState?n.memoizedState.count--:n.stateNode&&!H&&(n=n.stateNode,n.parentNode.removeChild(n));break;case 27:H||kl(n,t),Ml(n);var r=U,i=Cu;Sp(n.type)&&(U=n.stateNode,Cu=!1),wu(e,t,n),gm(n.stateNode,n.type,n.memoizedProps),U=r,Cu=i;break;case 5:H||kl(n,t),Ml(n);case 6:if(n.tag===6&&Ml(n),r=U,i=Cu,U=null,wu(e,t,n),U=r,Cu=i,U!==null){if(Cu)try{(U.nodeType===9?U.body:U.nodeName===`HTML`?U.ownerDocument.body:U).removeChild(n.stateNode),k=!0}catch(e){Z(n,t,e)}else try{U.removeChild(n.stateNode),k=!0}catch(e){Z(n,t,e)}}break;case 18:U!==null&&(Cu?(e=U,Cp(e.nodeType===9?e.body:e.nodeName===`HTML`?e.ownerDocument.body:e,n.stateNode),Hh(e)):Cp(U,n.stateNode));break;case 4:r=U,i=Cu,U=n.stateNode.containerInfo,Cu=!0,wu(e,t,n),U=r,Cu=i;break;case 0:case 11:case 14:case 15:Tl(2,n,t),H||Tl(4,n,t),wu(e,t,n);break;case 1:H||(kl(n,t),r=n.stateNode,typeof r.componentWillUnmount==`function`&&Dl(n,t,r)),wu(e,t,n);break;case 21:wu(e,t,n);break;case 22:H=(r=H)||n.memoizedState!==null,wu(e,t,n),H=r;break;case 30:kl(n,t),wu(e,t,n);break;case 7:H||kl(n,t),wu(e,t,n);break;default:wu(e,t,n)}}function Eu(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{Hh(e)}catch(e){Z(t,t.return,e)}}}function Du(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{Hh(e)}catch(e){Z(t,t.return,e)}}function Ou(e){switch(e.tag){case 31:case 13:case 19:var t=e.stateNode;return t===null&&(t=e.stateNode=new uu),t;case 22:return e=e.stateNode,t=e._retryCache,t===null&&(t=e._retryCache=new uu),t;default:throw Error(i(435,e.tag))}}function ku(e,t){var n=Ou(e);t.forEach(function(t){if(!n.has(t)){n.add(t);var r=vf.bind(null,e,t);t.then(r,r)}})}function Au(e,t,n){var r=t.deletions;if(r!==null)for(var a=0;a<r.length;a++){var o=r[a],s=e,c=t,l=c;a:for(;l!==null;){switch(l.tag){case 27:if(Sp(l.type)){U=l.stateNode,Cu=!1;break a}break;case 5:U=l.stateNode,Cu=!1;break a;case 3:case 4:U=l.stateNode.containerInfo,Cu=!0;break a}l=l.return}if(U===null)throw Error(i(160));Tu(s,c,o),U=null,Cu=!1,s=o.alternate,s!==null&&(s.return=null),o.return=null}if(t.subtreeFlags&13886)for(t=t.child;t!==null;)Mu(t,e,n),t=t.sibling}var ju=null;function Mu(e,t,n){var r=e.alternate,a=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(a&4&&(r=e.updateQueue,r=r===null?null:r.events,r!==null))for(var o=0;o<r.length;o++){var s=r[o];s.ref.impl=s.nextImpl}Au(t,e,n),Nu(e),a&4&&(Tl(3,e,e.return),wl(3,e),Tl(5,e,e.return));break;case 1:Au(t,e,n),Nu(e),a&512&&(H||r===null||kl(r,r.return)),a&64&&su&&(e=e.updateQueue,e!==null&&(t=e.callbacks,t!==null&&(n=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=n===null?t:n.concat(t))));break;case 26:if(o=ju,Au(t,e,n),Nu(e),a&512&&(H||r===null||kl(r,r.return)),a&4){if(a=r===null?null:r.memoizedState,n=e.memoizedState,r===null){if(n===null){if(e.stateNode===null){if(su)e.stateNode=fp(e.type,e.memoizedProps,t.containerInfo,e);else{a:{t=e.type,n=e.memoizedProps,a=o.ownerDocument||o;b:switch(t){case`title`:r=a.getElementsByTagName(`title`)[0],(!r||r[zt]||r[Mt]||r.namespaceURI===`http://www.w3.org/2000/svg`||r.hasAttribute(`itemprop`))&&(r=a.createElement(t),a.head.insertBefore(r,a.querySelector(`head > title`))),np(r,t,n),r[Mt]=e,Kt(r),t=r;break a;case`link`:if(o=Gm(`link`,`href`,a).get(t+(n.href||``))){for(s=0;s<o.length;s++)if(r=o[s],r.getAttribute(`href`)===(n.href==null||n.href===``?null:n.href)&&r.getAttribute(`rel`)===(n.rel==null?null:n.rel)&&r.getAttribute(`title`)===(n.title==null?null:n.title)&&r.getAttribute(`crossorigin`)===(n.crossOrigin==null?null:n.crossOrigin)){o.splice(s,1);break b}}r=a.createElement(t),np(r,t,n),a.head.appendChild(r);break;case`meta`:if(o=Gm(`meta`,`content`,a).get(t+(n.content||``))){for(s=0;s<o.length;s++)if(r=o[s],r.getAttribute(`content`)===(n.content==null?null:``+n.content)&&r.getAttribute(`name`)===(n.name==null?null:n.name)&&r.getAttribute(`property`)===(n.property==null?null:n.property)&&r.getAttribute(`http-equiv`)===(n.httpEquiv==null?null:n.httpEquiv)&&r.getAttribute(`charset`)===(n.charSet==null?null:n.charSet)){o.splice(s,1);break b}}r=a.createElement(t),np(r,t,n),a.head.appendChild(r);break;default:throw Error(i(468,t))}r[Mt]=e,Kt(r),t=r}e.stateNode=t}}else su||Km(o,e.type,e.stateNode)}else e.stateNode=Bm(o,n,e.memoizedProps)}else a===n?n===null&&e.stateNode!==null&&Il(e,e.memoizedProps,r.memoizedProps):(a===null?(t=r.stateNode,t===null||H||t.parentNode.removeChild(t)):a.count--,n===null?su||Km(o,e.type,e.stateNode):Bm(o,n,e.memoizedProps))}break;case 27:Au(t,e,n),Nu(e),a&512&&(H||r===null||kl(r,r.return)),r!==null&&a&4&&Il(e,e.memoizedProps,r.memoizedProps);break;case 5:if(o=cu,cu=!1,Au(t,e,n),cu=o,Nu(e),a&512&&(H||r===null||kl(r,r.return)),e.flags&32){t=e.stateNode;try{bn(t,``),k=!0}catch(t){Z(e,e.return,t)}}a&4&&e.stateNode!=null&&(t=e.memoizedProps,Il(e,t,r===null?t:r.memoizedProps)),a&1024&&(lu=!0);break;case 6:if(Au(t,e,n),Nu(e),a&4){if(e.stateNode===null)throw Error(i(162));t=e.memoizedProps,n=e.stateNode;try{n.nodeValue=t,k=!0}catch(t){Z(e,e.return,t)}}break;case 3:if(k=!1,Wm=null,o=ju,ju=bm(t.containerInfo),Au(t,e,n),ju=o,Nu(e),a&4&&r!==null&&r.memoizedState.isDehydrated)try{Hh(t.containerInfo)}catch(t){Z(e,e.return,t)}lu&&(lu=!1,Pu(e)),k=!1;break;case 4:a=cu,cu=su,r=nn(),o=ju,ju=bm(e.stateNode.containerInfo),Au(t,e,n),Nu(e),ju=o,k&&pu&&(mu=!0),k=r,cu=a;break;case 12:Au(t,e,n),Nu(e);break;case 31:Au(t,e,n),Nu(e),a&4&&(t=e.updateQueue,t!==null&&(e.updateQueue=null,ku(e,t)));break;case 13:Au(t,e,n),Nu(e),e.child.flags&8192&&e.memoizedState!==null!=(r!==null&&r.memoizedState!==null)&&(hd=Ze()),a&4&&(t=e.updateQueue,t!==null&&(e.updateQueue=null,ku(e,t)));break;case 22:o=e.memoizedState!==null,s=r!==null&&r.memoizedState!==null;var c=su,l=H,u=cu;su=c||o,cu=u||o,H=l||s,Au(t,e,n),H=l,cu=u,su=c,Nu(e),a&8192&&(t=e.stateNode,t._visibility=o?t._visibility&-2:t._visibility|1,!o||r===null||s||su||H||(t=s||H,n=su,r=H,su=o||su,H=t,Ru(e,2),su=n,H=r),!o&&cu||yu(e,o)),a&4&&(t=e.updateQueue,t!==null&&(n=t.retryQueue,n!==null&&(t.retryQueue=null,ku(e,n))));break;case 19:Au(t,e,n),Nu(e),a&4&&(t=e.updateQueue,t!==null&&(e.updateQueue=null,ku(e,t)));break;case 30:a&512&&(H||r===null||kl(r,r.return)),a=nn(),o=pu,s=(n&335544064)===n,c=e.memoizedProps,pu=s&&ki(c.default,c.update)!==`none`,Au(t,e,n),Nu(e),s&&r!==null&&k&&(e.flags|=4),pu=o,k=a;break;case 21:break;case 7:a&512&&(H||r===null||kl(r,r.return)),r&&r.stateNode!==null&&(r.stateNode._fragmentFiber=e);default:Au(t,e,n),Nu(e)}}function Nu(e){var t=e.flags;if(t&2){try{for(var n,r=e.return;r!==null;){if(Ll(r)){n=r;break}r=r.return}r=null;for(var a=e.return;a!==null;){if(Pl(a)){var o=a.stateNode;r===null?r=[o]:r.push(o)}if(Nl(a))break;a=a.return}var s=r;if(n==null)throw Error(i(160));switch(n.tag){case 27:var c=n.stateNode;Bl(e,Rl(e),c,s);break;case 5:var l=n.stateNode;n.flags&32&&(bn(l,``),n.flags&=-33),Bl(e,Rl(e),l,s);break;case 3:case 4:var u=n.stateNode.containerInfo;zl(e,Rl(e),u,s);break;default:throw Error(i(161))}}catch(t){Z(e,e.return,t)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function Pu(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var t=e;Pu(t),t.tag===5&&t.flags&1024&&(t=t.stateNode,gh=!0,t.reset(),gh=!1),e=e.sibling}}function Fu(e,t){if(t.subtreeFlags&9270)for(t=t.child;t!==null;)Iu(t,e),t=t.sibling;else ou(t,!1)}function Iu(e,t){var n=e.alternate;if(n===null)Ql(e,!1);else switch(e.tag){case 3:if(hu=fu=!1,Kl(),Fu(t,e),!fu&&!mu){if(e=Gl,e!==null)for(var r=0;r<e.length;r+=3){n=e[r];var i=e[r+1];Ep(n,e[r+2]),n=n.ownerDocument.documentElement,n!==null&&n.animate({opacity:[0,0],pointerEvents:[`none`,`none`]},{duration:0,fill:`forwards`,pseudoElement:`::view-transition-group(`+i+`)`})}e=t.containerInfo,e=e.nodeType===9?e.documentElement:e.ownerDocument.documentElement,e!==null&&e.style.viewTransitionName===``&&(e.style.viewTransitionName=`none`,e.animate({opacity:[0,0],pointerEvents:[`none`,`none`]},{duration:0,fill:`forwards`,pseudoElement:`::view-transition-group(root)`}),e.animate({width:[0,0],height:[0,0]},{duration:0,fill:`forwards`,pseudoElement:`::view-transition`})),hu=!0}Gl=null;break;case 5:Fu(t,e);break;case 4:r=fu,fu=!1,Fu(t,e),fu&&(mu=!0),fu=r;break;case 22:e.memoizedState===null&&(n.memoizedState===null?Fu(t,e):Ql(e,!1));break;case 30:r=fu,i=Kl(),fu=!1,Fu(t,e),fu&&(e.flags|=4);var a=e.memoizedProps,o=e.stateNode;t=Di(a,o),o=Di(n.memoizedProps,o);var s=ki(a.default,a.update);s===`none`?t=!1:(a=n.memoizedState,n.memoizedState=null,n=e.child,ql=0,t=au(e,n,t,o,s,a,!0),ql!==(a===null?0:a.length)&&(e.flags|=32)),e.flags&4&&t?(Nd(e,e.memoizedProps.onUpdate),Gl=i):i!==null&&(i.push.apply(i,Gl),Gl=i),fu=e.flags&32?!0:r;break;default:Fu(t,e)}}function Lu(e,t){if(t.subtreeFlags&8772)for(t=t.child;t!==null;)vu(e,t.alternate,t),t=t.sibling}function Ru(e,t){for(e=e.child;e!==null;){var n=e,r=t;switch(n.tag){case 0:case 11:case 14:case 15:Tl(4,n,n.return),Ru(n,r);break;case 1:kl(n,n.return);var i=n.stateNode;typeof i.componentWillUnmount==`function`&&Dl(n,n.return,i),Ru(n,r);break;case 27:r&2&&gm(n.stateNode,n.type,n.memoizedProps);case 5:kl(n,n.return),n.tag!==5&&n.tag!==27||Ml(n),Ru(n,r);break;case 6:Ml(n);break;case 26:kl(n,n.return),i=n.stateNode,n.memoizedState!==null||i===null||H||i.parentNode.removeChild(i),Ru(n,r);break;case 22:n.memoizedState===null&&Ru(n,r);break;case 30:kl(n,n.return),Ru(n,r);break;case 7:kl(n,n.return);default:Ru(n,r)}e=e.sibling}}function zu(e,t,n){for(n=t.subtreeFlags&8772?n:n&-2,t=t.child;t!==null;){var r=t.alternate,i=e,a=t,o=a.flags,s=!!(n&1);switch(a.tag){case 0:case 11:case 15:zu(i,a,n),wl(4,a);break;case 1:if(zu(i,a,n),r=a,i=r.stateNode,typeof i.componentDidMount==`function`)try{i.componentDidMount()}catch(e){Z(r,r.return,e)}if(r=a,i=r.updateQueue,i!==null){var c=r.stateNode;try{var l=i.shared.hiddenCallbacks;if(l!==null)for(i.shared.hiddenCallbacks=null,i=0;i<l.length;i++)jo(l[i],c)}catch(e){Z(r,r.return,e)}}s&&o&64&&El(a),Ol(a,a.return);break;case 27:n&2&&Vl(a);case 5:a.tag!==5&&a.tag!==27||jl(a),zu(i,a,n),s&&r===null&&o&4&&Fl(a),Ol(a,a.return);break;case 6:jl(a);break;case 26:c=a.stateNode,a.memoizedState!==null||c===null||su||Km(bm(c.ownerDocument),a.type,c),zu(i,a,n),s&&r===null&&o&4&&Fl(a),Ol(a,a.return);break;case 12:zu(i,a,n);break;case 31:zu(i,a,n),s&&o&4&&Eu(i,a);break;case 13:zu(i,a,n),s&&o&4&&Du(i,a);break;case 22:a.memoizedState===null&&zu(i,a,n),Ol(a,a.return);break;case 30:zu(i,a,n),Ol(a,a.return);break;case 7:Ol(a,a.return);default:zu(i,a,n)}t=t.sibling}}function Bu(e,t){var n=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),e=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(e=t.memoizedState.cachePool.pool),e!==n&&(e!=null&&e.refCount++,n!=null&&Ba(n))}function Vu(e,t){e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&Ba(e))}function Hu(e,t,n,r){var i=(n&335544064)===n;if(t.subtreeFlags&(i?10262:10256))for(t=t.child;t!==null;)Uu(e,t,n,r),t=t.sibling;else i&&iu(t)}function Uu(e,t,n,r){var i=(n&335544064)===n;i&&t.alternate===null&&t.return!==null&&t.return.alternate!==null&&ru(t);var a=t.flags;switch(t.tag){case 0:case 11:case 15:Hu(e,t,n,r),a&2048&&wl(9,t);break;case 1:Hu(e,t,n,r);break;case 3:Hu(e,t,n,r),i&&hu&&(e=e.containerInfo,e=e.nodeType===9?e.body:e.nodeName===`HTML`?e.ownerDocument.body:e,e.style.viewTransitionName===`root`&&(e.style.viewTransitionName=``),e=e.ownerDocument.documentElement,e!==null&&e.style.viewTransitionName===`none`&&(e.style.viewTransitionName=``)),a&2048&&(a=null,t.alternate!==null&&(a=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==a&&(t.refCount++,a!=null&&Ba(a)));break;case 12:if(a&2048){Hu(e,t,n,r),a=t.stateNode;try{var o=t.memoizedProps,s=o.id,c=o.onPostCommit;typeof c==`function`&&c(s,t.alternate===null?`mount`:`update`,a.passiveEffectDuration,-0)}catch(e){Z(t,t.return,e)}}else Hu(e,t,n,r);break;case 31:Hu(e,t,n,r);break;case 13:Hu(e,t,n,r);break;case 23:break;case 22:o=t.stateNode,s=t.alternate,t.memoizedState===null?(i&&s!==null&&s.memoizedState!==null&&ru(t),o._visibility&2?Hu(e,t,n,r):(o._visibility|=2,Wu(e,t,n,r,!!(t.subtreeFlags&10256)||!1))):(i&&s!==null&&s.memoizedState===null&&ru(s),o._visibility&2?Hu(e,t,n,r):Gu(e,t)),a&2048&&Bu(s,t);break;case 24:Hu(e,t,n,r),a&2048&&Vu(t.alternate,t);break;case 30:i&&(a=t.alternate,a!==null&&(Xl(a.child,!0),Xl(t.child,!0))),Hu(e,t,n,r);break;default:Hu(e,t,n,r)}}function Wu(e,t,n,r,i){for(i&&=!!(t.subtreeFlags&10256)||!1,t=t.child;t!==null;){var a=e,o=t,s=n,c=r,l=o.flags;switch(o.tag){case 0:case 11:case 15:Wu(a,o,s,c,i),wl(8,o);break;case 23:break;case 22:var u=o.stateNode;o.memoizedState===null?(u._visibility|=2,Wu(a,o,s,c,i)):u._visibility&2?Wu(a,o,s,c,i):Gu(a,o),i&&l&2048&&Bu(o.alternate,o);break;case 24:Wu(a,o,s,c,i),i&&l&2048&&Vu(o.alternate,o);break;default:Wu(a,o,s,c,i)}t=t.sibling}}function Gu(e,t){if(t.subtreeFlags&10256)for(t=t.child;t!==null;){var n=e,r=t,i=r.flags;switch(r.tag){case 22:Gu(n,r),i&2048&&Bu(r.alternate,r);break;case 24:Gu(n,r),i&2048&&Vu(r.alternate,r);break;default:Gu(n,r)}t=t.sibling}}var Ku=8192;function qu(e,t,n){if(e.subtreeFlags&Ku)for(e=e.child;e!==null;)Ju(e,t,n),e=e.sibling}function Ju(e,t,n){switch(e.tag){case 26:qu(e,t,n),e.flags&Ku&&(e.memoizedState===null?(e=e.stateNode,(t&335544128)===t&&Zm(n,e)):Qm(n,ju,e.memoizedState,e.memoizedProps));break;case 5:qu(e,t,n),e.flags&Ku&&(e=e.stateNode,(t&335544128)===t&&Zm(n,e));break;case 3:case 4:var r=ju;ju=bm(e.stateNode.containerInfo),qu(e,t,n),ju=r;break;case 22:e.memoizedState===null&&(r=e.alternate,r!==null&&r.memoizedState!==null?(r=Ku,Ku=16777216,qu(e,t,n),Ku=r):qu(e,t,n));break;case 30:if((e.flags&Ku)!==0&&(r=e.memoizedProps.name,r!=null&&r!==`auto`)){var i=e.stateNode;i.paired=null,Ul===null&&(Ul=new Map),Ul.set(r,i)}qu(e,t,n);break;default:qu(e,t,n)}}function Yu(e){var t=e.alternate;if(t!==null&&(e=t.child,e!==null)){t.child=null;do t=e.sibling,e.sibling=null,e=t;while(e!==null)}}function Xu(e){var t=e.deletions;if(e.flags&16){if(t!==null)for(var n=0;n<t.length;n++){var r=t[n];du=r,$u(r,e)}Yu(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)Zu(e),e=e.sibling}function Zu(e){switch(e.tag){case 0:case 11:case 15:Xu(e),e.flags&2048&&Tl(9,e,e.return);break;case 3:Xu(e);break;case 12:Xu(e);break;case 22:var t=e.stateNode;e.memoizedState!==null&&t._visibility&2&&(e.return===null||e.return.tag!==13)?(t._visibility&=-3,Qu(e)):Xu(e);break;default:Xu(e)}}function Qu(e){var t=e.deletions;if(e.flags&16){if(t!==null)for(var n=0;n<t.length;n++){var r=t[n];du=r,$u(r,e)}Yu(e)}for(e=e.child;e!==null;){switch(t=e,t.tag){case 0:case 11:case 15:Tl(8,t,t.return),Qu(t);break;case 22:n=t.stateNode,n._visibility&2&&(n._visibility&=-3,Qu(t));break;default:Qu(t)}e=e.sibling}}function $u(e,t){for(;du!==null;){var n=du;switch(n.tag){case 0:case 11:case 15:Tl(8,n,t);break;case 23:case 22:if(n.memoizedState!==null&&n.memoizedState.cachePool!==null){var r=n.memoizedState.cachePool.pool;r!=null&&r.refCount++}break;case 24:Ba(n.memoizedState.cache)}if(r=n.child,r!==null)r.return=n,du=r;else a:for(n=e;du!==null;){r=du;var i=r.sibling,a=r.return;if(Su(r),r===n){du=null;break a}if(i!==null){i.return=a,du=i;break a}du=a}}}var ed={getCacheForType:function(e){var t=Na(N),n=t.data.get(e);return n===void 0&&(n=e(),t.data.set(e,n)),n},cacheSignal:function(){return Na(N).controller.signal}},td=typeof WeakMap==`function`?WeakMap:Map,W=0,G=null,K=null,q=0,J=0,nd=null,rd=!1,id=!1,ad=!1,od=0,Y=0,sd=0,cd=0,ld=0,ud=0,dd=0,fd=null,pd=null,md=!1,hd=0,gd=0,_d=1/0,vd=null,yd=null,X=0,bd=null,xd=null,Sd=0,Cd=0,wd=null,Td=null,Ed=null,Dd=null,Od=null,kd=0,Ad=null;function jd(){return W&2&&q!==0?q&-q:w.T===null?kt():Pf()}function Md(){if(ud===0){if(!(q&536870912)||M){var e=pt;pt<<=1,!(pt&3932160)&&(pt=262144),ud=e}else ud=536870912}return e=Ro.current,e!==null&&(e.flags|=32),ud}function Nd(e,t){if(t!=null){var n=e.stateNode,r=n.ref;r===null&&(r=n.ref=Pp(Di(e.memoizedProps,n))),Dd===null&&(Dd=[]),Dd.push(t.bind(null,r))}}function Pd(e,t,n){(e===G&&(J===2||J===9)||e.cancelPendingCommit!==null)&&(Vd(e,0),Rd(e,q,ud,!1)),St(e,n),W&2&&e===G||(e===G&&(!(W&2)&&(cd|=n),Y===4&&Rd(e,q,ud,!1)),Ef(e))}function Fd(e,t,n){if(W&6)throw Error(i(327));var r=!n&&!(t&127)&&(t&e.expiredLanes)===0||_t(e,t),a=r?Yd(e,t):qd(e,t,!0),o=r;do{if(a===0){id&&!r&&Rd(e,t,0,!1);break}if(n=e.current.alternate,o&&!Ld(n))a=qd(e,t,!1),o=!1;else{if(a===2){if(o=t,e.errorRecoveryDisabledLanes&o)var s=0;else s=e.pendingLanes&-536870913,s=s===0?s&536870912?536870912:0:s;if(s!==0){t=s;a:{var c=e;a=fd;var l=c.current.memoizedState.isDehydrated;if(l&&(Vd(c,s).flags|=256),s=qd(c,s,!1),s!==2&&s!==6){if(ad&&!l){c.errorRecoveryDisabledLanes|=o,cd|=o,a=4;break a}o=pd,pd=a,o!==null&&(pd===null?pd=o:pd.push.apply(pd,o))}a=s}if(o=!1,a!==2)continue}}if(a===1){Vd(e,0),Rd(e,t,0,!0);break}a:{switch(r=e,o=a,o){case 0:case 1:throw Error(i(345));case 4:if((t&4194048)!==t&&(t&62914560)!==t)break;case 6:Rd(r,t,ud,!rd);break a;case 2:pd=null;break;case 3:case 5:break;default:throw Error(i(329))}if((t&62914560)===t&&(a=hd+300-Ze(),10<a)){if(Rd(r,t,ud,!rd),gt(r,0,!0)!==0)break a;Sd=t,r.timeoutHandle=gp(Id.bind(null,r,n,pd,vd,md,t,ud,cd,dd,rd,o,`Throttled`,-0,0),a);break a}Id(r,n,pd,vd,md,t,ud,cd,dd,rd,o,null,-0,0)}break}}while(1);Ef(e)}function Id(e,t,n,r,i,a,o,s,c,l,u,d,f,p){e.timeoutHandle=-1;var m=t.subtreeFlags,h=(a&335544064)===a;d=null,(h||m&8192||(m&16785408)==16785408)&&(d={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:On},Ul=null,Ju(t,a,d),h&&(m=d,h=e.containerInfo,h=(h.nodeType===9?h:h.ownerDocument).__reactViewTransition,h!=null&&(m.count++,m.waitingForViewTransition=!0,m=nh.bind(m),h.finished.then(m,m))),m=(a&62914560)===a?hd-Ze():(a&4194048)===a?gd-Ze():0,m=eh(d,m),m!==null)?(Sd=a,e.cancelPendingCommit=m(nf.bind(null,e,t,a,n,r,i,o,s,c,l,u,d,null,f,p)),Rd(e,a,o,!l)):nf(e,t,a,n,r,i,o,s,c,l,u,d)}function Ld(e){for(var t=e;;){var n=t.tag;if((n===0||n===11||n===15)&&t.flags&16384&&(n=t.updateQueue,n!==null&&(n=n.stores,n!==null)))for(var r=0;r<n.length;r++){var i=n[r],a=i.getSnapshot;i=i.value;try{if(!Zr(a(),i))return!1}catch{return!1}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function Rd(e,t,n,r){t=vt(e,t),t&=~ld,t&=~cd,e.suspendedLanes|=t,e.pingedLanes&=~t,r&&(e.warmLanes|=t),r=e.expirationTimes;for(var i=t;0<i;){var a=31-O(i),o=1<<a;r[a]=-1,i&=~o}n!==0&&wt(e,n,t)}function zd(){return W&6?!0:(Df(0,!1),!1)}function Bd(){if(K!==null){if(J===0)var e=K.return;else e=K,Ta=wa=null,us(e),po=null,mo=0,e=K;for(;e!==null;)Cl(e.alternate,e),e=e.return;K=null}}function Vd(e,t){var n=e.timeoutHandle;return n!==-1&&(e.timeoutHandle=-1,_p(n)),n=e.cancelPendingCommit,n!==null&&(e.cancelPendingCommit=null,n()),Sd=0,Bd(),G=e,K=n=Wi(e.current,null),q=t,J=0,nd=null,rd=!1,id=_t(e,t),ad=!1,dd=ud=ld=cd=sd=Y=0,pd=fd=null,md=!1,od=vt(e,t),Pi(),n}function Hd(e,t){P=null,w.H=yc,t===no||t===io?(t=uo(),J=3):t===ro?(t=uo(),J=4):J=t===Lc?8:typeof t==`object`&&t&&typeof t.then==`function`?6:1,nd=t,K===null&&(Y=1,jc(e,Qi(t,e.current)))}function Ud(){var e=Ro.current;return e===null?!0:(q&4194048)===q?zo===null:(q&62914560)===q||q&536870912?e===zo:!1}function Wd(){var e=w.H;return w.H=yc,e===null?yc:e}function Gd(){var e=w.A;return w.A=ed,e}function Kd(){Y=4,rd||(q&4194048)!==q&&Ro.current!==null||(id=!0),!(sd&134217727)&&!(cd&134217727)||G===null||Rd(G,q,ud,!1)}function qd(e,t,n){var r=W;W|=2;var i=Wd(),a=Gd();(G!==e||q!==t)&&(vd=null,Vd(e,t)),t=!1;var o=Y;a:do try{if(J!==0&&K!==null){var s=K,c=nd;switch(J){case 8:Bd(),o=6;break a;case 3:case 2:case 9:case 6:Ro.current===null&&(t=!0);var l=J;if(J=0,nd=null,$d(e,s,c,l),n&&id){o=0;break a}break;default:l=J,J=0,nd=null,$d(e,s,c,l)}}Jd(),o=Y;break}catch(t){Hd(e,t)}while(1);return t&&e.shellSuspendCounter++,Ta=wa=null,W=r,w.H=i,w.A=a,K===null&&(G=null,q=0,Pi()),o}function Jd(){for(;K!==null;)Zd(K)}function Yd(e,t){var n=W;W|=2;var r=Wd(),a=Gd();G!==e||q!==t?(vd=null,_d=Ze()+500,Vd(e,t)):id=_t(e,t);a:do try{if(J!==0&&K!==null){t=K;var o=nd;b:switch(J){case 1:J=0,nd=null,$d(e,t,o,1);break;case 2:case 9:if(oo(o)){J=0,nd=null,Qd(t);break}t=function(){J!==2&&J!==9||G!==e||(J=7),Ef(e)},o.then(t,t);break a;case 3:J=7;break a;case 4:J=5;break a;case 7:oo(o)?(J=0,nd=null,Qd(t)):(J=0,nd=null,$d(e,t,o,7));break;case 5:var s=null;switch(K.tag){case 26:s=K.memoizedState;case 5:case 27:var c=K;if(s?Ym(s):c.stateNode.complete){J=0,nd=null;var l=c.sibling;if(l!==null)K=l;else{var u=c.return;u===null?K=null:(K=u,ef(u))}break b}}J=0,nd=null,$d(e,t,o,5);break;case 6:J=0,nd=null,$d(e,t,o,6);break;case 8:Bd(),Y=6;break a;default:throw Error(i(462))}}Xd();break}catch(t){Hd(e,t)}while(1);return Ta=wa=null,w.H=r,w.A=a,W=n,K===null?(G=null,q=0,Pi(),Y):0}function Xd(){for(;K!==null&&!Ye();)Zd(K)}function Zd(e){var t=hl(e.alternate,e,od);e.memoizedProps=e.pendingProps,t===null?ef(e):K=t}function Qd(e){var t=e,n=t.alternate;switch(t.tag){case 15:case 0:t=Yc(n,t,t.pendingProps,t.type,void 0,q);break;case 11:t=Yc(n,t,t.pendingProps,t.type.render,t.ref,q);break;case 5:us(t);var r=t;r===A&&(M?(va(r),r.tag===5&&r.stateNode!=null&&(j=r.stateNode)):(va(r),M=!0));default:Cl(n,t),t=K=Gi(t,od),t=hl(n,t,od)}e.memoizedProps=e.pendingProps,t===null?ef(e):K=t}function $d(e,t,n,r){Ta=wa=null,us(t),po=null,mo=0;var i=t.return;try{if(Ic(e,i,t,n,q)){Y=1,jc(e,Qi(n,e.current)),K=null;return}}catch(t){if(i!==null)throw K=i,t;Y=1,jc(e,Qi(n,e.current)),K=null;return}t.flags&32768?(M||r===1?e=!0:id||q&536870912?e=!1:(rd=e=!0,(r===2||r===9||r===3||r===6)&&(r=Ro.current,r!==null&&r.tag===13&&(r.flags|=16384))),tf(t,e)):ef(t)}function ef(e){var t=e;do{if(t.flags&32768){tf(t,rd);return}e=t.return;var n=xl(t.alternate,t,od);if(n!==null){K=n;return}if(t=t.sibling,t!==null){K=t;return}K=t=e}while(t!==null);Y===0&&(Y=5)}function tf(e,t){do{var n=Sl(e.alternate,e);if(n!==null){n.flags&=32767,K=n;return}if(n=e.return,n!==null&&(n.flags|=32768,n.subtreeFlags=0,n.deletions=null),!t&&(e=e.sibling,e!==null)){K=e;return}K=e=n}while(e!==null);Y=6,K=null}function nf(e,t,n,r,a,o,s,c,l,u,d,f){e.cancelPendingCommit=null;do df();while(X!==0);if(W&6)throw Error(i(327));if(t!==null){if(t===e.current)throw Error(i(177));e===G&&(K=G=null,q=0),xd=t,bd=e,Sd=n,wd=a,Td=r,rf(e,t,n,s,c,l,f)}}function rf(e,t,n,r,i,a,o){var s=t.lanes|t.childLanes;if(Cd=s,s|=Ni,Ct(e,n,s,r,i,a),Dd=null,(n&335544064)===n?(Od=Ua(e),r=10262):(Od=null,r=10256),(t.subtreeFlags&r)!==0||(t.flags&r)!==0?(e.callbackNode=null,e.callbackPriority=0,yf(tt,function(){return ff(),null})):(e.callbackNode=null,e.callbackPriority=0),Hl=!1,r=!!(t.flags&13878),t.subtreeFlags&13878||r){r=w.T,w.T=null,i=T.p,T.p=2,a=W,W|=4;try{gu(e,t,n)}finally{W=a,T.p=i,w.T=r}}X=1,Hl?Ed=Mp(o,e.containerInfo,Od,sf,cf,of,lf,ff,af,null,null):(sf(),cf(),lf())}function af(e){if(X!==0){var t=bd.onRecoverableError;t(e,{componentStack:null})}}function of(){X===3&&(X=0,Iu(xd,bd),X=4)}function sf(){if(X===1){X=0;var e=bd,t=xd,n=Sd,r=!!(t.flags&13878);if(t.subtreeFlags&13878||r){r=w.T,w.T=null;var i=T.p;T.p=2;var a=W;W|=4;try{pu=mu=!1,Mu(t,e,n),n=cp;var o=ri(e.containerInfo),s=n.focusedElem,c=n.selectionRange;if(o!==s&&s&&s.ownerDocument&&ni(s.ownerDocument.documentElement,s)){if(c!==null&&ii(s)){var l=c.start,u=c.end;if(u===void 0&&(u=l),`selectionStart`in s)s.selectionStart=l,s.selectionEnd=Math.min(u,s.value.length);else{var d=s.ownerDocument||document,f=d&&d.defaultView||window;if(f.getSelection){var p=f.getSelection(),m=s.textContent.length,h=Math.min(c.start,m),g=c.end===void 0?h:Math.min(c.end,m);!p.extend&&h>g&&(o=g,g=h,h=o);var _=ti(s,h),v=ti(s,g);if(_&&v&&(p.rangeCount!==1||p.anchorNode!==_.node||p.anchorOffset!==_.offset||p.focusNode!==v.node||p.focusOffset!==v.offset)){var y=d.createRange();y.setStart(_.node,_.offset),p.removeAllRanges(),h>g?(p.addRange(y),p.extend(v.node,v.offset)):(y.setEnd(v.node,v.offset),p.addRange(y))}}}}for(d=[],p=s;p=p.parentNode;)p.nodeType===1&&d.push({element:p,left:p.scrollLeft,top:p.scrollTop});for(typeof s.focus==`function`&&s.focus(),s=0;s<d.length;s++){var b=d[s];b.element.scrollLeft=b.left,b.element.scrollTop=b.top}}gh=!!sp,cp=sp=null}finally{W=a,T.p=i,w.T=r}}e.current=t,X=2}}function cf(){if(X===2){X=0;var e=bd,t=xd,n=!!(t.flags&8772);if(t.subtreeFlags&8772||n){n=w.T,w.T=null;var r=T.p;T.p=2;var i=W;W|=4;try{vu(e,t.alternate,t)}finally{W=i,T.p=r,w.T=n}}X=3}}function lf(){if(X===4||X===3){X=0;var e=Ed;Ed=null,Xe();var t=bd,n=xd,r=Sd,i=Td,a=(r&335544064)===r?10262:10256;if((n.subtreeFlags&a)!==0||(n.flags&a)!==0?X=5:(X=0,xd=bd=null,uf(t,t.pendingLanes)),a=t.pendingLanes,a===0&&(yd=null),Ot(r),n=n.stateNode,st&&typeof st.onCommitFiberRoot==`function`)try{st.onCommitFiberRoot(ot,n,void 0,(n.current.flags&128)==128)}catch{}if(i!==null){n=w.T,a=T.p,T.p=2,w.T=null;try{for(var o=t.onRecoverableError,s=0;s<i.length;s++){var c=i[s];o(c.value,{componentStack:c.stack})}}finally{w.T=n,T.p=a}}if(i=Dd,o=Od,Od=null,i!==null&&(Dd=null,o===null&&(o=[]),e!==null))for(c=0;c<i.length;c++)n=(0,i[c])(o),n!==void 0&&e.finished.finally(n);Sd&3&&df(),Ef(t),a=t.pendingLanes,r&261930&&a&42?t===Ad?kd++:(kd=0,Ad=t):(kd=0,Ad=null),Df(0,!1)}}function uf(e,t){(e.pooledCacheLanes&=t)===0&&(t=e.pooledCache,t!=null&&(e.pooledCache=null,Ba(t)))}function df(){return Ed!==null&&(Ed.skipTransition(),Ed=null),sf(),cf(),lf(),ff()}function ff(){if(X!==5)return!1;var e=bd,t=Cd;Cd=0;var n=Ot(Sd),r=w.T,a=T.p;try{T.p=32>n?32:n,w.T=null,n=wd,wd=null;var o=bd,s=Sd;if(X=0,xd=bd=null,Sd=0,W&6)throw Error(i(331));var c=W;if(W|=4,Zu(o.current),Uu(o,o.current,s,n),W=c,Df(0,!1),st&&typeof st.onPostCommitFiberRoot==`function`)try{st.onPostCommitFiberRoot(ot,o)}catch{}return!0}finally{T.p=a,w.T=r,uf(e,t)}}function pf(e,t,n){t=Qi(n,t),t=Nc(e.stateNode,t,2),e=To(e,t,2),e!==null&&(St(e,2),Ef(e))}function Z(e,t,n){if(e.tag===3)pf(e,e,n);else for(;t!==null;){if(t.tag===3){pf(t,e,n);break}if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError==`function`||typeof r.componentDidCatch==`function`&&(yd===null||!yd.has(r))){e=Qi(n,e),n=Pc(2),r=To(t,n,2),r!==null&&(Fc(n,r,t,e),St(r,2),Ef(r));break}}t=t.return}}function mf(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new td;var i=new Set;r.set(t,i)}else i=r.get(t),i===void 0&&(i=new Set,r.set(t,i));i.has(n)||(ad=!0,i.add(n),e=hf.bind(null,e,t,n),t.then(e,e))}function hf(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),e.pingedLanes|=e.suspendedLanes&n,e.warmLanes&=~n,G===e&&(q&n)===n&&(Y===4||Y===3&&(q&62914560)===q&&300>Ze()-hd?W&2?ld|=n:Vd(e,0):ld|=n,dd===q&&(dd=0)),Ef(e)}function gf(e,t){t===0&&(t=bt()),e=Li(e,t),e!==null&&(St(e,t),Ef(e))}function _f(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),gf(e,n)}function vf(e,t){var n=0;switch(e.tag){case 31:case 13:var r=e.stateNode,a=e.memoizedState;a!==null&&(n=a.retryLane);break;case 19:r=e.stateNode;break;case 22:r=e.stateNode._retryCache;break;default:throw Error(i(314))}r!==null&&r.delete(t),gf(e,n)}function yf(e,t){return qe(e,t)}var bf=null,xf=null,Sf=!1,Cf=!1,wf=!1,Tf=0;function Ef(e){e!==xf&&e.next===null&&(xf===null?bf=xf=e:xf=xf.next=e),Cf=!0,Sf||(Sf=!0,Nf())}function Df(e,t){if(!wf&&Cf){wf=!0;do for(var n=!1,r=bf;r!==null;){if(!t){if(e!==0){var i=r.pendingLanes;if(i===0)var a=0;else{var o=r.suspendedLanes,s=r.pingedLanes;a=(1<<31-O(42|e)+1)-1,a&=i&~(o&~s),a=a&201326741?a&201326741|1:a?a|2:0}a!==0&&(n=!0,Mf(r,a))}else a=q,a=gt(r,r===G?a:0,r.cancelPendingCommit!==null||r.timeoutHandle!==-1),!(a&3)||_t(r,a)||(n=!0,Mf(r,a))}r=r.next}while(n);wf=!1}}function Of(){kf()}function kf(){Cf=Sf=!1;var e=0;Tf!==0&&hp()&&(e=Tf);for(var t=Ze(),n=null,r=bf;r!==null;){var i=r.next,a=Af(r,t);a===0?(r.next=null,n===null?bf=i:n.next=i,i===null&&(xf=n)):(n=r,(e!==0||a&3)&&(Cf=!0)),r=i}X!==0&&X!==5||Df(e,!1),Tf!==0&&(Tf=0)}function Af(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,i=e.expirationTimes,a=e.pendingLanes&-62914561;0<a;){var o=31-O(a),s=1<<o,c=i[o];c===-1?((s&n)===0||(s&r)!==0)&&(i[o]=yt(s,t)):c<=t&&(e.expiredLanes|=s),a&=~s}if(t=G,n=q,n=gt(e,e===t?n:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),r=e.callbackNode,n===0||e===t&&(J===2||J===9)||e.cancelPendingCommit!==null)return r!==null&&r!==null&&Je(r),e.callbackNode=null,e.callbackPriority=0;if(!(n&3)||_t(e,n)){if(t=n&-n,t===e.callbackPriority)return t;switch(r!==null&&Je(r),Ot(n)){case 2:case 8:n=et;break;case 32:n=tt;break;case 268435456:n=rt;break;default:n=tt}return r=jf.bind(null,e),n=qe(n,r),e.callbackPriority=t,e.callbackNode=n,t}return r!==null&&r!==null&&Je(r),e.callbackPriority=2,e.callbackNode=null,2}function jf(e,t){if(X!==0&&X!==5)return e.callbackNode=null,e.callbackPriority=0,null;var n=e.callbackNode;if(df()&&e.callbackNode!==n)return null;var r=q;return r=gt(e,e===G?r:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),r===0?null:(Fd(e,r,t),Af(e,Ze()),e.callbackNode!=null&&e.callbackNode===n?jf.bind(null,e):null)}function Mf(e,t){if(df())return null;Fd(e,t,!0)}function Nf(){bp(function(){W&6?qe($e,Of):kf()})}function Pf(){if(Tf===0){var e=Ka;e===0&&(e=ft,ft<<=1,!(ft&261888)&&(ft=256)),Tf=e}return Tf}function Ff(e){return e==null||typeof e==`symbol`||typeof e==`boolean`?null:typeof e==`function`?e:Dn(e)}function If(e,t,n,r,i){if(t===`submit`&&n&&n.stateNode===i){var a=Ff((i[Nt]||null).action),o=r.submitter;o&&(t=(t=o[Nt]||null)?Ff(t.formAction):o.getAttribute(`formAction`),t!==null&&(a=t,o=null));var s=new Yn(`action`,`action`,null,r,i);e.push({event:s,listeners:[{instance:null,listener:function(){if(r.defaultPrevented){if(Tf!==0){var e=new FormData(i,o);ac(n,{pending:!0,data:e,method:i.method,action:a},null,e)}}else typeof a==`function`&&(s.preventDefault(),e=new FormData(i,o),ac(n,{pending:!0,data:e,method:i.method,action:a},a,e))},currentTarget:i}]})}}for(var Lf=0;Lf<wi.length;Lf++){var Rf=wi[Lf];Ti(Rf.toLowerCase(),`on`+(Rf[0].toUpperCase()+Rf.slice(1)))}Ti(gi,`onAnimationEnd`),Ti(_i,`onAnimationIteration`),Ti(vi,`onAnimationStart`),Ti(`dblclick`,`onDoubleClick`),Ti(`focusin`,`onFocus`),Ti(`focusout`,`onBlur`),Ti(yi,`onTransitionRun`),Ti(bi,`onTransitionStart`),Ti(xi,`onTransitionCancel`),Ti(Si,`onTransitionEnd`),Zt(`onMouseEnter`,[`mouseout`,`mouseover`]),Zt(`onMouseLeave`,[`mouseout`,`mouseover`]),Zt(`onPointerEnter`,[`pointerout`,`pointerover`]),Zt(`onPointerLeave`,[`pointerout`,`pointerover`]),Xt(`onChange`,`change click focusin focusout input keydown keyup selectionchange`.split(` `)),Xt(`onSelect`,`focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange`.split(` `)),Xt(`onBeforeInput`,[`compositionend`,`keypress`,`textInput`,`paste`]),Xt(`onCompositionEnd`,`compositionend focusout keydown keypress keyup mousedown`.split(` `)),Xt(`onCompositionStart`,`compositionstart focusout keydown keypress keyup mousedown`.split(` `)),Xt(`onCompositionUpdate`,`compositionupdate focusout keydown keypress keyup mousedown`.split(` `));var zf=`abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting`.split(` `),Bf=new Set(`beforetoggle cancel close invalid load scroll scrollend toggle`.split(` `).concat(zf));function Vf(e,t){t=!!(t&4);for(var n=0;n<e.length;n++){var r=e[n],i=r.event;r=r.listeners;a:{var a=void 0;if(t)for(var o=r.length-1;0<=o;o--){var s=r[o],c=s.instance,l=s.currentTarget;if(s=s.listener,c!==a&&i.isPropagationStopped())break a;a=s,i.currentTarget=l;try{a(i)}catch(e){Ai(e)}i.currentTarget=null,a=c}else for(o=0;o<r.length;o++){if(s=r[o],c=s.instance,l=s.currentTarget,s=s.listener,c!==a&&i.isPropagationStopped())break a;a=s,i.currentTarget=l;try{a(i)}catch(e){Ai(e)}i.currentTarget=null,a=c}}}}function Q(e,t){var n=t[Ft];n===void 0&&(n=t[Ft]=new Set);var r=e+`__bubble`;n.has(r)||(Gf(t,e,2,!1),n.add(r))}function Hf(e,t,n){var r=0;t&&(r|=4),Gf(n,e,r,t)}var Uf=`_reactListening`+Math.random().toString(36).slice(2);function Wf(e){if(!e[Uf]){e[Uf]=!0,Jt.forEach(function(t){t!==`selectionchange`&&(Bf.has(t)||Hf(t,!1,e),Hf(t,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[Uf]||(t[Uf]=!0,Hf(`selectionchange`,!1,t))}}function Gf(e,t,n,r){switch(Ch(t)){case 2:var i=_h;break;case 8:i=vh;break;default:i=yh}n=i.bind(null,t,n,e),i=void 0,!Rn||t!==`touchstart`&&t!==`touchmove`&&t!==`wheel`||(i=!0),r?i===void 0?e.addEventListener(t,n,!0):e.addEventListener(t,n,{capture:!0,passive:i}):i===void 0?e.addEventListener(t,n,!1):e.addEventListener(t,n,{passive:i})}function Kf(e,t,n,r,i){var a=r;if(!(t&1)&&!(t&2)&&r!==null)a:for(;;){if(r===null)return;var s=r.tag;if(s===3||s===4){var c=r.stateNode.containerInfo;if(c===i)break;if(s===4)for(s=r.return;s!==null;){var l=s.tag;if((l===3||l===4)&&s.stateNode.containerInfo===i)return;s=s.return}for(;c!==null;){if(s=Ht(c),s===null)return;if(l=s.tag,l===5||l===6||l===26||l===27){r=a=s;continue a}c=c.parentNode}}r=r.return}Fn(function(){var r=a,i=An(n),s=[];a:{var c=Ci.get(e);if(c!==void 0){var l=Yn,u=e;switch(e){case`keypress`:if(Wn(n)===0)break a;case`keydown`:case`keyup`:l=pr;break;case`focusin`:u=`focus`,l=ir;break;case`focusout`:u=`blur`,l=ir;break;case`beforeblur`:case`afterblur`:l=ir;break;case`click`:if(n.button===2)break a;case`auxclick`:case`dblclick`:case`mousedown`:case`mousemove`:case`mouseup`:case`mouseout`:case`mouseover`:case`contextmenu`:l=nr;break;case`drag`:case`dragend`:case`dragenter`:case`dragexit`:case`dragleave`:case`dragover`:case`dragstart`:case`drop`:l=rr;break;case`touchcancel`:case`touchend`:case`touchmove`:case`touchstart`:l=gr;break;case gi:case _i:case vi:l=ar;break;case Si:l=_r;break;case`scroll`:case`scrollend`:l=Zn;break;case`wheel`:l=vr;break;case`copy`:case`cut`:case`paste`:l=or;break;case`gotpointercapture`:case`lostpointercapture`:case`pointercancel`:case`pointerdown`:case`pointermove`:case`pointerout`:case`pointerover`:case`pointerup`:l=mr;break;case`submit`:l=hr;break;case`toggle`:case`beforetoggle`:l=yr}var d=!!(t&4),f=!d&&(e===`scroll`||e===`scrollend`),p=d?c===null?null:c+`Capture`:c;d=[];for(var m=r,h;m!==null;){var g=m;if(h=g.stateNode,g=g.tag,g!==5&&g!==26&&g!==27||h===null||p===null||(g=In(m,p),g!=null&&d.push(qf(m,g,h))),f)break;m=m.return}0<d.length&&(c=new l(c,u,null,n,i),s.push({event:c,listeners:d}))}}if(!(t&7)){a:{if(l=e===`mouseover`||e===`pointerover`,c=e===`mouseout`||e===`pointerout`,l&&n!==kn&&(u=n.relatedTarget||n.fromElement)&&(Ht(u)||u[Pt]))break a;(c||l)&&(u=i.window===i?i:(l=i.ownerDocument)?l.defaultView||l.parentWindow:window,c?(l=n.relatedTarget||n.toElement,c=r,l=l?Ht(l):null,l!==null&&(f=o(l),d=l.tag,l!==f||d!==5&&d!==27&&d!==6)&&(l=null)):(c=null,l=r),c!==l&&(d=nr,g=`onMouseLeave`,p=`onMouseEnter`,m=`mouse`,(e===`pointerout`||e===`pointerover`)&&(d=mr,g=`onPointerLeave`,p=`onPointerEnter`,m=`pointer`),f=c==null?u:Wt(c),h=l==null?u:Wt(l),u=new d(g,m+`leave`,c,n,i),u.target=f,u.relatedTarget=h,g=null,Ht(i)===r&&(d=new d(p,m+`enter`,l,n,i),d.target=h,d.relatedTarget=f,g=d),f=g,d=c&&l?re(c,l,Yf):null,c!==null&&Xf(s,u,c,d,!1),l!==null&&f!==null&&Xf(s,f,l,d,!0)))}a:{if(c=r?Wt(r):window,l=c.nodeName&&c.nodeName.toLowerCase(),l===`select`||l===`input`&&c.type===`file`)var _=zr;else if(Nr(c)){if(Br)_=Yr;else{_=qr;var v=Kr}}else l=c.nodeName,!l||l.toLowerCase()!==`input`||c.type!==`checkbox`&&c.type!==`radio`?r&&wn(r.elementType)&&(_=zr):_=Jr;if(_&&=_(e,r)){Pr(s,_,n,i);break a}v&&v(e,c,r)}switch(v=r?Wt(r):window,e){case`focusin`:(Nr(v)||v.contentEditable===`true`)&&(oi=v,si=r,ci=null);break;case`focusout`:ci=si=oi=null;break;case`mousedown`:li=!0;break;case`contextmenu`:case`mouseup`:case`dragend`:li=!1,ui(s,n,i);break;case`selectionchange`:if(ai)break;case`keydown`:case`keyup`:ui(s,n,i)}var y;if(xr)b:{switch(e){case`compositionstart`:var b=`onCompositionStart`;break b;case`compositionend`:b=`onCompositionEnd`;break b;case`compositionupdate`:b=`onCompositionUpdate`;break b}b=void 0}else kr?Dr(e,n)&&(b=`onCompositionEnd`):e===`keydown`&&n.keyCode===229&&(b=`onCompositionStart`);b&&(wr&&n.locale!==`ko`&&(kr||b!==`onCompositionStart`?b===`onCompositionEnd`&&kr&&(y=Un()):(Bn=i,Vn=`value`in Bn?Bn.value:Bn.textContent,kr=!0)),v=Jf(r,b),0<v.length&&(b=new sr(b,e,null,n,i),s.push({event:b,listeners:v}),y?b.data=y:(y=Or(n),y!==null&&(b.data=y)))),(y=Cr?Ar(e,n):jr(e,n))&&(b=Jf(r,`onBeforeInput`),0<b.length&&(v=new sr(`onBeforeInput`,`beforeinput`,null,n,i),s.push({event:v,listeners:b}),v.data=y)),If(s,e,r,n,i)}Vf(s,t)})}function qf(e,t,n){return{instance:e,listener:t,currentTarget:n}}function Jf(e,t){for(var n=t+`Capture`,r=[];e!==null;){var i=e,a=i.stateNode;if(i=i.tag,i!==5&&i!==26&&i!==27||a===null||(i=In(e,n),i!=null&&r.unshift(qf(e,i,a)),i=In(e,t),i!=null&&r.push(qf(e,i,a))),e.tag===3)return r;e=e.return}return[]}function Yf(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function Xf(e,t,n,r,i){for(var a=t._reactName,o=[];n!==null&&n!==r;){var s=n,c=s.alternate,l=s.stateNode;if(s=s.tag,c!==null&&c===r)break;s!==5&&s!==26&&s!==27||l===null||(c=l,i?(l=In(n,a),l!=null&&o.unshift(qf(n,l,c))):i||(l=In(n,a),l!=null&&o.push(qf(n,l,c)))),n=n.return}o.length!==0&&e.push({event:t,listeners:o})}var Zf=/\r\n?/g,Qf=/\u0000|\uFFFD/g;function $f(e){return(typeof e==`string`?e:``+e).replace(Zf,`
`).replace(Qf,``)}function ep(e,t){return t=$f(t),$f(e)===t}function $(e,t,n,r,a,o){switch(n){case`children`:if(typeof r==`string`)t===`body`||t===`textarea`&&r===``||bn(e,r);else if(typeof r==`number`||typeof r==`bigint`)t!==`body`&&bn(e,``+r);else return;break;case`className`:an(e,`class`,r);break;case`tabIndex`:an(e,`tabindex`,r);break;case`dir`:case`role`:case`viewBox`:case`width`:case`height`:an(e,n,r);break;case`style`:Cn(e,r,o);return;case`data`:if(t!==`object`){an(e,`data`,r);break}case`src`:case`href`:if(r===``&&(t!==`a`||n!==`href`)||r==null||typeof r==`function`||typeof r==`symbol`||typeof r==`boolean`){e.removeAttribute(n);break}r=Dn(r),e.setAttribute(n,r);break;case`action`:case`formAction`:if(typeof r==`function`){e.setAttribute(n,`javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')`);break}if(typeof o==`function`&&(n===`formAction`?(t!==`input`&&$(e,t,`name`,a.name,a,null),$(e,t,`formEncType`,a.formEncType,a,null),$(e,t,`formMethod`,a.formMethod,a,null),$(e,t,`formTarget`,a.formTarget,a,null)):($(e,t,`encType`,a.encType,a,null),$(e,t,`method`,a.method,a,null),$(e,t,`target`,a.target,a,null))),r==null||typeof r==`symbol`||typeof r==`boolean`){e.removeAttribute(n);break}r=Dn(r),e.setAttribute(n,r);break;case`onClick`:r!=null&&(e.onclick=On);return;case`onScroll`:r!=null&&Q(`scroll`,e);return;case`onScrollEnd`:r!=null&&Q(`scrollend`,e);return;case`dangerouslySetInnerHTML`:if(r!=null){if(typeof r!=`object`||!(`__html`in r))throw Error(i(61));if(n=r.__html,n!=null){if(a.children!=null)throw Error(i(60));o?.__html!==n&&(e.innerHTML=n)}}break;case`multiple`:e.multiple=r&&typeof r!=`function`&&typeof r!=`symbol`;break;case`muted`:e.muted=r&&typeof r!=`function`&&typeof r!=`symbol`;break;case`suppressContentEditableWarning`:case`suppressHydrationWarning`:case`defaultValue`:case`defaultChecked`:case`innerHTML`:case`ref`:break;case`autoFocus`:break;case`xlinkHref`:if(r==null||typeof r==`function`||typeof r==`boolean`||typeof r==`symbol`){e.removeAttribute(`xlink:href`);break}n=Dn(r),e.setAttributeNS(`http://www.w3.org/1999/xlink`,`xlink:href`,n);break;case`contentEditable`:case`spellCheck`:case`draggable`:case`value`:case`autoReverse`:case`externalResourcesRequired`:case`focusable`:case`preserveAlpha`:r!=null&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,r):e.removeAttribute(n);break;case`inert`:case`allowFullScreen`:case`async`:case`autoPlay`:case`controls`:case`credentialless`:case`default`:case`defer`:case`disabled`:case`disablePictureInPicture`:case`disableRemotePlayback`:case`formNoValidate`:case`hidden`:case`loop`:case`noModule`:case`noValidate`:case`open`:case`playsInline`:case`readOnly`:case`required`:case`reversed`:case`scoped`:case`seamless`:case`itemScope`:r&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,``):e.removeAttribute(n);break;case`capture`:case`download`:!0===r?e.setAttribute(n,``):!1!==r&&r!=null&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,r):e.removeAttribute(n);break;case`cols`:case`rows`:case`size`:case`span`:r!=null&&typeof r!=`function`&&typeof r!=`symbol`&&!isNaN(r)&&1<=r?e.setAttribute(n,r):e.removeAttribute(n);break;case`rowSpan`:case`start`:r==null||typeof r==`function`||typeof r==`symbol`||isNaN(r)?e.removeAttribute(n):e.setAttribute(n,r);break;case`popover`:Q(`beforetoggle`,e),Q(`toggle`,e),rn(e,`popover`,r);break;case`xlinkActuate`:on(e,`http://www.w3.org/1999/xlink`,`xlink:actuate`,r);break;case`xlinkArcrole`:on(e,`http://www.w3.org/1999/xlink`,`xlink:arcrole`,r);break;case`xlinkRole`:on(e,`http://www.w3.org/1999/xlink`,`xlink:role`,r);break;case`xlinkShow`:on(e,`http://www.w3.org/1999/xlink`,`xlink:show`,r);break;case`xlinkTitle`:on(e,`http://www.w3.org/1999/xlink`,`xlink:title`,r);break;case`xlinkType`:on(e,`http://www.w3.org/1999/xlink`,`xlink:type`,r);break;case`xmlBase`:on(e,`http://www.w3.org/XML/1998/namespace`,`xml:base`,r);break;case`xmlLang`:on(e,`http://www.w3.org/XML/1998/namespace`,`xml:lang`,r);break;case`xmlSpace`:on(e,`http://www.w3.org/XML/1998/namespace`,`xml:space`,r);break;case`is`:rn(e,`is`,r);break;case`innerText`:case`textContent`:return;default:if(!(2<n.length)||n[0]!==`o`&&n[0]!==`O`||n[1]!==`n`&&n[1]!==`N`)n=Tn.get(n)||n,rn(e,n,r);else return}k=!0}function tp(e,t,n,r,a,o){switch(n){case`style`:Cn(e,r,o);return;case`dangerouslySetInnerHTML`:if(r!=null){if(typeof r!=`object`||!(`__html`in r))throw Error(i(61));if(n=r.__html,n!=null){if(a.children!=null)throw Error(i(60));o?.__html!==n&&(e.innerHTML=n)}}break;case`children`:if(typeof r==`string`)bn(e,r);else if(typeof r==`number`||typeof r==`bigint`)bn(e,``+r);else return;break;case`onScroll`:r!=null&&Q(`scroll`,e);return;case`onScrollEnd`:r!=null&&Q(`scrollend`,e);return;case`onClick`:r!=null&&(e.onclick=On);return;case`suppressContentEditableWarning`:case`suppressHydrationWarning`:case`innerHTML`:case`ref`:return;case`innerText`:case`textContent`:return;default:if(!Yt.hasOwnProperty(n))a:{if(n[0]===`o`&&n[1]===`n`&&(a=n.endsWith(`Capture`),o=n.slice(2,a?n.length-7:void 0),t=e[Nt]||null,t=t==null?null:t[n],typeof t==`function`&&e.removeEventListener(o,t,a),typeof r==`function`)){typeof t!=`function`&&t!==null&&(n in e?e[n]=null:e.hasAttribute(n)&&e.removeAttribute(n)),e.addEventListener(o,r,a);break a}k=!0,n in e?e[n]=r:!0===r?e.setAttribute(n,``):rn(e,n,r)}return}k=!0}function np(e,t,n){switch(t){case`div`:case`span`:case`svg`:case`path`:case`a`:case`g`:case`p`:case`li`:break;case`img`:Q(`error`,e),Q(`load`,e);var r=!1,a=!1,o;for(o in n)if(n.hasOwnProperty(o)){var s=n[o];if(s!=null)switch(o){case`src`:r=!0;break;case`srcSet`:a=!0;break;case`children`:case`dangerouslySetInnerHTML`:throw Error(i(137,t));default:$(e,t,o,s,n,null)}}a&&$(e,t,`srcSet`,n.srcSet,n,null),r&&$(e,t,`src`,n.src,n,null);return;case`input`:Q(`invalid`,e);var c=o=s=a=null,l=null,u=null;for(r in n)if(n.hasOwnProperty(r)){var d=n[r];if(d!=null)switch(r){case`name`:a=d;break;case`type`:s=d;break;case`checked`:l=d;break;case`defaultChecked`:u=d;break;case`value`:o=d;break;case`defaultValue`:c=d;break;case`children`:case`dangerouslySetInnerHTML`:if(d!=null)throw Error(i(137,t));break;default:$(e,t,r,d,n,null)}}hn(e,o,c,l,u,s,a,!1);return;case`select`:for(a in Q(`invalid`,e),r=s=o=null,n)if(n.hasOwnProperty(a)&&(c=n[a],c!=null))switch(a){case`value`:o=c;break;case`defaultValue`:s=c;break;case`multiple`:r=c;default:$(e,t,a,c,n,null)}t=o,n=s,e.multiple=!!r,t==null?n!=null&&_n(e,!!r,n,!0):_n(e,!!r,t,!1);return;case`textarea`:for(s in Q(`invalid`,e),o=a=r=null,n)if(n.hasOwnProperty(s)&&(c=n[s],c!=null))switch(s){case`value`:r=c;break;case`defaultValue`:a=c;break;case`children`:o=c;break;case`dangerouslySetInnerHTML`:if(c!=null)throw Error(i(91));break;default:$(e,t,s,c,n,null)}yn(e,r,a,o);return;case`option`:for(l in n)if(n.hasOwnProperty(l)&&(r=n[l],r!=null))switch(l){case`selected`:e.selected=r&&typeof r!=`function`&&typeof r!=`symbol`;break;default:$(e,t,l,r,n,null)}return;case`dialog`:Q(`beforetoggle`,e),Q(`toggle`,e),Q(`cancel`,e),Q(`close`,e);break;case`iframe`:case`object`:Q(`load`,e);break;case`video`:case`audio`:for(r=0;r<zf.length;r++)Q(zf[r],e);break;case`image`:Q(`error`,e),Q(`load`,e);break;case`details`:Q(`toggle`,e);break;case`embed`:case`source`:case`link`:Q(`error`,e),Q(`load`,e);case`area`:case`base`:case`br`:case`col`:case`hr`:case`keygen`:case`meta`:case`param`:case`track`:case`wbr`:case`menuitem`:for(u in n)if(n.hasOwnProperty(u)&&(r=n[u],r!=null))switch(u){case`children`:case`dangerouslySetInnerHTML`:throw Error(i(137,t));default:$(e,t,u,r,n,null)}return;default:if(wn(t)){for(d in n)n.hasOwnProperty(d)&&(r=n[d],r!==void 0&&tp(e,t,d,r,n,void 0));return}}for(c in n)n.hasOwnProperty(c)&&(r=n[c],r!=null&&$(e,t,c,r,n,null))}var rp={};function ip(e,t,n,r){switch(t){case`div`:case`span`:case`svg`:case`path`:case`a`:case`g`:case`p`:case`li`:break;case`input`:var a=null,o=null,s=null,c=null,l=null,u=null,d=null;for(m in n){var f=n[m];if(n.hasOwnProperty(m)&&f!=null)switch(m){case`checked`:break;case`value`:break;case`defaultValue`:l=f;default:r.hasOwnProperty(m)||$(e,t,m,null,r,f)}}for(var p in r){var m=r[p];if(f=n[p],r.hasOwnProperty(p)&&(m!=null||f!=null))switch(p){case`type`:m!==f&&(k=!0),o=m;break;case`name`:m!==f&&(k=!0),a=m;break;case`checked`:m!==f&&(k=!0),u=m;break;case`defaultChecked`:m!==f&&(k=!0),d=m;break;case`value`:m!==f&&(k=!0),s=m;break;case`defaultValue`:m!==f&&(k=!0),c=m;break;case`children`:case`dangerouslySetInnerHTML`:if(m!=null)throw Error(i(137,t));break;default:m!==f&&$(e,t,p,m,r,f)}}mn(e,s,c,l,u,d,o,a);return;case`select`:for(o in m=s=c=p=null,n)if(l=n[o],n.hasOwnProperty(o)&&l!=null)switch(o){case`value`:break;case`multiple`:m=l;default:r.hasOwnProperty(o)||$(e,t,o,null,r,l)}for(a in r)if(o=r[a],l=n[a],r.hasOwnProperty(a)&&(o!=null||l!=null))switch(a){case`value`:o!==l&&(k=!0),p=o;break;case`defaultValue`:o!==l&&(k=!0),c=o;break;case`multiple`:o!==l&&(k=!0),s=o;default:o!==l&&$(e,t,a,o,r,l)}t=c,n=s,r=m,p==null?!!r!=!!n&&(t==null?_n(e,!!n,n?[]:``,!1):_n(e,!!n,t,!0)):_n(e,!!n,p,!1);return;case`textarea`:for(c in m=p=null,n)if(a=n[c],n.hasOwnProperty(c)&&a!=null&&!r.hasOwnProperty(c))switch(c){case`value`:break;case`children`:break;default:$(e,t,c,null,r,a)}for(s in r)if(a=r[s],o=n[s],r.hasOwnProperty(s)&&(a!=null||o!=null))switch(s){case`value`:a!==o&&(k=!0),p=a;break;case`defaultValue`:a!==o&&(k=!0),m=a;break;case`children`:break;case`dangerouslySetInnerHTML`:if(a!=null)throw Error(i(91));break;default:a!==o&&$(e,t,s,a,r,o)}vn(e,p,m);return;case`option`:for(var h in n)if(p=n[h],n.hasOwnProperty(h)&&p!=null&&!r.hasOwnProperty(h))switch(h){case`selected`:e.selected=!1;break;default:$(e,t,h,null,r,p)}for(l in r)if(p=r[l],m=n[l],r.hasOwnProperty(l)&&p!==m&&(p!=null||m!=null))switch(l){case`selected`:p!==m&&(k=!0),e.selected=p&&typeof p!=`function`&&typeof p!=`symbol`;break;default:$(e,t,l,p,r,m)}return;case`img`:case`link`:case`area`:case`base`:case`br`:case`col`:case`embed`:case`hr`:case`keygen`:case`meta`:case`param`:case`source`:case`track`:case`wbr`:case`menuitem`:for(var g in n)p=n[g],n.hasOwnProperty(g)&&p!=null&&!r.hasOwnProperty(g)&&$(e,t,g,null,r,p);for(u in r)if(p=r[u],m=n[u],r.hasOwnProperty(u)&&p!==m&&(p!=null||m!=null))switch(u){case`children`:case`dangerouslySetInnerHTML`:if(p!=null)throw Error(i(137,t));break;default:$(e,t,u,p,r,m)}return;default:if(wn(t)){for(var _ in n)p=n[_],n.hasOwnProperty(_)&&p!==void 0&&!r.hasOwnProperty(_)&&tp(e,t,_,void 0,r,p);for(d in r)p=r[d],m=n[d],!r.hasOwnProperty(d)||p===m||p===void 0&&m===void 0||tp(e,t,d,p,r,m);return}}for(var v in n)p=n[v],n.hasOwnProperty(v)&&p!=null&&!r.hasOwnProperty(v)&&$(e,t,v,null,r,p);for(f in r)p=r[f],m=n[f],!r.hasOwnProperty(f)||p===m||p==null&&m==null||$(e,t,f,p,r,m)}function ap(e){switch(e){case`css`:case`script`:case`font`:case`img`:case`image`:case`input`:case`link`:return!0;default:return!1}}function op(){if(typeof performance.getEntriesByType==`function`){for(var e=0,t=0,n=performance.getEntriesByType(`resource`),r=0;r<n.length;r++){var i=n[r],a=i.transferSize,o=i.initiatorType,s=i.duration;if(a&&s&&ap(o)){for(o=0,s=i.responseEnd,r+=1;r<n.length;r++){var c=n[r],l=c.startTime;if(l>s)break;var u=c.transferSize,d=c.initiatorType;u&&ap(d)&&(c=c.responseEnd,o+=u*(c<s?1:(s-l)/(c-l)))}if(--r,t+=8*(a+o)/(i.duration/1e3),e++,10<e)break}}if(0<e)return t/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e==`number`)?e:5}var sp=null,cp=null;function lp(e){return e.nodeType===9?e:e.ownerDocument}function up(e){switch(e){case`http://www.w3.org/2000/svg`:return 1;case`http://www.w3.org/1998/Math/MathML`:return 2;default:return 0}}function dp(e,t){if(e===0)switch(t){case`svg`:return 1;case`math`:return 2;default:return 0}return e===1&&t===`foreignObject`?0:e}function fp(e,t,n,r){return n=lp(n).createElement(e),n[Mt]=r,n[Nt]=t,np(n,e,t),Kt(n),n}function pp(e,t){return e===`textarea`||e===`noscript`||typeof t.children==`string`||typeof t.children==`number`||typeof t.children==`bigint`||typeof t.dangerouslySetInnerHTML==`object`&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var mp=null;function hp(){var e=window.event;return e&&e.type===`popstate`?e!==mp&&(mp=e,!0):(mp=null,!1)}var gp=typeof setTimeout==`function`?setTimeout:void 0,_p=typeof clearTimeout==`function`?clearTimeout:void 0,vp=typeof Promise==`function`?Promise:void 0,yp=typeof requestAnimationFrame==`function`?requestAnimationFrame:gp,bp=typeof queueMicrotask==`function`?queueMicrotask:vp===void 0?gp:function(e){return vp.resolve(null).then(e).catch(xp)};function xp(e){setTimeout(function(){throw e})}function Sp(e){return e===`head`}function Cp(e,t){var n=t,r=0;do{var i=n.nextSibling;if(e.removeChild(n),i&&i.nodeType===8){if(n=i.data,n===`/$`||n===`/&`){if(r===0){e.removeChild(i),Hh(t);return}r--}else if(n===`$`||n===`$?`||n===`$~`||n===`$!`||n===`&`)r++;else if(n===`html`)_m(e.ownerDocument.documentElement);else if(n===`head`){n=e.ownerDocument.head,_m(n);for(var a=n.firstChild;a;){var o=a.nextSibling,s=a.nodeName;a[zt]||s===`SCRIPT`||s===`STYLE`||s===`LINK`&&a.rel.toLowerCase()===`stylesheet`||n.removeChild(a),a=o}}else n===`body`&&_m(e.ownerDocument.body)}n=i}while(n);Hh(t)}function wp(e,t){var n=e;e=0;do{var r=n.nextSibling;if(n.nodeType===1?t?(n._stashedDisplay=n.style.display,n.style.display=`none`):(n.style.display=n._stashedDisplay||``,n.getAttribute(`style`)===``&&n.removeAttribute(`style`)):n.nodeType===3&&(t?(n._stashedText=n.nodeValue,n.nodeValue=``):n.nodeValue=n._stashedText||``),r&&r.nodeType===8){if(n=r.data,n===`/$`){if(e===0)break;e--}else n!==`$`&&n!==`$?`&&n!==`$~`&&n!==`$!`||e++}n=r}while(n)}function Tp(e,t,n){if(t=CSS.escape(t)===t?t:`r-`+btoa(t).replace(/=/g,``),e.style.viewTransitionName=t,n!=null&&(e.style.viewTransitionClass=n),n=getComputedStyle(e),n.display===`inline`){if(t=e.getClientRects(),t.length===1)var r=1;else for(var i=r=0;i<t.length;i++){var a=t[i];0<a.width&&0<a.height&&r++}r===1&&(e=e.style,e.display=t.length===1?`inline-block`:`block`,e.marginTop=`-`+n.paddingTop,e.marginBottom=`-`+n.paddingBottom)}}function Ep(e,t){e=e.style,t=t.style;var n=t==null?null:t.hasOwnProperty(`viewTransitionName`)?t.viewTransitionName:t.hasOwnProperty(`view-transition-name`)?t[`view-transition-name`]:null;e.viewTransitionName=n==null||typeof n==`boolean`?``:(``+n).trim(),n=t==null?null:t.hasOwnProperty(`viewTransitionClass`)?t.viewTransitionClass:t.hasOwnProperty(`view-transition-class`)?t[`view-transition-class`]:null,e.viewTransitionClass=n==null||typeof n==`boolean`?``:(``+n).trim(),e.display===`inline-block`&&(t==null?e.display=e.margin=``:(n=t.display,e.display=n==null||typeof n==`boolean`?``:n,n=t.margin,n==null?(n=t.hasOwnProperty(`marginTop`)?t.marginTop:t[`margin-top`],e.marginTop=n==null||typeof n==`boolean`?``:n,t=t.hasOwnProperty(`marginBottom`)?t.marginBottom:t[`margin-bottom`],e.marginBottom=t==null||typeof t==`boolean`?``:t):e.margin=n))}function Dp(e,t,n){return n=n.ownerDocument.defaultView,{rect:e,abs:t.position===`absolute`||t.position===`fixed`,clip:t.clipPath!==`none`||t.overflow!==`visible`||t.filter!==`none`||t.mask!==`none`||t.mask!==`none`||t.borderRadius!==`0px`,view:0<=e.bottom&&0<=e.right&&e.top<=n.innerHeight&&e.left<=n.innerWidth}}function Op(e){return Dp(e.getBoundingClientRect(),getComputedStyle(e),e)}function kp(e){var t=e.getBoundingClientRect();t=new DOMRect(t.x+2e4,t.y+2e4,t.width,t.height);var n=getComputedStyle(e);return Dp(t,n,e)}function Ap(e){return e.documentElement.clientHeight}function jp(e){this.addEventListener(`load`,e),this.addEventListener(`error`,e)}function Mp(e,t,n,r,i,a,o,s,c){var l=t.nodeType===9?t:t.ownerDocument;try{var u=l.startViewTransition({update:function(){var t=l.defaultView,n=t.navigation&&t.navigation.transition,o=l.fonts.status;r();var s=[];if(o===`loaded`&&(Ap(l),l.fonts.status===`loading`&&s.push(l.fonts.ready)),o=s.length,e!==null)for(var c=e.suspenseyImages,u=0,d=0;d<c.length;d++){var f=c[d];if(!f.complete){var p=f.getBoundingClientRect();if(0<p.bottom&&0<p.right&&p.top<t.innerHeight&&p.left<t.innerWidth){if(u+=Xm(f),u>$m){s.length=o;break}f=new Promise(jp.bind(f)),s.push(f)}}}if(0<s.length)return t=Promise.race([Promise.all(s),new Promise(function(e){return setTimeout(e,500)})]).then(i,i),(n?Promise.allSettled([n.finished,t]):t).then(a,a);if(i(),n)return n.finished.then(a,a);a()},types:n});l.__reactViewTransition=u;var d=[];return u.ready.then(function(){for(var e=l.documentElement.getAnimations({subtree:!0}),t=0;t<e.length;t++){var n=e[t],r=n.effect,i=r.pseudoElement;if(i!=null&&i.startsWith(`::view-transition`)){d.push(n),n=r.getKeyframes();for(var a=i=void 0,s=!0,c=0;c<n.length;c++){var u=n[c],f=u.width;if(i===void 0)i=f;else if(i!==f){s=!1;break}if(f=u.height,a===void 0)a=f;else if(a!==f){s=!1;break}delete u.width,delete u.height,u.transform===`none`&&delete u.transform}s&&i!==void 0&&a!==void 0&&(r.setKeyframes(n),s=getComputedStyle(r.target,r.pseudoElement),s.width!==i||s.height!==a)&&(s=n[0],s.width=i,s.height=a,s=n[n.length-1],s.width=i,s.height=a,r.setKeyframes(n))}}o()},function(e){l.__reactViewTransition===u&&(l.__reactViewTransition=null);try{if(typeof e==`object`&&e)switch(e.name){case`InvalidStateError`:(e.message===`View transition was skipped because document visibility state is hidden.`||e.message===`Skipping view transition because document visibility state has become hidden.`||e.message===`Skipping view transition because viewport size changed.`||e.message===`Transition was aborted because of invalid state`)&&(e=null)}e!==null&&c(e)}finally{r(),i(),o()}}),u.finished.finally(function(){for(var e=0;e<d.length;e++)d[e].cancel();l.__reactViewTransition===u&&(l.__reactViewTransition=null),s()}),u}catch{return r(),i(),o(),null}}function Np(e,t){this._scope=document.documentElement,this._selector=`::view-transition-`+e+`(`+t+`)`}Np.prototype.animate=function(e,t){return t=typeof t==`number`?{duration:t}:C({},t),t.pseudoElement=this._selector,this._scope.animate(e,t)},Np.prototype.getAnimations=function(){for(var e=this._scope,t=this._selector,n=e.getAnimations({subtree:!0}),r=[],i=0;i<n.length;i++){var a=n[i].effect;a!==null&&a.target===e&&a.pseudoElement===t&&r.push(n[i])}return r},Np.prototype.getComputedStyle=function(){return getComputedStyle(this._scope,this._selector)};function Pp(e){return{name:e,group:new Np(`group`,e),imagePair:new Np(`image-pair`,e),old:new Np(`old`,e),new:new Np(`new`,e)}}function Fp(e){this._fragmentFiber=e,this._observers=this._eventListeners=null}Fp.prototype.addEventListener=function(e,t,n){var r=null,i=null;if(!(n!=null&&typeof n!=`boolean`&&(r=n.signal||null,r!==null&&r.aborted))){this._eventListeners===null&&(this._eventListeners=[]);var a=this._eventListeners;if(Bp(a,e,t,n)===-1){var o=this,s=t;n!=null&&typeof n!=`boolean`&&!0===n.once&&(s=function(r){o.removeEventListener(e,t,n),typeof t==`function`?t.call(this,r):t.handleEvent(r)}),r!==null&&(i=o.removeEventListener.bind(o,e,t,n),r.addEventListener(`abort`,i,{once:!0}),i=r.removeEventListener.bind(r,`abort`,i)),r=Rp(n),a.push({type:e,listener:t,optionsOrUseCapture:n,attachedListener:s,cleanup:i}),h(this._fragmentFiber.child,!1,Ip,e,s,r)}this._eventListeners=a}};function Ip(e,t,n,r){return b(e).addEventListener(t,n,r),!1}Fp.prototype.removeEventListener=function(e,t,n){var r=this._eventListeners;if(r!==null&&(t=Bp(r,e,t,n),t!==-1)){var i=r[t];n=i.attachedListener;var a=i.cleanup;i=Rp(i.optionsOrUseCapture),h(this._fragmentFiber.child,!1,Lp,e,n,i),r.splice(t,1),a!==null&&a()}};function Lp(e,t,n,r){return b(e).removeEventListener(t,n,r),!1}function Rp(e){return e!=null&&typeof e!=`boolean`&&(!0===e.once||e.signal instanceof AbortSignal)?{capture:e.capture,passive:e.passive}:e}function zp(e){return e==null?`c=0`:typeof e==`boolean`?`c=`+(e?`1`:`0`):`c=`+(e.capture?`1`:`0`)}function Bp(e,t,n,r){if(e.length===0)return-1;r=zp(r);for(var i=0;i<e.length;i++){var a=e[i];if(a.type===t&&a.listener===n&&zp(a.optionsOrUseCapture)===r)return i}return-1}Fp.prototype.dispatchEvent=function(e){var t=g(this._fragmentFiber);if(t===null)return!0;t=b(t);var n=this._eventListeners;if(n!==null&&0<n.length||!e.bubbles){var r=t.nodeType===9?t.createComment(``):document.createTextNode(``);if(n)for(var i=0;i<n.length;i++){var a=n[i];r.addEventListener(a.type,a.attachedListener,Rp(a.optionsOrUseCapture))}if(t.appendChild(r),e=r.dispatchEvent(e),n)for(i=0;i<n.length;i++)a=n[i],r.removeEventListener(a.type,a.attachedListener,Rp(a.optionsOrUseCapture));return t.removeChild(r),e}return t.dispatchEvent(e)},Fp.prototype.focus=function(e){h(this._fragmentFiber.child,!0,Vp,e,void 0,void 0)};function Vp(e,t){return e.tag!==6&&(e=b(e),pm(e,t))}Fp.prototype.focusLast=function(e){var t=[];h(this._fragmentFiber.child,!0,Hp,t,void 0,void 0);for(var n=t.length-1;0<=n&&!Vp(t[n],e);n--);};function Hp(e,t){return t.push(e),!1}Fp.prototype.blur=function(){var e=g(this._fragmentFiber);e!==null&&(e=b(e),e=lp(e).activeElement,e!==null&&h(this._fragmentFiber.child,!1,Up,e,void 0,void 0))};function Up(e,t){return e.tag!==6&&(e=b(e),e===t||e.contains(t)?(t.blur(),!0):!1)}Fp.prototype.observeUsing=function(e){this._observers===null&&(this._observers=new Set),this._observers.add(e),h(this._fragmentFiber.child,!1,Wp,e,void 0,void 0)};function Wp(e,t){return e.tag===6||(e=b(e),t.observe(e)),!1}Fp.prototype.unobserveUsing=function(e){var t=this._observers;if(t!==null&&t.has(e)){t.delete(e),h(this._fragmentFiber.child,!1,Gp,e,void 0,void 0);for(var n=t=0;n<Kp.length;n++){var r=Kp[n];r.fragmentInstance===this&&r.observer===e?e.unobserve(r.instance):Kp[t++]=r}Kp.length=t}};function Gp(e,t){return e.tag===6||(e=b(e),t.unobserve(e)),!1}var Kp=[],qp=!1;function Jp(e,t,n){Kp.push({fragmentInstance:e,observer:t,instance:n}),qp||(qp=!0,mm(function(){qp=!1;var e=Kp;Kp=[];for(var t=0;t<e.length;t++){var n=e[t];n.observer.unobserve(n.instance)}}))}Fp.prototype.getClientRects=function(){var e=[];return h(this._fragmentFiber.child,!1,Yp,e,void 0,void 0),e};function Yp(e,t){if(e.tag===6){e=e.stateNode;var n=e.ownerDocument.createRange();n.selectNodeContents(e),t.push.apply(t,n.getClientRects())}else e=b(e),t.push.apply(t,e.getClientRects());return!1}Fp.prototype.getRootNode=function(e){var t=g(this._fragmentFiber);return t===null?this:b(t).getRootNode(e)},Fp.prototype.compareDocumentPosition=function(e){var t=g(this._fragmentFiber);if(t===null)return Node.DOCUMENT_POSITION_DISCONNECTED;var n=[];h(this._fragmentFiber.child,!1,Hp,n,void 0,void 0);var r=b(t);if(n.length===0){if(n=r,_(this._fragmentFiber)){a:{for(t=this._fragmentFiber.return;t!==null;){if(t.tag===4){t=t.stateNode.containerInfo;break a}if(t.tag===3||t.tag===5||t.tag===27)break;t=t.return}t=null}t!=null&&(n=t)}t=this._fragmentFiber;var i=r=n.compareDocumentPosition(e);return n===e?i=Node.DOCUMENT_POSITION_CONTAINS:r&Node.DOCUMENT_POSITION_CONTAINED_BY&&(n=v(t)[1],n===null?i=Node.DOCUMENT_POSITION_PRECEDING:(e=b(n).compareDocumentPosition(e),i=e===0||e&Node.DOCUMENT_POSITION_FOLLOWING?Node.DOCUMENT_POSITION_FOLLOWING:Node.DOCUMENT_POSITION_PRECEDING)),i|=Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC}t=b(n[0]),i=b(n[n.length-1]);var a=_(this._fragmentFiber)?t.parentElement:r;if(a==null)return Node.DOCUMENT_POSITION_DISCONNECTED;r=a.compareDocumentPosition(t)&Node.DOCUMENT_POSITION_CONTAINED_BY,a=a.compareDocumentPosition(i)&Node.DOCUMENT_POSITION_CONTAINED_BY;var o=t.compareDocumentPosition(e),s=i.compareDocumentPosition(e),c=o&Node.DOCUMENT_POSITION_CONTAINED_BY||s&Node.DOCUMENT_POSITION_CONTAINED_BY;return s=r&&a&&o&Node.DOCUMENT_POSITION_FOLLOWING&&s&Node.DOCUMENT_POSITION_PRECEDING,t=r&&t===e||a&&i===e||c||s?Node.DOCUMENT_POSITION_CONTAINED_BY:!r&&t===e||!a&&i===e?Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC:o,t&Node.DOCUMENT_POSITION_DISCONNECTED||t&Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC||Xp(t,this._fragmentFiber,n[0],n[n.length-1],e)?t:Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC};function Xp(e,t,n,r,i){var a=Ht(i);if(e&Node.DOCUMENT_POSITION_CONTAINED_BY){if(n=!!a)a:{for(;a!==null;){if(a.tag===7&&(a===t||a.alternate===t)){n=!0;break a}a=a.return}n=!1}return n}if(e&Node.DOCUMENT_POSITION_CONTAINS){if(a===null)return a=i.ownerDocument,i===a||i===a.documentElement||i===a.body;a:{for(a=t,t=g(t);a!==null;){if(!(a.tag!==5&&a.tag!==3&&a.tag!==27||a!==t&&a.alternate!==t)){a=!0;break a}a=a.return}a=!1}return a}return e&Node.DOCUMENT_POSITION_PRECEDING?((t=!!a)&&!(t=a===n)&&(t=re(n,a,S),t===null?t=!1:(h(t,!0,x,a,n),a=ee,ee=null,t=a!==null)),t):e&Node.DOCUMENT_POSITION_FOLLOWING?((t=!!a)&&!(t=a===r)&&(t=re(r,a,S),t===null?t=!1:(h(t,!0,ne,a,r),a=ee,te=ee=null,t=a!==null)),t):!1}function Zp(e,t){var n=e.ownerDocument.createRange();n.selectNodeContents(e),e=n.getBoundingClientRect(),window.scrollTo(window.scrollX+e.left,t?window.scrollY+e.top:window.scrollY+e.bottom-window.innerHeight)}Fp.prototype.scrollIntoView=function(e){if(typeof e==`object`)throw Error(i(566));var t=[];h(this._fragmentFiber.child,!1,Hp,t,void 0,void 0);var n=!1!==e;if(t.length===0){var r=v(this._fragmentFiber);if(r=n?r[1]||r[0]||g(this._fragmentFiber):r[0]||r[1],r===null)return;if(r.tag===6){e=b(r),Zp(e,n);return}if(r=b(r),r.nodeType!==9){if(r.nodeType===11){n=`host`in r?r.host:null,n!==null&&n.scrollIntoView(e);return}r.scrollIntoView(e)}}for(r=n?t.length-1:0;r!==(n?-1:t.length);){var a=t[r];a.tag===6?(a=b(a),Zp(a,n)):b(a).scrollIntoView(e),r+=n?-1:1}};function Qp(e,t){return e=b(e),$p(e,t),!1}function $p(e,t){e.reactFragments??=new Set,e.reactFragments.add(t)}function em(e,t){var n=t._eventListeners;if(n!==null)for(var r=0;r<n.length;r++){var i=n[r];e.addEventListener(i.type,i.attachedListener,Rp(i.optionsOrUseCapture))}e.nodeType!==3&&(n=t._observers,n!==null&&n.forEach(function(n){for(var r=0,i=0;i<Kp.length;i++){var a=Kp[i];(a.fragmentInstance!==t||a.observer!==n||a.instance!==e)&&(Kp[r++]=a)}Kp.length=r,n.observe(e)}),$p(e,t))}function tm(e,t){var n=t._eventListeners;if(n!==null)for(var r=0;r<n.length;r++){var i=n[r];e.removeEventListener(i.type,i.attachedListener,Rp(i.optionsOrUseCapture))}e.nodeType!==3&&(n=t._observers,n!==null&&n.forEach(function(n){typeof n.rootMargin==`string`?Jp(t,n,e):n.unobserve(e)}),e.reactFragments!=null&&e.reactFragments.delete(t))}function nm(e){var t=e.firstChild;for(t&&t.nodeType===10&&(t=t.nextSibling);t;){var n=t;switch(t=t.nextSibling,n.nodeName){case`HTML`:case`HEAD`:case`BODY`:nm(n),Vt(n);continue;case`SCRIPT`:case`STYLE`:continue;case`LINK`:if(n.rel.toLowerCase()===`stylesheet`)continue}e.removeChild(n)}}function rm(e,t,n,r){for(;e.nodeType===1;){var i=n;if(e.nodeName.toLowerCase()!==t.toLowerCase()){if(!r&&(e.nodeName!==`INPUT`||e.type!==`hidden`))break}else if(!r){if(t===`input`&&e.type===`hidden`){var a=i.name==null?null:``+i.name;if(i.type===`hidden`&&e.getAttribute(`name`)===a)return e}else return e}else if(!e[zt])switch(t){case`meta`:if(!e.hasAttribute(`itemprop`))break;return e;case`link`:if(a=e.getAttribute(`rel`),a===`stylesheet`&&e.hasAttribute(`data-precedence`)||a!==i.rel||e.getAttribute(`href`)!==(i.href==null||i.href===``?null:i.href)||e.getAttribute(`crossorigin`)!==(i.crossOrigin==null?null:i.crossOrigin)||e.getAttribute(`title`)!==(i.title==null?null:i.title))break;return e;case`style`:if(e.hasAttribute(`data-precedence`))break;return e;case`script`:if(a=e.getAttribute(`src`),(a!==(i.src==null?null:i.src)||e.getAttribute(`type`)!==(i.type==null?null:i.type)||e.getAttribute(`crossorigin`)!==(i.crossOrigin==null?null:i.crossOrigin))&&a&&e.hasAttribute(`async`)&&!e.hasAttribute(`itemprop`))break;return e;default:return e}if(e=lm(e.nextSibling),e===null)break}return null}function im(e,t,n){if(t===``)return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!==`INPUT`||e.type!==`hidden`)&&!n||(e=lm(e.nextSibling),e===null))return null;return e}function am(e,t){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!==`INPUT`||e.type!==`hidden`)&&!t||(e=lm(e.nextSibling),e===null))return null;return e}function om(e){return e.data===`$?`||e.data===`$~`}function sm(e){return e.data===`$!`||e.data===`$?`&&e.ownerDocument.readyState!==`loading`}function cm(e,t){var n=e.ownerDocument;if(e.data===`$~`)e._reactRetry=t;else if(e.data!==`$?`||n.readyState!==`loading`)t();else{var r=function(){t(),n.removeEventListener(`DOMContentLoaded`,r)};n.addEventListener(`DOMContentLoaded`,r),e._reactRetry=r}}function lm(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t===`$`||t===`$!`||t===`$?`||t===`$~`||t===`&`||t===`F!`||t===`F`)break;if(t===`/$`||t===`/&`)return null}}return e}var um=null;function dm(e){e=e.nextSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n===`/$`||n===`/&`){if(t===0)return lm(e.nextSibling);t--}else n!==`$`&&n!==`$!`&&n!==`$?`&&n!==`$~`&&n!==`&`||t++}e=e.nextSibling}return null}function fm(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n===`$`||n===`$!`||n===`$?`||n===`$~`||n===`&`){if(t===0)return e;t--}else n!==`/$`&&n!==`/&`||t++}e=e.previousSibling}return null}function pm(e,t){function n(){r=!0}if(e.ownerDocument.activeElement===e)return!0;var r=!1;try{e.ownerDocument.addEventListener(`focus`,n,!0),(e.focus||HTMLElement.prototype.focus).call(e,t)}finally{e.ownerDocument.removeEventListener(`focus`,n,!0)}return r}function mm(e){yp(function(){yp(function(t){return e(t)})})}function hm(e,t,n){switch(t=lp(n),e){case`html`:if(e=t.documentElement,!e)throw Error(i(452));return e;case`head`:if(e=t.head,!e)throw Error(i(453));return e;case`body`:if(e=t.body,!e)throw Error(i(454));return e;default:throw Error(i(451))}}function gm(e,t,n){for(var r in n){var i=n[r];n.hasOwnProperty(r)&&i!=null&&$(e,t,r,null,rp,i)}n.dangerouslySetInnerHTML!=null&&(e.textContent=``),e.onclick===On&&(e.onclick=null),Vt(e)}function _m(e){for(var t=e.attributes;t.length;)e.removeAttributeNode(t[0]);Vt(e)}var vm=new Map,ym=new Set;function bm(e){if(typeof e.getRootNode==`function`){var t=e.getRootNode();if(t.nodeType===9||t.nodeType===11)return t}return e.nodeType===9?e:e.ownerDocument}var xm=T.d;T.d={f:Sm,r:Cm,D:Em,C:Dm,L:Om,m:km,X:jm,S:Am,M:Mm};function Sm(){var e=xm.f(),t=zd();return e||t}function Cm(e){var t=Ut(e);t!==null&&t.tag===5&&t.type===`form`?sc(t):xm.r(e)}var wm=typeof document>`u`?null:document;function Tm(e,t,n){var r=wm;if(r&&typeof t==`string`&&t){var i=pn(t);i=`link[rel="`+e+`"][href="`+i+`"]`,typeof n==`string`&&(i+=`[crossorigin="`+n+`"]`),ym.has(i)||(ym.add(i),e={rel:e,crossOrigin:n,href:t},r.querySelector(i)===null&&(t=r.createElement(`link`),np(t,`link`,e),Kt(t),r.head.appendChild(t)))}}function Em(e){xm.D(e),Tm(`dns-prefetch`,e,null)}function Dm(e,t){xm.C(e,t),Tm(`preconnect`,e,t)}function Om(e,t,n){xm.L(e,t,n);var r=wm;if(r&&e&&t){var i=`link[rel="preload"][as="`+pn(t)+`"]`;t===`image`&&n&&n.imageSrcSet?(i+=`[imagesrcset="`+pn(n.imageSrcSet)+`"]`,typeof n.imageSizes==`string`&&(i+=`[imagesizes="`+pn(n.imageSizes)+`"]`)):i+=`[href="`+pn(e)+`"]`;var a=i;switch(t){case`style`:a=Pm(e);break;case`script`:a=Rm(e)}if(!(vm.has(a)||(e=C({rel:`preload`,href:t===`image`&&n&&n.imageSrcSet?void 0:e,as:t},n),vm.set(a,e),r.querySelector(i)!==null||t===`style`&&r.querySelector(Fm(a))||t===`script`&&r.querySelector(zm(a))))){var o=r.createElement(`link`);np(o,`link`,e),t===`style`&&(o[Bt]=!0,o.onload=o.onerror=function(){qt(o)}),Kt(o),r.head.appendChild(o)}}}function km(e,t){xm.m(e,t);var n=wm;if(n&&e){var r=t&&typeof t.as==`string`?t.as:`script`,i=`link[rel="modulepreload"][as="`+pn(r)+`"][href="`+pn(e)+`"]`,a=i;switch(r){case`audioworklet`:case`paintworklet`:case`serviceworker`:case`sharedworker`:case`worker`:case`script`:a=Rm(e)}if(!vm.has(a)&&(e=C({rel:`modulepreload`,href:e},t),vm.set(a,e),n.querySelector(i)===null)){switch(r){case`audioworklet`:case`paintworklet`:case`serviceworker`:case`sharedworker`:case`worker`:case`script`:if(n.querySelector(zm(a)))return}r=n.createElement(`link`),np(r,`link`,e),Kt(r),n.head.appendChild(r)}}}function Am(e,t,n){xm.S(e,t,n);var r=wm;if(r&&e){var i=Gt(r).hoistableStyles,a=Pm(e);t||=`default`;var o=i.get(a);if(!o){var s={loading:0,preload:null};if(o=r.querySelector(Fm(a)))s.loading=5;else{e=C({rel:`stylesheet`,href:e,"data-precedence":t},n),(n=vm.get(a))&&Hm(e,n);var c=o=r.createElement(`link`);Kt(c),np(c,`link`,e),c._p=new Promise(function(e,t){c.onload=e,c.onerror=t}),c.addEventListener(`load`,function(){s.loading|=1}),c.addEventListener(`error`,function(){s.loading|=2}),s.loading|=4,Vm(o,t,r)}o={type:`stylesheet`,instance:o,count:1,state:s},i.set(a,o)}}}function jm(e,t){xm.X(e,t);var n=wm;if(n&&e){var r=Gt(n).hoistableScripts,i=Rm(e),a=r.get(i);a||(a=n.querySelector(zm(i)),a||(e=C({src:e,async:!0},t),(t=vm.get(i))&&Um(e,t),a=n.createElement(`script`),Kt(a),np(a,`link`,e),n.head.appendChild(a)),a={type:`script`,instance:a,count:1,state:null},r.set(i,a))}}function Mm(e,t){xm.M(e,t);var n=wm;if(n&&e){var r=Gt(n).hoistableScripts,i=Rm(e),a=r.get(i);a||(a=n.querySelector(zm(i)),a||(e=C({src:e,async:!0,type:`module`},t),(t=vm.get(i))&&Um(e,t),a=n.createElement(`script`),Kt(a),np(a,`link`,e),n.head.appendChild(a)),a={type:`script`,instance:a,count:1,state:null},r.set(i,a))}}function Nm(e,t,n,r){var a=(a=Ne.current)?bm(a):null;if(!a)throw Error(i(446));switch(e){case`meta`:case`title`:return null;case`style`:return typeof n.precedence==`string`&&typeof n.href==`string`?(n=Pm(n.href),t=Gt(a).hoistableStyles,r=t.get(n),r||(r={type:`style`,instance:null,count:0,state:null},t.set(n,r)),r):{type:`void`,instance:null,count:0,state:null};case`link`:if(n.rel===`stylesheet`&&typeof n.href==`string`&&typeof n.precedence==`string`){e=Pm(n.href);var o=Gt(a).hoistableStyles,s=o.get(e);if(s||(a=a.ownerDocument||a,s={type:`stylesheet`,instance:null,count:0,state:{loading:0,preload:null}},o.set(e,s),(o=a.querySelector(Fm(e)))?o._p||(s.instance=o,s.state.loading=5):(o=vm.get(e),o||(o={rel:`preload`,as:`style`,href:n.href,crossOrigin:n.crossOrigin,integrity:n.integrity,media:n.media,hrefLang:n.hrefLang,referrerPolicy:n.referrerPolicy},vm.set(e,o)),Lm(a,e,o,s.state))),t&&r===null)throw Error(i(528,``));return s}if(t&&r!==null)throw Error(i(529,``));return null;case`script`:return t=n.async,n=n.src,typeof n==`string`&&t&&typeof t!=`function`&&typeof t!=`symbol`?(n=Rm(n),t=Gt(a).hoistableScripts,r=t.get(n),r||(r={type:`script`,instance:null,count:0,state:null},t.set(n,r)),r):{type:`void`,instance:null,count:0,state:null};default:throw Error(i(444,e))}}function Pm(e){return`href="`+pn(e)+`"`}function Fm(e){return`link[rel="stylesheet"][`+e+`]`}function Im(e){return C({},e,{"data-precedence":e.precedence,precedence:null})}function Lm(e,t,n,r){if(t=e.querySelector(`link[rel="preload"][as="style"][`+t+`]`)){if(!0!==t[Bt]){r.loading=1;return}}else t=e.createElement(`link`),t[Bt]=!0,t.onload=t.onerror=qt.bind(null,t),np(t,`link`,n),Kt(t),e.head.appendChild(t);r.preload=t,t.addEventListener(`load`,function(){return r.loading|=1}),t.addEventListener(`error`,function(){return r.loading|=2})}function Rm(e){return`[src="`+pn(e)+`"]`}function zm(e){return`script[async]`+e}function Bm(e,t,n){if(t.count++,t.instance===null)switch(t.type){case`style`:var r=e.querySelector(`style[data-href~="`+pn(n.href)+`"]`);if(r)return t.instance=r,Kt(r),r;var a=C({},n,{"data-href":n.href,"data-precedence":n.precedence,href:null,precedence:null});return r=(e.ownerDocument||e).createElement(`style`),Kt(r),np(r,`style`,a),Vm(r,n.precedence,e),t.instance=r;case`stylesheet`:a=Pm(n.href);var o=e.querySelector(Fm(a));if(o)return t.state.loading|=4,t.instance=o,Kt(o),o;r=Im(n),(a=vm.get(a))&&Hm(r,a),o=(e.ownerDocument||e).createElement(`link`),Kt(o);var s=o;return s._p=new Promise(function(e,t){s.onload=e,s.onerror=t}),np(o,`link`,r),t.state.loading|=4,Vm(o,n.precedence,e),t.instance=o;case`script`:return o=Rm(n.src),(a=e.querySelector(zm(o)))?(t.instance=a,Kt(a),a):(r=n,(a=vm.get(o))&&(r=C({},n),Um(r,a)),e=e.ownerDocument||e,a=e.createElement(`script`),Kt(a),np(a,`link`,r),e.head.appendChild(a),t.instance=a);case`void`:return null;default:throw Error(i(443,t.type))}else t.type===`stylesheet`&&!(t.state.loading&4)&&(r=t.instance,t.state.loading|=4,Vm(r,n.precedence,e));return t.instance}function Vm(e,t,n){for(var r=n.querySelectorAll(`link[rel="stylesheet"][data-precedence],style[data-precedence]`),i=r.length?r[r.length-1]:null,a=i,o=0;o<r.length;o++){var s=r[o];if(s.dataset.precedence===t)a=s;else if(a!==i)break}a?a.parentNode.insertBefore(e,a.nextSibling):(t=n.nodeType===9?n.head:n,t.insertBefore(e,t.firstChild))}function Hm(e,t){e.crossOrigin??=t.crossOrigin,e.referrerPolicy??=t.referrerPolicy,e.title??=t.title}function Um(e,t){e.crossOrigin??=t.crossOrigin,e.referrerPolicy??=t.referrerPolicy,e.integrity??=t.integrity}var Wm=null;function Gm(e,t,n){if(Wm===null){var r=new Map,i=Wm=new Map;i.set(n,r)}else i=Wm,r=i.get(n),r||(r=new Map,i.set(n,r));if(r.has(e))return r;for(r.set(e,null),n=n.getElementsByTagName(e),i=0;i<n.length;i++){var a=n[i];if(!(a[zt]||a[Mt]||e===`link`&&a.getAttribute(`rel`)===`stylesheet`)&&a.namespaceURI!==`http://www.w3.org/2000/svg`){var o=a.getAttribute(t)||``;o=e+o;var s=r.get(o);s?s.push(a):r.set(o,[a])}}return r}function Km(e,t,n){e=e.ownerDocument||e,e.head.insertBefore(n,t===`title`?e.querySelector(`head > title`):null)}function qm(e,t,n){if(n===1||t.itemProp!=null)return!1;switch(e){case`meta`:case`title`:return!0;case`style`:if(typeof t.precedence!=`string`||typeof t.href!=`string`||t.href===``)break;return!0;case`link`:if(typeof t.rel!=`string`||typeof t.href!=`string`||t.href===``||t.onLoad||t.onError)break;switch(t.rel){case`stylesheet`:return e=t.disabled,typeof t.precedence==`string`&&e==null;default:return!0}case`script`:if(t.async&&typeof t.async!=`function`&&typeof t.async!=`symbol`&&!t.onLoad&&!t.onError&&t.src&&typeof t.src==`string`)return!0}return!1}function Jm(e,t){return e===`img`&&t.src!=null&&t.src!==``&&t.onLoad==null&&t.loading!==`lazy`}function Ym(e){return!(e.type===`stylesheet`&&!(e.state.loading&3))}function Xm(e){return(e.width||100)*(e.height||100)*(typeof devicePixelRatio==`number`?devicePixelRatio:1)*.25}function Zm(e,t){typeof t.decode==`function`&&(e.imgCount++,t.complete||(e.imgBytes+=Xm(t),e.suspenseyImages.push(t)),e=rh.bind(e),t.decode().then(e,e))}function Qm(e,t,n,r){if(n.type===`stylesheet`&&(typeof r.media!=`string`||!1!==matchMedia(r.media).matches)&&!(n.state.loading&4)){if(n.instance===null){var i=Pm(r.href),a=t.querySelector(Fm(i));if(a){t=a._p,typeof t==`object`&&t&&typeof t.then==`function`&&(e.count++,e=nh.bind(e),t.then(e,e)),n.state.loading|=4,n.instance=a,Kt(a);return}a=t.ownerDocument||t,r=Im(r),(i=vm.get(i))&&Hm(r,i),a=a.createElement(`link`),Kt(a);var o=a;o._p=new Promise(function(e,t){o.onload=e,o.onerror=t}),np(a,`link`,r),n.instance=a}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(n,t),(t=n.state.preload)&&!(n.state.loading&3)&&(e.count++,n=nh.bind(e),t.addEventListener(`load`,n),t.addEventListener(`error`,n))}}var $m=0;function eh(e,t){return e.stylesheets&&e.count===0&&ah(e,e.stylesheets),0<e.count||0<e.imgCount?function(n){var r=setTimeout(function(){if(e.stylesheets&&ah(e,e.stylesheets),e.unsuspend){var t=e.unsuspend;e.unsuspend=null,t()}},6e4+t);0<e.imgBytes&&$m===0&&($m=62500*op());var i=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&ah(e,e.stylesheets),e.unsuspend)){var t=e.unsuspend;e.unsuspend=null,t()}},(e.imgBytes>$m?50:800)+t);return e.unsuspend=n,function(){e.unsuspend=null,clearTimeout(r),clearTimeout(i)}}:null}function th(e){if(e.count===0&&(e.imgCount===0||!e.waitingForImages)){if(e.stylesheets)ah(e,e.stylesheets);else if(e.unsuspend){var t=e.unsuspend;e.unsuspend=null,t()}}}function nh(){this.count--,th(this)}function rh(){this.imgCount--,th(this)}var ih=null;function ah(e,t){e.stylesheets=null,e.unsuspend!==null&&(e.count++,ih=new Map,t.forEach(oh,e),ih=null,nh.call(e))}function oh(e,t){if(!(t.state.loading&4)){var n=ih.get(e);if(n)var r=n.get(null);else{n=new Map,ih.set(e,n);for(var i=e.querySelectorAll(`link[data-precedence],style[data-precedence]`),a=0;a<i.length;a++){var o=i[a];(o.nodeName===`LINK`||o.getAttribute(`media`)!==`not all`)&&(n.set(o.dataset.precedence,o),r=o)}r&&n.set(null,r)}i=t.instance,o=i.getAttribute(`data-precedence`),a=n.get(o)||r,a===r&&n.set(null,i),n.set(o,i),this.count++,r=nh.bind(this),i.addEventListener(`load`,r),i.addEventListener(`error`,r),a?a.parentNode.insertBefore(i,a.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(i,e.firstChild)),t.state.loading|=4}}var sh={$$typeof:de,Provider:null,Consumer:null,_currentValue:De,_currentValue2:De,_threadCount:0};function ch(e,t,n,r,i,a,o,s,c){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=xt(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=xt(0),this.hiddenUpdates=xt(null),this.identifierPrefix=r,this.onUncaughtError=i,this.onCaughtError=a,this.onRecoverableError=o,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=c,this.transitionTypes=null,this.incompleteTransitions=new Map}function lh(e,t,n,r,i,a,o,s,c,l,u,d){return e=new ch(e,t,n,o,c,l,u,d,s),t=1,!0===a&&(t|=24),a=Hi(3,null,null,t),e.current=a,a.stateNode=e,t=za(),t.refCount++,e.pooledCache=t,t.refCount++,a.memoizedState={element:r,isDehydrated:n,cache:t},So(a),e}function uh(e){return e?(e=Bi,e):Bi}function dh(e,t,n,r,i,a){i=uh(i),r.context===null?r.context=i:r.pendingContext=i,r=wo(t),r.payload={element:n},a=a===void 0?null:a,a!==null&&(r.callback=a),n=To(e,r,t),n!==null&&(Pd(n,e,t),Eo(n,e,t))}function fh(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function ph(e,t){fh(e,t),(e=e.alternate)&&fh(e,t)}function mh(e){if(e.tag===13||e.tag===31){var t=Li(e,67108864);t!==null&&Pd(t,e,67108864),ph(e,67108864)}}function hh(e){if(e.tag===13||e.tag===31){var t=jd();t=Dt(t);var n=Li(e,t);n!==null&&Pd(n,e,t),ph(e,t)}}var gh=!0;function _h(e,t,n,r){var i=w.T;w.T=null;var a=T.p;try{T.p=2,yh(e,t,n,r)}finally{T.p=a,w.T=i}}function vh(e,t,n,r){var i=w.T;w.T=null;var a=T.p;try{T.p=8,yh(e,t,n,r)}finally{T.p=a,w.T=i}}function yh(e,t,n,r){if(gh){var i=bh(r);if(i===null)Kf(e,t,r,xh,n),Mh(e,r);else if(Ph(i,e,t,n,r))r.stopPropagation();else if(Mh(e,r),t&4&&-1<jh.indexOf(e)){for(;i!==null;){var a=Ut(i);if(a!==null)switch(a.tag){case 3:if(a=a.stateNode,a.current.memoizedState.isDehydrated){var o=ht(a.pendingLanes);if(o!==0){var s=a;for(s.pendingLanes|=2,s.entangledLanes|=2;o;){var c=1<<31-O(o);s.entanglements[1]|=c,o&=~c}Ef(a),!(W&6)&&(_d=Ze()+500,Df(0,!1))}}break;case 31:case 13:s=Li(a,2),s!==null&&Pd(s,a,2),zd(),ph(a,2)}if(a=bh(r),a===null&&Kf(e,t,r,xh,n),a===i)break;i=a}i!==null&&r.stopPropagation()}else Kf(e,t,r,null,n)}}function bh(e){return e=An(e),Sh(e)}var xh=null;function Sh(e){if(xh=null,e=Ht(e),e!==null){var t=o(e);if(t===null)e=null;else{var n=t.tag;if(n===13){if(e=s(t),e!==null)return e;e=null}else if(n===31){if(e=c(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null)}}return xh=e,null}function Ch(e){switch(e){case`beforetoggle`:case`cancel`:case`click`:case`close`:case`contextmenu`:case`copy`:case`cut`:case`auxclick`:case`dblclick`:case`dragend`:case`dragstart`:case`drop`:case`focusin`:case`focusout`:case`input`:case`invalid`:case`keydown`:case`keypress`:case`keyup`:case`mousedown`:case`mouseup`:case`paste`:case`pause`:case`play`:case`pointercancel`:case`pointerdown`:case`pointerup`:case`ratechange`:case`reset`:case`seeked`:case`submit`:case`toggle`:case`touchcancel`:case`touchend`:case`touchstart`:case`volumechange`:case`change`:case`selectionchange`:case`textInput`:case`compositionstart`:case`compositionend`:case`compositionupdate`:case`beforeblur`:case`afterblur`:case`beforeinput`:case`blur`:case`fullscreenchange`:case`fullscreenerror`:case`focus`:case`hashchange`:case`popstate`:case`select`:case`selectstart`:return 2;case`drag`:case`dragenter`:case`dragexit`:case`dragleave`:case`dragover`:case`mousemove`:case`mouseout`:case`mouseover`:case`pointermove`:case`pointerout`:case`pointerover`:case`resize`:case`scroll`:case`touchmove`:case`wheel`:case`mouseenter`:case`mouseleave`:case`pointerenter`:case`pointerleave`:return 8;case`message`:switch(Qe()){case $e:return 2;case et:return 8;case tt:case nt:return 32;case rt:return 268435456;default:return 32}default:return 32}}var wh=!1,Th=null,Eh=null,Dh=null,Oh=new Map,kh=new Map,Ah=[],jh=`mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset`.split(` `);function Mh(e,t){switch(e){case`focusin`:case`focusout`:Th=null;break;case`dragenter`:case`dragleave`:Eh=null;break;case`mouseover`:case`mouseout`:Dh=null;break;case`pointerover`:case`pointerout`:Oh.delete(t.pointerId);break;case`gotpointercapture`:case`lostpointercapture`:kh.delete(t.pointerId)}}function Nh(e,t,n,r,i,a){return e===null||e.nativeEvent!==a?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:a,targetContainers:[i]},t!==null&&(t=Ut(t),t!==null&&mh(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,i!==null&&t.indexOf(i)===-1&&t.push(i),e)}function Ph(e,t,n,r,i){switch(t){case`focusin`:return Th=Nh(Th,e,t,n,r,i),!0;case`dragenter`:return Eh=Nh(Eh,e,t,n,r,i),!0;case`mouseover`:return Dh=Nh(Dh,e,t,n,r,i),!0;case`pointerover`:var a=i.pointerId;return Oh.set(a,Nh(Oh.get(a)||null,e,t,n,r,i)),!0;case`gotpointercapture`:return a=i.pointerId,kh.set(a,Nh(kh.get(a)||null,e,t,n,r,i)),!0}return!1}function Fh(e){var t=Ht(e.target);if(t!==null){var n=o(t);if(n!==null){if(t=n.tag,t===13){if(t=s(n),t!==null){e.blockedOn=t,At(e.priority,function(){hh(n)});return}}else if(t===31){if(t=c(n),t!==null){e.blockedOn=t,At(e.priority,function(){hh(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Ih(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=bh(e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);kn=r,n.target.dispatchEvent(r),kn=null}else return t=Ut(n),t!==null&&mh(t),e.blockedOn=n,!1;t.shift()}return!0}function Lh(e,t,n){Ih(e)&&n.delete(t)}function Rh(){wh=!1,Th!==null&&Ih(Th)&&(Th=null),Eh!==null&&Ih(Eh)&&(Eh=null),Dh!==null&&Ih(Dh)&&(Dh=null),Oh.forEach(Lh),kh.forEach(Lh)}function zh(e,n){e.blockedOn===n&&(e.blockedOn=null,wh||(wh=!0,t.unstable_scheduleCallback(t.unstable_NormalPriority,Rh)))}var Bh=null;function Vh(e){Bh!==e&&(Bh=e,t.unstable_scheduleCallback(t.unstable_NormalPriority,function(){Bh===e&&(Bh=null);for(var t=0;t<e.length;t+=3){var n=e[t],r=e[t+1],i=e[t+2];if(typeof r!=`function`){if(Sh(r||n)===null)continue;break}var a=Ut(n);a!==null&&(e.splice(t,3),t-=3,ac(a,{pending:!0,data:i,method:n.method,action:r},r,i))}}))}function Hh(e){function t(t){return zh(t,e)}Th!==null&&zh(Th,e),Eh!==null&&zh(Eh,e),Dh!==null&&zh(Dh,e),Oh.forEach(t),kh.forEach(t);for(var n=0;n<Ah.length;n++){var r=Ah[n];r.blockedOn===e&&(r.blockedOn=null)}for(;0<Ah.length&&(n=Ah[0],n.blockedOn===null);)Fh(n),n.blockedOn===null&&Ah.shift();if(n=(e.ownerDocument||e).$$reactFormReplay,n!=null)for(r=0;r<n.length;r+=3){var i=n[r],a=n[r+1],o=i[Nt]||null;if(typeof a==`function`)o||Vh(n);else if(o){var s=null;if(a&&a.hasAttribute(`formAction`)){if(i=a,o=a[Nt]||null)s=o.formAction;else if(Sh(i)!==null)continue}else s=o.action;typeof s==`function`?n[r+1]=s:(n.splice(r,3),r-=3),Vh(n)}}}function Uh(){function e(e){e.canIntercept&&e.info===`react-transition`&&e.intercept({handler:function(){return new Promise(function(e){return i=e})},focusReset:`manual`,scroll:`manual`})}function t(){i!==null&&(i(),i=null),r||setTimeout(n,20)}function n(){if(!r&&!navigation.transition){var e=navigation.currentEntry;e&&e.url!=null&&navigation.navigate(e.url,{state:e.getState(),info:`react-transition`,history:`replace`})}}if(typeof navigation==`object`){var r=!1,i=null;return navigation.addEventListener(`navigate`,e),navigation.addEventListener(`navigatesuccess`,t),navigation.addEventListener(`navigateerror`,t),setTimeout(n,100),function(){r=!0,navigation.removeEventListener(`navigate`,e),navigation.removeEventListener(`navigatesuccess`,t),navigation.removeEventListener(`navigateerror`,t),i!==null&&(i(),i=null)}}}function Wh(e){this._internalRoot=e}Gh.prototype.render=Wh.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(i(409));var n=t.current;dh(n,jd(),e,t,null,null)},Gh.prototype.unmount=Wh.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;dh(e.current,2,null,e,null,null),zd(),t[Pt]=null}};function Gh(e){this._internalRoot=e}Gh.prototype.unstable_scheduleHydration=function(e){if(e){var t=kt();e={blockedOn:null,target:e,priority:t};for(var n=0;n<Ah.length&&t!==0&&t<Ah[n].priority;n++);Ah.splice(n,0,e),n===0&&Fh(e)}};var Kh=n.version;if(Kh!==`19.3.1`)throw Error(i(527,Kh,`19.3.1`));T.findDOMNode=function(e){var t=e._reactInternals;if(t===void 0)throw typeof e.render==`function`?Error(i(188)):(e=Object.keys(e).join(`,`),Error(i(268,e)));return e=d(t),e=e===null?null:p(e),e=e===null?null:e.stateNode,e};var qh={bundleType:0,version:`19.3.1`,rendererPackageName:`react-dom`,currentDispatcherRef:w,reconcilerVersion:`19.3.1`};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<`u`){var Jh=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Jh.isDisabled&&Jh.supportsFiber)try{ot=Jh.inject(qh),st=Jh}catch{}}e.createRoot=function(e,t){if(!a(e))throw Error(i(299));var n=!1,r=``,o=Oc,s=kc,c=Ac;return t!=null&&(!0===t.unstable_strictMode&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onUncaughtError!==void 0&&(o=t.onUncaughtError),t.onCaughtError!==void 0&&(s=t.onCaughtError),t.onRecoverableError!==void 0&&(c=t.onRecoverableError)),t=lh(e,1,!1,null,null,n,r,null,o,s,c,Uh),e[Pt]=t.current,Wf(e),new Wh(t)}})),g=o(((e,t)=>{function n(){if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<`u`&&typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE==`function`)try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(e){console.error(e)}}n(),t.exports=h()})),_=e=>e.replace(/([a-z0-9])([A-Z])/g,`$1-$2`).toLowerCase(),v=e=>e.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,t,n)=>n?n.toUpperCase():t.toLowerCase()),y=e=>{let t=v(e);return t.charAt(0).toUpperCase()+t.slice(1)},b=(...e)=>e.filter((e,t,n)=>!!e&&e.trim()!==``&&n.indexOf(e)===t).join(` `).trim(),ee=e=>{for(let t in e)if(t.startsWith(`aria-`)||t===`role`||t===`title`)return!0},te={xmlns:`http://www.w3.org/2000/svg`,width:24,height:24,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:2,strokeLinecap:`round`,strokeLinejoin:`round`},x=c(f()),ne=(0,x.forwardRef)(({color:e=`currentColor`,size:t=24,strokeWidth:n=2,absoluteStrokeWidth:r,className:i=``,children:a,iconNode:o,...s},c)=>(0,x.createElement)(`svg`,{ref:c,...te,width:t,height:t,stroke:e,strokeWidth:r?Number(n)*24/Number(t):n,className:b(`lucide`,i),...!a&&!ee(s)&&{"aria-hidden":`true`},...s},[...o.map(([e,t])=>(0,x.createElement)(e,t)),...Array.isArray(a)?a:[a]])),S=(e,t)=>{let n=(0,x.forwardRef)(({className:n,...r},i)=>(0,x.createElement)(ne,{ref:i,iconNode:t,className:b(`lucide-${_(y(e))}`,`lucide-${e}`,n),...r}));return n.displayName=y(e),n},re=S(`circle-check`,[[`circle`,{cx:`12`,cy:`12`,r:`10`,key:`1mglay`}],[`path`,{d:`m9 12 2 2 4-4`,key:`dzmm74`}]]),C=S(`circle-question-mark`,[[`circle`,{cx:`12`,cy:`12`,r:`10`,key:`1mglay`}],[`path`,{d:`M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3`,key:`1u773s`}],[`path`,{d:`M12 17h.01`,key:`p32p05`}]]),ie=S(`circle-x`,[[`circle`,{cx:`12`,cy:`12`,r:`10`,key:`1mglay`}],[`path`,{d:`m15 9-6 6`,key:`1uzhvr`}],[`path`,{d:`m9 9 6 6`,key:`z0biqf`}]]),ae=S(`compass`,[[`path`,{d:`m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z`,key:`9ktpf1`}],[`circle`,{cx:`12`,cy:`12`,r:`10`,key:`1mglay`}]]),oe=S(`refresh-cw`,[[`path`,{d:`M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8`,key:`v9h5vc`}],[`path`,{d:`M21 3v5h-5`,key:`1q7to0`}],[`path`,{d:`M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16`,key:`3uifl3`}],[`path`,{d:`M8 16H3v5`,key:`1cv678`}]]),se=S(`rotate-ccw`,[[`path`,{d:`M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8`,key:`1357e3`}],[`path`,{d:`M3 3v5h5`,key:`1xhq8a`}]]),ce=S(`triangle-alert`,[[`path`,{d:`m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3`,key:`wmoenq`}],[`path`,{d:`M12 9v4`,key:`juzpu7`}],[`path`,{d:`M12 17h.01`,key:`p32p05`}]]),le=S(`x`,[[`path`,{d:`M18 6 6 18`,key:`1bl5f8`}],[`path`,{d:`m6 6 12 12`,key:`d8bk6v`}]]),ue=g(),de=[{slug:`drive-mad`,title:`Drive Mad`,category:`Racing`,url:`https://cdn.jsdelivr.net/gh/selenite-cc/selenite-old@main/drivemad/index.html`},{slug:`geometry-dash`,title:`Geometry Dash`,category:`Rhythm`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/868-F3.html`},{slug:`buckshot-roulette`,title:`Buckshot Roulette`,category:`Horror`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/205-fix2.html`},{slug:`stick-war-legacy`,title:`Stick War Legacy`,category:`Strategy`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/666-fix2.html`},{slug:`crazy-cattle-3d`,title:`Crazy Cattle 3D`,category:`Action`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/164-fix3.html`},{slug:`ovo`,title:`OvO`,category:`Platformer`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/1-fix2.html`},{slug:`ovo-2`,title:`OvO 2`,category:`Platformer`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/2-fix3.html`},{slug:`ovo-dimensions`,title:`OvO Dimensions`,category:`Platformer`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/3-fix3.html`},{slug:`slope`,title:`Slope`,category:`Arcade`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/198-fix2.html`},{slug:`slope-2`,title:`Slope 2`,category:`Arcade`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/368-fix.html`},{slug:`slope-3`,title:`Slope 3`,category:`Arcade`,url:`https://cdn.jsdelivr.net/gh/selenite-cc/selenite-old@main/slope3/index.html`},{slug:`1v1-lol`,title:`1v1.LOL`,category:`Action`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/58-fix2.html`},{slug:`retro-bowl`,title:`Retro Bowl`,category:`Sports`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/33-fix2.html`},{slug:`retro-bowl-college`,title:`Retro Bowl College`,category:`Sports`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/34-fix2.html`},{slug:`bitlife`,title:`BitLife`,category:`Simulation`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/70-fix2.html`},{slug:`minecraft-1-5-2`,title:`Minecraft 1.5.2`,category:`Sandbox`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/297-f.html`},{slug:`minecraft-1-8-8`,title:`Minecraft 1.8.8`,category:`Sandbox`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/181-f.html`},{slug:`minecraft-1-12-2`,title:`Minecraft 1.12.2`,category:`Sandbox`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/182-f.html`},{slug:`terraria`,title:`Terraria`,category:`Sandbox`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/669-fix.html`},{slug:`hollow-knight`,title:`Hollow Knight`,category:`Action`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/468-fix2.html`},{slug:`undertale`,title:`Undertale`,category:`RPG`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/456-fix2.html`},{slug:`deltarune`,title:`Deltarune`,category:`RPG`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/864-fix.html`},{slug:`cuphead`,title:`Cuphead`,category:`Action`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/465-fix2.html`},{slug:`ultrakill`,title:`Ultrakill`,category:`Action`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/196-fix2.html`},{slug:`people-playground`,title:`People Playground`,category:`Sandbox`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/194-fix2.html`},{slug:`webfishing`,title:`Webfishing`,category:`Simulation`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/423-fix2.html`},{slug:`speedstars`,title:`Speed Stars`,category:`Sports`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/266-fix2.html`},{slug:`karlson`,title:`Karlson`,category:`Action`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/542-fix2.html`},{slug:`milkman-karlson`,title:`Milkman Karlson`,category:`Action`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/542-fix2.html`},{slug:`bad-time-simulator`,title:`Bad Time Simulator`,category:`RPG`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/472-fix2.html`},{slug:`fnaf-1`,title:`FNAF 1`,category:`Horror`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/38-fix2.html`},{slug:`fnaf-2`,title:`FNAF 2`,category:`Horror`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/39-fix2.html`},{slug:`fnaf-3`,title:`FNAF 3`,category:`Horror`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/40-fix2.html`},{slug:`fnaf-4`,title:`FNAF 4`,category:`Horror`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/41-fix2.html`},{slug:`fnaf-sister-location`,title:`FNAF Sister Location`,category:`Horror`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/185-fix2.html`},{slug:`fnaf-pizzeria-simulator`,title:`FNAF Pizzeria Simulator`,category:`Horror`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/191-fix2.html`},{slug:`fnaf-ucn`,title:`FNAF UCN`,category:`Horror`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/192-fix2.html`},{slug:`fnaf-world`,title:`FNAF World`,category:`Horror`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/190-fix2.html`},{slug:`baldis-basics`,title:`Baldi's Basics`,category:`Horror`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/65-fix2.html`},{slug:`baldis-basics-plus`,title:`Baldi's Basics Plus`,category:`Horror`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/467-fix2.html`},{slug:`bendy-and-the-ink-machine`,title:`Bendy and the Ink Machine`,category:`Horror`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/215-fix2.html`},{slug:`amanda-the-adventurer`,title:`Amanda the Adventurer`,category:`Horror`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/450-fix2.html`},{slug:`thats-not-my-neighbor`,title:`That's Not My Neighbor`,category:`Horror`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/216-fix2.html`},{slug:`bad-parenting`,title:`Bad Parenting`,category:`Horror`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/166-fix2.html`},{slug:`class-of-09`,title:`Class of '09`,category:`Story`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/259-fix2.html`},{slug:`doki-doki-literature-club`,title:`Doki Doki Literature Club`,category:`Story`,url:`https://cdn.jsdelivr.net/gh/Soleil-des-chats/ddlc-web-optimised@master/index.html`},{slug:`granny`,title:`Granny`,category:`Horror`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/90-fix3.html`},{slug:`granny-2`,title:`Granny 2`,category:`Horror`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/125-fix2.html`},{slug:`granny-3`,title:`Granny 3`,category:`Horror`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/852.html`},{slug:`backrooms`,title:`Backrooms`,category:`Horror`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/64-fix4.html`},{slug:`slender`,title:`Slender: The 8 Pages`,category:`Horror`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/451-fix2.html`},{slug:`eyes-the-horror-game`,title:`Eyes: The Horror Game`,category:`Horror`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/451-fix2.html`},{slug:`poppy-playtime`,title:`Poppy Playtime`,category:`Horror`,url:`https://cdn.jsdelivr.net/gh/ahrdevelopers/poppy-playtime@main/index.html`},{slug:`garten-of-banban`,title:`Garten of Banban`,category:`Horror`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/878-f.html`},{slug:`half-life`,title:`Half-Life`,category:`Action`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/262-fix.html`},{slug:`quake-3`,title:`Quake 3 Arena`,category:`Action`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/263-fix3.html`},{slug:`doom`,title:`DOOM`,category:`Action`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/203-fix2.html`},{slug:`doom-2`,title:`DOOM 2`,category:`Action`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/602-fix.html`},{slug:`wolfenstein-3d`,title:`Wolfenstein 3D`,category:`Action`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/874.html`},{slug:`superhot`,title:`SUPERHOT`,category:`Action`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/233-fix.html`},{slug:`time-shooter-2`,title:`Time Shooter 2`,category:`Action`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/200-fix.html`},{slug:`time-shooter-3`,title:`Time Shooter 3`,category:`Action`,url:`https://cdn.jsdelivr.net/gh/selenite-cc/selenite-old@main/timeshooter3/index.html`},{slug:`funny-shooter-2`,title:`Funny Shooter 2`,category:`Action`,url:`https://cdn.jsdelivr.net/gh/selenite-cc/selenite-old@main/funnyshooter2/index.html`},{slug:`pixel-gun-3d`,title:`Pixel Gun 3D`,category:`Action`,url:`https://cdn.jsdelivr.net/gh/ahrdevelopers/pixel-gun-3d@main/index.html`},{slug:`krunker`,title:`Krunker`,category:`Action`,url:`https://cdn.jsdelivr.net/gh/ahrdevelopers/krunker@main/index.html`},{slug:`shell-shockers`,title:`Shell Shockers`,category:`Action`,url:`https://cdn.jsdelivr.net/gh/ahrdevelopers/shell-shockers@main/index.html`},{slug:`getaway-shootout`,title:`Getaway Shootout`,category:`Action`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/338-fix2.html`},{slug:`rooftop-snipers`,title:`Rooftop Snipers`,category:`Action`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/283-fix2.html`},{slug:`rooftop-snipers-2`,title:`Rooftop Snipers 2`,category:`Action`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/490-fix.html`},{slug:`tube-jumpers`,title:`Tube Jumpers`,category:`Action`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/111-fix2.html`},{slug:`gun-mayhem`,title:`Gun Mayhem`,category:`Action`,url:`https://cdn.jsdelivr.net/gh/selenite-cc/selenite-old@main/gunmayhem/index.html`},{slug:`gun-mayhem-2`,title:`Gun Mayhem 2`,category:`Action`,url:`https://cdn.jsdelivr.net/gh/selenite-cc/selenite-old@main/gunmayhem2/index.html`},{slug:`gun-mayhem-redux`,title:`Gun Mayhem Redux`,category:`Action`,url:`https://cdn.jsdelivr.net/gh/selenite-cc/selenite-old@main/gunmayhemredux/index.html`},{slug:`strike-force-heroes`,title:`Strike Force Heroes`,category:`Action`,url:`https://cdn.jsdelivr.net/gh/ahrdevelopers/strike-force-heroes@main/index.html`},{slug:`strike-force-heroes-2`,title:`Strike Force Heroes 2`,category:`Action`,url:`https://cdn.jsdelivr.net/gh/ahrdevelopers/strike-force-heroes-2@main/index.html`},{slug:`strike-force-heroes-3`,title:`Strike Force Heroes 3`,category:`Action`,url:`https://cdn.jsdelivr.net/gh/ahrdevelopers/strike-force-heroes-3@main/index.html`},{slug:`raze`,title:`Raze`,category:`Action`,url:`https://cdn.jsdelivr.net/gh/ahrdevelopers/raze-3@main/index.html`},{slug:`raze-2`,title:`Raze 2`,category:`Action`,url:`https://cdn.jsdelivr.net/gh/ahrdevelopers/raze-3@main/index.html`},{slug:`raze-3`,title:`Raze 3`,category:`Action`,url:`https://cdn.jsdelivr.net/gh/ahrdevelopers/raze-3@main/index.html`},{slug:`hill-climb-racing`,title:`Hill Climb Racing`,category:`Racing`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/157-fix2.html`},{slug:`hill-climb-racing-2`,title:`Hill Climb Racing 2`,category:`Racing`,url:`https://cdn.jsdelivr.net/gh/ahrdevelopers/hill-climb-racing-2@main/index.html`},{slug:`moto-x3m`,title:`Moto X3M`,category:`Racing`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/96-fix.html`},{slug:`moto-x3m-2`,title:`Moto X3M 2`,category:`Racing`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/97-fix2.html`},{slug:`moto-x3m-3`,title:`Moto X3M 3`,category:`Racing`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/98-fix2.html`},{slug:`moto-x3m-winter`,title:`Moto X3M Winter`,category:`Racing`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/100-fix2.html`},{slug:`moto-x3m-pool-party`,title:`Moto X3M Pool Party`,category:`Racing`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/124-fix.html`},{slug:`moto-x3m-spooky-land`,title:`Moto X3M Spooky Land`,category:`Racing`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/99-fix.html`},{slug:`drift-hunters`,title:`Drift Hunters`,category:`Racing`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/173-fix2.html`},{slug:`drift-boss`,title:`Drift Boss`,category:`Racing`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/276-fix2.html`},{slug:`madalin-stunt-cars-2`,title:`Madalin Stunt Cars 2`,category:`Racing`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/278-fix.html`},{slug:`madalin-stunt-cars-3`,title:`Madalin Stunt Cars 3`,category:`Racing`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/279-fix.html`},{slug:`polytrack`,title:`PolyTrack`,category:`Racing`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/123-fix2.html`},{slug:`egg-car`,title:`Eggy Car`,category:`Racing`,url:`https://cdn.jsdelivr.net/gh/ubg98/EggyCar@gh-pages/index.html`},{slug:`earn-to-die`,title:`Earn to Die`,category:`Racing`,url:`https://cdn.jsdelivr.net/gh/hilfig3r/EarnToDie@main/index.html`},{slug:`earn-to-die-2`,title:`Earn to Die 2`,category:`Racing`,url:`https://cdn.jsdelivr.net/gh/gamebackup/earntodie2@main/index.html`},{slug:`earn-to-die-2012`,title:`Earn to Die 2012`,category:`Racing`,url:`https://cdn.jsdelivr.net/gh/ahrdevelopers/earn-to-die@main/index.html`},{slug:`jelly-truck`,title:`Jelly Truck`,category:`Racing`,url:`https://cdn.jsdelivr.net/gh/ahrdevelopers/jellytruck@main/index.html`},{slug:`happy-wheels`,title:`Happy Wheels`,category:`Arcade`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/624-fix.html`},{slug:`cluster-rush`,title:`Cluster Rush`,category:`Action`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/81-fix.html`},{slug:`subway-surfers`,title:`Subway Surfers`,category:`Arcade`,url:`https://cdn.jsdelivr.net/gh/ubg98/SubwaySurfers@gh-pages/index.html`},{slug:`temple-run-2`,title:`Temple Run 2`,category:`Arcade`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/10-fix2.html`},{slug:`crossy-road`,title:`Crossy Road`,category:`Arcade`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/24-fix2.html`},{slug:`jetpack-joyride`,title:`Jetpack Joyride`,category:`Arcade`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/7-fix3.html`},{slug:`fruit-ninja`,title:`Fruit Ninja`,category:`Arcade`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/261-fix.html`},{slug:`angry-birds`,title:`Angry Birds`,category:`Puzzle`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/63-fix2.html`},{slug:`angry-birds-rio`,title:`Angry Birds Rio`,category:`Puzzle`,url:`https://cdn.jsdelivr.net/gh/gamebackup/angrybirdsrio@main/index.html`},{slug:`angry-birds-space`,title:`Angry Birds Space`,category:`Puzzle`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/147-fix2.html`},{slug:`bad-piggies`,title:`Bad Piggies`,category:`Puzzle`,url:`https://cdn.jsdelivr.net/gh/gamebackup/badpiggies@main/index.html`},{slug:`cut-the-rope`,title:`Cut the Rope`,category:`Puzzle`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/85-fix2.html`},{slug:`cut-the-rope-time-travel`,title:`Cut the Rope: Time Travel`,category:`Puzzle`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/213-fix2.html`},{slug:`doodle-jump`,title:`Doodle Jump`,category:`Arcade`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/470-fix.html`},{slug:`flappy-bird`,title:`Flappy Bird`,category:`Arcade`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/129-fix.html`},{slug:`flappy-dunk`,title:`Flappy Dunk`,category:`Sports`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/153-fix2.html`},{slug:`magic-tiles-3`,title:`Magic Tiles 3`,category:`Rhythm`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/17-fix2.html`},{slug:`geometry-dash-lite`,title:`Geometry Dash Lite`,category:`Rhythm`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/27-fix2.html`},{slug:`geometry-dash-subzero`,title:`Geometry Dash SubZero`,category:`Rhythm`,url:`https://cdn.jsdelivr.net/gh/ahrdevelopers/geometry-dash-subzero@main/index.html`},{slug:`geometry-dash-meltdown`,title:`Geometry Dash Meltdown`,category:`Rhythm`,url:`https://cdn.jsdelivr.net/gh/ahrdevelopers/geometry-dash-meltdown@main/index.html`},{slug:`geometry-dash-world`,title:`Geometry Dash World`,category:`Rhythm`,url:`https://cdn.jsdelivr.net/gh/ahrdevelopers/geometry-dash-world@main/index.html`},{slug:`worlds-hardest-game`,title:`World's Hardest Game`,category:`Arcade`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/103-fix2.html`},{slug:`worlds-hardest-game-2`,title:`World's Hardest Game 2`,category:`Arcade`,url:`https://cdn.jsdelivr.net/gh/selenite-cc/selenite-old@main/worldhardestgame2/index.html`},{slug:`worlds-hardest-game-3`,title:`World's Hardest Game 3`,category:`Arcade`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/104-fix2.html`},{slug:`tomb-of-the-mask`,title:`Tomb of the Mask`,category:`Arcade`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/109-fix.html`},{slug:`paper-io-2`,title:`Paper.io 2`,category:`Arcade`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/102-fix.html`},{slug:`hole-io`,title:`Hole.io`,category:`Arcade`,url:`https://cdn.jsdelivr.net/gh/selenite-cc/selenite-old@main/holeio/index.html`},{slug:`plants-vs-zombies`,title:`Plants vs Zombies`,category:`Strategy`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/232-fix2.html`},{slug:`bloons-td`,title:`Bloons TD`,category:`Strategy`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/71-fix2.html`},{slug:`bloons-td-2`,title:`Bloons TD 2`,category:`Strategy`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/72-fix.html`},{slug:`bloons-td-3`,title:`Bloons TD 3`,category:`Strategy`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/73-fix2.html`},{slug:`bloons-td-4`,title:`Bloons TD 4`,category:`Strategy`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/74-fix.html`},{slug:`bloons-td-5`,title:`Bloons TD 5`,category:`Strategy`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/75-fix3.html`},{slug:`bloons-td-6`,title:`Bloons TD 6`,category:`Strategy`,url:`https://cdn.jsdelivr.net/gh/selenite-cc/selenite-old@main/btd6/index.html`},{slug:`bloons-td-battles`,title:`Bloons TD Battles`,category:`Strategy`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/75-fix3.html`},{slug:`kingdom-rush`,title:`Kingdom Rush`,category:`Strategy`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/661-fix2.html`},{slug:`kingdom-rush-frontiers`,title:`Kingdom Rush Frontiers`,category:`Strategy`,url:`https://cdn.jsdelivr.net/gh/ahrdevelopers/kingdom-rush-frontiers@main/index.html`},{slug:`kingdom-rush-origins`,title:`Kingdom Rush Origins`,category:`Strategy`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/661-fix2.html`},{slug:`age-of-war`,title:`Age of War`,category:`Strategy`,url:`https://cdn.jsdelivr.net/gh/selenite-cc/selenite-old@main/ageofwar/index.html`},{slug:`age-of-war-2`,title:`Age of War 2`,category:`Strategy`,url:`https://cdn.jsdelivr.net/gh/gamebackup/ageofwar2@main/index.html`},{slug:`stick-war`,title:`Stick War`,category:`Strategy`,url:`https://cdn.jsdelivr.net/gh/ahrdevelopers/stick-war@main/index.html`},{slug:`stick-war-2`,title:`Stick War 2`,category:`Strategy`,url:`https://cdn.jsdelivr.net/gh/ahrdevelopers/stick-war@main/index.html`},{slug:`battle-cats`,title:`Battle Cats`,category:`Strategy`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/537-fix.html`},{slug:`bad-ice-cream`,title:`Bad Ice Cream`,category:`Puzzle`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/269-fix2.html`},{slug:`bad-ice-cream-2`,title:`Bad Ice Cream 2`,category:`Puzzle`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/270-fix2.html`},{slug:`bad-ice-cream-3`,title:`Bad Ice Cream 3`,category:`Puzzle`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/271-fix2.html`},{slug:`territorial-io`,title:`Territorial.io`,category:`Strategy`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/303-fix2.html`},{slug:`run`,title:`Run`,category:`Platformer`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/175-fix.html`},{slug:`run-2`,title:`Run 2`,category:`Platformer`,url:`https://cdn.jsdelivr.net/gh/selenite-cc/selenite-old@main/run2/index.html`},{slug:`run-3`,title:`Run 3`,category:`Platformer`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/177-fix.html`},{slug:`fireboy-and-watergirl`,title:`Fireboy and Watergirl`,category:`Puzzle`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/88-fix.html`},{slug:`fireboy-and-watergirl-2`,title:`Fireboy and Watergirl 2`,category:`Puzzle`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/88-fix.html`},{slug:`fireboy-and-watergirl-3`,title:`Fireboy and Watergirl 3`,category:`Puzzle`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/89-fix.html`},{slug:`fireboy-and-watergirl-4`,title:`Fireboy and Watergirl 4`,category:`Puzzle`,url:`https://cdn.jsdelivr.net/gh/selenite-cc/selenite-old@main/fireboywatergirl4/index.html`},{slug:`red-ball-4`,title:`Red Ball 4`,category:`Platformer`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/242-fix2.html`},{slug:`snail-bob`,title:`Snail Bob`,category:`Puzzle`,url:`https://cdn.jsdelivr.net/gh/ubg98/SnailBob@gh-pages/index.html`},{slug:`snail-bob-2`,title:`Snail Bob 2`,category:`Puzzle`,url:`https://cdn.jsdelivr.net/gh/ubg98/SnailBob2@gh-pages/index.html`},{slug:`bob-the-robber`,title:`Bob the Robber`,category:`Puzzle`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/76-fix3.html`},{slug:`bob-the-robber-2`,title:`Bob the Robber 2`,category:`Puzzle`,url:`https://cdn.jsdelivr.net/gh/selenite-cc/selenite-old@main/bobtherobber2/index.html`},{slug:`fancy-pants`,title:`Fancy Pants`,category:`Platformer`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/333-fix2.html`},{slug:`fancy-pants-2`,title:`Fancy Pants 2`,category:`Platformer`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/334-fix.html`},{slug:`fancy-pants-3`,title:`Fancy Pants 3`,category:`Platformer`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/335-fix.html`},{slug:`vex-3`,title:`Vex 3`,category:`Platformer`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/47-fix2.html`},{slug:`vex-4`,title:`Vex 4`,category:`Platformer`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/49-fix2.html`},{slug:`vex-5`,title:`Vex 5`,category:`Platformer`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/50-fix2.html`},{slug:`vex-6`,title:`Vex 6`,category:`Platformer`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/51-fix2.html`},{slug:`vex-7`,title:`Vex 7`,category:`Platformer`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/52-fix2.html`},{slug:`vex-8`,title:`Vex 8`,category:`Platformer`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/53-fix2.html`},{slug:`johnny-upgrade`,title:`Johnny Upgrade`,category:`Platformer`,url:`https://cdn.jsdelivr.net/gh/ahrdevelopers/johnnyupgrade@main/index.html`},{slug:`super-mario-63`,title:`Super Mario 63`,category:`Platformer`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/314-fix2.html`},{slug:`super-mario-flash`,title:`Super Mario Flash`,category:`Platformer`,url:`https://cdn.jsdelivr.net/gh/ahrdevelopers/super-mario-flash@main/index.html`},{slug:`sonic-flash`,title:`Sonic Flash`,category:`Platformer`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/590-fix3.html`},{slug:`papas-pizzeria`,title:`Papa's Pizzeria`,category:`Simulation`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/227-fix.html`},{slug:`papas-freezeria`,title:`Papa's Freezeria`,category:`Simulation`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/223-fix.html`},{slug:`papas-burgeria`,title:`Papa's Burgeria`,category:`Simulation`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/219-fix2.html`},{slug:`papas-taco-mia`,title:`Papa's Taco Mia`,category:`Simulation`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/230-fix2.html`},{slug:`papas-sushiria`,title:`Papa's Sushiria`,category:`Simulation`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/229-fix2.html`},{slug:`papas-pancakeria`,title:`Papa's Pancakeria`,category:`Simulation`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/225-fix2.html`},{slug:`papas-wingeria`,title:`Papa's Wingeria`,category:`Simulation`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/231-fix2.html`},{slug:`papas-hot-doggeria`,title:`Papa's Hot Doggeria`,category:`Simulation`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/224-fix2.html`},{slug:`papas-cupcakeria`,title:`Papa's Cupcakeria`,category:`Simulation`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/221-fix2.html`},{slug:`papas-pastaria`,title:`Papa's Pastaria`,category:`Simulation`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/226-fix2.html`},{slug:`papas-donuteria`,title:`Papa's Donuteria`,category:`Simulation`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/222-fix.html`},{slug:`papas-cheeseria`,title:`Papa's Cheeseria`,category:`Simulation`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/220-fix2.html`},{slug:`papas-bakeria`,title:`Papa's Bakeria`,category:`Simulation`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/218-fix.html`},{slug:`papas-scooperia`,title:`Papa's Scooperia`,category:`Simulation`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/228-fix2.html`},{slug:`dogeminer`,title:`DogeMiner`,category:`Simulation`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/511-fix.html`},{slug:`dogeminer-2`,title:`DogeMiner 2`,category:`Simulation`,url:`https://cdn.jsdelivr.net/gh/ahrdevelopers/dogeminer-2@main/index.html`},{slug:`cookie-clicker`,title:`Cookie Clicker`,category:`Simulation`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/82-a.html`},{slug:`idle-breakout`,title:`Idle Breakout`,category:`Simulation`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/362-fix.html`},{slug:`tiny-fishing`,title:`Tiny Fishing`,category:`Arcade`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/108-fix2.html`},{slug:`monkey-mart`,title:`Monkey Mart`,category:`Simulation`,url:`https://cdn.jsdelivr.net/gh/ahrdevelopers/monkey-mart@main/index.html`},{slug:`duck-life`,title:`Duck Life`,category:`Simulation`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/234-fix2.html`},{slug:`duck-life-2`,title:`Duck Life 2`,category:`Simulation`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/235-fix2.html`},{slug:`duck-life-3`,title:`Duck Life 3`,category:`Simulation`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/236-fix2.html`},{slug:`duck-life-4`,title:`Duck Life 4`,category:`Simulation`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/237-fix2.html`},{slug:`duck-life-treasure-hunt`,title:`Duck Life: Treasure Hunt`,category:`Simulation`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/238-fix.html`},{slug:`learn-to-fly`,title:`Learn to Fly`,category:`Arcade`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/340-fix.html`},{slug:`learn-to-fly-2`,title:`Learn to Fly 2`,category:`Arcade`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/341-fix2.html`},{slug:`learn-to-fly-3`,title:`Learn to Fly 3`,category:`Arcade`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/342-fix.html`},{slug:`learn-to-fly-idle`,title:`Learn to Fly Idle`,category:`Arcade`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/343-fix.html`},{slug:`riddle-school`,title:`Riddle School`,category:`Puzzle`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/287-fix2.html`},{slug:`riddle-school-2`,title:`Riddle School 2`,category:`Puzzle`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/288-fix2.html`},{slug:`riddle-school-3`,title:`Riddle School 3`,category:`Puzzle`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/289-fix2.html`},{slug:`riddle-school-4`,title:`Riddle School 4`,category:`Puzzle`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/290-fix2.html`},{slug:`riddle-school-5`,title:`Riddle School 5`,category:`Puzzle`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/291-fix2.html`},{slug:`riddle-transfer`,title:`Riddle Transfer`,category:`Puzzle`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/292-fix2.html`},{slug:`riddle-transfer-2`,title:`Riddle Transfer 2`,category:`Puzzle`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/293-fix2.html`},{slug:`henry-stickmin-breaking-the-bank`,title:`Breaking the Bank`,category:`Story`,url:`https://cdn.jsdelivr.net/gh/selenite-cc/selenite-old@main/breakingthebank/index.html`},{slug:`henry-stickmin-escaping-the-prison`,title:`Escaping the Prison`,category:`Story`,url:`https://cdn.jsdelivr.net/gh/selenite-cc/selenite-old@main/escapingtheprison/index.html`},{slug:`henry-stickmin-stealing-the-diamond`,title:`Stealing the Diamond`,category:`Story`,url:`https://cdn.jsdelivr.net/gh/selenite-cc/selenite-old@main/stealingthediamond/index.html`},{slug:`henry-stickmin-infiltrating-the-airship`,title:`Infiltrating the Airship`,category:`Story`,url:`https://cdn.jsdelivr.net/gh/selenite-cc/selenite-old@main/infiltratingtheairship/index.html`},{slug:`henry-stickmin-fleeing-the-complex`,title:`Fleeing the Complex`,category:`Story`,url:`https://cdn.jsdelivr.net/gh/selenite-cc/selenite-old@main/fleeingthecomplex/index.html`},{slug:`2048`,title:`2048`,category:`Puzzle`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/114-fix2.html`},{slug:`tetris`,title:`Tetris`,category:`Puzzle`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/733-fix2.html`},{slug:`minesweeper`,title:`Minesweeper`,category:`Puzzle`,url:`https://cdn.jsdelivr.net/gh/selenite-cc/selenite-old@main/minesweeper/index.html`},{slug:`solitaire`,title:`Solitaire`,category:`Puzzle`,url:`https://cdn.jsdelivr.net/gh/selenite-cc/selenite-old@main/solitaire/index.html`},{slug:`basketball-stars`,title:`Basketball Stars`,category:`Sports`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/272-ff.html`},{slug:`basketball-legends`,title:`Basketball Legends`,category:`Sports`,url:`https://cdn.jsdelivr.net/gh/ubg98/BasketballLegends2020@gh-pages/index.html`},{slug:`basket-random`,title:`Basket Random`,category:`Sports`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/66-fix2.html`},{slug:`soccer-random`,title:`Soccer Random`,category:`Sports`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/739-fix2.html`},{slug:`volley-random`,title:`Volley Random`,category:`Sports`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/786-fix2.html`},{slug:`boxing-random`,title:`Boxing Random`,category:`Sports`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/77-fix2.html`},{slug:`football-legends`,title:`Football Legends`,category:`Sports`,url:`https://cdn.jsdelivr.net/gh/ubg98/FootballLegends@gh-pages/index.html`},{slug:`moto-x3m-bike-race`,title:`Moto X3M Bike Race`,category:`Racing`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/96-fix.html`},{slug:`bowmasters`,title:`Bowmasters`,category:`Action`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/0-fix2.html`},{slug:`archery-world-tour`,title:`Archery World Tour`,category:`Sports`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/148-fix2.html`}],fe=[/googlesyndication\.com/i,/doubleclick\.net/i,/googleadservices\.com/i,/imasdk\.googleapis\.com/i,/googletagmanager\.com/i,/google-analytics\.com/i,/adinplay\.com/i,/gamemonetize\.com/i,/gamedistribution\.com/i,/sdk\.poki\.com/i,/poki\.com\/.*sdk/i,/crazygames\.com/i,/cpmstar\.com/i,/adnxs\.com/i,/criteo\.(com|net)/i,/pubmatic\.com/i,/taboola\.com/i,/outbrain\.com/i,/adservice\.google/i,/Jump_Gamemonetize\.js/i,/(?:^|\/)js\/all\.js(?:[?#]|$)/i],pe=[/window\.dataLayer\s*=/i,/googletagmanager\.com\/gtag/i,/adsbygoogle\s*=\s*window\.adsbygoogle/i,/googlesyndication/i,/gamemonetize\.com/i,/gamedistribution\.com/i,/google_vignette/i],me=`<style data-adblock="true">
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
<\/script>`,he=[{id:`midnight-oled`,name:`Midnight OLED`,category:`Dark & Neon`,bgPrimary:`#05070b`,bgSecondary:`#0b0f17`,bgCard:`#121824`,textPrimary:`#f1f5f9`,textMuted:`#8a9bb0`,accent:`#34d399`,border:`#1f2937`},{id:`cyber-neon-green`,name:`Cyber Neon Green`,category:`Dark & Neon`,bgPrimary:`#060c09`,bgSecondary:`#0a140f`,bgCard:`#101f17`,textPrimary:`#ecfdf5`,textMuted:`#78b392`,accent:`#00ff88`,border:`#1c3b2a`},{id:`dracula-purple`,name:`Dracula Purple`,category:`Dark & Neon`,bgPrimary:`#191a24`,bgSecondary:`#21222c`,bgCard:`#282a36`,textPrimary:`#f8f8f2`,textMuted:`#9aa2c4`,accent:`#bd93f9`,border:`#3e4157`},{id:`synthwave-sunset`,name:`Synthwave Sunset`,category:`Dark & Neon`,bgPrimary:`#160b24`,bgSecondary:`#1f1033`,bgCard:`#291542`,textPrimary:`#fdf2f8`,textMuted:`#c084fc`,accent:`#ff4ecd`,border:`#47216b`},{id:`crimson-red`,name:`Crimson Red`,category:`Dark & Neon`,bgPrimary:`#12080a`,bgSecondary:`#1b0c10`,bgCard:`#261116`,textPrimary:`#fef2f2`,textMuted:`#c4868e`,accent:`#f43f5e`,border:`#421c24`},{id:`electric-cobalt`,name:`Electric Cobalt`,category:`Dark & Neon`,bgPrimary:`#070d1b`,bgSecondary:`#0c152b`,bgCard:`#121f3d`,textPrimary:`#eff6ff`,textMuted:`#89a7d6`,accent:`#3b82f6`,border:`#1e3666`},{id:`emerald-matrix`,name:`Emerald Matrix`,category:`Dark & Neon`,bgPrimary:`#040e08`,bgSecondary:`#08170e`,bgCard:`#0d2215`,textPrimary:`#dcfce7`,textMuted:`#6da882`,accent:`#22c55e`,border:`#173d25`},{id:`amber-terminal`,name:`Amber Terminal`,category:`Dark & Neon`,bgPrimary:`#100c05`,bgSecondary:`#181208`,bgCard:`#221a0b`,textPrimary:`#fef3c7`,textMuted:`#b89456`,accent:`#f59e0b`,border:`#3d2e14`},{id:`neon-coral`,name:`Neon Coral`,category:`Dark & Neon`,bgPrimary:`#0b0608`,bgSecondary:`#080406`,bgCard:`#150c10`,textPrimary:`#fdf2f4`,textMuted:`#a68b94`,accent:`#ff5c7c`,border:`#2d1921`},{id:`hyper-cyan`,name:`Hyper Cyan`,category:`Dark & Neon`,bgPrimary:`#040d12`,bgSecondary:`#07151d`,bgCard:`#0c202c`,textPrimary:`#ecfeff`,textMuted:`#72a8b8`,accent:`#06b6d4`,border:`#153a4d`},{id:`plasma-magenta`,name:`Plasma Magenta`,category:`Dark & Neon`,bgPrimary:`#120514`,bgSecondary:`#1a081e`,bgCard:`#260d2c`,textPrimary:`#fdf4ff`,textMuted:`#b982c7`,accent:`#e879f9`,border:`#44184f`},{id:`obsidian-gold`,name:`Obsidian Gold`,category:`Dark & Neon`,bgPrimary:`#09090b`,bgSecondary:`#111114`,bgCard:`#19191f`,textPrimary:`#fafafa`,textMuted:`#9f9fa8`,accent:`#facc15`,border:`#2b2b35`},{id:`laser-lime`,name:`Laser Lime`,category:`Dark & Neon`,bgPrimary:`#090d04`,bgSecondary:`#0f1607`,bgCard:`#17220b`,textPrimary:`#f7fee7`,textMuted:`#8ca868`,accent:`#a3e635`,border:`#2c4014`},{id:`velvet-indigo`,name:`Velvet Indigo`,category:`Dark & Neon`,bgPrimary:`#0b0a1a`,bgSecondary:`#121029`,bgCard:`#1a1738`,textPrimary:`#eef2ff`,textMuted:`#8b8fc9`,accent:`#818cf8`,border:`#2d285e`},{id:`volcanic-ember`,name:`Volcanic Ember`,category:`Dark & Neon`,bgPrimary:`#130806`,bgSecondary:`#1c0c09`,bgCard:`#28120e`,textPrimary:`#fff7ed`,textMuted:`#bf8c7c`,accent:`#fb923c`,border:`#472019`},{id:`vaporwave-grid`,name:`Vaporwave Grid`,category:`Dark & Neon`,bgPrimary:`#100921`,bgSecondary:`#170d30`,bgCard:`#211442`,textPrimary:`#f5f3ff`,textMuted:`#9e88d4`,accent:`#22d3ee`,border:`#37236b`},{id:`euler-ruby`,name:`Arcade Ruby`,category:`Dark & Neon`,bgPrimary:`#14060b`,bgSecondary:`#1d0910`,bgCard:`#290e17`,textPrimary:`#fff1f2`,textMuted:`#c28090`,accent:`#fb7185`,border:`#471828`},{id:`ultraviolet-core`,name:`Ultraviolet Core`,category:`Dark & Neon`,bgPrimary:`#0e071a`,bgSecondary:`#150b26`,bgCard:`#1f1038`,textPrimary:`#f5f3ff`,textMuted:`#9b82cc`,accent:`#a855f7`,border:`#361c61`},{id:`arctic-neon`,name:`Arctic Neon`,category:`Dark & Neon`,bgPrimary:`#050e17`,bgSecondary:`#091624`,bgCard:`#0e2236`,textPrimary:`#f0f9ff`,textMuted:`#78a0c2`,accent:`#38bdf8`,border:`#193b5c`},{id:`phosphor-teal`,name:`Phosphor Teal`,category:`Dark & Neon`,bgPrimary:`#04100f`,bgSecondary:`#071a18`,bgCard:`#0c2624`,textPrimary:`#f0fdfa`,textMuted:`#6fa8a2`,accent:`#2dd4bf`,border:`#15423e`},{id:`solar-flare`,name:`Solar Flare`,category:`Dark & Neon`,bgPrimary:`#140b04`,bgSecondary:`#1e1006`,bgCard:`#2b1809`,textPrimary:`#fffbeb`,textMuted:`#bd9268`,accent:`#fbbf24`,border:`#4a2a10`},{id:`outrun-sky`,name:`Outrun Sky`,category:`Dark & Neon`,bgPrimary:`#0c081c`,bgSecondary:`#130c2b`,bgCard:`#1c123d`,textPrimary:`#fdf4ff`,textMuted:`#9e88c9`,accent:`#f472b6`,border:`#312066`},{id:`toxic-acid`,name:`Toxic Acid`,category:`Dark & Neon`,bgPrimary:`#080e06`,bgSecondary:`#0d170a`,bgCard:`#142410`,textPrimary:`#ecfccb`,textMuted:`#80a86e`,accent:`#84cc16`,border:`#25421d`},{id:`monokai-night`,name:`Monokai Night`,category:`Dark & Neon`,bgPrimary:`#171814`,bgSecondary:`#20211b`,bgCard:`#2a2b24`,textPrimary:`#f8f8f2`,textMuted:`#a2a392`,accent:`#a6e22e`,border:`#414338`},{id:`gruvbox-dark`,name:`Gruvbox Dark`,category:`Dark & Neon`,bgPrimary:`#1d2021`,bgSecondary:`#282828`,bgCard:`#32302f`,textPrimary:`#ebdbb2`,textMuted:`#a89984`,accent:`#fe8019`,border:`#504945`},{id:`ayu-mirage`,name:`Ayu Mirage`,category:`Dark & Neon`,bgPrimary:`#171c26`,bgSecondary:`#1f2430`,bgCard:`#272e3d`,textPrimary:`#cbccc6`,textMuted:`#8a94a6`,accent:`#ffcc66`,border:`#394359`},{id:`ayu-dark`,name:`Ayu Dark`,category:`Dark & Neon`,bgPrimary:`#0a0e14`,bgSecondary:`#10151e`,bgCard:`#171e2b`,textPrimary:`#bfbdb6`,textMuted:`#7f8999`,accent:`#ffb454`,border:`#253042`},{id:`onedark-pro`,name:`One Dark Pro`,category:`Dark & Neon`,bgPrimary:`#181a1f`,bgSecondary:`#21252b`,bgCard:`#282c34`,textPrimary:`#abb2bf`,textMuted:`#828997`,accent:`#61afef`,border:`#3b404d`},{id:`github-dark`,name:`GitHub Dimmed`,category:`Dark & Neon`,bgPrimary:`#0d1117`,bgSecondary:`#161b22`,bgCard:`#1c2128`,textPrimary:`#e6edf3`,textMuted:`#8b949e`,accent:`#58a6ff`,border:`#30363d`},{id:`night-owl`,name:`Night Owl`,category:`Dark & Neon`,bgPrimary:`#011627`,bgSecondary:`#051d33`,bgCard:`#0b2942`,textPrimary:`#d6deeb`,textMuted:`#7e97b8`,accent:`#82aaff`,border:`#1d3b53`},{id:`shades-purple`,name:`Shades of Purple`,category:`Dark & Neon`,bgPrimary:`#1a1830`,bgSecondary:`#221f3d`,bgCard:`#2d2b55`,textPrimary:`#ffffff`,textMuted:`#a599e9`,accent:`#fad000`,border:`#433f75`},{id:`cobalt-two`,name:`Cobalt Classic`,category:`Dark & Neon`,bgPrimary:`#0d2238`,bgSecondary:`#132d4a`,bgCard:`#193549`,textPrimary:`#ffffff`,textMuted:`#8fb4d4`,accent:`#ffc600`,border:`#274d69`},{id:`horizon-dark`,name:`Horizon Dusk`,category:`Dark & Neon`,bgPrimary:`#16161c`,bgSecondary:`#1c1e26`,bgCard:`#232530`,textPrimary:`#d5d8da`,textMuted:`#8f93a2`,accent:`#e95678`,border:`#343847`},{id:`kanagawa-wave`,name:`Kanagawa Wave`,category:`Dark & Neon`,bgPrimary:`#16161d`,bgSecondary:`#1f1f28`,bgCard:`#2a2a37`,textPrimary:`#dcd7ba`,textMuted:`#98937c`,accent:`#7e9cd8`,border:`#3d3d4f`},{id:`kanagawa-dragon`,name:`Kanagawa Dragon`,category:`Dark & Neon`,bgPrimary:`#12120f`,bgSecondary:`#181616`,bgCard:`#22201e`,textPrimary:`#c5c9c5`,textMuted:`#8a8980`,accent:`#c4746e`,border:`#383430`},{id:`everforest-dark`,name:`Everforest Dark`,category:`Dark & Neon`,bgPrimary:`#232a2e`,bgSecondary:`#2d353b`,bgCard:`#343f44`,textPrimary:`#d3c6aa`,textMuted:`#9da9a0`,accent:`#a7c080`,border:`#475258`},{id:`material-ocean`,name:`Material Ocean`,category:`Dark & Neon`,bgPrimary:`#090b10`,bgSecondary:`#0f111a`,bgCard:`#181b28`,textPrimary:`#eeffff`,textMuted:`#848bb0`,accent:`#82aaff`,border:`#292d42`},{id:`laser-berry`,name:`Laser Berry`,category:`Dark & Neon`,bgPrimary:`#140610`,bgSecondary:`#1e0918`,bgCard:`#290d21`,textPrimary:`#fdf2f8`,textMuted:`#bd80aa`,accent:`#f43f8e`,border:`#47183a`},{id:`quantum-blue`,name:`Quantum Blue`,category:`Dark & Neon`,bgPrimary:`#050914`,bgSecondary:`#091024`,bgCard:`#0e1936`,textPrimary:`#e0f2fe`,textMuted:`#7898c4`,accent:`#60a5fa`,border:`#192b59`},{id:`carbon-copper`,name:`Carbon Copper`,category:`Dark & Neon`,bgPrimary:`#120d0a`,bgSecondary:`#1a130f`,bgCard:`#241b15`,textPrimary:`#faf5f0`,textMuted:`#b09686`,accent:`#e07a3f`,border:`#3d2e24`},{id:`titanium-slate`,name:`Titanium Slate`,category:`Dark & Neon`,bgPrimary:`#0f1115`,bgSecondary:`#171a21`,bgCard:`#20242e`,textPrimary:`#f1f5f9`,textMuted:`#94a3b8`,accent:`#38bdf8`,border:`#313746`},{id:`midnight-orchid`,name:`Midnight Orchid`,category:`Dark & Neon`,bgPrimary:`#120a17`,bgSecondary:`#1b0f24`,bgCard:`#261633`,textPrimary:`#fae8ff`,textMuted:`#ae89c4`,accent:`#d946ef`,border:`#422657`},{id:`catppuccin-mocha`,name:`Catppuccin Mocha`,category:`Cozy & Pastel`,bgPrimary:`#1e1e2e`,bgSecondary:`#181825`,bgCard:`#28283d`,textPrimary:`#cdd6f4`,textMuted:`#9399b2`,accent:`#cba6f7`,border:`#3b3b58`},{id:`nord-frost`,name:`Nord Frost`,category:`Cozy & Pastel`,bgPrimary:`#242933`,bgSecondary:`#2e3440`,bgCard:`#3b4252`,textPrimary:`#eceff4`,textMuted:`#a6b3c7`,accent:`#88c0d0`,border:`#4c566a`},{id:`tokyo-night`,name:`Tokyo Night`,category:`Cozy & Pastel`,bgPrimary:`#16161e`,bgSecondary:`#1a1b26`,bgCard:`#24283b`,textPrimary:`#c0caf5`,textMuted:`#7882ad`,accent:`#7aa2f7`,border:`#343b58`},{id:`lavender-dusk`,name:`Lavender Dusk`,category:`Cozy & Pastel`,bgPrimary:`#1b1826`,bgSecondary:`#231f31`,bgCard:`#2d2840`,textPrimary:`#f3efff`,textMuted:`#a79cc9`,accent:`#a78bfa`,border:`#443d5e`},{id:`matcha-latte`,name:`Matcha Latte`,category:`Cozy & Pastel`,bgPrimary:`#f2f5eb`,bgSecondary:`#e7ecdc`,bgCard:`#fbfcf7`,textPrimary:`#1f2d1b`,textMuted:`#586e51`,accent:`#5b8c51`,border:`#cfd8be`,isLight:!0},{id:`peach-blossom`,name:`Peach Blossom`,category:`Cozy & Pastel`,bgPrimary:`#fcf2ed`,bgSecondary:`#f6e4db`,bgCard:`#fffaf7`,textPrimary:`#361f18`,textMuted:`#825d52`,accent:`#e07a5f`,border:`#e8cbc0`,isLight:!0},{id:`rose-pine`,name:`Rose Pine`,category:`Cozy & Pastel`,bgPrimary:`#191724`,bgSecondary:`#1f1d2e`,bgCard:`#26233a`,textPrimary:`#e0def4`,textMuted:`#908caa`,accent:`#ebbcba`,border:`#403d52`},{id:`mint-breeze`,name:`Mint Breeze`,category:`Cozy & Pastel`,bgPrimary:`#ebf7f3`,bgSecondary:`#dcf0e9`,bgCard:`#f7fcfa`,textPrimary:`#102a23`,textMuted:`#477064`,accent:`#14b8a6`,border:`#bfe2d6`,isLight:!0},{id:`catppuccin-macchiato`,name:`Catppuccin Macchiato`,category:`Cozy & Pastel`,bgPrimary:`#24273a`,bgSecondary:`#1e2030`,bgCard:`#363a4f`,textPrimary:`#cad3f5`,textMuted:`#939ab7`,accent:`#f5bde6`,border:`#494d64`},{id:`catppuccin-frappe`,name:`Catppuccin Frappe`,category:`Cozy & Pastel`,bgPrimary:`#303446`,bgSecondary:`#292c3c`,bgCard:`#414559`,textPrimary:`#c6d0f5`,textMuted:`#949cbb`,accent:`#ca9ee6`,border:`#51576d`},{id:`catppuccin-latte`,name:`Catppuccin Latte`,category:`Cozy & Pastel`,bgPrimary:`#eff1f5`,bgSecondary:`#e6e9ef`,bgCard:`#ffffff`,textPrimary:`#4c4f69`,textMuted:`#6c6f85`,accent:`#8839ef`,border:`#ccd0da`,isLight:!0},{id:`rose-pine-moon`,name:`Rose Pine Moon`,category:`Cozy & Pastel`,bgPrimary:`#232136`,bgSecondary:`#2a273f`,bgCard:`#393552`,textPrimary:`#e0def4`,textMuted:`#908caa`,accent:`#ea9a97`,border:`#44415a`},{id:`rose-pine-dawn`,name:`Rose Pine Dawn`,category:`Cozy & Pastel`,bgPrimary:`#faf4ed`,bgSecondary:`#f2e9e1`,bgCard:`#fffaf3`,textPrimary:`#575279`,textMuted:`#797593`,accent:`#d7827e`,border:`#dfdad9`,isLight:!0},{id:`sakura-petal`,name:`Sakura Petal`,category:`Cozy & Pastel`,bgPrimary:`#fdf2f6`,bgSecondary:`#fae5ee`,bgCard:`#ffffff`,textPrimary:`#3b1526`,textMuted:`#7a4b60`,accent:`#ec4899`,border:`#f3cadc`,isLight:!0},{id:`warm-cocoa`,name:`Warm Cocoa`,category:`Cozy & Pastel`,bgPrimary:`#231915`,bgSecondary:`#2c201b`,bgCard:`#382923`,textPrimary:`#f7ece6`,textMuted:`#b59c91`,accent:`#e3a078`,border:`#4f3b33`},{id:`honey-oat`,name:`Honey Oat`,category:`Cozy & Pastel`,bgPrimary:`#fbf7eb`,bgSecondary:`#f3ebd4`,bgCard:`#fffdf7`,textPrimary:`#362b12`,textMuted:`#73613c`,accent:`#d97706`,border:`#e5d8b8`,isLight:!0},{id:`sage-garden`,name:`Sage Garden`,category:`Cozy & Pastel`,bgPrimary:`#1a211c`,bgSecondary:`#222b25`,bgCard:`#2c3830`,textPrimary:`#ecf2ed`,textMuted:`#95ab9b`,accent:`#86efac`,border:`#3e4f43`},{id:`lilac-mist`,name:`Lilac Mist`,category:`Cozy & Pastel`,bgPrimary:`#f5f2fc`,bgSecondary:`#ebe5fa`,bgCard:`#ffffff`,textPrimary:`#271c45`,textMuted:`#63548a`,accent:`#7c3aed`,border:`#d6cbf2`,isLight:!0},{id:`sky-cloud`,name:`Sky Cloud`,category:`Cozy & Pastel`,bgPrimary:`#f0f7fd`,bgSecondary:`#e1effa`,bgCard:`#ffffff`,textPrimary:`#112a42`,textMuted:`#4e6f8f`,accent:`#0ea5e9`,border:`#c7dff2`,isLight:!0},{id:`chai-latte`,name:`Chai Latte`,category:`Cozy & Pastel`,bgPrimary:`#f5efe6`,bgSecondary:`#ebe0d1`,bgCard:`#fcf9f5`,textPrimary:`#332518`,textMuted:`#735e4a`,accent:`#b45309`,border:`#d9cab6`,isLight:!0},{id:`plum-velvet`,name:`Plum Velvet`,category:`Cozy & Pastel`,bgPrimary:`#211524`,bgSecondary:`#2b1b2f`,bgCard:`#38243d`,textPrimary:`#faeffc`,textMuted:`#b594bd`,accent:`#e8a8df`,border:`#503457`},{id:`periwinkle-haze`,name:`Periwinkle Haze`,category:`Cozy & Pastel`,bgPrimary:`#eef1fc`,bgSecondary:`#e0e6f7`,bgCard:`#ffffff`,textPrimary:`#1a2347`,textMuted:`#535f8a`,accent:`#4f46e5`,border:`#c9d2ed`,isLight:!0},{id:`soft-terracotta`,name:`Soft Terracotta`,category:`Cozy & Pastel`,bgPrimary:`#261816`,bgSecondary:`#301f1c`,bgCard:`#3d2824`,textPrimary:`#fbeee9`,textMuted:`#bd9a91`,accent:`#f29f85`,border:`#573a34`},{id:`buttercream-cream`,name:`Buttercream Silk`,category:`Cozy & Pastel`,bgPrimary:`#fcf9ec`,bgSecondary:`#f5efcf`,bgCard:`#ffffff`,textPrimary:`#362e10`,textMuted:`#756839`,accent:`#ca8a04`,border:`#e5dcaf`,isLight:!0},{id:`seafoam-cove`,name:`Seafoam Cove`,category:`Cozy & Pastel`,bgPrimary:`#142224`,bgSecondary:`#1a2c2e`,bgCard:`#223a3d`,textPrimary:`#eaf7f8`,textMuted:`#8db3b6`,accent:`#6ee7b7`,border:`#325256`},{id:`pistachio-frost`,name:`Pistachio Frost`,category:`Cozy & Pastel`,bgPrimary:`#eff7ec`,bgSecondary:`#e0eedb`,bgCard:`#fafdf9`,textPrimary:`#1a2e16`,textMuted:`#4e6e48`,accent:`#4d7c0f`,border:`#c4dbb9`,isLight:!0},{id:`blush-linen`,name:`Blush Linen`,category:`Cozy & Pastel`,bgPrimary:`#faf0f0`,bgSecondary:`#f2e1e1`,bgCard:`#ffffff`,textPrimary:`#381a1b`,textMuted:`#7d5253`,accent:`#e11d48`,border:`#e3c8c8`,isLight:!0},{id:`mocha-espresso`,name:`Mocha Espresso`,category:`Cozy & Pastel`,bgPrimary:`#1c1614`,bgSecondary:`#241c19`,bgCard:`#302521`,textPrimary:`#f2eae6`,textMuted:`#a8968f`,accent:`#d6a481`,border:`#473731`},{id:`twilight-fig`,name:`Twilight Fig`,category:`Cozy & Pastel`,bgPrimary:`#1c1421`,bgSecondary:`#251a2b`,bgCard:`#312338`,textPrimary:`#f5edf9`,textMuted:`#a891b5`,accent:`#d49ce8`,border:`#4a3554`},{id:`misty-fjord`,name:`Misty Fjord`,category:`Cozy & Pastel`,bgPrimary:`#1c242b`,bgSecondary:`#232e36`,bgCard:`#2d3b45`,textPrimary:`#edf2f7`,textMuted:`#98aab8`,accent:`#7dd3fc`,border:`#415463`},{id:`apricot-sorbet`,name:`Apricot Sorbet`,category:`Cozy & Pastel`,bgPrimary:`#fdf4eb`,bgSecondary:`#fae7d4`,bgCard:`#ffffff`,textPrimary:`#3b210e`,textMuted:`#805739`,accent:`#ea580c`,border:`#ebd0b7`,isLight:!0},{id:`bluebell-meadow`,name:`Bluebell Meadow`,category:`Cozy & Pastel`,bgPrimary:`#edf3fc`,bgSecondary:`#dde7f7`,bgCard:`#ffffff`,textPrimary:`#152545`,textMuted:`#4e638a`,accent:`#2563eb`,border:`#c2d2ed`,isLight:!0},{id:`everforest-light`,name:`Everforest Cream`,category:`Cozy & Pastel`,bgPrimary:`#fdf6e3`,bgSecondary:`#f4f0d9`,bgCard:`#fffbef`,textPrimary:`#3c474d`,textMuted:`#6b777d`,accent:`#6a994e`,border:`#ddd8be`,isLight:!0},{id:`gruvbox-soft`,name:`Gruvbox Cream`,category:`Cozy & Pastel`,bgPrimary:`#fbf1c7`,bgSecondary:`#f2e5bc`,bgCard:`#fff9e0`,textPrimary:`#3c3836`,textMuted:`#665c54`,accent:`#d65d0e`,border:`#d5c4a1`,isLight:!0},{id:`nord-aurora`,name:`Nord Aurora`,category:`Cozy & Pastel`,bgPrimary:`#222630`,bgSecondary:`#2a303d`,bgCard:`#353d4d`,textPrimary:`#eceff4`,textMuted:`#9eabbf`,accent:`#a3be8c`,border:`#475266`},{id:`wisteria-garden`,name:`Wisteria Garden`,category:`Cozy & Pastel`,bgPrimary:`#201b2e`,bgSecondary:`#29223b`,bgCard:`#342c4a`,textPrimary:`#f4f0ff`,textMuted:`#a699c9`,accent:`#c4b5fd`,border:`#4c406b`},{id:`eucalyptus-calm`,name:`Eucalyptus Calm`,category:`Cozy & Pastel`,bgPrimary:`#ebf4f0`,bgSecondary:`#dcebe4`,bgCard:`#f9fcfb`,textPrimary:`#162b22`,textMuted:`#4c6e5f`,accent:`#059669`,border:`#bed8cc`,isLight:!0},{id:`pistachio-mocha`,name:`Pistachio Dusk`,category:`Cozy & Pastel`,bgPrimary:`#19211b`,bgSecondary:`#212b24`,bgCard:`#2b382f`,textPrimary:`#ecf5ee`,textMuted:`#94ad9b`,accent:`#bef264`,border:`#3e5244`},{id:`coral-cream`,name:`Coral Cream`,category:`Cozy & Pastel`,bgPrimary:`#fff2f4`,bgSecondary:`#fde2e8`,bgCard:`#ffffff`,textPrimary:`#38101a`,textMuted:`#7d4754`,accent:`#f43f5e`,border:`#f5c6d0`,isLight:!0},{id:`lavender-fog`,name:`Lavender Fog`,category:`Cozy & Pastel`,bgPrimary:`#201e2b`,bgSecondary:`#282636`,bgCard:`#333045`,textPrimary:`#f1effa`,textMuted:`#a29cc2`,accent:`#b794f4`,border:`#494563`},{id:`vanilla-sky`,name:`Vanilla Sky`,category:`Cozy & Pastel`,bgPrimary:`#f6f8fb`,bgSecondary:`#eaeff5`,bgCard:`#ffffff`,textPrimary:`#172336`,textMuted:`#54647d`,accent:`#3b82f6`,border:`#cfd8e6`,isLight:!0},{id:`pure-paper-light`,name:`Pure Paper Light`,category:`High-Contrast & Light`,bgPrimary:`#f8fafc`,bgSecondary:`#ffffff`,bgCard:`#ffffff`,textPrimary:`#0f172a`,textMuted:`#475569`,accent:`#059669`,border:`#cbd5e1`,isLight:!0},{id:`solarized-light`,name:`Solarized Light`,category:`High-Contrast & Light`,bgPrimary:`#fdf6e3`,bgSecondary:`#eee8d5`,bgCard:`#fffdf7`,textPrimary:`#073642`,textMuted:`#586e75`,accent:`#268bd2`,border:`#d8cfb8`,isLight:!0},{id:`solarized-dark`,name:`Solarized Dark`,category:`High-Contrast & Light`,bgPrimary:`#002b36`,bgSecondary:`#073642`,bgCard:`#0c4352`,textPrimary:`#fdf6e3`,textMuted:`#93a1a1`,accent:`#2aa198`,border:`#195463`},{id:`arctic-ice`,name:`Arctic Ice`,category:`High-Contrast & Light`,bgPrimary:`#eef6fc`,bgSecondary:`#e1effa`,bgCard:`#ffffff`,textPrimary:`#0a2540`,textMuted:`#476a8a`,accent:`#0284c7`,border:`#c2dbf0`,isLight:!0},{id:`desert-sand`,name:`Desert Sand`,category:`High-Contrast & Light`,bgPrimary:`#f7f1e3`,bgSecondary:`#ece2cd`,bgCard:`#fcf9f2`,textPrimary:`#2c2214`,textMuted:`#6e5c43`,accent:`#c26d1f`,border:`#d9cbb0`,isLight:!0},{id:`slate-graphite`,name:`Slate Graphite`,category:`High-Contrast & Light`,bgPrimary:`#111318`,bgSecondary:`#191c24`,bgCard:`#222631`,textPrimary:`#f8fafc`,textMuted:`#9ca3af`,accent:`#e2e8f0`,border:`#374151`},{id:`royal-gold`,name:`Royal Gold`,category:`High-Contrast & Light`,bgPrimary:`#0d0b14`,bgSecondary:`#151121`,bgCard:`#1e1930`,textPrimary:`#fefce8`,textMuted:`#a69dc2`,accent:`#eab308`,border:`#3b325c`},{id:`deep-ocean`,name:`Deep Ocean`,category:`High-Contrast & Light`,bgPrimary:`#06101c`,bgSecondary:`#0a1829`,bgCard:`#10233a`,textPrimary:`#f0f9ff`,textMuted:`#7ea6cc`,accent:`#38bdf8`,border:`#1c3b5c`},{id:`swiss-ivory`,name:`Swiss Ivory`,category:`High-Contrast & Light`,bgPrimary:`#fafaf9`,bgSecondary:`#f5f5f4`,bgCard:`#ffffff`,textPrimary:`#1c1917`,textMuted:`#57534e`,accent:`#dc2626`,border:`#d6d3d1`,isLight:!0},{id:`cobalt-paper`,name:`Cobalt Paper`,category:`High-Contrast & Light`,bgPrimary:`#f8fafc`,bgSecondary:`#f1f5f9`,bgCard:`#ffffff`,textPrimary:`#0f172a`,textMuted:`#475569`,accent:`#1d4ed8`,border:`#cbd5e1`,isLight:!0},{id:`stark-monochrome`,name:`Stark Monochrome`,category:`High-Contrast & Light`,bgPrimary:`#000000`,bgSecondary:`#0a0a0a`,bgCard:`#141414`,textPrimary:`#ffffff`,textMuted:`#a3a3a3`,accent:`#ffffff`,border:`#333333`},{id:`ink-white`,name:`Ink & White`,category:`High-Contrast & Light`,bgPrimary:`#ffffff`,bgSecondary:`#f4f4f5`,bgCard:`#ffffff`,textPrimary:`#09090b`,textMuted:`#52525b`,accent:`#18181b`,border:`#d4d4d8`,isLight:!0},{id:`amber-contrast`,name:`Amber Contrast`,category:`High-Contrast & Light`,bgPrimary:`#000000`,bgSecondary:`#0d0b06`,bgCard:`#17130a`,textPrimary:`#fef08a`,textMuted:`#d4b855`,accent:`#facc15`,border:`#423614`},{id:`glacial-silver`,name:`Glacial Silver`,category:`High-Contrast & Light`,bgPrimary:`#f1f5f9`,bgSecondary:`#e2e8f0`,bgCard:`#ffffff`,textPrimary:`#0f172a`,textMuted:`#475569`,accent:`#0f766e`,border:`#cbd5e1`,isLight:!0},{id:`newsprint-press`,name:`Newsprint Press`,category:`High-Contrast & Light`,bgPrimary:`#f4f1ea`,bgSecondary:`#e9e4d9`,bgCard:`#fbf9f5`,textPrimary:`#1a1815`,textMuted:`#595349`,accent:`#b91c1c`,border:`#cfc8ba`,isLight:!0},{id:`oxford-navy`,name:`Oxford Navy`,category:`High-Contrast & Light`,bgPrimary:`#081226`,bgSecondary:`#0d1b38`,bgCard:`#13264d`,textPrimary:`#f8fafc`,textMuted:`#94a8cf`,accent:`#fbbf24`,border:`#253f75`},{id:`blueprint-light`,name:`Blueprint Crisp`,category:`High-Contrast & Light`,bgPrimary:`#eff6ff`,bgSecondary:`#dbeafe`,bgCard:`#ffffff`,textPrimary:`#172554`,textMuted:`#3b528c`,accent:`#1d4ed8`,border:`#bfdbfe`,isLight:!0},{id:`emerald-ledger`,name:`Emerald Ledger`,category:`High-Contrast & Light`,bgPrimary:`#f0fdf4`,bgSecondary:`#dcfce7`,bgCard:`#ffffff`,textPrimary:`#052e16`,textMuted:`#2e6645`,accent:`#15803d`,border:`#bbf7d0`,isLight:!0},{id:`studio-grey`,name:`Studio Grey`,category:`High-Contrast & Light`,bgPrimary:`#f3f4f6`,bgSecondary:`#e5e7eb`,bgCard:`#ffffff`,textPrimary:`#111827`,textMuted:`#4b5563`,accent:`#4f46e5`,border:`#d1d5db`,isLight:!0},{id:`crimson-editorial`,name:`Crimson Editorial`,category:`High-Contrast & Light`,bgPrimary:`#fef2f2`,bgSecondary:`#fee2e2`,bgCard:`#ffffff`,textPrimary:`#450a0a`,textMuted:`#7f3333`,accent:`#dc2626`,border:`#fecaca`,isLight:!0},{id:`obsidian-sharp`,name:`Obsidian Sharp`,category:`High-Contrast & Light`,bgPrimary:`#090b0f`,bgSecondary:`#11151d`,bgCard:`#191f2b`,textPrimary:`#ffffff`,textMuted:`#9aa5ba`,accent:`#22d3ee`,border:`#2d3748`},{id:`github-paper`,name:`GitHub Light`,category:`High-Contrast & Light`,bgPrimary:`#ffffff`,bgSecondary:`#f6f8fa`,bgCard:`#ffffff`,textPrimary:`#1f2328`,textMuted:`#59636e`,accent:`#0969da`,border:`#d0d7de`,isLight:!0},{id:`ayu-daylight`,name:`Ayu Daylight`,category:`High-Contrast & Light`,bgPrimary:`#fafafa`,bgSecondary:`#f0f0f0`,bgCard:`#ffffff`,textPrimary:`#363b42`,textMuted:`#6a727d`,accent:`#f29718`,border:`#dcdcdc`,isLight:!0},{id:`tokyo-daylight`,name:`Tokyo Daylight`,category:`High-Contrast & Light`,bgPrimary:`#e1e2e7`,bgSecondary:`#d5d6db`,bgCard:`#f4f5f8`,textPrimary:`#232842`,textMuted:`#565a73`,accent:`#2e7de9`,border:`#c2c4cf`,isLight:!0},{id:`nord-snow`,name:`Nord Snow`,category:`High-Contrast & Light`,bgPrimary:`#eceff4`,bgSecondary:`#e5e9f0`,bgCard:`#ffffff`,textPrimary:`#2e3440`,textMuted:`#4c566a`,accent:`#5e81ac`,border:`#d8dee9`,isLight:!0},{id:`cobalt-night`,name:`Cobalt Contrast`,category:`High-Contrast & Light`,bgPrimary:`#030b1a`,bgSecondary:`#07142b`,bgCard:`#0c1f40`,textPrimary:`#ffffff`,textMuted:`#93b0e0`,accent:`#60a5fa`,border:`#1d3a6e`},{id:`forest-chalk`,name:`Forest Chalk`,category:`High-Contrast & Light`,bgPrimary:`#081712`,bgSecondary:`#0d241c`,bgCard:`#133328`,textPrimary:`#f0fdf4`,textMuted:`#8ec4ad`,accent:`#34d399`,border:`#215442`},{id:`plum-ink`,name:`Plum Contrast`,category:`High-Contrast & Light`,bgPrimary:`#faf5ff`,bgSecondary:`#f3e8ff`,bgCard:`#ffffff`,textPrimary:`#2e1065`,textMuted:`#5b3994`,accent:`#7e22ce`,border:`#e9d5ff`,isLight:!0},{id:`bronze-parchment`,name:`Bronze Parchment`,category:`High-Contrast & Light`,bgPrimary:`#fefce8`,bgSecondary:`#fef9c3`,bgCard:`#ffffff`,textPrimary:`#422006`,textMuted:`#714b21`,accent:`#a16207`,border:`#fde68a`,isLight:!0},{id:`slate-alpine`,name:`Alpine Slate`,category:`High-Contrast & Light`,bgPrimary:`#f8fafc`,bgSecondary:`#eef2f6`,bgCard:`#ffffff`,textPrimary:`#0f172a`,textMuted:`#475569`,accent:`#e11d48`,border:`#cbd5e1`,isLight:!0},{id:`indigo-slate`,name:`Indigo Sharp`,category:`High-Contrast & Light`,bgPrimary:`#0b0e1c`,bgSecondary:`#11162b`,bgCard:`#19203d`,textPrimary:`#f8fafc`,textMuted:`#9aa7d4`,accent:`#818cf8`,border:`#2c3866`},{id:`turquoise-day`,name:`Turquoise Day`,category:`High-Contrast & Light`,bgPrimary:`#ecfeff`,bgSecondary:`#cffafe`,bgCard:`#ffffff`,textPrimary:`#083344`,textMuted:`#2b6175`,accent:`#0891b2`,border:`#a5f3fc`,isLight:!0},{id:`graphite-amber`,name:`Graphite Amber`,category:`High-Contrast & Light`,bgPrimary:`#141416`,bgSecondary:`#1c1c1f`,bgCard:`#26262b`,textPrimary:`#fafafa`,textMuted:`#a1a1aa`,accent:`#fbbf24`,border:`#3f3f46`},{id:`cherry-chalk`,name:`Cherry Chalk`,category:`High-Contrast & Light`,bgPrimary:`#fff1f2`,bgSecondary:`#ffe4e6`,bgCard:`#ffffff`,textPrimary:`#4c0519`,textMuted:`#882b44`,accent:`#be123c`,border:`#fecdd3`,isLight:!0},{id:`midnight-azure`,name:`Midnight Azure`,category:`High-Contrast & Light`,bgPrimary:`#070f1c`,bgSecondary:`#0c182b`,bgCard:`#132440`,textPrimary:`#f0f9ff`,textMuted:`#8aa8cf`,accent:`#38bdf8`,border:`#213c66`},{id:`chalkboard-classic`,name:`Chalkboard Classic`,category:`High-Contrast & Light`,bgPrimary:`#141e19`,bgSecondary:`#1b2922`,bgCard:`#24362d`,textPrimary:`#f3f7f4`,textMuted:`#9eb8aa`,accent:`#fde047`,border:`#385245`},{id:`marble-stone`,name:`Marble Stone`,category:`High-Contrast & Light`,bgPrimary:`#f5f5f4`,bgSecondary:`#e7e5e4`,bgCard:`#ffffff`,textPrimary:`#1c1917`,textMuted:`#57534e`,accent:`#0d9488`,border:`#d6d3d1`,isLight:!0},{id:`velvet-burgundy`,name:`Velvet Burgundy`,category:`High-Contrast & Light`,bgPrimary:`#1a090e`,bgSecondary:`#260d14`,bgCard:`#33121b`,textPrimary:`#fff1f2`,textMuted:`#c78999`,accent:`#fda4af`,border:`#521e2c`},{id:`polar-day`,name:`Polar Day`,category:`High-Contrast & Light`,bgPrimary:`#f4f9ff`,bgSecondary:`#e5f0ff`,bgCard:`#ffffff`,textPrimary:`#0a1f3d`,textMuted:`#415c82`,accent:`#2563eb`,border:`#c4dbfa`,isLight:!0},{id:`steel-contrast`,name:`Steel Contrast`,category:`High-Contrast & Light`,bgPrimary:`#101418`,bgSecondary:`#181e24`,bgCard:`#222a33`,textPrimary:`#f8fafc`,textMuted:`#9ca8b5`,accent:`#a5f3fc`,border:`#36424f`},{id:`ivory-sage`,name:`Ivory Sage`,category:`High-Contrast & Light`,bgPrimary:`#f7f9f5`,bgSecondary:`#ebf0e6`,bgCard:`#ffffff`,textPrimary:`#1b2618`,textMuted:`#51634c`,accent:`#15803d`,border:`#ccd9c3`,isLight:!0}],ge=`https://cdn.jsdelivr.net/gh/bubbls/UGS-Assets@main`,_e=`adventures.adventure.capitalist.basketball.superstars.minutes.minute.till.dawn.cookie.clicker.subway.surfers.surfer.burrito.bison.stickman.hunters.hunter.ducklife.bitlife.polytrack.snowrider.retro.bowl.doodle.jump.bouncy.motors.smash.karts.drift.boss.paper.hole.block.miner.post.clash.duel.tower.defense.idle.tycoon.space.alien.dash.doom.card.poker.ball.balls.rush.run.date.danger.buckshot.russian.football.soccer.weird.gun.game.tiny.fishing.bad.monday.pizza.tower.geometry.monkey.mart.one.bit.endacopia.quake`.split(`.`).sort((e,t)=>t.length-e.length);function ve(e){let t=e.toLowerCase();if(t.length<7||/[^a-z]/i.test(e))return[e];let n=t.length,r=Array(n+1).fill(null);r[0]=[];for(let e=0;e<n;e++)if(r[e]){for(let n of _e)if(t.startsWith(n,e)){let t=e+n.length,i=[...r[e],n];(!r[t]||i.length<r[t].length)&&(r[t]=i)}}return r[n]&&r[n].length>1?r[n]:[e]}function ye(e){let t=(e||``).trim();if(!t)return`UNTITLED MODULE`;t=t.includes(`/`)?t.split(`/`)[0]:t.replace(/\.html?$/i,``),t=t.replace(/([_-](?:main|master|gh-pages|branch))$/i,``).replace(/[_/]+/g,` `).replace(/-/g,` `).replace(/([a-z])([A-Z])/g,`$1 $2`).replace(/([A-Z]+)([A-Z][a-z])/g,`$1 $2`).replace(/(\d)([a-zA-Z])/g,(e,t,n,r,i)=>{let a=i.slice(r+1);return/^(?:d\b|st\b|nd\b|rd\b|th\b|x\b)/i.test(a)?e:`${t} ${n}`}).replace(/([a-zA-Z])(\d)/g,(e,t,n,r,i)=>{let a=i.slice(Math.max(0,r-1),r+1);return/^v$/i.test(t)||a.length===2&&/\s/.test(a[0])?e:`${t} ${n}`});let n=t.split(/\s+/).filter(Boolean),r=[];for(let e of n)r.push(...ve(e));return r.join(` `).replace(/\s+/g,` `).trim().toUpperCase()}function be(e){return e.split(`/`).map(e=>encodeURIComponent(e)).join(`/`)}function xe(e,t=ge){return`${t.replace(/\/+$/,``)}/${be(e.replace(/^\/+/,``))}`}function Se(e,t=ge){let n=e.replace(/^\/+/,``).split(`/`);return n.length<=1?`${t.replace(/\/+$/,``)}/`:(n.pop(),`${t.replace(/\/+$/,``)}/${be(n.join(`/`))}/`)}var Ce=[{path:`10minutestilldawn/index.html`,cover:`10minutestilldawn/icon.png`},{path:`slope 3/index.html`},{path:`slope 2 player/index.html`},{path:`retro bowl/new.html`},{path:`cookieclicker/index.html`},{path:`drift-hunters/index.html`,cover:`drift-hunters/favicon.ico`},{path:`snow-rider/index.html`},{path:`monkey mart v6.3/index.html`},{path:`stickman hook/index.html`},{path:`BurritoBison-main/index.html`},{path:`doodle jump/index.html`,cover:`doodle jump/favicon.ico`},{path:`big 2048/index.html`,cover:`big 2048/favicon.ico`},{path:`basketball-superstars/index.html`},{path:`bouncy basketball/index.html`},{path:`adventure-capitalist/index.html`,cover:`adventure-capitalist/logo.webp`},{path:`3dash/index.html`,cover:`3dash/logo.png`},{path:`2doom/index.html`},{path:`russian-buckshot/index.html`},{path:`ovomod/index.html`},{path:`ages of conflict/index.html`}];function we(e=ge){return Ce.map(t=>{let n=t.path.split(`/`)[0];return{id:`ugs:${n}`,name:ye(n),folder:n,path:t.path,url:xe(t.path,e),baseUrl:Se(t.path,e),cover:t.cover?xe(t.cover,e):null,featured:!0}}).sort((e,t)=>e.name.localeCompare(t.name))}var Te=`wss://wisp.mercurywork.shop/`,Ee=`https://classroom.google.com`,w=`https://ssl.gstatic.com/classroom/ic_product_classroom_144.png`,T=`VALemStandalone`,De=`VALemStandaloneFrame`,Oe=`popup=yes,width=1280,height=800,left=100,top=100,menubar=no,toolbar=no,location=no,status=no,resizable=yes`;function ke(e){return e?e.key===`Control`&&!e.repeat&&!e.altKey&&!e.shiftKey&&!e.metaKey:!1}function Ae(e,t){try{return new URLSearchParams(String(e||``)).get(`vb`)===`1`&&String(t||``)===`VALemStandaloneFrame`}catch{return!1}}function E(e,t){let n=String(e||``).trim();return n?n===`${String(t||``).replace(/\/+$/,``)}/scram/`||n.endsWith(`/scram/`):!1}function D(){return new URLSearchParams({bg:`#0b0608`,bgSec:`#080406`,surface:`#140a0e`,text:`#fdf2f4`,muted:`#9f878f`,border:`rgba(255,255,255,0.08)`,primary:`#ff5c7c`,light:`0`}).toString()}function je(e){try{let t=new URL(e);return t.searchParams.set(`vb`,`1`),t.toString()}catch{let t=String(e||``).split(`#`)[0];return t?t.includes(`?`)?`${t}&vb=1`:`${t}?vb=1`:`/?vb=1`}}function Me(e,t=Ee){return`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Home - Classroom</title>
  <link rel="icon" type="image/png" href="${w}" />
  <style>
    html, body {
      margin: 0;
      padding: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
      background: #0b0608;
    }
    iframe {
      width: 100vw;
      height: 100vh;
      border: none;
      display: block;
    }
  </style>
</head>
<body>
  <iframe
    name="${De}"
    src="${String(e||`/?vb=1`).replace(/&/g,`&amp;`).replace(/"/g,`&quot;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`)}"
    title="Home - Classroom"
    allow="autoplay; gamepad; fullscreen; clipboard-read; clipboard-write"
    allowfullscreen
  ></iframe>
  <script>
    (function () {
      var panicUrl = ${JSON.stringify(t).replace(/<\//g,`<\\/`)};
      function panicNow() {
        try {
          if (document.documentElement) document.documentElement.style.display = 'none';
        } catch (_e) {}
        try {
          if (window.top && window.top.opener && typeof window.top.close === 'function') {
            window.top.close();
          }
        } catch (_e) {}
        try {
          if (window.top && window.top !== window) {
            window.top.location.replace(panicUrl);
            return;
          }
        } catch (_e) {}
        try {
          window.location.replace(panicUrl);
        } catch (_e) {}
      }
      window.addEventListener('keydown', function (e) {
        if (e && e.key === 'Escape') {
          e.preventDefault();
          panicNow();
        }
      }, true);
      window.addEventListener('message', function (ev) {
        if (ev && ev.data && ev.data.type === 'valbrowse-panic') {
          panicNow();
        }
      });
    })();
  <\/script>
</body>
</html>`}function Ne(e,t,n=Ee){try{e&&(e.fullscreenElement&&typeof e.exitFullscreen==`function`&&e.exitFullscreen().catch(()=>{}),e.title=`Google Classroom`,e.documentElement&&(e.documentElement.style.display=`none`))}catch{}try{t&&t.parent&&t.parent!==t&&t.parent.postMessage({type:`valbrowse-panic`},`*`)}catch{}try{if(t){let e=t.top&&t.top!==t?t.top:t;if(e.opener&&typeof e.close==`function`)try{e.close()}catch{}e.location.replace(n);return}}catch{}try{t&&t.location&&t.location.replace(n)}catch{}}var Pe=`https://cdn.jsdelivr.net/gh/WanoCapy/ChickenKingsVault@main`;function Fe(e){return String(e||``).replace(/^\/+/,``).split(`/`).map(e=>encodeURIComponent(e)).join(`/`)}function Ie(e,t=Pe){return`${t.replace(/\/+$/,``)}/${Fe(e)}`}function Le(e=Pe){return`${e.replace(/\/+$/,``)}/gamefiles/`}function Re(e){let t=String(e||``).trim();return!t||(t=t.replace(/^gamefiles\//i,``).replace(/\.html?$/i,``).replace(/[-_]+/g,` `).replace(/\s+/g,` `).trim(),!t)?`Untitled Module`:t.split(` `).map(e=>e?e.charAt(0).toUpperCase()+e.slice(1):``).join(` `)}var ze=[{path:`gamefiles/2048 Merge Run.html`,cover:`gameimages/2048mergerun.png`},{path:`gamefiles/1v1.LoL.html`,cover:`gameimages/1v1.lol.webp`},{path:`gamefiles/Retro Bowl.html`,cover:`gameimages/retrobowl.png`},{path:`gamefiles/Cookie Clicker.html`,cover:`gameimages/cookieclicker.png`},{path:`gamefiles/Basket Random.html`,cover:`gameimages/basketrandom.png`},{path:`gamefiles/Drift Boss.html`,cover:`gameimages/driftboss.jpg`},{path:`gamefiles/Drift Hunters.html`,cover:`gameimages/drifthunters.png`},{path:`gamefiles/Snow Rider 3D.html`,cover:`gameimages/snowrider3d.webp`},{path:`gamefiles/Stickman Hook.html`,cover:`gameimages/stickmanhook.jfif`},{path:`gamefiles/Monkey Mart.html`,cover:`gameimages/monkeymart.jpg`},{path:`gamefiles/Subway Surfers.html`,cover:`gameimages/subwaysurfers.png`},{path:`gamefiles/Run 3.html`,cover:`gameimages/run3.jpg`},{path:`gamefiles/Moto X3M.html`,cover:`gameimages/motox3m.png`},{path:`gamefiles/Geometry Dash.html`,cover:`gameimages/geometrydash.png`},{path:`gamefiles/Chess Classic.html`,cover:`gameimages/chessclassic.png`},{path:`gamefiles/Drive Mad.html`,cover:`gameimages/drivemad.png`},{path:`gamefiles/Crossy Road.html`,cover:`gameimages/crossyroad.jpg`},{path:`gamefiles/Flappy Bird.html`,cover:`gameimages/flappybird.jpg`},{path:`gamefiles/Doodle Jump.html`,cover:`gameimages/doodlejump.jpg`},{path:`gamefiles/Tetris.html`,cover:`gameimages/tetris.png`}];function Be(e=Pe){let t=Le(e);return ze.map(n=>{let r=n.path.slice(10).replace(/\.html?$/i,``),i=n.cover||`gameimages/${r}.png`;return{id:`ckv:${n.path}`,provider:`ckv`,name:Re(n.path),path:n.path,url:Ie(n.path,e),baseUrl:t,cover:Ie(i,e),featured:!0}}).sort((e,t)=>e.name.localeCompare(t.name))}var Ve=`https://cdn.jsdelivr.net/gh/freebuisness/covers@main`,He=`https://cdn.jsdelivr.net/gh/freebuisness/html@main`,Ue=[`https://cdn.jsdelivr.net/gh/gn-math/gn-math.github.io@main/index.html`,`https://fastly.jsdelivr.net/gh/gn-math/gn-math.github.io@main/index.html`,`https://gcore.jsdelivr.net/gh/gn-math/gn-math.github.io@main/index.html`,`https://raw.githubusercontent.com/gn-math/gn-math.github.io/main/index.html`],We=`https://api.tvmaze.com/shows?page=0`,Ge=`https://api.tvmaze.com/search/shows?q=`,Ke=`https://archive.org/advancedsearch.php?q=collection:(feature_films)+AND+mediatype:(movies)&fl[]=identifier,title,description,year&rows=30&output=json`;function qe(e){return String(e||``).replace(/<\/?(?:b|i|em|strong|span|u)\b[^>]*>/gi,``).replace(/<[^>]+>/g,` `).replace(/&nbsp;/gi,` `).replace(/&amp;/gi,`&`).replace(/&quot;/gi,`"`).replace(/&#39;/gi,`'`).replace(/\s+/g,` `).replace(/\s+([.,!?;:])/g,`$1`).trim()}function Je(e){if(!e||!e.identifier)return null;let t=String(e.identifier).trim(),n=Array.isArray(e.title)?String(e.title[0]||t).trim():String(e.title||t).trim(),r=Array.isArray(e.description)?e.description[0]:e.description,i=Array.isArray(e.year)?e.year[0]:e.year,a=i?String(i).slice(0,4):``,o=`${n} ${String(r||``)}`.toLowerCase(),s=[`Public Domain`],c=[`all`,`public-domain`];return/comedy|keaton|chaplin|laurel|hardy/.test(o)&&(s.push(`Comedy`),c.push(`comedy`)),/sci-fi|space|plan 9|living dead|scientist|superman|monster|alien/.test(o)&&(s.push(`Sci-Fi`),c.push(`sci-fi`)),/action|adventure|western|war|general/.test(o)&&(s.push(`Action`),c.push(`action`)),{id:`archive:${t}`,externalId:t,source:`archive`,title:n,year:a,rating:null,genres:s,categoryTags:Array.from(new Set(c)),summary:qe(r)||`Complete legal public-domain feature film on Internet Archive.`,poster:`https://archive.org/services/img/${encodeURIComponent(t)}`,backdrop:`https://archive.org/services/img/${encodeURIComponent(t)}`,networkOrStudio:`Internet Archive Cinema`,cast:[`Public Domain Feature`],embedUrl:`https://archive.org/embed/${encodeURIComponent(t)}`,watchPageUrl:`https://archive.org/details/${encodeURIComponent(t)}`,isFullMovie:!0}}function Ye(){return[{identifier:`night_of_the_living_dead`,title:`Night of the Living Dead`,year:`1968`,description:`George A. Romero’s landmark sci-fi horror feature following strangers trapped inside a Pennsylvania farmhouse.`},{identifier:`Charade_1963`,title:`Charade`,year:`1963`,description:`Cary Grant and Audrey Hepburn star in Stanley Donen’s acclaimed Parisian mystery thriller.`},{identifier:`The_General_1926`,title:`The General`,year:`1926`,description:`Buster Keaton’s iconic silent action comedy masterpiece centered on a daring locomotive chase.`},{identifier:`House_on_Haunted_Hill_1959`,title:`House on Haunted Hill`,year:`1959`,description:`Vincent Price invites five guests to survive one night in a locked hillside mansion for $10,000.`},{identifier:`GulliversTravels1939`,title:`Gulliver's Travels`,year:`1939`,description:`Fleischer Studios’ full-length Technicolor animated adventure adapting Jonathan Swift’s classic.`},{identifier:`Plan_9_from_Outer_Space_1959`,title:`Plan 9 from Outer Space`,year:`1959`,description:`Cult-classic 1950s retro sci-fi feature involving flying saucers over Southern California.`},{identifier:`HisGirlFriday1940`,title:`His Girl Friday`,year:`1940`,description:`Howard Hawks’ fast-talking screwball comedy starring Cary Grant and Rosalind Russell.`},{identifier:`superman_1941`,title:`Superman: The Mad Scientist`,year:`1941`,description:`Fleischer Studios’ acclaimed 1941 animated sci-fi action theatrical short.`}].map(e=>Je(e)).filter(e=>!!e)}function Xe(){return[{id:`tvmaze:82`,externalId:`82`,source:`tvmaze`,title:`Game of Thrones`,year:`2011`,rating:8.9,genres:[`Drama`,`Adventure`,`Fantasy`],categoryTags:[`all`,`trending`,`action`,`sci-fi`],summary:`Nine noble families fight for control over the mythical lands of Westeros while an ancient enemy returns.`,poster:`https://static.tvmaze.com/uploads/images/medium_portrait/498/1245274.jpg`,backdrop:`https://static.tvmaze.com/uploads/images/original_untouched/498/1245274.jpg`,networkOrStudio:`HBO`,cast:[`Emilia Clarke`,`Kit Harington`,`Peter Dinklage`],embedUrl:``,watchPageUrl:`https://www.tvmaze.com/shows/82/game-of-thrones`,isFullMovie:!1},{id:`tvmaze:169`,externalId:`169`,source:`tvmaze`,title:`Breaking Bad`,year:`2008`,rating:9.2,genres:[`Drama`,`Crime`,`Thriller`],categoryTags:[`all`,`trending`,`action`],summary:`A high school chemistry teacher diagnosed with terminal cancer turns to manufacturing to secure his family’s future.`,poster:`https://static.tvmaze.com/uploads/images/medium_portrait/501/1253519.jpg`,backdrop:`https://static.tvmaze.com/uploads/images/original_untouched/501/1253519.jpg`,networkOrStudio:`AMC`,cast:[`Bryan Cranston`,`Aaron Paul`,`Anna Gunn`],embedUrl:``,watchPageUrl:`https://www.tvmaze.com/shows/169/breaking-bad`,isFullMovie:!1},{id:`tvmaze:216`,externalId:`216`,source:`tvmaze`,title:`Rick and Morty`,year:`2013`,rating:8.8,genres:[`Comedy`,`Adventure`,`Science-Fiction`],categoryTags:[`all`,`trending`,`comedy`,`sci-fi`,`action`],summary:`An eccentric scientist drags his anxious grandson on chaotic interdimensional adventures across the multiverse.`,poster:`https://static.tvmaze.com/uploads/images/medium_portrait/477/1194843.jpg`,backdrop:`https://static.tvmaze.com/uploads/images/original_untouched/477/1194843.jpg`,networkOrStudio:`Adult Swim`,cast:[`Ian Cardoni`,`Harry Belden`,`Chris Parnell`],embedUrl:``,watchPageUrl:`https://www.tvmaze.com/shows/216/rick-and-morty`,isFullMovie:!1},{id:`tvmaze:1505`,externalId:`1505`,source:`tvmaze`,title:`One-Punch Man`,year:`2015`,rating:8.5,genres:[`Action`,`Comedy`,`Anime`],categoryTags:[`all`,`trending`,`action`,`comedy`,`anime`],summary:`Saitama is a hero so overwhelmingly strong he defeats every opponent with a single punch and seeks a worthy rival.`,poster:`https://static.tvmaze.com/uploads/images/medium_portrait/464/1160027.jpg`,backdrop:`https://static.tvmaze.com/uploads/images/original_untouched/464/1160027.jpg`,networkOrStudio:`TV Tokyo`,cast:[`Makoto Furukawa`,`Kaito Ishikawa`],embedUrl:``,watchPageUrl:`https://www.tvmaze.com/shows/1505/one-punch-man`,isFullMovie:!1}]}var Ze=[{id:`lofi`,label:`Lo-Fi Beats`,artist:`Lofi Girl`,url:`https://soundcloud.com/lofi_girl`},{id:`synthwave`,label:`Synthwave`,artist:`NewRetroWave`,url:`https://soundcloud.com/newretrowave`},{id:`vgm`,label:`Video Game OSTs`,artist:`OverClocked ReMix`,url:`https://soundcloud.com/ocremix`},{id:`chillhop`,label:`Chillhop`,artist:`Chillhop Music`,url:`https://soundcloud.com/chillhopdotcom`},{id:`electronic`,label:`Electronic`,artist:`NCS`,url:`https://soundcloud.com/nocopyrightsounds`}],Qe=[{id:`rap-kendrick`,name:`Kendrick Lamar`,handle:`kendrick-lamar-music`,category:`rap`,genreLabel:`Rap`,url:`https://soundcloud.com/kendrick-lamar-music`},{id:`rap-drake`,name:`Drake (OVO)`,handle:`octobersveryown`,category:`rap`,genreLabel:`Rap`,url:`https://soundcloud.com/octobersveryown`},{id:`rap-travis`,name:`Travis Scott`,handle:`travisscott-2`,category:`rap`,genreLabel:`Rap`,url:`https://soundcloud.com/travisscott-2`},{id:`rap-jcole`,name:`J. Cole`,handle:`j-cole`,category:`rap`,genreLabel:`Rap`,url:`https://soundcloud.com/j-cole`},{id:`rap-tyler`,name:`Tyler, The Creator`,handle:`tylerthecreator`,category:`rap`,genreLabel:`Rap`,url:`https://soundcloud.com/tylerthecreator`},{id:`rap-future`,name:`Future`,handle:`futureisnow`,category:`rap`,genreLabel:`Rap`,url:`https://soundcloud.com/futureisnow`},{id:`rap-carti`,name:`Playboi Carti`,handle:`playboicarti`,category:`rap`,genreLabel:`Rap`,url:`https://soundcloud.com/playboicarti`},{id:`rap-metro`,name:`Metro Boomin`,handle:`metroboomin`,category:`rap`,genreLabel:`Rap`,url:`https://soundcloud.com/metroboomin`},{id:`rap-21`,name:`21 Savage`,handle:`21savage`,category:`rap`,genreLabel:`Rap`,url:`https://soundcloud.com/21savage`},{id:`rap-ye`,name:`Kanye West`,handle:`kanyewest`,category:`rap`,genreLabel:`Rap`,url:`https://soundcloud.com/kanyewest`},{id:`pop-weeknd`,name:`The Weeknd`,handle:`theweeknd`,category:`pop`,genreLabel:`Pop`,url:`https://soundcloud.com/theweeknd`},{id:`pop-taylor`,name:`Taylor Swift`,handle:`taylorswiftofficial`,category:`pop`,genreLabel:`Pop`,url:`https://soundcloud.com/taylorswiftofficial`},{id:`pop-billie`,name:`Billie Eilish`,handle:`billieeilish`,category:`pop`,genreLabel:`Pop`,url:`https://soundcloud.com/billieeilish`},{id:`pop-ariana`,name:`Ariana Grande`,handle:`arianagrande`,category:`pop`,genreLabel:`Pop`,url:`https://soundcloud.com/arianagrande`},{id:`pop-dualipa`,name:`Dua Lipa`,handle:`dualipa`,category:`pop`,genreLabel:`Pop`,url:`https://soundcloud.com/dualipa`},{id:`pop-bruno`,name:`Bruno Mars`,handle:`brunomars`,category:`pop`,genreLabel:`Pop`,url:`https://soundcloud.com/brunomars`},{id:`pop-olivia`,name:`Olivia Rodrigo`,handle:`oliviarodrigo`,category:`pop`,genreLabel:`Pop`,url:`https://soundcloud.com/oliviarodrigo`},{id:`kpop-bts`,name:`BTS (BANGTAN)`,handle:`bangtan`,category:`kpop`,genreLabel:`K-Pop`,url:`https://soundcloud.com/bangtan`},{id:`kpop-blackpink`,name:`BLACKPINK`,handle:`blackpinkofficial`,category:`kpop`,genreLabel:`K-Pop`,url:`https://soundcloud.com/blackpinkofficial`},{id:`kpop-newjeans`,name:`NewJeans`,handle:`newjeans-music`,category:`kpop`,genreLabel:`K-Pop`,url:`https://soundcloud.com/newjeans-music`},{id:`kpop-straykids`,name:`Stray Kids`,handle:`straykidsofficial`,category:`kpop`,genreLabel:`K-Pop`,url:`https://soundcloud.com/straykidsofficial`},{id:`kpop-twice`,name:`TWICE`,handle:`twiceofficial`,category:`kpop`,genreLabel:`K-Pop`,url:`https://soundcloud.com/twiceofficial`},{id:`kpop-seventeen`,name:`SEVENTEEN`,handle:`seventeen17`,category:`kpop`,genreLabel:`K-Pop`,url:`https://soundcloud.com/seventeen17`},{id:`kpop-aespa`,name:`aespa`,handle:`aespa-official`,category:`kpop`,genreLabel:`K-Pop`,url:`https://soundcloud.com/aespa-official`}];function $e(e){return JSON.stringify(e).replace(/<\//g,`<\\/`)}function et(e,t){let n=String(e||``).replace(/\/+$/,``),r=`${n}/scramjet-browser.html?${D()}`,i=$e({origin:n,scramjetSrc:r,defaultWisp:Te,panicUrl:Ee,classroomFavicon:w,standaloneWindowName:T,standaloneWindowFeatures:Oe,themePresets:he,gnCoverUrl:Ve,gnHtmlUrl:He,gnScriptUrls:Ue,staticModules:t.map(e=>({id:`builtin:`+e.slug,provider:`builtin`,name:e.title,category:e.category,url:e.url.startsWith(`/`)?`${n}${e.url}`:e.url,featured:!0})),fallbackUgs:we(ge).map(e=>({...e,provider:`ugs`})),fallbackCkv:Be(Pe).map(e=>({...e,provider:`ckv`})),tvmazeShowsUrl:We,tvmazeSearchUrl:Ge,archiveFeatureFilmsUrl:Ke,cinemaFallbackShows:Xe(),cinemaFallbackMovies:Ye(),scStations:Ze,scArtists:Qe,adPrelude:me,srcBlocklist:fe.map(e=>({source:e.source,flags:e.flags})),inlineBlocklist:pe.map(e=>({source:e.source,flags:e.flags}))});return`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>VALem — Isolated Workspace</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&family=Outfit:wght@500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
  <style>
    :root {
      --bg: #0b0608;
      --rail: #080406;
      --surface: #140b0e;
      --surface-2: #1b0f13;
      --text: #fdf2f4;
      --muted: #9f878f;
      --accent: #ff5c7c;
      --accent-hover: #ff456b;
      --accent-text: #19070d;
      --accent-soft: rgba(255, 92, 124, 0.14);
      --border: rgba(255, 255, 255, 0.08);
      --border-strong: rgba(255, 255, 255, 0.16);
      --ui-radius: 12px;
      --glow-strength: 1;
      --glass-blur: 14px;
      --font-scale: 1;
      --ease: cubic-bezier(0.16, 1, 0.3, 1);
      --font-display: 'Outfit', 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
      --font-ui: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
      --font-mono: 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
    }

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    html, body {
      width: 100%;
      height: 100%;
      overflow: hidden;
      background: var(--bg);
      color: var(--text);
      font-family: var(--font-ui);
      -webkit-font-smoothing: antialiased;
    }

    body[data-reduced-motion="1"] *,
    body[data-reduced-motion="1"] *::before,
    body[data-reduced-motion="1"] *::after {
      transition-duration: 0.01ms !important;
      animation-duration: 0.01ms !important;
    }

    .app-shell {
      width: 100%;
      height: 100%;
      display: flex;
      overflow: hidden;
      background: var(--bg);
      position: relative;
    }

    /* Collapsible Left Glassmorphic Sidebar Rail (Expanded -> Compact -> Hidden) */
    .rail {
      width: 232px;
      height: 100%;
      background: color-mix(in srgb, var(--rail) 94%, transparent);
      backdrop-filter: blur(var(--glass-blur));
      border-right: 1px solid var(--border);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 10px;
      flex-shrink: 0;
      z-index: 40;
      transition: width 0.24s var(--ease), margin-left 0.24s var(--ease), padding 0.24s var(--ease), opacity 0.2s var(--ease);
      overflow: hidden;
    }

    .rail.compact {
      width: 58px;
      padding: 10px 8px;
    }

    .rail.hidden-rail {
      width: 232px;
      margin-left: -232px;
      opacity: 0;
      pointer-events: none;
    }

    .rail-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      padding: 2px 2px 8px;
      margin-bottom: 4px;
      border-bottom: 1px solid var(--border);
      min-height: 40px;
    }

    .rail.compact .rail-header {
      justify-content: center;
      padding: 2px 0 8px;
    }

    .rail-brand {
      display: flex;
      align-items: center;
      gap: 9px;
      min-width: 0;
      overflow: hidden;
    }

    .rail.compact .rail-brand {
      display: none;
    }

    .rail-logo-mark {
      width: 28px;
      height: 28px;
      border-radius: 8px;
      background: var(--accent);
      color: var(--accent-text);
      font-family: var(--font-display);
      font-weight: 800;
      font-size: 14px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .rail-logo-name {
      font-family: var(--font-display);
      font-weight: 800;
      font-size: 16px;
      letter-spacing: -0.03em;
      color: var(--text);
      white-space: nowrap;
    }

    .rail-collapse-btn {
      width: 30px;
      height: 30px;
      border-radius: 8px;
      border: 1px solid var(--border);
      background: var(--surface);
      color: var(--muted);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      flex-shrink: 0;
      transition: background 0.15s var(--ease), color 0.15s var(--ease), border-color 0.15s var(--ease), transform 0.2s var(--ease);
    }

    .rail-collapse-btn:hover {
      border-color: var(--accent);
      color: var(--text);
      background: var(--surface-2);
    }

    .rail.compact .rail-collapse-btn svg {
      transform: rotate(180deg);
    }

    .rail-reopen-btn {
      position: fixed;
      top: 52px;
      left: 10px;
      z-index: 45;
      height: 32px;
      padding: 0 11px;
      border-radius: 9px;
      border: 1px solid var(--border-strong);
      background: color-mix(in srgb, var(--surface) 92%, transparent);
      backdrop-filter: blur(12px);
      color: var(--text);
      font-family: var(--font-ui);
      font-size: 12px;
      font-weight: 700;
      display: none;
      align-items: center;
      gap: 6px;
      cursor: pointer;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
      transition: border-color 0.15s var(--ease), transform 0.15s var(--ease);
    }

    .rail-reopen-btn.visible {
      display: inline-flex;
    }

    .rail-reopen-btn:hover {
      border-color: var(--accent);
      color: var(--accent);
      transform: translateY(-1px);
    }

    .rail-top, .rail-bottom {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .rail-group-label {
      font-family: var(--font-mono);
      font-size: 10px;
      font-weight: 600;
      letter-spacing: 0.09em;
      text-transform: uppercase;
      color: var(--muted);
      padding: 8px 10px 3px;
      white-space: nowrap;
      opacity: 0.78;
      height: auto;
      overflow: hidden;
      transition: opacity 0.18s var(--ease), height 0.18s var(--ease), padding 0.18s var(--ease);
    }

    .rail.compact .rail-group-label {
      opacity: 0;
      height: 0;
      padding: 0;
    }

    .rail-divider {
      height: 1px;
      background: var(--border);
      margin: 5px 4px;
    }

    .rail-btn {
      width: 100%;
      height: 37px;
      padding: 0 10px;
      border-radius: calc(var(--ui-radius) - 2px);
      border: 1px solid transparent;
      background: transparent;
      color: var(--muted);
      font-family: var(--font-ui);
      font-size: 13px;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 11px;
      cursor: pointer;
      white-space: nowrap;
      transition: background 0.16s var(--ease), color 0.16s var(--ease), border-color 0.16s var(--ease);
    }

    .rail-btn svg {
      width: 18px;
      height: 18px;
      flex-shrink: 0;
    }

    .rail-btn:hover {
      background: var(--accent-soft);
      color: var(--text);
    }

    .rail-btn.active {
      background: var(--accent-soft);
      border-color: var(--accent);
      color: var(--accent);
    }

    .rail-btn.panic {
      color: #f43f5e;
    }

    .rail-btn.panic:hover {
      background: rgba(244, 63, 94, 0.16);
      border-color: rgba(244, 63, 94, 0.45);
      color: #fb7185;
    }

    .rail-label {
      flex: 1;
      text-align: left;
      overflow: hidden;
      text-overflow: ellipsis;
      opacity: 1;
      transition: opacity 0.16s var(--ease);
    }

    .rail.compact .rail-label {
      opacity: 0;
      width: 0;
    }

    .rail-badge {
      font-family: var(--font-mono);
      font-size: 10px;
      font-variant-numeric: tabular-nums;
      padding: 2px 6px;
      border-radius: 6px;
      background: var(--surface-2);
      color: var(--muted);
      display: inline-block;
    }

    .rail.compact .rail-badge {
      display: none;
    }

    /* Main Stage */
    .stage-wrap {
      flex: 1;
      min-width: 0;
      height: 100%;
      display: flex;
      flex-direction: column;
      position: relative;
      background: var(--bg);
    }

    .mobile-bar {
      display: none;
      height: 42px;
      padding: 0 12px;
      background: var(--rail);
      border-bottom: 1px solid var(--border);
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      flex-shrink: 0;
    }

    .view-panel {
      position: relative;
      flex: 1;
      min-height: 0;
      display: none;
      overflow: hidden;
    }

    .view-panel.active {
      display: flex;
      flex-direction: column;
    }

    .view-scroll {
      flex: 1;
      overflow-y: auto;
      padding: 20px 24px 36px;
      background-color: var(--bg);
      background-image:
        radial-gradient(ellipse 68% 50% at 14% 8%, color-mix(in srgb, var(--accent) calc(16% * var(--glow-strength)), transparent), transparent 72%),
        radial-gradient(ellipse 52% 46% at 88% 82%, color-mix(in srgb, var(--accent) calc(11% * var(--glow-strength)), transparent), transparent 74%),
        linear-gradient(to right, color-mix(in srgb, var(--text) 3.5%, transparent) 1px, transparent 1px),
        linear-gradient(to bottom, color-mix(in srgb, var(--text) 3.5%, transparent) 1px, transparent 1px);
      background-size: 100% 100%, 100% 100%, 48px 48px, 48px 48px;
    }

    body[data-bg-style="topo"] .view-scroll {
      background-image:
        radial-gradient(circle at 82% 18%, color-mix(in srgb, var(--accent) calc(15% * var(--glow-strength)), transparent), transparent 55%),
        repeating-radial-gradient(circle at 18% 85%, transparent 0 36px, color-mix(in srgb, var(--text) 4%, transparent) 36px 37px);
      background-size: 100% 100%, 100% 100%;
    }

    body[data-bg-style="glass"] .view-scroll {
      background-image:
        radial-gradient(ellipse 75% 42% at 50% 0%, color-mix(in srgb, var(--accent) calc(20% * var(--glow-strength)), transparent), transparent 72%),
        linear-gradient(160deg, var(--bg) 0%, var(--rail) 100%);
      background-size: 100% 100%, 100% 100%;
    }

    body[data-bg-style="grid"] .view-scroll {
      background-image:
        linear-gradient(to right, color-mix(in srgb, var(--accent) 7%, transparent) 1px, transparent 1px),
        linear-gradient(to bottom, color-mix(in srgb, var(--accent) 7%, transparent) 1px, transparent 1px);
      background-size: 32px 32px, 32px 32px;
    }

    body[data-bg-style="matte"] .view-scroll {
      background-image: none;
    }

    .container {
      max-width: 1420px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      gap: 18px;
      animation: vbFade 0.2s var(--ease);
    }

    @keyframes vbFade {
      from { opacity: 0; transform: translateY(5px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .section-head {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      gap: 12px;
      flex-wrap: wrap;
      padding-bottom: 14px;
      border-bottom: 1px solid var(--border);
    }

    .eyebrow {
      font-family: var(--font-mono);
      font-size: 11px;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--accent);
    }

    .h1 {
      font-size: 22px;
      font-weight: 800;
      letter-spacing: -0.025em;
      color: var(--text);
      margin-top: 3px;
    }

    .sub {
      font-size: 12px;
      color: var(--muted);
    }

    /* Controls & Pills */
    .toolbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      flex-wrap: wrap;
    }

    .pill-row {
      display: flex;
      align-items: center;
      gap: 6px;
      flex-wrap: wrap;
    }

    .pill-btn {
      height: 32px;
      padding: 0 12px;
      border-radius: 8px;
      border: 1px solid var(--border);
      background: var(--surface);
      color: var(--muted);
      font-family: var(--font-ui);
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      white-space: nowrap;
      transition: background 0.15s var(--ease), color 0.15s var(--ease), border-color 0.15s var(--ease);
    }

    .pill-btn:hover {
      background: var(--surface-2);
      color: var(--text);
    }

    .pill-btn.active {
      background: var(--accent);
      border-color: transparent;
      color: var(--accent-text);
      font-weight: 700;
    }

    .btn {
      height: 34px;
      padding: 0 12px;
      border-radius: 9px;
      border: 1px solid var(--border);
      background: var(--surface);
      color: var(--text);
      font-family: var(--font-ui);
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      white-space: nowrap;
      text-decoration: none;
      transition: background 0.15s var(--ease), border-color 0.15s var(--ease);
    }

    .btn:hover {
      background: var(--surface-2);
      border-color: var(--border-strong);
    }

    .btn-primary {
      background: var(--accent);
      border-color: transparent;
      color: var(--accent-text);
      font-weight: 700;
    }

    .btn-primary:hover {
      background: var(--accent-hover);
      color: var(--accent-text);
    }

    .input, .select {
      height: 34px;
      padding: 0 12px;
      border-radius: 9px;
      border: 1px solid var(--border);
      background: var(--surface);
      color: var(--text);
      font-family: var(--font-ui);
      font-size: 13px;
      outline: none;
    }

    .input:focus, .select:focus {
      border-color: var(--accent);
    }

    /* Card Grids */
    .modules-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(185px, 1fr));
      gap: 12px;
    }

    .media-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(176px, 1fr));
      gap: 14px;
    }

    .cinema-poster-wrap {
      position: relative;
      aspect-ratio: 2 / 3;
      background: var(--bg);
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .cinema-poster-wrap img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      transition: transform 0.24s var(--ease);
    }

    .card:hover .cinema-poster-wrap img {
      transform: scale(1.045);
    }

    .rating-chip {
      position: absolute;
      top: 8px;
      right: 8px;
      z-index: 3;
      padding: 2px 7px;
      border-radius: 6px;
      background: rgba(8, 4, 6, 0.86);
      border: 1px solid rgba(251, 191, 36, 0.45);
      font-family: var(--font-mono);
      font-size: 10px;
      font-weight: 700;
      color: #fcd34d;
    }

    .theater-body {
      flex: 1;
      min-height: 0;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 16px;
      padding: 16px 20px 28px;
      background: var(--bg);
    }

    .theater-inner {
      width: 100%;
      max-width: 1120px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .overlay.theater-wide .theater-inner {
      max-width: 100%;
    }

    .theater-source-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      flex-wrap: wrap;
      padding: 10px 12px;
      border-radius: 12px;
      background: var(--surface);
      border: 1px solid var(--border);
    }

    .theater-player-box {
      position: relative;
      width: 100%;
      aspect-ratio: 16 / 9;
      max-height: 50vh;
      flex-shrink: 0;
      background: #000;
      border-radius: 14px;
      border: 1px solid var(--border-strong);
      overflow: hidden;
    }

    .overlay.theater-wide .theater-player-box {
      max-height: 66vh;
    }

    .theater-player-box iframe,
    .theater-player-box video {
      width: 100%;
      height: 100%;
      border: 0;
      display: block;
    }

    .theater-fallback {
      position: absolute;
      inset: 0;
      display: none;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 12px;
      padding: 24px;
      text-align: center;
      background: radial-gradient(circle at center, rgba(255, 92, 124, 0.08), rgba(8, 4, 6, 0.96));
      z-index: 4;
    }

    .theater-fallback.open {
      display: flex;
    }

    .episodes-strip {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
      gap: 8px;
      max-height: 220px;
      overflow-y: auto;
      padding-right: 4px;
    }

    .episode-btn {
      display: flex;
      flex-direction: column;
      gap: 3px;
      padding: 9px 11px;
      border-radius: 9px;
      border: 1px solid var(--border);
      background: var(--surface-2);
      color: var(--text);
      font-family: var(--font-ui);
      text-align: left;
      cursor: pointer;
      transition: border-color 0.14s var(--ease), background 0.14s var(--ease);
    }

    .episode-btn:hover {
      border-color: var(--accent);
    }

    .episode-btn.active {
      border-color: var(--accent);
      background: var(--accent-soft);
    }

    .artist-dir-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(175px, 1fr));
      gap: 8px;
      max-height: 220px;
      overflow-y: auto;
      padding-right: 4px;
    }

    .artist-chip-btn {
      display: flex;
      flex-direction: column;
      gap: 2px;
      padding: 8px 10px;
      border-radius: 9px;
      border: 1px solid var(--border);
      background: var(--surface-2);
      color: var(--text);
      font-family: var(--font-ui);
      text-align: left;
      cursor: pointer;
      transition: border-color 0.14s var(--ease), transform 0.12s var(--ease);
    }

    .artist-chip-btn:hover {
      border-color: var(--accent);
      transform: translateY(-1px);
    }

    .artist-chip-btn.active {
      border-color: var(--accent);
      background: var(--accent-soft);
    }

    .books-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 14px;
    }

    .card {
      position: relative;
      border-radius: 12px;
      background: var(--surface);
      border: 1px solid var(--border);
      overflow: hidden;
      display: flex;
      flex-direction: column;
      cursor: pointer;
      transition: transform 0.16s var(--ease), border-color 0.16s var(--ease), background 0.16s var(--ease);
    }

    .card:hover {
      transform: translateY(-2px);
      border-color: var(--accent);
      background: var(--surface-2);
    }

    .thumb-wrap {
      position: relative;
      aspect-ratio: 16 / 10;
      background: var(--bg);
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .thumb-wrap img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      transition: transform 0.22s var(--ease);
    }

    .card:hover .thumb-wrap img {
      transform: scale(1.04);
    }

    .thumb-fallback {
      position: absolute;
      inset: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 6px;
      font-family: var(--font-mono);
      font-size: 11px;
      color: var(--muted);
      background: linear-gradient(135deg, var(--surface-2) 0%, var(--bg) 100%);
      padding: 10px;
      text-align: center;
    }

    .provider-chip {
      position: absolute;
      top: 8px;
      left: 8px;
      z-index: 3;
      padding: 2px 7px;
      border-radius: 6px;
      background: var(--rail);
      border: 1px solid var(--border);
      font-family: var(--font-mono);
      font-size: 10px;
      font-weight: 600;
      color: var(--accent);
    }

    .fav-btn {
      position: absolute;
      top: 8px;
      right: 8px;
      z-index: 3;
      width: 28px;
      height: 28px;
      border-radius: 7px;
      border: 1px solid rgba(255, 255, 255, 0.14);
      background: rgba(8, 4, 6, 0.78);
      color: var(--muted);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      font-size: 14px;
    }

    .fav-btn.is-fav {
      color: #fbbf24;
      border-color: rgba(251, 191, 36, 0.45);
      background: rgba(251, 191, 36, 0.16);
    }

    .card-body {
      padding: 10px 12px;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .card-title {
      font-size: 13px;
      font-weight: 700;
      color: var(--text);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .card-meta {
      font-family: var(--font-mono);
      font-size: 11px;
      color: var(--muted);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    /* Fullscreen Overlays (Study Module Player, Movie Theater, Book Reader, Settings) */
    .overlay {
      position: fixed;
      inset: 0;
      z-index: 90;
      background: #070405;
      display: none;
      flex-direction: column;
    }

    .overlay.open {
      display: flex;
    }

    .overlay-bar {
      height: 48px;
      padding: 0 14px;
      background: var(--rail);
      border-bottom: 1px solid var(--border);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      flex-shrink: 0;
    }

    .overlay-stage {
      position: relative;
      flex: 1;
      min-height: 0;
      background: #000;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .overlay-stage iframe, .overlay-stage video {
      width: 100%;
      height: 100%;
      border: none;
      display: block;
    }

    .overlay-status {
      position: absolute;
      inset: 0;
      background: rgba(11, 6, 8, 0.94);
      display: none;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 12px;
      padding: 20px;
      text-align: center;
      z-index: 5;
    }

    .overlay-status.open {
      display: flex;
    }

    .spinner {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      border: 3px solid var(--accent-soft);
      border-top-color: var(--accent);
      animation: vbSpin 0.75s linear infinite;
    }

    @keyframes vbSpin { to { transform: rotate(360deg); } }

    .modal-backdrop {
      position: fixed;
      inset: 0;
      z-index: 95;
      background: rgba(5, 2, 3, 0.78);
      backdrop-filter: blur(8px);
      display: none;
      align-items: center;
      justify-content: center;
      padding: 16px;
    }

    .modal-backdrop.open {
      display: flex;
    }

    .modal-card {
      width: 100%;
      max-width: 760px;
      max-height: 88vh;
      overflow-y: auto;
      background: var(--surface);
      border: 1px solid var(--border-strong);
      border-radius: 16px;
      padding: 20px;
      display: flex;
      flex-direction: column;
      gap: 16px;
      box-shadow: 0 24px 56px rgba(0, 0, 0, 0.65);
    }

    .settings-nav {
      display: flex;
      align-items: center;
      gap: 6px;
      border-bottom: 1px solid var(--border);
      padding-bottom: 10px;
      flex-wrap: wrap;
    }

    .settings-pane {
      display: none;
      flex-direction: column;
      gap: 14px;
    }

    .settings-pane.active {
      display: flex;
    }

    .setting-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      padding: 10px 12px;
      border-radius: 10px;
      background: var(--surface-2);
      border: 1px solid var(--border);
      flex-wrap: wrap;
    }

    .setting-row-meta {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .setting-row-title {
      font-size: 13px;
      font-weight: 700;
      color: var(--text);
    }

    .setting-row-desc {
      font-size: 11px;
      color: var(--muted);
    }

    .preset-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(156px, 1fr));
      gap: 8px;
      max-height: 250px;
      overflow-y: auto;
      padding-right: 4px;
    }

    .preset-item {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 10px;
      border-radius: 10px;
      border: 1px solid var(--border);
      background: var(--surface-2);
      color: var(--text);
      font-family: var(--font-ui);
      font-size: 11px;
      font-weight: 600;
      cursor: pointer;
      text-align: left;
      transition: border-color 0.15s var(--ease), transform 0.12s var(--ease);
    }

    .preset-item:hover {
      border-color: var(--accent);
      transform: translateY(-1px);
    }

    .preset-item.active {
      border-color: var(--accent);
      box-shadow: 0 0 0 2px var(--accent-soft);
    }

    .preset-swatches {
      display: inline-flex;
      align-items: center;
      flex-shrink: 0;
    }

    .preset-dot {
      width: 11px;
      height: 11px;
      border-radius: 50%;
      border: 1px solid rgba(128, 128, 128, 0.45);
    }

    .preset-dot + .preset-dot {
      margin-left: -4px;
    }

    .vb-toast {
      position: fixed;
      right: 18px;
      bottom: 18px;
      z-index: 120;
      max-width: 390px;
      padding: 12px 14px;
      border-radius: 12px;
      background: var(--surface);
      border: 1px solid var(--accent);
      color: var(--text);
      font-size: 12px;
      line-height: 1.45;
      box-shadow: 0 18px 42px rgba(0, 0, 0, 0.55);
      display: none;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
    }

    .vb-toast.open {
      display: flex;
    }

    .music-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 16px;
    }

    .panel-box {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 14px;
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .book-card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 14px;
      display: flex;
      gap: 12px;
    }

    .book-cover {
      width: 66px;
      height: 98px;
      border-radius: 8px;
      object-fit: cover;
      background: #080406;
      flex-shrink: 0;
    }

    @media (max-width: 760px) {
      .rail {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        transform: translateX(-100%);
        width: 232px;
      }
      .rail.mobile-open {
        transform: translateX(0);
      }
      .rail.mobile-open .rail-label { opacity: 1; }
      .rail.mobile-open .rail-group-label { opacity: 0.78; height: auto; }
      .rail.mobile-open .rail-badge { display: inline-block; }
      .mobile-bar { display: flex; }
    }
  </style>
</head>
<body>
  <div class="app-shell">
    <button type="button" class="rail-reopen-btn" id="btn-rail-reopen" aria-label="Show Sidebar Menu">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
      <span>VALem Menu</span>
    </button>

    <!-- Left Collapsible Glassmorphic Sidebar Rail -->
    <aside class="rail" id="rail" aria-label="VALem Navigation">
      <div class="rail-top">
        <div class="rail-header">
          <div class="rail-brand">
            <span class="rail-logo-mark">V</span>
            <span class="rail-logo-name">VALem</span>
          </div>
          <button type="button" class="rail-collapse-btn" id="btn-rail-toggle" aria-expanded="true" aria-label="Collapse or Expand Sidebar" title="Collapse / Expand Sidebar">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
        </div>

        <button type="button" class="rail-btn active" data-view="browser" aria-label="VALem Proxy Browser" title="VALem Proxy Browser">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          <span class="rail-label">VALem Browser</span>
        </button>

        <div class="rail-group-label">Arcade Hub</div>

        <button type="button" class="rail-btn" data-view="modules" aria-label="All Games Hub" title="All Games">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="6" y1="12" x2="10" y2="12"/><line x1="8" y1="10" x2="8" y2="14"/><line x1="15" y1="13" x2="15.01" y2="13"/><line x1="18" y1="11" x2="18.01" y2="11"/><rect x="2" y="6" width="20" height="12" rx="6"/></svg>
          <span class="rail-label">All Games</span>
          <span class="rail-badge" id="badge-modules">0</span>
        </button>

        <div class="rail-divider"></div>
        <div class="rail-group-label">gn-math Library</div>

        <button type="button" class="rail-btn" data-view="gnmath" aria-label="gn-math Script and Zones" title="gn-math Script">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
          <span class="rail-label">gn-math Script</span>
          <span class="rail-badge" id="badge-gn">0</span>
        </button>

        <button type="button" class="rail-btn" data-view="movies" aria-label="Movies and TV" title="Movies & TV">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="2.18"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/></svg>
          <span class="rail-label">Movies &amp; TV</span>
        </button>

        <button type="button" class="rail-btn" data-view="books" aria-label="gn-math Books and Manga" title="Books & Manga">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
          <span class="rail-label">Books &amp; Manga</span>
        </button>

        <button type="button" class="rail-btn" data-view="music" aria-label="gn-math Music Studio" title="Music">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
          <span class="rail-label">Music Studio</span>
        </button>
      </div>

      <div class="rail-bottom">
        <div class="rail-divider"></div>
        <button type="button" class="rail-btn" id="btn-rail-standalone-blob" aria-label="Open Standalone :blob Window" title="Open Standalone :blob Window">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
          <span class="rail-label">Standalone :blob</span>
        </button>

        <button type="button" class="rail-btn" id="btn-rail-hide" aria-label="Auto-Hide Sidebar" title="Hide Sidebar for Fullscreen Width">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="3" x2="9" y2="21"/></svg>
          <span class="rail-label">Hide Sidebar</span>
        </button>

        <button type="button" class="rail-btn" id="btn-open-settings" aria-label="Color Presets and Custom Settings" title="Custom Settings &amp; 124 Themes">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
          <span class="rail-label">Settings</span>
          <span class="rail-badge">124</span>
        </button>

        <button type="button" class="rail-btn panic" id="btn-rail-panic" aria-label="Panic Redirect to Google Classroom (Esc)" title="Panic (Esc) — Google Classroom">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          <span class="rail-label">Panic (Esc)</span>
        </button>
      </div>
    </aside>

    <!-- Main Content Stage -->
    <div class="stage-wrap">
      <div class="mobile-bar">
        <button type="button" class="btn" id="btn-mobile-menu" aria-label="Open Navigation Menu">Menu</button>
        <span style="font-weight:800;color:var(--accent);font-size:15px;font-family:var(--font-display);">VALem</span>
        <button type="button" class="btn" id="btn-mobile-panic" style="border-color:rgba(244,63,94,0.4);color:#fda4af;">Panic (Esc)</button>
      </div>

      <!-- 1. VALem Scramjet v2 Frontpage -->
      <section class="view-panel active" id="view-browser" aria-label="VALem Proxy Browser">
        <iframe
          id="valbrowse-proxy-frame"
          title="VALem Scramjet v2 Browser"
          src="${r.replace(/"/g,`&quot;`)}"
          allow="autoplay; gamepad; fullscreen"
          referrerpolicy="no-referrer"
          style="width:100%;height:100%;border:0;display:block;background:#0b0608;"
        ></iframe>
      </section>

      <!-- 2. Combined Study Modules Hub -->
      <section class="view-panel" id="view-modules" aria-label="Games Hub">
        <div class="view-scroll">
          <div class="container">
            <div class="section-head">
              <div>
                <div class="eyebrow">Combined Library · Built-In + gn-math + UGS + CKV</div>
                <h1 class="h1">All Games (<span id="modules-total-count">0</span>)</h1>
              </div>
              <button type="button" class="btn" id="btn-refresh-modules">Refresh Live Catalogs</button>
            </div>

            <div class="toolbar">
              <div class="pill-row" id="modules-filter-pills">
                <button type="button" class="pill-btn active" data-mfilter="all">All</button>
                <button type="button" class="pill-btn" data-mfilter="gn">gn-math</button>
                <button type="button" class="pill-btn" data-mfilter="ugs">UGS</button>
                <button type="button" class="pill-btn" data-mfilter="ckv">CKV</button>
                <button type="button" class="pill-btn" data-mfilter="builtin">Built-In</button>
                <button type="button" class="pill-btn" data-mfilter="favorites">Favorites</button>
              </div>

              <div class="pill-row">
                <input type="text" class="input" id="modules-search" placeholder="Search all games..." style="width:220px;" />
                <select class="select" id="modules-sort" aria-label="Sort games">
                  <option value="featured">Featured First</option>
                  <option value="popular">Most Popular</option>
                  <option value="az">Name (A-Z)</option>
                  <option value="za">Name (Z-A)</option>
                </select>
              </div>
            </div>

            <div class="modules-grid" id="modules-grid"></div>
          </div>
        </div>
      </section>

      <!-- 3. Authentic gn-math Script & Ranked Zones -->
      <section class="view-panel" id="view-gnmath" aria-label="gn-math Script and Zones">
        <div class="view-scroll">
          <div class="container">
            <div class="section-head">
              <div>
                <div class="eyebrow">Main Provider · freebuisness/assets &amp; gn-math.github.io</div>
                <h1 class="h1">gn-math Script &amp; Live Zones</h1>
              </div>
              <div class="pill-row">
                <button type="button" class="pill-btn active" id="gn-tab-zones">Ranked Zones</button>
                <button type="button" class="pill-btn" id="gn-tab-script">Authentic gn-math Script</button>
                <button type="button" class="btn" id="gn-open-proxy">Open in VALem</button>
              </div>
            </div>

            <div id="gn-zones-pane" style="display:flex;flex-direction:column;gap:14px;">
              <div class="toolbar">
                <div class="pill-row" id="gn-period-pills">
                  <button type="button" class="pill-btn active" data-period="featured">Featured</button>
                  <button type="button" class="pill-btn" data-period="newest">Newest</button>
                  <button type="button" class="pill-btn" data-period="classic">Classic ID</button>
                  <button type="button" class="pill-btn" data-period="az">A-Z</button>
                </div>
                <input type="text" class="input" id="gn-search" placeholder="Filter gn-math zones.json..." style="width:240px;" />
              </div>
              <div class="modules-grid" id="gn-grid"></div>
            </div>

            <div id="gn-script-pane" style="display:none;flex-direction:column;gap:10px;">
              <div class="toolbar">
                <span class="sub" id="gn-script-status">Loading upstream cdn.jsdelivr.net/gh/gn-math/gn-math.github.io@main/index.html ...</span>
                <button type="button" class="btn" id="gn-reload-script">Reload Script</button>
              </div>
              <iframe
                id="gn-script-frame"
                title="Authentic gn-math Script"
                allow="autoplay; gamepad; fullscreen"
                style="width:100%;height:72vh;border:1px solid var(--border);border-radius:12px;background:#000;"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      <!-- 4. Movies & TV Catalog (TVMaze + Internet Archive + Optional TMDB) -->
      <section class="view-panel" id="view-movies" aria-label="Movies and TV">
        <div class="view-scroll">
          <div class="container">
            <div class="section-head">
              <div>
                <div class="eyebrow">TVMaze Live API · Internet Archive Cinema · Optional TMDB</div>
                <h1 class="h1">Movies &amp; TV</h1>
              </div>
              <div class="pill-row">
                <span class="sub" id="movies-status">Loading live TVMaze &amp; Archive.org catalog...</span>
                <button type="button" class="btn" id="btn-movies-tmdb-shortcut" style="height:28px;font-size:11px;">TMDB Key</button>
              </div>
            </div>

            <div class="toolbar">
              <div class="pill-row" id="movie-genres">
                <button type="button" class="pill-btn active" data-genre="all">All</button>
                <button type="button" class="pill-btn" data-genre="trending">Trending</button>
                <button type="button" class="pill-btn" data-genre="action">Action</button>
                <button type="button" class="pill-btn" data-genre="sci-fi">Sci-Fi</button>
                <button type="button" class="pill-btn" data-genre="comedy">Comedy</button>
                <button type="button" class="pill-btn" data-genre="anime">Anime</button>
                <button type="button" class="pill-btn" data-genre="public-domain">Full Public-Domain Movies</button>
              </div>

              <form id="movies-search-form" class="pill-row">
                <input type="text" class="input" id="movies-query" placeholder="Search TVMaze shows, anime, or Archive films..." style="width:265px;" />
                <button type="submit" class="btn btn-primary">Search</button>
                <button type="button" class="btn" id="btn-movies-reset">Reset</button>
              </form>
            </div>

            <div class="media-grid" id="movies-grid"></div>
          </div>
        </div>
      </section>

      <!-- 5. gn-math Books & Manga -->
      <section class="view-panel" id="view-books" aria-label="gn-math Books and Manga">
        <div class="view-scroll">
          <div class="container">
            <div class="section-head">
              <div>
                <div class="eyebrow">gn-math Library · Gutendex Reader</div>
                <h1 class="h1">Books &amp; Manga</h1>
              </div>
              <span class="sub" id="books-status">Searching Gutendex...</span>
            </div>

            <div class="toolbar">
              <div class="pill-row" id="books-topics">
                <button type="button" class="pill-btn" data-topic="Sherlock Holmes">Sherlock Holmes</button>
                <button type="button" class="pill-btn" data-topic="Dracula">Dracula</button>
                <button type="button" class="pill-btn" data-topic="Frankenstein">Frankenstein</button>
                <button type="button" class="pill-btn" data-topic="Alice">Alice</button>
                <button type="button" class="pill-btn" data-topic="Jules Verne">Jules Verne</button>
              </div>
              <form id="books-search-form" class="pill-row">
                <input type="text" class="input" id="books-query" placeholder="Search books or authors..." style="width:230px;" />
                <button type="submit" class="btn btn-primary">Search</button>
              </form>
            </div>

            <div class="books-grid" id="books-grid"></div>
          </div>
        </div>
      </section>

      <!-- 6. gn-math Music Studio -->
      <section class="view-panel" id="view-music" aria-label="gn-math Music">
        <div class="view-scroll">
          <div class="container">
            <div class="section-head">
              <div>
                <div class="eyebrow">gn-math Audio · SoundCloud &amp; Offline Synth</div>
                <h1 class="h1">Music Studio</h1>
              </div>
            </div>

            <div class="music-grid">
              <div class="panel-box">
                <strong style="font-size:14px;">SoundCloud Player</strong>
                <form id="sc-form" class="pill-row" style="width:100%;">
                  <input type="text" class="input" id="sc-input" value="https://soundcloud.com/lofi_girl" placeholder="Paste soundcloud.com/artist or track URL..." style="flex:1;" />
                  <button type="submit" class="btn btn-primary">Load</button>
                </form>
                <div class="pill-row" id="sc-stations"></div>
                <iframe
                  id="sc-frame"
                  title="SoundCloud Player"
                  width="100%"
                  height="260"
                  allow="autoplay"
                  style="border:1px solid var(--border);border-radius:10px;background:#000;"
                ></iframe>

                <div style="border-top:1px solid var(--border);padding-top:10px;display:flex;flex-direction:column;gap:8px;">
                  <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap;">
                    <span class="eyebrow">Artist SoundCloud Search Examples</span>
                    <span class="sub">Click any link to load or copy handle</span>
                  </div>
                  <div class="pill-row" id="sc-artist-cats">
                    <button type="button" class="pill-btn active" data-sc-cat="all">All</button>
                    <button type="button" class="pill-btn" data-sc-cat="rap">10 Rappers</button>
                    <button type="button" class="pill-btn" data-sc-cat="pop">Famous Pop</button>
                    <button type="button" class="pill-btn" data-sc-cat="kpop">K-Pop</button>
                  </div>
                  <div class="artist-dir-grid" id="sc-artist-grid"></div>
                </div>
              </div>

              <div class="panel-box">
                <strong style="font-size:14px;">Offline Lo-Fi Beat &amp; Chord Synth</strong>
                <p class="sub">100% Web Audio generator — works offline inside :blob with zero external requests.</p>
                <div class="pill-row">
                  <button type="button" class="btn btn-primary" id="synth-toggle">Start Lo-Fi Synth</button>
                </div>
                <label class="sub" style="display:flex;justify-content:space-between;">
                  <span>Tempo</span><span id="synth-bpm-val">76 BPM</span>
                </label>
                <input type="range" id="synth-bpm" min="60" max="110" value="76" style="accent-color:var(--accent);" />

                <label class="sub" style="display:flex;justify-content:space-between;">
                  <span>Warmth Filter</span><span id="synth-cut-val">1100 Hz</span>
                </label>
                <input type="range" id="synth-cut" min="350" max="2800" value="1100" style="accent-color:var(--accent);" />

                <div style="border-top:1px solid var(--border);padding-top:10px;display:flex;flex-direction:column;gap:8px;">
                  <span style="font-size:12px;font-weight:600;">Local Audio File</span>
                  <input type="file" id="local-audio-input" accept="audio/*" style="font-size:12px;color:var(--muted);" />
                  <audio id="local-audio-player" controls style="display:none;width:100%;"></audio>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>

  <!-- Study Module Player Overlay -->
  <div class="overlay" id="module-overlay">
    <div class="overlay-bar">
      <div style="display:flex;align-items:center;gap:10px;min-width:0;">
        <span class="eyebrow" id="module-ov-provider">GAME</span>
        <strong id="module-ov-title" style="font-size:13px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">Loading...</strong>
      </div>
      <div class="pill-row">
        <button type="button" class="btn" id="module-ov-proxy">Open in VALem</button>
        <button type="button" class="btn" id="module-ov-reload">Reload</button>
        <button type="button" class="btn" id="module-ov-fs">Fullscreen</button>
        <button type="button" class="btn btn-primary" id="module-ov-close">Close</button>
      </div>
    </div>
    <div class="overlay-stage" id="module-ov-stage">
      <iframe id="module-ov-frame" allow="autoplay; fullscreen; gamepad" sandbox="allow-scripts allow-same-origin allow-forms allow-pointer-lock"></iframe>
      <div class="overlay-status open" id="module-ov-status">
        <div class="spinner" id="module-ov-spinner"></div>
        <div id="module-ov-msg" style="font-size:13px;">Loading ad-blocked game package...</div>
      </div>
    </div>
  </div>

  <!-- Embedded Theater View Overlay -->
  <div class="overlay" id="movie-overlay" aria-label="Embedded Theater View">
    <div class="overlay-bar">
      <div style="display:flex;align-items:center;gap:10px;min-width:0;">
        <span class="eyebrow" id="movie-ov-source">CINEMA</span>
        <strong id="movie-ov-title" style="font-size:13px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">Cinema Theater</strong>
      </div>
      <div class="pill-row">
        <button type="button" class="btn" id="movie-ov-theater">Theater Mode</button>
        <button type="button" class="btn" id="movie-ov-fs">Fullscreen</button>
        <button type="button" class="btn" id="movie-ov-proxy">Open in VALem</button>
        <button type="button" class="btn btn-primary" id="movie-ov-close">Close</button>
      </div>
    </div>
    <div class="theater-body">
      <div class="theater-inner">
        <div class="theater-source-bar" id="cinema-source-bar">
          <div class="pill-row" id="cinema-source-switcher" role="tablist" aria-label="Player Source Switcher">
            <span class="eyebrow" style="margin-right:4px;">Player Source</span>
            <button type="button" class="pill-btn" data-player-source="trailer" id="src-btn-trailer">Trailer</button>
            <button type="button" class="pill-btn" data-player-source="archive" id="src-btn-archive">Internet Archive</button>
            <button type="button" class="pill-btn" data-player-source="custom" id="src-btn-custom">Custom Embed URL</button>
          </div>
          <a
            id="cinema-open-new-tab"
            class="btn"
            href="https://archive.org"
            target="_blank"
            rel="noopener noreferrer"
            title="Open current player directly in a new tab if X-Frame-Options blocks embedding"
          >Open Player in New Tab</a>
        </div>

        <div class="theater-player-box" id="movie-ov-stage">
          <iframe
            id="cinema-player-frame"
            title="VALem Embedded Theater Player"
            allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
            allowfullscreen
            referrerpolicy="no-referrer"
          ></iframe>
          <div class="theater-fallback" id="cinema-player-fallback">
            <span class="eyebrow">Embedded Player Notice</span>
            <strong id="cinema-fallback-title" style="font-size:16px;color:var(--text);">No direct video stream attached to this metadata title</strong>
            <p class="sub" id="cinema-fallback-msg" style="max-width:520px;line-height:1.5;">
              TVMaze provides full episode guides, cast, and metadata without requiring an API key. Switch to Internet Archive, paste a custom embed URL below, or open the player directly in a new tab if the host blocks embedding.
            </p>
            <div class="pill-row" style="justify-content:center;">
              <button type="button" class="btn btn-primary" id="cinema-fallback-retry">Reload Embed</button>
              <a
                id="cinema-fallback-new-tab"
                class="btn"
                href="https://archive.org"
                target="_blank"
                rel="noopener noreferrer"
              >Open Player in New Tab</a>
              <button type="button" class="btn" id="cinema-fallback-proxy">Search Watch Page in VALem</button>
            </div>
          </div>
        </div>

        <form class="panel-box" id="cinema-embed-form" style="padding:12px 14px;gap:8px;">
          <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap;">
            <span class="eyebrow">Configurable Embed Player URL</span>
            <span class="sub" id="cinema-embed-hint">Supports Archive.org embeds, YouTube embeds, or custom player URLs</span>
          </div>
          <div class="pill-row" style="width:100%;">
            <input type="text" class="input" id="cinema-embed-input" placeholder="https://archive.org/embed/... or custom embed URL..." style="flex:1;min-width:220px;" />
            <button type="submit" class="btn btn-primary">Load Embed</button>
            <button type="button" class="btn" id="cinema-embed-auto">Auto Stream</button>
          </div>
        </form>

        <div class="panel-box" id="cinema-episodes-panel" style="display:none;">
          <div style="display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap;">
            <div>
              <span class="eyebrow">TVMaze Episode Guide</span>
              <div style="font-size:14px;font-weight:700;margin-top:2px;" id="cinema-episodes-heading">Seasons &amp; Episodes</div>
            </div>
            <select id="cinema-season-select" class="select" aria-label="Select Season"></select>
          </div>
          <div class="episodes-strip" id="cinema-episodes-list"></div>
          <div class="sub" id="cinema-episode-detail" style="line-height:1.5;">Select an episode above to inspect its synopsis and runtime.</div>
        </div>

        <div class="panel-box" id="cinema-meta-panel">
          <div style="display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap;">
            <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
              <span class="eyebrow" id="cinema-ov-network">Network</span>
              <span class="sub" id="cinema-ov-rating"></span>
            </div>
            <span class="sub" id="cinema-ov-genres"></span>
          </div>
          <p id="cinema-ov-synopsis" style="font-size:13px;line-height:1.62;color:var(--text);"></p>
          <div class="sub" id="cinema-ov-cast"></div>
        </div>
      </div>
    </div>
  </div>

  <!-- Book Reader Overlay -->
  <div class="overlay" id="book-overlay">
    <div class="overlay-bar">
      <strong id="book-ov-title" style="font-size:13px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">Reader</strong>
      <div class="pill-row">
        <button type="button" class="btn" id="book-font-down">A-</button>
        <button type="button" class="btn" id="book-font-up">A+</button>
        <button type="button" class="btn btn-primary" id="book-ov-close">Close</button>
      </div>
    </div>
    <div style="flex:1;overflow-y:auto;padding:28px 20px;background:var(--bg);">
      <pre id="book-ov-body" style="max-width:740px;margin:0 auto;white-space:pre-wrap;font-family:var(--font-ui);font-size:17px;line-height:1.82;color:var(--text);"></pre>
    </div>
  </div>

  <!-- Settings & ${he.length} Color Presets Modal -->
  <div class="modal-backdrop" id="settings-modal">
    <div class="modal-card">
      <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;">
        <div>
          <strong style="font-size:16px;font-family:var(--font-display);">VALem Custom Settings &amp; ${he.length} Color Presets</strong>
          <div class="sub">Customize themes, backgrounds, sidebar layout, home modules, tab cloak, and panic target</div>
        </div>
        <button type="button" class="btn" id="btn-close-settings">Close</button>
      </div>

      <div class="settings-nav" id="settings-tabs">
        <button type="button" class="pill-btn active" data-stab="appearance">Themes &amp; Background</button>
        <button type="button" class="pill-btn" data-stab="layout">Sidebar &amp; Layout</button>
        <button type="button" class="pill-btn" data-stab="cloak">Cloak &amp; Panic</button>
      </div>

      <!-- Pane 1: Themes & Background -->
      <div class="settings-pane active" id="spane-appearance">
        <div style="display:flex;flex-direction:column;gap:8px;">
          <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap;">
            <span class="eyebrow">Color Presets (${he.length})</span>
            <div class="pill-row">
              <input type="text" class="input" id="preset-search" placeholder="Search themes..." aria-label="Search color presets" style="height:28px;width:155px;font-size:11px;padding:0 9px;" />
              <button type="button" class="btn" id="btn-preset-random" style="height:28px;font-size:11px;padding:0 10px;">Random Theme</button>
              <button type="button" class="btn" id="btn-preset-reset-coral" style="height:28px;font-size:11px;padding:0 10px;">Default Coral</button>
            </div>
          </div>
          <div class="pill-row" id="preset-cat-pills">
            <button type="button" class="pill-btn active" data-pcat="All">All (${he.length})</button>
            <button type="button" class="pill-btn" data-pcat="Dark & Neon">Dark &amp; Neon (${he.filter(e=>e.category===`Dark & Neon`).length})</button>
            <button type="button" class="pill-btn" data-pcat="Cozy & Pastel">Cozy &amp; Pastel (${he.filter(e=>e.category===`Cozy & Pastel`).length})</button>
            <button type="button" class="pill-btn" data-pcat="High-Contrast & Light">High-Contrast &amp; Light (${he.filter(e=>e.category===`High-Contrast & Light`).length})</button>
          </div>
          <div class="preset-grid" id="color-presets-grid"></div>
        </div>

        <div class="setting-row">
          <div class="setting-row-meta">
            <span class="setting-row-title">Canvas Background Style</span>
            <span class="setting-row-desc">Choose the ambient pattern behind VALem</span>
          </div>
          <div class="pill-row" id="bg-style-pills">
            <button type="button" class="pill-btn active" data-bgstyle="aurora">Aurora Mesh</button>
            <button type="button" class="pill-btn" data-bgstyle="topo">Topographic</button>
            <button type="button" class="pill-btn" data-bgstyle="glass">Midnight Glass</button>
            <button type="button" class="pill-btn" data-bgstyle="grid">Fine Grid</button>
            <button type="button" class="pill-btn" data-bgstyle="matte">Pure Matte</button>
          </div>
        </div>

        <div class="setting-row">
          <div class="setting-row-meta">
            <span class="setting-row-title">Corner Shape</span>
            <span class="setting-row-desc">Adjust card and input roundness</span>
          </div>
          <div class="pill-row" id="radius-pills">
            <button type="button" class="pill-btn" data-radius="6">Sharp (6px)</button>
            <button type="button" class="pill-btn active" data-radius="12">Balanced (12px)</button>
            <button type="button" class="pill-btn" data-radius="18">Soft (18px)</button>
          </div>
        </div>

        <div class="setting-row">
          <div class="setting-row-meta">
            <span class="setting-row-title">Ambient Glow &amp; Backdrop Blur</span>
            <span class="setting-row-desc">Fine-tune mesh glow intensity (<span id="glow-pct-val">100%</span>)</span>
          </div>
          <div class="pill-row">
            <input type="range" id="custom-glow-range" min="0" max="150" value="100" style="accent-color:var(--accent);width:120px;" />
            <button type="button" class="pill-btn active" id="btn-toggle-blur">Glass Blur: On</button>
          </div>
        </div>
      </div>

      <!-- Pane 2: Sidebar & Layout -->
      <div class="settings-pane" id="spane-layout">
        <div class="setting-row">
          <div class="setting-row-meta">
            <span class="setting-row-title">Start Page UI Layout</span>
            <span class="setting-row-desc">Arrange VALem as Split Hero, Normal Search Engine, Side Search Engine, or Minimal</span>
          </div>
          <div class="pill-row" id="home-layout-pills">
            <button type="button" class="pill-btn active" data-homelayout="split">Split Hero</button>
            <button type="button" class="pill-btn" data-homelayout="normal">Normal Search</button>
            <button type="button" class="pill-btn" data-homelayout="side">Side Search</button>
            <button type="button" class="pill-btn" data-homelayout="minimal">Minimal</button>
          </div>
        </div>

        <div class="setting-row">
          <div class="setting-row-meta">
            <span class="setting-row-title">Sidebar Mode</span>
            <span class="setting-row-desc">Expanded labels, compact icon rail, or auto-hidden drawer</span>
          </div>
          <div class="pill-row" id="sidebar-mode-pills">
            <button type="button" class="pill-btn active" data-railmode="expanded">Expanded</button>
            <button type="button" class="pill-btn" data-railmode="compact">Compact Rail</button>
            <button type="button" class="pill-btn" data-railmode="hidden">Auto-Hide</button>
          </div>
        </div>

        <div class="setting-row">
          <div class="setting-row-meta">
            <span class="setting-row-title">VALem Home Modules</span>
            <span class="setting-row-desc">Toggle the live clock card and quick-launch tiles on start page</span>
          </div>
          <div class="pill-row">
            <button type="button" class="pill-btn active" id="btn-toggle-clock">Live Clock: On</button>
            <button type="button" class="pill-btn active" id="btn-toggle-shortcuts">Launchpad: On</button>
          </div>
        </div>

        <div class="setting-row">
          <div class="setting-row-meta">
            <span class="setting-row-title">Text Scale &amp; Motion</span>
            <span class="setting-row-desc">Adjust browser start page scale and transition motion</span>
          </div>
          <div class="pill-row" id="font-scale-pills">
            <button type="button" class="pill-btn" data-fscale="0.92">Compact</button>
            <button type="button" class="pill-btn active" data-fscale="1">Default</button>
            <button type="button" class="pill-btn" data-fscale="1.08">Large</button>
            <button type="button" class="pill-btn" id="btn-toggle-motion">Motion: Smooth</button>
          </div>
        </div>
      </div>

      <!-- Pane 3: Cloak & Panic -->
      <div class="settings-pane" id="spane-cloak">
        <div style="display:flex;flex-direction:column;gap:8px;">
          <span class="eyebrow">Custom Tab Title Cloak</span>
          <div class="pill-row">
            <input type="text" class="input" id="custom-cloak-title" placeholder="Enter custom tab title..." style="flex:1;min-width:190px;" />
            <button type="button" class="btn btn-primary" id="btn-apply-custom-cloak">Apply Title</button>
          </div>
          <div class="pill-row">
            <button type="button" class="btn" data-cloak="Home - Classroom">Google Classroom</button>
            <button type="button" class="btn" data-cloak="Dashboard | Canvas">Canvas LMS</button>
            <button type="button" class="btn" data-cloak="Study Notes - Google Docs">Google Docs</button>
            <button type="button" class="btn" data-cloak="Khan Academy | Free Online Courses">Khan Academy</button>
          </div>
        </div>

        <div style="display:flex;flex-direction:column;gap:8px;">
          <span class="eyebrow">Panic Redirect Target (Esc Key)</span>
          <div class="pill-row">
            <select id="panic-url-select" class="select" style="flex:1;min-width:190px;">
              <option value="https://classroom.google.com">Google Classroom (Default)</option>
              <option value="https://drive.google.com">Google Drive</option>
              <option value="https://www.khanacademy.org">Khan Academy</option>
              <option value="https://clever.com">Clever Portal</option>
            </select>
            <button type="button" class="btn btn-primary" id="btn-modal-standalone-blob">Open Standalone :blob</button>
          </div>
        </div>

        <div style="display:flex;flex-direction:column;gap:8px;">
          <span class="eyebrow">Optional TMDB API Key (Movies &amp; YouTube Trailers)</span>
          <div class="pill-row">
            <input type="password" class="input" id="tmdb-api-key-input" placeholder="Paste optional TMDB v3 API key (saved in localStorage)..." style="flex:1;min-width:190px;" />
            <button type="button" class="btn btn-primary" id="btn-save-tmdb-key">Save Key</button>
            <button type="button" class="btn" id="btn-clear-tmdb-key">Clear</button>
          </div>
          <div class="sub" id="tmdb-key-status">Optional — leave blank to use free TVMaze + Internet Archive catalog with no key required.</div>
        </div>

        <div style="padding:10px 12px;border-radius:10px;background:var(--surface-2);border:1px solid var(--border);font-family:var(--font-mono);font-size:11px;color:var(--muted);">
          Default Wisp Endpoint:<br />
          <span style="color:var(--accent);">${Te}</span>
        </div>

        <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;">
          <div class="sub">Press <code style="color:var(--text);">Esc</code> anywhere to immediately close or redirect to your Panic destination.</div>
          <button type="button" class="btn" id="btn-reset-all-custom">Reset All Settings</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Floating Popup-Blocked Toast -->
  <div class="vb-toast" id="vb-toast" role="status" aria-live="polite">
    <span id="vb-toast-msg">Popup blocked — allow popups for this site in Chrome&apos;s address bar, then click Open Standalone :blob again.</span>
    <button type="button" class="btn" id="vb-toast-close" style="height:26px;padding:0 8px;">OK</button>
  </div>

  <script>
    (function () {
      var CFG = ${i};

      function safeLSGet(key) {
        try { return window.localStorage ? window.localStorage.getItem(key) : null; } catch (_e) { return null; }
      }
      function safeLSSet(key, val) {
        try { if (window.localStorage) window.localStorage.setItem(key, val); } catch (_e) {}
      }

      function showToast(msg) {
        var el = document.getElementById('vb-toast');
        var msgEl = document.getElementById('vb-toast-msg');
        if (!el || !msgEl) return;
        msgEl.textContent = msg;
        el.classList.add('open');
        setTimeout(function () { el.classList.remove('open'); }, 6500);
      }

      document.getElementById('vb-toast-close').addEventListener('click', function () {
        document.getElementById('vb-toast').classList.remove('open');
      });

      /* ---------------- SYNCHRONOUS CHROME POPUP :BLOB LAUNCHER ---------------- */
      function openStandaloneBlobWindow() {
        var frameUrl = CFG.origin + '/?vb=1';
        var wrapperHtml = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8" />' +
          '<meta name="viewport" content="width=device-width,initial-scale=1.0" />' +
          '<title>Home - Classroom</title>' +
          '<link rel="icon" type="image/png" href="' + CFG.classroomFavicon + '" />' +
          '<style>html,body{margin:0;padding:0;width:100%;height:100%;overflow:hidden;background:#0b0608;}' +
          'iframe{width:100vw;height:100vh;border:none;display:block;}</style></head>' +
          '<body><iframe name="VALemStandaloneFrame" src="' + frameUrl.replace(/"/g, '&quot;') + '" title="Home - Classroom" ' +
          'allow="autoplay; gamepad; fullscreen; clipboard-read; clipboard-write" allowfullscreen></iframe>' +
          '<script>(function(){var p=' + JSON.stringify(CFG.panicUrl) + ';' +
          'function go(){try{if(document.documentElement)document.documentElement.style.display="none";}catch(_e){}' +
          'try{if(window.top&&window.top.opener&&typeof window.top.close==="function")window.top.close();}catch(_e){}' +
          'try{(window.top||window).location.replace(p);}catch(_e){}}' +
          'window.addEventListener("keydown",function(e){if(e&&e.key==="Escape"){e.preventDefault();go();}},true);' +
          'window.addEventListener("message",function(ev){if(ev&&ev.data&&ev.data.type==="valbrowse-panic")go();});' +
          '})();<\\/script></body></html>';

        var blob = new Blob([wrapperHtml], { type: 'text/html' });
        var url = URL.createObjectURL(blob);
        var win = window.open(url, CFG.standaloneWindowName, CFG.standaloneWindowFeatures);
        if (!win) {
          showToast('Popup blocked — click the popup icon in Chrome\\u2019s address bar to allow popups, then try again.');
        }
        setTimeout(function () { URL.revokeObjectURL(url); }, 10000);
      }

      /* ---------------- PANIC REDIRECT (ESC -> CLOSE / GOOGLE CLASSROOM) ---------------- */
      function triggerPanic() {
        try {
          if (document.fullscreenElement && document.exitFullscreen) {
            document.exitFullscreen().catch(function () {});
          }
        } catch (_e) {}
        try {
          document.title = 'Google Classroom';
          if (document.documentElement) document.documentElement.style.display = 'none';
        } catch (_e) {}
        try {
          if (window.parent && window.parent !== window) {
            window.parent.postMessage({ type: 'valbrowse-panic' }, '*');
          }
        } catch (_e) {}
        try {
          if (window.top && window.top.opener && typeof window.top.close === 'function') {
            window.top.close();
          }
        } catch (_e) {}
        try {
          if (window.top && window.top !== window) {
            window.top.location.replace(CFG.panicUrl);
            return;
          }
        } catch (_e) {}
        try {
          window.location.replace(CFG.panicUrl);
        } catch (_e) {}
      }

      window.addEventListener('keydown', function (e) {
        if (e && e.key === 'Escape') {
          e.preventDefault();
          triggerPanic();
        }
      }, true);

      document.getElementById('btn-rail-panic').addEventListener('click', triggerPanic);
      document.getElementById('btn-mobile-panic').addEventListener('click', triggerPanic);
      document.getElementById('btn-rail-standalone-blob').addEventListener('click', openStandaloneBlobWindow);
      document.getElementById('btn-modal-standalone-blob').addEventListener('click', openStandaloneBlobWindow);

      /* ---------------- NAVIGATION & COLLAPSIBLE RAIL ---------------- */
      var railEl = document.getElementById('rail');
      var railToggleBtn = document.getElementById('btn-rail-toggle');
      var railHideBtn = document.getElementById('btn-rail-hide');
      var railReopenBtn = document.getElementById('btn-rail-reopen');
      var mobileMenuBtn = document.getElementById('btn-mobile-menu');
      var currentView = 'browser';
      var railMode = safeLSGet('valem_rail_mode') || 'expanded';

      function applyRailMode(mode) {
        if (mode !== 'expanded' && mode !== 'compact' && mode !== 'hidden') {
          mode = 'expanded';
        }
        railMode = mode;
        safeLSSet('valem_rail_mode', mode);
        railEl.classList.toggle('compact', mode === 'compact');
        railEl.classList.toggle('hidden-rail', mode === 'hidden');
        if (railReopenBtn) railReopenBtn.classList.toggle('visible', mode === 'hidden');
        if (railToggleBtn) {
          railToggleBtn.setAttribute('aria-expanded', mode === 'expanded' ? 'true' : 'false');
          railToggleBtn.title = mode === 'expanded' ? 'Collapse Sidebar' : 'Expand Sidebar';
        }
        document.querySelectorAll('#sidebar-mode-pills .pill-btn').forEach(function (b) {
          b.classList.toggle('active', b.getAttribute('data-railmode') === mode);
        });
      }

      function switchView(viewId) {
        currentView = viewId;
        document.querySelectorAll('.view-panel').forEach(function (panel) {
          panel.classList.toggle('active', panel.id === 'view-' + viewId);
        });
        document.querySelectorAll('.rail-btn[data-view]').forEach(function (btn) {
          btn.classList.toggle('active', btn.getAttribute('data-view') === viewId);
        });
        railEl.classList.remove('mobile-open');
        if (viewId === 'books' && !booksLoadedOnce) {
          booksLoadedOnce = true;
          searchBooks('classic');
        }
        if (viewId === 'music' && !scLoadedOnce) {
          scLoadedOnce = true;
          setScUrl('https://soundcloud.com/lofi_girl');
        }
      }

      document.querySelectorAll('.rail-btn[data-view]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          switchView(btn.getAttribute('data-view'));
        });
      });

      railToggleBtn.addEventListener('click', function () {
        applyRailMode(railMode === 'compact' ? 'expanded' : 'compact');
      });

      if (railHideBtn) {
        railHideBtn.addEventListener('click', function () {
          applyRailMode('hidden');
        });
      }

      if (railReopenBtn) {
        railReopenBtn.addEventListener('click', function () {
          applyRailMode('expanded');
        });
      }

      mobileMenuBtn.addEventListener('click', function () {
        railEl.classList.toggle('mobile-open');
      });

      window.addEventListener('message', function (ev) {
        if (!ev || !ev.data) return;
        if (ev.data.type === 'valbrowse-panic') {
          triggerPanic();
        } else if (ev.data.type === 'valem-open-settings') {
          renderColorPresetsGrid();
          settingsModal.classList.add('open');
        } else if (ev.data.type === 'valem-layout-sync' && typeof ev.data.homeLayout === 'string') {
          var nextL = ev.data.homeLayout;
          if (nextL === 'split' || nextL === 'normal' || nextL === 'side' || nextL === 'minimal') {
            customSettings.homeLayout = nextL;
            safeLSSet('valem_custom_settings', JSON.stringify(customSettings));
            document.querySelectorAll('#home-layout-pills .pill-btn').forEach(function (b) {
              b.classList.toggle('active', b.getAttribute('data-homelayout') === nextL);
            });
          }
        } else if (ev.data.type === 'gn-switch-tab' && typeof ev.data.tab === 'string') {
          var targetTab = ev.data.tab === 'games' ? 'modules' : ev.data.tab;
          var allowed = { browser: 1, modules: 1, gnmath: 1, movies: 1, books: 1, music: 1 };
          if (allowed[targetTab]) {
            switchView(targetTab);
          }
        }
      });

      function openInValBrowse(url) {
        switchView('browser');
        var frame = document.getElementById('valbrowse-proxy-frame');
        if (frame && frame.contentWindow) {
          try {
            frame.contentWindow.postMessage({ type: 'omni-navigate', query: url, newTab: true }, '*');
          } catch (_e) {}
        }
      }

      /* ---------------- UNIFIED EULERPATH MODULES + GN-MATH CATALOGS ---------------- */
      var favorites = [];
      try {
        var rawFavs = safeLSGet('euler_favs') || safeLSGet('gn_favs');
        if (rawFavs) favorites = JSON.parse(rawFavs) || [];
      } catch (_e) {}

      function toggleFavorite(moduleId) {
        var idx = favorites.indexOf(moduleId);
        if (idx === -1) favorites.unshift(moduleId);
        else favorites.splice(idx, 1);
        safeLSSet('euler_favs', JSON.stringify(favorites));
        renderModulesGrid();
        renderGnGrid();
      }

      var gnZones = [];
      var ugsModules = CFG.fallbackUgs.slice();
      var ckvModules = CFG.fallbackCkv.slice();
      var mergedModules = [];
      var activeModuleFilter = 'all';
      var activePopularityPeriod = 'featured';
      var popularityMap = {};
      var gnZonesLoadedOnce = false;

      function normalizeKey(s) {
        return String(s || '').toLowerCase().replace(/[^a-z0-9]/g, '');
      }

      function rebuildMergedModules() {
        var seen = Object.create(null);
        var out = [];
        function addList(arr) {
          for (var i = 0; i < arr.length; i++) {
            var item = arr[i];
            if (!item || !item.name || !item.url) continue;
            var k = normalizeKey(item.name);
            if (k && seen[k]) continue;
            if (k) seen[k] = true;
            out.push(item);
          }
        }
        addList(gnZones);
        addList(ugsModules);
        addList(ckvModules);
        addList(CFG.staticModules);
        mergedModules = out;
        document.getElementById('modules-total-count').textContent = String(mergedModules.length);
        document.getElementById('badge-modules').textContent = String(mergedModules.length);
        document.getElementById('badge-gn').textContent = String(gnZones.length);
        renderModulesGrid();
        renderGnGrid();
      }

      async function fetchGnZones() {
        gnZonesLoadedOnce = true;
        var mirrors = [
          'https://cdn.jsdelivr.net/gh/freebuisness/assets@main/zones.json',
          'https://fastly.jsdelivr.net/gh/freebuisness/assets@main/zones.json',
          'https://gcore.jsdelivr.net/gh/freebuisness/assets@master/zones.json'
        ];
        for (var i = 0; i < mirrors.length; i++) {
          try {
            var res = await fetch(mirrors[i] + '?t=' + Date.now());
            if (!res.ok) continue;
            var json = await res.json();
            if (!Array.isArray(json)) continue;
            gnZones = json.filter(function (z) {
              return z && typeof z.id === 'number' && z.id >= 0 && typeof z.url === 'string' && z.url.indexOf('{HTML_URL}') !== -1 && !/discord\\.gg|suggest games/i.test(z.name || '');
            }).map(function (z, idx) {
              return {
                id: 'gn:' + z.id,
                numericId: z.id,
                provider: 'gn',
                name: String(z.name || 'Untitled').trim(),
                url: String(z.url).replace('{COVER_URL}', CFG.gnCoverUrl).replace('{HTML_URL}', CFG.gnHtmlUrl),
                baseUrl: CFG.gnHtmlUrl + '/',
                cover: z.cover ? String(z.cover).replace('{COVER_URL}', CFG.gnCoverUrl).replace('{HTML_URL}', CFG.gnHtmlUrl) : null,
                featured: Boolean(z.featured) || idx < 12
              };
            });
            rebuildMergedModules();
            return;
          } catch (_e) {}
        }
      }

      function createStudyCard(mod, hits) {
        var isFav = favorites.indexOf(mod.id) !== -1 || favorites.indexOf(mod.name) !== -1;
        var card = document.createElement('div');
        card.className = 'card';
        card.tabIndex = 0;
        card.setAttribute('role', 'button');
        card.onclick = function () { launchStudyModule(mod); };
        card.onkeydown = function (e) {
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); launchStudyModule(mod); }
        };

        var thumb = document.createElement('div');
        thumb.className = 'thumb-wrap';

        var fb = document.createElement('div');
        fb.className = 'thumb-fallback';
        fb.textContent = mod.name;
        thumb.appendChild(fb);

        if (mod.cover) {
          var img = document.createElement('img');
          img.src = mod.cover;
          img.alt = mod.name;
          img.loading = 'lazy';
          img.referrerPolicy = 'no-referrer';
          img.style.position = 'relative';
          img.style.zIndex = '2';
          img.onerror = function () { img.style.display = 'none'; };
          thumb.appendChild(img);
        }

        var prov = String(mod.provider || 'module');
        var chip = document.createElement('span');
        chip.className = 'provider-chip';
        chip.textContent = prov === 'gn' ? 'gn-math' : prov.toUpperCase();
        thumb.appendChild(chip);

        var favBtn = document.createElement('button');
        favBtn.type = 'button';
        favBtn.className = 'fav-btn' + (isFav ? ' is-fav' : '');
        favBtn.setAttribute('aria-label', 'Favorite ' + mod.name);
        favBtn.innerHTML = isFav ? '&#9733;' : '&#9734;';
        favBtn.onclick = function (e) {
          e.stopPropagation();
          toggleFavorite(mod.id);
        };
        thumb.appendChild(favBtn);

        var body = document.createElement('div');
        body.className = 'card-body';
        var title = document.createElement('div');
        title.className = 'card-title';
        title.textContent = mod.name;
        var meta = document.createElement('div');
        meta.className = 'card-meta';
        meta.textContent = (mod.category || (mod.numericId ? '#' + mod.numericId : prov.toUpperCase())) + (hits ? ' · ' + hits.toLocaleString() + ' plays' : '');
        body.appendChild(title);
        body.appendChild(meta);

        card.appendChild(thumb);
        card.appendChild(body);
        return card;
      }

      function renderModulesGrid() {
        var grid = document.getElementById('modules-grid');
        if (!grid) return;
        var q = (document.getElementById('modules-search').value || '').trim().toLowerCase();
        var sort = document.getElementById('modules-sort').value;
        var list = mergedModules.filter(function (m) {
          if (activeModuleFilter === 'favorites') {
            if (favorites.indexOf(m.id) === -1 && favorites.indexOf(m.name) === -1) return false;
          } else if (activeModuleFilter !== 'all' && m.provider !== activeModuleFilter) {
            return false;
          }
          if (q && m.name.toLowerCase().indexOf(q) === -1 && String(m.category || '').toLowerCase().indexOf(q) === -1) return false;
          return true;
        });

        list.sort(function (a, b) {
          if (sort === 'az') return a.name.localeCompare(b.name);
          if (sort === 'za') return b.name.localeCompare(a.name);
          if (sort === 'popular') {
            var ah = typeof a.numericId === 'number' ? (popularityMap[a.numericId] || -1) : -1;
            var bh = typeof b.numericId === 'number' ? (popularityMap[b.numericId] || -1) : -1;
            if (ah !== bh) return bh - ah;
          }
          return Number(b.featured) - Number(a.featured) || a.name.localeCompare(b.name);
        });

        grid.innerHTML = '';
        list.slice(0, 150).forEach(function (m) {
          var hits = typeof m.numericId === 'number' ? popularityMap[m.numericId] : 0;
          grid.appendChild(createStudyCard(m, hits));
        });
      }

      function renderGnGrid() {
        var grid = document.getElementById('gn-grid');
        if (!grid) return;
        var q = (document.getElementById('gn-search').value || '').trim().toLowerCase();
        var list = gnZones.filter(function (m) {
          return !q || m.name.toLowerCase().indexOf(q) !== -1;
        });
        list.sort(function (a, b) {
          if (activePopularityPeriod === 'az') return a.name.localeCompare(b.name);
          if (activePopularityPeriod === 'newest') return Number(b.numericId || 0) - Number(a.numericId || 0);
          if (activePopularityPeriod === 'classic') return Number(a.numericId || 0) - Number(b.numericId || 0);
          return Number(b.featured) - Number(a.featured) || Number(a.numericId || 0) - Number(b.numericId || 0);
        });
        grid.innerHTML = '';
        if (list.length === 0) {
          var empty = document.createElement('div');
          empty.className = 'sub';
          empty.textContent = 'Syncing gn-math zones.json...';
          grid.appendChild(empty);
          return;
        }
        list.slice(0, 120).forEach(function (m) {
          var hits = typeof m.numericId === 'number' ? popularityMap[m.numericId] : 0;
          grid.appendChild(createStudyCard(m, hits));
        });
      }

      document.querySelectorAll('#modules-filter-pills .pill-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
          activeModuleFilter = btn.getAttribute('data-mfilter');
          document.querySelectorAll('#modules-filter-pills .pill-btn').forEach(function (b) {
            b.classList.toggle('active', b === btn);
          });
          renderModulesGrid();
        });
      });

      document.getElementById('modules-search').addEventListener('input', renderModulesGrid);
      document.getElementById('modules-sort').addEventListener('change', renderModulesGrid);
      document.getElementById('btn-refresh-modules').addEventListener('click', fetchGnZones);
      document.getElementById('gn-search').addEventListener('input', renderGnGrid);

      document.querySelectorAll('#gn-period-pills .pill-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
          activePopularityPeriod = btn.getAttribute('data-period') || 'featured';
          document.querySelectorAll('#gn-period-pills .pill-btn').forEach(function (b) {
            b.classList.toggle('active', b === btn);
          });
          renderGnGrid();
        });
      });

      /* ---------------- STUDY MODULE OVERLAY PLAYER (AD-BLOCKED + ESC PANIC) ---------------- */
      var SRC_RES = CFG.srcBlocklist.map(function (p) { return new RegExp(p.source, p.flags); });
      var INLINE_RES = CFG.inlineBlocklist.map(function (p) { return new RegExp(p.source, p.flags); });
      var ESCAPE_INJECT = '<script data-vb-panic="1">(function(){if(window.__vbEsc)return;window.__vbEsc=true;window.addEventListener("keydown",function(e){if(e&&e.key==="Escape"){try{window.parent.postMessage({type:"valbrowse-panic"},"*");}catch(_e){}try{if(window.top)window.top.location.replace(' + JSON.stringify(CFG.panicUrl) + ');}catch(_e){}}},true);})();<\\/script>';

      var activeModuleObj = null;
      var moduleOverlay = document.getElementById('module-overlay');
      var moduleFrame = document.getElementById('module-ov-frame');
      var moduleStatus = document.getElementById('module-ov-status');
      var moduleMsg = document.getElementById('module-ov-msg');
      var moduleSpinner = document.getElementById('module-ov-spinner');

      function getBaseDir(url) {
        var c = String(url || '').split('#')[0].split('?')[0];
        var idx = c.lastIndexOf('/');
        return idx === -1 ? c + '/' : c.slice(0, idx + 1);
      }

      function sanitizeAndInjectHtml(rawHtml, sourceUrl) {
        var html = rawHtml || '';
        html = html.replace(/<template\\b[^>]*data-ad-rail-template[^>]*>[\\s\\S]*?<\\/template>/gi, '');
        html = html.replace(/<ins\\b[^>]*class=["'][^"']*adsbygoogle[^"']*["'][^>]*>[\\s\\S]*?<\\/ins>/gi, '');
        html = html.replace(/<iframe\\b[^>]*src=["']([^"']+)["'][^>]*>[\\s\\S]*?<\\/iframe>/gi, function (m, s) {
          return SRC_RES.some(function (re) { return re.test(s); }) ? '' : m;
        });
        html = html.replace(/<script\\b([^>]*)>([\\s\\S]*?)<\\/script>/gi, function (full, attrs, body) {
          var sm = attrs.match(/\\bsrc\\s*=\\s*["']([^"']+)["']/i);
          if (sm && sm[1]) return SRC_RES.some(function (re) { return re.test(sm[1]); }) ? '' : full;
          if (body && INLINE_RES.some(function (re) { return re.test(body); })) return '';
          return full;
        });
        var baseTag = /<base\\b[^>]*href=/i.test(html) ? '' : ('<base href="' + getBaseDir(sourceUrl) + '">');
        var inj = baseTag + '\\n' + CFG.adPrelude + '\\n' + ESCAPE_INJECT + '\\n';
        if (/<head\\b[^>]*>/i.test(html)) {
          return html.replace(/(<head\\b[^>]*>)/i, '$1\\n' + inj);
        }
        return '<!DOCTYPE html><html><head>' + inj + '</head><body>' + html + '</body></html>';
      }

      function buildMirrorUrls(url) {
        var out = [url];
        var m = String(url || '').match(/^https?:\\/\\/(?:cdn|fastly|gcore)\\.jsdelivr\\.net\\/gh\\/([^/]+)\\/([^/@]+)(?:@([^/]+))?\\/(.+)$/i);
        if (m) {
          out.push('https://fastly.jsdelivr.net/gh/' + m[1] + '/' + m[2] + '@' + (m[3] || 'main') + '/' + m[4]);
          out.push('https://raw.githubusercontent.com/' + m[1] + '/' + m[2] + '/' + (m[3] || 'main') + '/' + m[4]);
          out.push('https://rawcdn.githack.com/' + m[1] + '/' + m[2] + '/' + (m[3] || 'main') + '/' + m[4]);
        }
        return out;
      }

      async function launchStudyModule(moduleItem) {
        activeModuleObj = moduleItem;
        moduleOverlay.classList.add('open');
        document.getElementById('module-ov-provider').textContent = String(moduleItem.provider || 'module').toUpperCase();
        document.getElementById('module-ov-title').textContent = moduleItem.name;
        moduleStatus.classList.add('open');
        moduleSpinner.style.display = 'block';
        moduleMsg.textContent = 'Loading ' + moduleItem.name + ' (ads blocked)...';
        moduleFrame.removeAttribute('src');
        moduleFrame.removeAttribute('srcdoc');

        var mirrors = buildMirrorUrls(moduleItem.url);
        for (var i = 0; i < mirrors.length; i++) {
          try {
            var res = await fetch(mirrors[i]);
            if (!res.ok) continue;
            var txt = await res.text();
            if (!txt || txt.length < 40) continue;
            if (activeModuleObj !== moduleItem) return;
            moduleFrame.onload = function () { moduleStatus.classList.remove('open'); };
            moduleFrame.srcdoc = sanitizeAndInjectHtml(txt, moduleItem.baseUrl || moduleItem.url);
            return;
          } catch (_e) {}
        }
        moduleSpinner.style.display = 'none';
        moduleMsg.textContent = 'Unable to fetch module package directly — click Open in VALem to load via Scramjet proxy.';
      }

      document.getElementById('module-ov-close').addEventListener('click', function () {
        activeModuleObj = null;
        moduleFrame.removeAttribute('srcdoc');
        moduleFrame.removeAttribute('src');
        moduleOverlay.classList.remove('open');
      });
      document.getElementById('module-ov-reload').addEventListener('click', function () {
        if (activeModuleObj) launchStudyModule(activeModuleObj);
      });
      document.getElementById('module-ov-proxy').addEventListener('click', function () {
        if (activeModuleObj) {
          var u = activeModuleObj.url;
          document.getElementById('module-ov-close').click();
          openInValBrowse(u);
        }
      });
      document.getElementById('module-ov-fs').addEventListener('click', function () {
        var st = document.getElementById('module-ov-stage');
        if (document.fullscreenElement) document.exitFullscreen().catch(function () {});
        else if (st.requestFullscreen) st.requestFullscreen().catch(function () {});
      });

      /* ---------------- AUTHENTIC GN-MATH SCRIPT TAB ---------------- */
      var gnScriptLoaded = false;
      async function loadGnScript(force) {
        if (gnScriptLoaded && !force) return;
        var st = document.getElementById('gn-script-status');
        st.textContent = 'Loading authentic gn-math portal script...';
        for (var i = 0; i < CFG.gnScriptUrls.length; i++) {
          try {
            var res = await fetch(CFG.gnScriptUrls[i] + '?t=' + Date.now());
            if (!res.ok) continue;
            var html = await res.text();
            if (!html || html.length < 200) continue;
            var frame = document.getElementById('gn-script-frame');
            frame.srcdoc = sanitizeAndInjectHtml(html, 'https://cdn.jsdelivr.net/gh/gn-math/gn-math.github.io@main/');
            st.textContent = 'Source: cdn.jsdelivr.net/gh/gn-math/gn-math.github.io@main/index.html';
            gnScriptLoaded = true;
            return;
          } catch (_e) {}
        }
        st.textContent = 'Unable to reach jsDelivr right now — click Open in VALem to proxy gn-math.';
      }

      document.getElementById('gn-tab-zones').addEventListener('click', function () {
        this.classList.add('active');
        document.getElementById('gn-tab-script').classList.remove('active');
        document.getElementById('gn-zones-pane').style.display = 'flex';
        document.getElementById('gn-script-pane').style.display = 'none';
      });

      document.getElementById('gn-tab-script').addEventListener('click', function () {
        this.classList.add('active');
        document.getElementById('gn-tab-zones').classList.remove('active');
        document.getElementById('gn-zones-pane').style.display = 'none';
        document.getElementById('gn-script-pane').style.display = 'flex';
        loadGnScript(false);
      });

      document.getElementById('gn-reload-script').addEventListener('click', function () { loadGnScript(true); });
      document.getElementById('gn-open-proxy').addEventListener('click', function () {
        openInValBrowse('https://cdn.jsdelivr.net/gh/gn-math/gn-math.github.io@main/index.html');
      });

      /* ---------------- MOVIES & TV (TVMAZE + ARCHIVE.ORG + OPTIONAL TMDB) ---------------- */
      var movieGenre = 'all';
      var activeMovieObj = null;
      var activeMovieEpisodes = [];
      var activeSelectedEpisode = null;
      var tvMazeShowsCache = Array.isArray(CFG.cinemaFallbackShows) ? CFG.cinemaFallbackShows.slice() : [];
      var archiveMoviesCache = Array.isArray(CFG.cinemaFallbackMovies) ? CFG.cinemaFallbackMovies.slice() : [];
      var tmdbMoviesCache = [];
      var cinemaSearchResults = null;
      var cinemaLiveFetched = false;

      function stripHtmlClient(raw) {
        return String(raw || '')
          .replace(/<\\/?(?:b|i|em|strong|span|u)\\b[^>]*>/gi, '')
          .replace(/<[^>]+>/g, ' ')
          .replace(/&nbsp;/gi, ' ')
          .replace(/&amp;/gi, '&')
          .replace(/&quot;/gi, '"')
          .replace(/&#39;/gi, "'")
          .replace(/\\s+/g, ' ')
          .replace(/\\s+([.,!?;:])/g, '$1')
          .trim();
      }

      function mapGenresClient(genres, source, showType, lang, rating) {
        var tags = ['all'];
        if (source === 'archive') tags.push('public-domain');
        if (source === 'tmdb' || (typeof rating === 'number' && rating >= 7.8)) tags.push('trending');
        var gs = (genres || []).map(function (g) { return String(g || '').toLowerCase(); });
        var st = String(showType || '').toLowerCase();
        var ln = String(lang || '').toLowerCase();
        if (gs.some(function (g) { return g.indexOf('action') !== -1 || g.indexOf('adventure') !== -1 || g.indexOf('thriller') !== -1; })) tags.push('action');
        if (gs.some(function (g) { return g.indexOf('science-fiction') !== -1 || g.indexOf('sci-fi') !== -1 || g.indexOf('fantasy') !== -1; })) tags.push('sci-fi');
        if (gs.some(function (g) { return g.indexOf('comedy') !== -1; })) tags.push('comedy');
        if (gs.some(function (g) { return g.indexOf('anime') !== -1; }) || (st.indexOf('animation') !== -1 && ln === 'japanese')) tags.push('anime');
        return tags;
      }

      function normalizeTvMazeClient(show) {
        if (!show || !show.id || !show.name) return null;
        var genres = Array.isArray(show.genres) ? show.genres : [];
        var rating = show.rating && typeof show.rating.average === 'number' ? show.rating.average : null;
        var ym = String(show.premiered || '').match(/^(\\d{4})/);
        var net = (show.network && show.network.name) || (show.webChannel && show.webChannel.name) || 'TV Network';
        return {
          id: 'tvmaze:' + show.id,
          externalId: String(show.id),
          source: 'tvmaze',
          title: String(show.name).trim(),
          year: ym ? ym[1] : '',
          rating: rating,
          genres: genres,
          categoryTags: mapGenresClient(genres, 'tvmaze', show.type, show.language, rating),
          summary: stripHtmlClient(show.summary) || 'No synopsis available.',
          poster: (show.image && (show.image.medium || show.image.original)) || null,
          backdrop: (show.image && (show.image.original || show.image.medium)) || null,
          networkOrStudio: net,
          cast: [],
          embedUrl: '',
          watchPageUrl: (show.officialSite && String(show.officialSite).trim()) || ('https://www.tvmaze.com/shows/' + show.id),
          isFullMovie: false,
          imdbId: show.externals && show.externals.imdb ? String(show.externals.imdb).trim() : null
        };
      }

      function normalizeArchiveClient(doc) {
        if (!doc || !doc.identifier) return null;
        var id = String(doc.identifier).trim();
        var title = Array.isArray(doc.title) ? String(doc.title[0] || id).trim() : String(doc.title || id).trim();
        var desc = stripHtmlClient(Array.isArray(doc.description) ? doc.description[0] : doc.description) || 'Complete legal public-domain feature film on Internet Archive.';
        var yr = Array.isArray(doc.year) ? doc.year[0] : doc.year;
        var low = (title + ' ' + desc).toLowerCase();
        var tags = ['all', 'public-domain'];
        var genres = ['Public Domain'];
        if (/comedy|keaton|chaplin|friday/.test(low)) { genres.push('Comedy'); tags.push('comedy'); }
        if (/sci-fi|space|living dead|plan 9|superman|scientist/.test(low)) { genres.push('Sci-Fi'); tags.push('sci-fi'); }
        if (/action|adventure|general|war|western/.test(low)) { genres.push('Action'); tags.push('action'); }
        return {
          id: 'archive:' + id,
          externalId: id,
          source: 'archive',
          title: title,
          year: yr ? String(yr).slice(0, 4) : '',
          rating: null,
          genres: genres,
          categoryTags: tags,
          summary: desc,
          poster: 'https://archive.org/services/img/' + encodeURIComponent(id),
          backdrop: 'https://archive.org/services/img/' + encodeURIComponent(id),
          networkOrStudio: 'Internet Archive Cinema',
          cast: ['Public Domain Feature'],
          embedUrl: 'https://archive.org/embed/' + encodeURIComponent(id),
          watchPageUrl: 'https://archive.org/details/' + encodeURIComponent(id),
          isFullMovie: true
        };
      }

      function normalizeTmdbClient(m) {
        if (!m || !m.id || !(m.title || m.name)) return null;
        var rel = String(m.release_date || m.first_air_date || '');
        var rating = typeof m.vote_average === 'number' && m.vote_average > 0 ? Number(m.vote_average.toFixed(1)) : null;
        return {
          id: 'tmdb:' + m.id,
          externalId: String(m.id),
          source: 'tmdb',
          title: String(m.title || m.name).trim(),
          year: rel ? rel.slice(0, 4) : '',
          rating: rating,
          genres: ['TMDB Trending'],
          categoryTags: ['all', 'trending'],
          summary: String(m.overview || '').trim() || 'Trending TMDB movie.',
          poster: m.poster_path ? ('https://image.tmdb.org/t/p/w500' + m.poster_path) : null,
          backdrop: m.backdrop_path ? ('https://image.tmdb.org/t/p/w780' + m.backdrop_path) : null,
          networkOrStudio: 'TMDB',
          cast: [],
          embedUrl: '',
          watchPageUrl: 'https://www.themoviedb.org/movie/' + m.id,
          isFullMovie: false
        };
      }

      function getActiveCinemaPool() {
        if (Array.isArray(cinemaSearchResults)) return cinemaSearchResults;
        var combined = [];
        var seen = {};
        function pushUnique(arr) {
          (arr || []).forEach(function (item) {
            if (!item || seen[item.id]) return;
            seen[item.id] = true;
            combined.push(item);
          });
        }
        if (movieGenre === 'public-domain') {
          pushUnique(archiveMoviesCache);
        } else {
          pushUnique(tmdbMoviesCache);
          pushUnique(tvMazeShowsCache);
          pushUnique(archiveMoviesCache);
        }
        return combined;
      }

      function renderMoviesFiltered() {
        var grid = document.getElementById('movies-grid');
        if (!grid) return;
        var q = (document.getElementById('movies-query').value || '').trim().toLowerCase();
        var pool = getActiveCinemaPool();
        var list = pool.filter(function (m) {
          if (movieGenre !== 'all' && (!m.categoryTags || m.categoryTags.indexOf(movieGenre) === -1)) return false;
          if (q && !Array.isArray(cinemaSearchResults)) {
            var hay = (m.title + ' ' + m.summary + ' ' + (m.genres || []).join(' ') + ' ' + m.networkOrStudio).toLowerCase();
            if (hay.indexOf(q) === -1) return false;
          }
          return true;
        });

        grid.innerHTML = '';
        if (list.length === 0) {
          var empty = document.createElement('div');
          empty.className = 'sub';
          empty.textContent = 'No titles matched this filter. Try searching TVMaze or switching to All / Full Public-Domain Movies.';
          grid.appendChild(empty);
          return;
        }

        list.slice(0, 60).forEach(function (m) {
          var card = document.createElement('div');
          card.className = 'card';
          card.setAttribute('data-cinema-id', m.id);
          card.onclick = function () { openMovie(m); };

          var thumb = document.createElement('div');
          thumb.className = 'cinema-poster-wrap';

          var srcChip = document.createElement('span');
          srcChip.className = 'provider-chip';
          srcChip.textContent = m.source === 'archive' ? 'FULL MOVIE' : (m.source === 'tmdb' ? 'TMDB' : 'TVMAZE');
          thumb.appendChild(srcChip);

          if (typeof m.rating === 'number') {
            var rChip = document.createElement('span');
            rChip.className = 'rating-chip';
            rChip.textContent = '★ ' + m.rating.toFixed(1);
            thumb.appendChild(rChip);
          }

          var fb = document.createElement('div');
          fb.className = 'thumb-fallback';
          fb.textContent = m.title;
          thumb.appendChild(fb);

          if (m.poster) {
            var img = document.createElement('img');
            img.src = m.poster;
            img.alt = m.title;
            img.loading = 'lazy';
            img.referrerPolicy = 'no-referrer';
            img.style.position = 'relative';
            img.style.zIndex = '2';
            img.onerror = function () { img.style.display = 'none'; };
            thumb.appendChild(img);
          }

          var body = document.createElement('div');
          body.className = 'card-body';
          var t = document.createElement('div');
          t.className = 'card-title';
          t.textContent = m.title;
          var d = document.createElement('div');
          d.className = 'card-meta';
          d.textContent = (m.year ? m.year + ' · ' : '') + ((m.genres && m.genres.slice(0, 2).join(', ')) || m.networkOrStudio);
          body.appendChild(t);
          body.appendChild(d);

          card.appendChild(thumb);
          card.appendChild(body);
          grid.appendChild(card);
        });

        var statusEl = document.getElementById('movies-status');
        if (statusEl && cinemaLiveFetched) {
          statusEl.textContent = 'Showing ' + Math.min(list.length, 60) + ' of ' + list.length + ' titles';
        }
      }

      async function loadCinemaLiveCatalog() {
        var statusEl = document.getElementById('movies-status');
        if (statusEl) statusEl.textContent = 'Syncing TVMaze + Internet Archive cinema...';
        var tmdbKey = (safeLSGet('valem_tmdb_api_key') || '').trim();

        var tasks = [
          fetch(CFG.tvmazeShowsUrl).then(function (r) { return r.ok ? r.json() : null; }).catch(function () { return null; }),
          fetch(CFG.archiveFeatureFilmsUrl).then(function (r) { return r.ok ? r.json() : null; }).catch(function () { return null; }),
          tmdbKey
            ? fetch('https://api.themoviedb.org/3/trending/movie/week?api_key=' + encodeURIComponent(tmdbKey)).then(function (r) { return r.ok ? r.json() : null; }).catch(function () { return null; })
            : Promise.resolve(null)
        ];

        var results = await Promise.all(tasks);
        if (Array.isArray(results[0]) && results[0].length > 0) {
          tvMazeShowsCache = results[0].slice(0, 72).map(normalizeTvMazeClient).filter(Boolean);
        }
        if (results[1] && results[1].response && Array.isArray(results[1].response.docs) && results[1].response.docs.length > 0) {
          var liveArchive = results[1].response.docs.map(normalizeArchiveClient).filter(Boolean);
          archiveMoviesCache = liveArchive.concat(CFG.cinemaFallbackMovies || []).filter(function (item, idx, arr) {
            return arr.findIndex(function (x) { return x.id === item.id; }) === idx;
          });
        }
        if (results[2] && Array.isArray(results[2].results)) {
          tmdbMoviesCache = results[2].results.slice(0, 24).map(normalizeTmdbClient).filter(Boolean);
        } else {
          tmdbMoviesCache = [];
        }
        cinemaLiveFetched = true;
        renderMoviesFiltered();
      }

      var activePlayerSource = 'archive';
      var activePlayerSources = { trailer: '', archive: '', custom: '' };

      function normalizeDirectEmbedUrlClient(rawUrl) {
        var trimmed = String(rawUrl || '').trim();
        var scramIdx = trimmed.indexOf('/scram/');
        if (scramIdx !== -1) {
          var after = trimmed.slice(scramIdx + 7);
          try {
            var dec = decodeURIComponent(after);
            if (/^https?:\\/\\//i.test(dec)) trimmed = dec;
          } catch (_e) {
            if (/^https?:\\/\\//i.test(after)) trimmed = after;
          }
        }
        if (!trimmed || /^(javascript|data|vbscript|file):/i.test(trimmed)) return '';
        var withProto = /^https?:\\/\\//i.test(trimmed) ? trimmed : ('https://' + trimmed);
        try {
          var parsed = new URL(withProto);
          if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') return '';
          var host = parsed.hostname.toLowerCase().replace(/^www\\./, '');
          var ytId = '';
          if (host === 'youtu.be') {
            ytId = parsed.pathname.replace(/^\\/+/, '').split('/')[0] || '';
          } else if (host === 'youtube.com' || host === 'm.youtube.com' || host === 'youtube-nocookie.com') {
            if (parsed.pathname === '/watch') {
              ytId = parsed.searchParams.get('v') || '';
            } else {
              var ym = parsed.pathname.match(/^\\/(?:embed|shorts|live)\\/([^\\/?#]+)/);
              if (ym && ym[1]) ytId = ym[1];
            }
          }
          if (ytId) {
            return 'https://www.youtube-nocookie.com/embed/' + encodeURIComponent(ytId) + '?autoplay=1&rel=0';
          }
          if (host === 'archive.org') {
            var am = parsed.pathname.match(/^\\/(?:details|embed)\\/([^\\/?#]+)/);
            if (am && am[1]) {
              return 'https://archive.org/embed/' + encodeURIComponent(decodeURIComponent(am[1]));
            }
          }
          if (host === 'vimeo.com') {
            var vm = parsed.pathname.match(/^\\/(\\d+)/);
            if (vm && vm[1]) {
              return 'https://player.vimeo.com/video/' + vm[1];
            }
          }
          if (host === 'dailymotion.com' || host === 'dai.ly' || host === 'geo.dailymotion.com') {
            if (host === 'dai.ly') {
              var dmShort = parsed.pathname.replace(/^\\/+/, '').split('/')[0];
              if (dmShort) return 'https://www.dailymotion.com/embed/video/' + encodeURIComponent(dmShort) + '?autoplay=1';
            }
            if (host === 'geo.dailymotion.com') {
              var vidParam = parsed.searchParams.get('video');
              if (vidParam) return 'https://www.dailymotion.com/embed/video/' + encodeURIComponent(vidParam) + '?autoplay=1';
            }
            var dmm = parsed.pathname.match(/^\\/(?:embed\\/)?video\\/([^\\/?#_]+)/);
            if (dmm && dmm[1]) {
              return 'https://www.dailymotion.com/embed/video/' + encodeURIComponent(dmm[1]) + '?autoplay=1';
            }
          }
          return parsed.toString();
        } catch (_e) {
          return '';
        }
      }

      function pickBestArchiveMovieIdClient(docs, showTitle) {
        if (!Array.isArray(docs) || docs.length === 0) return null;
        var cleanTitle = String(showTitle || '').toLowerCase().trim();
        var bestId = null;
        var bestScore = -999;
        for (var i = 0; i < docs.length; i++) {
          var d = docs[i];
          if (!d || !d.identifier) continue;
          var id = String(d.identifier).trim();
          var rawTitle = Array.isArray(d.title) ? d.title[0] : d.title;
          var t = String(rawTitle || id).toLowerCase();
          var lowId = id.toLowerCase();
          var score = 0;
          if (cleanTitle && t.indexOf(cleanTitle) !== -1) score += 6;
          if (/trailer|promo|teaser|intro|clip|episode|feature|film|movie/.test(t)) score += 4;
          if (lowId.indexOf('youtube-') === 0 || t.indexOf('video') !== -1) score += 1;
          if (/podcast|soundtrack|score|audio|mp3|radio|coptx-/.test(lowId + ' ' + t)) score -= 10;
          if (/essay|review|disaster|promotes|violence|explained|analysis|reaction|debate/.test(t)) score -= 6;
          if (score > bestScore) {
            bestScore = score;
            bestId = id;
          }
        }
        return bestId;
      }

      function syncSourceSwitcherUi(mode) {
        activePlayerSource = mode;
        document.querySelectorAll('#cinema-source-switcher [data-player-source]').forEach(function (btn) {
          btn.classList.toggle('active', btn.getAttribute('data-player-source') === mode);
        });
      }

      function syncNewTabPlayerLinks(candidateUrl) {
        var fallbackSearch = activeMovieObj
          ? (activeMovieObj.watchPageUrl || ('https://www.youtube.com/results?search_query=' + encodeURIComponent(activeMovieObj.title + ' trailer')))
          : 'https://archive.org';
        var href = String(candidateUrl || '').trim() || fallbackSearch;
        var topLink = document.getElementById('cinema-open-new-tab');
        var fbLink = document.getElementById('cinema-fallback-new-tab');
        if (topLink) topLink.href = href;
        if (fbLink) fbLink.href = href;
      }

      function setTheaterIframeUrl(url, fallbackTitle, fallbackMsg) {
        var ifr = document.getElementById('cinema-player-frame');
        var fb = document.getElementById('cinema-player-fallback');
        var embedIn = document.getElementById('cinema-embed-input');
        var cleanUrl = normalizeDirectEmbedUrlClient(url);
        if (embedIn && cleanUrl) embedIn.value = cleanUrl;
        syncNewTabPlayerLinks(cleanUrl);
        if (!cleanUrl) {
          ifr.removeAttribute('src');
          document.getElementById('cinema-fallback-title').textContent = fallbackTitle || 'No direct embed stream selected';
          document.getElementById('cinema-fallback-msg').textContent = fallbackMsg || 'Use Internet Archive for full public-domain streams, paste a custom embed URL below, or click Open Player in New Tab.';
          fb.classList.add('open');
          return;
        }
        fb.classList.remove('open');
        ifr.setAttribute('allow', 'autoplay; fullscreen; encrypted-media; picture-in-picture');
        ifr.setAttribute('allowfullscreen', '');
        ifr.setAttribute('referrerpolicy', 'no-referrer');
        ifr.removeAttribute('sandbox');
        ifr.onerror = function () {
          document.getElementById('cinema-fallback-title').textContent = 'External embed blocked or unavailable';
          document.getElementById('cinema-fallback-msg').textContent = 'This host may block iframe embedding via X-Frame-Options. Click "Open Player in New Tab" or switch Player Source above.';
          fb.classList.add('open');
        };
        ifr.src = cleanUrl;
      }

      async function selectPlayerSource(mode) {
        syncSourceSwitcherUi(mode);
        if (!activeMovieObj) return;
        var m = activeMovieObj;

        if (mode === 'custom') {
          var embedIn = document.getElementById('cinema-embed-input');
          var rawIn = (embedIn && embedIn.value ? embedIn.value : '').trim();
          var candidate = activePlayerSources.custom || normalizeDirectEmbedUrlClient(rawIn);
          if (candidate) {
            activePlayerSources.custom = candidate;
            setTheaterIframeUrl(candidate);
          } else {
            setTheaterIframeUrl(
              '',
              'Paste a Custom Embed URL below',
              'Supports direct YouTube, youtube-nocookie, Archive.org, Vimeo, or custom embed URLs (never routed through /scram/).'
            );
            if (embedIn) embedIn.focus();
          }
          return;
        }

        if (mode === 'archive') {
          if (activePlayerSources.archive) {
            setTheaterIframeUrl(activePlayerSources.archive);
            return;
          }
          setTheaterIframeUrl('', 'Searching Internet Archive for "' + m.title + '"...', 'Looking up public-domain Archive.org embed stream...');
          try {
            var queries = [
              'title:("' + m.title + '") AND mediatype:(movies)',
              'title:(' + m.title + ') AND mediatype:(movies)',
              '("' + m.title + '") AND mediatype:(movies)'
            ];
            for (var qi = 0; qi < queries.length; qi++) {
              var arcRes = await fetch('https://archive.org/advancedsearch.php?q=' + encodeURIComponent(queries[qi]) + '&fl[]=identifier,title&rows=10&output=json');
              if (arcRes.ok && activeMovieObj === m) {
                var arcJson = await arcRes.json();
                var docs = (arcJson && arcJson.response && Array.isArray(arcJson.response.docs)) ? arcJson.response.docs : [];
                var pickedId = pickBestArchiveMovieIdClient(docs, m.title);
                if (pickedId) {
                  var foundUrl = 'https://archive.org/embed/' + encodeURIComponent(pickedId);
                  activePlayerSources.archive = foundUrl;
                  if (activePlayerSource === 'archive') setTheaterIframeUrl(foundUrl);
                  return;
                }
              }
            }
          } catch (_e) {}
          if (activeMovieObj === m && activePlayerSource === 'archive') {
            setTheaterIframeUrl(
              '',
              'No public-domain Internet Archive stream matched "' + m.title + '"',
              'Switch to Trailer or Custom Embed URL above, or click Open Player in New Tab.'
            );
          }
          return;
        }

        // Trailer mode: try TMDB (if key present), then Internet Archive video stream (zero 403/no-referrer issues), then /api/cinema/trailer fallback
        if (activePlayerSources.trailer) {
          setTheaterIframeUrl(activePlayerSources.trailer);
          return;
        }
        setTheaterIframeUrl('', 'Loading video stream for "' + m.title + '"...', 'Resolving playable theater embed...');
        var tmdbKey = (safeLSGet('valem_tmdb_api_key') || '').trim();
        if (tmdbKey) {
          try {
            var tmdbVidEndpoint = '';
            if (m.source === 'tmdb') {
              tmdbVidEndpoint = 'https://api.themoviedb.org/3/movie/' + encodeURIComponent(m.externalId) + '/videos?api_key=' + encodeURIComponent(tmdbKey);
            } else {
              var sr = await fetch('https://api.themoviedb.org/3/search/tv?query=' + encodeURIComponent(m.title) + '&api_key=' + encodeURIComponent(tmdbKey));
              if (sr.ok) {
                var srJson = await sr.json();
                var firstMatch = srJson && Array.isArray(srJson.results) ? srJson.results[0] : null;
                if (firstMatch && firstMatch.id) {
                  tmdbVidEndpoint = 'https://api.themoviedb.org/3/tv/' + encodeURIComponent(firstMatch.id) + '/videos?api_key=' + encodeURIComponent(tmdbKey);
                }
              }
            }
            if (tmdbVidEndpoint) {
              var vRes = await fetch(tmdbVidEndpoint);
              if (vRes.ok && activeMovieObj === m) {
                var vJson = await vRes.json();
                var vids = Array.isArray(vJson && vJson.results) ? vJson.results : [];
                var tr = vids.find(function (v) { return v.site === 'YouTube' && v.type === 'Trailer' && v.key; }) ||
                         vids.find(function (v) { return v.site === 'YouTube' && v.key; });
                if (tr) {
                  var ytUrl = 'https://www.youtube-nocookie.com/embed/' + encodeURIComponent(tr.key) + '?autoplay=1&rel=0';
                  activePlayerSources.trailer = ytUrl;
                  if (activePlayerSource === 'trailer') setTheaterIframeUrl(ytUrl);
                  return;
                }
              }
            }
          } catch (_e) {}
        }

        // Lookup matching video/trailer clip on Internet Archive (embeds reliably with referrerpolicy="no-referrer")
        try {
          var arcTrailerQueries = [
            'title:(' + m.title + ') AND mediatype:(movies)',
            '("' + m.title + '") AND mediatype:(movies)'
          ];
          for (var ati = 0; ati < arcTrailerQueries.length; ati++) {
            var fbArcRes = await fetch('https://archive.org/advancedsearch.php?q=' + encodeURIComponent(arcTrailerQueries[ati]) + '&fl[]=identifier,title&rows=10&output=json');
            if (fbArcRes.ok && activeMovieObj === m) {
              var fbArcJson = await fbArcRes.json();
              var fbDocs = (fbArcJson && fbArcJson.response && Array.isArray(fbArcJson.response.docs)) ? fbArcJson.response.docs : [];
              var bestArcId = pickBestArchiveMovieIdClient(fbDocs, m.title);
              if (bestArcId) {
                var fbArcUrl = 'https://archive.org/embed/' + encodeURIComponent(bestArcId);
                activePlayerSources.archive = fbArcUrl;
                activePlayerSources.trailer = fbArcUrl;
                if (activePlayerSource === 'trailer') setTheaterIframeUrl(fbArcUrl);
                return;
              }
            }
          }
        } catch (_e) {}

        // Server-side trailer ID fallback (sets both iframe & Open Player in New Tab URL)
        try {
          if (CFG.originUrl && /^https?:/i.test(CFG.originUrl)) {
            var srvRes = await fetch(CFG.originUrl + '/api/cinema/trailer?q=' + encodeURIComponent(m.title + (m.year ? ' ' + m.year : '') + ' official trailer'));
            if (srvRes.ok && activeMovieObj === m) {
              var srvJson = await srvRes.json();
              if (srvJson && srvJson.embedUrl) {
                activePlayerSources.trailer = srvJson.embedUrl;
                if (activePlayerSource === 'trailer') {
                  setTheaterIframeUrl(srvJson.embedUrl);
                  if (srvJson.watchUrl) syncNewTabPlayerLinks(srvJson.watchUrl);
                }
                return;
              }
            }
          }
        } catch (_e) {}

        if (activeMovieObj === m && activePlayerSource === 'trailer') {
          var ytSearchUrl = 'https://www.youtube.com/results?search_query=' + encodeURIComponent(m.title + (m.year ? ' ' + m.year : '') + ' trailer');
          syncNewTabPlayerLinks(ytSearchUrl);
          document.getElementById('cinema-player-frame').removeAttribute('src');
          document.getElementById('cinema-fallback-title').textContent = m.title + ' — Trailer Ready in New Tab';
          document.getElementById('cinema-fallback-msg').textContent = 'Click Open Player in New Tab to watch "' + m.title + '" trailer directly, or paste a Custom Embed URL below.';
          document.getElementById('cinema-player-fallback').classList.add('open');
        }
      }

      function renderEpisodesForSeason(seasonNum) {
        var listWrap = document.getElementById('cinema-episodes-list');
        var detailEl = document.getElementById('cinema-episode-detail');
        listWrap.innerHTML = '';
        var eps = activeMovieEpisodes.filter(function (ep) { return Number(ep.season) === Number(seasonNum); });
        if (!eps.length) {
          detailEl.textContent = 'No episodes listed for this season.';
          return;
        }
        eps.forEach(function (ep, idx) {
          var b = document.createElement('button');
          b.type = 'button';
          b.className = 'episode-btn' + (activeSelectedEpisode ? (activeSelectedEpisode.id === ep.id ? ' active' : '') : (idx === 0 ? ' active' : ''));
          var l1 = document.createElement('div');
          l1.style.cssText = 'font-size:12px;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;';
          l1.textContent = 'S' + ep.season + 'E' + ep.number + ' · ' + ep.name;
          var l2 = document.createElement('div');
          l2.className = 'sub';
          l2.textContent = (ep.airdate || 'Episode') + (ep.runtime ? ' · ' + ep.runtime + 'm' : '');
          b.appendChild(l1);
          b.appendChild(l2);
          b.onclick = function () {
            activeSelectedEpisode = ep;
            listWrap.querySelectorAll('.episode-btn').forEach(function (x) { x.classList.remove('active'); });
            b.classList.add('active');
            detailEl.textContent = 'S' + ep.season + 'E' + ep.number + ' — ' + ep.name + ': ' + ep.summary;
            var tmpl = (safeLSGet('valem_embed_template') || '').trim();
            if (tmpl && activeMovieObj) {
              var resolved = tmpl
                .replace(/\\{id\\}/gi, encodeURIComponent(activeMovieObj.externalId))
                .replace(/\\{imdb\\}/gi, encodeURIComponent(activeMovieObj.imdbId || activeMovieObj.externalId))
                .replace(/\\{season\\}/gi, String(ep.season))
                .replace(/\\{episode\\}/gi, String(ep.number));
              activePlayerSources.custom = normalizeDirectEmbedUrlClient(resolved);
              syncSourceSwitcherUi('custom');
              setTheaterIframeUrl(activePlayerSources.custom);
            }
          };
          listWrap.appendChild(b);
        });
        var firstEp = activeSelectedEpisode && eps.some(function (e) { return e.id === activeSelectedEpisode.id; }) ? activeSelectedEpisode : eps[0];
        activeSelectedEpisode = firstEp;
        detailEl.textContent = 'S' + firstEp.season + 'E' + firstEp.number + ' — ' + firstEp.name + ': ' + firstEp.summary;
      }

      async function openMovie(m) {
        activeMovieObj = m;
        activeMovieEpisodes = [];
        activeSelectedEpisode = null;

        var tmpl = (safeLSGet('valem_embed_template') || '').trim();
        var templateUrl = tmpl
          ? normalizeDirectEmbedUrlClient(
              tmpl
                .replace(/\\{id\\}/gi, encodeURIComponent(m.externalId))
                .replace(/\\{imdb\\}/gi, encodeURIComponent(m.imdbId || m.externalId))
                .replace(/\\{season\\}/gi, '1')
                .replace(/\\{episode\\}/gi, '1')
            )
          : '';
        activePlayerSources = {
          trailer: m.youtubeKey ? ('https://www.youtube-nocookie.com/embed/' + encodeURIComponent(m.youtubeKey) + '?autoplay=1&rel=0') : '',
          archive: m.source === 'archive' ? ('https://archive.org/embed/' + encodeURIComponent(m.externalId)) : '',
          custom: templateUrl
        };

        document.getElementById('movie-ov-title').textContent = m.title + (m.year ? ' (' + m.year + ')' : '');
        document.getElementById('movie-ov-source').textContent = m.source === 'archive' ? 'FULL PUBLIC-DOMAIN MOVIE' : (m.source === 'tmdb' ? 'TMDB DISCOVERY' : 'TVMAZE SERIES');
        document.getElementById('cinema-ov-network').textContent = m.networkOrStudio || 'Cinema';
        document.getElementById('cinema-ov-rating').textContent = typeof m.rating === 'number' ? ('Rating: ★ ' + m.rating.toFixed(1) + ' / 10') : '';
        document.getElementById('cinema-ov-genres').textContent = (m.genres || []).join(' · ');
        document.getElementById('cinema-ov-synopsis').textContent = m.summary || 'No synopsis available.';
        document.getElementById('cinema-ov-cast').textContent = (m.cast && m.cast.length) ? ('Cast: ' + m.cast.join(', ')) : '';
        var embedIn = document.getElementById('cinema-embed-input');
        if (embedIn) embedIn.value = activePlayerSources.archive || activePlayerSources.trailer || activePlayerSources.custom || '';

        var epPanel = document.getElementById('cinema-episodes-panel');
        epPanel.style.display = 'none';
        document.getElementById('movie-overlay').classList.add('open');

        if (m.source === 'archive') {
          await selectPlayerSource('archive');
          return;
        }

        if (m.source === 'tmdb') {
          await selectPlayerSource(activePlayerSources.custom ? 'custom' : 'trailer');
          return;
        }

        // TVMaze Show: auto-play live official trailer AND load episodes/cast concurrently
        var trailerTask = selectPlayerSource(activePlayerSources.custom ? 'custom' : 'trailer');

        try {
          var epRes = await fetch('https://api.tvmaze.com/shows/' + encodeURIComponent(m.externalId) + '?embed[]=episodes&embed[]=cast');
          if (epRes.ok && activeMovieObj === m) {
            var details = await epRes.json();
            var castArr = (details && details._embedded && Array.isArray(details._embedded.cast))
              ? details._embedded.cast.slice(0, 8).map(function (c) {
                  return c && c.person ? (c.person.name + (c.character && c.character.name ? ' (' + c.character.name + ')' : '')) : '';
                }).filter(Boolean)
              : [];
            if (castArr.length) {
              document.getElementById('cinema-ov-cast').textContent = 'Cast: ' + castArr.join(', ');
            }
            var epsRaw = (details && details._embedded && Array.isArray(details._embedded.episodes)) ? details._embedded.episodes : [];
            activeMovieEpisodes = epsRaw.map(function (ep) {
              return {
                id: ep.id,
                season: Number(ep.season || 1),
                number: Number(ep.number || 1),
                name: String(ep.name || ('Episode ' + (ep.number || 1))),
                runtime: typeof ep.runtime === 'number' ? ep.runtime : null,
                airdate: String(ep.airdate || ''),
                summary: stripHtmlClient(ep.summary) || 'Episode synopsis unavailable.'
              };
            });
            if (activeMovieEpisodes.length > 0) {
              var seasonNums = [];
              activeMovieEpisodes.forEach(function (ep) {
                if (seasonNums.indexOf(ep.season) === -1) seasonNums.push(ep.season);
              });
              seasonNums.sort(function (a, b) { return a - b; });
              var seasonSel = document.getElementById('cinema-season-select');
              seasonSel.innerHTML = '';
              seasonNums.forEach(function (sn) {
                var opt = document.createElement('option');
                opt.value = String(sn);
                opt.textContent = 'Season ' + sn;
                seasonSel.appendChild(opt);
              });
              document.getElementById('cinema-episodes-heading').textContent = m.title + ' · ' + activeMovieEpisodes.length + ' Episodes';
              epPanel.style.display = 'flex';
              renderEpisodesForSeason(seasonNums[0]);
            }
          }
        } catch (_e) {}
        await trailerTask;
      }

      document.querySelectorAll('#cinema-source-switcher [data-player-source]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var mode = btn.getAttribute('data-player-source') || 'trailer';
          selectPlayerSource(mode);
        });
      });

      document.getElementById('cinema-season-select').addEventListener('change', function () {
        renderEpisodesForSeason(Number(this.value) || 1);
      });

      document.getElementById('cinema-embed-form').addEventListener('submit', function (e) {
        e.preventDefault();
        var raw = (document.getElementById('cinema-embed-input').value || '').trim();
        if (!raw) return;
        if (raw.indexOf('{id}') !== -1 || raw.indexOf('{imdb}') !== -1 || raw.indexOf('{season}') !== -1) {
          safeLSSet('valem_embed_template', raw);
          var ep = activeSelectedEpisode || { season: 1, number: 1 };
          var resolved = raw
            .replace(/\\{id\\}/gi, encodeURIComponent(activeMovieObj ? activeMovieObj.externalId : ''))
            .replace(/\\{imdb\\}/gi, encodeURIComponent(activeMovieObj ? (activeMovieObj.imdbId || activeMovieObj.externalId) : ''))
            .replace(/\\{season\\}/gi, String(ep.season))
            .replace(/\\{episode\\}/gi, String(ep.number));
          activePlayerSources.custom = normalizeDirectEmbedUrlClient(resolved);
          syncSourceSwitcherUi('custom');
          setTheaterIframeUrl(activePlayerSources.custom);
          showToast('Saved configurable embed URL template.');
        } else {
          var directUrl = normalizeDirectEmbedUrlClient(raw);
          activePlayerSources.custom = directUrl;
          syncSourceSwitcherUi('custom');
          setTheaterIframeUrl(directUrl);
        }
      });

      document.getElementById('cinema-embed-auto').addEventListener('click', function () {
        if (!activeMovieObj) return;
        if (activeMovieObj.source === 'archive') {
          selectPlayerSource('archive');
        } else {
          openMovie(activeMovieObj);
        }
      });

      document.getElementById('cinema-fallback-retry').addEventListener('click', function () {
        var cur = (document.getElementById('cinema-embed-input').value || '').trim();
        if (cur) {
          setTheaterIframeUrl(cur);
        } else if (activeMovieObj) {
          selectPlayerSource(activePlayerSource);
        }
      });

      document.getElementById('cinema-fallback-proxy').addEventListener('click', function () {
        if (!activeMovieObj) return;
        var target = activeMovieObj.watchPageUrl || ('https://search.brave.com/search?q=' + encodeURIComponent(activeMovieObj.title + ' watch'));
        document.getElementById('movie-ov-close').click();
        openInValBrowse(target);
      });

      document.getElementById('movie-ov-theater').addEventListener('click', function () {
        var ov = document.getElementById('movie-overlay');
        var wide = ov.classList.toggle('theater-wide');
        this.textContent = wide ? 'Standard Width' : 'Theater Mode';
      });

      document.getElementById('movie-ov-fs').addEventListener('click', function () {
        var st = document.getElementById('movie-ov-stage');
        if (document.fullscreenElement) document.exitFullscreen().catch(function () {});
        else if (st && st.requestFullscreen) st.requestFullscreen().catch(function () {});
      });

      document.getElementById('movie-ov-close').addEventListener('click', function () {
        activeMovieObj = null;
        document.getElementById('cinema-player-frame').removeAttribute('src');
        document.getElementById('movie-overlay').classList.remove('open');
        document.getElementById('movie-overlay').classList.remove('theater-wide');
        document.getElementById('movie-ov-theater').textContent = 'Theater Mode';
      });

      document.getElementById('movie-ov-proxy').addEventListener('click', function () {
        if (activeMovieObj) {
          var u = activeMovieObj.watchPageUrl || ('https://search.brave.com/search?q=' + encodeURIComponent(activeMovieObj.title));
          document.getElementById('movie-ov-close').click();
          openInValBrowse(u);
        }
      });

      document.getElementById('btn-movies-tmdb-shortcut').addEventListener('click', function () {
        document.getElementById('btn-open-settings').click();
        var cloakTab = document.querySelector('#settings-tabs [data-stab="cloak"]');
        if (cloakTab) cloakTab.click();
        var ki = document.getElementById('tmdb-api-key-input');
        if (ki) setTimeout(function () { ki.focus(); }, 60);
      });

      document.querySelectorAll('#movie-genres .pill-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
          movieGenre = btn.getAttribute('data-genre') || 'all';
          document.querySelectorAll('#movie-genres .pill-btn').forEach(function (b) { b.classList.toggle('active', b === btn); });
          renderMoviesFiltered();
        });
      });

      document.getElementById('movies-query').addEventListener('input', function () {
        if (!this.value.trim()) cinemaSearchResults = null;
        renderMoviesFiltered();
      });

      document.getElementById('btn-movies-reset').addEventListener('click', function () {
        document.getElementById('movies-query').value = '';
        cinemaSearchResults = null;
        movieGenre = 'all';
        document.querySelectorAll('#movie-genres .pill-btn').forEach(function (b) {
          b.classList.toggle('active', b.getAttribute('data-genre') === 'all');
        });
        renderMoviesFiltered();
      });

      document.getElementById('movies-search-form').addEventListener('submit', async function (e) {
        e.preventDefault();
        var q = (document.getElementById('movies-query').value || '').trim();
        if (!q) {
          cinemaSearchResults = null;
          renderMoviesFiltered();
          return;
        }
        document.getElementById('movies-status').textContent = 'Searching TVMaze & Internet Archive for "' + q + '"...';
        var tmdbKey = (safeLSGet('valem_tmdb_api_key') || '').trim();
        try {
          var resArr = await Promise.all([
            fetch(CFG.tvmazeSearchUrl + encodeURIComponent(q)).then(function (r) { return r.ok ? r.json() : []; }).catch(function () { return []; }),
            fetch('https://archive.org/advancedsearch.php?q=' + encodeURIComponent(q + ' AND mediatype:(movies) AND collection:(feature_films)') + '&fl[]=identifier,title,description,year&rows=20&output=json').then(function (r) { return r.ok ? r.json() : null; }).catch(function () { return null; }),
            tmdbKey
              ? fetch('https://api.themoviedb.org/3/search/movie?api_key=' + encodeURIComponent(tmdbKey) + '&query=' + encodeURIComponent(q)).then(function (r) { return r.ok ? r.json() : null; }).catch(function () { return null; })
              : Promise.resolve(null)
          ]);
          var mappedTv = Array.isArray(resArr[0]) ? resArr[0].map(function (entry) { return normalizeTvMazeClient(entry && entry.show); }).filter(Boolean) : [];
          var mappedArc = (resArr[1] && resArr[1].response && Array.isArray(resArr[1].response.docs))
            ? resArr[1].response.docs.map(normalizeArchiveClient).filter(Boolean)
            : [];
          var mappedTmdb = (resArr[2] && Array.isArray(resArr[2].results))
            ? resArr[2].results.slice(0, 12).map(normalizeTmdbClient).filter(Boolean)
            : [];
          var mergedSearch = mappedTmdb.concat(mappedTv).concat(mappedArc);
          if (mergedSearch.length > 0) {
            cinemaSearchResults = mergedSearch;
            renderMoviesFiltered();
            document.getElementById('movies-status').textContent = 'Found ' + mergedSearch.length + ' results for "' + q + '"';
          } else {
            cinemaSearchResults = null;
            renderMoviesFiltered();
            document.getElementById('movies-status').textContent = 'No live API hits — filtering local catalog';
          }
        } catch (_e) {
          cinemaSearchResults = null;
          renderMoviesFiltered();
        }
      });

      renderMoviesFiltered();
      loadCinemaLiveCatalog();

      /* ---------------- BOOKS & MANGA (GUTENDEX) ---------------- */
      var booksLoadedOnce = false;
      var bookFontSize = 17;
      var FALLBACK_BOOKS = [
        { id: 1661, title: 'The Adventures of Sherlock Holmes', authors: [{ name: 'Doyle, Arthur Conan' }], download_count: 68420, formats: { 'text/plain; charset=utf-8': 'https://www.gutenberg.org/ebooks/1661.txt.utf-8' } },
        { id: 345, title: 'Dracula', authors: [{ name: 'Stoker, Bram' }], download_count: 54120, formats: { 'text/plain; charset=utf-8': 'https://www.gutenberg.org/ebooks/345.txt.utf-8' } },
        { id: 84, title: 'Frankenstein; Or, The Modern Prometheus', authors: [{ name: 'Shelley, Mary' }], download_count: 89210, formats: { 'text/plain; charset=utf-8': 'https://www.gutenberg.org/ebooks/84.txt.utf-8' } },
        { id: 11, title: "Alice's Adventures in Wonderland", authors: [{ name: 'Carroll, Lewis' }], download_count: 47890, formats: { 'text/plain; charset=utf-8': 'https://www.gutenberg.org/ebooks/11.txt.utf-8' } }
      ];

      function renderBooks(list) {
        var grid = document.getElementById('books-grid');
        grid.innerHTML = '';
        list.forEach(function (b) {
          var card = document.createElement('div');
          card.className = 'book-card';
          if (b.formats && b.formats['image/jpeg']) {
            var img = document.createElement('img');
            img.className = 'book-cover';
            img.src = b.formats['image/jpeg'];
            img.alt = b.title;
            img.loading = 'lazy';
            card.appendChild(img);
          }
          var col = document.createElement('div');
          col.style.cssText = 'flex:1;min-width:0;display:flex;flex-direction:column;justify-content:space-between;gap:8px;';
          var t = document.createElement('div');
          t.innerHTML = '<div style="font-size:13px;font-weight:700;color:var(--text);"></div><div class="sub" style="margin-top:3px;"></div>';
          t.children[0].textContent = b.title;
          t.children[1].textContent = ((b.authors || []).map(function (a) { return a.name; }).join(', ') || 'Classic Author') + ' · ' + Number(b.download_count || 0).toLocaleString() + ' reads';
          var acts = document.createElement('div');
          acts.className = 'pill-row';
          var readBtn = document.createElement('button');
          readBtn.type = 'button';
          readBtn.className = 'btn btn-primary';
          readBtn.style.height = '28px';
          readBtn.textContent = 'Read';
          readBtn.onclick = function () { openBook(b); };
          var pxBtn = document.createElement('button');
          pxBtn.type = 'button';
          pxBtn.className = 'btn';
          pxBtn.style.height = '28px';
          pxBtn.textContent = 'Proxy';
          pxBtn.onclick = function () { openInValBrowse('https://www.gutenberg.org/ebooks/' + b.id); };
          acts.appendChild(readBtn);
          acts.appendChild(pxBtn);
          col.appendChild(t);
          col.appendChild(acts);
          card.appendChild(col);
          grid.appendChild(card);
        });
      }

      async function searchBooks(term) {
        var q = String(term || '').trim() || 'classic';
        document.getElementById('books-status').textContent = 'Searching Gutendex for "' + q + '"...';
        try {
          var res = await fetch('https://gutendex.com/books?search=' + encodeURIComponent(q));
          var data = await res.json();
          var items = Array.isArray(data && data.results) ? data.results.slice(0, 18) : [];
          renderBooks(items.length ? items : FALLBACK_BOOKS);
          document.getElementById('books-status').textContent = items.length ? ('Found ' + items.length + ' readable titles') : 'Showing classics';
        } catch (_e) {
          renderBooks(FALLBACK_BOOKS);
          document.getElementById('books-status').textContent = 'Showing offline Gutenberg classics';
        }
      }

      async function openBook(book) {
        var txtUrl = (book.formats && (book.formats['text/plain; charset=utf-8'] || book.formats['text/plain; charset=us-ascii'] || book.formats['text/plain'])) || '';
        document.getElementById('book-ov-title').textContent = book.title;
        var bodyEl = document.getElementById('book-ov-body');
        bodyEl.textContent = 'Loading book text...';
        document.getElementById('book-overlay').classList.add('open');
        if (!txtUrl) {
          document.getElementById('book-overlay').classList.remove('open');
          openInValBrowse('https://www.gutenberg.org/ebooks/' + book.id);
          return;
        }
        var urls = [txtUrl, 'https://corsproxy.io/?' + encodeURIComponent(txtUrl), 'https://api.allorigins.win/raw?url=' + encodeURIComponent(txtUrl)];
        for (var i = 0; i < urls.length; i++) {
          try {
            var res = await fetch(urls[i]);
            if (res.ok) {
              var txt = await res.text();
              if (txt && txt.length > 80) { bodyEl.textContent = txt.slice(0, 180000); return; }
            }
          } catch (_e) {}
        }
        bodyEl.textContent = 'Direct plain-text fetch blocked; click Close and use the Proxy button to read via Scramjet.';
      }

      document.getElementById('book-ov-close').addEventListener('click', function () {
        document.getElementById('book-overlay').classList.remove('open');
      });
      document.getElementById('book-font-down').addEventListener('click', function () {
        bookFontSize = Math.max(13, bookFontSize - 1);
        document.getElementById('book-ov-body').style.fontSize = bookFontSize + 'px';
      });
      document.getElementById('book-font-up').addEventListener('click', function () {
        bookFontSize = Math.min(26, bookFontSize + 1);
        document.getElementById('book-ov-body').style.fontSize = bookFontSize + 'px';
      });
      document.querySelectorAll('#books-topics .pill-btn').forEach(function (b) {
        b.addEventListener('click', function () {
          var topic = b.getAttribute('data-topic');
          document.getElementById('books-query').value = topic;
          searchBooks(topic);
        });
      });
      document.getElementById('books-search-form').addEventListener('submit', function (e) {
        e.preventDefault();
        searchBooks(document.getElementById('books-query').value);
      });

      /* ---------------- MUSIC STUDIO (SOUNDCLOUD + ARTIST EXAMPLES + SYNTH) ---------------- */
      var scLoadedOnce = false;
      var activeArtistCat = 'all';
      var activeArtistId = '';

      function setScUrl(url) {
        document.getElementById('sc-input').value = url;
        document.getElementById('sc-frame').src = 'https://w.soundcloud.com/player/?url=' + encodeURIComponent(url) + '&color=%23ff5c7c&auto_play=false&hide_related=false&show_comments=false&show_user=true';
      }

      var stationsWrap = document.getElementById('sc-stations');
      CFG.scStations.forEach(function (st) {
        var b = document.createElement('button');
        b.type = 'button';
        b.className = 'pill-btn';
        b.textContent = st.label;
        b.onclick = function () { scLoadedOnce = true; setScUrl(st.url); };
        stationsWrap.appendChild(b);
      });

      function renderScArtistDirectory() {
        var grid = document.getElementById('sc-artist-grid');
        if (!grid) return;
        grid.innerHTML = '';
        var list = (CFG.scArtists || []).filter(function (a) {
          return activeArtistCat === 'all' || a.category === activeArtistCat;
        });
        list.forEach(function (artist) {
          var btn = document.createElement('button');
          btn.type = 'button';
          btn.className = 'artist-chip-btn' + (activeArtistId === artist.id ? ' active' : '');
          btn.setAttribute('data-sc-artist', artist.id);

          var top = document.createElement('div');
          top.style.cssText = 'display:flex;align-items:center;justify-content:space-between;gap:6px;';
          var nm = document.createElement('span');
          nm.style.cssText = 'font-size:12px;font-weight:700;color:var(--text);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;';
          nm.textContent = artist.name;
          var badge = document.createElement('span');
          badge.className = 'eyebrow';
          badge.style.fontSize = '9px';
          badge.textContent = artist.genreLabel;
          top.appendChild(nm);
          top.appendChild(badge);

          var sub = document.createElement('div');
          sub.className = 'sub';
          sub.style.cssText = 'font-family:var(--font-mono);font-size:10px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;';
          sub.textContent = 'soundcloud.com/' + artist.handle;

          btn.appendChild(top);
          btn.appendChild(sub);
          btn.onclick = function () {
            activeArtistId = artist.id;
            scLoadedOnce = true;
            setScUrl(artist.url);
            renderScArtistDirectory();
          };
          grid.appendChild(btn);
        });
      }

      document.querySelectorAll('#sc-artist-cats .pill-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
          activeArtistCat = btn.getAttribute('data-sc-cat') || 'all';
          document.querySelectorAll('#sc-artist-cats .pill-btn').forEach(function (b) {
            b.classList.toggle('active', b === btn);
          });
          renderScArtistDirectory();
        });
      });

      renderScArtistDirectory();

      document.getElementById('sc-form').addEventListener('submit', function (e) {
        e.preventDefault();
        scLoadedOnce = true;
        setScUrl(document.getElementById('sc-input').value);
      });

      var synthOn = false;
      var sCtx = null, sFlt = null, sMaster = null, sTimer = null, sStep = 0;
      var S_CHORDS = [[261.63,329.63,392,493.88],[220,261.63,329.63,392],[174.61,220,261.63,329.63],[196,246.94,293.66,349.23]];
      function runBeat() {
        if (!sCtx || !sFlt) return;
        var bpm = Number(document.getElementById('synth-bpm').value) || 76;
        if (sStep % 8 === 0) {
          var chord = S_CHORDS[Math.floor(sStep / 8) % S_CHORDS.length];
          var now = sCtx.currentTime;
          chord.forEach(function (f) {
            var o = sCtx.createOscillator(), g = sCtx.createGain();
            o.type = 'triangle';
            o.frequency.setValueAtTime(f, now);
            g.gain.setValueAtTime(0.0001, now);
            g.gain.linearRampToValueAtTime(0.045, now + 0.08);
            g.gain.exponentialRampToValueAtTime(0.0001, now + (60 / bpm) * 3.8);
            o.connect(g); g.connect(sFlt);
            o.start(now); o.stop(now + (60 / bpm) * 3.9);
          });
        }
        sStep++;
      }
      document.getElementById('synth-toggle').addEventListener('click', function () {
        if (synthOn) {
          synthOn = false;
          if (sTimer) clearInterval(sTimer);
          if (sCtx) sCtx.suspend().catch(function () {});
          this.textContent = 'Start Lo-Fi Synth';
          return;
        }
        var C = window.AudioContext || window.webkitAudioContext;
        if (!C) return;
        if (!sCtx) {
          sCtx = new C();
          sMaster = sCtx.createGain(); sMaster.gain.value = 0.7;
          sFlt = sCtx.createBiquadFilter(); sFlt.type = 'lowpass'; sFlt.frequency.value = Number(document.getElementById('synth-cut').value) || 1100;
          sFlt.connect(sMaster); sMaster.connect(sCtx.destination);
        }
        sCtx.resume().catch(function () {});
        var bpm = Number(document.getElementById('synth-bpm').value) || 76;
        sStep = 0; runBeat();
        sTimer = setInterval(runBeat, Math.round((60 / bpm / 2) * 1000));
        synthOn = true;
        this.textContent = 'Stop Lo-Fi Synth';
      });
      document.getElementById('synth-bpm').addEventListener('input', function () {
        document.getElementById('synth-bpm-val').textContent = this.value + ' BPM';
        if (synthOn) {
          clearInterval(sTimer);
          sTimer = setInterval(runBeat, Math.round((60 / Number(this.value) / 2) * 1000));
        }
      });
      document.getElementById('synth-cut').addEventListener('input', function () {
        document.getElementById('synth-cut-val').textContent = this.value + ' Hz';
        if (sFlt && sCtx) sFlt.frequency.setTargetAtTime(Number(this.value), sCtx.currentTime, 0.05);
      });
      document.getElementById('local-audio-input').addEventListener('change', function (e) {
        var f = e.target.files && e.target.files[0];
        if (!f) return;
        var player = document.getElementById('local-audio-player');
        player.src = URL.createObjectURL(f);
        player.style.display = 'block';
        player.play().catch(function () {});
      });

      /* ---------------- CLOAK, 124 COLOR PRESETS & SETTINGS MODAL ---------------- */
      var settingsModal = document.getElementById('settings-modal');
      var activePresetCat = 'All';
      var presetSearchQuery = '';
      var activePresetId = safeLSGet('valbrowse_color_preset') || 'coral-default';

      function getContrastInk(hex) {
        var clean = String(hex || '').replace('#', '');
        if (!/^[0-9a-f]{6}$/i.test(clean)) return '#09090b';
        var toLin = function (v) {
          var s = v / 255;
          return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
        };
        var r = parseInt(clean.slice(0, 2), 16);
        var g = parseInt(clean.slice(2, 4), 16);
        var b = parseInt(clean.slice(4, 6), 16);
        var lum = 0.2126 * toLin(r) + 0.7152 * toLin(g) + 0.0722 * toLin(b);
        return lum > 0.34 ? '#09090b' : '#ffffff';
      }

      function applyColorPreset(presetId) {
        activePresetId = presetId || 'coral-default';
        safeLSSet('valbrowse_color_preset', activePresetId);

        var root = document.documentElement;
        var p = null;
        for (var i = 0; i < CFG.themePresets.length; i++) {
          if (CFG.themePresets[i].id === activePresetId) { p = CFG.themePresets[i]; break; }
        }

        var tokens;
        if (!p) {
          tokens = {
            bg: '#0b0608',
            bgSec: '#080406',
            surface: '#140b0e',
            surface2: '#1b0f13',
            text: '#fdf2f4',
            muted: '#9f878f',
            accent: '#ff5c7c',
            border: 'rgba(255, 255, 255, 0.08)',
            isLight: false
          };
        } else {
          tokens = {
            bg: p.bgPrimary,
            bgSec: p.bgSecondary,
            surface: p.bgCard,
            surface2: p.bgSecondary,
            text: p.textPrimary,
            muted: p.textMuted,
            accent: p.accent,
            border: p.border,
            isLight: Boolean(p.isLight)
          };
        }

        root.style.setProperty('--bg', tokens.bg);
        root.style.setProperty('--rail', tokens.bgSec);
        root.style.setProperty('--surface', tokens.surface);
        root.style.setProperty('--surface-2', tokens.surface2);
        root.style.setProperty('--text', tokens.text);
        root.style.setProperty('--muted', tokens.muted);
        root.style.setProperty('--accent', tokens.accent);
        root.style.setProperty('--accent-hover', tokens.accent);
        root.style.setProperty('--accent-text', getContrastInk(tokens.accent));
        root.style.setProperty('--accent-soft', 'color-mix(in srgb, ' + tokens.accent + ' 16%, transparent)');
        root.style.setProperty('--border', tokens.border);
        root.style.setProperty('--border-strong', tokens.accent);

        var frame = document.getElementById('valbrowse-proxy-frame');
        if (frame && frame.contentWindow) {
          try {
            frame.contentWindow.postMessage({
              type: 'scramjet-theme',
              bg: tokens.bg,
              bgSec: tokens.bgSec,
              surface: tokens.surface,
              text: tokens.text,
              muted: tokens.muted,
              border: tokens.border,
              primary: tokens.accent,
              light: tokens.isLight ? '1' : '0'
            }, '*');
          } catch (_e) {}
        }

        renderColorPresetsGrid();
      }

      function renderColorPresetsGrid() {
        var grid = document.getElementById('color-presets-grid');
        if (!grid) return;
        grid.innerHTML = '';
        var q = String(presetSearchQuery || '').trim().toLowerCase();
        var filtered = CFG.themePresets.filter(function (t) {
          var matchCat = activePresetCat === 'All' || t.category === activePresetCat;
          var matchQ = !q || t.name.toLowerCase().indexOf(q) !== -1 || t.category.toLowerCase().indexOf(q) !== -1;
          return matchCat && matchQ;
        });
        if (filtered.length === 0) {
          var empty = document.createElement('div');
          empty.className = 'sub';
          empty.style.gridColumn = '1 / -1';
          empty.textContent = 'No themes matching "' + presetSearchQuery + '"';
          grid.appendChild(empty);
          return;
        }
        filtered.forEach(function (t) {
          var b = document.createElement('button');
          b.type = 'button';
          b.className = 'preset-item' + (t.id === activePresetId ? ' active' : '');
          b.setAttribute('data-preset-id', t.id);

          var sw = document.createElement('span');
          sw.className = 'preset-swatches';
          var d1 = document.createElement('span');
          d1.className = 'preset-dot';
          d1.style.background = t.bgPrimary;
          var d2 = document.createElement('span');
          d2.className = 'preset-dot';
          d2.style.background = t.accent;
          sw.appendChild(d1);
          sw.appendChild(d2);

          var nm = document.createElement('span');
          nm.style.cssText = 'flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;';
          nm.textContent = t.name;

          b.appendChild(sw);
          b.appendChild(nm);
          b.addEventListener('click', function () {
            applyColorPreset(t.id);
          });
          grid.appendChild(b);
        });
      }

      document.querySelectorAll('#preset-cat-pills .pill-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
          activePresetCat = btn.getAttribute('data-pcat') || 'All';
          document.querySelectorAll('#preset-cat-pills .pill-btn').forEach(function (b) {
            b.classList.toggle('active', b === btn);
          });
          renderColorPresetsGrid();
        });
      });

      var presetSearchEl = document.getElementById('preset-search');
      if (presetSearchEl) {
        presetSearchEl.addEventListener('input', function () {
          presetSearchQuery = presetSearchEl.value || '';
          renderColorPresetsGrid();
        });
      }

      var presetRandomEl = document.getElementById('btn-preset-random');
      if (presetRandomEl) {
        presetRandomEl.addEventListener('click', function () {
          var pool = CFG.themePresets.filter(function (t) { return t.id !== activePresetId; });
          if (!pool.length) return;
          var pick = pool[Math.floor(Math.random() * pool.length)];
          applyColorPreset(pick.id);
          var activeBtn = document.querySelector('#color-presets-grid .preset-item.active');
          if (activeBtn && activeBtn.scrollIntoView) {
            activeBtn.scrollIntoView({ block: 'nearest' });
          }
        });
      }

      document.getElementById('btn-preset-reset-coral').addEventListener('click', function () {
        applyColorPreset('coral-default');
      });

      document.getElementById('valbrowse-proxy-frame').addEventListener('load', function () {
        applyColorPreset(activePresetId);
        applyCustomSettings(customSettings);
      });

      /* ---------------- CUSTOM SETTINGS ENGINE (LAYOUT, BG, CLOAK, PANIC) ---------------- */
      var DEFAULT_CUSTOM_SETTINGS = {
        homeLayout: 'split',
        bgStyle: 'aurora',
        uiRadius: 12,
        glowStrength: 1,
        glassBlur: 14,
        fontScale: 1,
        showClock: true,
        showShortcuts: true,
        reducedMotion: false,
        panicUrl: CFG.panicUrl
      };

      var customSettings = Object.assign({}, DEFAULT_CUSTOM_SETTINGS);
      try {
        var rawCustomSaved = safeLSGet('valem_custom_settings');
        if (rawCustomSaved) {
          customSettings = Object.assign({}, DEFAULT_CUSTOM_SETTINGS, JSON.parse(rawCustomSaved));
        }
      } catch (_e) {}

      function applyCustomSettings(next) {
        customSettings = Object.assign({}, DEFAULT_CUSTOM_SETTINGS, next || {});
        if (
          customSettings.homeLayout !== 'normal' &&
          customSettings.homeLayout !== 'side' &&
          customSettings.homeLayout !== 'minimal'
        ) {
          customSettings.homeLayout = 'split';
        }
        safeLSSet('valem_custom_settings', JSON.stringify(customSettings));
        safeLSSet('valem_panic_url', customSettings.panicUrl || CFG.panicUrl);
        CFG.panicUrl = customSettings.panicUrl || 'https://classroom.google.com';

        var root = document.documentElement;
        document.body.setAttribute('data-bg-style', customSettings.bgStyle || 'aurora');
        document.body.setAttribute('data-home-layout', customSettings.homeLayout || 'split');
        document.body.setAttribute('data-reduced-motion', customSettings.reducedMotion ? '1' : '0');
        root.style.setProperty('--ui-radius', (customSettings.uiRadius || 12) + 'px');
        root.style.setProperty('--glow-strength', String(typeof customSettings.glowStrength === 'number' ? customSettings.glowStrength : 1));
        root.style.setProperty('--glass-blur', (typeof customSettings.glassBlur === 'number' ? customSettings.glassBlur : 14) + 'px');
        root.style.setProperty('--font-scale', String(customSettings.fontScale || 1));

        document.querySelectorAll('#home-layout-pills .pill-btn').forEach(function (b) {
          b.classList.toggle('active', b.getAttribute('data-homelayout') === customSettings.homeLayout);
        });
        document.querySelectorAll('#bg-style-pills .pill-btn').forEach(function (b) {
          b.classList.toggle('active', b.getAttribute('data-bgstyle') === customSettings.bgStyle);
        });
        document.querySelectorAll('#radius-pills .pill-btn').forEach(function (b) {
          b.classList.toggle('active', Number(b.getAttribute('data-radius')) === Number(customSettings.uiRadius));
        });
        document.querySelectorAll('#font-scale-pills .pill-btn[data-fscale]').forEach(function (b) {
          b.classList.toggle('active', Number(b.getAttribute('data-fscale')) === Number(customSettings.fontScale));
        });

        var glowRange = document.getElementById('custom-glow-range');
        var glowPctEl = document.getElementById('glow-pct-val');
        var pctVal = Math.round((typeof customSettings.glowStrength === 'number' ? customSettings.glowStrength : 1) * 100);
        if (glowRange) glowRange.value = String(pctVal);
        if (glowPctEl) glowPctEl.textContent = pctVal + '%';

        var blurBtn = document.getElementById('btn-toggle-blur');
        if (blurBtn) {
          var blurOn = Number(customSettings.glassBlur) > 0;
          blurBtn.classList.toggle('active', blurOn);
          blurBtn.textContent = 'Glass Blur: ' + (blurOn ? 'On' : 'Off');
        }
        var clockBtn = document.getElementById('btn-toggle-clock');
        if (clockBtn) {
          clockBtn.classList.toggle('active', Boolean(customSettings.showClock));
          clockBtn.textContent = 'Live Clock: ' + (customSettings.showClock ? 'On' : 'Off');
        }
        var scBtn = document.getElementById('btn-toggle-shortcuts');
        if (scBtn) {
          scBtn.classList.toggle('active', Boolean(customSettings.showShortcuts));
          scBtn.textContent = 'Launchpad: ' + (customSettings.showShortcuts ? 'On' : 'Off');
        }
        var motionBtn = document.getElementById('btn-toggle-motion');
        if (motionBtn) {
          motionBtn.classList.toggle('active', Boolean(customSettings.reducedMotion));
          motionBtn.textContent = 'Motion: ' + (customSettings.reducedMotion ? 'Reduced' : 'Smooth');
        }
        var panicSel = document.getElementById('panic-url-select');
        if (panicSel && customSettings.panicUrl) {
          panicSel.value = customSettings.panicUrl;
        }

        var frame = document.getElementById('valbrowse-proxy-frame');
        if (frame && frame.contentWindow) {
          try {
            frame.contentWindow.postMessage({ type: 'valem-custom-settings', settings: customSettings }, '*');
          } catch (_e) {}
        }
      }

      document.querySelectorAll('#settings-tabs .pill-btn').forEach(function (tabBtn) {
        tabBtn.addEventListener('click', function () {
          var target = tabBtn.getAttribute('data-stab');
          document.querySelectorAll('#settings-tabs .pill-btn').forEach(function (b) {
            b.classList.toggle('active', b === tabBtn);
          });
          document.querySelectorAll('.settings-pane').forEach(function (pane) {
            pane.classList.toggle('active', pane.id === 'spane-' + target);
          });
        });
      });

      document.querySelectorAll('#bg-style-pills .pill-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
          customSettings.bgStyle = btn.getAttribute('data-bgstyle') || 'aurora';
          applyCustomSettings(customSettings);
        });
      });

      document.querySelectorAll('#radius-pills .pill-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
          customSettings.uiRadius = Number(btn.getAttribute('data-radius')) || 12;
          applyCustomSettings(customSettings);
        });
      });

      document.querySelectorAll('#font-scale-pills .pill-btn[data-fscale]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          customSettings.fontScale = Number(btn.getAttribute('data-fscale')) || 1;
          applyCustomSettings(customSettings);
        });
      });

      document.querySelectorAll('#home-layout-pills .pill-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
          customSettings.homeLayout = btn.getAttribute('data-homelayout') || 'split';
          applyCustomSettings(customSettings);
          switchView('browser');
        });
      });

      document.querySelectorAll('#sidebar-mode-pills .pill-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
          applyRailMode(btn.getAttribute('data-railmode') || 'expanded');
        });
      });

      var glowInput = document.getElementById('custom-glow-range');
      if (glowInput) {
        glowInput.addEventListener('input', function () {
          customSettings.glowStrength = Number(glowInput.value) / 100;
          applyCustomSettings(customSettings);
        });
      }

      var blurToggleBtn = document.getElementById('btn-toggle-blur');
      if (blurToggleBtn) {
        blurToggleBtn.addEventListener('click', function () {
          customSettings.glassBlur = Number(customSettings.glassBlur) > 0 ? 0 : 14;
          applyCustomSettings(customSettings);
        });
      }

      var clockToggleBtn = document.getElementById('btn-toggle-clock');
      if (clockToggleBtn) {
        clockToggleBtn.addEventListener('click', function () {
          customSettings.showClock = !customSettings.showClock;
          applyCustomSettings(customSettings);
        });
      }

      var scToggleBtn = document.getElementById('btn-toggle-shortcuts');
      if (scToggleBtn) {
        scToggleBtn.addEventListener('click', function () {
          customSettings.showShortcuts = !customSettings.showShortcuts;
          applyCustomSettings(customSettings);
        });
      }

      var motionToggleBtn = document.getElementById('btn-toggle-motion');
      if (motionToggleBtn) {
        motionToggleBtn.addEventListener('click', function () {
          customSettings.reducedMotion = !customSettings.reducedMotion;
          applyCustomSettings(customSettings);
        });
      }

      var customCloakInput = document.getElementById('custom-cloak-title');
      var applyCustomCloakBtn = document.getElementById('btn-apply-custom-cloak');
      if (applyCustomCloakBtn && customCloakInput) {
        applyCustomCloakBtn.addEventListener('click', function () {
          var nextTitle = (customCloakInput.value || '').trim();
          if (!nextTitle) return;
          document.title = nextTitle;
          safeLSSet('valem_cloak_title', nextTitle);
          showToast('Tab title cloaked as "' + nextTitle + '"');
        });
      }

      var panicSelectEl = document.getElementById('panic-url-select');
      if (panicSelectEl) {
        panicSelectEl.addEventListener('change', function () {
          customSettings.panicUrl = panicSelectEl.value || 'https://classroom.google.com';
          applyCustomSettings(customSettings);
        });
      }

      var tmdbKeyInput = document.getElementById('tmdb-api-key-input');
      var tmdbStatusEl = document.getElementById('tmdb-key-status');
      var saveTmdbBtn = document.getElementById('btn-save-tmdb-key');
      var clearTmdbBtn = document.getElementById('btn-clear-tmdb-key');

      function refreshTmdbUi() {
        var cur = (safeLSGet('valem_tmdb_api_key') || '').trim();
        if (tmdbKeyInput) tmdbKeyInput.value = cur;
        if (tmdbStatusEl) {
          tmdbStatusEl.textContent = cur
            ? 'TMDB API key saved in localStorage — trending TMDB movies & official YouTube trailers enabled.'
            : 'Optional — leave blank to use free TVMaze + Internet Archive catalog with no key required.';
        }
      }
      refreshTmdbUi();

      if (saveTmdbBtn && tmdbKeyInput) {
        saveTmdbBtn.addEventListener('click', function () {
          var key = (tmdbKeyInput.value || '').trim();
          safeLSSet('valem_tmdb_api_key', key);
          refreshTmdbUi();
          loadCinemaLiveCatalog();
          showToast(key ? 'TMDB API key saved — refreshing Movies & TV.' : 'TMDB key cleared.');
        });
      }

      if (clearTmdbBtn) {
        clearTmdbBtn.addEventListener('click', function () {
          safeLSSet('valem_tmdb_api_key', '');
          refreshTmdbUi();
          loadCinemaLiveCatalog();
          showToast('TMDB API key removed.');
        });
      }

      var resetAllCustomBtn = document.getElementById('btn-reset-all-custom');
      if (resetAllCustomBtn) {
        resetAllCustomBtn.addEventListener('click', function () {
          applyColorPreset('coral-default');
          applyRailMode('expanded');
          applyCustomSettings(DEFAULT_CUSTOM_SETTINGS);
          document.title = 'VALem — Isolated Workspace';
          showToast('All VALem custom settings restored to defaults.');
        });
      }

      document.getElementById('btn-open-settings').addEventListener('click', function () {
        renderColorPresetsGrid();
        settingsModal.classList.add('open');
      });
      document.getElementById('btn-close-settings').addEventListener('click', function () {
        settingsModal.classList.remove('open');
      });
      settingsModal.addEventListener('click', function (ev) {
        if (ev.target === settingsModal) {
          settingsModal.classList.remove('open');
        }
      });
      document.querySelectorAll('[data-cloak]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var t = btn.getAttribute('data-cloak');
          document.title = t;
          if (customCloakInput) customCloakInput.value = t;
          safeLSSet('valem_cloak_title', t);
        });
      });

      /* ---------------- BOOT ---------------- */
      var savedCloak = safeLSGet('valem_cloak_title');
      if (savedCloak) document.title = savedCloak;
      applyRailMode(railMode);
      applyColorPreset(activePresetId);
      applyCustomSettings(customSettings);
      rebuildMergedModules();
      fetchGnZones();
    })();
  <\/script>
</body>
</html>`}function tt(e,t=2){let n=10**t;return Math.round(e*n)/n}function nt(e){let t=tt(e,2);return t>=0?`+ ${t}`:`- ${Math.abs(t)}`}function rt(e,t){return e.mode===`linear`?e.m*t+e.b:e.mode===`quadratic`?e.m*t*t+e.b*t+e.c:e.m*Math.sin(e.b*t)+e.c}function it(e){let t=tt(e.m,2),n=tt(e.b,2),r=tt(e.c,2),i=``,a=0,o=`None in domain`,s=``;if(e.mode===`linear`)i=n===0?`y = ${t}x`:`y = ${t}x ${nt(n)}`,a=n,o=Math.abs(t)<1e-6?Math.abs(n)<1e-6?`All real x`:`None (horizontal)`:`(${tt(-n/t,2)}, 0)`,s=`dy/dx = ${t}`;else if(e.mode===`quadratic`){if(i=`y = ${t}x² ${nt(n)}x ${nt(r)}`,a=r,Math.abs(t)<1e-6)o=Math.abs(n)<1e-6?`None`:`(${tt(-r/n,2)}, 0)`;else{let e=n*n-4*t*r;o=e<-1e-6?`No real roots (Δ < 0)`:Math.abs(e)<=1e-6?`(${tt(-n/(2*t),2)}, 0)`:`(${tt((-n-Math.sqrt(e))/(2*t),2)}, 0), (${tt((-n+Math.sqrt(e))/(2*t),2)}, 0)`}s=`dy/dx = ${tt(2*t,2)}x ${nt(n)}`}else i=r===0?`y = ${t}·sin(${n}x)`:`y = ${t}·sin(${n}x) ${nt(r)}`,a=r,o=Math.abs(t)>=Math.abs(r)?`Periodic intersections`:`None`,s=`dy/dx = ${tt(t*n,2)}·cos(${n}x)`;let c=[];for(let t=-100;t<=100;t++){let n=t/10;c.push({x:n,y:rt(e,n)})}return{equationText:i,points:c,yIntercept:`(0, ${tt(a,2)})`,xIntercepts:o,derivativeText:s}}function at(e=0){let t=[{id:`lin-intercept-1`,unit:`Unit 3 · Linear Functions`,prompt:`For the line y = 1.5x + 1, what is the value of y when x = 4?`,hint:`Substitute x = 4 directly into y = 1.5(4) + 1.`,expectedValue:7,tolerance:.01,steps:[`Start with y = 1.5x + 1`,`Substitute x = 4 -> y = 1.5(4) + 1`,`Multiply: 6 + 1 = 7`]},{id:`lin-slope-2`,unit:`Unit 3 · Slope & Rate of Change`,prompt:`Find the slope m of the line passing through points (2, 3) and (6, 11).`,hint:`Use m = (y₂ - y₁) / (x₂ - x₁).`,expectedValue:2,tolerance:.01,steps:[`m = (11 - 3) / (6 - 2)`,`m = 8 / 4`,`m = 2`]},{id:`quad-vertex-3`,unit:`Unit 4 · Quadratic Vertex`,prompt:`What is the x-coordinate of the vertex of y = x² - 6x + 5?`,hint:`Use the axis of symmetry formula x = -b / (2a).`,expectedValue:3,tolerance:.01,steps:[`Here a = 1 and b = -6`,`x = -(-6) / (2 · 1)`,`x = 6 / 2 = 3`]},{id:`calc-deriv-4`,unit:`Unit 6 · Differential Calculus`,prompt:`Evaluate the derivative f′(2) for f(x) = 3x² - 4x + 7.`,hint:`Apply the power rule first: f′(x) = 6x - 4.`,expectedValue:8,tolerance:.01,steps:[`Differentiate: f′(x) = 6x - 4`,`Plug in x = 2: 6(2) - 4`,`12 - 4 = 8`]},{id:`geom-hyp-5`,unit:`Unit 2 · Right Triangle Geometry`,prompt:`A right triangle has legs of length 6 and 8. What is the length of its hypotenuse?`,hint:`Apply the Pythagorean theorem: c = √(a² + b²).`,expectedValue:10,tolerance:.01,steps:[`a² + b² = 6² + 8² = 36 + 64 = 100`,`c = √100 = 10`]},{id:`alg-solve-6`,unit:`Unit 1 · Linear Equations`,prompt:`Solve for x: 4x - 9 = 19.`,hint:`Add 9 to both sides, then divide by 4.`,expectedValue:7,tolerance:.01,steps:[`4x - 9 = 19`,`4x = 28`,`x = 7`]}];return t[Math.abs(Math.floor(e))%t.length]}function ot(e,t){let n=String(t||``).trim();if(!n)return{isValidNumber:!1,isCorrect:!1,parsedValue:null};let r=Number(n);return Number.isFinite(r)?{isValidNumber:!0,isCorrect:Math.abs(r-e.expectedValue)<=e.tolerance,parsedValue:r}:{isValidNumber:!1,isCorrect:!1,parsedValue:null}}var st=[{id:`f-slope`,category:`Linear & Coordinate`,name:`Slope-Intercept Form`,expression:`y = mx + b`,notes:`m = (y₂ - y₁) / (x₂ - x₁) represents constant rate of change; b is the y-intercept.`},{id:`f-distance`,category:`Linear & Coordinate`,name:`Euclidean Distance Formula`,expression:`d = √((x₂ - x₁)² + (y₂ - y₁)²)`,notes:`Measures straight-line separation between any two points on the Cartesian plane.`},{id:`f-quad`,category:`Quadratics`,name:`Quadratic Formula`,expression:`x = (-b ± √(b² - 4ac)) / (2a)`,notes:`Solves ax² + bx + c = 0; discriminant Δ = b² - 4ac determines real root count.`},{id:`f-vertex`,category:`Quadratics`,name:`Vertex & Axis of Symmetry`,expression:`h = -b / (2a), k = f(h)`,notes:`Locates the global extremum of a parabola f(x) = a(x - h)² + k.`},{id:`f-pyth-trig`,category:`Trigonometry`,name:`Pythagorean Identity`,expression:`sin²(θ) + cos²(θ) = 1`,notes:`Derived directly from unit circle coordinates (cos θ, sin θ).`},{id:`f-law-cos`,category:`Trigonometry`,name:`Law of Cosines`,expression:`c² = a² + b² - 2ab·cos(C)`,notes:`Generalizes the Pythagorean theorem to any triangle with included angle C.`},{id:`f-power-rule`,category:`Calculus`,name:`Power Rule for Derivatives`,expression:`d/dx [xⁿ] = n·xⁿ⁻¹`,notes:`Computes instantaneous slope of polynomial terms for any real exponent n.`},{id:`f-ftc`,category:`Calculus`,name:`Fundamental Theorem of Calculus`,expression:`∫ₐᵇ f(x) dx = F(b) - F(a)`,notes:`Links definite area accumulation directly to any antiderivative F where F′ = f.`}],ct=o((e=>{var t=Symbol.for(`react.transitional.element`),n=Symbol.for(`react.fragment`);function r(e,n,r){var i=null;if(r!==void 0&&(i=``+r),n.key!==void 0&&(i=``+n.key),`key`in n)for(var a in r={},n)a!==`key`&&(r[a]=n[a]);else r=n;return n=r.ref,{$$typeof:t,type:e,key:i,ref:n===void 0?null:n,props:r}}e.Fragment=n,e.jsx=r,e.jsxs=r})),O=o(((e,t)=>{t.exports=ct()}))(),lt=`eulerpath_progress_v1`;function ut(){try{let e=localStorage.getItem(lt);if(!e)return{attempted:0,correct:0,streak:0,solvedIds:[]};let t=JSON.parse(e);return{attempted:Number(t.attempted)||0,correct:Number(t.correct)||0,streak:Number(t.streak)||0,solvedIds:Array.isArray(t.solvedIds)?t.solvedIds:[]}}catch{return{attempted:0,correct:0,streak:0,solvedIds:[]}}}var dt=()=>{let[e,t]=(0,x.useState)(`graph`),[n,r]=(0,x.useState)({mode:`linear`,m:1.5,b:1,c:0}),[i,a]=(0,x.useState)(0),[o,s]=(0,x.useState)(``),[c,l]=(0,x.useState)(!1),[u,d]=(0,x.useState)({type:`idle`,message:``}),[f,p]=(0,x.useState)(`All`),[m,h]=(0,x.useState)(ut);(0,x.useEffect)(()=>{try{localStorage.setItem(lt,JSON.stringify(m))}catch{}},[m]);let g=(0,x.useMemo)(()=>it(n),[n]),_=(0,x.useMemo)(()=>at(i),[i]),v=e=>28+(e- -10)/20*464,y=e=>332-(e- -10)/20*304,b=(0,x.useMemo)(()=>{let e=``,t=!1;for(let n of g.points){if(n.y<-14||n.y>14||!Number.isFinite(n.y)){t=!1;continue}let r=v(n.x).toFixed(1),i=y(n.y).toFixed(1);e+=t?` L ${r} ${i}`:`M ${r} ${i}`,t=!0}return e},[g.points]),ee=()=>{a(e=>e+1),s(``),l(!1),d({type:`idle`,message:``})},te=e=>{e.preventDefault();let t=ot(_,o);t.isValidNumber?t.isCorrect?(d({type:`correct`,message:`Correct! ${_.steps[_.steps.length-1]}`}),h(e=>({attempted:e.attempted+1,correct:e.correct+1,streak:e.streak+1,solvedIds:e.solvedIds.includes(_.id)?e.solvedIds:[...e.solvedIds,_.id]}))):(d({type:`wrong`,message:`Not quite. Review the hint or compare your substitution steps below.`}),h(e=>({...e,attempted:e.attempted+1,streak:0}))):d({type:`invalid`,message:`Enter a numeric value to verify your step.`})},ne=[-10,-8,-6,-4,-2,0,2,4,6,8,10],S=[`All`,`Linear & Coordinate`,`Quadratics`,`Trigonometry`,`Calculus`],ce=f===`All`?st:st.filter(e=>e.category===f),le=m.attempted>0?Math.round(m.correct/m.attempted*100):100;return(0,O.jsxs)(`div`,{className:`min-h-screen flex flex-col bg-slate-50 text-slate-900`,children:[(0,O.jsxs)(`header`,{className:`sticky top-0 z-30 bg-white border-b border-slate-200/90`,children:[(0,O.jsxs)(`div`,{className:`max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4`,children:[(0,O.jsxs)(`button`,{type:`button`,onClick:()=>t(`graph`),className:`flex items-center gap-2.5 text-left cursor-pointer focus:outline-none`,children:[(0,O.jsx)(`div`,{className:`w-8 h-8 rounded-lg bg-[#1d4ed8] text-white flex items-center justify-center shadow-xs`,children:(0,O.jsx)(ae,{className:`w-4 h-4`})}),(0,O.jsx)(`span`,{className:`text-lg font-extrabold tracking-tight text-slate-900`,children:`EulerPath`})]}),(0,O.jsx)(`nav`,{className:`hidden md:flex items-center gap-6 text-sm font-medium text-slate-600`,"aria-label":`Primary Math Navigation`,children:[[`graph`,`Interactive Graph`],[`practice`,`Practice Set`],[`formulas`,`Formula Sheet`],[`progress`,`Progress`]].map(([n,r])=>(0,O.jsx)(`button`,{type:`button`,onClick:()=>t(n),className:`py-1 transition-colors cursor-pointer ${e===n?`text-[#1d4ed8] font-semibold border-b-2 border-[#1d4ed8]`:`hover:text-slate-900`}`,children:r},n))}),(0,O.jsx)(`button`,{type:`button`,onClick:()=>{ee(),(e===`formulas`||e===`progress`)&&t(`practice`)},className:`px-4 py-2 rounded-lg bg-[#1d4ed8] hover:bg-[#1e40af] text-white text-xs sm:text-sm font-semibold shadow-xs transition cursor-pointer whitespace-nowrap`,children:`New Problem`})]}),(0,O.jsx)(`div`,{className:`md:hidden px-4 py-2 border-t border-slate-200 flex items-center gap-4 text-xs overflow-x-auto bg-white`,children:[[`graph`,`Interactive Graph`],[`practice`,`Practice Set`],[`formulas`,`Formula Sheet`],[`progress`,`Progress`]].map(([n,r])=>(0,O.jsx)(`button`,{type:`button`,onClick:()=>t(n),className:`whitespace-nowrap shrink-0 cursor-pointer ${e===n?`text-[#1d4ed8] font-bold`:`text-slate-600`}`,children:r},n))})]}),(0,O.jsxs)(`main`,{className:`flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8 space-y-7`,children:[e===`graph`&&(0,O.jsxs)(O.Fragment,{children:[(0,O.jsxs)(`section`,{className:`space-y-3 max-w-3xl`,children:[(0,O.jsx)(`div`,{className:`text-xs font-semibold text-[#1d4ed8] tracking-wide`,children:`Unit 3 · Analytic Geometry & Functions`}),(0,O.jsx)(`h1`,{className:`text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight`,children:`Explore Equations Visually and Check Every Step`}),(0,O.jsx)(`p`,{className:`text-sm sm:text-base text-slate-600 leading-relaxed`,children:`Adjust coefficients on the coordinate plane, solve targeted algebra problems, and check how slopes, intercepts, and ratios respond in real time.`})]}),(0,O.jsxs)(`section`,{className:`grid grid-cols-1 lg:grid-cols-12 gap-6 items-start`,children:[(0,O.jsxs)(`div`,{className:`lg:col-span-7 bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 space-y-4`,children:[(0,O.jsxs)(`div`,{className:`flex items-center justify-between gap-3 flex-wrap`,children:[(0,O.jsx)(`div`,{className:`font-mono text-base sm:text-lg font-bold text-slate-900`,children:g.equationText}),(0,O.jsx)(`div`,{className:`flex items-center gap-1.5`,children:[[`linear`,`Linear`],[`quadratic`,`Quadratic`],[`sine`,`Sine`]].map(([e,t])=>(0,O.jsx)(`button`,{type:`button`,onClick:()=>r(t=>({...t,mode:e,m:e===`quadratic`?.5:e===`sine`?4:1.5,b:e===`quadratic`?-1:e===`sine`?.8:1,c:e===`quadratic`?-2:0})),className:`px-2.5 py-1 rounded-md text-xs font-semibold transition cursor-pointer ${n.mode===e?`bg-blue-50 text-[#1d4ed8] border border-blue-200`:`text-slate-600 hover:bg-slate-100 border border-transparent`}`,children:t},e))})]}),(0,O.jsx)(`div`,{className:`rounded-xl border border-slate-200 bg-slate-50/40 overflow-hidden`,children:(0,O.jsxs)(`svg`,{viewBox:`0 0 520 360`,className:`w-full h-auto block`,role:`img`,"aria-label":`Coordinate plane plotting ${g.equationText}`,children:[(0,O.jsx)(`defs`,{children:(0,O.jsx)(`clipPath`,{id:`euler-grid-clip`,children:(0,O.jsx)(`rect`,{x:28,y:28,width:464,height:304})})}),ne.map(e=>(0,O.jsxs)(`g`,{children:[(0,O.jsx)(`line`,{x1:v(e),y1:28,x2:v(e),y2:332,stroke:e===0?`#64748b`:`#e2e8f0`,strokeWidth:e===0?1.5:1}),(0,O.jsx)(`line`,{x1:28,y1:y(e),x2:492,y2:y(e),stroke:e===0?`#64748b`:`#e2e8f0`,strokeWidth:e===0?1.5:1}),e!==0&&(0,O.jsx)(`text`,{x:v(e),y:y(0)+14,textAnchor:`middle`,fontSize:`10`,fill:`#64748b`,fontFamily:`JetBrains Mono, monospace`,children:e})]},e)),n.mode===`linear`&&Math.abs(n.m)>0&&(0,O.jsxs)(`g`,{clipPath:`url(#euler-grid-clip)`,opacity:`0.72`,children:[(0,O.jsx)(`line`,{x1:v(0),y1:y(n.b),x2:v(2),y2:y(n.b),stroke:`#0284c7`,strokeWidth:`1.5`,strokeDasharray:`4 3`}),(0,O.jsx)(`line`,{x1:v(2),y1:y(n.b),x2:v(2),y2:y(2*n.m+n.b),stroke:`#0284c7`,strokeWidth:`1.5`,strokeDasharray:`4 3`}),(0,O.jsx)(`circle`,{cx:v(2),cy:y(2*n.m+n.b),r:`3.5`,fill:`#0284c7`,stroke:`#ffffff`,strokeWidth:`1.25`})]}),(0,O.jsx)(`path`,{d:b,fill:`none`,stroke:`#1d4ed8`,strokeWidth:`2.75`,strokeLinecap:`round`,strokeLinejoin:`round`,clipPath:`url(#euler-grid-clip)`}),(0,O.jsx)(`circle`,{cx:v(0),cy:y(n.mode===`linear`?n.b:n.c),r:`4.5`,fill:`#2563eb`,stroke:`#ffffff`,strokeWidth:`1.5`,clipPath:`url(#euler-grid-clip)`})]})}),(0,O.jsxs)(`div`,{className:`grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 pt-1 text-xs`,children:[(0,O.jsxs)(`div`,{className:`p-2.5 rounded-lg bg-slate-50 border border-slate-200/80 min-w-0`,children:[(0,O.jsx)(`span`,{className:`text-slate-500 block text-[11px]`,children:`y-intercept`}),(0,O.jsx)(`span`,{className:`font-mono font-bold text-slate-900`,children:g.yIntercept})]}),(0,O.jsxs)(`div`,{className:`p-2.5 rounded-lg bg-slate-50 border border-slate-200/80 min-w-0`,children:[(0,O.jsx)(`span`,{className:`text-slate-500 block text-[11px]`,children:`x-intercept(s)`}),(0,O.jsx)(`span`,{className:`font-mono font-bold text-slate-900 block`,children:g.xIntercepts})]}),(0,O.jsxs)(`div`,{className:`p-2.5 rounded-lg bg-slate-50 border border-slate-200/80 min-w-0`,children:[(0,O.jsx)(`span`,{className:`text-slate-500 block text-[11px]`,children:`Derivative`}),(0,O.jsx)(`span`,{className:`font-mono font-bold text-slate-900 block`,children:g.derivativeText})]})]}),(0,O.jsxs)(`div`,{className:`pt-2 border-t border-slate-100`,children:[(0,O.jsxs)(`div`,{className:`flex items-center justify-between text-[11px] text-slate-500 mb-2`,children:[(0,O.jsx)(`span`,{className:`font-semibold text-slate-700`,children:`Sampled Coordinate Values`}),(0,O.jsxs)(`span`,{className:`font-mono`,children:[`x ∈ `,`{-2, -1, 0, 1, 2}`]})]}),(0,O.jsx)(`div`,{className:`grid grid-cols-5 gap-1.5 text-center font-mono text-xs tabular-nums`,children:[-2,-1,0,1,2].map(e=>{let t=Math.round(rt(n,e)*100)/100;return(0,O.jsxs)(`div`,{className:`py-1.5 px-1 rounded-md bg-slate-50 border border-slate-200/70`,children:[(0,O.jsxs)(`div`,{className:`text-[10px] text-slate-500`,children:[`x=`,e]}),(0,O.jsx)(`div`,{className:`font-bold text-slate-900`,children:t})]},e)})})]})]}),(0,O.jsxs)(`div`,{className:`lg:col-span-5 space-y-5`,children:[(0,O.jsxs)(`div`,{className:`bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 space-y-4`,children:[(0,O.jsxs)(`div`,{className:`flex items-center justify-between`,children:[(0,O.jsx)(`h2`,{className:`text-sm font-bold text-slate-900`,children:`Coefficient Controls`}),(0,O.jsxs)(`button`,{type:`button`,onClick:()=>r({mode:`linear`,m:1.5,b:1,c:0}),className:`text-xs font-medium text-slate-500 hover:text-slate-900 inline-flex items-center gap-1 cursor-pointer`,children:[(0,O.jsx)(se,{className:`w-3 h-3`}),`Reset`]})]}),(0,O.jsxs)(`div`,{className:`space-y-3 text-xs`,children:[(0,O.jsxs)(`label`,{className:`block space-y-1.5`,children:[(0,O.jsxs)(`div`,{className:`flex justify-between font-medium text-slate-700`,children:[(0,O.jsx)(`span`,{children:n.mode===`linear`?`Slope (m)`:n.mode===`quadratic`?`Leading Coefficient (a)`:`Amplitude (a)`}),(0,O.jsx)(`span`,{className:`font-mono font-bold text-[#1d4ed8]`,children:n.m})]}),(0,O.jsx)(`input`,{type:`range`,min:`-5`,max:`5`,step:`0.25`,value:n.m,onChange:e=>r(t=>({...t,m:Number(e.target.value)})),className:`w-full accent-[#1d4ed8]`})]}),(0,O.jsxs)(`label`,{className:`block space-y-1.5`,children:[(0,O.jsxs)(`div`,{className:`flex justify-between font-medium text-slate-700`,children:[(0,O.jsx)(`span`,{children:n.mode===`linear`?`y-Intercept (b)`:n.mode===`quadratic`?`Linear Term (b)`:`Frequency (b)`}),(0,O.jsx)(`span`,{className:`font-mono font-bold text-[#1d4ed8]`,children:n.b})]}),(0,O.jsx)(`input`,{type:`range`,min:`-8`,max:`8`,step:`0.5`,value:n.b,onChange:e=>r(t=>({...t,b:Number(e.target.value)})),className:`w-full accent-[#1d4ed8]`})]}),n.mode!==`linear`&&(0,O.jsxs)(`label`,{className:`block space-y-1.5`,children:[(0,O.jsxs)(`div`,{className:`flex justify-between font-medium text-slate-700`,children:[(0,O.jsx)(`span`,{children:`Vertical Shift (c)`}),(0,O.jsx)(`span`,{className:`font-mono font-bold text-[#1d4ed8]`,children:n.c})]}),(0,O.jsx)(`input`,{type:`range`,min:`-8`,max:`8`,step:`0.5`,value:n.c,onChange:e=>r(t=>({...t,c:Number(e.target.value)})),className:`w-full accent-[#1d4ed8]`})]})]})]}),(0,O.jsxs)(`div`,{className:`bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 space-y-3.5`,children:[(0,O.jsxs)(`div`,{className:`flex items-center justify-between gap-2`,children:[(0,O.jsx)(`span`,{className:`text-[11px] font-semibold uppercase tracking-wider text-[#1d4ed8]`,children:_.unit}),(0,O.jsxs)(`button`,{type:`button`,onClick:ee,className:`text-xs font-medium text-slate-500 hover:text-slate-900 inline-flex items-center gap-1 cursor-pointer`,children:[(0,O.jsx)(oe,{className:`w-3 h-3`}),`Next`]})]}),(0,O.jsx)(`p`,{className:`text-sm font-semibold text-slate-900 leading-snug`,children:_.prompt}),(0,O.jsxs)(`form`,{onSubmit:te,className:`flex items-center gap-2`,children:[(0,O.jsx)(`input`,{type:`text`,value:o,onChange:e=>s(e.target.value),placeholder:`Enter numeric answer...`,"aria-label":`Step check numeric answer`,className:`flex-1 h-9 px-3 rounded-lg border border-slate-200 bg-slate-50 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500`}),(0,O.jsx)(`button`,{type:`submit`,className:`h-9 px-3.5 rounded-lg bg-[#1d4ed8] hover:bg-[#1e40af] text-white text-xs font-semibold cursor-pointer`,children:`Check Step`})]}),(0,O.jsxs)(`div`,{className:`flex items-center justify-between text-xs`,children:[(0,O.jsxs)(`button`,{type:`button`,onClick:()=>l(e=>!e),className:`text-slate-500 hover:text-slate-900 inline-flex items-center gap-1 cursor-pointer`,children:[(0,O.jsx)(C,{className:`w-3.5 h-3.5`}),(0,O.jsx)(`span`,{children:c?`Hide Hint`:`Show Hint`})]}),(0,O.jsxs)(`span`,{className:`font-mono text-slate-500`,children:[`Streak: `,m.streak]})]}),c&&(0,O.jsx)(`div`,{className:`p-2.5 rounded-lg bg-blue-50/70 border border-blue-100 text-xs text-slate-700`,children:_.hint}),u.type!==`idle`&&(0,O.jsxs)(`div`,{className:`p-2.5 rounded-lg border text-xs flex items-start gap-2 ${u.type===`correct`?`bg-emerald-50 border-emerald-200 text-emerald-800`:`bg-rose-50 border-rose-200 text-rose-800`}`,children:[u.type===`correct`?(0,O.jsx)(re,{className:`w-4 h-4 shrink-0 mt-0.5`}):(0,O.jsx)(ie,{className:`w-4 h-4 shrink-0 mt-0.5`}),(0,O.jsx)(`span`,{children:u.message})]})]})]})]})]}),e===`practice`&&(0,O.jsxs)(`section`,{className:`max-w-3xl space-y-5`,children:[(0,O.jsxs)(`div`,{className:`space-y-1.5`,children:[(0,O.jsx)(`div`,{className:`text-xs font-semibold text-[#1d4ed8]`,children:_.unit}),(0,O.jsx)(`h1`,{className:`text-2xl font-extrabold text-slate-900`,children:`Worked Practice Problem`})]}),(0,O.jsxs)(`div`,{className:`bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-xs`,children:[(0,O.jsx)(`p`,{className:`text-base font-semibold text-slate-900`,children:_.prompt}),(0,O.jsxs)(`form`,{onSubmit:te,className:`flex flex-wrap items-center gap-2.5`,children:[(0,O.jsx)(`input`,{type:`text`,value:o,onChange:e=>s(e.target.value),placeholder:`Enter exact value...`,"aria-label":`Practice problem answer`,className:`flex-1 min-w-[180px] h-10 px-3 rounded-lg border border-slate-200 bg-slate-50 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500`}),(0,O.jsx)(`button`,{type:`submit`,className:`h-10 px-4 rounded-lg bg-[#1d4ed8] hover:bg-[#1e40af] text-white text-sm font-semibold cursor-pointer`,children:`Verify Answer`}),(0,O.jsx)(`button`,{type:`button`,onClick:ee,className:`h-10 px-4 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-sm font-semibold cursor-pointer`,children:`Next Problem`})]}),u.type!==`idle`&&(0,O.jsxs)(`div`,{className:`p-3 rounded-xl border text-xs space-y-1.5 ${u.type===`correct`?`bg-emerald-50 border-emerald-200 text-emerald-900`:`bg-rose-50 border-rose-200 text-rose-900`}`,children:[(0,O.jsx)(`div`,{className:`font-semibold`,children:u.message}),u.type===`correct`&&(0,O.jsx)(`ol`,{className:`list-decimal list-inside space-y-0.5 text-emerald-800`,children:_.steps.map((e,t)=>(0,O.jsx)(`li`,{children:e},t))})]}),(0,O.jsxs)(`div`,{className:`pt-2 border-t border-slate-100 text-xs text-slate-600`,children:[(0,O.jsx)(`span`,{className:`font-semibold text-slate-800`,children:`Method Hint: `}),_.hint]})]})]}),e===`formulas`&&(0,O.jsxs)(`section`,{className:`space-y-5`,children:[(0,O.jsxs)(`div`,{className:`flex flex-col sm:flex-row sm:items-end justify-between gap-3`,children:[(0,O.jsxs)(`div`,{children:[(0,O.jsx)(`div`,{className:`text-xs font-semibold text-[#1d4ed8]`,children:`Quick Reference`}),(0,O.jsx)(`h1`,{className:`text-2xl font-extrabold text-slate-900`,children:`Mathematics Formula Sheet`})]}),(0,O.jsx)(`div`,{className:`flex items-center gap-1.5 flex-wrap`,children:S.map(e=>(0,O.jsx)(`button`,{type:`button`,onClick:()=>p(e),className:`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition ${f===e?`bg-[#1d4ed8] text-white`:`bg-white border border-slate-200 text-slate-700 hover:bg-slate-100`}`,children:e},e))})]}),(0,O.jsx)(`div`,{className:`grid grid-cols-1 md:grid-cols-2 gap-4`,children:ce.map(e=>(0,O.jsxs)(`div`,{className:`bg-white rounded-xl border border-slate-200 p-5 space-y-2 shadow-2xs`,children:[(0,O.jsx)(`div`,{className:`text-[11px] font-semibold uppercase tracking-wider text-[#1d4ed8]`,children:e.category}),(0,O.jsx)(`h2`,{className:`text-sm font-bold text-slate-900`,children:e.name}),(0,O.jsx)(`div`,{className:`p-2.5 rounded-lg bg-slate-50 border border-slate-200 font-mono text-sm font-bold text-slate-900`,children:e.expression}),(0,O.jsx)(`p`,{className:`text-xs text-slate-600 leading-relaxed`,children:e.notes})]},e.id))})]}),e===`progress`&&(0,O.jsxs)(`section`,{className:`max-w-3xl space-y-5`,children:[(0,O.jsxs)(`div`,{className:`flex items-center justify-between gap-3`,children:[(0,O.jsxs)(`div`,{children:[(0,O.jsx)(`div`,{className:`text-xs font-semibold text-[#1d4ed8]`,children:`Mastery Telemetry`}),(0,O.jsx)(`h1`,{className:`text-2xl font-extrabold text-slate-900`,children:`Student Progress Overview`})]}),(0,O.jsx)(`button`,{type:`button`,onClick:()=>h({attempted:0,correct:0,streak:0,solvedIds:[]}),className:`px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 cursor-pointer`,children:`Reset Progress`})]}),(0,O.jsxs)(`div`,{className:`grid grid-cols-2 sm:grid-cols-4 gap-4`,children:[(0,O.jsxs)(`div`,{className:`bg-white rounded-xl border border-slate-200 p-4`,children:[(0,O.jsx)(`div`,{className:`text-xs text-slate-500`,children:`Problems Checked`}),(0,O.jsx)(`div`,{className:`text-2xl font-extrabold text-slate-900 mt-1 tabular-nums`,children:m.attempted})]}),(0,O.jsxs)(`div`,{className:`bg-white rounded-xl border border-slate-200 p-4`,children:[(0,O.jsx)(`div`,{className:`text-xs text-slate-500`,children:`Correct Solutions`}),(0,O.jsx)(`div`,{className:`text-2xl font-extrabold text-emerald-600 mt-1 tabular-nums`,children:m.correct})]}),(0,O.jsxs)(`div`,{className:`bg-white rounded-xl border border-slate-200 p-4`,children:[(0,O.jsx)(`div`,{className:`text-xs text-slate-500`,children:`Accuracy`}),(0,O.jsxs)(`div`,{className:`text-2xl font-extrabold text-[#1d4ed8] mt-1 tabular-nums`,children:[le,`%`]})]}),(0,O.jsxs)(`div`,{className:`bg-white rounded-xl border border-slate-200 p-4`,children:[(0,O.jsx)(`div`,{className:`text-xs text-slate-500`,children:`Current Streak`}),(0,O.jsx)(`div`,{className:`text-2xl font-extrabold text-slate-900 mt-1 tabular-nums`,children:m.streak})]})]})]})]})]})};function ft(){let e=(0,x.useMemo)(()=>{try{return typeof window<`u`&&Ae(window.location.search,window.name)}catch{return!1}},[]),[t,n]=(0,x.useState)(!1),r=(0,x.useMemo)(()=>e?et(typeof window<`u`?window.location.origin:``,de):``,[e]),i=(0,x.useCallback)(()=>{n(!1);let e=Me(je(window.location.origin)),t=new Blob([e],{type:`text/html`}),r=URL.createObjectURL(t);window.open(r,`VALemStandalone`,`popup=yes,width=1280,height=800,left=100,top=100,menubar=no,toolbar=no,location=no,status=no,resizable=yes`)||n(!0),setTimeout(()=>{URL.revokeObjectURL(r)},1e4)},[]);return(0,x.useEffect)(()=>{if(!t)return;let e=window.setTimeout(()=>n(!1),7e3);return()=>window.clearTimeout(e)},[t]),(0,x.useEffect)(()=>{let t=t=>{!e&&ke(t)?i():e&&t.key===`Escape`&&(t.preventDefault(),Ne(document,window))},n=t=>{e&&t?.data?.type===`valbrowse-panic`&&Ne(document,window)};return window.addEventListener(`keydown`,t,!0),window.addEventListener(`message`,n),()=>{window.removeEventListener(`keydown`,t,!0),window.removeEventListener(`message`,n)}},[e,i]),e&&r?(0,O.jsx)(`div`,{className:`fixed inset-0 z-50 bg-[#080406] flex flex-col`,role:`dialog`,"aria-modal":`true`,"aria-label":`VALem Workspace`,children:(0,O.jsx)(`iframe`,{"data-testid":`valbrowse-blob-iframe`,srcDoc:r,title:`VALem Workspace`,allow:`autoplay; gamepad; fullscreen`,className:`w-full h-full border-0 bg-[#0b0608]`})}):(0,O.jsxs)(`div`,{className:`min-h-screen bg-slate-50 text-slate-900`,children:[(0,O.jsx)(dt,{}),t&&(0,O.jsxs)(`div`,{role:`status`,"data-testid":`popup-blocked-toast`,className:`fixed bottom-4 right-4 z-[70] max-w-sm rounded-xl bg-zinc-900 border border-amber-500/40 shadow-2xl px-4 py-3 text-xs text-zinc-100 flex items-start gap-2.5`,children:[(0,O.jsx)(ce,{className:`w-4 h-4 text-amber-400 shrink-0 mt-0.5`}),(0,O.jsxs)(`div`,{className:`flex-1 leading-relaxed`,children:[`Popup blocked — allow popups for this site in your browser's address bar, then press`,` `,(0,O.jsx)(`strong`,{children:`Control`}),` again.`]}),(0,O.jsx)(`button`,{type:`button`,onClick:()=>n(!1),className:`text-zinc-400 hover:text-white cursor-pointer`,"aria-label":`Dismiss popup notice`,children:(0,O.jsx)(le,{className:`w-4 h-4`})})]})]})}try{typeof navigator<`u`&&`serviceWorker`in navigator&&typeof navigator.serviceWorker.getRegistrations==`function`&&navigator.serviceWorker.getRegistrations().then(e=>{e.forEach(e=>{try{E(e.scope,window.location.origin)||e.unregister()}catch{}})}).catch(()=>{})}catch{}(0,ue.createRoot)(document.getElementById(`root`)).render((0,O.jsx)(ft,{}));
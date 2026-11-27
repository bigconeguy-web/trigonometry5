var e=Object.create,t=Object.defineProperty,n=Object.getOwnPropertyDescriptor,r=Object.getOwnPropertyNames,i=Object.getPrototypeOf,a=Object.prototype.hasOwnProperty,o=(e,t)=>()=>(t||(e((t={exports:{}}).exports,t,t.exports),e=null),t.exports),s=(e,i,o,s)=>{if(i&&typeof i==`object`||typeof i==`function`)for(var c=r(i),l=0,u=c.length,d;l<u;l++)d=c[l],!a.call(e,d)&&d!==o&&t(e,d,{get:(e=>i[e]).bind(null,d),enumerable:!(s=n(i,d))||s.enumerable});return e},c=(n,r,o)=>(o=n==null?{}:e(i(n)),s(r||!n||!n.__esModule||!a.call(n,`default`)?t(o,`default`,{value:n,enumerable:!0}):o,n));(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var l=o((e=>{function t(e,t){var n=e.length;e.push(t);a:for(;0<n;){var r=n-1>>>1,a=e[r];if(0<i(a,t))e[r]=t,e[n]=a,n=r;else break a}}function n(e){return e.length===0?null:e[0]}function r(e){if(e.length===0)return null;var t=e[0],n=e.pop();if(n!==t){e[0]=n;a:for(var r=0,a=e.length,o=a>>>1;r<o;){var s=2*(r+1)-1,c=e[s],l=s+1,u=e[l];if(0>i(c,n))l<a&&0>i(u,c)?(e[r]=u,e[l]=n,r=l):(e[r]=c,e[s]=n,r=s);else if(l<a&&0>i(u,n))e[r]=u,e[l]=n,r=l;else break a}}return t}function i(e,t){var n=e.sortIndex-t.sortIndex;return n===0?e.id-t.id:n}if(e.unstable_now=void 0,typeof performance==`object`&&typeof performance.now==`function`){var a=performance;e.unstable_now=function(){return a.now()}}else{var o=Date,s=o.now();e.unstable_now=function(){return o.now()-s}}var c=[],l=[],u=1,d=null,f=3,p=!1,m=!1,h=!1,g=!1,_=typeof setTimeout==`function`?setTimeout:null,v=typeof clearTimeout==`function`?clearTimeout:null,y=typeof setImmediate<`u`?setImmediate:null;function b(e){for(var i=n(l);i!==null;){if(i.callback===null)r(l);else if(i.startTime<=e)r(l),i.sortIndex=i.expirationTime,t(c,i);else break;i=n(l)}}function ee(e){if(h=!1,b(e),!m){if(n(c)!==null)m=!0,te||(te=!0,ie());else{var t=n(l);t!==null&&se(ee,t.startTime-e)}}}var te=!1,x=-1,ne=5,S=-1;function re(){return g?!0:!(e.unstable_now()-S<ne)}function C(){if(g=!1,te){var t=e.unstable_now();S=t;var i=!0;try{a:{m=!1,h&&(h=!1,v(x),x=-1),p=!0;var a=f;try{b:{for(b(t),d=n(c);d!==null&&!(d.expirationTime>t&&re());){var o=d.callback;if(typeof o==`function`){d.callback=null,f=d.priorityLevel;var s=o(d.expirationTime<=t);if(t=e.unstable_now(),typeof s==`function`){d.callback=s,b(t),i=!0;break b}d===n(c)&&r(c),b(t)}else r(c);d=n(c)}if(d!==null)i=!0;else{var u=n(l);u!==null&&se(ee,u.startTime-t),i=!1}}break a}finally{d=null,f=a,p=!1}i=void 0}}finally{i?ie():te=!1}}}var ie;if(typeof y==`function`)ie=function(){y(C)};else if(typeof MessageChannel<`u`){var ae=new MessageChannel,oe=ae.port2;ae.port1.onmessage=C,ie=function(){oe.postMessage(null)}}else ie=function(){_(C,0)};function se(t,n){x=_(function(){t(e.unstable_now())},n)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(e){e.callback=null},e.unstable_forceFrameRate=function(e){0>e||125<e?console.error(`forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported`):ne=0<e?Math.floor(1e3/e):5},e.unstable_getCurrentPriorityLevel=function(){return f},e.unstable_next=function(e){switch(f){case 1:case 2:case 3:var t=3;break;default:t=f}var n=f;f=t;try{return e()}finally{f=n}},e.unstable_requestPaint=function(){g=!0},e.unstable_runWithPriority=function(e,t){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var n=f;f=e;try{return t()}finally{f=n}},e.unstable_scheduleCallback=function(r,i,a){var o=e.unstable_now();switch(typeof a==`object`&&a?(a=a.delay,a=typeof a==`number`&&0<a?o+a:o):a=o,r){case 1:var s=-1;break;case 2:s=250;break;case 5:s=1073741823;break;case 4:s=1e4;break;default:s=5e3}return s=a+s,r={id:u++,callback:i,priorityLevel:r,startTime:a,expirationTime:s,sortIndex:-1},a>o?(r.sortIndex=a,t(l,r),n(c)===null&&r===n(l)&&(h?(v(x),x=-1):h=!0,se(ee,a-o))):(r.sortIndex=s,t(c,r),m||p||(m=!0,te||(te=!0,ie()))),r},e.unstable_shouldYield=re,e.unstable_wrapCallback=function(e){var t=f;return function(){var n=f;f=t;try{return e.apply(this,arguments)}finally{f=n}}}})),u=o(((e,t)=>{t.exports=l()})),d=o((e=>{var t=Symbol.for(`react.transitional.element`),n=Symbol.for(`react.portal`),r=Symbol.for(`react.fragment`),i=Symbol.for(`react.strict_mode`),a=Symbol.for(`react.profiler`),o=Symbol.for(`react.consumer`),s=Symbol.for(`react.context`),c=Symbol.for(`react.forward_ref`),l=Symbol.for(`react.suspense`),u=Symbol.for(`react.memo`),d=Symbol.for(`react.lazy`),f=Symbol.for(`react.activity`),p=Symbol.for(`react.view_transition`),m=Symbol.iterator;function h(e){return typeof e!=`object`||!e?null:(e=m&&e[m]||e[`@@iterator`],typeof e==`function`?e:null)}var g={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},_=Object.assign,v={};function y(e,t,n){this.props=e,this.context=t,this.refs=v,this.updater=n||g}y.prototype.isReactComponent={},y.prototype.setState=function(e,t){if(typeof e!=`object`&&typeof e!=`function`&&e!=null)throw Error(`takes an object of state variables to update or a function which returns an object of state variables.`);this.updater.enqueueSetState(this,e,t,`setState`)},y.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,`forceUpdate`)};function b(){}b.prototype=y.prototype;function ee(e,t,n){this.props=e,this.context=t,this.refs=v,this.updater=n||g}var te=ee.prototype=new b;te.constructor=ee,_(te,y.prototype),te.isPureReactComponent=!0;var x=Array.isArray;function ne(){}var S={H:null,A:null,T:null,S:null},re=Object.prototype.hasOwnProperty;function C(e,n,r){var i=r.ref;return{$$typeof:t,type:e,key:n,ref:i===void 0?null:i,props:r}}function ie(e,t){return C(e.type,t,e.props)}function ae(e){return typeof e==`object`&&!!e&&e.$$typeof===t}function oe(e){var t={"=":`=0`,":":`=2`};return`$`+e.replace(/[=:]/g,function(e){return t[e]})}var se=/\/+/g;function ce(e,t){return typeof e==`object`&&e&&e.key!=null?oe(``+e.key):t.toString(36)}function le(e){switch(e.status){case`fulfilled`:return e.value;case`rejected`:throw e.reason;default:switch(typeof e.status==`string`?e.then(ne,ne):(e.status=`pending`,e.then(function(t){e.status===`pending`&&(e.status=`fulfilled`,e.value=t)},function(t){e.status===`pending`&&(e.status=`rejected`,e.reason=t)})),e.status){case`fulfilled`:return e.value;case`rejected`:throw e.reason}}throw e}function ue(e,r,i,a,o){var s=typeof e;(s===`undefined`||s===`boolean`)&&(e=null);var c=!1;if(e===null)c=!0;else switch(s){case`bigint`:case`string`:case`number`:c=!0;break;case`object`:switch(e.$$typeof){case t:case n:c=!0;break;case d:return c=e._init,ue(c(e._payload),r,i,a,o)}}if(c)return o=o(e),c=a===``?`.`+ce(e,0):a,x(o)?(i=``,c!=null&&(i=c.replace(se,`$&/`)+`/`),ue(o,r,i,``,function(e){return e})):o!=null&&(ae(o)&&(o=ie(o,i+(o.key==null||e&&e.key===o.key?``:(``+o.key).replace(se,`$&/`)+`/`)+c)),r.push(o)),1;c=0;var l=a===``?`.`:a+`:`;if(x(e))for(var u=0;u<e.length;u++)a=e[u],s=l+ce(a,u),c+=ue(a,r,i,s,o);else if(u=h(e),typeof u==`function`)for(e=u.call(e),u=0;!(a=e.next()).done;)a=a.value,s=l+ce(a,u++),c+=ue(a,r,i,s,o);else if(s===`object`){if(typeof e.then==`function`)return ue(le(e),r,i,a,o);throw r=String(e),Error(`Objects are not valid as a React child (found: `+(r===`[object Object]`?`object with keys {`+Object.keys(e).join(`, `)+`}`:r)+`). If you meant to render a collection of children, use an array instead.`)}return c}function de(e,t,n){if(e==null)return e;var r=[],i=0;return ue(e,r,``,``,function(e){return t.call(n,e,i++)}),r}function fe(e){if(e._status===-1){var t=e._result,n=t();n.then(function(t){(e._status===0||e._status===-1)&&(e._status=1,e._result=t,n.status===void 0&&(n.status=`fulfilled`,n.value=t))},function(t){(e._status===0||e._status===-1)&&(e._status=2,e._result=t,n.status===void 0&&(n.status=`rejected`,n.reason=t))}),e._status===-1&&(e._status=0,e._result=n)}if(e._status===1)return e._result.default;throw e._result}var pe=typeof reportError==`function`?reportError:function(e){if(typeof window==`object`&&typeof window.ErrorEvent==`function`){var t=new window.ErrorEvent(`error`,{bubbles:!0,cancelable:!0,message:typeof e==`object`&&e&&typeof e.message==`string`?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process==`object`&&typeof process.emit==`function`){process.emit(`uncaughtException`,e);return}console.error(e)};function me(e){var t=S.T,n={};n.types=t===null?null:t.types,S.T=n;try{var r=e(),i=S.S;i!==null&&i(n,r),typeof r==`object`&&r&&typeof r.then==`function`&&r.then(ne,pe)}catch(e){pe(e)}finally{t!==null&&n.types!==null&&(t.types=n.types),S.T=t}}function he(e){var t=S.T;if(t!==null){var n=t.types;n===null?t.types=[e]:n.indexOf(e)===-1&&n.push(e)}else me(he.bind(null,e))}var w={map:de,forEach:function(e,t,n){de(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return de(e,function(){t++}),t},toArray:function(e){return de(e,function(e){return e})||[]},only:function(e){if(!ae(e))throw Error(`React.Children.only expected to receive a single React element child.`);return e}};e.Activity=f,e.Children=w,e.Component=y,e.Fragment=r,e.Profiler=a,e.PureComponent=ee,e.StrictMode=i,e.Suspense=l,e.ViewTransition=p,e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=S,e.__COMPILER_RUNTIME={__proto__:null,c:function(e){return S.H.useMemoCache(e)}},e.addTransitionType=he,e.cache=function(e){return function(){return e.apply(null,arguments)}},e.cacheSignal=function(){return null},e.cloneElement=function(e,t,n){if(e==null)throw Error(`The argument must be a React element, but you passed `+e+`.`);var r=_({},e.props),i=e.key;if(t!=null)for(a in t.key!==void 0&&(i=``+t.key),t)!re.call(t,a)||a===`key`||a===`__self`||a===`__source`||a===`ref`&&t.ref===void 0||(r[a]=t[a]);var a=arguments.length-2;if(a===1)r.children=n;else if(1<a){for(var o=Array(a),s=0;s<a;s++)o[s]=arguments[s+2];r.children=o}return C(e.type,i,r)},e.createContext=function(e){return e={$$typeof:s,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null},e.Provider=e,e.Consumer={$$typeof:o,_context:e},e},e.createElement=function(e,t,n){var r,i={},a=null;if(t!=null)for(r in t.key!==void 0&&(a=``+t.key),t)re.call(t,r)&&r!==`key`&&r!==`__self`&&r!==`__source`&&(i[r]=t[r]);var o=arguments.length-2;if(o===1)i.children=n;else if(1<o){for(var s=Array(o),c=0;c<o;c++)s[c]=arguments[c+2];i.children=s}if(e&&e.defaultProps)for(r in o=e.defaultProps,o)i[r]===void 0&&(i[r]=o[r]);return C(e,a,i)},e.createRef=function(){return{current:null}},e.forwardRef=function(e){return{$$typeof:c,render:e}},e.isValidElement=ae,e.lazy=function(e){return{$$typeof:d,_payload:{_status:-1,_result:e},_init:fe}},e.memo=function(e,t){return{$$typeof:u,type:e,compare:t===void 0?null:t}},e.startTransition=me,e.unstable_useCacheRefresh=function(){return S.H.useCacheRefresh()},e.use=function(e){return S.H.use(e)},e.useActionState=function(e,t,n){return S.H.useActionState(e,t,n)},e.useCallback=function(e,t){return S.H.useCallback(e,t)},e.useContext=function(e){return S.H.useContext(e)},e.useDebugValue=function(){},e.useDeferredValue=function(e,t){return S.H.useDeferredValue(e,t)},e.useEffect=function(e,t){return S.H.useEffect(e,t)},e.useEffectEvent=function(e){return S.H.useEffectEvent(e)},e.useId=function(){return S.H.useId()},e.useImperativeHandle=function(e,t,n){return S.H.useImperativeHandle(e,t,n)},e.useInsertionEffect=function(e,t){return S.H.useInsertionEffect(e,t)},e.useLayoutEffect=function(e,t){return S.H.useLayoutEffect(e,t)},e.useMemo=function(e,t){return S.H.useMemo(e,t)},e.useOptimistic=function(e,t){return S.H.useOptimistic(e,t)},e.useReducer=function(e,t,n){return S.H.useReducer(e,t,n)},e.useRef=function(e){return S.H.useRef(e)},e.useState=function(e){return S.H.useState(e)},e.useSyncExternalStore=function(e,t,n){return S.H.useSyncExternalStore(e,t,n)},e.useTransition=function(){return S.H.useTransition()},e.version=`19.3.1`})),f=o(((e,t)=>{t.exports=d()})),p=o((e=>{var t=f();function n(e){var t=`https://react.dev/errors/`+e;if(1<arguments.length){t+=`?args[]=`+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+=`&args[]=`+encodeURIComponent(arguments[n])}return`Minified React error #`+e+`; visit `+t+` for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`}function r(){}var i={d:{f:r,r:function(){throw Error(n(522))},D:r,C:r,L:r,m:r,X:r,S:r,M:r},p:0,findDOMNode:null},a=Symbol.for(`react.portal`),o=Symbol.for(`react.recoverable`),s=Symbol.for(`react.optimistic_key`);function c(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:a,key:r==null?null:r===s?s:``+r,children:e,containerInfo:t,implementation:n}}var l=t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function u(e,t){if(e===`font`)return``;if(typeof t==`string`)return t===`use-credentials`?t:``}e.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=i,e.browser=function(e){return{$$typeof:o,_reason:e}},e.createPortal=function(e,t){var r=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)throw Error(n(299));return c(e,t,null,r)},e.flushSync=function(e){var t=l.T,n=i.p;try{if(l.T=null,i.p=2,e)return e()}finally{l.T=t,i.p=n,i.d.f()}},e.preconnect=function(e,t){typeof e==`string`&&(t?(t=t.crossOrigin,t=typeof t==`string`?t===`use-credentials`?t:``:void 0):t=null,i.d.C(e,t))},e.prefetchDNS=function(e){typeof e==`string`&&i.d.D(e)},e.preinit=function(e,t){if(typeof e==`string`&&t&&typeof t.as==`string`){var n=t.as,r=u(n,t.crossOrigin),a=typeof t.integrity==`string`?t.integrity:void 0,o=typeof t.fetchPriority==`string`?t.fetchPriority:void 0;n===`style`?i.d.S(e,typeof t.precedence==`string`?t.precedence:void 0,{crossOrigin:r,integrity:a,fetchPriority:o}):n===`script`&&i.d.X(e,{crossOrigin:r,integrity:a,fetchPriority:o,nonce:typeof t.nonce==`string`?t.nonce:void 0})}},e.preinitModule=function(e,t){if(typeof e==`string`){if(typeof t==`object`&&t){if(t.as==null||t.as===`script`){var n=u(t.as,t.crossOrigin);i.d.M(e,{crossOrigin:n,integrity:typeof t.integrity==`string`?t.integrity:void 0,nonce:typeof t.nonce==`string`?t.nonce:void 0,fetchPriority:typeof t.fetchPriority==`string`?t.fetchPriority:void 0})}}else t??i.d.M(e)}},e.preload=function(e,t){if(typeof e==`string`&&typeof t==`object`&&t&&typeof t.as==`string`){var n=t.as,r=u(n,t.crossOrigin);i.d.L(e,n,{crossOrigin:r,integrity:typeof t.integrity==`string`?t.integrity:void 0,nonce:typeof t.nonce==`string`?t.nonce:void 0,type:typeof t.type==`string`?t.type:void 0,fetchPriority:typeof t.fetchPriority==`string`?t.fetchPriority:void 0,referrerPolicy:typeof t.referrerPolicy==`string`?t.referrerPolicy:void 0,imageSrcSet:typeof t.imageSrcSet==`string`?t.imageSrcSet:void 0,imageSizes:typeof t.imageSizes==`string`?t.imageSizes:void 0,media:typeof t.media==`string`?t.media:void 0})}},e.preloadModule=function(e,t){if(typeof e==`string`){if(t){var n=u(t.as,t.crossOrigin);i.d.m(e,{as:typeof t.as==`string`&&t.as!==`script`?t.as:void 0,crossOrigin:n,integrity:typeof t.integrity==`string`?t.integrity:void 0,nonce:typeof t.nonce==`string`?t.nonce:void 0,fetchPriority:typeof t.fetchPriority==`string`?t.fetchPriority:void 0})}else i.d.m(e)}},e.requestFormReset=function(e){i.d.r(e)},e.unstable_batchedUpdates=function(e,t){return e(t)},e.useFormState=function(e,t,n){return l.H.useFormState(e,t,n)},e.useFormStatus=function(){return l.H.useHostTransitionStatus()},e.version=`19.3.1`})),m=o(((e,t)=>{function n(){if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<`u`&&typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE==`function`)try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(e){console.error(e)}}n(),t.exports=p()})),h=o((e=>{var t=u(),n=f(),r=m();function i(e){var t=`https://react.dev/errors/`+e;if(1<arguments.length){t+=`?args[]=`+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+=`&args[]=`+encodeURIComponent(arguments[n])}return`Minified React error #`+e+`; visit `+t+` for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`}function a(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function o(e){for(var t=e,n=t;n&&!n.alternate;)t=n,t.flags&4098&&(e=t.return),n=t.return;for(;t.return;)t=t.return;return t.tag===3?e:null}function s(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function c(e){if(e.tag===31){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function l(e){if(o(e)!==e)throw Error(i(188))}function d(e){var t=e.alternate;if(!t){if(t=o(e),t===null)throw Error(i(188));return t===e?e:null}for(var n=e,r=t;;){var a=n.return;if(a===null)break;var s=a.alternate;if(s===null){if(r=a.return,r!==null){n=r;continue}break}if(a.child===s.child){for(s=a.child;s;){if(s===n)return l(a),e;if(s===r)return l(a),t;s=s.sibling}throw Error(i(188))}if(n.return!==r.return)n=a,r=s;else{for(var c=!1,u=a.child;u;){if(u===n){c=!0,n=a,r=s;break}if(u===r){c=!0,r=a,n=s;break}u=u.sibling}if(!c){for(u=s.child;u;){if(u===n){c=!0,n=s,r=a;break}if(u===r){c=!0,r=s,n=a;break}u=u.sibling}if(!c)throw Error(i(189))}}if(n.alternate!==r)throw Error(i(190))}if(n.tag!==3)throw Error(i(188));return n.stateNode.current===n?e:t}function p(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e;for(e=e.child;e!==null;){if(t=p(e),t!==null)return t;e=e.sibling}return null}function h(e,t,n,r,i,a){for(;e!==null;){if((e.tag===5||e.tag===27||e.tag===6)&&n(e,r,i,a)||(e.tag!==22||e.memoizedState===null)&&(t||e.tag!==5&&e.tag!==27)&&h(e.child,t,n,r,i,a))return!0;e=e.sibling}return!1}function g(e){for(e=e.return;e!==null;){if(e.tag===3||e.tag===5||e.tag===27)return e;e=e.return}return null}function _(e){var t=!1;for(e=e.return;e!==null&&(e.tag===4&&(t=!0),e.tag!==3&&e.tag!==5&&e.tag!==27);)e=e.return;return t}function v(e){var t=[null,null],n=g(e);return n===null||y(t,e,n.child,{foundSelf:!1}),t}function y(e,t,n,r){for(;n!==null;){if(n===t)r.foundSelf=!0;else if(n.tag===5||n.tag===27||n.tag===6){if(r.foundSelf)return e[1]=n,!0;e[0]=n}else if((n.tag!==22||n.memoizedState===null)&&y(e,t,n.child,r))return!0;n=n.sibling}return!1}function b(e){switch(e.tag){case 5:case 27:case 6:return e.stateNode;case 3:return e.stateNode.containerInfo;default:throw Error(i(559))}}var ee=null,te=null;function x(e,t,n){return e===n||e===t&&(ee=e,!0)}function ne(e,t,n){return e===n?(te=e,!1):e===t&&(te!==null&&(ee=e),!0)}function S(e){if(e===null)return null;do e=e===null?null:e.return;while(e&&e.tag!==5&&e.tag!==27&&e.tag!==3);return e||null}function re(e,t,n){for(var r=0,i=e;i;i=n(i))r++;i=0;for(var a=t;a;a=n(a))i++;for(;0<r-i;)e=n(e),r--;for(;0<i-r;)t=n(t),i--;for(;r--;){if(e===t||t!==null&&e===t.alternate)return e;e=n(e),t=n(t)}return null}var C=Object.assign,ie=Symbol.for(`react.element`),ae=Symbol.for(`react.transitional.element`),oe=Symbol.for(`react.portal`),se=Symbol.for(`react.fragment`),ce=Symbol.for(`react.strict_mode`),le=Symbol.for(`react.profiler`),ue=Symbol.for(`react.consumer`),de=Symbol.for(`react.context`),fe=Symbol.for(`react.forward_ref`),pe=Symbol.for(`react.suspense`),me=Symbol.for(`react.suspense_list`),he=Symbol.for(`react.memo`),w=Symbol.for(`react.lazy`),ge=Symbol.for(`react.activity`),_e=Symbol.for(`react.legacy_hidden`),ve=Symbol.for(`react.memo_cache_sentinel`),ye=Symbol.for(`react.view_transition`),be=Symbol.for(`react.recoverable`),xe=Symbol.iterator;function Se(e){return typeof e!=`object`||!e?null:(e=xe&&e[xe]||e[`@@iterator`],typeof e==`function`?e:null)}var Ce=Symbol.for(`react.client.reference`);function we(e){if(e==null)return null;if(typeof e==`function`)return e.$$typeof===Ce?null:e.displayName||e.name||null;if(typeof e==`string`)return e;switch(e){case se:return`Fragment`;case le:return`Profiler`;case ce:return`StrictMode`;case pe:return`Suspense`;case me:return`SuspenseList`;case ge:return`Activity`;case ye:return`ViewTransition`}if(typeof e==`object`)switch(e.$$typeof){case oe:return`Portal`;case de:return e.displayName||`Context`;case ue:return(e._context.displayName||`Context`)+`.Consumer`;case fe:var t=e.render;return e=e.displayName,e||=(e=t.displayName||t.name||``,e===``?`ForwardRef`:`ForwardRef(`+e+`)`),e;case he:return t=e.displayName||null,t===null?we(e.type)||`Memo`:t;case w:t=e._payload,e=e._init;try{return we(e(t))}catch{}}return null}var Te=Array.isArray,T=n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,E=r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,Ee={pending:!1,data:null,method:null,action:null},De=[],Oe=-1;function ke(e){return{current:e}}function Ae(e){0>Oe||(e.current=De[Oe],De[Oe]=null,Oe--)}function D(e,t){Oe++,De[Oe]=e.current,e.current=t}var je=ke(null),Me=ke(null),Ne=ke(null),Pe=ke(null);function Fe(e,t){switch(D(Ne,t),D(Me,e),D(je,null),t.nodeType){case 9:case 11:e=(e=t.documentElement)&&(e=e.namespaceURI)?up(e):0;break;default:if(e=t.tagName,t=t.namespaceURI)t=up(t),e=dp(t,e);else switch(e){case`svg`:e=1;break;case`math`:e=2;break;default:e=0}}Ae(je),D(je,e)}function Ie(){Ae(je),Ae(Me),Ae(Ne)}function Le(e){var t=e.memoizedState;t!==null&&(sh._currentValue=t.memoizedState,D(Pe,e)),t=je.current;var n=dp(t,e.type);t!==n&&(D(Me,e),D(je,n))}function Re(e){Me.current===e&&(Ae(je),Ae(Me)),Pe.current===e&&(Ae(Pe),sh._currentValue=Ee)}var ze,Be;function Ve(e){if(ze===void 0)try{throw Error()}catch(e){var t=e.stack.trim().match(/\n( *(at )?)/);ze=t&&t[1]||``,Be=-1<e.stack.indexOf(`
    at`)?` (<anonymous>)`:-1<e.stack.indexOf(`@`)?`@unknown:0:0`:``}return`
`+ze+e+Be}var He=!1;function Ue(e,t){if(!e||He)return``;He=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var r={DetermineComponentFrameRoot:function(){try{if(t){var n=function(){throw Error()};if(Object.defineProperty(n.prototype,"props",{set:function(){throw Error()}}),typeof Reflect==`object`&&Reflect.construct){try{Reflect.construct(n,[])}catch(e){var r=e}Reflect.construct(e,[],n)}else{try{n.call()}catch(e){r=e}n=!1;try{var i=Object.getOwnPropertyDescriptor(e.prototype,`props`);Object.defineProperty(e.prototype,"props",{configurable:!0,set:function(){throw Error()}}),n=!0,new e}finally{n&&(i===void 0?delete e.prototype.props:Object.defineProperty(e.prototype,"props",i))}}}else{try{throw Error()}catch(e){r=e}(n=e())&&typeof n.catch==`function`&&n.catch(function(){})}}catch(e){if(e&&r&&typeof e.stack==`string`)return[e.stack,r.stack]}return[null,null]}};r.DetermineComponentFrameRoot.displayName=`DetermineComponentFrameRoot`;var i=Object.getOwnPropertyDescriptor(r.DetermineComponentFrameRoot,`name`);i&&i.configurable&&Object.defineProperty(r.DetermineComponentFrameRoot,"name",{value:`DetermineComponentFrameRoot`});var a=r.DetermineComponentFrameRoot(),o=a[0],s=a[1];if(o&&s){var c=o.split(`
`),l=s.split(`
`);for(i=r=0;r<c.length&&!c[r].includes(`DetermineComponentFrameRoot`);)r++;for(;i<l.length&&!l[i].includes(`DetermineComponentFrameRoot`);)i++;if(r===c.length||i===l.length)for(r=c.length-1,i=l.length-1;1<=r&&0<=i&&c[r]!==l[i];)i--;for(;1<=r&&0<=i;r--,i--)if(c[r]!==l[i]){if(r!==1||i!==1)do if(r--,i--,0>i||c[r]!==l[i]){var u=`
`+c[r].replace(` at new `,` at `);return e.displayName&&u.includes(`<anonymous>`)&&(u=u.replace(`<anonymous>`,e.displayName)),u}while(1<=r&&0<=i);break}}}finally{He=!1,Error.prepareStackTrace=n}return(n=e?e.displayName||e.name:``)?Ve(n):``}function We(e,t){switch(e.tag){case 26:case 27:case 5:return Ve(e.type);case 16:return Ve(`Lazy`);case 13:return e.child!==t&&t!==null?Ve(`Suspense Fallback`):Ve(`Suspense`);case 19:return Ve(`SuspenseList`);case 0:case 15:return Ue(e.type,!1);case 11:return Ue(e.type.render,!1);case 1:return Ue(e.type,!0);case 31:return Ve(`Activity`);case 30:return Ve(`ViewTransition`);default:return``}}function Ge(e){try{var t=``,n=null;do t+=We(e,n),n=e,e=e.return;while(e);return t}catch(e){return`
Error generating stack: `+e.message+`
`+e.stack}}var Ke=Object.prototype.hasOwnProperty,qe=t.unstable_scheduleCallback,Je=t.unstable_cancelCallback,Ye=t.unstable_shouldYield,Xe=t.unstable_requestPaint,Ze=t.unstable_now,Qe=t.unstable_getCurrentPriorityLevel,$e=t.unstable_ImmediatePriority,et=t.unstable_UserBlockingPriority,tt=t.unstable_NormalPriority,nt=t.unstable_LowPriority,rt=t.unstable_IdlePriority,it=t.log,at=t.unstable_setDisableYieldValue,ot=null,st=null;function ct(e){if(typeof it==`function`&&at(e),st&&typeof st.setStrictMode==`function`)try{st.setStrictMode(ot,e)}catch{}}var lt=Math.clz32?Math.clz32:ft,ut=Math.log,dt=Math.LN2;function ft(e){return e>>>=0,e===0?32:31-(ut(e)/dt|0)|0}var pt=256,mt=262144,ht=4194304;function gt(e){var t=e&42;if(t!==0)return t;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&-e;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function _t(e,t,n){var r=e.pendingLanes;if(r===0)return 0;var i=0,a=e.suspendedLanes,o=e.pingedLanes;e=e.warmLanes;var s=r&134217727;return s===0?(s=r&~a,s===0?o===0?n||(n=r&~e,n!==0&&(i=gt(n))):i=gt(o):i=gt(s)):(r=s&~a,r===0?(o&=s,o===0?n||(n=s&~e,n!==0&&(i=gt(n))):i=gt(o)):i=gt(r)),i===0?0:t!==0&&t!==i&&(t&a)===0&&(a=i&-i,n=t&-t,a>=n||a===32&&n&4194048)?t:i}function vt(e,t){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&t)===0}function yt(e,t){t&8&&(t|=t&32);var n=e.entangledLanes;if(n!==0)for(e=e.entanglements,n&=t;0<n;){var r=31-lt(n),i=1<<r;t|=e[r],n&=~i}return t}function bt(e,t){switch(e){case 1:case 2:case 4:case 8:case 64:return t+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function xt(){var e=ht;return ht<<=1,!(ht&62914560)&&(ht=4194304),e}function St(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function Ct(e,t){e.pendingLanes|=t,t!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function wt(e,t,n,r,i,a){var o=e.pendingLanes;e.pendingLanes=n,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=n,e.entangledLanes&=n,e.errorRecoveryDisabledLanes&=n,e.shellSuspendCounter=0;var s=e.entanglements,c=e.expirationTimes,l=e.hiddenUpdates;for(n=o&~n;0<n;){var u=31-lt(n),d=1<<u;s[u]=0,c[u]=-1;var f=l[u];if(f!==null)for(l[u]=null,u=0;u<f.length;u++){var p=f[u];p!==null&&(p.lane&=-536870913)}n&=~d}r!==0&&Tt(e,r,0),a!==0&&i===0&&e.tag!==0&&(e.suspendedLanes|=a&~(o&~t))}function Tt(e,t,n){e.pendingLanes|=t,e.suspendedLanes&=~t;var r=31-lt(t);e.entangledLanes|=t,e.entanglements[r]=e.entanglements[r]|1073741824|n&261930}function Et(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-lt(n),i=1<<r;i&t|e[r]&t&&(e[r]|=t),n&=~i}}function Dt(e,t){var n=t&-t;return n=n&42?1:Ot(n),(n&(e.suspendedLanes|t))===0?n:0}function Ot(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function kt(e){return e&=-e,2<e?8<e?e&134217727?32:268435456:8:2}function At(){var e=E.p;return e===0?(e=window.event,e===void 0?32:Ch(e.type)):e}function jt(e,t){var n=E.p;try{return E.p=e,t()}finally{E.p=n}}var Mt=Math.random().toString(36).slice(2),O=`__reactFiber$`+Mt,Nt=`__reactProps$`+Mt,Pt=`__reactContainer$`+Mt,Ft=`__reactEvents$`+Mt,It=`__reactListeners$`+Mt,Lt=`__reactHandles$`+Mt,Rt=`__reactResources$`+Mt,zt=`__reactMarker$`+Mt,Bt=`__reactLoad$`+Mt;function Vt(e){delete e[O],delete e[Nt],delete e[It],delete e[Lt]}function Ht(e){var t;if(t=e[O])return t;for(var n=e.parentNode;n;){if(t=n[Pt]||n[O]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=fm(e);e!==null;){if(n=e[O])return n;e=fm(e)}return t}e=n,n=e.parentNode}return null}function Ut(e){if(e=e[O]||e[Pt]){var t=e.tag;if(t===5||t===6||t===13||t===31||t===26||t===27||t===3)return e}return null}function Wt(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e.stateNode;throw Error(i(33))}function k(e){var t=e[Rt];return t||=e[Rt]={hoistableStyles:new Map,hoistableScripts:new Map},t}function A(e){e[zt]=!0}function Gt(e){e[Bt]=void 0}var Kt=new Set,qt={};function Jt(e,t){Yt(e,t),Yt(e+`Capture`,t)}function Yt(e,t){for(qt[e]=t,e=0;e<t.length;e++)Kt.add(t[e])}var Xt=RegExp(`^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$`),Zt={},Qt={};function $t(e){return Ke.call(Qt,e)?!0:Ke.call(Zt,e)?!1:Xt.test(e)?Qt[e]=!0:(Zt[e]=!0,!1)}var j=!1;function en(){var e=j;return j=!1,e}function tn(e,t,n){if($t(t)){if(n===null)e.removeAttribute(t);else{switch(typeof n){case`undefined`:case`function`:case`symbol`:e.removeAttribute(t);return;case`boolean`:var r=t.toLowerCase().slice(0,5);if(r!==`data-`&&r!==`aria-`){e.removeAttribute(t);return}}e.setAttribute(t,n)}}}function nn(e,t,n){if(n===null)e.removeAttribute(t);else{switch(typeof n){case`undefined`:case`function`:case`symbol`:case`boolean`:e.removeAttribute(t);return}e.setAttribute(t,n)}}function rn(e,t,n,r){if(r===null)e.removeAttribute(n);else{switch(typeof r){case`undefined`:case`function`:case`symbol`:case`boolean`:e.removeAttribute(n);return}e.setAttributeNS(t,n,r)}}function an(e){switch(typeof e){case`bigint`:case`boolean`:case`number`:case`string`:case`undefined`:return e;case`object`:return e;default:return``}}function on(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()===`input`&&(t===`checkbox`||t===`radio`)}function sn(e,t,n){var r=Object.getOwnPropertyDescriptor(e.constructor.prototype,t);if(!e.hasOwnProperty(t)&&r!==void 0&&typeof r.get==`function`&&typeof r.set==`function`){var i=r.get,a=r.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return i.call(this)},set:function(e){n=``+e,a.call(this,e)}}),Object.defineProperty(e,t,{enumerable:r.enumerable}),{getValue:function(){return n},setValue:function(e){n=``+e},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function cn(e){if(!e._valueTracker){var t=on(e)?`checked`:`value`;e._valueTracker=sn(e,t,``+e[t])}}function ln(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r=``;return e&&(r=on(e)?e.checked?`true`:`false`:e.value),e=r,e!==n&&(t.setValue(e),!0)}var un=/[\n"\\]/g;function dn(e){return e.replace(un,function(e){return`\\`+e.charCodeAt(0).toString(16)+` `})}function fn(e,t,n,r,i,a,o,s){e.name=``,o!=null&&typeof o!=`function`&&typeof o!=`symbol`&&typeof o!=`boolean`?e.type=o:e.removeAttribute(`type`),t==null?o!==`submit`&&o!==`reset`||e.removeAttribute(`value`):o===`number`?(t===0&&e.value===``||e.value!=t)&&(e.value=``+an(t)):e.value!==``+an(t)&&(e.value=``+an(t)),t==null?n==null?r!=null&&e.removeAttribute(`value`):mn(e,an(n)):o===`number`&&e.value==t?mn(e,an(e.value)):mn(e,an(t)),i==null&&a!=null&&(e.defaultChecked=!!a),i!=null&&(e.checked=i&&typeof i!=`function`&&typeof i!=`symbol`),s!=null&&typeof s!=`function`&&typeof s!=`symbol`&&typeof s!=`boolean`?e.name=``+an(s):e.removeAttribute(`name`)}function pn(e,t,n,r,i,a,o,s){if(a!=null&&typeof a!=`function`&&typeof a!=`symbol`&&typeof a!=`boolean`&&(e.type=a),t!=null||n!=null){if(!(a!==`submit`&&a!==`reset`||t!=null)){cn(e);return}n=n==null?``:``+an(n),t=t==null?n:``+an(t),s||t===e.value||(e.value=t),e.defaultValue=t}r??=i,r=typeof r!=`function`&&typeof r!=`symbol`&&!!r,e.checked=s?e.checked:!!r,e.defaultChecked=!!r,o!=null&&typeof o!=`function`&&typeof o!=`symbol`&&typeof o!=`boolean`&&(e.name=o),cn(e)}function mn(e,t){e.defaultValue!==``+t&&(e.defaultValue=``+t)}function hn(e,t,n,r){if(e=e.options,t){t={};for(var i=0;i<n.length;i++)t[`$`+n[i]]=!0;for(n=0;n<e.length;n++)i=t.hasOwnProperty(`$`+e[n].value),e[n].selected!==i&&(e[n].selected=i),i&&r&&(e[n].defaultSelected=!0)}else{for(n=``+an(n),t=null,i=0;i<e.length;i++){if(e[i].value===n){e[i].selected=!0,r&&(e[i].defaultSelected=!0);return}t!==null||e[i].disabled||(t=e[i])}t!==null&&(t.selected=!0)}}function gn(e,t,n){t!=null&&(t=``+an(t),t!==e.value&&(e.value=t),n==null)?e.defaultValue!==t&&(e.defaultValue=t):e.defaultValue=n==null?``:``+an(n)}function _n(e,t,n,r){if(t==null){if(r!=null){if(n!=null)throw Error(i(92));if(Te(r)){if(1<r.length)throw Error(i(93));r=r[0]}n=r}n??=``,t=n}n=an(t),e.defaultValue=n,r=e.textContent,r===n&&r!==``&&r!==null&&(e.value=r),cn(e)}function vn(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var yn=new Set(`animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp`.split(` `));function bn(e,t,n){var r=t.indexOf(`--`)===0;n==null||typeof n==`boolean`||n===``?r?e.setProperty(t,``):t===`float`?e.cssFloat=``:e[t]=``:r?e.setProperty(t,n):typeof n!=`number`||n===0||yn.has(t)?t===`float`?e.cssFloat=n:e[t]=(``+n).trim():e[t]=n+`px`}function xn(e,t,n){if(t!=null&&typeof t!=`object`)throw Error(i(62));if(e=e.style,n!=null){for(var r in n)!n.hasOwnProperty(r)||t!=null&&t.hasOwnProperty(r)||(r.indexOf(`--`)===0?e.setProperty(r,``):r===`float`?e.cssFloat=``:e[r]=``,j=!0);for(var a in t)r=t[a],t.hasOwnProperty(a)&&n[a]!==r&&(bn(e,a,r),j=!0)}else for(var o in t)t.hasOwnProperty(o)&&bn(e,o,t[o])}function Sn(e){if(e.indexOf(`-`)===-1)return!1;switch(e){case`annotation-xml`:case`color-profile`:case`font-face`:case`font-face-src`:case`font-face-uri`:case`font-face-format`:case`font-face-name`:case`missing-glyph`:return!1;default:return!0}}var Cn=new Map([[`acceptCharset`,`accept-charset`],[`htmlFor`,`for`],[`httpEquiv`,`http-equiv`],[`crossOrigin`,`crossorigin`],[`accentHeight`,`accent-height`],[`alignmentBaseline`,`alignment-baseline`],[`arabicForm`,`arabic-form`],[`baselineShift`,`baseline-shift`],[`capHeight`,`cap-height`],[`clipPath`,`clip-path`],[`clipRule`,`clip-rule`],[`colorInterpolation`,`color-interpolation`],[`colorInterpolationFilters`,`color-interpolation-filters`],[`colorProfile`,`color-profile`],[`colorRendering`,`color-rendering`],[`dominantBaseline`,`dominant-baseline`],[`enableBackground`,`enable-background`],[`fillOpacity`,`fill-opacity`],[`fillRule`,`fill-rule`],[`floodColor`,`flood-color`],[`floodOpacity`,`flood-opacity`],[`fontFamily`,`font-family`],[`fontSize`,`font-size`],[`fontSizeAdjust`,`font-size-adjust`],[`fontStretch`,`font-stretch`],[`fontStyle`,`font-style`],[`fontVariant`,`font-variant`],[`fontWeight`,`font-weight`],[`glyphName`,`glyph-name`],[`glyphOrientationHorizontal`,`glyph-orientation-horizontal`],[`glyphOrientationVertical`,`glyph-orientation-vertical`],[`horizAdvX`,`horiz-adv-x`],[`horizOriginX`,`horiz-origin-x`],[`imageRendering`,`image-rendering`],[`letterSpacing`,`letter-spacing`],[`lightingColor`,`lighting-color`],[`markerEnd`,`marker-end`],[`markerMid`,`marker-mid`],[`markerStart`,`marker-start`],[`maskType`,`mask-type`],[`overlinePosition`,`overline-position`],[`overlineThickness`,`overline-thickness`],[`paintOrder`,`paint-order`],[`panose-1`,`panose-1`],[`pointerEvents`,`pointer-events`],[`renderingIntent`,`rendering-intent`],[`shapeRendering`,`shape-rendering`],[`stopColor`,`stop-color`],[`stopOpacity`,`stop-opacity`],[`strikethroughPosition`,`strikethrough-position`],[`strikethroughThickness`,`strikethrough-thickness`],[`strokeDasharray`,`stroke-dasharray`],[`strokeDashoffset`,`stroke-dashoffset`],[`strokeLinecap`,`stroke-linecap`],[`strokeLinejoin`,`stroke-linejoin`],[`strokeMiterlimit`,`stroke-miterlimit`],[`strokeOpacity`,`stroke-opacity`],[`strokeWidth`,`stroke-width`],[`textAnchor`,`text-anchor`],[`textDecoration`,`text-decoration`],[`textRendering`,`text-rendering`],[`transformOrigin`,`transform-origin`],[`underlinePosition`,`underline-position`],[`underlineThickness`,`underline-thickness`],[`unicodeBidi`,`unicode-bidi`],[`unicodeRange`,`unicode-range`],[`unitsPerEm`,`units-per-em`],[`vAlphabetic`,`v-alphabetic`],[`vHanging`,`v-hanging`],[`vIdeographic`,`v-ideographic`],[`vMathematical`,`v-mathematical`],[`vectorEffect`,`vector-effect`],[`vertAdvY`,`vert-adv-y`],[`vertOriginX`,`vert-origin-x`],[`vertOriginY`,`vert-origin-y`],[`wordSpacing`,`word-spacing`],[`writingMode`,`writing-mode`],[`xmlnsXlink`,`xmlns:xlink`],[`xHeight`,`x-height`]]),wn=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function Tn(e){return wn.test(``+e)?`javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')`:e}function En(){}var Dn=null;function On(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var kn=null,An=null;function jn(e){var t=Ut(e);if(t&&(e=t.stateNode)){var n=e[Nt]||null;a:switch(e=t.stateNode,t.type){case`input`:if(fn(e,n.value,n.defaultValue,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name),t=n.name,n.type===`radio`&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll(`input[name="`+dn(``+t)+`"][type="radio"]`),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var a=r[Nt]||null;if(!a)throw Error(i(90));fn(r,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name)}}for(t=0;t<n.length;t++)r=n[t],r.form===e.form&&ln(r)}break a;case`textarea`:gn(e,n.value,n.defaultValue);break a;case`select`:t=n.value,t!=null&&hn(e,!!n.multiple,t,!1)}}}var Mn=!1;function Nn(e,t,n){if(Mn)return e(t,n);Mn=!0;try{return e(t)}finally{if(Mn=!1,(kn!==null||An!==null)&&(zd(),kn&&(t=kn,e=An,An=kn=null,jn(t),e)))for(t=0;t<e.length;t++)jn(e[t])}}function Pn(e,t){var n=e.stateNode;if(n===null)return null;var r=n[Nt]||null;if(r===null)return null;n=r[t];a:switch(t){case`onClick`:case`onClickCapture`:case`onDoubleClick`:case`onDoubleClickCapture`:case`onMouseDown`:case`onMouseDownCapture`:case`onMouseMove`:case`onMouseMoveCapture`:case`onMouseUp`:case`onMouseUpCapture`:case`onMouseEnter`:(r=!r.disabled)||(e=e.type,r=e!==`button`&&e!==`input`&&e!==`select`&&e!==`textarea`),e=!r;break a;default:e=!1}if(e)return null;if(n&&typeof n!=`function`)throw Error(i(231,t,typeof n));return n}var Fn=typeof window<`u`&&window.document!==void 0&&window.document.createElement!==void 0,In=!1;if(Fn)try{var Ln={};Object.defineProperty(Ln,"passive",{get:function(){In=!0}}),window.addEventListener(`test`,Ln,Ln),window.removeEventListener(`test`,Ln,Ln)}catch{In=!1}var Rn=null,zn=null,Bn=null;function Vn(){if(Bn)return Bn;var e,t=zn,n=t.length,r,i=`value`in Rn?Rn.value:Rn.textContent,a=i.length;for(e=0;e<n&&t[e]===i[e];e++);var o=n-e;for(r=1;r<=o&&t[n-r]===i[a-r];r++);return Bn=i.slice(e,1<r?1-r:void 0)}function Hn(e){var t=e.keyCode;return`charCode`in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function Un(){return!0}function Wn(){return!1}function Gn(e){function t(t,n,r,i,a){for(var o in this._reactName=t,this._targetInst=r,this.type=n,this.nativeEvent=i,this.target=a,this.currentTarget=null,e)e.hasOwnProperty(o)&&(t=e[o],this[o]=t?t(i):i[o]);return this.isDefaultPrevented=(i.defaultPrevented==null?!1===i.returnValue:i.defaultPrevented)?Un:Wn,this.isPropagationStopped=Wn,this}return C(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var e=this.nativeEvent;e&&(e.preventDefault?e.preventDefault():typeof e.returnValue!=`unknown`&&(e.returnValue=!1),this.isDefaultPrevented=Un)},stopPropagation:function(){var e=this.nativeEvent;e&&(e.stopPropagation?e.stopPropagation():typeof e.cancelBubble!=`unknown`&&(e.cancelBubble=!0),this.isPropagationStopped=Un)},persist:function(){},isPersistent:Un}),t}var Kn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},qn=Gn(Kn),Jn=C({},Kn,{view:0,detail:0}),Yn=Gn(Jn),Xn,Zn,Qn,$n=C({},Jn,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:ur,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return`movementX`in e?e.movementX:(e!==Qn&&(Qn&&e.type===`mousemove`?(Xn=e.screenX-Qn.screenX,Zn=e.screenY-Qn.screenY):Zn=Xn=0,Qn=e),Xn)},movementY:function(e){return`movementY`in e?e.movementY:Zn}}),er=Gn($n),tr=Gn(C({},$n,{dataTransfer:0})),nr=Gn(C({},Jn,{relatedTarget:0})),rr=Gn(C({},Kn,{animationName:0,elapsedTime:0,pseudoElement:0})),ir=Gn(C({},Kn,{clipboardData:function(e){return`clipboardData`in e?e.clipboardData:window.clipboardData}})),ar=Gn(C({},Kn,{data:0})),or={Esc:`Escape`,Spacebar:` `,Left:`ArrowLeft`,Up:`ArrowUp`,Right:`ArrowRight`,Down:`ArrowDown`,Del:`Delete`,Win:`OS`,Menu:`ContextMenu`,Apps:`ContextMenu`,Scroll:`ScrollLock`,MozPrintableKey:`Unidentified`},sr={8:`Backspace`,9:`Tab`,12:`Clear`,13:`Enter`,16:`Shift`,17:`Control`,18:`Alt`,19:`Pause`,20:`CapsLock`,27:`Escape`,32:` `,33:`PageUp`,34:`PageDown`,35:`End`,36:`Home`,37:`ArrowLeft`,38:`ArrowUp`,39:`ArrowRight`,40:`ArrowDown`,45:`Insert`,46:`Delete`,112:`F1`,113:`F2`,114:`F3`,115:`F4`,116:`F5`,117:`F6`,118:`F7`,119:`F8`,120:`F9`,121:`F10`,122:`F11`,123:`F12`,144:`NumLock`,145:`ScrollLock`,224:`Meta`},cr={Alt:`altKey`,Control:`ctrlKey`,Meta:`metaKey`,Shift:`shiftKey`};function lr(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=cr[e])?!!t[e]:!1}function ur(){return lr}var dr=Gn(C({},Jn,{key:function(e){if(e.key){var t=or[e.key]||e.key;if(t!==`Unidentified`)return t}return e.type===`keypress`?(e=Hn(e),e===13?`Enter`:String.fromCharCode(e)):e.type===`keydown`||e.type===`keyup`?sr[e.keyCode]||`Unidentified`:``},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:ur,charCode:function(e){return e.type===`keypress`?Hn(e):0},keyCode:function(e){return e.type===`keydown`||e.type===`keyup`?e.keyCode:0},which:function(e){return e.type===`keypress`?Hn(e):e.type===`keydown`||e.type===`keyup`?e.keyCode:0}})),fr=Gn(C({},$n,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0})),pr=Gn(C({},Kn,{submitter:0})),mr=Gn(C({},Jn,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:ur})),hr=Gn(C({},Kn,{propertyName:0,elapsedTime:0,pseudoElement:0})),gr=Gn(C({},$n,{deltaX:function(e){return`deltaX`in e?e.deltaX:`wheelDeltaX`in e?-e.wheelDeltaX:0},deltaY:function(e){return`deltaY`in e?e.deltaY:`wheelDeltaY`in e?-e.wheelDeltaY:`wheelDelta`in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0})),_r=Gn(C({},Kn,{newState:0,oldState:0,source:0})),vr=[9,13,27,32],yr=Fn&&`CompositionEvent`in window,br=null;Fn&&`documentMode`in document&&(br=document.documentMode);var xr=Fn&&`TextEvent`in window&&!br,Sr=Fn&&(!yr||br&&8<br&&11>=br),Cr=` `,wr=!1;function Tr(e,t){switch(e){case`keyup`:return vr.indexOf(t.keyCode)!==-1;case`keydown`:return t.keyCode!==229;case`keypress`:case`mousedown`:case`focusout`:return!0;default:return!1}}function Er(e){return e=e.detail,typeof e==`object`&&`data`in e?e.data:null}var Dr=!1;function Or(e,t){switch(e){case`compositionend`:return Er(t);case`keypress`:return t.which===32?(wr=!0,Cr):null;case`textInput`:return e=t.data,e===Cr&&wr?null:e;default:return null}}function kr(e,t){if(Dr)return e===`compositionend`||!yr&&Tr(e,t)?(e=Vn(),Bn=zn=Rn=null,Dr=!1,e):null;switch(e){case`paste`:return null;case`keypress`:if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case`compositionend`:return Sr&&t.locale!==`ko`?null:t.data;default:return null}}var Ar={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function jr(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t===`input`?!!Ar[e.type]:t===`textarea`}function Mr(e,t,n,r){kn?An?An.push(r):An=[r]:kn=r,t=Jf(t,`onChange`),0<t.length&&(n=new qn(`onChange`,`change`,null,n,r),e.push({event:n,listeners:t}))}var Nr=null,Pr=null;function Fr(e){Vf(e,0)}function Ir(e){if(ln(Wt(e)))return e}function Lr(e,t){if(e===`change`)return t}var Rr=!1;if(Fn){var zr;if(Fn){var Br=`oninput`in document;if(!Br){var Vr=document.createElement(`div`);Vr.setAttribute(`oninput`,`return;`),Br=typeof Vr.oninput==`function`}zr=Br}else zr=!1;Rr=zr&&(!document.documentMode||9<document.documentMode)}function Hr(){Nr&&(Nr.detachEvent(`onpropertychange`,Ur),Pr=Nr=null)}function Ur(e){if(e.propertyName===`value`&&Ir(Pr)){var t=[];Mr(t,Pr,e,On(e)),Nn(Fr,t)}}function Wr(e,t,n){e===`focusin`?(Hr(),Nr=t,Pr=n,Nr.attachEvent(`onpropertychange`,Ur)):e===`focusout`&&Hr()}function Gr(e){if(e===`selectionchange`||e===`keyup`||e===`keydown`)return Ir(Pr)}function Kr(e,t){if(e===`click`)return Ir(t)}function qr(e,t){if(e===`input`||e===`change`)return Ir(t)}function Jr(e,t){return e===t&&(e!==0||1/e==1/t)||e!==e&&t!==t}var Yr=typeof Object.is==`function`?Object.is:Jr;function Xr(e,t){if(Yr(e,t))return!0;if(typeof e!=`object`||!e||typeof t!=`object`||!t)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var i=n[r];if(!Ke.call(t,i)||!Yr(e[i],t[i]))return!1}return!0}function Zr(e){if(e||=typeof document<`u`?document:void 0,e===void 0)return null;try{return e.activeElement||e.body}catch{return e.body}}function Qr(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function $r(e,t){var n=Qr(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}a:{for(;n;){if(n.nextSibling){n=n.nextSibling;break a}n=n.parentNode}n=void 0}n=Qr(n)}}function ei(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?ei(e,t.parentNode):`contains`in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function ti(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var t=Zr(e.document);t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href==`string`}catch{n=!1}if(n)e=t.contentWindow;else break;t=Zr(e.document)}return t}function ni(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t===`input`&&(e.type===`text`||e.type===`search`||e.type===`tel`||e.type===`url`||e.type===`password`)||t===`textarea`||e.contentEditable===`true`)}var ri=Fn&&`documentMode`in document&&11>=document.documentMode,ii=null,ai=null,oi=null,si=!1;function ci(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;si||ii==null||ii!==Zr(r)||(r=ii,`selectionStart`in r&&ni(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),oi&&Xr(oi,r)||(oi=r,r=Jf(ai,`onSelect`),0<r.length&&(t=new qn(`onSelect`,`select`,null,t,n),e.push({event:t,listeners:r}),t.target=ii)))}function li(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n[`Webkit`+e]=`webkit`+t,n[`Moz`+e]=`moz`+t,n}var ui={animationend:li(`Animation`,`AnimationEnd`),animationiteration:li(`Animation`,`AnimationIteration`),animationstart:li(`Animation`,`AnimationStart`),transitionrun:li(`Transition`,`TransitionRun`),transitionstart:li(`Transition`,`TransitionStart`),transitioncancel:li(`Transition`,`TransitionCancel`),transitionend:li(`Transition`,`TransitionEnd`)},di={},fi={};Fn&&(fi=document.createElement(`div`).style,`AnimationEvent`in window||(delete ui.animationend.animation,delete ui.animationiteration.animation,delete ui.animationstart.animation),`TransitionEvent`in window||delete ui.transitionend.transition);function pi(e){if(di[e])return di[e];if(!ui[e])return e;var t=ui[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in fi)return di[e]=t[n];return e}var mi=pi(`animationend`),hi=pi(`animationiteration`),gi=pi(`animationstart`),_i=pi(`transitionrun`),vi=pi(`transitionstart`),yi=pi(`transitioncancel`),bi=pi(`transitionend`),xi=new Map,Si=`abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error fullscreenChange fullscreenError gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel`.split(` `);Si.push(`scrollEnd`);function Ci(e,t){xi.set(e,t),Jt(t,[e])}var wi=0;function Ti(e,t){if(e.name!=null&&e.name!==`auto`)return e.name;if(t.autoName!==null)return t.autoName;e=bd.identifierPrefix;var n=wi++;return e=`_`+e+`t_`+n.toString(32)+`_`,t.autoName=e}function Ei(e){if(e==null||typeof e==`string`)return e;var t=null,n=Od;if(n!==null)for(var r=0;r<n.length;r++){var i=e[n[r]];if(i!=null){if(i===`none`)return`none`;t=t==null?i:t+(` `+i)}}return t??e.default}function Di(e,t){return e=Ei(e),t=Ei(t),t==null?e===`auto`?null:e:t===`auto`?null:t}var Oi=typeof reportError==`function`?reportError:function(e){if(typeof window==`object`&&typeof window.ErrorEvent==`function`){var t=new window.ErrorEvent(`error`,{bubbles:!0,cancelable:!0,message:typeof e==`object`&&e&&typeof e.message==`string`?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process==`object`&&typeof process.emit==`function`){process.emit(`uncaughtException`,e);return}console.error(e)},ki=[],Ai=0,ji=0;function Mi(){for(var e=Ai,t=ji=Ai=0;t<e;){var n=ki[t];ki[t++]=null;var r=ki[t];ki[t++]=null;var i=ki[t];ki[t++]=null;var a=ki[t];if(ki[t++]=null,r!==null&&i!==null){var o=r.pending;o===null?i.next=i:(i.next=o.next,o.next=i),r.pending=i}a!==0&&Ii(n,i,a)}}function Ni(e,t,n,r){ki[Ai++]=e,ki[Ai++]=t,ki[Ai++]=n,ki[Ai++]=r,ji|=r,e.lanes|=r,e=e.alternate,e!==null&&(e.lanes|=r)}function Pi(e,t,n,r){return Ni(e,t,n,r),Li(e)}function Fi(e,t){return Ni(e,null,null,t),Li(e)}function Ii(e,t,n){e.lanes|=n;var r=e.alternate;r!==null&&(r.lanes|=n);for(var i=!1,a=e.return;a!==null;)a.childLanes|=n,r=a.alternate,r!==null&&(r.childLanes|=n),a.tag===22&&(e=a.stateNode,e===null||e._visibility&1||(i=!0)),e=a,a=a.return;return e.tag===3?(a=e.stateNode,i&&t!==null&&(i=31-lt(n),e=a.hiddenUpdates,r=e[i],r===null?e[i]=[t]:r.push(t),t.lane=n|536870912),a):null}function Li(e){if(50<kd)throw kd=0,Ad=null,Error(i(185));for(var t=e.return;t!==null;)e=t,t=e.return;return e.tag===3?e.stateNode:null}var Ri={};function zi(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Bi(e,t,n,r){return new zi(e,t,n,r)}function Vi(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Hi(e,t){var n=e.alternate;return n===null?(n=Bi(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&1206910976,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n.refCleanup=e.refCleanup,n}function Ui(e,t){e.flags&=1206910978;var n=e.alternate;return n===null?(e.childLanes=0,e.lanes=t,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=n.childLanes,e.lanes=n.lanes,e.child=n.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=n.memoizedProps,e.memoizedState=n.memoizedState,e.updateQueue=n.updateQueue,e.type=n.type,t=n.dependencies,e.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),e}function Wi(e,t,n,r,a,o){var s=0;if(r=e,typeof r==`function`)Vi(r)&&(s=1);else if(typeof r==`string`)s=qm(e,n,je.current)?26:e===`html`||e===`head`||e===`body`?27:5;else a:switch(r){case ge:return e=Bi(31,n,t,a),e.elementType=ge,e.lanes=o,e;case se:return Gi(n.children,a,o,t);case ce:s=8,a|=24;break;case le:return e=Bi(12,n,t,a|2),e.elementType=le,e.lanes=o,e;case pe:return e=Bi(13,n,t,a),e.elementType=pe,e.lanes=o,e;case me:return e=Bi(19,n,t,a),e.elementType=me,e.lanes=o,e;case _e:case ye:return e=a|32,e=Bi(30,n,t,e),e.elementType=ye,e.lanes=o,e.stateNode={autoName:null,paired:null,clones:null,ref:null},e;default:if(typeof r==`object`&&r)switch(r.$$typeof){case de:s=10;break a;case ue:s=9;break a;case fe:s=11;break a;case he:s=14;break a;case w:s=16,r=null;break a}s=29,n=Error(i(130,e===null?`null`:typeof e,``)),r=null}return t=Bi(s,n,t,a),t.elementType=e,t.type=r,t.lanes=o,t}function Gi(e,t,n,r){return e=Bi(7,e,r,t),e.lanes=n,e}function Ki(e,t,n){return e=Bi(6,e,null,t),e.lanes=n,e}function qi(e){var t=Bi(18,null,null,0);return t.stateNode=e,t}function Ji(e,t,n){return t=Bi(4,e.children===null?[]:e.children,e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}var Yi=new WeakMap;function Xi(e,t){if(typeof e==`object`&&e){var n=Yi.get(e);return n===void 0?(t={value:e,source:t,stack:Ge(t)},Yi.set(e,t),t):n}return{value:e,source:t,stack:Ge(t)}}var Zi=[],Qi=0,$i=null,ea=0,ta=[],na=0,ra=null,ia=1,aa=``;function oa(e,t){Zi[Qi++]=ea,Zi[Qi++]=$i,$i=e,ea=t}function sa(e,t,n){ta[na++]=ia,ta[na++]=aa,ta[na++]=ra,ra=e;var r=ia;e=aa;var i=32-lt(r)-1;r&=~(1<<i),n+=1;var a=32-lt(t)+i;if(30<a){var o=i-i%5;a=(r&(1<<o)-1).toString(32),r>>=o,i-=o,ia=1<<32-lt(t)+i|n<<i|r,aa=a+e}else ia=1<<a|n<<i|r,aa=e}function ca(e){e.return!==null&&(oa(e,1),sa(e,1,0))}function la(e){for(;e===$i;)$i=Zi[--Qi],Zi[Qi]=null,ea=Zi[--Qi],Zi[Qi]=null;for(;e===ra;)ra=ta[--na],ta[na]=null,aa=ta[--na],ta[na]=null,ia=ta[--na],ta[na]=null}function ua(e,t){ta[na++]=ia,ta[na++]=aa,ta[na++]=ra,ia=t.id,aa=t.overflow,ra=e}var da=null,M=null,N=!1,fa=null,pa=!1,ma=Error(i(519));function ha(e){throw xa(Xi(Error(i(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?`text`:`HTML`,``)),e)),ma}function ga(e){var t=e.stateNode,n=e.type,r=e.memoizedProps;switch(t[O]=e,t[Nt]=r,n){case`dialog`:Q(`cancel`,t),Q(`close`,t);break;case`iframe`:case`object`:case`embed`:Q(`load`,t);break;case`video`:case`audio`:for(n=0;n<zf.length;n++)Q(zf[n],t);break;case`source`:Q(`error`,t);break;case`img`:case`image`:case`link`:Q(`error`,t),Q(`load`,t);break;case`details`:Q(`toggle`,t);break;case`input`:Q(`invalid`,t),pn(t,r.value,r.defaultValue,r.checked,r.defaultChecked,r.type,r.name,!0);break;case`select`:Q(`invalid`,t);break;case`textarea`:Q(`invalid`,t),_n(t,r.value,r.defaultValue,r.children)}n=r.children,typeof n!=`string`&&typeof n!=`number`&&typeof n!=`bigint`||t.textContent===``+n||!0===r.suppressHydrationWarning||ep(t.textContent,n)?(r.popover!=null&&(Q(`beforetoggle`,t),Q(`toggle`,t)),r.onScroll!=null&&Q(`scroll`,t),r.onScrollEnd!=null&&Q(`scrollend`,t),r.onClick!=null&&(t.onclick=En),t=!0):t=!1,t||ha(e,!0)}function _a(e){for(da=e.return;da;)switch(da.tag){case 5:case 31:case 13:pa=!1;return;case 27:case 3:pa=!0;return;default:da=da.return}}function va(e){if(e!==da)return!1;if(!N)return _a(e),N=!0,!1;var t=e.tag,n;if((n=t!==3&&t!==27)&&((n=t===5)&&(n=e.type,n=n===`form`||n===`button`||pp(e.type,e.memoizedProps)),n=!n),n&&M&&ha(e),_a(e),t===13){if(e=e.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(i(317));M=dm(e)}else if(t===31){if(e=e.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(i(317));M=dm(e)}else t===27?(t=M,Sp(e.type)?(e=um,um=null,M=e):M=t):M=da?lm(e.stateNode.nextSibling):null;return!0}function ya(){M=da=null,N=!1}function ba(){var e=fa;return e!==null&&(pd===null?pd=e:pd.push.apply(pd,e),fa=null),e}function xa(e){fa===null?fa=[e]:fa.push(e)}var Sa=ke(null),Ca=null,wa=null;function Ta(e,t,n){D(Sa,t._currentValue),t._currentValue=n}function Ea(e){e._currentValue=Sa.current,Ae(Sa)}function Da(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)===t?r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t):(e.childLanes|=t,r!==null&&(r.childLanes|=t)),e===n)break;e=e.return}}function Oa(e,t,n,r){var a=e.child;for(a!==null&&(a.return=e);a!==null;){var o=a.dependencies;if(o!==null){var s=a.child;o=o.firstContext;a:for(;o!==null;){var c=o;o=a;for(var l=0;l<t.length;l++)if(c.context===t[l]){o.lanes|=n,c=o.alternate,c!==null&&(c.lanes|=n),Da(o.return,n,e),r||(s=null);break a}o=c.next}}else if(a.tag===18){if(s=a.return,s===null)throw Error(i(341));s.lanes|=n,o=s.alternate,o!==null&&(o.lanes|=n),Da(s,n,e),s=null}else a.tag===13&&a.memoizedState!==null&&a.memoizedState.dehydrated===null?(a.lanes|=n,s=a.alternate,s!==null&&(s.lanes|=n),Da(a.return,n,e),s=a.child,s=s===null?null:s.sibling):s=a.child;if(s!==null)s.return=a;else for(s=a;s!==null;){if(s===e){s=null;break}if(a=s.sibling,a!==null){a.return=s.return,s=a;break}s=s.return}a=s}}function ka(e,t,n,r){e=null;for(var a=t,o=!1;a!==null;){if(!o){if(a.flags&524288)o=!0;else if(a.flags&262144)break}if(a.tag===10){var s=a.alternate;if(s===null)throw Error(i(387));if(s=s.memoizedProps,s!==null){var c=a.type;Yr(a.pendingProps.value,s.value)||(e===null?e=[c]:e.push(c))}}else if(a===Pe.current){if(s=a.alternate,s===null)throw Error(i(387));s.memoizedState.memoizedState!==a.memoizedState.memoizedState&&(e===null?e=[sh]:e.push(sh))}a=a.return}return e!==null&&Oa(t,e,n,r),t.flags|=262144,e!==null}function Aa(e){for(e=e.firstContext;e!==null;){if(!Yr(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function ja(e){Ca=e,wa=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function Ma(e){return Pa(Ca,e)}function Na(e,t){return Ca===null&&ja(e),Pa(e,t)}function Pa(e,t){var n=t._currentValue;if(t={context:t,memoizedValue:n,next:null},wa===null){if(e===null)throw Error(i(308));wa=t,e.dependencies={lanes:0,firstContext:t},e.flags|=524288}else wa=wa.next=t;return n}var Fa=typeof AbortController<`u`?AbortController:function(){var e=[],t=this.signal={aborted:!1,addEventListener:function(t,n){e.push(n)}};this.abort=function(){t.aborted=!0,e.forEach(function(e){return e()})}},Ia=t.unstable_scheduleCallback,La=t.unstable_NormalPriority,P={$$typeof:de,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function Ra(){return{controller:new Fa,data:new Map,refCount:0}}function za(e){e.refCount--,e.refCount===0&&Ia(La,function(){e.controller.abort()})}function Ba(e,t){if(e.pendingLanes&4194048){var n=e.transitionTypes;for(n===null&&(n=e.transitionTypes=[]),e=0;e<t.length;e++){var r=t[e];n.indexOf(r)===-1&&n.push(r)}}}var Va=null;function Ha(e){var t=e.transitionTypes;return e.transitionTypes=null,t}var Ua=null,Wa=0,Ga=0,Ka=null;function qa(e,t){if(Ua===null){var n=Ua=[];Wa=0,Ga=Pf(),Ka={status:`pending`,value:void 0,then:function(e){n.push(e)}}}return Wa++,t.then(Ja,Ja),t}function Ja(){if(--Wa===0&&(Va=null,Ua!==null)){Ka!==null&&(Ka.status=`fulfilled`);var e=Ua;Ua=null,Ga=0,Ka=null;for(var t=0;t<e.length;t++)(0,e[t])()}}function Ya(e,t){var n=[],r={status:`pending`,value:null,reason:null,then:function(e){n.push(e)}};return e.then(function(){r.status=`fulfilled`,r.value=t;for(var e=0;e<n.length;e++)(0,n[e])(t)},function(e){for(r.status=`rejected`,r.reason=e,e=0;e<n.length;e++)(0,n[e])(void 0)}),r}var Xa=T.S;T.S=function(e,t){if(gd=Ze(),typeof t==`object`&&t&&typeof t.then==`function`&&qa(e,t),Va!==null)for(var n=bf;n!==null;)Ba(n,Va),n=n.next;if(n=e.types,n!==null){for(var r=bf;r!==null;)Ba(r,n),r=r.next;if(Ga!==0){r=Va,r===null&&(r=Va=[]);for(var i=0;i<n.length;i++){var a=n[i];r.indexOf(a)===-1&&r.push(a)}}}Xa!==null&&Xa(e,t)};var Za=ke(null);function Qa(){var e=Za.current;return e===null?G.pooledCache:e}function $a(e,t){t===null?D(Za,Za.current):D(Za,t.pool)}function eo(){var e=Qa();return e===null?null:{parent:P._currentValue,pool:e}}var to=Error(i(460)),no=Error(i(474)),ro=Error(i(542)),io={then:function(){}};function ao(e){return e=e.status,e===`fulfilled`||e===`rejected`}function oo(e,t,n){switch(n=e[n],n===void 0?e.push(t):n!==t&&(t.then(En,En),t=n),t.status){case`fulfilled`:return t.value;case`rejected`:throw e=t.reason,uo(e),e===void 0&&!(`reason`in t)?Error(i(600)):e;default:if(typeof t.status==`string`)t.then(En,En);else{if(e=G,e!==null&&100<e.shellSuspendCounter)throw Error(i(482));e=t,e.status=`pending`,e.then(function(e){if(t.status===`pending`){var n=t;n.status=`fulfilled`,n.value=e}},function(e){if(t.status===`pending`){var n=t;n.status=`rejected`,n.reason=e}})}switch(t.status){case`fulfilled`:return t.value;case`rejected`:throw e=t.reason,uo(e),e}throw co=t,to}}function so(e){try{var t=e._init;return t(e._payload)}catch(e){throw typeof e==`object`&&e&&typeof e.then==`function`?(co=e,to):e}}var co=null;function lo(){if(co===null)throw Error(i(459));var e=co;return co=null,e}function uo(e){if(e===to||e===ro)throw Error(i(483))}var fo=null,po=0;function mo(e){var t=po;return po+=1,fo===null&&(fo=[]),oo(fo,e,t)}function ho(e,t){t=t.props.ref,e.ref=t===void 0?null:t}function go(e,t){throw t.$$typeof===ie?Error(i(525)):(e=Object.prototype.toString.call(t),Error(i(31,e===`[object Object]`?`object with keys {`+Object.keys(t).join(`, `)+`}`:e)))}function _o(e){function t(t,n){if(e){var r=t.deletions;r===null?(t.deletions=[n],t.flags|=16):r.push(n)}}function n(n,r){if(!e)return null;for(;r!==null;)t(n,r),r=r.sibling;return null}function r(e){for(var t=new Map;e!==null;)e.key===null?t.set(e.index,e):t.set(e.key,e),e=e.sibling;return t}function a(e,t){return e=Hi(e,t),e.index=0,e.sibling=null,e}function o(t,n,r){return t.index=r,e?(r=t.alternate,r===null?(t.flags|=134217730,n):(r=r.index,r<n?(t.flags|=2,n):r)):(t.flags|=1048576,n)}function s(t){return e&&t.alternate===null&&(t.flags|=134217730),t}function c(e,t,n,r){return t===null||t.tag!==6?(t=Ki(n,e.mode,r),t.return=e,t):(t=a(t,n),t.return=e,t)}function l(e,t,n,r){var i=n.type;return i===se?(e=d(e,t,n.props.children,r,n.key),ho(e,n),e):t!==null&&(t.elementType===i||typeof i==`object`&&i&&i.$$typeof===w&&so(i)===t.type)?(t=a(t,n.props),ho(t,n),t.return=e,t):(t=Wi(n.type,n.key,n.props,null,e.mode,r),ho(t,n),t.return=e,t)}function u(e,t,n,r){return t===null||t.tag!==4||t.stateNode.containerInfo!==n.containerInfo||t.stateNode.implementation!==n.implementation?(t=Ji(n,e.mode,r),t.return=e,t):(t=a(t,n.children||[]),t.return=e,t)}function d(e,t,n,r,i){return t===null||t.tag!==7?(t=Gi(n,e.mode,r,i),t.return=e,t):(t=a(t,n),t.return=e,t)}function f(e,t,n){if(typeof t==`string`&&t!==``||typeof t==`number`||typeof t==`bigint`)return t=Ki(``+t,e.mode,n),t.return=e,t;if(typeof t==`object`&&t){switch(t.$$typeof){case ae:return n=Wi(t.type,t.key,t.props,null,e.mode,n),ho(n,t),n.return=e,n;case oe:return t=Ji(t,e.mode,n),t.return=e,t;case w:return t=so(t),f(e,t,n)}if(Te(t)||Se(t))return t=Gi(t,e.mode,n,null),t.return=e,t;if(typeof t.then==`function`)return f(e,mo(t),n);if(t.$$typeof===de)return f(e,Na(e,t),n);go(e,t)}return null}function p(e,t,n,r){var i=t===null?null:t.key;if(typeof n==`string`&&n!==``||typeof n==`number`||typeof n==`bigint`)return i===null?c(e,t,``+n,r):null;if(typeof n==`object`&&n){switch(n.$$typeof){case ae:return n.key===i?l(e,t,n,r):null;case oe:return n.key===i?u(e,t,n,r):null;case w:return n=so(n),p(e,t,n,r)}if(Te(n)||Se(n))return i===null?d(e,t,n,r,null):null;if(typeof n.then==`function`)return p(e,t,mo(n),r);if(n.$$typeof===de)return p(e,t,Na(e,n),r);go(e,n)}return null}function m(e,t,n,r,i){if(typeof r==`string`&&r!==``||typeof r==`number`||typeof r==`bigint`)return e=e.get(n)||null,c(t,e,``+r,i);if(typeof r==`object`&&r){switch(r.$$typeof){case ae:return e=e.get(r.key===null?n:r.key)||null,l(t,e,r,i);case oe:return e=e.get(r.key===null?n:r.key)||null,u(t,e,r,i);case w:return r=so(r),m(e,t,n,r,i)}if(Te(r)||Se(r))return e=e.get(n)||null,d(t,e,r,i,null);if(typeof r.then==`function`)return m(e,t,n,mo(r),i);if(r.$$typeof===de)return m(e,t,n,Na(t,r),i);go(t,r)}return null}function h(i,a,s,c){for(var l=null,u=null,d=a,h=a=0,g=null;d!==null&&h<s.length;h++){d.index>h?(g=d,d=null):g=d.sibling;var _=p(i,d,s[h],c);if(_===null){d===null&&(d=g);break}e&&d&&_.alternate===null&&t(i,d),a=o(_,a,h),u===null?l=_:u.sibling=_,u=_,d=g}if(h===s.length)return n(i,d),N&&oa(i,h),l;if(d===null){for(;h<s.length;h++)d=f(i,s[h],c),d!==null&&(a=o(d,a,h),u===null?l=d:u.sibling=d,u=d);return N&&oa(i,h),l}for(d=r(d);h<s.length;h++)g=m(d,i,h,s[h],c),g!==null&&(e&&(_=g.alternate,_!==null&&d.delete(_.key===null?h:_.key)),a=o(g,a,h),u===null?l=g:u.sibling=g,u=g);return e&&d.forEach(function(e){return t(i,e)}),N&&oa(i,h),l}function g(a,s,c,l){if(c==null)throw Error(i(151));for(var u=null,d=null,h=s,g=s=0,_=null,v=c.next();h!==null&&!v.done;g++,v=c.next()){h.index>g?(_=h,h=null):_=h.sibling;var y=p(a,h,v.value,l);if(y===null){h===null&&(h=_);break}e&&h&&y.alternate===null&&t(a,h),s=o(y,s,g),d===null?u=y:d.sibling=y,d=y,h=_}if(v.done)return n(a,h),N&&oa(a,g),u;if(h===null){for(;!v.done;g++,v=c.next())v=f(a,v.value,l),v!==null&&(s=o(v,s,g),d===null?u=v:d.sibling=v,d=v);return N&&oa(a,g),u}for(h=r(h);!v.done;g++,v=c.next())v=m(h,a,g,v.value,l),v!==null&&(e&&(_=v.alternate,_!==null&&h.delete(_.key===null?g:_.key)),s=o(v,s,g),d===null?u=v:d.sibling=v,d=v);return e&&h.forEach(function(e){return t(a,e)}),N&&oa(a,g),u}function _(e,r,o,c){if(typeof o==`object`&&o&&o.type===se&&o.key===null&&o.props.ref===void 0&&(o=o.props.children),typeof o==`object`&&o){switch(o.$$typeof){case ae:a:{for(var l=o.key;r!==null;){if(r.key===l){if(l=o.type,l===se){if(r.tag===7){n(e,r.sibling),c=a(r,o.props.children),ho(c,o),c.return=e,e=c;break a}}else if(r.elementType===l||typeof l==`object`&&l&&l.$$typeof===w&&so(l)===r.type){n(e,r.sibling),c=a(r,o.props),ho(c,o),c.return=e,e=c;break a}n(e,r);break}t(e,r),r=r.sibling}o.type===se?(c=Gi(o.props.children,e.mode,c,o.key),ho(c,o),c.return=e,e=c):(c=Wi(o.type,o.key,o.props,null,e.mode,c),ho(c,o),c.return=e,e=c)}return s(e);case oe:a:{for(l=o.key;r!==null;){if(r.key===l){if(r.tag===4&&r.stateNode.containerInfo===o.containerInfo&&r.stateNode.implementation===o.implementation){n(e,r.sibling),c=a(r,o.children||[]),c.return=e,e=c;break a}n(e,r);break}t(e,r),r=r.sibling}c=Ji(o,e.mode,c),c.return=e,e=c}return s(e);case w:return o=so(o),_(e,r,o,c)}if(Te(o))return h(e,r,o,c);if(Se(o)){if(l=Se(o),typeof l!=`function`)throw Error(i(150));return o=l.call(o),g(e,r,o,c)}if(typeof o.then==`function`)return _(e,r,mo(o),c);if(o.$$typeof===de)return _(e,r,Na(e,o),c);go(e,o)}return typeof o==`string`&&o!==``||typeof o==`number`||typeof o==`bigint`?(o=``+o,r!==null&&r.tag===6?(n(e,r.sibling),c=a(r,o),c.return=e,e=c):(n(e,r),c=Ki(o,e.mode,c),c.return=e,e=c),s(e)):n(e,r)}return function(e,t,n,r){try{po=0;var i=_(e,t,n,r);return fo=null,i}catch(t){if(t===to||t===ro)throw t;var a=Bi(29,t,null,e.mode);return a.lanes=r,a.return=e,a}}}var vo=_o(!0),yo=_o(!1),bo=!1;function xo(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function So(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function Co(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function wo(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,W&2){var i=r.pending;return i===null?t.next=t:(t.next=i.next,i.next=t),r.pending=t,t=Li(e),Ii(e,null,n),t}return Ni(e,r,t,n),Li(e)}function To(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,n&4194048)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,Et(e,n)}}function Eo(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var i=null,a=null;if(n=n.firstBaseUpdate,n!==null){do{var o={lane:n.lane,tag:n.tag,payload:n.payload,callback:null,next:null};a===null?i=a=o:a=a.next=o,n=n.next}while(n!==null);a===null?i=a=t:a=a.next=t}else i=a=t;n={baseState:r.baseState,firstBaseUpdate:i,lastBaseUpdate:a,shared:r.shared,callbacks:r.callbacks},e.updateQueue=n}else e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}var Do=!1;function Oo(){if(Do){var e=Ka;if(e!==null)throw e}}function ko(e,t,n,r){Do=!1;var i=e.updateQueue;bo=!1;var a=i.firstBaseUpdate,o=i.lastBaseUpdate,s=i.shared.pending;if(s!==null){i.shared.pending=null;var c=s,l=c.next;c.next=null,o===null?a=l:o.next=l,o=c;var u=e.alternate;u!==null&&(u=u.updateQueue,s=u.lastBaseUpdate,s!==o&&(s===null?u.firstBaseUpdate=l:s.next=l,u.lastBaseUpdate=c))}if(a!==null){var d=i.baseState;o=0,u=l=c=null,s=a;do{var f=s.lane&-536870913,p=f!==s.lane;if(p?(q&f)===f:(r&f)===f){f!==0&&f===Ga&&(Do=!0),u!==null&&(u=u.next={lane:0,tag:s.tag,payload:s.payload,callback:null,next:null});a:{var m=e,h=s;f=t;var g=n;switch(h.tag){case 1:if(m=h.payload,typeof m==`function`){d=m.call(g,d,f);break a}d=m;break a;case 3:m.flags=m.flags&-65537|128;case 0:if(m=h.payload,f=typeof m==`function`?m.call(g,d,f):m,f==null)break a;d=C({},d,f);break a;case 2:bo=!0}}f=s.callback,f!==null&&(e.flags|=64,p&&(e.flags|=8192),p=i.callbacks,p===null?i.callbacks=[f]:p.push(f))}else p={lane:f,tag:s.tag,payload:s.payload,callback:s.callback,next:null},u===null?(l=u=p,c=d):u=u.next=p,o|=f;if(s=s.next,s===null){if(s=i.shared.pending,s===null)break;p=s,s=p.next,p.next=null,i.lastBaseUpdate=p,i.shared.pending=null}}while(1);u===null&&(c=d),i.baseState=c,i.firstBaseUpdate=l,i.lastBaseUpdate=u,a===null&&(i.shared.lanes=0),sd|=o,e.lanes=o,e.memoizedState=d}}function Ao(e,t){if(typeof e!=`function`)throw Error(i(191,e));e.call(t)}function jo(e,t){var n=e.callbacks;if(n!==null)for(e.callbacks=null,e=0;e<n.length;e++)Ao(n[e],t)}var Mo=ke(null),No=ke(0);function Po(e,t){e=od,D(No,e),D(Mo,t),od=e|t.baseLanes}function Fo(){D(No,od),D(Mo,Mo.current)}function Io(){od=No.current,Ae(Mo),Ae(No)}var Lo=ke(null),Ro=null;function zo(e){var t=e.alternate;D(Wo,Wo.current&1),D(Lo,e),Ro===null&&(t===null||Mo.current!==null||t.memoizedState!==null)&&(Ro=e)}function Bo(e){D(Wo,Wo.current),D(Lo,e),Ro===null&&(Ro=e)}function Vo(e){e.tag===22?(D(Wo,Wo.current),D(Lo,e),Ro===null&&(Ro=e)):Ho()}function Ho(){D(Wo,Wo.current),D(Lo,Lo.current)}function Uo(e){Ae(Lo),Ro===e&&(Ro=null),Ae(Wo)}var Wo=ke(0);function Go(e,t){D(Lo,Lo.current),D(Wo,t)}function Ko(e){Ae(Wo),Ae(Lo),Ro===e&&(Ro=null)}function qo(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||om(n)||sm(n)))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==`independent`){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var Jo=0,F=null,I=null,L=null,Yo=!1,Xo=!1,Zo=!1,Qo=0,$o=0,es=null,ts=0;function R(){throw Error(i(321))}function ns(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!Yr(e[n],t[n]))return!1;return!0}function rs(e,t,n,r,i,a){return Jo=a,F=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,T.H=e===null||e.memoizedState===null?yc:bc,Zo=!1,a=n(r,i),Zo=!1,Xo&&(a=as(t,n,r,i)),is(e),a}function is(e){T.H=vc;var t=I!==null&&I.next!==null;if(Jo=0,L=I=F=null,Yo=!1,$o=0,es=null,t)throw Error(i(300));e===null||B||(e=e.dependencies,e!==null&&Aa(e)&&(B=!0))}function as(e,t,n,r){F=e;var a=0;do{if(Xo&&(es=null),$o=0,Xo=!1,25<=a)throw Error(i(301));if(a+=1,L=I=null,e.updateQueue!=null){var o=e.updateQueue;o.lastEffect=null,o.events=null,o.stores=null,o.memoCache!=null&&(o.memoCache.index=0)}T.H=xc,o=t(n,r)}while(Xo);return o}function os(){var e=T.H,t=e.useState()[0];return t=typeof t.then==`function`?fs(t):t,e=e.useState()[0],(I===null?null:I.memoizedState)!==e&&(F.flags|=1024),t}function ss(){var e=Qo!==0;return Qo=0,e}function cs(e,t,n){t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~n}function ls(e){if(Yo){for(e=e.memoizedState;e!==null;){var t=e.queue;t!==null&&(t.pending=null),e=e.next}Yo=!1}Jo=0,L=I=F=null,Xo=!1,$o=Qo=0,es=null}function us(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return L===null?F.memoizedState=L=e:L=L.next=e,L}function z(){if(I===null){var e=F.alternate;e=e===null?null:e.memoizedState}else e=I.next;var t=L===null?F.memoizedState:L.next;if(t!==null)L=t,I=e;else{if(e===null)throw F.alternate===null?Error(i(467)):Error(i(310));I=e,e={memoizedState:I.memoizedState,baseState:I.baseState,baseQueue:I.baseQueue,queue:I.queue,next:null},L===null?F.memoizedState=L=e:L=L.next=e}return L}function ds(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function fs(e){var t=$o;return $o+=1,es===null&&(es=[]),e=oo(es,e,t),t=F,(L===null?t.memoizedState:L.next)===null&&(t=t.alternate,T.H=t===null||t.memoizedState===null?yc:bc),e}function ps(e){if(typeof e==`object`&&e){if(typeof e.then==`function`)return fs(e);if(e.$$typeof===be)return;if(e.$$typeof===de)return Ma(e)}throw Error(i(438,String(e)))}function ms(e){var t=null,n=F.updateQueue;if(n!==null&&(t=n.memoCache),t==null){var r=F.alternate;r!==null&&(r=r.updateQueue,r!==null&&(r=r.memoCache,r!=null&&(t={data:r.data.map(function(e){return e.slice()}),index:0})))}if(t??={data:[],index:0},n===null&&(n=ds(),F.updateQueue=n),n.memoCache=t,n=t.data[t.index],n===void 0)for(n=t.data[t.index]=Array(e),r=0;r<e;r++)n[r]=ve;return t.index++,n}function hs(e,t){return typeof t==`function`?t(e):t}function gs(e){return _s(z(),I,e)}function _s(e,t,n){var r=e.queue;if(r===null)throw Error(i(311));r.lastRenderedReducer=n;var a=e.baseQueue,o=r.pending;if(o!==null){if(a!==null){var s=a.next;a.next=o.next,o.next=s}t.baseQueue=a=o,r.pending=null}if(o=e.baseState,a===null)e.memoizedState=o;else{t=a.next;var c=s=null,l=null,u=t,d=!1;do{var f=u.lane&-536870913;if(f===u.lane?(Jo&f)===f:(q&f)===f){var p=u.revertLane;if(p===0)l!==null&&(l=l.next={lane:0,revertLane:0,gesture:null,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null}),f===Ga&&(d=!0);else if((Jo&p)===p){u=u.next,p===Ga&&(d=!0);continue}else f={lane:0,revertLane:u.revertLane,gesture:null,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null},l===null?(c=l=f,s=o):l=l.next=f,F.lanes|=p,sd|=p;f=u.action,Zo&&n(o,f),o=u.hasEagerState?u.eagerState:n(o,f)}else p={lane:f,revertLane:u.revertLane,gesture:u.gesture,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null},l===null?(c=l=p,s=o):l=l.next=p,F.lanes|=f,sd|=f;u=u.next}while(u!==null&&u!==t);if(l===null?s=o:l.next=c,!Yr(o,e.memoizedState)&&(B=!0,d&&(n=Ka,n!==null)))throw n;e.memoizedState=o,e.baseState=s,e.baseQueue=l,r.lastRenderedState=o}return a===null&&(r.lanes=0),[e.memoizedState,r.dispatch]}function vs(e){var t=z(),n=t.queue;if(n===null)throw Error(i(311));n.lastRenderedReducer=e;var r=n.dispatch,a=n.pending,o=t.memoizedState;if(a!==null){n.pending=null;var s=a=a.next;do o=e(o,s.action),s=s.next;while(s!==a);Yr(o,t.memoizedState)||(B=!0),t.memoizedState=o,t.baseQueue===null&&(t.baseState=o),n.lastRenderedState=o}return[o,r]}function ys(e,t,n){var r=F,a=z(),o=N;if(o){if(n===void 0)throw Error(i(407));n=n()}else n=t();var s=!Yr((I||a).memoizedState,n);if(s&&(a.memoizedState=n,B=!0),a=a.queue,Ws(Ss.bind(null,r,a,e),[e]),e=a.getSnapshot!==t||s||L!==null&&!!(L.memoizedState.tag&1),zs(e?9:8,{destroy:void 0},xs.bind(null,r,a,n,t),null),e){if(r.flags|=2048,G===null)throw Error(i(349));o||Jo&127||bs(r,t,n)}return n}function bs(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=F.updateQueue,t===null?(t=ds(),F.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function xs(e,t,n,r){t.value=n,t.getSnapshot=r,Cs(t)&&ws(e)}function Ss(e,t,n){return n(function(){Cs(t)&&ws(e)})}function Cs(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!Yr(e,n)}catch{return!0}}function ws(e){var t=Fi(e,2);t!==null&&Pd(t,e,2)}function Ts(e){var t=us();if(typeof e==`function`){var n=e;if(e=n(),Zo){ct(!0);try{n()}finally{ct(!1)}}}return t.memoizedState=t.baseState=e,t.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:hs,lastRenderedState:e},t}function Es(e,t,n,r){return e.baseState=n,_s(e,I,typeof r==`function`?r:hs)}function Ds(e,t,n,r,a){if(hc(e))throw Error(i(485));if(e=t.action,e!==null){var o={payload:a,action:e,next:null,isTransition:!0,status:`pending`,value:null,reason:null,listeners:[],then:function(e){o.listeners.push(e)}};T.T===null?o.isTransition=!1:n(!0),r(o),n=t.pending,n===null?(o.next=t.pending=o,Os(t,o)):(o.next=n.next,t.pending=n.next=o)}}function Os(e,t){var n=t.action,r=t.payload,i=e.state;if(t.isTransition){var a=T.T,o={};o.types=a===null?null:a.types,T.T=o;try{var s=n(i,r),c=T.S;c!==null&&c(o,s),ks(e,t,s)}catch(n){js(e,t,n)}finally{a!==null&&o.types!==null&&(a.types=o.types),T.T=a}}else try{a=n(i,r),ks(e,t,a)}catch(n){js(e,t,n)}}function ks(e,t,n){typeof n==`object`&&n&&typeof n.then==`function`?n.then(function(n){As(e,t,n)},function(n){return js(e,t,n)}):As(e,t,n)}function As(e,t,n){t.status=`fulfilled`,t.value=n,Ms(t),e.state=n,t=e.pending,t!==null&&(n=t.next,n===t?e.pending=null:(n=n.next,t.next=n,Os(e,n)))}function js(e,t,n){var r=e.pending;if(e.pending=null,r!==null){r=r.next;do t.status=`rejected`,t.reason=n,Ms(t),t=t.next;while(t!==r)}e.action=null}function Ms(e){e=e.listeners;for(var t=0;t<e.length;t++)(0,e[t])()}function Ns(e,t){return t}function Ps(e,t){if(N){var n=G.formState;if(n!==null){a:{var r=F;if(N){if(M){b:{for(var i=M,a=pa;i.nodeType!==8;)if(!a||(i=lm(i.nextSibling),i===null)){i=null;break b}a=i.data,i=a===`F!`||a===`F`?i:null}if(i){M=lm(i.nextSibling),r=i.data===`F!`;break a}}ha(r)}r=!1}r&&(t=n[0])}}return n=us(),n.memoizedState=n.baseState=t,r={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Ns,lastRenderedState:t},n.queue=r,n=fc.bind(null,F,r),r.dispatch=n,r=Ts(!1),a=mc.bind(null,F,!1,r.queue),r=us(),i={state:t,dispatch:null,action:e,pending:null},r.queue=i,n=Ds.bind(null,F,i,a,n),i.dispatch=n,r.memoizedState=e,[t,n,!1]}function Fs(e){return Is(z(),I,e)}function Is(e,t,n){if(t=_s(e,t,Ns)[0],e=gs(hs)[0],typeof t==`object`&&t&&typeof t.then==`function`)try{var r=fs(t)}catch(e){throw e===to?ro:e}else r=t;t=z();var i=t.queue,a=i.dispatch;return n!==t.memoizedState&&(F.flags|=2048,zs(9,{destroy:void 0},Ls.bind(null,i,n),null)),[r,a,e]}function Ls(e,t){e.action=t}function Rs(e){var t=z(),n=I;if(n!==null)return Is(t,n,e);z(),t=t.memoizedState,n=z();var r=n.queue.dispatch;return n.memoizedState=e,[t,r,!1]}function zs(e,t,n,r){return e={tag:e,create:n,deps:r,inst:t,next:null},t=F.updateQueue,t===null&&(t=ds(),F.updateQueue=t),n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e),e}function Bs(){return z().memoizedState}function Vs(e,t,n,r){var i=us();F.flags|=e,i.memoizedState=zs(1|t,{destroy:void 0},n,r===void 0?null:r)}function Hs(e,t,n,r){var i=z();r=r===void 0?null:r;var a=i.memoizedState.inst;I!==null&&r!==null&&ns(r,I.memoizedState.deps)?i.memoizedState=zs(t,a,n,r):(F.flags|=e,i.memoizedState=zs(1|t,a,n,r))}function Us(e,t){Vs(8390656,8,e,t)}function Ws(e,t){Hs(2048,8,e,t)}function Gs(e){F.flags|=4;var t=F.updateQueue;if(t===null)t=ds(),F.updateQueue=t,t.events=[e];else{var n=t.events;n===null?t.events=[e]:n.push(e)}}function Ks(e){var t=z().memoizedState;return Gs({ref:t,nextImpl:e}),function(){if(W&2)throw Error(i(440));return t.impl.apply(void 0,arguments)}}function qs(e,t){return Hs(4,2,e,t)}function Js(e,t){return Hs(4,4,e,t)}function Ys(e,t){if(typeof t==`function`){e=e();var n=t(e);return function(){typeof n==`function`?n():t(null)}}if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function Xs(e,t,n){n=n==null?null:n.concat([e]),Hs(4,4,Ys.bind(null,t,e),n)}function Zs(){}function Qs(e,t){var n=z();t=t===void 0?null:t;var r=n.memoizedState;return t!==null&&ns(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function $s(e,t){var n=z();t=t===void 0?null:t;var r=n.memoizedState;if(t!==null&&ns(t,r[1]))return r[0];if(r=e(),Zo){ct(!0);try{e()}finally{ct(!1)}}return n.memoizedState=[r,t],r}function ec(e,t,n){return n===void 0||Jo&1073741824&&!(q&261930)?e.memoizedState=t:(e.memoizedState=n,e=Md(),F.lanes|=e,sd|=e,n)}function tc(e,t,n,r){return Yr(n,t)?n:Mo.current===null?!(Jo&106)||Jo&1073741824&&!(q&261930)?(B=!0,e.memoizedState=n):(e=Md(),F.lanes|=e,sd|=e,t):(e=ec(e,n,r),Yr(e,t)||(B=!0),e)}function nc(e,t,n,r,i){var a=E.p;E.p=a!==0&&8>a?a:8;var o=T.T,s={};s.types=o===null?null:o.types,T.T=s,mc(e,!1,t,n);try{var c=i(),l=T.S;l!==null&&l(s,c),typeof c==`object`&&c&&typeof c.then==`function`?pc(e,t,Ya(c,r),jd(e)):pc(e,t,r,jd(e))}catch(n){pc(e,t,{then:function(){},status:`rejected`,reason:n},jd())}finally{E.p=a,o!==null&&s.types!==null&&(o.types=s.types),T.T=o}}function rc(){}function ic(e,t,n,r){if(e.tag!==5)throw Error(i(476));var a=ac(e).queue;nc(e,a,t,Ee,n===null?rc:function(){return oc(e),n(r)})}function ac(e){var t=e.memoizedState;if(t!==null)return t;t={memoizedState:Ee,baseState:Ee,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:hs,lastRenderedState:Ee},next:null};var n={};return t.next={memoizedState:n,baseState:n,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:hs,lastRenderedState:n},next:null},e.memoizedState=t,e=e.alternate,e!==null&&(e.memoizedState=t),t}function oc(e){var t=ac(e);t.next===null&&(t=e.alternate.memoizedState),pc(e,t.next.queue,{},jd())}function sc(){return Ma(sh)}function cc(){return z().memoizedState}function lc(){return z().memoizedState}function uc(e){for(var t=e.return;t!==null;){switch(t.tag){case 24:case 3:var n=jd();e=Co(n);var r=wo(t,e,n);r!==null&&(Pd(r,t,n),To(r,t,n)),t={cache:Ra()},e.payload=t;return}t=t.return}}function dc(e,t,n){var r=jd();n={lane:r,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null},hc(e)?gc(t,n):(n=Pi(e,t,n,r),n!==null&&(Pd(n,e,r),_c(n,t,r)))}function fc(e,t,n){pc(e,t,n,jd())}function pc(e,t,n,r){var i={lane:r,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null};if(hc(e))gc(t,i);else{var a=e.alternate;if(e.lanes===0&&(a===null||a.lanes===0)&&(a=t.lastRenderedReducer,a!==null))try{var o=t.lastRenderedState,s=a(o,n);if(i.hasEagerState=!0,i.eagerState=s,Yr(s,o))return Ni(e,t,i,0),G===null&&Mi(),!1}catch{}if(n=Pi(e,t,i,r),n!==null)return Pd(n,e,r),_c(n,t,r),!0}return!1}function mc(e,t,n,r){if(r={lane:2,revertLane:Pf(),gesture:null,action:r,hasEagerState:!1,eagerState:null,next:null},hc(e)){if(t)throw Error(i(479))}else t=Pi(e,n,r,2),t!==null&&Pd(t,e,2)}function hc(e){var t=e.alternate;return e===F||t!==null&&t===F}function gc(e,t){Xo=Yo=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function _c(e,t,n){if(n&4194048){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,Et(e,n)}}var vc={readContext:Ma,use:ps,useCallback:R,useContext:R,useEffect:R,useImperativeHandle:R,useLayoutEffect:R,useInsertionEffect:R,useMemo:R,useReducer:R,useRef:R,useState:R,useDebugValue:R,useDeferredValue:R,useTransition:R,useSyncExternalStore:R,useId:R,useHostTransitionStatus:R,useFormState:R,useActionState:R,useOptimistic:R,useMemoCache:R,useCacheRefresh:R,useEffectEvent:R},yc={readContext:Ma,use:ps,useCallback:function(e,t){return us().memoizedState=[e,t===void 0?null:t],e},useContext:Ma,useEffect:Us,useImperativeHandle:function(e,t,n){n=n==null?null:n.concat([e]),Vs(4194308,4,Ys.bind(null,t,e),n)},useLayoutEffect:function(e,t){return Vs(4194308,4,e,t)},useInsertionEffect:function(e,t){Vs(4,2,e,t)},useMemo:function(e,t){var n=us();t=t===void 0?null:t;var r=e();if(Zo){ct(!0);try{e()}finally{ct(!1)}}return n.memoizedState=[r,t],r},useReducer:function(e,t,n){var r=us();if(n!==void 0){var i=n(t);if(Zo){ct(!0);try{n(t)}finally{ct(!1)}}}else i=t;return r.memoizedState=r.baseState=i,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:i},r.queue=e,e=e.dispatch=dc.bind(null,F,e),[r.memoizedState,e]},useRef:function(e){var t=us();return e={current:e},t.memoizedState=e},useState:function(e){e=Ts(e);var t=e.queue,n=fc.bind(null,F,t);return t.dispatch=n,[e.memoizedState,n]},useDebugValue:Zs,useDeferredValue:function(e,t){return ec(us(),e,t)},useTransition:function(){var e=Ts(!1);return e=nc.bind(null,F,e.queue,!0,!1),us().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,t,n){var r=F,a=us();if(N){if(n===void 0)throw Error(i(407));n=n()}else{if(n=t(),G===null)throw Error(i(349));q&127||bs(r,t,n)}a.memoizedState=n;var o={value:n,getSnapshot:t};return a.queue=o,Us(Ss.bind(null,r,o,e),[e]),r.flags|=2048,zs(9,{destroy:void 0},xs.bind(null,r,o,n,t),null),n},useId:function(){var e=us(),t=G.identifierPrefix;if(N){var n=aa,r=ia;n=(r&~(1<<32-lt(r)-1)).toString(32)+n,t=`_`+t+`R_`+n,n=Qo++,0<n&&(t+=`H`+n.toString(32)),t+=`_`}else n=ts++,t=`_`+t+`r_`+n.toString(32)+`_`;return e.memoizedState=t},useHostTransitionStatus:sc,useFormState:Ps,useActionState:Ps,useOptimistic:function(e){var t=us();t.memoizedState=t.baseState=e;var n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return t.queue=n,t=mc.bind(null,F,!0,n),n.dispatch=t,[e,t]},useMemoCache:ms,useCacheRefresh:function(){return us().memoizedState=uc.bind(null,F)},useEffectEvent:function(e){var t=us(),n={impl:e};return t.memoizedState=n,function(){if(W&2)throw Error(i(440));return n.impl.apply(void 0,arguments)}}},bc={readContext:Ma,use:ps,useCallback:Qs,useContext:Ma,useEffect:Ws,useImperativeHandle:Xs,useInsertionEffect:qs,useLayoutEffect:Js,useMemo:$s,useReducer:gs,useRef:Bs,useState:function(){return gs(hs)},useDebugValue:Zs,useDeferredValue:function(e,t){return tc(z(),I.memoizedState,e,t)},useTransition:function(){var e=gs(hs)[0],t=z().memoizedState;return[typeof e==`boolean`?e:fs(e),t]},useSyncExternalStore:ys,useId:cc,useHostTransitionStatus:sc,useFormState:Fs,useActionState:Fs,useOptimistic:function(e,t){return Es(z(),I,e,t)},useMemoCache:ms,useCacheRefresh:lc,useEffectEvent:Ks},xc={readContext:Ma,use:ps,useCallback:Qs,useContext:Ma,useEffect:Ws,useImperativeHandle:Xs,useInsertionEffect:qs,useLayoutEffect:Js,useMemo:$s,useReducer:vs,useRef:Bs,useState:function(){return vs(hs)},useDebugValue:Zs,useDeferredValue:function(e,t){var n=z();return I===null?ec(n,e,t):tc(n,I.memoizedState,e,t)},useTransition:function(){var e=vs(hs)[0],t=z().memoizedState;return[typeof e==`boolean`?e:fs(e),t]},useSyncExternalStore:ys,useId:cc,useHostTransitionStatus:sc,useFormState:Rs,useActionState:Rs,useOptimistic:function(e,t){var n=z();return I===null?(n.baseState=e,[e,n.queue.dispatch]):Es(n,I,e,t)},useMemoCache:ms,useCacheRefresh:lc,useEffectEvent:Ks};function Sc(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:C({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var Cc={enqueueSetState:function(e,t,n){e=e._reactInternals;var r=jd(),i=Co(r);i.payload=t,n!=null&&(i.callback=n),t=wo(e,i,r),t!==null&&(Pd(t,e,r),To(t,e,r))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=jd(),i=Co(r);i.tag=1,i.payload=t,n!=null&&(i.callback=n),t=wo(e,i,r),t!==null&&(Pd(t,e,r),To(t,e,r))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=jd(),r=Co(n);r.tag=2,t!=null&&(r.callback=t),t=wo(e,r,n),t!==null&&(Pd(t,e,n),To(t,e,n))}};function wc(e,t,n,r,i,a,o){return e=e.stateNode,typeof e.shouldComponentUpdate==`function`?e.shouldComponentUpdate(r,a,o):t.prototype&&t.prototype.isPureReactComponent?!Xr(n,r)||!Xr(i,a):!0}function Tc(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps==`function`&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps==`function`&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&Cc.enqueueReplaceState(t,t.state,null)}function Ec(e,t){var n=t;if(`ref`in t)for(var r in n={},t)r!==`ref`&&(n[r]=t[r]);if(e=e.defaultProps)for(var i in n===t&&(n=C({},n)),e)n[i]===void 0&&(n[i]=e[i]);return n}function Dc(e){Oi(e)}function Oc(e){console.error(e)}function kc(e){Oi(e)}function Ac(e,t){try{var n=e.onUncaughtError;n(t.value,{componentStack:t.stack})}catch(e){setTimeout(function(){throw e})}}function jc(e,t,n){try{var r=e.onCaughtError;r(n.value,{componentStack:n.stack,errorBoundary:t.tag===1?t.stateNode:null})}catch(e){setTimeout(function(){throw e})}}function Mc(e,t,n){return n=Co(n),n.tag=3,n.payload={element:null},n.callback=function(){Ac(e,t)},n}function Nc(e){return e=Co(e),e.tag=3,e}function Pc(e,t,n,r){var i=n.type.getDerivedStateFromError;if(typeof i==`function`){var a=r.value;e.payload=function(){return i(a)},e.callback=function(){jc(t,n,r)}}var o=n.stateNode;o!==null&&typeof o.componentDidCatch==`function`&&(e.callback=function(){jc(t,n,r),typeof i!=`function`&&(yd===null?yd=new Set([this]):yd.add(this));var e=r.stack;this.componentDidCatch(r.value,{componentStack:e===null?``:e})})}function Fc(e,t,n,r,a){if(n.flags|=32768,typeof r==`object`&&r&&typeof r.then==`function`){if(t=n.alternate,t!==null&&ka(t,n,a,!0),n=Lo.current,n!==null){switch(n.tag){case 31:case 13:case 19:return Ro===null?Kd():n.alternate===null&&Y===0&&(Y=3),n.flags&=-257,n.flags|=65536,n.lanes=a,r===io?n.flags|=16384:(t=n.updateQueue,t===null?n.updateQueue=new Set([r]):t.add(r),mf(e,r,a)),!1;case 22:return n.flags|=65536,r===io?n.flags|=16384:(t=n.updateQueue,t===null?(t={transitions:null,markerInstances:null,retryQueue:new Set([r])},n.updateQueue=t):(n=t.retryQueue,n===null?t.retryQueue=new Set([r]):n.add(r)),mf(e,r,a)),!1}throw Error(i(435,n.tag))}return mf(e,r,a),Kd(),!1}if(N)return t=Lo.current,t===null?(r!==ma&&(t=Error(i(423),{cause:r}),xa(Xi(t,n))),e=e.current.alternate,e.flags|=65536,a&=-a,e.lanes|=a,r=Xi(r,n),a=Mc(e.stateNode,r,a),Eo(e,a),Y!==4&&(Y=2)):(!(t.flags&65536)&&(t.flags|=256),t.flags|=65536,t.lanes=a,r!==ma&&(e=Error(i(422),{cause:r}),xa(Xi(e,n)))),!1;var o=Error(i(520),{cause:r});if(o=Xi(o,n),fd===null?fd=[o]:fd.push(o),Y!==4&&(Y=2),t===null)return!0;r=Xi(r,n),n=t;do{switch(n.tag){case 3:return n.flags|=65536,e=a&-a,n.lanes|=e,e=Mc(n.stateNode,r,e),Eo(n,e),!1;case 1:if(t=n.type,o=n.stateNode,!(n.flags&128)&&(typeof t.getDerivedStateFromError==`function`||o!==null&&typeof o.componentDidCatch==`function`&&(yd===null||!yd.has(o))))return n.flags|=65536,a&=-a,n.lanes|=a,a=Nc(a),Pc(a,e,n,r),Eo(n,a),!1;break;case 22:if(n.memoizedState!==null)return n.flags|=65536,!1}n=n.return}while(n!==null);return!1}var Ic=Error(i(461)),B=!1;function Lc(e,t,n,r){t.child=e===null?yo(t,null,n,r):vo(t,e.child,n,r)}function Rc(e,t,n,r,i){n=n.render;var a=t.ref;if(`ref`in r){var o={};for(var s in r)s!==`ref`&&(o[s]=r[s])}else o=r;return ja(t),r=rs(e,t,n,o,a,i),s=ss(),e!==null&&!B?(cs(e,t,i),fl(e,t,i)):(N&&s&&ca(t),t.flags|=1,Lc(e,t,r,i),t.child)}function zc(e,t,n,r,i){if(e===null){var a=n.type;return typeof a==`function`&&!Vi(a)&&a.defaultProps===void 0&&n.compare===null?(t.tag=15,t.type=a,Bc(e,t,a,r,i)):(e=Wi(n.type,null,r,t,t.mode,i),e.ref=t.ref,e.return=t,t.child=e)}if(a=e.child,!pl(e,i)){var o=a.memoizedProps;if(n=n.compare,n=n===null?Xr:n,n(o,r)&&e.ref===t.ref)return fl(e,t,i)}return t.flags|=1,e=Hi(a,r),e.ref=t.ref,e.return=t,t.child=e}function Bc(e,t,n,r,i){if(e!==null){var a=e.memoizedProps;if(Xr(a,r)&&e.ref===t.ref){if(B=!1,t.pendingProps=r=a,pl(e,i))e.flags&131072&&(B=!0);else return t.lanes=e.lanes,fl(e,t,i)}}return Jc(e,t,n,r,i)}function Vc(e,t,n,r){var i=r.children,a=e===null?null:e.memoizedState;if(e===null&&t.stateNode===null&&(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),r.mode===`hidden`){if(t.flags&128){if(a=a===null?n:a.baseLanes|n,e!==null){for(r=t.child=e.child,i=0;r!==null;)i=i|r.lanes|r.childLanes,r=r.sibling;r=i&~a}else r=0,t.child=null;return Uc(e,t,a,n,r)}if(n&536870912)t.memoizedState={baseLanes:0,cachePool:null},e!==null&&$a(t,a===null?null:a.cachePool),a===null?Fo():Po(t,a),Vo(t);else return r=t.lanes=536870912,Uc(e,t,a===null?n:a.baseLanes|n,n,r)}else a===null?(e!==null&&$a(t,null),Fo(),Ho()):($a(t,a.cachePool),Po(t,a),Ho(),t.memoizedState=null);return Lc(e,t,i,n),t.child}function Hc(e,t){return e!==null&&e.tag===22||t.stateNode!==null||(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),t.sibling}function Uc(e,t,n,r,i){var a=Qa();return a=a===null?null:{parent:P._currentValue,pool:a},t.memoizedState={baseLanes:n,cachePool:a},e!==null&&$a(t,null),Fo(),Vo(t),e!==null&&ka(e,t,r,!0),t.childLanes=i,null}function Wc(e,t){return t=rl({mode:t.mode,children:t.children},e.mode),t.ref=e.ref,e.child=t,t.return=e,t}function Gc(e,t,n){return vo(t,e.child,null,n),e=Wc(t,t.pendingProps),e.flags|=2,Uo(t),t.memoizedState=null,e}function Kc(e,t,n){var r=t.pendingProps,a=!!(t.flags&128);if(t.flags&=-129,e===null){if(N){if(r.mode===`hidden`)return e=Wc(t,r),t.lanes=536870912,e.memoizedState={baseLanes:0,cachePool:null},Hc(null,e);if(Bo(t),(e=M)?(e=am(e,pa),e=e!==null&&e.data===`&`?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:ra===null?null:{id:ia,overflow:aa},retryLane:536870912,hydrationErrors:null},n=qi(e),n.return=t,t.child=n,da=t,M=null)):e=null,e===null)throw ha(t);return t.lanes=536870912,null}return Wc(t,r)}var o=e.memoizedState;if(o!==null){var s=o.dehydrated;if(Bo(t),a){if(t.flags&256)t.flags&=-257,t=Gc(e,t,n);else if(t.memoizedState!==null)t.child=e.child,t.flags|=128,t=null;else throw Error(i(558))}else if(B||ka(e,t,n,!1),a=(n&e.childLanes)!==0,B||a){if(Mo.current===null){if(r=G,r!==null&&(s=Dt(r,n),s!==0&&s!==o.retryLane))throw o.retryLane=s,Fi(e,s),Pd(r,e,s),Ic;Kd()}t=Gc(e,t,n)}else e=o.treeContext,M=lm(s.nextSibling),da=t,N=!0,fa=null,pa=!1,e!==null&&ua(t,e),t=Wc(t,r),t.flags|=134221824;return t}return e=Hi(e.child,{mode:r.mode,children:r.children}),e.ref=t.ref,t.child=e,e.return=t,e}function qc(e,t){var n=t.ref;if(n===null)e!==null&&e.ref!==null&&(t.flags|=4194816);else{if(typeof n!=`function`&&typeof n!=`object`)throw Error(i(284));(e===null||e.ref!==n)&&(t.flags|=4194816)}}function Jc(e,t,n,r,i){return ja(t),n=rs(e,t,n,r,void 0,i),r=ss(),e!==null&&!B?(cs(e,t,i),fl(e,t,i)):(N&&r&&ca(t),t.flags|=1,Lc(e,t,n,i),t.child)}function Yc(e,t,n,r,i,a){return ja(t),t.updateQueue=null,n=as(t,r,n,i),is(e),r=ss(),e!==null&&!B?(cs(e,t,a),fl(e,t,a)):(N&&r&&ca(t),t.flags|=1,Lc(e,t,n,a),t.child)}function Xc(e,t,n,r,i){if(ja(t),t.stateNode===null){var a=Ri,o=n.contextType;typeof o==`object`&&o&&(a=Ma(o)),a=new n(r,a),t.memoizedState=a.state!==null&&a.state!==void 0?a.state:null,a.updater=Cc,t.stateNode=a,a._reactInternals=t,a=t.stateNode,a.props=r,a.state=t.memoizedState,a.refs={},xo(t),o=n.contextType,a.context=typeof o==`object`&&o?Ma(o):Ri,a.state=t.memoizedState,o=n.getDerivedStateFromProps,typeof o==`function`&&(Sc(t,n,o,r),a.state=t.memoizedState),typeof n.getDerivedStateFromProps==`function`||typeof a.getSnapshotBeforeUpdate==`function`||typeof a.UNSAFE_componentWillMount!=`function`&&typeof a.componentWillMount!=`function`||(o=a.state,typeof a.componentWillMount==`function`&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount==`function`&&a.UNSAFE_componentWillMount(),o!==a.state&&Cc.enqueueReplaceState(a,a.state,null),ko(t,r,a,i),Oo(),a.state=t.memoizedState),typeof a.componentDidMount==`function`&&(t.flags|=4194308),r=!0}else if(e===null){a=t.stateNode;var s=t.memoizedProps,c=Ec(n,s);a.props=c;var l=a.context,u=n.contextType;o=Ri,typeof u==`object`&&u&&(o=Ma(u));var d=n.getDerivedStateFromProps;u=typeof d==`function`||typeof a.getSnapshotBeforeUpdate==`function`,s=t.pendingProps!==s,u||typeof a.UNSAFE_componentWillReceiveProps!=`function`&&typeof a.componentWillReceiveProps!=`function`||(s||l!==o)&&Tc(t,a,r,o),bo=!1;var f=t.memoizedState;a.state=f,ko(t,r,a,i),Oo(),l=t.memoizedState,s||f!==l||bo?(typeof d==`function`&&(Sc(t,n,d,r),l=t.memoizedState),(c=bo||wc(t,n,c,r,f,l,o))?(u||typeof a.UNSAFE_componentWillMount!=`function`&&typeof a.componentWillMount!=`function`||(typeof a.componentWillMount==`function`&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount==`function`&&a.UNSAFE_componentWillMount()),typeof a.componentDidMount==`function`&&(t.flags|=4194308)):(typeof a.componentDidMount==`function`&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=l),a.props=r,a.state=l,a.context=o,r=c):(typeof a.componentDidMount==`function`&&(t.flags|=4194308),r=!1)}else{a=t.stateNode,So(e,t),o=t.memoizedProps,u=Ec(n,o),a.props=u,d=t.pendingProps,f=a.context,l=n.contextType,c=Ri,typeof l==`object`&&l&&(c=Ma(l)),s=n.getDerivedStateFromProps,(l=typeof s==`function`||typeof a.getSnapshotBeforeUpdate==`function`)||typeof a.UNSAFE_componentWillReceiveProps!=`function`&&typeof a.componentWillReceiveProps!=`function`||(o!==d||f!==c)&&Tc(t,a,r,c),bo=!1,f=t.memoizedState,a.state=f,ko(t,r,a,i),Oo();var p=t.memoizedState;o!==d||f!==p||bo||e!==null&&e.dependencies!==null&&Aa(e.dependencies)?(typeof s==`function`&&(Sc(t,n,s,r),p=t.memoizedState),(u=bo||wc(t,n,u,r,f,p,c)||e!==null&&e.dependencies!==null&&Aa(e.dependencies))?(l||typeof a.UNSAFE_componentWillUpdate!=`function`&&typeof a.componentWillUpdate!=`function`||(typeof a.componentWillUpdate==`function`&&a.componentWillUpdate(r,p,c),typeof a.UNSAFE_componentWillUpdate==`function`&&a.UNSAFE_componentWillUpdate(r,p,c)),typeof a.componentDidUpdate==`function`&&(t.flags|=4),typeof a.getSnapshotBeforeUpdate==`function`&&(t.flags|=1024)):(typeof a.componentDidUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=p),a.props=r,a.state=p,a.context=c,r=u):(typeof a.componentDidUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),r=!1)}return a=r,qc(e,t),r=!!(t.flags&128),a||r?(a=t.stateNode,n=r&&typeof n.getDerivedStateFromError!=`function`?null:a.render(),t.flags|=1,e!==null&&r?(t.child=vo(t,e.child,null,i),t.child=vo(t,null,n,i)):Lc(e,t,n,i),t.memoizedState=a.state,e=t.child):e=fl(e,t,i),e}function Zc(e,t,n,r){return ya(),t.flags|=256,Lc(e,t,n,r),t.child}var Qc={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function $c(e){return{baseLanes:e,cachePool:eo()}}function el(e,t,n){return e=e===null?0:e.childLanes&~n,t&&(e|=ud),e}function tl(e,t,n){var r=t.pendingProps,i=!1,a=!!(t.flags&128),o;if((o=a)||(o=e!==null&&e.memoizedState===null?!1:!!(Wo.current&2)),o&&(i=!0,t.flags&=-129),o=!!(t.flags&32),t.flags&=-33,e===null){if(N){if(i?zo(t):Ho(),(e=M)?(e=am(e,pa),e=e!==null&&e.data!==`&`?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:ra===null?null:{id:ia,overflow:aa},retryLane:536870912,hydrationErrors:null},n=qi(e),n.return=t,t.child=n,da=t,M=null)):e=null,e===null)throw ha(t);return t.lanes=sm(e)?32:536870912,null}return a=r.children,r=r.fallback,i?(Ho(),i=t.mode,a=rl({mode:`hidden`,children:a},i),r=Gi(r,i,n,null),a.return=t,r.return=t,a.sibling=r,t.child=a,r=t.child,r.memoizedState=$c(n),r.childLanes=el(e,o,n),t.memoizedState=Qc,Hc(null,r)):(zo(t),nl(t,a))}var s=e.memoizedState;if(s!==null){var c=s.dehydrated;if(c!==null)return al(e,t,a,o,r,c,s,n)}return i?(Ho(),i=r.fallback,a=t.mode,s=e.child,c=s.sibling,r=Hi(s,{mode:`hidden`,children:r.children}),r.subtreeFlags=s.subtreeFlags&1206910976,c===null?(i=Gi(i,a,n,null),i.flags|=2):i=Hi(c,i),i.return=t,r.return=t,r.sibling=i,t.child=r,Hc(null,r),r=t.child,i=e.child.memoizedState,i===null?i=$c(n):(a=i.cachePool,a===null?a=eo():(s=P._currentValue,a=a.parent===s?a:{parent:s,pool:s}),i={baseLanes:i.baseLanes|n,cachePool:a}),r.memoizedState=i,r.childLanes=el(e,o,n),t.memoizedState=Qc,Hc(e.child,r)):(zo(t),n=e.child,e=n.sibling,n=Hi(n,{mode:`visible`,children:r.children}),n.return=t,n.sibling=null,e!==null&&(o=t.deletions,o===null?(t.deletions=[e],t.flags|=16):o.push(e)),t.child=n,t.memoizedState=null,n)}function nl(e,t){return t=rl({mode:`visible`,children:t},e.mode),t.return=e,e.child=t}function rl(e,t){return e=Bi(22,e,null,t),e.lanes=0,e}function il(e,t,n){return vo(t,e.child,null,n),e=nl(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function al(e,t,n,r,a,o,s,c){if(n)return t.flags&256?(zo(t),t.flags&=-257,il(e,t,c)):t.memoizedState===null?(Ho(),o=a.fallback,s=t.mode,a=rl({mode:`visible`,children:a.children},s),o=Gi(o,s,c,null),o.flags|=2,a.return=t,o.return=t,a.sibling=o,t.child=a,vo(t,e.child,null,c),a=t.child,a.memoizedState=$c(c),a.childLanes=el(e,r,c),t.memoizedState=Qc,Hc(null,a)):(Ho(),t.child=e.child,t.flags|=128,null);if(zo(t),sm(o)){if(r=o.nextSibling&&o.nextSibling.dataset,r)var l=r.dgst;return r=l,r!==``&&(a=Error(i(419)),a.stack=``,a.digest=r,xa({value:a,source:null,stack:null})),il(e,t,c)}if(B||ka(e,t,c,!1),r=(c&e.childLanes)!==0,B||r){if(Mo.current!==null)return il(e,t,c);if(r=G,r!==null&&(a=Dt(r,c),a!==0&&a!==s.retryLane))throw s.retryLane=a,Fi(e,a),Pd(r,e,a),Ic;return om(o)||Kd(),il(e,t,c)}return om(o)?(t.flags|=192,t.child=e.child,null):(e=s.treeContext,M=lm(o.nextSibling),da=t,N=!0,fa=null,pa=!1,e!==null&&ua(t,e),t=nl(t,a.children),t.flags|=134221824,t)}function ol(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),Da(e.return,t,n)}function sl(e){for(var t=null;e!==null;){var n=e.alternate;n!==null&&qo(n)===null&&(t=e),e=e.sibling}return t}function cl(e,t,n,r,i,a){var o=e.memoizedState;o===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:i,treeForkCount:a}:(o.isBackwards=t,o.rendering=null,o.renderingStartTime=0,o.last=r,o.tail=n,o.tailMode=i,o.treeForkCount=a)}function ll(e){var t=e.child;for(e.child=null;t!==null;){var n=t.sibling;t.sibling=e.child,e.child=t,t=n}}function ul(e,t,n){var r=t.pendingProps,i=r.revealOrder,a=r.tail;r=r.children;var o=Wo.current;if(t.flags&128)return Go(t,o),null;var s=!!(o&2);if(s?(o=o&1|2,t.flags|=128):o&=1,Go(t,o),i===`backwards`&&e!==null?(ll(e),Lc(e,t,r,n),ll(e)):Lc(e,t,r,n),r=N?ea:0,!s&&e!==null&&e.flags&128)a:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&ol(e,n,t);else if(e.tag===19)ol(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break a;for(;e.sibling===null;){if(e.return===null||e.return===t)break a;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(i){case`backwards`:n=sl(t.child),n===null?(i=t.child,t.child=null):(i=n.sibling,n.sibling=null,ll(t)),cl(t,!0,i,null,a,r);break;case`unstable_legacy-backwards`:for(n=null,i=t.child,t.child=null;i!==null;){if(e=i.alternate,e!==null&&qo(e)===null){t.child=i;break}e=i.sibling,i.sibling=n,n=i,i=e}cl(t,!0,n,null,a,r);break;case`together`:cl(t,!1,null,null,void 0,r);break;case`independent`:t.memoizedState=null;break;default:n=sl(t.child),n===null?(i=t.child,t.child=null):(i=n.sibling,n.sibling=null),cl(t,!1,i,n,a,r)}return t.child}function dl(e,t,n){var r=t.pendingProps;return Ta(t,t.type,r.value),Lc(e,t,r.children,n),t.child}function fl(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),sd|=t.lanes,(n&t.childLanes)===0){if(e!==null){if(ka(e,t,n,!1),(n&t.childLanes)===0)return null}else return null}if(e!==null&&t.child!==e.child)throw Error(i(153));if(t.child!==null){for(e=t.child,n=Hi(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=Hi(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function pl(e,t){return(e.lanes&t)!==0||(e=e.dependencies,!!(e!==null&&Aa(e)))}function ml(e,t,n){switch(t.tag){case 3:Fe(t,t.stateNode.containerInfo),Ta(t,P,e.memoizedState.cache),ya();break;case 27:case 5:Le(t);break;case 4:Fe(t,t.stateNode.containerInfo);break;case 10:Ta(t,t.type,t.memoizedProps.value);break;case 31:if(t.memoizedState!==null)return t.flags|=128,Bo(t),null;break;case 13:var r=t.memoizedState;if(r!==null){if(r.dehydrated!==null)return zo(t),t.flags|=128,null;r=ka(e,t,n,!1);var i=t.child.childLanes;return r||(n&i)!==0?tl(e,t,n):(zo(t),e=fl(e,t,n),e===null?null:e.sibling)}zo(t);break;case 19:if(t.flags&128)return ul(e,t,n);if(i=!!(e.flags&128),r=(n&t.childLanes)!==0,r||=(ka(e,t,n,!1),(n&t.childLanes)!==0),i){if(r)return ul(e,t,n);t.flags|=128}if(i=t.memoizedState,i!==null&&(i.rendering=null,i.tail=null,i.lastEffect=null),Go(t,Wo.current),r)break;return null;case 22:return t.lanes=0,Vc(e,t,n,t.pendingProps);case 24:Ta(t,P,e.memoizedState.cache)}return fl(e,t,n)}function hl(e,t,n){if(e!==null){if(e.memoizedProps!==t.pendingProps)B=!0;else{if(!pl(e,n)&&!(t.flags&128))return B=!1,ml(e,t,n);B=!!(e.flags&131072)}}else B=!1,N&&t.flags&1048576&&sa(t,ea,t.index);switch(t.lanes=0,t.tag){case 16:a:{var r=t.pendingProps;if(e=so(t.elementType),t.type=e,typeof e==`function`)Vi(e)?(r=Ec(e,r),t.tag=1,t=Xc(null,t,e,r,n)):(t.tag=0,t=Jc(null,t,e,r,n));else{if(e!=null){var a=e.$$typeof;if(a===fe){t.tag=11,t=Rc(null,t,e,r,n);break a}if(a===he){t.tag=14,t=zc(null,t,e,r,n);break a}if(a===de){t.tag=10,t.type=e,t=dl(null,t,n);break a}}throw t=we(e)||e,Error(i(306,t,``))}}return t;case 0:return Jc(e,t,t.type,t.pendingProps,n);case 1:return r=t.type,a=Ec(r,t.pendingProps),Xc(e,t,r,a,n);case 3:a:{if(Fe(t,t.stateNode.containerInfo),e===null)throw Error(i(387));r=t.pendingProps;var o=t.memoizedState;a=o.element,So(e,t),ko(t,r,null,n);var s=t.memoizedState;if(r=s.cache,Ta(t,P,r),r!==o.cache&&Oa(t,[P],n,!0),Oo(),r=s.element,o.isDehydrated){if(o={element:r,isDehydrated:!1,cache:s.cache},t.updateQueue.baseState=o,t.memoizedState=o,t.flags&256){t=Zc(e,t,r,n);break a}if(r!==a){a=Xi(Error(i(424)),t),xa(a),t=Zc(e,t,r,n);break a}switch(e=t.stateNode.containerInfo,e.nodeType){case 9:e=e.body;break;default:e=e.nodeName===`HTML`?e.ownerDocument.body:e}for(M=lm(e.firstChild),da=t,N=!0,fa=null,pa=!0,n=yo(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|134221824,n=n.sibling}else{if(ya(),r===a){t=fl(e,t,n);break a}Lc(e,t,r,n)}t=t.child}return t;case 26:return qc(e,t),e===null?(n=Nm(t.type,null,t.pendingProps,null))?t.memoizedState=n:N||(t.stateNode=fp(t.type,t.pendingProps,Ne.current,t)):t.memoizedState=Nm(t.type,e.memoizedProps,t.pendingProps,e.memoizedState),null;case 27:return Le(t),e===null&&N&&(r=t.stateNode=hm(t.type,t.pendingProps,Ne.current),da=t,pa=!0,a=M,Sp(t.type)?(um=a,M=lm(r.firstChild)):M=a),Lc(e,t,t.pendingProps.children,n),qc(e,t),e===null&&(t.flags|=4194304),t.child;case 5:return e===null&&N&&((a=r=M)&&(r=rm(r,t.type,t.pendingProps,pa),r===null?a=!1:(t.stateNode=r,da=t,M=lm(r.firstChild),pa=!1,a=!0)),a||ha(t)),Le(t),a=t.type,o=t.pendingProps,s=e===null?null:e.memoizedProps,r=o.children,pp(a,o)?r=null:s!==null&&pp(a,s)&&(t.flags|=32),t.memoizedState!==null&&(a=rs(e,t,os,null,null,n),sh._currentValue=a),qc(e,t),Lc(e,t,r,n),t.child;case 6:return e===null&&N&&((e=n=M)&&(n=im(n,t.pendingProps,pa),n===null?e=!1:(t.stateNode=n,da=t,M=null,e=!0)),e||ha(t)),null;case 13:return tl(e,t,n);case 4:return Fe(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=vo(t,null,r,n):Lc(e,t,r,n),t.child;case 11:return Rc(e,t,t.type,t.pendingProps,n);case 7:return r=t.pendingProps,qc(e,t),Lc(e,t,r,n),t.child;case 8:return Lc(e,t,t.pendingProps.children,n),t.child;case 12:return Lc(e,t,t.pendingProps.children,n),t.child;case 10:return dl(e,t,n);case 9:return a=t.type._context,r=t.pendingProps.children,ja(t),a=Ma(a),r=r(a),t.flags|=1,Lc(e,t,r,n),t.child;case 14:return zc(e,t,t.type,t.pendingProps,n);case 15:return Bc(e,t,t.type,t.pendingProps,n);case 19:return ul(e,t,n);case 31:return Kc(e,t,n);case 22:return Vc(e,t,n,t.pendingProps);case 24:return ja(t),r=Ma(P),e===null?(a=Qa(),a===null&&(a=G,o=Ra(),a.pooledCache=o,o.refCount++,o!==null&&(a.pooledCacheLanes|=n),a=o),t.memoizedState={parent:r,cache:a},xo(t),Ta(t,P,a)):((e.lanes&n)!==0&&(So(e,t),ko(t,null,null,n),Oo()),a=e.memoizedState,o=t.memoizedState,a.parent===r?(r=o.cache,Ta(t,P,r),r!==a.cache&&Oa(t,[P],n,!0)):(a={parent:r,cache:r},t.memoizedState=a,t.lanes===0&&(t.memoizedState=t.updateQueue.baseState=a),Ta(t,P,r))),Lc(e,t,t.pendingProps.children,n),t.child;case 30:return t.stateNode===null&&(t.stateNode={autoName:null,paired:null,clones:null,ref:null}),r=t.pendingProps,r.name!=null&&r.name!==`auto`?t.flags|=e===null?18882560:18874368:N&&ca(t),e!==null&&e.memoizedProps.name!==r.name?t.flags|=4194816:qc(e,t),Lc(e,t,r.children,n),t.child;case 29:throw t.pendingProps}throw Error(i(156,t.tag))}function gl(e){e.flags|=4}function _l(e,t,n,r,i){var a;if((a=!!(e.mode&32))&&(a=n===null?Jm(t,r):Jm(t,r)&&(r.src!==n.src||r.srcSet!==n.srcSet)),a){if(e.flags|=16777216,(i&335544128)===i){if(e.stateNode.complete)e.flags|=8192;else if(Ud())e.flags|=8192;else throw co=io,no}}else e.flags&=-16777217}function vl(e,t){if(t.type!==`stylesheet`||t.state.loading&4)e.flags&=-16777217;else if(e.flags|=16777216,!Ym(t)){if(Ud())e.flags|=8192;else throw co=io,no}}function yl(e,t){t!==null&&(e.flags|=4),e.flags&16384&&(t=e.tag===22?536870912:xt(),e.lanes|=t,dd|=t)}function bl(e,t){if(!N)switch(e.tailMode){case`visible`:break;case`collapsed`:for(var n=e.tail,r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null;break;default:for(t=e.tail,n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null}}function V(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags&1206910976,r|=i.flags&1206910976,i.return=e,i=i.sibling;else for(i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags,r|=i.flags,i.return=e,i=i.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function xl(e,t,n){var r=t.pendingProps;switch(la(t),t.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return V(t),null;case 1:return V(t),null;case 3:return n=t.stateNode,r=null,e!==null&&(r=e.memoizedState.cache),t.memoizedState.cache!==r&&(t.flags|=2048),Ea(P),Ie(),n.pendingContext&&(n.context=n.pendingContext,n.pendingContext=null),(e===null||e.child===null)&&(va(t)?gl(t):e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,ba())),V(t),null;case 26:var a=t.type,o=t.memoizedState;return e===null?(gl(t),o===null?(V(t),_l(t,a,null,r,n)):(V(t),vl(t,o))):o?o===e.memoizedState?(V(t),t.flags&=-16777217):(gl(t),V(t),vl(t,o)):(e=e.memoizedProps,e!==r&&gl(t),V(t),_l(t,a,e,r,n)),null;case 27:if(Re(t),n=Ne.current,a=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==r&&gl(t);else{if(!r){if(t.stateNode===null)throw Error(i(166));return V(t),t.subtreeFlags&=-33554433,null}e=je.current,va(t)?ga(t,e):(e=hm(a,r,n),t.stateNode=e,gl(t))}return V(t),t.subtreeFlags&=-33554433,null;case 5:if(Re(t),a=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==r&&gl(t);else{if(!r){if(t.stateNode===null)throw Error(i(166));return V(t),t.subtreeFlags&=-33554433,null}if(o=je.current,va(t))ga(t,o);else{var s=lp(Ne.current);switch(o){case 1:o=s.createElementNS(`http://www.w3.org/2000/svg`,a);break;case 2:o=s.createElementNS(`http://www.w3.org/1998/Math/MathML`,a);break;default:switch(a){case`svg`:o=s.createElementNS(`http://www.w3.org/2000/svg`,a);break;case`math`:o=s.createElementNS(`http://www.w3.org/1998/Math/MathML`,a);break;case`script`:o=s.createElement(`div`),o.innerHTML=`<script><\/script>`,o=o.removeChild(o.firstChild);break;case`select`:o=typeof r.is==`string`?s.createElement(`select`,{is:r.is}):s.createElement(`select`),r.multiple?o.multiple=!0:r.size&&(o.size=r.size);break;default:o=typeof r.is==`string`?s.createElement(a,{is:r.is}):s.createElement(a)}}o[O]=t,o[Nt]=r;a:for(s=t.child;s!==null;){if(s.tag===5||s.tag===6)o.appendChild(s.stateNode);else if(s.tag!==4&&s.tag!==27&&s.child!==null){s.child.return=s,s=s.child;continue}if(s===t)break a;for(;s.sibling===null;){if(s.return===null||s.return===t)break a;s=s.return}s.sibling.return=s.return,s=s.sibling}t.stateNode=o;a:switch(np(o,a,r),a){case`button`:case`input`:case`select`:case`textarea`:r=!!r.autoFocus;break a;case`img`:r=!0;break a;default:r=!1}r&&gl(t)}}return V(t),t.subtreeFlags&=-33554433,_l(t,t.type,e===null?null:e.memoizedProps,t.pendingProps,n),null;case 6:if(e&&t.stateNode!=null)e.memoizedProps!==r&&gl(t);else{if(typeof r!=`string`&&t.stateNode===null)throw Error(i(166));if(e=Ne.current,va(t)){if(e=t.stateNode,n=t.memoizedProps,r=null,a=da,a!==null)switch(a.tag){case 27:case 5:r=a.memoizedProps}e[O]=t,e=!!(e.nodeValue===n||r!==null&&!0===r.suppressHydrationWarning||ep(e.nodeValue,n)),e||ha(t,!0)}else e=lp(e).createTextNode(r),e[O]=t,t.stateNode=e}return V(t),null;case 31:if(n=t.memoizedState,e===null||e.memoizedState!==null){if(r=va(t),n!==null){if(e===null){if(!r)throw Error(i(318));if(e=t.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(i(557));e[O]=t}else ya(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;V(t),e=!1}else n=ba(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=n),e=!0;if(!e)return t.flags&256?(Uo(t),t):(Uo(t),null);if(t.flags&128)throw Error(i(558))}return V(t),null;case 13:if(r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(a=va(t),r!==null&&r.dehydrated!==null){if(e===null){if(!a)throw Error(i(318));if(a=t.memoizedState,a=a===null?null:a.dehydrated,!a)throw Error(i(317));a[O]=t}else ya(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;V(t),a=!1}else a=ba(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=a),a=!0;if(!a)return t.flags&256?(Uo(t),t):(Uo(t),null)}return Uo(t),t.flags&128?(t.lanes=n,t):(n=r!==null,e=e!==null&&e.memoizedState!==null,n&&(r=t.child,a=null,r.alternate!==null&&r.alternate.memoizedState!==null&&r.alternate.memoizedState.cachePool!==null&&(a=r.alternate.memoizedState.cachePool.pool),o=null,r.memoizedState!==null&&r.memoizedState.cachePool!==null&&(o=r.memoizedState.cachePool.pool),o!==a&&(r.flags|=2048)),n!==e&&n&&(t.child.flags|=8192),yl(t,t.updateQueue),V(t),null);case 4:return Ie(),e===null&&Wf(t.stateNode.containerInfo),t.flags|=67108864,V(t),null;case 10:return Ea(t.type),V(t),null;case 19:if(Ko(t),r=t.memoizedState,r===null)return V(t),null;if(a=!!(t.flags&128),o=r.rendering,o===null){if(a)bl(r,!1);else{if(Y!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(o=qo(e),o!==null){for(t.flags|=128,bl(r,!1),e=o.updateQueue,t.updateQueue=e,yl(t,e),t.subtreeFlags=0,e=n,n=t.child;n!==null;)Ui(n,e),n=n.sibling;return Go(t,Wo.current&1|2),N&&oa(t,r.treeForkCount),t.child}e=e.sibling}r.tail!==null&&Ze()>_d&&(t.flags|=128,a=!0,bl(r,!1),t.lanes=4194304)}}else{if(!a){if(e=qo(o),e!==null){if(t.flags|=128,a=!0,e=e.updateQueue,t.updateQueue=e,yl(t,e),bl(r,!0),r.tail===null&&r.tailMode!==`collapsed`&&r.tailMode!==`visible`&&!o.alternate&&!N)return V(t),null}else 2*Ze()-r.renderingStartTime>_d&&n!==536870912&&(t.flags|=128,a=!0,bl(r,!1),t.lanes=4194304)}r.isBackwards?(o.sibling=t.child,t.child=o):(e=r.last,e===null?t.child=o:e.sibling=o,r.last=o)}if(r.tail!==null){e=r.tail;a:{for(n=e;n!==null;){if(n.alternate!==null){n=!1;break a}n=n.sibling}n=!0}return r.rendering=e,r.tail=e.sibling,r.renderingStartTime=Ze(),e.sibling=null,o=Wo.current,o=a?o&1|2:o&1,r.tailMode===`visible`||r.tailMode===`collapsed`||!n||N?Go(t,o):(n=o,D(Lo,t),D(Wo,n),Ro===null&&(Ro=t)),N&&oa(t,r.treeForkCount),e}return V(t),null;case 22:case 23:return Uo(t),Io(),r=t.memoizedState!==null,e===null?r&&(t.flags|=8192):e.memoizedState!==null!==r&&(t.flags|=8192),r?n&536870912&&!(t.flags&128)&&(V(t),t.subtreeFlags&6&&(t.flags|=8192)):V(t),n=t.updateQueue,n!==null&&yl(t,n.retryQueue),n=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),r=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(r=t.memoizedState.cachePool.pool),r!==n&&(t.flags|=2048),e!==null&&Ae(Za),null;case 24:return n=null,e!==null&&(n=e.memoizedState.cache),t.memoizedState.cache!==n&&(t.flags|=2048),Ea(P),V(t),null;case 25:return null;case 30:return t.flags|=33554432,V(t),null}throw Error(i(156,t.tag))}function Sl(e,t){switch(la(t),t.tag){case 1:return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return Ea(P),Ie(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 26:case 27:case 5:return Re(t),null;case 31:if(t.memoizedState!==null){if(Uo(t),t.alternate===null)throw Error(i(340));ya()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 13:if(Uo(t),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(i(340));ya()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return Ko(t),e=t.flags,e&65536?(t.flags=e&-65537|128,e=t.memoizedState,e!==null&&(e.rendering=null,e.tail=null),t.flags|=4,t):null;case 4:return Ie(),null;case 10:return Ea(t.type),null;case 22:case 23:return Uo(t),Io(),e!==null&&Ae(Za),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 24:return Ea(P),null;case 25:return null;default:return null}}function Cl(e,t){switch(la(t),t.tag){case 3:Ea(P),Ie();break;case 26:case 27:case 5:Re(t);break;case 4:Ie();break;case 31:t.memoizedState!==null&&Uo(t);break;case 13:Uo(t);break;case 19:Ko(t);break;case 10:Ea(t.type);break;case 22:case 23:Uo(t),Io(),e!==null&&Ae(Za);break;case 24:Ea(P)}}function wl(e,t){try{var n=t.updateQueue,r=n===null?null:n.lastEffect;if(r!==null){var i=r.next;n=i;do{if((n.tag&e)===e){r=void 0;var a=n.create,o=n.inst;r=a(),o.destroy=r}n=n.next}while(n!==i)}}catch(e){Z(t,t.return,e)}}function Tl(e,t,n){try{var r=t.updateQueue,i=r===null?null:r.lastEffect;if(i!==null){var a=i.next;r=a;do{if((r.tag&e)===e){var o=r.inst,s=o.destroy;if(s!==void 0){o.destroy=void 0,i=t;var c=n,l=s;try{l()}catch(e){Z(i,c,e)}}}r=r.next}while(r!==a)}}catch(e){Z(t,t.return,e)}}function El(e){var t=e.updateQueue;if(t!==null){var n=e.stateNode;try{jo(t,n)}catch(t){Z(e,e.return,t)}}}function Dl(e,t,n){n.props=Ec(e.type,e.memoizedProps),n.state=e.memoizedState;try{n.componentWillUnmount()}catch(n){Z(e,t,n)}}function Ol(e,t){try{var n=e.ref;if(n!==null){switch(e.tag){case 26:case 27:case 5:var r=e.stateNode;break;case 30:var i=e.stateNode,a=Ti(e.memoizedProps,i);(i.ref===null||i.ref.name!==a)&&(i.ref=Pp(a)),r=i.ref;break;case 7:if(e.stateNode===null){var o=new Fp(e);h(e.child,!1,Qp,o,void 0,void 0),e.stateNode=o}r=e.stateNode;break;default:r=e.stateNode}typeof n==`function`?e.refCleanup=n(r):n.current=r}}catch(n){Z(e,t,n)}}function kl(e,t){var n=e.ref,r=e.refCleanup;if(n!==null){if(typeof r==`function`)try{r()}catch(n){Z(e,t,n)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof n==`function`)try{n(null)}catch(n){Z(e,t,n)}else n.current=null}}function Al(e,t){if((e.tag===5||e.tag===27||e.tag===6)&&e.alternate===null&&t!==null)for(var n=0;n<t.length;n++)em(e.stateNode,t[n])}function jl(e){for(var t=e.return;t!==null&&(Pl(t)&&em(e.stateNode,t.stateNode),!Nl(t));)t=t.return}function Ml(e){for(var t=e.return;t!==null&&(Pl(t)&&tm(e.stateNode,t.stateNode),!Nl(t));)t=t.return}function Nl(e){return e.tag===5||e.tag===3||e.tag===27}function Pl(e){return e&&e.tag===7&&e.stateNode!==null}function Fl(e){var t=e.type,n=e.memoizedProps,r=e.stateNode;try{a:switch(t){case`button`:case`input`:case`select`:case`textarea`:n.autoFocus&&r.focus();break a;case`img`:n.src?r.src=n.src:n.srcSet&&(r.srcset=n.srcSet)}}catch(t){Z(e,e.return,t)}}function Il(e,t,n){try{var r=e.stateNode;ip(r,e.type,n,t),r[Nt]=t}catch(t){Z(e,e.return,t)}}function Ll(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&Sp(e.type)||e.tag===4}function Rl(e){a:for(;;){for(;e.sibling===null;){if(e.return===null||Ll(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&Sp(e.type)||e.flags&2||e.child===null||e.tag===4)continue a;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function zl(e,t,n,r){var i=e.tag;if(i===5||i===6)i=e.stateNode,t?(n.nodeType===9?n.body:n.nodeName===`HTML`?n.ownerDocument.body:n).insertBefore(i,t):(t=n.nodeType===9?n.body:n.nodeName===`HTML`?n.ownerDocument.body:n,t.appendChild(i),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=En)),Al(e,r),j=!0;else if(i!==4&&(i===27&&(Al(e,r),r=null,Sp(e.type)&&(n=e.stateNode,t=null)),e=e.child,e!==null))for(zl(e,t,n,r),e=e.sibling;e!==null;)zl(e,t,n,r),e=e.sibling}function Bl(e,t,n,r){var i=e.tag;if(i===5||i===6)i=e.stateNode,t?n.insertBefore(i,t):n.appendChild(i),Al(e,r),j=!0;else if(i!==4&&(i===27&&(Al(e,r),r=null,Sp(e.type)&&(n=e.stateNode)),e=e.child,e!==null))for(Bl(e,t,n,r),e=e.sibling;e!==null;)Bl(e,t,n,r),e=e.sibling}function Vl(e){var t=e.stateNode,n=e.memoizedProps;try{for(var r=e.type,i=t.attributes;i.length;)t.removeAttributeNode(i[0]);np(t,r,n),t[O]=e,t[Nt]=n}catch(t){Z(e,e.return,t)}}var Hl=!1,Ul=null;function Wl(e){(e.tag===30||e.subtreeFlags&33554432)&&(Hl=!0)}var Gl=null;function Kl(){var e=Gl;return Gl=null,e}var ql=0;function Jl(e,t,n,r,i){return ql=0,Yl(e.child,t,n,r,i)}function Yl(e,t,n,r,i){for(var a=!1;e!==null;){if(e.tag===5){var o=e.stateNode;if(r!==null){var s=Op(o);r.push(s),s.view&&(a=!0)}else a||Op(o).view&&(a=!0);Hl=!0,Tp(o,ql===0?t:t+`_`+ql,n),ql++}else e.tag===22&&e.memoizedState!==null||e.tag===30&&i||Yl(e.child,t,n,r,i)&&(a=!0);e=e.sibling}return a}function Xl(e,t){for(;e!==null;)e.tag===5?Ep(e.stateNode,e.memoizedProps):e.tag===22&&e.memoizedState!==null||e.tag===30&&t||Xl(e.child,t),e=e.sibling}function Zl(e){if(e.subtreeFlags&18874368)for(e=e.child;e!==null;){if((e.tag!==22||e.memoizedState===null)&&(Zl(e),e.tag===30&&e.flags&18874368&&e.stateNode.paired)){var t=e.memoizedProps;if(t.name==null||t.name===`auto`)throw Error(i(544));var n=t.name;t=Di(t.default,t.share),t!==`none`&&(Jl(e,n,t,null,!1)||Xl(e.child,!1))}e=e.sibling}}function Ql(e,t){if(e.tag===30){var n=e.stateNode,r=e.memoizedProps,i=Ti(r,n),a=Di(r.default,n.paired?r.share:r.enter);a===`none`?Zl(e):Jl(e,i,a,null,!1)?(Zl(e),n.paired||t||Nd(e,r.onEnter)):Xl(e.child,!1)}else if(e.subtreeFlags&33554432)for(e=e.child;e!==null;)Ql(e,t),e=e.sibling;else Zl(e)}function $l(e){if(Ul!==null&&Ul.size!==0){var t=Ul;if(e.subtreeFlags&18874368)for(e=e.child;e!==null;){if(e.tag!==22||e.memoizedState===null){if(e.tag===30&&e.flags&18874368){var n=e.memoizedProps,r=n.name;if(r!=null&&r!==`auto`){var i=t.get(r);if(i!==void 0){var a=Di(n.default,n.share);if(a!==`none`&&(Jl(e,r,a,null,!1)?(a=e.stateNode,i.paired=a,a.paired=i,Nd(e,n.onShare)):Xl(e.child,!1)),t.delete(r),t.size===0)break}}}$l(e)}e=e.sibling}}}function eu(e){if(e.tag===30){var t=e.memoizedProps,n=Ti(t,e.stateNode),r=Ul===null?void 0:Ul.get(n),i=Di(t.default,r===void 0?t.exit:t.share);i!==`none`&&(Jl(e,n,i,null,!1)?r===void 0?Nd(e,t.onExit):(i=e.stateNode,r.paired=i,i.paired=r,Ul.delete(n),Nd(e,t.onShare)):Xl(e.child,!1)),Ul!==null&&$l(e)}else if(e.subtreeFlags&33554432)for(e=e.child;e!==null;)eu(e),e=e.sibling;else Ul!==null&&$l(e)}function tu(e){for(e=e.child;e!==null;){if(e.tag===30){var t=e.memoizedProps,n=Ti(t,e.stateNode);t=Di(t.default,t.update),e.flags&=-5,t!==`none`&&Jl(e,n,t,e.memoizedState=[],!1)}else e.subtreeFlags&33554432&&tu(e);e=e.sibling}}function nu(e){if(e.subtreeFlags&18874368)for(e=e.child;e!==null;){if(e.tag!==22||e.memoizedState===null){if(e.tag===30&&e.flags&18874368){var t=e.stateNode;t.paired!==null&&(t.paired=null,Xl(e.child,!1))}nu(e)}e=e.sibling}}function ru(e){if(e.tag===30)e.stateNode.paired=null,Xl(e.child,!1),nu(e);else if(e.subtreeFlags&33554432)for(e=e.child;e!==null;)ru(e),e=e.sibling;else nu(e)}function iu(e){for(e=e.child;e!==null;)e.tag===30?Xl(e.child,!1):e.subtreeFlags&33554432&&iu(e),e=e.sibling}function au(e,t,n,r,i,a,o){for(var s=!1;t!==null;){if(t.tag===5){var c=t.stateNode;if(a!==null&&ql<a.length){var l=a[ql],u=Op(c);(l.view||u.view)&&(s=!0);var d;if(d=!(e.flags&4)){if(u.clip)d=!0;else{d=l.rect;var f=u.rect;d=d.y!==f.y||d.x!==f.x||d.height!==f.height||d.width!==f.width}}d&&(e.flags|=4),u.abs?u=!l.abs:(l=l.rect,u=u.rect,u=l.height!==u.height||l.width!==u.width),u&&(e.flags|=32)}else e.flags|=32;e.flags&4&&Tp(c,ql===0?n:n+`_`+ql,i),s&&e.flags&4||(Gl===null&&(Gl=[]),Gl.push(c,ql===0?r:r+`_`+ql,t.memoizedProps)),ql++}else(t.tag!==22||t.memoizedState===null)&&(t.tag===30&&o?e.flags|=t.flags&32:au(e,t.child,n,r,i,a,o)&&(s=!0));t=t.sibling}return s}function ou(e,t){for(e=e.child;e!==null;){if(e.tag===30){var n=e.memoizedProps,r=e.stateNode,i=Ti(n,r),a=Di(n.default,n.update);if(t){r=r.clones;var o=r===null?null:r.map(kp)}else o=e.memoizedState,e.memoizedState=null;r=e;var s=e.child;ql=0,i=au(r,s,i,i,a,o,!1),e.flags&4&&i&&(t||Nd(e,n.onUpdate))}else e.subtreeFlags&33554432&&ou(e,t);e=e.sibling}}var su=!1,H=!1,cu=!1,lu=!1,uu=typeof WeakSet==`function`?WeakSet:Set,du=null,fu=!1,pu=!1,mu=!1,hu=!1;function gu(e,t,n){if(e=e.containerInfo,sp=gh,e=ti(e),ni(e)){if(`selectionStart`in e)var r={start:e.selectionStart,end:e.selectionEnd};else a:{r=(r=e.ownerDocument)&&r.defaultView||window;var i=r.getSelection&&r.getSelection();if(i&&i.rangeCount!==0){r=i.anchorNode;var a=i.anchorOffset,o=i.focusNode;i=i.focusOffset;try{r.nodeType,o.nodeType}catch{r=null;break a}var s=0,c=-1,l=-1,u=0,d=0,f=e,p=null;b:for(;;){for(var m;f!==r||a!==0&&f.nodeType!==3||(c=s+a),f!==o||i!==0&&f.nodeType!==3||(l=s+i),f.nodeType===3&&(s+=f.nodeValue.length),(m=f.firstChild)!==null;)p=f,f=m;for(;;){if(f===e)break b;if(p===r&&++u===a&&(c=s),p===o&&++d===i&&(l=s),(m=f.nextSibling)!==null)break;f=p,p=f.parentNode}f=m}r=c===-1||l===-1?null:{start:c,end:l}}else r=null}r||={start:0,end:0}}else r=null;for(cp={focusedElem:e,selectionRange:r},gh=!1,n=(n&335544064)===n,du=t,t=n?9270:1024;du!==null;){if(e=du,n&&(r=e.deletions,r!==null))for(a=0;a<r.length;a++)n&&eu(r[a]);if(e.alternate===null&&e.flags&2)n&&Wl(e),_u(n);else{if(e.tag===22){if(r=e.alternate,e.memoizedState!==null){r!==null&&r.memoizedState===null&&n&&eu(r),_u(n);continue}if(r!==null&&r.memoizedState!==null){n&&Wl(e),_u(n);continue}}r=e.child,(e.subtreeFlags&t)!==0&&r!==null?(r.return=e,du=r):(n&&tu(e),_u(n))}}Ul=null}function _u(e){for(;du!==null;){var t=du,n=e,r=t.alternate,a=t.flags;switch(t.tag){case 0:case 11:case 15:break;case 1:if(a&1024&&r!==null){n=void 0,a=r.memoizedProps,r=r.memoizedState;var o=t.stateNode;try{var s=Ec(t.type,a);n=o.getSnapshotBeforeUpdate(s,r),o.__reactInternalSnapshotBeforeUpdate=n}catch(e){Z(t,t.return,e)}}break;case 3:if(a&1024){if(r=t.stateNode.containerInfo,n=r.nodeType,n===9)nm(r);else if(n===1)switch(r.nodeName){case`HEAD`:case`HTML`:case`BODY`:nm(r);break;default:r.textContent=``}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;case 30:n&&r!==null&&(n=Ti(r.memoizedProps,r.stateNode),a=t.memoizedProps,a=Di(a.default,a.update),a!==`none`&&Jl(r,n,a,r.memoizedState=[],!0));break;default:if(a&1024)throw Error(i(163))}if(r=t.sibling,r!==null){r.return=t.return,du=r;break}du=t.return}}function vu(e,t,n){var r=n.flags;switch(n.tag){case 0:case 11:case 15:Lu(e,n),r&4&&wl(5,n);break;case 1:if(Lu(e,n),r&4){if(e=n.stateNode,t===null)try{e.componentDidMount()}catch(e){Z(n,n.return,e)}else{var i=Ec(n.type,t.memoizedProps);t=t.memoizedState;try{e.componentDidUpdate(i,t,e.__reactInternalSnapshotBeforeUpdate)}catch(e){Z(n,n.return,e)}}}r&64&&El(n),r&512&&Ol(n,n.return);break;case 3:if(Lu(e,n),r&64&&(e=n.updateQueue,e!==null)){if(t=null,n.child!==null)switch(n.child.tag){case 27:case 5:t=n.child.stateNode;break;case 1:t=n.child.stateNode}try{jo(e,t)}catch(e){Z(n,n.return,e)}}break;case 27:t===null&&r&4&&Vl(n);case 26:case 5:Lu(e,n),t===null&&r&4&&Fl(n),r&512&&Ol(n,n.return);break;case 12:Lu(e,n);break;case 31:Lu(e,n),r&4&&Eu(e,n);break;case 13:Lu(e,n),r&4&&Du(e,n),r&64&&(e=n.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(n=_f.bind(null,n),cm(e,n))));break;case 22:if(r=n.memoizedState!==null||su,!r){var a=t!==null&&t.memoizedState!==null||H;t=su,i=H,su=r,(H=a)&&!i?(r=2,n.subtreeFlags&8772&&(r|=1),zu(e,n,r)):Lu(e,n),su=t,H=i}break;case 30:Lu(e,n),r&512&&Ol(n,n.return);break;case 7:r&512&&Ol(n,n.return);default:Lu(e,n)}}function yu(e,t){for(e=e.child;e!==null;)bu(e,t),e=e.sibling}function bu(e,t){switch(e.tag){case 5:case 26:try{var n=e.stateNode;if(t){var r=n.style;typeof r.setProperty==`function`?r.setProperty(`display`,`none`,`important`):r.display=`none`}else{var i=e.stateNode,a=e.memoizedProps.style,o=a!=null&&a.hasOwnProperty(`display`)?a.display:null;i.style.display=o==null||typeof o==`boolean`?``:(``+o).trim()}}catch(t){Z(e,e.return,t)}xu(e,t);break;case 6:try{e.stateNode.nodeValue=t?``:e.memoizedProps,j=!0}catch(t){Z(e,e.return,t)}break;case 18:try{var s=e.stateNode;t?wp(s,!0):wp(e.stateNode,!1)}catch(t){Z(e,e.return,t)}break;case 22:case 23:e.memoizedState===null&&yu(e,t);break;default:yu(e,t)}}function xu(e,t){if(e.subtreeFlags&67108864)for(e=e.child;e!==null;){a:{var n=e,r=t;switch(n.tag){case 4:bu(n,r);break a;case 22:n.memoizedState===null&&xu(n,r);break a;default:xu(n,r)}}e=e.sibling}}function Su(e){var t=e.alternate;t!==null&&(e.alternate=null,Su(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&Vt(t)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var U=null,Cu=!1;function wu(e,t,n){for(n=n.child;n!==null;)Tu(e,t,n),n=n.sibling}function Tu(e,t,n){if(st&&typeof st.onCommitFiberUnmount==`function`)try{st.onCommitFiberUnmount(ot,n)}catch{}switch(n.tag){case 26:H||kl(n,t),wu(e,t,n),n.memoizedState?n.memoizedState.count--:n.stateNode&&!H&&(n=n.stateNode,n.parentNode.removeChild(n));break;case 27:H||kl(n,t),Ml(n);var r=U,i=Cu;Sp(n.type)&&(U=n.stateNode,Cu=!1),wu(e,t,n),gm(n.stateNode,n.type,n.memoizedProps),U=r,Cu=i;break;case 5:H||kl(n,t),Ml(n);case 6:if(n.tag===6&&Ml(n),r=U,i=Cu,U=null,wu(e,t,n),U=r,Cu=i,U!==null){if(Cu)try{(U.nodeType===9?U.body:U.nodeName===`HTML`?U.ownerDocument.body:U).removeChild(n.stateNode),j=!0}catch(e){Z(n,t,e)}else try{U.removeChild(n.stateNode),j=!0}catch(e){Z(n,t,e)}}break;case 18:U!==null&&(Cu?(e=U,Cp(e.nodeType===9?e.body:e.nodeName===`HTML`?e.ownerDocument.body:e,n.stateNode),Hh(e)):Cp(U,n.stateNode));break;case 4:r=U,i=Cu,U=n.stateNode.containerInfo,Cu=!0,wu(e,t,n),U=r,Cu=i;break;case 0:case 11:case 14:case 15:Tl(2,n,t),H||Tl(4,n,t),wu(e,t,n);break;case 1:H||(kl(n,t),r=n.stateNode,typeof r.componentWillUnmount==`function`&&Dl(n,t,r)),wu(e,t,n);break;case 21:wu(e,t,n);break;case 22:H=(r=H)||n.memoizedState!==null,wu(e,t,n),H=r;break;case 30:kl(n,t),wu(e,t,n);break;case 7:H||kl(n,t),wu(e,t,n);break;default:wu(e,t,n)}}function Eu(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{Hh(e)}catch(e){Z(t,t.return,e)}}}function Du(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{Hh(e)}catch(e){Z(t,t.return,e)}}function Ou(e){switch(e.tag){case 31:case 13:case 19:var t=e.stateNode;return t===null&&(t=e.stateNode=new uu),t;case 22:return e=e.stateNode,t=e._retryCache,t===null&&(t=e._retryCache=new uu),t;default:throw Error(i(435,e.tag))}}function ku(e,t){var n=Ou(e);t.forEach(function(t){if(!n.has(t)){n.add(t);var r=vf.bind(null,e,t);t.then(r,r)}})}function Au(e,t,n){var r=t.deletions;if(r!==null)for(var a=0;a<r.length;a++){var o=r[a],s=e,c=t,l=c;a:for(;l!==null;){switch(l.tag){case 27:if(Sp(l.type)){U=l.stateNode,Cu=!1;break a}break;case 5:U=l.stateNode,Cu=!1;break a;case 3:case 4:U=l.stateNode.containerInfo,Cu=!0;break a}l=l.return}if(U===null)throw Error(i(160));Tu(s,c,o),U=null,Cu=!1,s=o.alternate,s!==null&&(s.return=null),o.return=null}if(t.subtreeFlags&13886)for(t=t.child;t!==null;)Mu(t,e,n),t=t.sibling}var ju=null;function Mu(e,t,n){var r=e.alternate,a=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(a&4&&(r=e.updateQueue,r=r===null?null:r.events,r!==null))for(var o=0;o<r.length;o++){var s=r[o];s.ref.impl=s.nextImpl}Au(t,e,n),Nu(e),a&4&&(Tl(3,e,e.return),wl(3,e),Tl(5,e,e.return));break;case 1:Au(t,e,n),Nu(e),a&512&&(H||r===null||kl(r,r.return)),a&64&&su&&(e=e.updateQueue,e!==null&&(t=e.callbacks,t!==null&&(n=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=n===null?t:n.concat(t))));break;case 26:if(o=ju,Au(t,e,n),Nu(e),a&512&&(H||r===null||kl(r,r.return)),a&4){if(a=r===null?null:r.memoizedState,n=e.memoizedState,r===null){if(n===null){if(e.stateNode===null){if(su)e.stateNode=fp(e.type,e.memoizedProps,t.containerInfo,e);else{a:{t=e.type,n=e.memoizedProps,a=o.ownerDocument||o;b:switch(t){case`title`:r=a.getElementsByTagName(`title`)[0],(!r||r[zt]||r[O]||r.namespaceURI===`http://www.w3.org/2000/svg`||r.hasAttribute(`itemprop`))&&(r=a.createElement(t),a.head.insertBefore(r,a.querySelector(`head > title`))),np(r,t,n),r[O]=e,A(r),t=r;break a;case`link`:if(o=Gm(`link`,`href`,a).get(t+(n.href||``))){for(s=0;s<o.length;s++)if(r=o[s],r.getAttribute(`href`)===(n.href==null||n.href===``?null:n.href)&&r.getAttribute(`rel`)===(n.rel==null?null:n.rel)&&r.getAttribute(`title`)===(n.title==null?null:n.title)&&r.getAttribute(`crossorigin`)===(n.crossOrigin==null?null:n.crossOrigin)){o.splice(s,1);break b}}r=a.createElement(t),np(r,t,n),a.head.appendChild(r);break;case`meta`:if(o=Gm(`meta`,`content`,a).get(t+(n.content||``))){for(s=0;s<o.length;s++)if(r=o[s],r.getAttribute(`content`)===(n.content==null?null:``+n.content)&&r.getAttribute(`name`)===(n.name==null?null:n.name)&&r.getAttribute(`property`)===(n.property==null?null:n.property)&&r.getAttribute(`http-equiv`)===(n.httpEquiv==null?null:n.httpEquiv)&&r.getAttribute(`charset`)===(n.charSet==null?null:n.charSet)){o.splice(s,1);break b}}r=a.createElement(t),np(r,t,n),a.head.appendChild(r);break;default:throw Error(i(468,t))}r[O]=e,A(r),t=r}e.stateNode=t}}else su||Km(o,e.type,e.stateNode)}else e.stateNode=Bm(o,n,e.memoizedProps)}else a===n?n===null&&e.stateNode!==null&&Il(e,e.memoizedProps,r.memoizedProps):(a===null?(t=r.stateNode,t===null||H||t.parentNode.removeChild(t)):a.count--,n===null?su||Km(o,e.type,e.stateNode):Bm(o,n,e.memoizedProps))}break;case 27:Au(t,e,n),Nu(e),a&512&&(H||r===null||kl(r,r.return)),r!==null&&a&4&&Il(e,e.memoizedProps,r.memoizedProps);break;case 5:if(o=cu,cu=!1,Au(t,e,n),cu=o,Nu(e),a&512&&(H||r===null||kl(r,r.return)),e.flags&32){t=e.stateNode;try{vn(t,``),j=!0}catch(t){Z(e,e.return,t)}}a&4&&e.stateNode!=null&&(t=e.memoizedProps,Il(e,t,r===null?t:r.memoizedProps)),a&1024&&(lu=!0);break;case 6:if(Au(t,e,n),Nu(e),a&4){if(e.stateNode===null)throw Error(i(162));t=e.memoizedProps,n=e.stateNode;try{n.nodeValue=t,j=!0}catch(t){Z(e,e.return,t)}}break;case 3:if(j=!1,Wm=null,o=ju,ju=bm(t.containerInfo),Au(t,e,n),ju=o,Nu(e),a&4&&r!==null&&r.memoizedState.isDehydrated)try{Hh(t.containerInfo)}catch(t){Z(e,e.return,t)}lu&&(lu=!1,Pu(e)),j=!1;break;case 4:a=cu,cu=su,r=en(),o=ju,ju=bm(e.stateNode.containerInfo),Au(t,e,n),Nu(e),ju=o,j&&pu&&(mu=!0),j=r,cu=a;break;case 12:Au(t,e,n),Nu(e);break;case 31:Au(t,e,n),Nu(e),a&4&&(t=e.updateQueue,t!==null&&(e.updateQueue=null,ku(e,t)));break;case 13:Au(t,e,n),Nu(e),e.child.flags&8192&&e.memoizedState!==null!=(r!==null&&r.memoizedState!==null)&&(hd=Ze()),a&4&&(t=e.updateQueue,t!==null&&(e.updateQueue=null,ku(e,t)));break;case 22:o=e.memoizedState!==null,s=r!==null&&r.memoizedState!==null;var c=su,l=H,u=cu;su=c||o,cu=u||o,H=l||s,Au(t,e,n),H=l,cu=u,su=c,Nu(e),a&8192&&(t=e.stateNode,t._visibility=o?t._visibility&-2:t._visibility|1,!o||r===null||s||su||H||(t=s||H,n=su,r=H,su=o||su,H=t,Ru(e,2),su=n,H=r),!o&&cu||yu(e,o)),a&4&&(t=e.updateQueue,t!==null&&(n=t.retryQueue,n!==null&&(t.retryQueue=null,ku(e,n))));break;case 19:Au(t,e,n),Nu(e),a&4&&(t=e.updateQueue,t!==null&&(e.updateQueue=null,ku(e,t)));break;case 30:a&512&&(H||r===null||kl(r,r.return)),a=en(),o=pu,s=(n&335544064)===n,c=e.memoizedProps,pu=s&&Di(c.default,c.update)!==`none`,Au(t,e,n),Nu(e),s&&r!==null&&j&&(e.flags|=4),pu=o,j=a;break;case 21:break;case 7:a&512&&(H||r===null||kl(r,r.return)),r&&r.stateNode!==null&&(r.stateNode._fragmentFiber=e);default:Au(t,e,n),Nu(e)}}function Nu(e){var t=e.flags;if(t&2){try{for(var n,r=e.return;r!==null;){if(Ll(r)){n=r;break}r=r.return}r=null;for(var a=e.return;a!==null;){if(Pl(a)){var o=a.stateNode;r===null?r=[o]:r.push(o)}if(Nl(a))break;a=a.return}var s=r;if(n==null)throw Error(i(160));switch(n.tag){case 27:var c=n.stateNode;Bl(e,Rl(e),c,s);break;case 5:var l=n.stateNode;n.flags&32&&(vn(l,``),n.flags&=-33),Bl(e,Rl(e),l,s);break;case 3:case 4:var u=n.stateNode.containerInfo;zl(e,Rl(e),u,s);break;default:throw Error(i(161))}}catch(t){Z(e,e.return,t)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function Pu(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var t=e;Pu(t),t.tag===5&&t.flags&1024&&(t=t.stateNode,gh=!0,t.reset(),gh=!1),e=e.sibling}}function Fu(e,t){if(t.subtreeFlags&9270)for(t=t.child;t!==null;)Iu(t,e),t=t.sibling;else ou(t,!1)}function Iu(e,t){var n=e.alternate;if(n===null)Ql(e,!1);else switch(e.tag){case 3:if(hu=fu=!1,Kl(),Fu(t,e),!fu&&!mu){if(e=Gl,e!==null)for(var r=0;r<e.length;r+=3){n=e[r];var i=e[r+1];Ep(n,e[r+2]),n=n.ownerDocument.documentElement,n!==null&&n.animate({opacity:[0,0],pointerEvents:[`none`,`none`]},{duration:0,fill:`forwards`,pseudoElement:`::view-transition-group(`+i+`)`})}e=t.containerInfo,e=e.nodeType===9?e.documentElement:e.ownerDocument.documentElement,e!==null&&e.style.viewTransitionName===``&&(e.style.viewTransitionName=`none`,e.animate({opacity:[0,0],pointerEvents:[`none`,`none`]},{duration:0,fill:`forwards`,pseudoElement:`::view-transition-group(root)`}),e.animate({width:[0,0],height:[0,0]},{duration:0,fill:`forwards`,pseudoElement:`::view-transition`})),hu=!0}Gl=null;break;case 5:Fu(t,e);break;case 4:r=fu,fu=!1,Fu(t,e),fu&&(mu=!0),fu=r;break;case 22:e.memoizedState===null&&(n.memoizedState===null?Fu(t,e):Ql(e,!1));break;case 30:r=fu,i=Kl(),fu=!1,Fu(t,e),fu&&(e.flags|=4);var a=e.memoizedProps,o=e.stateNode;t=Ti(a,o),o=Ti(n.memoizedProps,o);var s=Di(a.default,a.update);s===`none`?t=!1:(a=n.memoizedState,n.memoizedState=null,n=e.child,ql=0,t=au(e,n,t,o,s,a,!0),ql!==(a===null?0:a.length)&&(e.flags|=32)),e.flags&4&&t?(Nd(e,e.memoizedProps.onUpdate),Gl=i):i!==null&&(i.push.apply(i,Gl),Gl=i),fu=e.flags&32?!0:r;break;default:Fu(t,e)}}function Lu(e,t){if(t.subtreeFlags&8772)for(t=t.child;t!==null;)vu(e,t.alternate,t),t=t.sibling}function Ru(e,t){for(e=e.child;e!==null;){var n=e,r=t;switch(n.tag){case 0:case 11:case 14:case 15:Tl(4,n,n.return),Ru(n,r);break;case 1:kl(n,n.return);var i=n.stateNode;typeof i.componentWillUnmount==`function`&&Dl(n,n.return,i),Ru(n,r);break;case 27:r&2&&gm(n.stateNode,n.type,n.memoizedProps);case 5:kl(n,n.return),n.tag!==5&&n.tag!==27||Ml(n),Ru(n,r);break;case 6:Ml(n);break;case 26:kl(n,n.return),i=n.stateNode,n.memoizedState!==null||i===null||H||i.parentNode.removeChild(i),Ru(n,r);break;case 22:n.memoizedState===null&&Ru(n,r);break;case 30:kl(n,n.return),Ru(n,r);break;case 7:kl(n,n.return);default:Ru(n,r)}e=e.sibling}}function zu(e,t,n){for(n=t.subtreeFlags&8772?n:n&-2,t=t.child;t!==null;){var r=t.alternate,i=e,a=t,o=a.flags,s=!!(n&1);switch(a.tag){case 0:case 11:case 15:zu(i,a,n),wl(4,a);break;case 1:if(zu(i,a,n),r=a,i=r.stateNode,typeof i.componentDidMount==`function`)try{i.componentDidMount()}catch(e){Z(r,r.return,e)}if(r=a,i=r.updateQueue,i!==null){var c=r.stateNode;try{var l=i.shared.hiddenCallbacks;if(l!==null)for(i.shared.hiddenCallbacks=null,i=0;i<l.length;i++)Ao(l[i],c)}catch(e){Z(r,r.return,e)}}s&&o&64&&El(a),Ol(a,a.return);break;case 27:n&2&&Vl(a);case 5:a.tag!==5&&a.tag!==27||jl(a),zu(i,a,n),s&&r===null&&o&4&&Fl(a),Ol(a,a.return);break;case 6:jl(a);break;case 26:c=a.stateNode,a.memoizedState!==null||c===null||su||Km(bm(c.ownerDocument),a.type,c),zu(i,a,n),s&&r===null&&o&4&&Fl(a),Ol(a,a.return);break;case 12:zu(i,a,n);break;case 31:zu(i,a,n),s&&o&4&&Eu(i,a);break;case 13:zu(i,a,n),s&&o&4&&Du(i,a);break;case 22:a.memoizedState===null&&zu(i,a,n),Ol(a,a.return);break;case 30:zu(i,a,n),Ol(a,a.return);break;case 7:Ol(a,a.return);default:zu(i,a,n)}t=t.sibling}}function Bu(e,t){var n=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),e=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(e=t.memoizedState.cachePool.pool),e!==n&&(e!=null&&e.refCount++,n!=null&&za(n))}function Vu(e,t){e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&za(e))}function Hu(e,t,n,r){var i=(n&335544064)===n;if(t.subtreeFlags&(i?10262:10256))for(t=t.child;t!==null;)Uu(e,t,n,r),t=t.sibling;else i&&iu(t)}function Uu(e,t,n,r){var i=(n&335544064)===n;i&&t.alternate===null&&t.return!==null&&t.return.alternate!==null&&ru(t);var a=t.flags;switch(t.tag){case 0:case 11:case 15:Hu(e,t,n,r),a&2048&&wl(9,t);break;case 1:Hu(e,t,n,r);break;case 3:Hu(e,t,n,r),i&&hu&&(e=e.containerInfo,e=e.nodeType===9?e.body:e.nodeName===`HTML`?e.ownerDocument.body:e,e.style.viewTransitionName===`root`&&(e.style.viewTransitionName=``),e=e.ownerDocument.documentElement,e!==null&&e.style.viewTransitionName===`none`&&(e.style.viewTransitionName=``)),a&2048&&(a=null,t.alternate!==null&&(a=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==a&&(t.refCount++,a!=null&&za(a)));break;case 12:if(a&2048){Hu(e,t,n,r),a=t.stateNode;try{var o=t.memoizedProps,s=o.id,c=o.onPostCommit;typeof c==`function`&&c(s,t.alternate===null?`mount`:`update`,a.passiveEffectDuration,-0)}catch(e){Z(t,t.return,e)}}else Hu(e,t,n,r);break;case 31:Hu(e,t,n,r);break;case 13:Hu(e,t,n,r);break;case 23:break;case 22:o=t.stateNode,s=t.alternate,t.memoizedState===null?(i&&s!==null&&s.memoizedState!==null&&ru(t),o._visibility&2?Hu(e,t,n,r):(o._visibility|=2,Wu(e,t,n,r,!!(t.subtreeFlags&10256)||!1))):(i&&s!==null&&s.memoizedState===null&&ru(s),o._visibility&2?Hu(e,t,n,r):Gu(e,t)),a&2048&&Bu(s,t);break;case 24:Hu(e,t,n,r),a&2048&&Vu(t.alternate,t);break;case 30:i&&(a=t.alternate,a!==null&&(Xl(a.child,!0),Xl(t.child,!0))),Hu(e,t,n,r);break;default:Hu(e,t,n,r)}}function Wu(e,t,n,r,i){for(i&&=!!(t.subtreeFlags&10256)||!1,t=t.child;t!==null;){var a=e,o=t,s=n,c=r,l=o.flags;switch(o.tag){case 0:case 11:case 15:Wu(a,o,s,c,i),wl(8,o);break;case 23:break;case 22:var u=o.stateNode;o.memoizedState===null?(u._visibility|=2,Wu(a,o,s,c,i)):u._visibility&2?Wu(a,o,s,c,i):Gu(a,o),i&&l&2048&&Bu(o.alternate,o);break;case 24:Wu(a,o,s,c,i),i&&l&2048&&Vu(o.alternate,o);break;default:Wu(a,o,s,c,i)}t=t.sibling}}function Gu(e,t){if(t.subtreeFlags&10256)for(t=t.child;t!==null;){var n=e,r=t,i=r.flags;switch(r.tag){case 22:Gu(n,r),i&2048&&Bu(r.alternate,r);break;case 24:Gu(n,r),i&2048&&Vu(r.alternate,r);break;default:Gu(n,r)}t=t.sibling}}var Ku=8192;function qu(e,t,n){if(e.subtreeFlags&Ku)for(e=e.child;e!==null;)Ju(e,t,n),e=e.sibling}function Ju(e,t,n){switch(e.tag){case 26:qu(e,t,n),e.flags&Ku&&(e.memoizedState===null?(e=e.stateNode,(t&335544128)===t&&Zm(n,e)):Qm(n,ju,e.memoizedState,e.memoizedProps));break;case 5:qu(e,t,n),e.flags&Ku&&(e=e.stateNode,(t&335544128)===t&&Zm(n,e));break;case 3:case 4:var r=ju;ju=bm(e.stateNode.containerInfo),qu(e,t,n),ju=r;break;case 22:e.memoizedState===null&&(r=e.alternate,r!==null&&r.memoizedState!==null?(r=Ku,Ku=16777216,qu(e,t,n),Ku=r):qu(e,t,n));break;case 30:if((e.flags&Ku)!==0&&(r=e.memoizedProps.name,r!=null&&r!==`auto`)){var i=e.stateNode;i.paired=null,Ul===null&&(Ul=new Map),Ul.set(r,i)}qu(e,t,n);break;default:qu(e,t,n)}}function Yu(e){var t=e.alternate;if(t!==null&&(e=t.child,e!==null)){t.child=null;do t=e.sibling,e.sibling=null,e=t;while(e!==null)}}function Xu(e){var t=e.deletions;if(e.flags&16){if(t!==null)for(var n=0;n<t.length;n++){var r=t[n];du=r,$u(r,e)}Yu(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)Zu(e),e=e.sibling}function Zu(e){switch(e.tag){case 0:case 11:case 15:Xu(e),e.flags&2048&&Tl(9,e,e.return);break;case 3:Xu(e);break;case 12:Xu(e);break;case 22:var t=e.stateNode;e.memoizedState!==null&&t._visibility&2&&(e.return===null||e.return.tag!==13)?(t._visibility&=-3,Qu(e)):Xu(e);break;default:Xu(e)}}function Qu(e){var t=e.deletions;if(e.flags&16){if(t!==null)for(var n=0;n<t.length;n++){var r=t[n];du=r,$u(r,e)}Yu(e)}for(e=e.child;e!==null;){switch(t=e,t.tag){case 0:case 11:case 15:Tl(8,t,t.return),Qu(t);break;case 22:n=t.stateNode,n._visibility&2&&(n._visibility&=-3,Qu(t));break;default:Qu(t)}e=e.sibling}}function $u(e,t){for(;du!==null;){var n=du;switch(n.tag){case 0:case 11:case 15:Tl(8,n,t);break;case 23:case 22:if(n.memoizedState!==null&&n.memoizedState.cachePool!==null){var r=n.memoizedState.cachePool.pool;r!=null&&r.refCount++}break;case 24:za(n.memoizedState.cache)}if(r=n.child,r!==null)r.return=n,du=r;else a:for(n=e;du!==null;){r=du;var i=r.sibling,a=r.return;if(Su(r),r===n){du=null;break a}if(i!==null){i.return=a,du=i;break a}du=a}}}var ed={getCacheForType:function(e){var t=Ma(P),n=t.data.get(e);return n===void 0&&(n=e(),t.data.set(e,n)),n},cacheSignal:function(){return Ma(P).controller.signal}},td=typeof WeakMap==`function`?WeakMap:Map,W=0,G=null,K=null,q=0,J=0,nd=null,rd=!1,id=!1,ad=!1,od=0,Y=0,sd=0,cd=0,ld=0,ud=0,dd=0,fd=null,pd=null,md=!1,hd=0,gd=0,_d=1/0,vd=null,yd=null,X=0,bd=null,xd=null,Sd=0,Cd=0,wd=null,Td=null,Ed=null,Dd=null,Od=null,kd=0,Ad=null;function jd(){return W&2&&q!==0?q&-q:T.T===null?At():Pf()}function Md(){if(ud===0){if(!(q&536870912)||N){var e=mt;mt<<=1,!(mt&3932160)&&(mt=262144),ud=e}else ud=536870912}return e=Lo.current,e!==null&&(e.flags|=32),ud}function Nd(e,t){if(t!=null){var n=e.stateNode,r=n.ref;r===null&&(r=n.ref=Pp(Ti(e.memoizedProps,n))),Dd===null&&(Dd=[]),Dd.push(t.bind(null,r))}}function Pd(e,t,n){(e===G&&(J===2||J===9)||e.cancelPendingCommit!==null)&&(Vd(e,0),Rd(e,q,ud,!1)),Ct(e,n),W&2&&e===G||(e===G&&(!(W&2)&&(cd|=n),Y===4&&Rd(e,q,ud,!1)),Ef(e))}function Fd(e,t,n){if(W&6)throw Error(i(327));var r=!n&&!(t&127)&&(t&e.expiredLanes)===0||vt(e,t),a=r?Yd(e,t):qd(e,t,!0),o=r;do{if(a===0){id&&!r&&Rd(e,t,0,!1);break}if(n=e.current.alternate,o&&!Ld(n))a=qd(e,t,!1),o=!1;else{if(a===2){if(o=t,e.errorRecoveryDisabledLanes&o)var s=0;else s=e.pendingLanes&-536870913,s=s===0?s&536870912?536870912:0:s;if(s!==0){t=s;a:{var c=e;a=fd;var l=c.current.memoizedState.isDehydrated;if(l&&(Vd(c,s).flags|=256),s=qd(c,s,!1),s!==2&&s!==6){if(ad&&!l){c.errorRecoveryDisabledLanes|=o,cd|=o,a=4;break a}o=pd,pd=a,o!==null&&(pd===null?pd=o:pd.push.apply(pd,o))}a=s}if(o=!1,a!==2)continue}}if(a===1){Vd(e,0),Rd(e,t,0,!0);break}a:{switch(r=e,o=a,o){case 0:case 1:throw Error(i(345));case 4:if((t&4194048)!==t&&(t&62914560)!==t)break;case 6:Rd(r,t,ud,!rd);break a;case 2:pd=null;break;case 3:case 5:break;default:throw Error(i(329))}if((t&62914560)===t&&(a=hd+300-Ze(),10<a)){if(Rd(r,t,ud,!rd),_t(r,0,!0)!==0)break a;Sd=t,r.timeoutHandle=gp(Id.bind(null,r,n,pd,vd,md,t,ud,cd,dd,rd,o,`Throttled`,-0,0),a);break a}Id(r,n,pd,vd,md,t,ud,cd,dd,rd,o,null,-0,0)}break}}while(1);Ef(e)}function Id(e,t,n,r,i,a,o,s,c,l,u,d,f,p){e.timeoutHandle=-1;var m=t.subtreeFlags,h=(a&335544064)===a;d=null,(h||m&8192||(m&16785408)==16785408)&&(d={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:En},Ul=null,Ju(t,a,d),h&&(m=d,h=e.containerInfo,h=(h.nodeType===9?h:h.ownerDocument).__reactViewTransition,h!=null&&(m.count++,m.waitingForViewTransition=!0,m=nh.bind(m),h.finished.then(m,m))),m=(a&62914560)===a?hd-Ze():(a&4194048)===a?gd-Ze():0,m=eh(d,m),m!==null)?(Sd=a,e.cancelPendingCommit=m(nf.bind(null,e,t,a,n,r,i,o,s,c,l,u,d,null,f,p)),Rd(e,a,o,!l)):nf(e,t,a,n,r,i,o,s,c,l,u,d)}function Ld(e){for(var t=e;;){var n=t.tag;if((n===0||n===11||n===15)&&t.flags&16384&&(n=t.updateQueue,n!==null&&(n=n.stores,n!==null)))for(var r=0;r<n.length;r++){var i=n[r],a=i.getSnapshot;i=i.value;try{if(!Yr(a(),i))return!1}catch{return!1}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function Rd(e,t,n,r){t=yt(e,t),t&=~ld,t&=~cd,e.suspendedLanes|=t,e.pingedLanes&=~t,r&&(e.warmLanes|=t),r=e.expirationTimes;for(var i=t;0<i;){var a=31-lt(i),o=1<<a;r[a]=-1,i&=~o}n!==0&&Tt(e,n,t)}function zd(){return W&6?!0:(Df(0,!1),!1)}function Bd(){if(K!==null){if(J===0)var e=K.return;else e=K,wa=Ca=null,ls(e),fo=null,po=0,e=K;for(;e!==null;)Cl(e.alternate,e),e=e.return;K=null}}function Vd(e,t){var n=e.timeoutHandle;return n!==-1&&(e.timeoutHandle=-1,_p(n)),n=e.cancelPendingCommit,n!==null&&(e.cancelPendingCommit=null,n()),Sd=0,Bd(),G=e,K=n=Hi(e.current,null),q=t,J=0,nd=null,rd=!1,id=vt(e,t),ad=!1,dd=ud=ld=cd=sd=Y=0,pd=fd=null,md=!1,od=yt(e,t),Mi(),n}function Hd(e,t){F=null,T.H=vc,t===to||t===ro?(t=lo(),J=3):t===no?(t=lo(),J=4):J=t===Ic?8:typeof t==`object`&&t&&typeof t.then==`function`?6:1,nd=t,K===null&&(Y=1,Ac(e,Xi(t,e.current)))}function Ud(){var e=Lo.current;return e===null?!0:(q&4194048)===q?Ro===null:(q&62914560)===q||q&536870912?e===Ro:!1}function Wd(){var e=T.H;return T.H=vc,e===null?vc:e}function Gd(){var e=T.A;return T.A=ed,e}function Kd(){Y=4,rd||(q&4194048)!==q&&Lo.current!==null||(id=!0),!(sd&134217727)&&!(cd&134217727)||G===null||Rd(G,q,ud,!1)}function qd(e,t,n){var r=W;W|=2;var i=Wd(),a=Gd();(G!==e||q!==t)&&(vd=null,Vd(e,t)),t=!1;var o=Y;a:do try{if(J!==0&&K!==null){var s=K,c=nd;switch(J){case 8:Bd(),o=6;break a;case 3:case 2:case 9:case 6:Lo.current===null&&(t=!0);var l=J;if(J=0,nd=null,$d(e,s,c,l),n&&id){o=0;break a}break;default:l=J,J=0,nd=null,$d(e,s,c,l)}}Jd(),o=Y;break}catch(t){Hd(e,t)}while(1);return t&&e.shellSuspendCounter++,wa=Ca=null,W=r,T.H=i,T.A=a,K===null&&(G=null,q=0,Mi()),o}function Jd(){for(;K!==null;)Zd(K)}function Yd(e,t){var n=W;W|=2;var r=Wd(),a=Gd();G!==e||q!==t?(vd=null,_d=Ze()+500,Vd(e,t)):id=vt(e,t);a:do try{if(J!==0&&K!==null){t=K;var o=nd;b:switch(J){case 1:J=0,nd=null,$d(e,t,o,1);break;case 2:case 9:if(ao(o)){J=0,nd=null,Qd(t);break}t=function(){J!==2&&J!==9||G!==e||(J=7),Ef(e)},o.then(t,t);break a;case 3:J=7;break a;case 4:J=5;break a;case 7:ao(o)?(J=0,nd=null,Qd(t)):(J=0,nd=null,$d(e,t,o,7));break;case 5:var s=null;switch(K.tag){case 26:s=K.memoizedState;case 5:case 27:var c=K;if(s?Ym(s):c.stateNode.complete){J=0,nd=null;var l=c.sibling;if(l!==null)K=l;else{var u=c.return;u===null?K=null:(K=u,ef(u))}break b}}J=0,nd=null,$d(e,t,o,5);break;case 6:J=0,nd=null,$d(e,t,o,6);break;case 8:Bd(),Y=6;break a;default:throw Error(i(462))}}Xd();break}catch(t){Hd(e,t)}while(1);return wa=Ca=null,T.H=r,T.A=a,W=n,K===null?(G=null,q=0,Mi(),Y):0}function Xd(){for(;K!==null&&!Ye();)Zd(K)}function Zd(e){var t=hl(e.alternate,e,od);e.memoizedProps=e.pendingProps,t===null?ef(e):K=t}function Qd(e){var t=e,n=t.alternate;switch(t.tag){case 15:case 0:t=Yc(n,t,t.pendingProps,t.type,void 0,q);break;case 11:t=Yc(n,t,t.pendingProps,t.type.render,t.ref,q);break;case 5:ls(t);var r=t;r===da&&(N?(_a(r),r.tag===5&&r.stateNode!=null&&(M=r.stateNode)):(_a(r),N=!0));default:Cl(n,t),t=K=Ui(t,od),t=hl(n,t,od)}e.memoizedProps=e.pendingProps,t===null?ef(e):K=t}function $d(e,t,n,r){wa=Ca=null,ls(t),fo=null,po=0;var i=t.return;try{if(Fc(e,i,t,n,q)){Y=1,Ac(e,Xi(n,e.current)),K=null;return}}catch(t){if(i!==null)throw K=i,t;Y=1,Ac(e,Xi(n,e.current)),K=null;return}t.flags&32768?(N||r===1?e=!0:id||q&536870912?e=!1:(rd=e=!0,(r===2||r===9||r===3||r===6)&&(r=Lo.current,r!==null&&r.tag===13&&(r.flags|=16384))),tf(t,e)):ef(t)}function ef(e){var t=e;do{if(t.flags&32768){tf(t,rd);return}e=t.return;var n=xl(t.alternate,t,od);if(n!==null){K=n;return}if(t=t.sibling,t!==null){K=t;return}K=t=e}while(t!==null);Y===0&&(Y=5)}function tf(e,t){do{var n=Sl(e.alternate,e);if(n!==null){n.flags&=32767,K=n;return}if(n=e.return,n!==null&&(n.flags|=32768,n.subtreeFlags=0,n.deletions=null),!t&&(e=e.sibling,e!==null)){K=e;return}K=e=n}while(e!==null);Y=6,K=null}function nf(e,t,n,r,a,o,s,c,l,u,d,f){e.cancelPendingCommit=null;do df();while(X!==0);if(W&6)throw Error(i(327));if(t!==null){if(t===e.current)throw Error(i(177));e===G&&(K=G=null,q=0),xd=t,bd=e,Sd=n,wd=a,Td=r,rf(e,t,n,s,c,l,f)}}function rf(e,t,n,r,i,a,o){var s=t.lanes|t.childLanes;if(Cd=s,s|=ji,wt(e,n,s,r,i,a),Dd=null,(n&335544064)===n?(Od=Ha(e),r=10262):(Od=null,r=10256),(t.subtreeFlags&r)!==0||(t.flags&r)!==0?(e.callbackNode=null,e.callbackPriority=0,yf(tt,function(){return ff(),null})):(e.callbackNode=null,e.callbackPriority=0),Hl=!1,r=!!(t.flags&13878),t.subtreeFlags&13878||r){r=T.T,T.T=null,i=E.p,E.p=2,a=W,W|=4;try{gu(e,t,n)}finally{W=a,E.p=i,T.T=r}}X=1,Hl?Ed=Mp(o,e.containerInfo,Od,sf,cf,of,lf,ff,af,null,null):(sf(),cf(),lf())}function af(e){if(X!==0){var t=bd.onRecoverableError;t(e,{componentStack:null})}}function of(){X===3&&(X=0,Iu(xd,bd),X=4)}function sf(){if(X===1){X=0;var e=bd,t=xd,n=Sd,r=!!(t.flags&13878);if(t.subtreeFlags&13878||r){r=T.T,T.T=null;var i=E.p;E.p=2;var a=W;W|=4;try{pu=mu=!1,Mu(t,e,n),n=cp;var o=ti(e.containerInfo),s=n.focusedElem,c=n.selectionRange;if(o!==s&&s&&s.ownerDocument&&ei(s.ownerDocument.documentElement,s)){if(c!==null&&ni(s)){var l=c.start,u=c.end;if(u===void 0&&(u=l),`selectionStart`in s)s.selectionStart=l,s.selectionEnd=Math.min(u,s.value.length);else{var d=s.ownerDocument||document,f=d&&d.defaultView||window;if(f.getSelection){var p=f.getSelection(),m=s.textContent.length,h=Math.min(c.start,m),g=c.end===void 0?h:Math.min(c.end,m);!p.extend&&h>g&&(o=g,g=h,h=o);var _=$r(s,h),v=$r(s,g);if(_&&v&&(p.rangeCount!==1||p.anchorNode!==_.node||p.anchorOffset!==_.offset||p.focusNode!==v.node||p.focusOffset!==v.offset)){var y=d.createRange();y.setStart(_.node,_.offset),p.removeAllRanges(),h>g?(p.addRange(y),p.extend(v.node,v.offset)):(y.setEnd(v.node,v.offset),p.addRange(y))}}}}for(d=[],p=s;p=p.parentNode;)p.nodeType===1&&d.push({element:p,left:p.scrollLeft,top:p.scrollTop});for(typeof s.focus==`function`&&s.focus(),s=0;s<d.length;s++){var b=d[s];b.element.scrollLeft=b.left,b.element.scrollTop=b.top}}gh=!!sp,cp=sp=null}finally{W=a,E.p=i,T.T=r}}e.current=t,X=2}}function cf(){if(X===2){X=0;var e=bd,t=xd,n=!!(t.flags&8772);if(t.subtreeFlags&8772||n){n=T.T,T.T=null;var r=E.p;E.p=2;var i=W;W|=4;try{vu(e,t.alternate,t)}finally{W=i,E.p=r,T.T=n}}X=3}}function lf(){if(X===4||X===3){X=0;var e=Ed;Ed=null,Xe();var t=bd,n=xd,r=Sd,i=Td,a=(r&335544064)===r?10262:10256;if((n.subtreeFlags&a)!==0||(n.flags&a)!==0?X=5:(X=0,xd=bd=null,uf(t,t.pendingLanes)),a=t.pendingLanes,a===0&&(yd=null),kt(r),n=n.stateNode,st&&typeof st.onCommitFiberRoot==`function`)try{st.onCommitFiberRoot(ot,n,void 0,(n.current.flags&128)==128)}catch{}if(i!==null){n=T.T,a=E.p,E.p=2,T.T=null;try{for(var o=t.onRecoverableError,s=0;s<i.length;s++){var c=i[s];o(c.value,{componentStack:c.stack})}}finally{T.T=n,E.p=a}}if(i=Dd,o=Od,Od=null,i!==null&&(Dd=null,o===null&&(o=[]),e!==null))for(c=0;c<i.length;c++)n=(0,i[c])(o),n!==void 0&&e.finished.finally(n);Sd&3&&df(),Ef(t),a=t.pendingLanes,r&261930&&a&42?t===Ad?kd++:(kd=0,Ad=t):(kd=0,Ad=null),Df(0,!1)}}function uf(e,t){(e.pooledCacheLanes&=t)===0&&(t=e.pooledCache,t!=null&&(e.pooledCache=null,za(t)))}function df(){return Ed!==null&&(Ed.skipTransition(),Ed=null),sf(),cf(),lf(),ff()}function ff(){if(X!==5)return!1;var e=bd,t=Cd;Cd=0;var n=kt(Sd),r=T.T,a=E.p;try{E.p=32>n?32:n,T.T=null,n=wd,wd=null;var o=bd,s=Sd;if(X=0,xd=bd=null,Sd=0,W&6)throw Error(i(331));var c=W;if(W|=4,Zu(o.current),Uu(o,o.current,s,n),W=c,Df(0,!1),st&&typeof st.onPostCommitFiberRoot==`function`)try{st.onPostCommitFiberRoot(ot,o)}catch{}return!0}finally{E.p=a,T.T=r,uf(e,t)}}function pf(e,t,n){t=Xi(n,t),t=Mc(e.stateNode,t,2),e=wo(e,t,2),e!==null&&(Ct(e,2),Ef(e))}function Z(e,t,n){if(e.tag===3)pf(e,e,n);else for(;t!==null;){if(t.tag===3){pf(t,e,n);break}if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError==`function`||typeof r.componentDidCatch==`function`&&(yd===null||!yd.has(r))){e=Xi(n,e),n=Nc(2),r=wo(t,n,2),r!==null&&(Pc(n,r,t,e),Ct(r,2),Ef(r));break}}t=t.return}}function mf(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new td;var i=new Set;r.set(t,i)}else i=r.get(t),i===void 0&&(i=new Set,r.set(t,i));i.has(n)||(ad=!0,i.add(n),e=hf.bind(null,e,t,n),t.then(e,e))}function hf(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),e.pingedLanes|=e.suspendedLanes&n,e.warmLanes&=~n,G===e&&(q&n)===n&&(Y===4||Y===3&&(q&62914560)===q&&300>Ze()-hd?W&2?ld|=n:Vd(e,0):ld|=n,dd===q&&(dd=0)),Ef(e)}function gf(e,t){t===0&&(t=xt()),e=Fi(e,t),e!==null&&(Ct(e,t),Ef(e))}function _f(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),gf(e,n)}function vf(e,t){var n=0;switch(e.tag){case 31:case 13:var r=e.stateNode,a=e.memoizedState;a!==null&&(n=a.retryLane);break;case 19:r=e.stateNode;break;case 22:r=e.stateNode._retryCache;break;default:throw Error(i(314))}r!==null&&r.delete(t),gf(e,n)}function yf(e,t){return qe(e,t)}var bf=null,xf=null,Sf=!1,Cf=!1,wf=!1,Tf=0;function Ef(e){e!==xf&&e.next===null&&(xf===null?bf=xf=e:xf=xf.next=e),Cf=!0,Sf||(Sf=!0,Nf())}function Df(e,t){if(!wf&&Cf){wf=!0;do for(var n=!1,r=bf;r!==null;){if(!t){if(e!==0){var i=r.pendingLanes;if(i===0)var a=0;else{var o=r.suspendedLanes,s=r.pingedLanes;a=(1<<31-lt(42|e)+1)-1,a&=i&~(o&~s),a=a&201326741?a&201326741|1:a?a|2:0}a!==0&&(n=!0,Mf(r,a))}else a=q,a=_t(r,r===G?a:0,r.cancelPendingCommit!==null||r.timeoutHandle!==-1),!(a&3)||vt(r,a)||(n=!0,Mf(r,a))}r=r.next}while(n);wf=!1}}function Of(){kf()}function kf(){Cf=Sf=!1;var e=0;Tf!==0&&hp()&&(e=Tf);for(var t=Ze(),n=null,r=bf;r!==null;){var i=r.next,a=Af(r,t);a===0?(r.next=null,n===null?bf=i:n.next=i,i===null&&(xf=n)):(n=r,(e!==0||a&3)&&(Cf=!0)),r=i}X!==0&&X!==5||Df(e,!1),Tf!==0&&(Tf=0)}function Af(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,i=e.expirationTimes,a=e.pendingLanes&-62914561;0<a;){var o=31-lt(a),s=1<<o,c=i[o];c===-1?((s&n)===0||(s&r)!==0)&&(i[o]=bt(s,t)):c<=t&&(e.expiredLanes|=s),a&=~s}if(t=G,n=q,n=_t(e,e===t?n:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),r=e.callbackNode,n===0||e===t&&(J===2||J===9)||e.cancelPendingCommit!==null)return r!==null&&r!==null&&Je(r),e.callbackNode=null,e.callbackPriority=0;if(!(n&3)||vt(e,n)){if(t=n&-n,t===e.callbackPriority)return t;switch(r!==null&&Je(r),kt(n)){case 2:case 8:n=et;break;case 32:n=tt;break;case 268435456:n=rt;break;default:n=tt}return r=jf.bind(null,e),n=qe(n,r),e.callbackPriority=t,e.callbackNode=n,t}return r!==null&&r!==null&&Je(r),e.callbackPriority=2,e.callbackNode=null,2}function jf(e,t){if(X!==0&&X!==5)return e.callbackNode=null,e.callbackPriority=0,null;var n=e.callbackNode;if(df()&&e.callbackNode!==n)return null;var r=q;return r=_t(e,e===G?r:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),r===0?null:(Fd(e,r,t),Af(e,Ze()),e.callbackNode!=null&&e.callbackNode===n?jf.bind(null,e):null)}function Mf(e,t){if(df())return null;Fd(e,t,!0)}function Nf(){bp(function(){W&6?qe($e,Of):kf()})}function Pf(){if(Tf===0){var e=Ga;e===0&&(e=pt,pt<<=1,!(pt&261888)&&(pt=256)),Tf=e}return Tf}function Ff(e){return e==null||typeof e==`symbol`||typeof e==`boolean`?null:typeof e==`function`?e:Tn(e)}function If(e,t,n,r,i){if(t===`submit`&&n&&n.stateNode===i){var a=Ff((i[Nt]||null).action),o=r.submitter;o&&(t=(t=o[Nt]||null)?Ff(t.formAction):o.getAttribute(`formAction`),t!==null&&(a=t,o=null));var s=new qn(`action`,`action`,null,r,i);e.push({event:s,listeners:[{instance:null,listener:function(){if(r.defaultPrevented){if(Tf!==0){var e=new FormData(i,o);ic(n,{pending:!0,data:e,method:i.method,action:a},null,e)}}else typeof a==`function`&&(s.preventDefault(),e=new FormData(i,o),ic(n,{pending:!0,data:e,method:i.method,action:a},a,e))},currentTarget:i}]})}}for(var Lf=0;Lf<Si.length;Lf++){var Rf=Si[Lf];Ci(Rf.toLowerCase(),`on`+(Rf[0].toUpperCase()+Rf.slice(1)))}Ci(mi,`onAnimationEnd`),Ci(hi,`onAnimationIteration`),Ci(gi,`onAnimationStart`),Ci(`dblclick`,`onDoubleClick`),Ci(`focusin`,`onFocus`),Ci(`focusout`,`onBlur`),Ci(_i,`onTransitionRun`),Ci(vi,`onTransitionStart`),Ci(yi,`onTransitionCancel`),Ci(bi,`onTransitionEnd`),Yt(`onMouseEnter`,[`mouseout`,`mouseover`]),Yt(`onMouseLeave`,[`mouseout`,`mouseover`]),Yt(`onPointerEnter`,[`pointerout`,`pointerover`]),Yt(`onPointerLeave`,[`pointerout`,`pointerover`]),Jt(`onChange`,`change click focusin focusout input keydown keyup selectionchange`.split(` `)),Jt(`onSelect`,`focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange`.split(` `)),Jt(`onBeforeInput`,[`compositionend`,`keypress`,`textInput`,`paste`]),Jt(`onCompositionEnd`,`compositionend focusout keydown keypress keyup mousedown`.split(` `)),Jt(`onCompositionStart`,`compositionstart focusout keydown keypress keyup mousedown`.split(` `)),Jt(`onCompositionUpdate`,`compositionupdate focusout keydown keypress keyup mousedown`.split(` `));var zf=`abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting`.split(` `),Bf=new Set(`beforetoggle cancel close invalid load scroll scrollend toggle`.split(` `).concat(zf));function Vf(e,t){t=!!(t&4);for(var n=0;n<e.length;n++){var r=e[n],i=r.event;r=r.listeners;a:{var a=void 0;if(t)for(var o=r.length-1;0<=o;o--){var s=r[o],c=s.instance,l=s.currentTarget;if(s=s.listener,c!==a&&i.isPropagationStopped())break a;a=s,i.currentTarget=l;try{a(i)}catch(e){Oi(e)}i.currentTarget=null,a=c}else for(o=0;o<r.length;o++){if(s=r[o],c=s.instance,l=s.currentTarget,s=s.listener,c!==a&&i.isPropagationStopped())break a;a=s,i.currentTarget=l;try{a(i)}catch(e){Oi(e)}i.currentTarget=null,a=c}}}}function Q(e,t){var n=t[Ft];n===void 0&&(n=t[Ft]=new Set);var r=e+`__bubble`;n.has(r)||(Gf(t,e,2,!1),n.add(r))}function Hf(e,t,n){var r=0;t&&(r|=4),Gf(n,e,r,t)}var Uf=`_reactListening`+Math.random().toString(36).slice(2);function Wf(e){if(!e[Uf]){e[Uf]=!0,Kt.forEach(function(t){t!==`selectionchange`&&(Bf.has(t)||Hf(t,!1,e),Hf(t,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[Uf]||(t[Uf]=!0,Hf(`selectionchange`,!1,t))}}function Gf(e,t,n,r){switch(Ch(t)){case 2:var i=_h;break;case 8:i=vh;break;default:i=yh}n=i.bind(null,t,n,e),i=void 0,!In||t!==`touchstart`&&t!==`touchmove`&&t!==`wheel`||(i=!0),r?i===void 0?e.addEventListener(t,n,!0):e.addEventListener(t,n,{capture:!0,passive:i}):i===void 0?e.addEventListener(t,n,!1):e.addEventListener(t,n,{passive:i})}function Kf(e,t,n,r,i){var a=r;if(!(t&1)&&!(t&2)&&r!==null)a:for(;;){if(r===null)return;var s=r.tag;if(s===3||s===4){var c=r.stateNode.containerInfo;if(c===i)break;if(s===4)for(s=r.return;s!==null;){var l=s.tag;if((l===3||l===4)&&s.stateNode.containerInfo===i)return;s=s.return}for(;c!==null;){if(s=Ht(c),s===null)return;if(l=s.tag,l===5||l===6||l===26||l===27){r=a=s;continue a}c=c.parentNode}}r=r.return}Nn(function(){var r=a,i=On(n),s=[];a:{var c=xi.get(e);if(c!==void 0){var l=qn,u=e;switch(e){case`keypress`:if(Hn(n)===0)break a;case`keydown`:case`keyup`:l=dr;break;case`focusin`:u=`focus`,l=nr;break;case`focusout`:u=`blur`,l=nr;break;case`beforeblur`:case`afterblur`:l=nr;break;case`click`:if(n.button===2)break a;case`auxclick`:case`dblclick`:case`mousedown`:case`mousemove`:case`mouseup`:case`mouseout`:case`mouseover`:case`contextmenu`:l=er;break;case`drag`:case`dragend`:case`dragenter`:case`dragexit`:case`dragleave`:case`dragover`:case`dragstart`:case`drop`:l=tr;break;case`touchcancel`:case`touchend`:case`touchmove`:case`touchstart`:l=mr;break;case mi:case hi:case gi:l=rr;break;case bi:l=hr;break;case`scroll`:case`scrollend`:l=Yn;break;case`wheel`:l=gr;break;case`copy`:case`cut`:case`paste`:l=ir;break;case`gotpointercapture`:case`lostpointercapture`:case`pointercancel`:case`pointerdown`:case`pointermove`:case`pointerout`:case`pointerover`:case`pointerup`:l=fr;break;case`submit`:l=pr;break;case`toggle`:case`beforetoggle`:l=_r}var d=!!(t&4),f=!d&&(e===`scroll`||e===`scrollend`),p=d?c===null?null:c+`Capture`:c;d=[];for(var m=r,h;m!==null;){var g=m;if(h=g.stateNode,g=g.tag,g!==5&&g!==26&&g!==27||h===null||p===null||(g=Pn(m,p),g!=null&&d.push(qf(m,g,h))),f)break;m=m.return}0<d.length&&(c=new l(c,u,null,n,i),s.push({event:c,listeners:d}))}}if(!(t&7)){a:{if(l=e===`mouseover`||e===`pointerover`,c=e===`mouseout`||e===`pointerout`,l&&n!==Dn&&(u=n.relatedTarget||n.fromElement)&&(Ht(u)||u[Pt]))break a;(c||l)&&(u=i.window===i?i:(l=i.ownerDocument)?l.defaultView||l.parentWindow:window,c?(l=n.relatedTarget||n.toElement,c=r,l=l?Ht(l):null,l!==null&&(f=o(l),d=l.tag,l!==f||d!==5&&d!==27&&d!==6)&&(l=null)):(c=null,l=r),c!==l&&(d=er,g=`onMouseLeave`,p=`onMouseEnter`,m=`mouse`,(e===`pointerout`||e===`pointerover`)&&(d=fr,g=`onPointerLeave`,p=`onPointerEnter`,m=`pointer`),f=c==null?u:Wt(c),h=l==null?u:Wt(l),u=new d(g,m+`leave`,c,n,i),u.target=f,u.relatedTarget=h,g=null,Ht(i)===r&&(d=new d(p,m+`enter`,l,n,i),d.target=h,d.relatedTarget=f,g=d),f=g,d=c&&l?re(c,l,Yf):null,c!==null&&Xf(s,u,c,d,!1),l!==null&&f!==null&&Xf(s,f,l,d,!0)))}a:{if(c=r?Wt(r):window,l=c.nodeName&&c.nodeName.toLowerCase(),l===`select`||l===`input`&&c.type===`file`)var _=Lr;else if(jr(c)){if(Rr)_=qr;else{_=Gr;var v=Wr}}else l=c.nodeName,!l||l.toLowerCase()!==`input`||c.type!==`checkbox`&&c.type!==`radio`?r&&Sn(r.elementType)&&(_=Lr):_=Kr;if(_&&=_(e,r)){Mr(s,_,n,i);break a}v&&v(e,c,r)}switch(v=r?Wt(r):window,e){case`focusin`:(jr(v)||v.contentEditable===`true`)&&(ii=v,ai=r,oi=null);break;case`focusout`:oi=ai=ii=null;break;case`mousedown`:si=!0;break;case`contextmenu`:case`mouseup`:case`dragend`:si=!1,ci(s,n,i);break;case`selectionchange`:if(ri)break;case`keydown`:case`keyup`:ci(s,n,i)}var y;if(yr)b:{switch(e){case`compositionstart`:var b=`onCompositionStart`;break b;case`compositionend`:b=`onCompositionEnd`;break b;case`compositionupdate`:b=`onCompositionUpdate`;break b}b=void 0}else Dr?Tr(e,n)&&(b=`onCompositionEnd`):e===`keydown`&&n.keyCode===229&&(b=`onCompositionStart`);b&&(Sr&&n.locale!==`ko`&&(Dr||b!==`onCompositionStart`?b===`onCompositionEnd`&&Dr&&(y=Vn()):(Rn=i,zn=`value`in Rn?Rn.value:Rn.textContent,Dr=!0)),v=Jf(r,b),0<v.length&&(b=new ar(b,e,null,n,i),s.push({event:b,listeners:v}),y?b.data=y:(y=Er(n),y!==null&&(b.data=y)))),(y=xr?Or(e,n):kr(e,n))&&(b=Jf(r,`onBeforeInput`),0<b.length&&(v=new ar(`onBeforeInput`,`beforeinput`,null,n,i),s.push({event:v,listeners:b}),v.data=y)),If(s,e,r,n,i)}Vf(s,t)})}function qf(e,t,n){return{instance:e,listener:t,currentTarget:n}}function Jf(e,t){for(var n=t+`Capture`,r=[];e!==null;){var i=e,a=i.stateNode;if(i=i.tag,i!==5&&i!==26&&i!==27||a===null||(i=Pn(e,n),i!=null&&r.unshift(qf(e,i,a)),i=Pn(e,t),i!=null&&r.push(qf(e,i,a))),e.tag===3)return r;e=e.return}return[]}function Yf(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function Xf(e,t,n,r,i){for(var a=t._reactName,o=[];n!==null&&n!==r;){var s=n,c=s.alternate,l=s.stateNode;if(s=s.tag,c!==null&&c===r)break;s!==5&&s!==26&&s!==27||l===null||(c=l,i?(l=Pn(n,a),l!=null&&o.unshift(qf(n,l,c))):i||(l=Pn(n,a),l!=null&&o.push(qf(n,l,c)))),n=n.return}o.length!==0&&e.push({event:t,listeners:o})}var Zf=/\r\n?/g,Qf=/\u0000|\uFFFD/g;function $f(e){return(typeof e==`string`?e:``+e).replace(Zf,`
`).replace(Qf,``)}function ep(e,t){return t=$f(t),$f(e)===t}function $(e,t,n,r,a,o){switch(n){case`children`:if(typeof r==`string`)t===`body`||t===`textarea`&&r===``||vn(e,r);else if(typeof r==`number`||typeof r==`bigint`)t!==`body`&&vn(e,``+r);else return;break;case`className`:nn(e,`class`,r);break;case`tabIndex`:nn(e,`tabindex`,r);break;case`dir`:case`role`:case`viewBox`:case`width`:case`height`:nn(e,n,r);break;case`style`:xn(e,r,o);return;case`data`:if(t!==`object`){nn(e,`data`,r);break}case`src`:case`href`:if(r===``&&(t!==`a`||n!==`href`)||r==null||typeof r==`function`||typeof r==`symbol`||typeof r==`boolean`){e.removeAttribute(n);break}r=Tn(r),e.setAttribute(n,r);break;case`action`:case`formAction`:if(typeof r==`function`){e.setAttribute(n,`javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')`);break}if(typeof o==`function`&&(n===`formAction`?(t!==`input`&&$(e,t,`name`,a.name,a,null),$(e,t,`formEncType`,a.formEncType,a,null),$(e,t,`formMethod`,a.formMethod,a,null),$(e,t,`formTarget`,a.formTarget,a,null)):($(e,t,`encType`,a.encType,a,null),$(e,t,`method`,a.method,a,null),$(e,t,`target`,a.target,a,null))),r==null||typeof r==`symbol`||typeof r==`boolean`){e.removeAttribute(n);break}r=Tn(r),e.setAttribute(n,r);break;case`onClick`:r!=null&&(e.onclick=En);return;case`onScroll`:r!=null&&Q(`scroll`,e);return;case`onScrollEnd`:r!=null&&Q(`scrollend`,e);return;case`dangerouslySetInnerHTML`:if(r!=null){if(typeof r!=`object`||!(`__html`in r))throw Error(i(61));if(n=r.__html,n!=null){if(a.children!=null)throw Error(i(60));o?.__html!==n&&(e.innerHTML=n)}}break;case`multiple`:e.multiple=r&&typeof r!=`function`&&typeof r!=`symbol`;break;case`muted`:e.muted=r&&typeof r!=`function`&&typeof r!=`symbol`;break;case`suppressContentEditableWarning`:case`suppressHydrationWarning`:case`defaultValue`:case`defaultChecked`:case`innerHTML`:case`ref`:break;case`autoFocus`:break;case`xlinkHref`:if(r==null||typeof r==`function`||typeof r==`boolean`||typeof r==`symbol`){e.removeAttribute(`xlink:href`);break}n=Tn(r),e.setAttributeNS(`http://www.w3.org/1999/xlink`,`xlink:href`,n);break;case`contentEditable`:case`spellCheck`:case`draggable`:case`value`:case`autoReverse`:case`externalResourcesRequired`:case`focusable`:case`preserveAlpha`:r!=null&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,r):e.removeAttribute(n);break;case`inert`:case`allowFullScreen`:case`async`:case`autoPlay`:case`controls`:case`credentialless`:case`default`:case`defer`:case`disabled`:case`disablePictureInPicture`:case`disableRemotePlayback`:case`formNoValidate`:case`hidden`:case`loop`:case`noModule`:case`noValidate`:case`open`:case`playsInline`:case`readOnly`:case`required`:case`reversed`:case`scoped`:case`seamless`:case`itemScope`:r&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,``):e.removeAttribute(n);break;case`capture`:case`download`:!0===r?e.setAttribute(n,``):!1!==r&&r!=null&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,r):e.removeAttribute(n);break;case`cols`:case`rows`:case`size`:case`span`:r!=null&&typeof r!=`function`&&typeof r!=`symbol`&&!isNaN(r)&&1<=r?e.setAttribute(n,r):e.removeAttribute(n);break;case`rowSpan`:case`start`:r==null||typeof r==`function`||typeof r==`symbol`||isNaN(r)?e.removeAttribute(n):e.setAttribute(n,r);break;case`popover`:Q(`beforetoggle`,e),Q(`toggle`,e),tn(e,`popover`,r);break;case`xlinkActuate`:rn(e,`http://www.w3.org/1999/xlink`,`xlink:actuate`,r);break;case`xlinkArcrole`:rn(e,`http://www.w3.org/1999/xlink`,`xlink:arcrole`,r);break;case`xlinkRole`:rn(e,`http://www.w3.org/1999/xlink`,`xlink:role`,r);break;case`xlinkShow`:rn(e,`http://www.w3.org/1999/xlink`,`xlink:show`,r);break;case`xlinkTitle`:rn(e,`http://www.w3.org/1999/xlink`,`xlink:title`,r);break;case`xlinkType`:rn(e,`http://www.w3.org/1999/xlink`,`xlink:type`,r);break;case`xmlBase`:rn(e,`http://www.w3.org/XML/1998/namespace`,`xml:base`,r);break;case`xmlLang`:rn(e,`http://www.w3.org/XML/1998/namespace`,`xml:lang`,r);break;case`xmlSpace`:rn(e,`http://www.w3.org/XML/1998/namespace`,`xml:space`,r);break;case`is`:tn(e,`is`,r);break;case`innerText`:case`textContent`:return;default:if(!(2<n.length)||n[0]!==`o`&&n[0]!==`O`||n[1]!==`n`&&n[1]!==`N`)n=Cn.get(n)||n,tn(e,n,r);else return}j=!0}function tp(e,t,n,r,a,o){switch(n){case`style`:xn(e,r,o);return;case`dangerouslySetInnerHTML`:if(r!=null){if(typeof r!=`object`||!(`__html`in r))throw Error(i(61));if(n=r.__html,n!=null){if(a.children!=null)throw Error(i(60));o?.__html!==n&&(e.innerHTML=n)}}break;case`children`:if(typeof r==`string`)vn(e,r);else if(typeof r==`number`||typeof r==`bigint`)vn(e,``+r);else return;break;case`onScroll`:r!=null&&Q(`scroll`,e);return;case`onScrollEnd`:r!=null&&Q(`scrollend`,e);return;case`onClick`:r!=null&&(e.onclick=En);return;case`suppressContentEditableWarning`:case`suppressHydrationWarning`:case`innerHTML`:case`ref`:return;case`innerText`:case`textContent`:return;default:if(!qt.hasOwnProperty(n))a:{if(n[0]===`o`&&n[1]===`n`&&(a=n.endsWith(`Capture`),o=n.slice(2,a?n.length-7:void 0),t=e[Nt]||null,t=t==null?null:t[n],typeof t==`function`&&e.removeEventListener(o,t,a),typeof r==`function`)){typeof t!=`function`&&t!==null&&(n in e?e[n]=null:e.hasAttribute(n)&&e.removeAttribute(n)),e.addEventListener(o,r,a);break a}j=!0,n in e?e[n]=r:!0===r?e.setAttribute(n,``):tn(e,n,r)}return}j=!0}function np(e,t,n){switch(t){case`div`:case`span`:case`svg`:case`path`:case`a`:case`g`:case`p`:case`li`:break;case`img`:Q(`error`,e),Q(`load`,e);var r=!1,a=!1,o;for(o in n)if(n.hasOwnProperty(o)){var s=n[o];if(s!=null)switch(o){case`src`:r=!0;break;case`srcSet`:a=!0;break;case`children`:case`dangerouslySetInnerHTML`:throw Error(i(137,t));default:$(e,t,o,s,n,null)}}a&&$(e,t,`srcSet`,n.srcSet,n,null),r&&$(e,t,`src`,n.src,n,null);return;case`input`:Q(`invalid`,e);var c=o=s=a=null,l=null,u=null;for(r in n)if(n.hasOwnProperty(r)){var d=n[r];if(d!=null)switch(r){case`name`:a=d;break;case`type`:s=d;break;case`checked`:l=d;break;case`defaultChecked`:u=d;break;case`value`:o=d;break;case`defaultValue`:c=d;break;case`children`:case`dangerouslySetInnerHTML`:if(d!=null)throw Error(i(137,t));break;default:$(e,t,r,d,n,null)}}pn(e,o,c,l,u,s,a,!1);return;case`select`:for(a in Q(`invalid`,e),r=s=o=null,n)if(n.hasOwnProperty(a)&&(c=n[a],c!=null))switch(a){case`value`:o=c;break;case`defaultValue`:s=c;break;case`multiple`:r=c;default:$(e,t,a,c,n,null)}t=o,n=s,e.multiple=!!r,t==null?n!=null&&hn(e,!!r,n,!0):hn(e,!!r,t,!1);return;case`textarea`:for(s in Q(`invalid`,e),o=a=r=null,n)if(n.hasOwnProperty(s)&&(c=n[s],c!=null))switch(s){case`value`:r=c;break;case`defaultValue`:a=c;break;case`children`:o=c;break;case`dangerouslySetInnerHTML`:if(c!=null)throw Error(i(91));break;default:$(e,t,s,c,n,null)}_n(e,r,a,o);return;case`option`:for(l in n)if(n.hasOwnProperty(l)&&(r=n[l],r!=null))switch(l){case`selected`:e.selected=r&&typeof r!=`function`&&typeof r!=`symbol`;break;default:$(e,t,l,r,n,null)}return;case`dialog`:Q(`beforetoggle`,e),Q(`toggle`,e),Q(`cancel`,e),Q(`close`,e);break;case`iframe`:case`object`:Q(`load`,e);break;case`video`:case`audio`:for(r=0;r<zf.length;r++)Q(zf[r],e);break;case`image`:Q(`error`,e),Q(`load`,e);break;case`details`:Q(`toggle`,e);break;case`embed`:case`source`:case`link`:Q(`error`,e),Q(`load`,e);case`area`:case`base`:case`br`:case`col`:case`hr`:case`keygen`:case`meta`:case`param`:case`track`:case`wbr`:case`menuitem`:for(u in n)if(n.hasOwnProperty(u)&&(r=n[u],r!=null))switch(u){case`children`:case`dangerouslySetInnerHTML`:throw Error(i(137,t));default:$(e,t,u,r,n,null)}return;default:if(Sn(t)){for(d in n)n.hasOwnProperty(d)&&(r=n[d],r!==void 0&&tp(e,t,d,r,n,void 0));return}}for(c in n)n.hasOwnProperty(c)&&(r=n[c],r!=null&&$(e,t,c,r,n,null))}var rp={};function ip(e,t,n,r){switch(t){case`div`:case`span`:case`svg`:case`path`:case`a`:case`g`:case`p`:case`li`:break;case`input`:var a=null,o=null,s=null,c=null,l=null,u=null,d=null;for(m in n){var f=n[m];if(n.hasOwnProperty(m)&&f!=null)switch(m){case`checked`:break;case`value`:break;case`defaultValue`:l=f;default:r.hasOwnProperty(m)||$(e,t,m,null,r,f)}}for(var p in r){var m=r[p];if(f=n[p],r.hasOwnProperty(p)&&(m!=null||f!=null))switch(p){case`type`:m!==f&&(j=!0),o=m;break;case`name`:m!==f&&(j=!0),a=m;break;case`checked`:m!==f&&(j=!0),u=m;break;case`defaultChecked`:m!==f&&(j=!0),d=m;break;case`value`:m!==f&&(j=!0),s=m;break;case`defaultValue`:m!==f&&(j=!0),c=m;break;case`children`:case`dangerouslySetInnerHTML`:if(m!=null)throw Error(i(137,t));break;default:m!==f&&$(e,t,p,m,r,f)}}fn(e,s,c,l,u,d,o,a);return;case`select`:for(o in m=s=c=p=null,n)if(l=n[o],n.hasOwnProperty(o)&&l!=null)switch(o){case`value`:break;case`multiple`:m=l;default:r.hasOwnProperty(o)||$(e,t,o,null,r,l)}for(a in r)if(o=r[a],l=n[a],r.hasOwnProperty(a)&&(o!=null||l!=null))switch(a){case`value`:o!==l&&(j=!0),p=o;break;case`defaultValue`:o!==l&&(j=!0),c=o;break;case`multiple`:o!==l&&(j=!0),s=o;default:o!==l&&$(e,t,a,o,r,l)}t=c,n=s,r=m,p==null?!!r!=!!n&&(t==null?hn(e,!!n,n?[]:``,!1):hn(e,!!n,t,!0)):hn(e,!!n,p,!1);return;case`textarea`:for(c in m=p=null,n)if(a=n[c],n.hasOwnProperty(c)&&a!=null&&!r.hasOwnProperty(c))switch(c){case`value`:break;case`children`:break;default:$(e,t,c,null,r,a)}for(s in r)if(a=r[s],o=n[s],r.hasOwnProperty(s)&&(a!=null||o!=null))switch(s){case`value`:a!==o&&(j=!0),p=a;break;case`defaultValue`:a!==o&&(j=!0),m=a;break;case`children`:break;case`dangerouslySetInnerHTML`:if(a!=null)throw Error(i(91));break;default:a!==o&&$(e,t,s,a,r,o)}gn(e,p,m);return;case`option`:for(var h in n)if(p=n[h],n.hasOwnProperty(h)&&p!=null&&!r.hasOwnProperty(h))switch(h){case`selected`:e.selected=!1;break;default:$(e,t,h,null,r,p)}for(l in r)if(p=r[l],m=n[l],r.hasOwnProperty(l)&&p!==m&&(p!=null||m!=null))switch(l){case`selected`:p!==m&&(j=!0),e.selected=p&&typeof p!=`function`&&typeof p!=`symbol`;break;default:$(e,t,l,p,r,m)}return;case`img`:case`link`:case`area`:case`base`:case`br`:case`col`:case`embed`:case`hr`:case`keygen`:case`meta`:case`param`:case`source`:case`track`:case`wbr`:case`menuitem`:for(var g in n)p=n[g],n.hasOwnProperty(g)&&p!=null&&!r.hasOwnProperty(g)&&$(e,t,g,null,r,p);for(u in r)if(p=r[u],m=n[u],r.hasOwnProperty(u)&&p!==m&&(p!=null||m!=null))switch(u){case`children`:case`dangerouslySetInnerHTML`:if(p!=null)throw Error(i(137,t));break;default:$(e,t,u,p,r,m)}return;default:if(Sn(t)){for(var _ in n)p=n[_],n.hasOwnProperty(_)&&p!==void 0&&!r.hasOwnProperty(_)&&tp(e,t,_,void 0,r,p);for(d in r)p=r[d],m=n[d],!r.hasOwnProperty(d)||p===m||p===void 0&&m===void 0||tp(e,t,d,p,r,m);return}}for(var v in n)p=n[v],n.hasOwnProperty(v)&&p!=null&&!r.hasOwnProperty(v)&&$(e,t,v,null,r,p);for(f in r)p=r[f],m=n[f],!r.hasOwnProperty(f)||p===m||p==null&&m==null||$(e,t,f,p,r,m)}function ap(e){switch(e){case`css`:case`script`:case`font`:case`img`:case`image`:case`input`:case`link`:return!0;default:return!1}}function op(){if(typeof performance.getEntriesByType==`function`){for(var e=0,t=0,n=performance.getEntriesByType(`resource`),r=0;r<n.length;r++){var i=n[r],a=i.transferSize,o=i.initiatorType,s=i.duration;if(a&&s&&ap(o)){for(o=0,s=i.responseEnd,r+=1;r<n.length;r++){var c=n[r],l=c.startTime;if(l>s)break;var u=c.transferSize,d=c.initiatorType;u&&ap(d)&&(c=c.responseEnd,o+=u*(c<s?1:(s-l)/(c-l)))}if(--r,t+=8*(a+o)/(i.duration/1e3),e++,10<e)break}}if(0<e)return t/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e==`number`)?e:5}var sp=null,cp=null;function lp(e){return e.nodeType===9?e:e.ownerDocument}function up(e){switch(e){case`http://www.w3.org/2000/svg`:return 1;case`http://www.w3.org/1998/Math/MathML`:return 2;default:return 0}}function dp(e,t){if(e===0)switch(t){case`svg`:return 1;case`math`:return 2;default:return 0}return e===1&&t===`foreignObject`?0:e}function fp(e,t,n,r){return n=lp(n).createElement(e),n[O]=r,n[Nt]=t,np(n,e,t),A(n),n}function pp(e,t){return e===`textarea`||e===`noscript`||typeof t.children==`string`||typeof t.children==`number`||typeof t.children==`bigint`||typeof t.dangerouslySetInnerHTML==`object`&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var mp=null;function hp(){var e=window.event;return e&&e.type===`popstate`?e!==mp&&(mp=e,!0):(mp=null,!1)}var gp=typeof setTimeout==`function`?setTimeout:void 0,_p=typeof clearTimeout==`function`?clearTimeout:void 0,vp=typeof Promise==`function`?Promise:void 0,yp=typeof requestAnimationFrame==`function`?requestAnimationFrame:gp,bp=typeof queueMicrotask==`function`?queueMicrotask:vp===void 0?gp:function(e){return vp.resolve(null).then(e).catch(xp)};function xp(e){setTimeout(function(){throw e})}function Sp(e){return e===`head`}function Cp(e,t){var n=t,r=0;do{var i=n.nextSibling;if(e.removeChild(n),i&&i.nodeType===8){if(n=i.data,n===`/$`||n===`/&`){if(r===0){e.removeChild(i),Hh(t);return}r--}else if(n===`$`||n===`$?`||n===`$~`||n===`$!`||n===`&`)r++;else if(n===`html`)_m(e.ownerDocument.documentElement);else if(n===`head`){n=e.ownerDocument.head,_m(n);for(var a=n.firstChild;a;){var o=a.nextSibling,s=a.nodeName;a[zt]||s===`SCRIPT`||s===`STYLE`||s===`LINK`&&a.rel.toLowerCase()===`stylesheet`||n.removeChild(a),a=o}}else n===`body`&&_m(e.ownerDocument.body)}n=i}while(n);Hh(t)}function wp(e,t){var n=e;e=0;do{var r=n.nextSibling;if(n.nodeType===1?t?(n._stashedDisplay=n.style.display,n.style.display=`none`):(n.style.display=n._stashedDisplay||``,n.getAttribute(`style`)===``&&n.removeAttribute(`style`)):n.nodeType===3&&(t?(n._stashedText=n.nodeValue,n.nodeValue=``):n.nodeValue=n._stashedText||``),r&&r.nodeType===8){if(n=r.data,n===`/$`){if(e===0)break;e--}else n!==`$`&&n!==`$?`&&n!==`$~`&&n!==`$!`||e++}n=r}while(n)}function Tp(e,t,n){if(t=CSS.escape(t)===t?t:`r-`+btoa(t).replace(/=/g,``),e.style.viewTransitionName=t,n!=null&&(e.style.viewTransitionClass=n),n=getComputedStyle(e),n.display===`inline`){if(t=e.getClientRects(),t.length===1)var r=1;else for(var i=r=0;i<t.length;i++){var a=t[i];0<a.width&&0<a.height&&r++}r===1&&(e=e.style,e.display=t.length===1?`inline-block`:`block`,e.marginTop=`-`+n.paddingTop,e.marginBottom=`-`+n.paddingBottom)}}function Ep(e,t){e=e.style,t=t.style;var n=t==null?null:t.hasOwnProperty(`viewTransitionName`)?t.viewTransitionName:t.hasOwnProperty(`view-transition-name`)?t[`view-transition-name`]:null;e.viewTransitionName=n==null||typeof n==`boolean`?``:(``+n).trim(),n=t==null?null:t.hasOwnProperty(`viewTransitionClass`)?t.viewTransitionClass:t.hasOwnProperty(`view-transition-class`)?t[`view-transition-class`]:null,e.viewTransitionClass=n==null||typeof n==`boolean`?``:(``+n).trim(),e.display===`inline-block`&&(t==null?e.display=e.margin=``:(n=t.display,e.display=n==null||typeof n==`boolean`?``:n,n=t.margin,n==null?(n=t.hasOwnProperty(`marginTop`)?t.marginTop:t[`margin-top`],e.marginTop=n==null||typeof n==`boolean`?``:n,t=t.hasOwnProperty(`marginBottom`)?t.marginBottom:t[`margin-bottom`],e.marginBottom=t==null||typeof t==`boolean`?``:t):e.margin=n))}function Dp(e,t,n){return n=n.ownerDocument.defaultView,{rect:e,abs:t.position===`absolute`||t.position===`fixed`,clip:t.clipPath!==`none`||t.overflow!==`visible`||t.filter!==`none`||t.mask!==`none`||t.mask!==`none`||t.borderRadius!==`0px`,view:0<=e.bottom&&0<=e.right&&e.top<=n.innerHeight&&e.left<=n.innerWidth}}function Op(e){return Dp(e.getBoundingClientRect(),getComputedStyle(e),e)}function kp(e){var t=e.getBoundingClientRect();t=new DOMRect(t.x+2e4,t.y+2e4,t.width,t.height);var n=getComputedStyle(e);return Dp(t,n,e)}function Ap(e){return e.documentElement.clientHeight}function jp(e){this.addEventListener(`load`,e),this.addEventListener(`error`,e)}function Mp(e,t,n,r,i,a,o,s,c){var l=t.nodeType===9?t:t.ownerDocument;try{var u=l.startViewTransition({update:function(){var t=l.defaultView,n=t.navigation&&t.navigation.transition,o=l.fonts.status;r();var s=[];if(o===`loaded`&&(Ap(l),l.fonts.status===`loading`&&s.push(l.fonts.ready)),o=s.length,e!==null)for(var c=e.suspenseyImages,u=0,d=0;d<c.length;d++){var f=c[d];if(!f.complete){var p=f.getBoundingClientRect();if(0<p.bottom&&0<p.right&&p.top<t.innerHeight&&p.left<t.innerWidth){if(u+=Xm(f),u>$m){s.length=o;break}f=new Promise(jp.bind(f)),s.push(f)}}}if(0<s.length)return t=Promise.race([Promise.all(s),new Promise(function(e){return setTimeout(e,500)})]).then(i,i),(n?Promise.allSettled([n.finished,t]):t).then(a,a);if(i(),n)return n.finished.then(a,a);a()},types:n});l.__reactViewTransition=u;var d=[];return u.ready.then(function(){for(var e=l.documentElement.getAnimations({subtree:!0}),t=0;t<e.length;t++){var n=e[t],r=n.effect,i=r.pseudoElement;if(i!=null&&i.startsWith(`::view-transition`)){d.push(n),n=r.getKeyframes();for(var a=i=void 0,s=!0,c=0;c<n.length;c++){var u=n[c],f=u.width;if(i===void 0)i=f;else if(i!==f){s=!1;break}if(f=u.height,a===void 0)a=f;else if(a!==f){s=!1;break}delete u.width,delete u.height,u.transform===`none`&&delete u.transform}s&&i!==void 0&&a!==void 0&&(r.setKeyframes(n),s=getComputedStyle(r.target,r.pseudoElement),s.width!==i||s.height!==a)&&(s=n[0],s.width=i,s.height=a,s=n[n.length-1],s.width=i,s.height=a,r.setKeyframes(n))}}o()},function(e){l.__reactViewTransition===u&&(l.__reactViewTransition=null);try{if(typeof e==`object`&&e)switch(e.name){case`InvalidStateError`:(e.message===`View transition was skipped because document visibility state is hidden.`||e.message===`Skipping view transition because document visibility state has become hidden.`||e.message===`Skipping view transition because viewport size changed.`||e.message===`Transition was aborted because of invalid state`)&&(e=null)}e!==null&&c(e)}finally{r(),i(),o()}}),u.finished.finally(function(){for(var e=0;e<d.length;e++)d[e].cancel();l.__reactViewTransition===u&&(l.__reactViewTransition=null),s()}),u}catch{return r(),i(),o(),null}}function Np(e,t){this._scope=document.documentElement,this._selector=`::view-transition-`+e+`(`+t+`)`}Np.prototype.animate=function(e,t){return t=typeof t==`number`?{duration:t}:C({},t),t.pseudoElement=this._selector,this._scope.animate(e,t)},Np.prototype.getAnimations=function(){for(var e=this._scope,t=this._selector,n=e.getAnimations({subtree:!0}),r=[],i=0;i<n.length;i++){var a=n[i].effect;a!==null&&a.target===e&&a.pseudoElement===t&&r.push(n[i])}return r},Np.prototype.getComputedStyle=function(){return getComputedStyle(this._scope,this._selector)};function Pp(e){return{name:e,group:new Np(`group`,e),imagePair:new Np(`image-pair`,e),old:new Np(`old`,e),new:new Np(`new`,e)}}function Fp(e){this._fragmentFiber=e,this._observers=this._eventListeners=null}Fp.prototype.addEventListener=function(e,t,n){var r=null,i=null;if(!(n!=null&&typeof n!=`boolean`&&(r=n.signal||null,r!==null&&r.aborted))){this._eventListeners===null&&(this._eventListeners=[]);var a=this._eventListeners;if(Bp(a,e,t,n)===-1){var o=this,s=t;n!=null&&typeof n!=`boolean`&&!0===n.once&&(s=function(r){o.removeEventListener(e,t,n),typeof t==`function`?t.call(this,r):t.handleEvent(r)}),r!==null&&(i=o.removeEventListener.bind(o,e,t,n),r.addEventListener(`abort`,i,{once:!0}),i=r.removeEventListener.bind(r,`abort`,i)),r=Rp(n),a.push({type:e,listener:t,optionsOrUseCapture:n,attachedListener:s,cleanup:i}),h(this._fragmentFiber.child,!1,Ip,e,s,r)}this._eventListeners=a}};function Ip(e,t,n,r){return b(e).addEventListener(t,n,r),!1}Fp.prototype.removeEventListener=function(e,t,n){var r=this._eventListeners;if(r!==null&&(t=Bp(r,e,t,n),t!==-1)){var i=r[t];n=i.attachedListener;var a=i.cleanup;i=Rp(i.optionsOrUseCapture),h(this._fragmentFiber.child,!1,Lp,e,n,i),r.splice(t,1),a!==null&&a()}};function Lp(e,t,n,r){return b(e).removeEventListener(t,n,r),!1}function Rp(e){return e!=null&&typeof e!=`boolean`&&(!0===e.once||e.signal instanceof AbortSignal)?{capture:e.capture,passive:e.passive}:e}function zp(e){return e==null?`c=0`:typeof e==`boolean`?`c=`+(e?`1`:`0`):`c=`+(e.capture?`1`:`0`)}function Bp(e,t,n,r){if(e.length===0)return-1;r=zp(r);for(var i=0;i<e.length;i++){var a=e[i];if(a.type===t&&a.listener===n&&zp(a.optionsOrUseCapture)===r)return i}return-1}Fp.prototype.dispatchEvent=function(e){var t=g(this._fragmentFiber);if(t===null)return!0;t=b(t);var n=this._eventListeners;if(n!==null&&0<n.length||!e.bubbles){var r=t.nodeType===9?t.createComment(``):document.createTextNode(``);if(n)for(var i=0;i<n.length;i++){var a=n[i];r.addEventListener(a.type,a.attachedListener,Rp(a.optionsOrUseCapture))}if(t.appendChild(r),e=r.dispatchEvent(e),n)for(i=0;i<n.length;i++)a=n[i],r.removeEventListener(a.type,a.attachedListener,Rp(a.optionsOrUseCapture));return t.removeChild(r),e}return t.dispatchEvent(e)},Fp.prototype.focus=function(e){h(this._fragmentFiber.child,!0,Vp,e,void 0,void 0)};function Vp(e,t){return e.tag!==6&&(e=b(e),pm(e,t))}Fp.prototype.focusLast=function(e){var t=[];h(this._fragmentFiber.child,!0,Hp,t,void 0,void 0);for(var n=t.length-1;0<=n&&!Vp(t[n],e);n--);};function Hp(e,t){return t.push(e),!1}Fp.prototype.blur=function(){var e=g(this._fragmentFiber);e!==null&&(e=b(e),e=lp(e).activeElement,e!==null&&h(this._fragmentFiber.child,!1,Up,e,void 0,void 0))};function Up(e,t){return e.tag!==6&&(e=b(e),e===t||e.contains(t)?(t.blur(),!0):!1)}Fp.prototype.observeUsing=function(e){this._observers===null&&(this._observers=new Set),this._observers.add(e),h(this._fragmentFiber.child,!1,Wp,e,void 0,void 0)};function Wp(e,t){return e.tag===6||(e=b(e),t.observe(e)),!1}Fp.prototype.unobserveUsing=function(e){var t=this._observers;if(t!==null&&t.has(e)){t.delete(e),h(this._fragmentFiber.child,!1,Gp,e,void 0,void 0);for(var n=t=0;n<Kp.length;n++){var r=Kp[n];r.fragmentInstance===this&&r.observer===e?e.unobserve(r.instance):Kp[t++]=r}Kp.length=t}};function Gp(e,t){return e.tag===6||(e=b(e),t.unobserve(e)),!1}var Kp=[],qp=!1;function Jp(e,t,n){Kp.push({fragmentInstance:e,observer:t,instance:n}),qp||(qp=!0,mm(function(){qp=!1;var e=Kp;Kp=[];for(var t=0;t<e.length;t++){var n=e[t];n.observer.unobserve(n.instance)}}))}Fp.prototype.getClientRects=function(){var e=[];return h(this._fragmentFiber.child,!1,Yp,e,void 0,void 0),e};function Yp(e,t){if(e.tag===6){e=e.stateNode;var n=e.ownerDocument.createRange();n.selectNodeContents(e),t.push.apply(t,n.getClientRects())}else e=b(e),t.push.apply(t,e.getClientRects());return!1}Fp.prototype.getRootNode=function(e){var t=g(this._fragmentFiber);return t===null?this:b(t).getRootNode(e)},Fp.prototype.compareDocumentPosition=function(e){var t=g(this._fragmentFiber);if(t===null)return Node.DOCUMENT_POSITION_DISCONNECTED;var n=[];h(this._fragmentFiber.child,!1,Hp,n,void 0,void 0);var r=b(t);if(n.length===0){if(n=r,_(this._fragmentFiber)){a:{for(t=this._fragmentFiber.return;t!==null;){if(t.tag===4){t=t.stateNode.containerInfo;break a}if(t.tag===3||t.tag===5||t.tag===27)break;t=t.return}t=null}t!=null&&(n=t)}t=this._fragmentFiber;var i=r=n.compareDocumentPosition(e);return n===e?i=Node.DOCUMENT_POSITION_CONTAINS:r&Node.DOCUMENT_POSITION_CONTAINED_BY&&(n=v(t)[1],n===null?i=Node.DOCUMENT_POSITION_PRECEDING:(e=b(n).compareDocumentPosition(e),i=e===0||e&Node.DOCUMENT_POSITION_FOLLOWING?Node.DOCUMENT_POSITION_FOLLOWING:Node.DOCUMENT_POSITION_PRECEDING)),i|=Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC}t=b(n[0]),i=b(n[n.length-1]);var a=_(this._fragmentFiber)?t.parentElement:r;if(a==null)return Node.DOCUMENT_POSITION_DISCONNECTED;r=a.compareDocumentPosition(t)&Node.DOCUMENT_POSITION_CONTAINED_BY,a=a.compareDocumentPosition(i)&Node.DOCUMENT_POSITION_CONTAINED_BY;var o=t.compareDocumentPosition(e),s=i.compareDocumentPosition(e),c=o&Node.DOCUMENT_POSITION_CONTAINED_BY||s&Node.DOCUMENT_POSITION_CONTAINED_BY;return s=r&&a&&o&Node.DOCUMENT_POSITION_FOLLOWING&&s&Node.DOCUMENT_POSITION_PRECEDING,t=r&&t===e||a&&i===e||c||s?Node.DOCUMENT_POSITION_CONTAINED_BY:!r&&t===e||!a&&i===e?Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC:o,t&Node.DOCUMENT_POSITION_DISCONNECTED||t&Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC||Xp(t,this._fragmentFiber,n[0],n[n.length-1],e)?t:Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC};function Xp(e,t,n,r,i){var a=Ht(i);if(e&Node.DOCUMENT_POSITION_CONTAINED_BY){if(n=!!a)a:{for(;a!==null;){if(a.tag===7&&(a===t||a.alternate===t)){n=!0;break a}a=a.return}n=!1}return n}if(e&Node.DOCUMENT_POSITION_CONTAINS){if(a===null)return a=i.ownerDocument,i===a||i===a.documentElement||i===a.body;a:{for(a=t,t=g(t);a!==null;){if(!(a.tag!==5&&a.tag!==3&&a.tag!==27||a!==t&&a.alternate!==t)){a=!0;break a}a=a.return}a=!1}return a}return e&Node.DOCUMENT_POSITION_PRECEDING?((t=!!a)&&!(t=a===n)&&(t=re(n,a,S),t===null?t=!1:(h(t,!0,x,a,n),a=ee,ee=null,t=a!==null)),t):e&Node.DOCUMENT_POSITION_FOLLOWING?((t=!!a)&&!(t=a===r)&&(t=re(r,a,S),t===null?t=!1:(h(t,!0,ne,a,r),a=ee,te=ee=null,t=a!==null)),t):!1}function Zp(e,t){var n=e.ownerDocument.createRange();n.selectNodeContents(e),e=n.getBoundingClientRect(),window.scrollTo(window.scrollX+e.left,t?window.scrollY+e.top:window.scrollY+e.bottom-window.innerHeight)}Fp.prototype.scrollIntoView=function(e){if(typeof e==`object`)throw Error(i(566));var t=[];h(this._fragmentFiber.child,!1,Hp,t,void 0,void 0);var n=!1!==e;if(t.length===0){var r=v(this._fragmentFiber);if(r=n?r[1]||r[0]||g(this._fragmentFiber):r[0]||r[1],r===null)return;if(r.tag===6){e=b(r),Zp(e,n);return}if(r=b(r),r.nodeType!==9){if(r.nodeType===11){n=`host`in r?r.host:null,n!==null&&n.scrollIntoView(e);return}r.scrollIntoView(e)}}for(r=n?t.length-1:0;r!==(n?-1:t.length);){var a=t[r];a.tag===6?(a=b(a),Zp(a,n)):b(a).scrollIntoView(e),r+=n?-1:1}};function Qp(e,t){return e=b(e),$p(e,t),!1}function $p(e,t){e.reactFragments??=new Set,e.reactFragments.add(t)}function em(e,t){var n=t._eventListeners;if(n!==null)for(var r=0;r<n.length;r++){var i=n[r];e.addEventListener(i.type,i.attachedListener,Rp(i.optionsOrUseCapture))}e.nodeType!==3&&(n=t._observers,n!==null&&n.forEach(function(n){for(var r=0,i=0;i<Kp.length;i++){var a=Kp[i];(a.fragmentInstance!==t||a.observer!==n||a.instance!==e)&&(Kp[r++]=a)}Kp.length=r,n.observe(e)}),$p(e,t))}function tm(e,t){var n=t._eventListeners;if(n!==null)for(var r=0;r<n.length;r++){var i=n[r];e.removeEventListener(i.type,i.attachedListener,Rp(i.optionsOrUseCapture))}e.nodeType!==3&&(n=t._observers,n!==null&&n.forEach(function(n){typeof n.rootMargin==`string`?Jp(t,n,e):n.unobserve(e)}),e.reactFragments!=null&&e.reactFragments.delete(t))}function nm(e){var t=e.firstChild;for(t&&t.nodeType===10&&(t=t.nextSibling);t;){var n=t;switch(t=t.nextSibling,n.nodeName){case`HTML`:case`HEAD`:case`BODY`:nm(n),Vt(n);continue;case`SCRIPT`:case`STYLE`:continue;case`LINK`:if(n.rel.toLowerCase()===`stylesheet`)continue}e.removeChild(n)}}function rm(e,t,n,r){for(;e.nodeType===1;){var i=n;if(e.nodeName.toLowerCase()!==t.toLowerCase()){if(!r&&(e.nodeName!==`INPUT`||e.type!==`hidden`))break}else if(!r){if(t===`input`&&e.type===`hidden`){var a=i.name==null?null:``+i.name;if(i.type===`hidden`&&e.getAttribute(`name`)===a)return e}else return e}else if(!e[zt])switch(t){case`meta`:if(!e.hasAttribute(`itemprop`))break;return e;case`link`:if(a=e.getAttribute(`rel`),a===`stylesheet`&&e.hasAttribute(`data-precedence`)||a!==i.rel||e.getAttribute(`href`)!==(i.href==null||i.href===``?null:i.href)||e.getAttribute(`crossorigin`)!==(i.crossOrigin==null?null:i.crossOrigin)||e.getAttribute(`title`)!==(i.title==null?null:i.title))break;return e;case`style`:if(e.hasAttribute(`data-precedence`))break;return e;case`script`:if(a=e.getAttribute(`src`),(a!==(i.src==null?null:i.src)||e.getAttribute(`type`)!==(i.type==null?null:i.type)||e.getAttribute(`crossorigin`)!==(i.crossOrigin==null?null:i.crossOrigin))&&a&&e.hasAttribute(`async`)&&!e.hasAttribute(`itemprop`))break;return e;default:return e}if(e=lm(e.nextSibling),e===null)break}return null}function im(e,t,n){if(t===``)return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!==`INPUT`||e.type!==`hidden`)&&!n||(e=lm(e.nextSibling),e===null))return null;return e}function am(e,t){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!==`INPUT`||e.type!==`hidden`)&&!t||(e=lm(e.nextSibling),e===null))return null;return e}function om(e){return e.data===`$?`||e.data===`$~`}function sm(e){return e.data===`$!`||e.data===`$?`&&e.ownerDocument.readyState!==`loading`}function cm(e,t){var n=e.ownerDocument;if(e.data===`$~`)e._reactRetry=t;else if(e.data!==`$?`||n.readyState!==`loading`)t();else{var r=function(){t(),n.removeEventListener(`DOMContentLoaded`,r)};n.addEventListener(`DOMContentLoaded`,r),e._reactRetry=r}}function lm(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t===`$`||t===`$!`||t===`$?`||t===`$~`||t===`&`||t===`F!`||t===`F`)break;if(t===`/$`||t===`/&`)return null}}return e}var um=null;function dm(e){e=e.nextSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n===`/$`||n===`/&`){if(t===0)return lm(e.nextSibling);t--}else n!==`$`&&n!==`$!`&&n!==`$?`&&n!==`$~`&&n!==`&`||t++}e=e.nextSibling}return null}function fm(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n===`$`||n===`$!`||n===`$?`||n===`$~`||n===`&`){if(t===0)return e;t--}else n!==`/$`&&n!==`/&`||t++}e=e.previousSibling}return null}function pm(e,t){function n(){r=!0}if(e.ownerDocument.activeElement===e)return!0;var r=!1;try{e.ownerDocument.addEventListener(`focus`,n,!0),(e.focus||HTMLElement.prototype.focus).call(e,t)}finally{e.ownerDocument.removeEventListener(`focus`,n,!0)}return r}function mm(e){yp(function(){yp(function(t){return e(t)})})}function hm(e,t,n){switch(t=lp(n),e){case`html`:if(e=t.documentElement,!e)throw Error(i(452));return e;case`head`:if(e=t.head,!e)throw Error(i(453));return e;case`body`:if(e=t.body,!e)throw Error(i(454));return e;default:throw Error(i(451))}}function gm(e,t,n){for(var r in n){var i=n[r];n.hasOwnProperty(r)&&i!=null&&$(e,t,r,null,rp,i)}n.dangerouslySetInnerHTML!=null&&(e.textContent=``),e.onclick===En&&(e.onclick=null),Vt(e)}function _m(e){for(var t=e.attributes;t.length;)e.removeAttributeNode(t[0]);Vt(e)}var vm=new Map,ym=new Set;function bm(e){if(typeof e.getRootNode==`function`){var t=e.getRootNode();if(t.nodeType===9||t.nodeType===11)return t}return e.nodeType===9?e:e.ownerDocument}var xm=E.d;E.d={f:Sm,r:Cm,D:Em,C:Dm,L:Om,m:km,X:jm,S:Am,M:Mm};function Sm(){var e=xm.f(),t=zd();return e||t}function Cm(e){var t=Ut(e);t!==null&&t.tag===5&&t.type===`form`?oc(t):xm.r(e)}var wm=typeof document>`u`?null:document;function Tm(e,t,n){var r=wm;if(r&&typeof t==`string`&&t){var i=dn(t);i=`link[rel="`+e+`"][href="`+i+`"]`,typeof n==`string`&&(i+=`[crossorigin="`+n+`"]`),ym.has(i)||(ym.add(i),e={rel:e,crossOrigin:n,href:t},r.querySelector(i)===null&&(t=r.createElement(`link`),np(t,`link`,e),A(t),r.head.appendChild(t)))}}function Em(e){xm.D(e),Tm(`dns-prefetch`,e,null)}function Dm(e,t){xm.C(e,t),Tm(`preconnect`,e,t)}function Om(e,t,n){xm.L(e,t,n);var r=wm;if(r&&e&&t){var i=`link[rel="preload"][as="`+dn(t)+`"]`;t===`image`&&n&&n.imageSrcSet?(i+=`[imagesrcset="`+dn(n.imageSrcSet)+`"]`,typeof n.imageSizes==`string`&&(i+=`[imagesizes="`+dn(n.imageSizes)+`"]`)):i+=`[href="`+dn(e)+`"]`;var a=i;switch(t){case`style`:a=Pm(e);break;case`script`:a=Rm(e)}if(!(vm.has(a)||(e=C({rel:`preload`,href:t===`image`&&n&&n.imageSrcSet?void 0:e,as:t},n),vm.set(a,e),r.querySelector(i)!==null||t===`style`&&r.querySelector(Fm(a))||t===`script`&&r.querySelector(zm(a))))){var o=r.createElement(`link`);np(o,`link`,e),t===`style`&&(o[Bt]=!0,o.onload=o.onerror=function(){Gt(o)}),A(o),r.head.appendChild(o)}}}function km(e,t){xm.m(e,t);var n=wm;if(n&&e){var r=t&&typeof t.as==`string`?t.as:`script`,i=`link[rel="modulepreload"][as="`+dn(r)+`"][href="`+dn(e)+`"]`,a=i;switch(r){case`audioworklet`:case`paintworklet`:case`serviceworker`:case`sharedworker`:case`worker`:case`script`:a=Rm(e)}if(!vm.has(a)&&(e=C({rel:`modulepreload`,href:e},t),vm.set(a,e),n.querySelector(i)===null)){switch(r){case`audioworklet`:case`paintworklet`:case`serviceworker`:case`sharedworker`:case`worker`:case`script`:if(n.querySelector(zm(a)))return}r=n.createElement(`link`),np(r,`link`,e),A(r),n.head.appendChild(r)}}}function Am(e,t,n){xm.S(e,t,n);var r=wm;if(r&&e){var i=k(r).hoistableStyles,a=Pm(e);t||=`default`;var o=i.get(a);if(!o){var s={loading:0,preload:null};if(o=r.querySelector(Fm(a)))s.loading=5;else{e=C({rel:`stylesheet`,href:e,"data-precedence":t},n),(n=vm.get(a))&&Hm(e,n);var c=o=r.createElement(`link`);A(c),np(c,`link`,e),c._p=new Promise(function(e,t){c.onload=e,c.onerror=t}),c.addEventListener(`load`,function(){s.loading|=1}),c.addEventListener(`error`,function(){s.loading|=2}),s.loading|=4,Vm(o,t,r)}o={type:`stylesheet`,instance:o,count:1,state:s},i.set(a,o)}}}function jm(e,t){xm.X(e,t);var n=wm;if(n&&e){var r=k(n).hoistableScripts,i=Rm(e),a=r.get(i);a||(a=n.querySelector(zm(i)),a||(e=C({src:e,async:!0},t),(t=vm.get(i))&&Um(e,t),a=n.createElement(`script`),A(a),np(a,`link`,e),n.head.appendChild(a)),a={type:`script`,instance:a,count:1,state:null},r.set(i,a))}}function Mm(e,t){xm.M(e,t);var n=wm;if(n&&e){var r=k(n).hoistableScripts,i=Rm(e),a=r.get(i);a||(a=n.querySelector(zm(i)),a||(e=C({src:e,async:!0,type:`module`},t),(t=vm.get(i))&&Um(e,t),a=n.createElement(`script`),A(a),np(a,`link`,e),n.head.appendChild(a)),a={type:`script`,instance:a,count:1,state:null},r.set(i,a))}}function Nm(e,t,n,r){var a=(a=Ne.current)?bm(a):null;if(!a)throw Error(i(446));switch(e){case`meta`:case`title`:return null;case`style`:return typeof n.precedence==`string`&&typeof n.href==`string`?(n=Pm(n.href),t=k(a).hoistableStyles,r=t.get(n),r||(r={type:`style`,instance:null,count:0,state:null},t.set(n,r)),r):{type:`void`,instance:null,count:0,state:null};case`link`:if(n.rel===`stylesheet`&&typeof n.href==`string`&&typeof n.precedence==`string`){e=Pm(n.href);var o=k(a).hoistableStyles,s=o.get(e);if(s||(a=a.ownerDocument||a,s={type:`stylesheet`,instance:null,count:0,state:{loading:0,preload:null}},o.set(e,s),(o=a.querySelector(Fm(e)))?o._p||(s.instance=o,s.state.loading=5):(o=vm.get(e),o||(o={rel:`preload`,as:`style`,href:n.href,crossOrigin:n.crossOrigin,integrity:n.integrity,media:n.media,hrefLang:n.hrefLang,referrerPolicy:n.referrerPolicy},vm.set(e,o)),Lm(a,e,o,s.state))),t&&r===null)throw Error(i(528,``));return s}if(t&&r!==null)throw Error(i(529,``));return null;case`script`:return t=n.async,n=n.src,typeof n==`string`&&t&&typeof t!=`function`&&typeof t!=`symbol`?(n=Rm(n),t=k(a).hoistableScripts,r=t.get(n),r||(r={type:`script`,instance:null,count:0,state:null},t.set(n,r)),r):{type:`void`,instance:null,count:0,state:null};default:throw Error(i(444,e))}}function Pm(e){return`href="`+dn(e)+`"`}function Fm(e){return`link[rel="stylesheet"][`+e+`]`}function Im(e){return C({},e,{"data-precedence":e.precedence,precedence:null})}function Lm(e,t,n,r){if(t=e.querySelector(`link[rel="preload"][as="style"][`+t+`]`)){if(!0!==t[Bt]){r.loading=1;return}}else t=e.createElement(`link`),t[Bt]=!0,t.onload=t.onerror=Gt.bind(null,t),np(t,`link`,n),A(t),e.head.appendChild(t);r.preload=t,t.addEventListener(`load`,function(){return r.loading|=1}),t.addEventListener(`error`,function(){return r.loading|=2})}function Rm(e){return`[src="`+dn(e)+`"]`}function zm(e){return`script[async]`+e}function Bm(e,t,n){if(t.count++,t.instance===null)switch(t.type){case`style`:var r=e.querySelector(`style[data-href~="`+dn(n.href)+`"]`);if(r)return t.instance=r,A(r),r;var a=C({},n,{"data-href":n.href,"data-precedence":n.precedence,href:null,precedence:null});return r=(e.ownerDocument||e).createElement(`style`),A(r),np(r,`style`,a),Vm(r,n.precedence,e),t.instance=r;case`stylesheet`:a=Pm(n.href);var o=e.querySelector(Fm(a));if(o)return t.state.loading|=4,t.instance=o,A(o),o;r=Im(n),(a=vm.get(a))&&Hm(r,a),o=(e.ownerDocument||e).createElement(`link`),A(o);var s=o;return s._p=new Promise(function(e,t){s.onload=e,s.onerror=t}),np(o,`link`,r),t.state.loading|=4,Vm(o,n.precedence,e),t.instance=o;case`script`:return o=Rm(n.src),(a=e.querySelector(zm(o)))?(t.instance=a,A(a),a):(r=n,(a=vm.get(o))&&(r=C({},n),Um(r,a)),e=e.ownerDocument||e,a=e.createElement(`script`),A(a),np(a,`link`,r),e.head.appendChild(a),t.instance=a);case`void`:return null;default:throw Error(i(443,t.type))}else t.type===`stylesheet`&&!(t.state.loading&4)&&(r=t.instance,t.state.loading|=4,Vm(r,n.precedence,e));return t.instance}function Vm(e,t,n){for(var r=n.querySelectorAll(`link[rel="stylesheet"][data-precedence],style[data-precedence]`),i=r.length?r[r.length-1]:null,a=i,o=0;o<r.length;o++){var s=r[o];if(s.dataset.precedence===t)a=s;else if(a!==i)break}a?a.parentNode.insertBefore(e,a.nextSibling):(t=n.nodeType===9?n.head:n,t.insertBefore(e,t.firstChild))}function Hm(e,t){e.crossOrigin??=t.crossOrigin,e.referrerPolicy??=t.referrerPolicy,e.title??=t.title}function Um(e,t){e.crossOrigin??=t.crossOrigin,e.referrerPolicy??=t.referrerPolicy,e.integrity??=t.integrity}var Wm=null;function Gm(e,t,n){if(Wm===null){var r=new Map,i=Wm=new Map;i.set(n,r)}else i=Wm,r=i.get(n),r||(r=new Map,i.set(n,r));if(r.has(e))return r;for(r.set(e,null),n=n.getElementsByTagName(e),i=0;i<n.length;i++){var a=n[i];if(!(a[zt]||a[O]||e===`link`&&a.getAttribute(`rel`)===`stylesheet`)&&a.namespaceURI!==`http://www.w3.org/2000/svg`){var o=a.getAttribute(t)||``;o=e+o;var s=r.get(o);s?s.push(a):r.set(o,[a])}}return r}function Km(e,t,n){e=e.ownerDocument||e,e.head.insertBefore(n,t===`title`?e.querySelector(`head > title`):null)}function qm(e,t,n){if(n===1||t.itemProp!=null)return!1;switch(e){case`meta`:case`title`:return!0;case`style`:if(typeof t.precedence!=`string`||typeof t.href!=`string`||t.href===``)break;return!0;case`link`:if(typeof t.rel!=`string`||typeof t.href!=`string`||t.href===``||t.onLoad||t.onError)break;switch(t.rel){case`stylesheet`:return e=t.disabled,typeof t.precedence==`string`&&e==null;default:return!0}case`script`:if(t.async&&typeof t.async!=`function`&&typeof t.async!=`symbol`&&!t.onLoad&&!t.onError&&t.src&&typeof t.src==`string`)return!0}return!1}function Jm(e,t){return e===`img`&&t.src!=null&&t.src!==``&&t.onLoad==null&&t.loading!==`lazy`}function Ym(e){return!(e.type===`stylesheet`&&!(e.state.loading&3))}function Xm(e){return(e.width||100)*(e.height||100)*(typeof devicePixelRatio==`number`?devicePixelRatio:1)*.25}function Zm(e,t){typeof t.decode==`function`&&(e.imgCount++,t.complete||(e.imgBytes+=Xm(t),e.suspenseyImages.push(t)),e=rh.bind(e),t.decode().then(e,e))}function Qm(e,t,n,r){if(n.type===`stylesheet`&&(typeof r.media!=`string`||!1!==matchMedia(r.media).matches)&&!(n.state.loading&4)){if(n.instance===null){var i=Pm(r.href),a=t.querySelector(Fm(i));if(a){t=a._p,typeof t==`object`&&t&&typeof t.then==`function`&&(e.count++,e=nh.bind(e),t.then(e,e)),n.state.loading|=4,n.instance=a,A(a);return}a=t.ownerDocument||t,r=Im(r),(i=vm.get(i))&&Hm(r,i),a=a.createElement(`link`),A(a);var o=a;o._p=new Promise(function(e,t){o.onload=e,o.onerror=t}),np(a,`link`,r),n.instance=a}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(n,t),(t=n.state.preload)&&!(n.state.loading&3)&&(e.count++,n=nh.bind(e),t.addEventListener(`load`,n),t.addEventListener(`error`,n))}}var $m=0;function eh(e,t){return e.stylesheets&&e.count===0&&ah(e,e.stylesheets),0<e.count||0<e.imgCount?function(n){var r=setTimeout(function(){if(e.stylesheets&&ah(e,e.stylesheets),e.unsuspend){var t=e.unsuspend;e.unsuspend=null,t()}},6e4+t);0<e.imgBytes&&$m===0&&($m=62500*op());var i=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&ah(e,e.stylesheets),e.unsuspend)){var t=e.unsuspend;e.unsuspend=null,t()}},(e.imgBytes>$m?50:800)+t);return e.unsuspend=n,function(){e.unsuspend=null,clearTimeout(r),clearTimeout(i)}}:null}function th(e){if(e.count===0&&(e.imgCount===0||!e.waitingForImages)){if(e.stylesheets)ah(e,e.stylesheets);else if(e.unsuspend){var t=e.unsuspend;e.unsuspend=null,t()}}}function nh(){this.count--,th(this)}function rh(){this.imgCount--,th(this)}var ih=null;function ah(e,t){e.stylesheets=null,e.unsuspend!==null&&(e.count++,ih=new Map,t.forEach(oh,e),ih=null,nh.call(e))}function oh(e,t){if(!(t.state.loading&4)){var n=ih.get(e);if(n)var r=n.get(null);else{n=new Map,ih.set(e,n);for(var i=e.querySelectorAll(`link[data-precedence],style[data-precedence]`),a=0;a<i.length;a++){var o=i[a];(o.nodeName===`LINK`||o.getAttribute(`media`)!==`not all`)&&(n.set(o.dataset.precedence,o),r=o)}r&&n.set(null,r)}i=t.instance,o=i.getAttribute(`data-precedence`),a=n.get(o)||r,a===r&&n.set(null,i),n.set(o,i),this.count++,r=nh.bind(this),i.addEventListener(`load`,r),i.addEventListener(`error`,r),a?a.parentNode.insertBefore(i,a.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(i,e.firstChild)),t.state.loading|=4}}var sh={$$typeof:de,Provider:null,Consumer:null,_currentValue:Ee,_currentValue2:Ee,_threadCount:0};function ch(e,t,n,r,i,a,o,s,c){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=St(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=St(0),this.hiddenUpdates=St(null),this.identifierPrefix=r,this.onUncaughtError=i,this.onCaughtError=a,this.onRecoverableError=o,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=c,this.transitionTypes=null,this.incompleteTransitions=new Map}function lh(e,t,n,r,i,a,o,s,c,l,u,d){return e=new ch(e,t,n,o,c,l,u,d,s),t=1,!0===a&&(t|=24),a=Bi(3,null,null,t),e.current=a,a.stateNode=e,t=Ra(),t.refCount++,e.pooledCache=t,t.refCount++,a.memoizedState={element:r,isDehydrated:n,cache:t},xo(a),e}function uh(e){return e?(e=Ri,e):Ri}function dh(e,t,n,r,i,a){i=uh(i),r.context===null?r.context=i:r.pendingContext=i,r=Co(t),r.payload={element:n},a=a===void 0?null:a,a!==null&&(r.callback=a),n=wo(e,r,t),n!==null&&(Pd(n,e,t),To(n,e,t))}function fh(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function ph(e,t){fh(e,t),(e=e.alternate)&&fh(e,t)}function mh(e){if(e.tag===13||e.tag===31){var t=Fi(e,67108864);t!==null&&Pd(t,e,67108864),ph(e,67108864)}}function hh(e){if(e.tag===13||e.tag===31){var t=jd();t=Ot(t);var n=Fi(e,t);n!==null&&Pd(n,e,t),ph(e,t)}}var gh=!0;function _h(e,t,n,r){var i=T.T;T.T=null;var a=E.p;try{E.p=2,yh(e,t,n,r)}finally{E.p=a,T.T=i}}function vh(e,t,n,r){var i=T.T;T.T=null;var a=E.p;try{E.p=8,yh(e,t,n,r)}finally{E.p=a,T.T=i}}function yh(e,t,n,r){if(gh){var i=bh(r);if(i===null)Kf(e,t,r,xh,n),Mh(e,r);else if(Ph(i,e,t,n,r))r.stopPropagation();else if(Mh(e,r),t&4&&-1<jh.indexOf(e)){for(;i!==null;){var a=Ut(i);if(a!==null)switch(a.tag){case 3:if(a=a.stateNode,a.current.memoizedState.isDehydrated){var o=gt(a.pendingLanes);if(o!==0){var s=a;for(s.pendingLanes|=2,s.entangledLanes|=2;o;){var c=1<<31-lt(o);s.entanglements[1]|=c,o&=~c}Ef(a),!(W&6)&&(_d=Ze()+500,Df(0,!1))}}break;case 31:case 13:s=Fi(a,2),s!==null&&Pd(s,a,2),zd(),ph(a,2)}if(a=bh(r),a===null&&Kf(e,t,r,xh,n),a===i)break;i=a}i!==null&&r.stopPropagation()}else Kf(e,t,r,null,n)}}function bh(e){return e=On(e),Sh(e)}var xh=null;function Sh(e){if(xh=null,e=Ht(e),e!==null){var t=o(e);if(t===null)e=null;else{var n=t.tag;if(n===13){if(e=s(t),e!==null)return e;e=null}else if(n===31){if(e=c(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null)}}return xh=e,null}function Ch(e){switch(e){case`beforetoggle`:case`cancel`:case`click`:case`close`:case`contextmenu`:case`copy`:case`cut`:case`auxclick`:case`dblclick`:case`dragend`:case`dragstart`:case`drop`:case`focusin`:case`focusout`:case`input`:case`invalid`:case`keydown`:case`keypress`:case`keyup`:case`mousedown`:case`mouseup`:case`paste`:case`pause`:case`play`:case`pointercancel`:case`pointerdown`:case`pointerup`:case`ratechange`:case`reset`:case`seeked`:case`submit`:case`toggle`:case`touchcancel`:case`touchend`:case`touchstart`:case`volumechange`:case`change`:case`selectionchange`:case`textInput`:case`compositionstart`:case`compositionend`:case`compositionupdate`:case`beforeblur`:case`afterblur`:case`beforeinput`:case`blur`:case`fullscreenchange`:case`fullscreenerror`:case`focus`:case`hashchange`:case`popstate`:case`select`:case`selectstart`:return 2;case`drag`:case`dragenter`:case`dragexit`:case`dragleave`:case`dragover`:case`mousemove`:case`mouseout`:case`mouseover`:case`pointermove`:case`pointerout`:case`pointerover`:case`resize`:case`scroll`:case`touchmove`:case`wheel`:case`mouseenter`:case`mouseleave`:case`pointerenter`:case`pointerleave`:return 8;case`message`:switch(Qe()){case $e:return 2;case et:return 8;case tt:case nt:return 32;case rt:return 268435456;default:return 32}default:return 32}}var wh=!1,Th=null,Eh=null,Dh=null,Oh=new Map,kh=new Map,Ah=[],jh=`mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset`.split(` `);function Mh(e,t){switch(e){case`focusin`:case`focusout`:Th=null;break;case`dragenter`:case`dragleave`:Eh=null;break;case`mouseover`:case`mouseout`:Dh=null;break;case`pointerover`:case`pointerout`:Oh.delete(t.pointerId);break;case`gotpointercapture`:case`lostpointercapture`:kh.delete(t.pointerId)}}function Nh(e,t,n,r,i,a){return e===null||e.nativeEvent!==a?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:a,targetContainers:[i]},t!==null&&(t=Ut(t),t!==null&&mh(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,i!==null&&t.indexOf(i)===-1&&t.push(i),e)}function Ph(e,t,n,r,i){switch(t){case`focusin`:return Th=Nh(Th,e,t,n,r,i),!0;case`dragenter`:return Eh=Nh(Eh,e,t,n,r,i),!0;case`mouseover`:return Dh=Nh(Dh,e,t,n,r,i),!0;case`pointerover`:var a=i.pointerId;return Oh.set(a,Nh(Oh.get(a)||null,e,t,n,r,i)),!0;case`gotpointercapture`:return a=i.pointerId,kh.set(a,Nh(kh.get(a)||null,e,t,n,r,i)),!0}return!1}function Fh(e){var t=Ht(e.target);if(t!==null){var n=o(t);if(n!==null){if(t=n.tag,t===13){if(t=s(n),t!==null){e.blockedOn=t,jt(e.priority,function(){hh(n)});return}}else if(t===31){if(t=c(n),t!==null){e.blockedOn=t,jt(e.priority,function(){hh(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Ih(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=bh(e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);Dn=r,n.target.dispatchEvent(r),Dn=null}else return t=Ut(n),t!==null&&mh(t),e.blockedOn=n,!1;t.shift()}return!0}function Lh(e,t,n){Ih(e)&&n.delete(t)}function Rh(){wh=!1,Th!==null&&Ih(Th)&&(Th=null),Eh!==null&&Ih(Eh)&&(Eh=null),Dh!==null&&Ih(Dh)&&(Dh=null),Oh.forEach(Lh),kh.forEach(Lh)}function zh(e,n){e.blockedOn===n&&(e.blockedOn=null,wh||(wh=!0,t.unstable_scheduleCallback(t.unstable_NormalPriority,Rh)))}var Bh=null;function Vh(e){Bh!==e&&(Bh=e,t.unstable_scheduleCallback(t.unstable_NormalPriority,function(){Bh===e&&(Bh=null);for(var t=0;t<e.length;t+=3){var n=e[t],r=e[t+1],i=e[t+2];if(typeof r!=`function`){if(Sh(r||n)===null)continue;break}var a=Ut(n);a!==null&&(e.splice(t,3),t-=3,ic(a,{pending:!0,data:i,method:n.method,action:r},r,i))}}))}function Hh(e){function t(t){return zh(t,e)}Th!==null&&zh(Th,e),Eh!==null&&zh(Eh,e),Dh!==null&&zh(Dh,e),Oh.forEach(t),kh.forEach(t);for(var n=0;n<Ah.length;n++){var r=Ah[n];r.blockedOn===e&&(r.blockedOn=null)}for(;0<Ah.length&&(n=Ah[0],n.blockedOn===null);)Fh(n),n.blockedOn===null&&Ah.shift();if(n=(e.ownerDocument||e).$$reactFormReplay,n!=null)for(r=0;r<n.length;r+=3){var i=n[r],a=n[r+1],o=i[Nt]||null;if(typeof a==`function`)o||Vh(n);else if(o){var s=null;if(a&&a.hasAttribute(`formAction`)){if(i=a,o=a[Nt]||null)s=o.formAction;else if(Sh(i)!==null)continue}else s=o.action;typeof s==`function`?n[r+1]=s:(n.splice(r,3),r-=3),Vh(n)}}}function Uh(){function e(e){e.canIntercept&&e.info===`react-transition`&&e.intercept({handler:function(){return new Promise(function(e){return i=e})},focusReset:`manual`,scroll:`manual`})}function t(){i!==null&&(i(),i=null),r||setTimeout(n,20)}function n(){if(!r&&!navigation.transition){var e=navigation.currentEntry;e&&e.url!=null&&navigation.navigate(e.url,{state:e.getState(),info:`react-transition`,history:`replace`})}}if(typeof navigation==`object`){var r=!1,i=null;return navigation.addEventListener(`navigate`,e),navigation.addEventListener(`navigatesuccess`,t),navigation.addEventListener(`navigateerror`,t),setTimeout(n,100),function(){r=!0,navigation.removeEventListener(`navigate`,e),navigation.removeEventListener(`navigatesuccess`,t),navigation.removeEventListener(`navigateerror`,t),i!==null&&(i(),i=null)}}}function Wh(e){this._internalRoot=e}Gh.prototype.render=Wh.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(i(409));var n=t.current;dh(n,jd(),e,t,null,null)},Gh.prototype.unmount=Wh.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;dh(e.current,2,null,e,null,null),zd(),t[Pt]=null}};function Gh(e){this._internalRoot=e}Gh.prototype.unstable_scheduleHydration=function(e){if(e){var t=At();e={blockedOn:null,target:e,priority:t};for(var n=0;n<Ah.length&&t!==0&&t<Ah[n].priority;n++);Ah.splice(n,0,e),n===0&&Fh(e)}};var Kh=n.version;if(Kh!==`19.3.1`)throw Error(i(527,Kh,`19.3.1`));E.findDOMNode=function(e){var t=e._reactInternals;if(t===void 0)throw typeof e.render==`function`?Error(i(188)):(e=Object.keys(e).join(`,`),Error(i(268,e)));return e=d(t),e=e===null?null:p(e),e=e===null?null:e.stateNode,e};var qh={bundleType:0,version:`19.3.1`,rendererPackageName:`react-dom`,currentDispatcherRef:T,reconcilerVersion:`19.3.1`};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<`u`){var Jh=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Jh.isDisabled&&Jh.supportsFiber)try{ot=Jh.inject(qh),st=Jh}catch{}}e.createRoot=function(e,t){if(!a(e))throw Error(i(299));var n=!1,r=``,o=Dc,s=Oc,c=kc;return t!=null&&(!0===t.unstable_strictMode&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onUncaughtError!==void 0&&(o=t.onUncaughtError),t.onCaughtError!==void 0&&(s=t.onCaughtError),t.onRecoverableError!==void 0&&(c=t.onRecoverableError)),t=lh(e,1,!1,null,null,n,r,null,o,s,c,Uh),e[Pt]=t.current,Wf(e),new Wh(t)}})),g=o(((e,t)=>{function n(){if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<`u`&&typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE==`function`)try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(e){console.error(e)}}n(),t.exports=h()})),_=e=>e.replace(/([a-z0-9])([A-Z])/g,`$1-$2`).toLowerCase(),v=e=>e.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,t,n)=>n?n.toUpperCase():t.toLowerCase()),y=e=>{let t=v(e);return t.charAt(0).toUpperCase()+t.slice(1)},b=(...e)=>e.filter((e,t,n)=>!!e&&e.trim()!==``&&n.indexOf(e)===t).join(` `).trim(),ee=e=>{for(let t in e)if(t.startsWith(`aria-`)||t===`role`||t===`title`)return!0},te={xmlns:`http://www.w3.org/2000/svg`,width:24,height:24,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:2,strokeLinecap:`round`,strokeLinejoin:`round`},x=c(f()),ne=(0,x.forwardRef)(({color:e=`currentColor`,size:t=24,strokeWidth:n=2,absoluteStrokeWidth:r,className:i=``,children:a,iconNode:o,...s},c)=>(0,x.createElement)(`svg`,{ref:c,...te,width:t,height:t,stroke:e,strokeWidth:r?Number(n)*24/Number(t):n,className:b(`lucide`,i),...!a&&!ee(s)&&{"aria-hidden":`true`},...s},[...o.map(([e,t])=>(0,x.createElement)(e,t)),...Array.isArray(a)?a:[a]])),S=(e,t)=>{let n=(0,x.forwardRef)(({className:n,...r},i)=>(0,x.createElement)(ne,{ref:i,iconNode:t,className:b(`lucide-${_(y(e))}`,`lucide-${e}`,n),...r}));return n.displayName=y(e),n},re=S(`circle-check`,[[`circle`,{cx:`12`,cy:`12`,r:`10`,key:`1mglay`}],[`path`,{d:`m9 12 2 2 4-4`,key:`dzmm74`}]]),C=S(`circle-question-mark`,[[`circle`,{cx:`12`,cy:`12`,r:`10`,key:`1mglay`}],[`path`,{d:`M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3`,key:`1u773s`}],[`path`,{d:`M12 17h.01`,key:`p32p05`}]]),ie=S(`circle-x`,[[`circle`,{cx:`12`,cy:`12`,r:`10`,key:`1mglay`}],[`path`,{d:`m15 9-6 6`,key:`1uzhvr`}],[`path`,{d:`m9 9 6 6`,key:`z0biqf`}]]),ae=S(`compass`,[[`path`,{d:`m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z`,key:`9ktpf1`}],[`circle`,{cx:`12`,cy:`12`,r:`10`,key:`1mglay`}]]),oe=S(`refresh-cw`,[[`path`,{d:`M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8`,key:`v9h5vc`}],[`path`,{d:`M21 3v5h-5`,key:`1q7to0`}],[`path`,{d:`M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16`,key:`3uifl3`}],[`path`,{d:`M8 16H3v5`,key:`1cv678`}]]),se=S(`rotate-ccw`,[[`path`,{d:`M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8`,key:`1357e3`}],[`path`,{d:`M3 3v5h5`,key:`1xhq8a`}]]),ce=S(`triangle-alert`,[[`path`,{d:`m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3`,key:`wmoenq`}],[`path`,{d:`M12 9v4`,key:`juzpu7`}],[`path`,{d:`M12 17h.01`,key:`p32p05`}]]),le=S(`x`,[[`path`,{d:`M18 6 6 18`,key:`1bl5f8`}],[`path`,{d:`m6 6 12 12`,key:`d8bk6v`}]]),ue=g(),de=[{slug:`drive-mad`,title:`Drive Mad`,category:`Racing`,url:`https://cdn.jsdelivr.net/gh/selenite-cc/selenite-old@main/drivemad/index.html`},{slug:`geometry-dash`,title:`Geometry Dash`,category:`Rhythm`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/868-F3.html`},{slug:`buckshot-roulette`,title:`Buckshot Roulette`,category:`Horror`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/205-fix2.html`},{slug:`stick-war-legacy`,title:`Stick War Legacy`,category:`Strategy`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/666-fix2.html`},{slug:`crazy-cattle-3d`,title:`Crazy Cattle 3D`,category:`Action`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/164-fix3.html`},{slug:`ovo`,title:`OvO`,category:`Platformer`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/1-fix2.html`},{slug:`ovo-2`,title:`OvO 2`,category:`Platformer`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/2-fix3.html`},{slug:`ovo-dimensions`,title:`OvO Dimensions`,category:`Platformer`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/3-fix3.html`},{slug:`slope`,title:`Slope`,category:`Arcade`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/198-fix2.html`},{slug:`slope-2`,title:`Slope 2`,category:`Arcade`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/368-fix.html`},{slug:`slope-3`,title:`Slope 3`,category:`Arcade`,url:`https://cdn.jsdelivr.net/gh/selenite-cc/selenite-old@main/slope3/index.html`},{slug:`1v1-lol`,title:`1v1.LOL`,category:`Action`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/58-fix2.html`},{slug:`retro-bowl`,title:`Retro Bowl`,category:`Sports`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/33-fix2.html`},{slug:`retro-bowl-college`,title:`Retro Bowl College`,category:`Sports`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/34-fix2.html`},{slug:`bitlife`,title:`BitLife`,category:`Simulation`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/70-fix2.html`},{slug:`minecraft-1-5-2`,title:`Minecraft 1.5.2`,category:`Sandbox`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/297-f.html`},{slug:`minecraft-1-8-8`,title:`Minecraft 1.8.8`,category:`Sandbox`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/181-f.html`},{slug:`minecraft-1-12-2`,title:`Minecraft 1.12.2`,category:`Sandbox`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/182-f.html`},{slug:`terraria`,title:`Terraria`,category:`Sandbox`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/669-fix.html`},{slug:`hollow-knight`,title:`Hollow Knight`,category:`Action`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/468-fix2.html`},{slug:`undertale`,title:`Undertale`,category:`RPG`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/456-fix2.html`},{slug:`deltarune`,title:`Deltarune`,category:`RPG`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/864-fix.html`},{slug:`cuphead`,title:`Cuphead`,category:`Action`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/465-fix2.html`},{slug:`ultrakill`,title:`Ultrakill`,category:`Action`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/196-fix2.html`},{slug:`people-playground`,title:`People Playground`,category:`Sandbox`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/194-fix2.html`},{slug:`webfishing`,title:`Webfishing`,category:`Simulation`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/423-fix2.html`},{slug:`speedstars`,title:`Speed Stars`,category:`Sports`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/266-fix2.html`},{slug:`karlson`,title:`Karlson`,category:`Action`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/542-fix2.html`},{slug:`milkman-karlson`,title:`Milkman Karlson`,category:`Action`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/542-fix2.html`},{slug:`bad-time-simulator`,title:`Bad Time Simulator`,category:`RPG`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/472-fix2.html`},{slug:`fnaf-1`,title:`FNAF 1`,category:`Horror`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/38-fix2.html`},{slug:`fnaf-2`,title:`FNAF 2`,category:`Horror`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/39-fix2.html`},{slug:`fnaf-3`,title:`FNAF 3`,category:`Horror`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/40-fix2.html`},{slug:`fnaf-4`,title:`FNAF 4`,category:`Horror`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/41-fix2.html`},{slug:`fnaf-sister-location`,title:`FNAF Sister Location`,category:`Horror`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/185-fix2.html`},{slug:`fnaf-pizzeria-simulator`,title:`FNAF Pizzeria Simulator`,category:`Horror`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/191-fix2.html`},{slug:`fnaf-ucn`,title:`FNAF UCN`,category:`Horror`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/192-fix2.html`},{slug:`fnaf-world`,title:`FNAF World`,category:`Horror`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/190-fix2.html`},{slug:`baldis-basics`,title:`Baldi's Basics`,category:`Horror`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/65-fix2.html`},{slug:`baldis-basics-plus`,title:`Baldi's Basics Plus`,category:`Horror`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/467-fix2.html`},{slug:`bendy-and-the-ink-machine`,title:`Bendy and the Ink Machine`,category:`Horror`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/215-fix2.html`},{slug:`amanda-the-adventurer`,title:`Amanda the Adventurer`,category:`Horror`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/450-fix2.html`},{slug:`thats-not-my-neighbor`,title:`That's Not My Neighbor`,category:`Horror`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/216-fix2.html`},{slug:`bad-parenting`,title:`Bad Parenting`,category:`Horror`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/166-fix2.html`},{slug:`class-of-09`,title:`Class of '09`,category:`Story`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/259-fix2.html`},{slug:`doki-doki-literature-club`,title:`Doki Doki Literature Club`,category:`Story`,url:`https://cdn.jsdelivr.net/gh/Soleil-des-chats/ddlc-web-optimised@master/index.html`},{slug:`granny`,title:`Granny`,category:`Horror`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/90-fix3.html`},{slug:`granny-2`,title:`Granny 2`,category:`Horror`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/125-fix2.html`},{slug:`granny-3`,title:`Granny 3`,category:`Horror`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/852.html`},{slug:`backrooms`,title:`Backrooms`,category:`Horror`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/64-fix4.html`},{slug:`slender`,title:`Slender: The 8 Pages`,category:`Horror`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/451-fix2.html`},{slug:`eyes-the-horror-game`,title:`Eyes: The Horror Game`,category:`Horror`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/451-fix2.html`},{slug:`poppy-playtime`,title:`Poppy Playtime`,category:`Horror`,url:`https://cdn.jsdelivr.net/gh/ahrdevelopers/poppy-playtime@main/index.html`},{slug:`garten-of-banban`,title:`Garten of Banban`,category:`Horror`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/878-f.html`},{slug:`half-life`,title:`Half-Life`,category:`Action`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/262-fix.html`},{slug:`quake-3`,title:`Quake 3 Arena`,category:`Action`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/263-fix3.html`},{slug:`doom`,title:`DOOM`,category:`Action`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/203-fix2.html`},{slug:`doom-2`,title:`DOOM 2`,category:`Action`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/602-fix.html`},{slug:`wolfenstein-3d`,title:`Wolfenstein 3D`,category:`Action`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/874.html`},{slug:`superhot`,title:`SUPERHOT`,category:`Action`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/233-fix.html`},{slug:`time-shooter-2`,title:`Time Shooter 2`,category:`Action`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/200-fix.html`},{slug:`time-shooter-3`,title:`Time Shooter 3`,category:`Action`,url:`https://cdn.jsdelivr.net/gh/selenite-cc/selenite-old@main/timeshooter3/index.html`},{slug:`funny-shooter-2`,title:`Funny Shooter 2`,category:`Action`,url:`https://cdn.jsdelivr.net/gh/selenite-cc/selenite-old@main/funnyshooter2/index.html`},{slug:`pixel-gun-3d`,title:`Pixel Gun 3D`,category:`Action`,url:`https://cdn.jsdelivr.net/gh/ahrdevelopers/pixel-gun-3d@main/index.html`},{slug:`krunker`,title:`Krunker`,category:`Action`,url:`https://cdn.jsdelivr.net/gh/ahrdevelopers/krunker@main/index.html`},{slug:`shell-shockers`,title:`Shell Shockers`,category:`Action`,url:`https://cdn.jsdelivr.net/gh/ahrdevelopers/shell-shockers@main/index.html`},{slug:`getaway-shootout`,title:`Getaway Shootout`,category:`Action`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/338-fix2.html`},{slug:`rooftop-snipers`,title:`Rooftop Snipers`,category:`Action`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/283-fix2.html`},{slug:`rooftop-snipers-2`,title:`Rooftop Snipers 2`,category:`Action`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/490-fix.html`},{slug:`tube-jumpers`,title:`Tube Jumpers`,category:`Action`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/111-fix2.html`},{slug:`gun-mayhem`,title:`Gun Mayhem`,category:`Action`,url:`https://cdn.jsdelivr.net/gh/selenite-cc/selenite-old@main/gunmayhem/index.html`},{slug:`gun-mayhem-2`,title:`Gun Mayhem 2`,category:`Action`,url:`https://cdn.jsdelivr.net/gh/selenite-cc/selenite-old@main/gunmayhem2/index.html`},{slug:`gun-mayhem-redux`,title:`Gun Mayhem Redux`,category:`Action`,url:`https://cdn.jsdelivr.net/gh/selenite-cc/selenite-old@main/gunmayhemredux/index.html`},{slug:`strike-force-heroes`,title:`Strike Force Heroes`,category:`Action`,url:`https://cdn.jsdelivr.net/gh/ahrdevelopers/strike-force-heroes@main/index.html`},{slug:`strike-force-heroes-2`,title:`Strike Force Heroes 2`,category:`Action`,url:`https://cdn.jsdelivr.net/gh/ahrdevelopers/strike-force-heroes-2@main/index.html`},{slug:`strike-force-heroes-3`,title:`Strike Force Heroes 3`,category:`Action`,url:`https://cdn.jsdelivr.net/gh/ahrdevelopers/strike-force-heroes-3@main/index.html`},{slug:`raze`,title:`Raze`,category:`Action`,url:`https://cdn.jsdelivr.net/gh/ahrdevelopers/raze-3@main/index.html`},{slug:`raze-2`,title:`Raze 2`,category:`Action`,url:`https://cdn.jsdelivr.net/gh/ahrdevelopers/raze-3@main/index.html`},{slug:`raze-3`,title:`Raze 3`,category:`Action`,url:`https://cdn.jsdelivr.net/gh/ahrdevelopers/raze-3@main/index.html`},{slug:`hill-climb-racing`,title:`Hill Climb Racing`,category:`Racing`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/157-fix2.html`},{slug:`hill-climb-racing-2`,title:`Hill Climb Racing 2`,category:`Racing`,url:`https://cdn.jsdelivr.net/gh/ahrdevelopers/hill-climb-racing-2@main/index.html`},{slug:`moto-x3m`,title:`Moto X3M`,category:`Racing`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/96-fix.html`},{slug:`moto-x3m-2`,title:`Moto X3M 2`,category:`Racing`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/97-fix2.html`},{slug:`moto-x3m-3`,title:`Moto X3M 3`,category:`Racing`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/98-fix2.html`},{slug:`moto-x3m-winter`,title:`Moto X3M Winter`,category:`Racing`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/100-fix2.html`},{slug:`moto-x3m-pool-party`,title:`Moto X3M Pool Party`,category:`Racing`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/124-fix.html`},{slug:`moto-x3m-spooky-land`,title:`Moto X3M Spooky Land`,category:`Racing`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/99-fix.html`},{slug:`drift-hunters`,title:`Drift Hunters`,category:`Racing`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/173-fix2.html`},{slug:`drift-boss`,title:`Drift Boss`,category:`Racing`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/276-fix2.html`},{slug:`madalin-stunt-cars-2`,title:`Madalin Stunt Cars 2`,category:`Racing`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/278-fix.html`},{slug:`madalin-stunt-cars-3`,title:`Madalin Stunt Cars 3`,category:`Racing`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/279-fix.html`},{slug:`polytrack`,title:`PolyTrack`,category:`Racing`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/123-fix2.html`},{slug:`egg-car`,title:`Eggy Car`,category:`Racing`,url:`https://cdn.jsdelivr.net/gh/ubg98/EggyCar@gh-pages/index.html`},{slug:`earn-to-die`,title:`Earn to Die`,category:`Racing`,url:`https://cdn.jsdelivr.net/gh/hilfig3r/EarnToDie@main/index.html`},{slug:`earn-to-die-2`,title:`Earn to Die 2`,category:`Racing`,url:`https://cdn.jsdelivr.net/gh/gamebackup/earntodie2@main/index.html`},{slug:`earn-to-die-2012`,title:`Earn to Die 2012`,category:`Racing`,url:`https://cdn.jsdelivr.net/gh/ahrdevelopers/earn-to-die@main/index.html`},{slug:`jelly-truck`,title:`Jelly Truck`,category:`Racing`,url:`https://cdn.jsdelivr.net/gh/ahrdevelopers/jellytruck@main/index.html`},{slug:`happy-wheels`,title:`Happy Wheels`,category:`Arcade`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/624-fix.html`},{slug:`cluster-rush`,title:`Cluster Rush`,category:`Action`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/81-fix.html`},{slug:`subway-surfers`,title:`Subway Surfers`,category:`Arcade`,url:`https://cdn.jsdelivr.net/gh/ubg98/SubwaySurfers@gh-pages/index.html`},{slug:`temple-run-2`,title:`Temple Run 2`,category:`Arcade`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/10-fix2.html`},{slug:`crossy-road`,title:`Crossy Road`,category:`Arcade`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/24-fix2.html`},{slug:`jetpack-joyride`,title:`Jetpack Joyride`,category:`Arcade`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/7-fix3.html`},{slug:`fruit-ninja`,title:`Fruit Ninja`,category:`Arcade`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/261-fix.html`},{slug:`angry-birds`,title:`Angry Birds`,category:`Puzzle`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/63-fix2.html`},{slug:`angry-birds-rio`,title:`Angry Birds Rio`,category:`Puzzle`,url:`https://cdn.jsdelivr.net/gh/gamebackup/angrybirdsrio@main/index.html`},{slug:`angry-birds-space`,title:`Angry Birds Space`,category:`Puzzle`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/147-fix2.html`},{slug:`bad-piggies`,title:`Bad Piggies`,category:`Puzzle`,url:`https://cdn.jsdelivr.net/gh/gamebackup/badpiggies@main/index.html`},{slug:`cut-the-rope`,title:`Cut the Rope`,category:`Puzzle`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/85-fix2.html`},{slug:`cut-the-rope-time-travel`,title:`Cut the Rope: Time Travel`,category:`Puzzle`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/213-fix2.html`},{slug:`doodle-jump`,title:`Doodle Jump`,category:`Arcade`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/470-fix.html`},{slug:`flappy-bird`,title:`Flappy Bird`,category:`Arcade`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/129-fix.html`},{slug:`flappy-dunk`,title:`Flappy Dunk`,category:`Sports`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/153-fix2.html`},{slug:`magic-tiles-3`,title:`Magic Tiles 3`,category:`Rhythm`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/17-fix2.html`},{slug:`geometry-dash-lite`,title:`Geometry Dash Lite`,category:`Rhythm`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/27-fix2.html`},{slug:`geometry-dash-subzero`,title:`Geometry Dash SubZero`,category:`Rhythm`,url:`https://cdn.jsdelivr.net/gh/ahrdevelopers/geometry-dash-subzero@main/index.html`},{slug:`geometry-dash-meltdown`,title:`Geometry Dash Meltdown`,category:`Rhythm`,url:`https://cdn.jsdelivr.net/gh/ahrdevelopers/geometry-dash-meltdown@main/index.html`},{slug:`geometry-dash-world`,title:`Geometry Dash World`,category:`Rhythm`,url:`https://cdn.jsdelivr.net/gh/ahrdevelopers/geometry-dash-world@main/index.html`},{slug:`worlds-hardest-game`,title:`World's Hardest Game`,category:`Arcade`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/103-fix2.html`},{slug:`worlds-hardest-game-2`,title:`World's Hardest Game 2`,category:`Arcade`,url:`https://cdn.jsdelivr.net/gh/selenite-cc/selenite-old@main/worldhardestgame2/index.html`},{slug:`worlds-hardest-game-3`,title:`World's Hardest Game 3`,category:`Arcade`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/104-fix2.html`},{slug:`tomb-of-the-mask`,title:`Tomb of the Mask`,category:`Arcade`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/109-fix.html`},{slug:`paper-io-2`,title:`Paper.io 2`,category:`Arcade`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/102-fix.html`},{slug:`hole-io`,title:`Hole.io`,category:`Arcade`,url:`https://cdn.jsdelivr.net/gh/selenite-cc/selenite-old@main/holeio/index.html`},{slug:`plants-vs-zombies`,title:`Plants vs Zombies`,category:`Strategy`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/232-fix2.html`},{slug:`bloons-td`,title:`Bloons TD`,category:`Strategy`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/71-fix2.html`},{slug:`bloons-td-2`,title:`Bloons TD 2`,category:`Strategy`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/72-fix.html`},{slug:`bloons-td-3`,title:`Bloons TD 3`,category:`Strategy`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/73-fix2.html`},{slug:`bloons-td-4`,title:`Bloons TD 4`,category:`Strategy`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/74-fix.html`},{slug:`bloons-td-5`,title:`Bloons TD 5`,category:`Strategy`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/75-fix3.html`},{slug:`bloons-td-6`,title:`Bloons TD 6`,category:`Strategy`,url:`https://cdn.jsdelivr.net/gh/selenite-cc/selenite-old@main/btd6/index.html`},{slug:`bloons-td-battles`,title:`Bloons TD Battles`,category:`Strategy`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/75-fix3.html`},{slug:`kingdom-rush`,title:`Kingdom Rush`,category:`Strategy`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/661-fix2.html`},{slug:`kingdom-rush-frontiers`,title:`Kingdom Rush Frontiers`,category:`Strategy`,url:`https://cdn.jsdelivr.net/gh/ahrdevelopers/kingdom-rush-frontiers@main/index.html`},{slug:`kingdom-rush-origins`,title:`Kingdom Rush Origins`,category:`Strategy`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/661-fix2.html`},{slug:`age-of-war`,title:`Age of War`,category:`Strategy`,url:`https://cdn.jsdelivr.net/gh/selenite-cc/selenite-old@main/ageofwar/index.html`},{slug:`age-of-war-2`,title:`Age of War 2`,category:`Strategy`,url:`https://cdn.jsdelivr.net/gh/gamebackup/ageofwar2@main/index.html`},{slug:`stick-war`,title:`Stick War`,category:`Strategy`,url:`https://cdn.jsdelivr.net/gh/ahrdevelopers/stick-war@main/index.html`},{slug:`stick-war-2`,title:`Stick War 2`,category:`Strategy`,url:`https://cdn.jsdelivr.net/gh/ahrdevelopers/stick-war@main/index.html`},{slug:`battle-cats`,title:`Battle Cats`,category:`Strategy`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/537-fix.html`},{slug:`bad-ice-cream`,title:`Bad Ice Cream`,category:`Puzzle`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/269-fix2.html`},{slug:`bad-ice-cream-2`,title:`Bad Ice Cream 2`,category:`Puzzle`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/270-fix2.html`},{slug:`bad-ice-cream-3`,title:`Bad Ice Cream 3`,category:`Puzzle`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/271-fix2.html`},{slug:`territorial-io`,title:`Territorial.io`,category:`Strategy`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/303-fix2.html`},{slug:`run`,title:`Run`,category:`Platformer`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/175-fix.html`},{slug:`run-2`,title:`Run 2`,category:`Platformer`,url:`https://cdn.jsdelivr.net/gh/selenite-cc/selenite-old@main/run2/index.html`},{slug:`run-3`,title:`Run 3`,category:`Platformer`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/177-fix.html`},{slug:`fireboy-and-watergirl`,title:`Fireboy and Watergirl`,category:`Puzzle`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/88-fix.html`},{slug:`fireboy-and-watergirl-2`,title:`Fireboy and Watergirl 2`,category:`Puzzle`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/88-fix.html`},{slug:`fireboy-and-watergirl-3`,title:`Fireboy and Watergirl 3`,category:`Puzzle`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/89-fix.html`},{slug:`fireboy-and-watergirl-4`,title:`Fireboy and Watergirl 4`,category:`Puzzle`,url:`https://cdn.jsdelivr.net/gh/selenite-cc/selenite-old@main/fireboywatergirl4/index.html`},{slug:`red-ball-4`,title:`Red Ball 4`,category:`Platformer`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/242-fix2.html`},{slug:`snail-bob`,title:`Snail Bob`,category:`Puzzle`,url:`https://cdn.jsdelivr.net/gh/ubg98/SnailBob@gh-pages/index.html`},{slug:`snail-bob-2`,title:`Snail Bob 2`,category:`Puzzle`,url:`https://cdn.jsdelivr.net/gh/ubg98/SnailBob2@gh-pages/index.html`},{slug:`bob-the-robber`,title:`Bob the Robber`,category:`Puzzle`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/76-fix3.html`},{slug:`bob-the-robber-2`,title:`Bob the Robber 2`,category:`Puzzle`,url:`https://cdn.jsdelivr.net/gh/selenite-cc/selenite-old@main/bobtherobber2/index.html`},{slug:`fancy-pants`,title:`Fancy Pants`,category:`Platformer`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/333-fix2.html`},{slug:`fancy-pants-2`,title:`Fancy Pants 2`,category:`Platformer`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/334-fix.html`},{slug:`fancy-pants-3`,title:`Fancy Pants 3`,category:`Platformer`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/335-fix.html`},{slug:`vex-3`,title:`Vex 3`,category:`Platformer`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/47-fix2.html`},{slug:`vex-4`,title:`Vex 4`,category:`Platformer`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/49-fix2.html`},{slug:`vex-5`,title:`Vex 5`,category:`Platformer`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/50-fix2.html`},{slug:`vex-6`,title:`Vex 6`,category:`Platformer`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/51-fix2.html`},{slug:`vex-7`,title:`Vex 7`,category:`Platformer`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/52-fix2.html`},{slug:`vex-8`,title:`Vex 8`,category:`Platformer`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/53-fix2.html`},{slug:`johnny-upgrade`,title:`Johnny Upgrade`,category:`Platformer`,url:`https://cdn.jsdelivr.net/gh/ahrdevelopers/johnnyupgrade@main/index.html`},{slug:`super-mario-63`,title:`Super Mario 63`,category:`Platformer`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/314-fix2.html`},{slug:`super-mario-flash`,title:`Super Mario Flash`,category:`Platformer`,url:`https://cdn.jsdelivr.net/gh/ahrdevelopers/super-mario-flash@main/index.html`},{slug:`sonic-flash`,title:`Sonic Flash`,category:`Platformer`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/590-fix3.html`},{slug:`papas-pizzeria`,title:`Papa's Pizzeria`,category:`Simulation`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/227-fix.html`},{slug:`papas-freezeria`,title:`Papa's Freezeria`,category:`Simulation`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/223-fix.html`},{slug:`papas-burgeria`,title:`Papa's Burgeria`,category:`Simulation`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/219-fix2.html`},{slug:`papas-taco-mia`,title:`Papa's Taco Mia`,category:`Simulation`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/230-fix2.html`},{slug:`papas-sushiria`,title:`Papa's Sushiria`,category:`Simulation`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/229-fix2.html`},{slug:`papas-pancakeria`,title:`Papa's Pancakeria`,category:`Simulation`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/225-fix2.html`},{slug:`papas-wingeria`,title:`Papa's Wingeria`,category:`Simulation`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/231-fix2.html`},{slug:`papas-hot-doggeria`,title:`Papa's Hot Doggeria`,category:`Simulation`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/224-fix2.html`},{slug:`papas-cupcakeria`,title:`Papa's Cupcakeria`,category:`Simulation`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/221-fix2.html`},{slug:`papas-pastaria`,title:`Papa's Pastaria`,category:`Simulation`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/226-fix2.html`},{slug:`papas-donuteria`,title:`Papa's Donuteria`,category:`Simulation`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/222-fix.html`},{slug:`papas-cheeseria`,title:`Papa's Cheeseria`,category:`Simulation`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/220-fix2.html`},{slug:`papas-bakeria`,title:`Papa's Bakeria`,category:`Simulation`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/218-fix.html`},{slug:`papas-scooperia`,title:`Papa's Scooperia`,category:`Simulation`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/228-fix2.html`},{slug:`dogeminer`,title:`DogeMiner`,category:`Simulation`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/511-fix.html`},{slug:`dogeminer-2`,title:`DogeMiner 2`,category:`Simulation`,url:`https://cdn.jsdelivr.net/gh/ahrdevelopers/dogeminer-2@main/index.html`},{slug:`cookie-clicker`,title:`Cookie Clicker`,category:`Simulation`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/82-a.html`},{slug:`idle-breakout`,title:`Idle Breakout`,category:`Simulation`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/362-fix.html`},{slug:`tiny-fishing`,title:`Tiny Fishing`,category:`Arcade`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/108-fix2.html`},{slug:`monkey-mart`,title:`Monkey Mart`,category:`Simulation`,url:`https://cdn.jsdelivr.net/gh/ahrdevelopers/monkey-mart@main/index.html`},{slug:`duck-life`,title:`Duck Life`,category:`Simulation`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/234-fix2.html`},{slug:`duck-life-2`,title:`Duck Life 2`,category:`Simulation`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/235-fix2.html`},{slug:`duck-life-3`,title:`Duck Life 3`,category:`Simulation`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/236-fix2.html`},{slug:`duck-life-4`,title:`Duck Life 4`,category:`Simulation`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/237-fix2.html`},{slug:`duck-life-treasure-hunt`,title:`Duck Life: Treasure Hunt`,category:`Simulation`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/238-fix.html`},{slug:`learn-to-fly`,title:`Learn to Fly`,category:`Arcade`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/340-fix.html`},{slug:`learn-to-fly-2`,title:`Learn to Fly 2`,category:`Arcade`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/341-fix2.html`},{slug:`learn-to-fly-3`,title:`Learn to Fly 3`,category:`Arcade`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/342-fix.html`},{slug:`learn-to-fly-idle`,title:`Learn to Fly Idle`,category:`Arcade`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/343-fix.html`},{slug:`riddle-school`,title:`Riddle School`,category:`Puzzle`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/287-fix2.html`},{slug:`riddle-school-2`,title:`Riddle School 2`,category:`Puzzle`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/288-fix2.html`},{slug:`riddle-school-3`,title:`Riddle School 3`,category:`Puzzle`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/289-fix2.html`},{slug:`riddle-school-4`,title:`Riddle School 4`,category:`Puzzle`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/290-fix2.html`},{slug:`riddle-school-5`,title:`Riddle School 5`,category:`Puzzle`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/291-fix2.html`},{slug:`riddle-transfer`,title:`Riddle Transfer`,category:`Puzzle`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/292-fix2.html`},{slug:`riddle-transfer-2`,title:`Riddle Transfer 2`,category:`Puzzle`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/293-fix2.html`},{slug:`henry-stickmin-breaking-the-bank`,title:`Breaking the Bank`,category:`Story`,url:`https://cdn.jsdelivr.net/gh/selenite-cc/selenite-old@main/breakingthebank/index.html`},{slug:`henry-stickmin-escaping-the-prison`,title:`Escaping the Prison`,category:`Story`,url:`https://cdn.jsdelivr.net/gh/selenite-cc/selenite-old@main/escapingtheprison/index.html`},{slug:`henry-stickmin-stealing-the-diamond`,title:`Stealing the Diamond`,category:`Story`,url:`https://cdn.jsdelivr.net/gh/selenite-cc/selenite-old@main/stealingthediamond/index.html`},{slug:`henry-stickmin-infiltrating-the-airship`,title:`Infiltrating the Airship`,category:`Story`,url:`https://cdn.jsdelivr.net/gh/selenite-cc/selenite-old@main/infiltratingtheairship/index.html`},{slug:`henry-stickmin-fleeing-the-complex`,title:`Fleeing the Complex`,category:`Story`,url:`https://cdn.jsdelivr.net/gh/selenite-cc/selenite-old@main/fleeingthecomplex/index.html`},{slug:`2048`,title:`2048`,category:`Puzzle`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/114-fix2.html`},{slug:`tetris`,title:`Tetris`,category:`Puzzle`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/733-fix2.html`},{slug:`minesweeper`,title:`Minesweeper`,category:`Puzzle`,url:`https://cdn.jsdelivr.net/gh/selenite-cc/selenite-old@main/minesweeper/index.html`},{slug:`solitaire`,title:`Solitaire`,category:`Puzzle`,url:`https://cdn.jsdelivr.net/gh/selenite-cc/selenite-old@main/solitaire/index.html`},{slug:`basketball-stars`,title:`Basketball Stars`,category:`Sports`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/272-ff.html`},{slug:`basketball-legends`,title:`Basketball Legends`,category:`Sports`,url:`https://cdn.jsdelivr.net/gh/ubg98/BasketballLegends2020@gh-pages/index.html`},{slug:`basket-random`,title:`Basket Random`,category:`Sports`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/66-fix2.html`},{slug:`soccer-random`,title:`Soccer Random`,category:`Sports`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/739-fix2.html`},{slug:`volley-random`,title:`Volley Random`,category:`Sports`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/786-fix2.html`},{slug:`boxing-random`,title:`Boxing Random`,category:`Sports`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/77-fix2.html`},{slug:`football-legends`,title:`Football Legends`,category:`Sports`,url:`https://cdn.jsdelivr.net/gh/ubg98/FootballLegends@gh-pages/index.html`},{slug:`moto-x3m-bike-race`,title:`Moto X3M Bike Race`,category:`Racing`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/96-fix.html`},{slug:`bowmasters`,title:`Bowmasters`,category:`Action`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/0-fix2.html`},{slug:`archery-world-tour`,title:`Archery World Tour`,category:`Sports`,url:`https://cdn.jsdelivr.net/gh/freebuisness/html@main/148-fix2.html`}],fe=[/googlesyndication\.com/i,/doubleclick\.net/i,/googleadservices\.com/i,/imasdk\.googleapis\.com/i,/googletagmanager\.com/i,/google-analytics\.com/i,/adinplay\.com/i,/gamemonetize\.com/i,/gamedistribution\.com/i,/sdk\.poki\.com/i,/poki\.com\/.*sdk/i,/crazygames\.com/i,/cpmstar\.com/i,/adnxs\.com/i,/criteo\.(com|net)/i,/pubmatic\.com/i,/taboola\.com/i,/outbrain\.com/i,/adservice\.google/i,/Jump_Gamemonetize\.js/i,/(?:^|\/)js\/all\.js(?:[?#]|$)/i],pe=[/window\.dataLayer\s*=/i,/googletagmanager\.com\/gtag/i,/adsbygoogle\s*=\s*window\.adsbygoogle/i,/googlesyndication/i,/gamemonetize\.com/i,/gamedistribution\.com/i,/google_vignette/i],me=`<style data-adblock="true">
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
<\/script>`,he=[`Dark Sleek`,`Neon Cyberpunk`,`Glassmorphism`,`Monochrome`,`Retro`,`Nature`,`Royal`],w=[{id:`midnight-oled`,name:`Midnight OLED`,category:`Dark & Neon`,bgPrimary:`#05070b`,bgSecondary:`#0b0f17`,bgCard:`#121824`,textPrimary:`#f1f5f9`,textMuted:`#8a9bb0`,accent:`#34d399`,border:`#1f2937`},{id:`cyber-neon-green`,name:`Cyber Neon Green`,category:`Dark & Neon`,bgPrimary:`#060c09`,bgSecondary:`#0a140f`,bgCard:`#101f17`,textPrimary:`#ecfdf5`,textMuted:`#78b392`,accent:`#00ff88`,border:`#1c3b2a`},{id:`dracula-purple`,name:`Dracula Purple`,category:`Dark & Neon`,bgPrimary:`#191a24`,bgSecondary:`#21222c`,bgCard:`#282a36`,textPrimary:`#f8f8f2`,textMuted:`#9aa2c4`,accent:`#bd93f9`,border:`#3e4157`},{id:`synthwave-sunset`,name:`Synthwave Sunset`,category:`Dark & Neon`,bgPrimary:`#160b24`,bgSecondary:`#1f1033`,bgCard:`#291542`,textPrimary:`#fdf2f8`,textMuted:`#c084fc`,accent:`#ff4ecd`,border:`#47216b`},{id:`crimson-red`,name:`Crimson Red`,category:`Dark & Neon`,bgPrimary:`#12080a`,bgSecondary:`#1b0c10`,bgCard:`#261116`,textPrimary:`#fef2f2`,textMuted:`#c4868e`,accent:`#f43f5e`,border:`#421c24`},{id:`electric-cobalt`,name:`Electric Cobalt`,category:`Dark & Neon`,bgPrimary:`#070d1b`,bgSecondary:`#0c152b`,bgCard:`#121f3d`,textPrimary:`#eff6ff`,textMuted:`#89a7d6`,accent:`#3b82f6`,border:`#1e3666`},{id:`emerald-matrix`,name:`Emerald Matrix`,category:`Dark & Neon`,bgPrimary:`#040e08`,bgSecondary:`#08170e`,bgCard:`#0d2215`,textPrimary:`#dcfce7`,textMuted:`#6da882`,accent:`#22c55e`,border:`#173d25`},{id:`amber-terminal`,name:`Amber Terminal`,category:`Dark & Neon`,bgPrimary:`#100c05`,bgSecondary:`#181208`,bgCard:`#221a0b`,textPrimary:`#fef3c7`,textMuted:`#b89456`,accent:`#f59e0b`,border:`#3d2e14`},{id:`neon-coral`,name:`Neon Coral`,category:`Dark & Neon`,bgPrimary:`#0b0608`,bgSecondary:`#080406`,bgCard:`#150c10`,textPrimary:`#fdf2f4`,textMuted:`#a68b94`,accent:`#ff5c7c`,border:`#2d1921`},{id:`hyper-cyan`,name:`Hyper Cyan`,category:`Dark & Neon`,bgPrimary:`#040d12`,bgSecondary:`#07151d`,bgCard:`#0c202c`,textPrimary:`#ecfeff`,textMuted:`#72a8b8`,accent:`#06b6d4`,border:`#153a4d`},{id:`plasma-magenta`,name:`Plasma Magenta`,category:`Dark & Neon`,bgPrimary:`#120514`,bgSecondary:`#1a081e`,bgCard:`#260d2c`,textPrimary:`#fdf4ff`,textMuted:`#b982c7`,accent:`#e879f9`,border:`#44184f`},{id:`obsidian-gold`,name:`Obsidian Gold`,category:`Dark & Neon`,bgPrimary:`#09090b`,bgSecondary:`#111114`,bgCard:`#19191f`,textPrimary:`#fafafa`,textMuted:`#9f9fa8`,accent:`#facc15`,border:`#2b2b35`},{id:`laser-lime`,name:`Laser Lime`,category:`Dark & Neon`,bgPrimary:`#090d04`,bgSecondary:`#0f1607`,bgCard:`#17220b`,textPrimary:`#f7fee7`,textMuted:`#8ca868`,accent:`#a3e635`,border:`#2c4014`},{id:`velvet-indigo`,name:`Velvet Indigo`,category:`Dark & Neon`,bgPrimary:`#0b0a1a`,bgSecondary:`#121029`,bgCard:`#1a1738`,textPrimary:`#eef2ff`,textMuted:`#8b8fc9`,accent:`#818cf8`,border:`#2d285e`},{id:`volcanic-ember`,name:`Volcanic Ember`,category:`Dark & Neon`,bgPrimary:`#130806`,bgSecondary:`#1c0c09`,bgCard:`#28120e`,textPrimary:`#fff7ed`,textMuted:`#bf8c7c`,accent:`#fb923c`,border:`#472019`},{id:`vaporwave-grid`,name:`Vaporwave Grid`,category:`Dark & Neon`,bgPrimary:`#100921`,bgSecondary:`#170d30`,bgCard:`#211442`,textPrimary:`#f5f3ff`,textMuted:`#9e88d4`,accent:`#22d3ee`,border:`#37236b`},{id:`euler-ruby`,name:`Arcade Ruby`,category:`Dark & Neon`,bgPrimary:`#14060b`,bgSecondary:`#1d0910`,bgCard:`#290e17`,textPrimary:`#fff1f2`,textMuted:`#c28090`,accent:`#fb7185`,border:`#471828`},{id:`ultraviolet-core`,name:`Ultraviolet Core`,category:`Dark & Neon`,bgPrimary:`#0e071a`,bgSecondary:`#150b26`,bgCard:`#1f1038`,textPrimary:`#f5f3ff`,textMuted:`#9b82cc`,accent:`#a855f7`,border:`#361c61`},{id:`arctic-neon`,name:`Arctic Neon`,category:`Dark & Neon`,bgPrimary:`#050e17`,bgSecondary:`#091624`,bgCard:`#0e2236`,textPrimary:`#f0f9ff`,textMuted:`#78a0c2`,accent:`#38bdf8`,border:`#193b5c`},{id:`phosphor-teal`,name:`Phosphor Teal`,category:`Dark & Neon`,bgPrimary:`#04100f`,bgSecondary:`#071a18`,bgCard:`#0c2624`,textPrimary:`#f0fdfa`,textMuted:`#6fa8a2`,accent:`#2dd4bf`,border:`#15423e`},{id:`solar-flare`,name:`Solar Flare`,category:`Dark & Neon`,bgPrimary:`#140b04`,bgSecondary:`#1e1006`,bgCard:`#2b1809`,textPrimary:`#fffbeb`,textMuted:`#bd9268`,accent:`#fbbf24`,border:`#4a2a10`},{id:`outrun-sky`,name:`Outrun Sky`,category:`Dark & Neon`,bgPrimary:`#0c081c`,bgSecondary:`#130c2b`,bgCard:`#1c123d`,textPrimary:`#fdf4ff`,textMuted:`#9e88c9`,accent:`#f472b6`,border:`#312066`},{id:`toxic-acid`,name:`Toxic Acid`,category:`Dark & Neon`,bgPrimary:`#080e06`,bgSecondary:`#0d170a`,bgCard:`#142410`,textPrimary:`#ecfccb`,textMuted:`#80a86e`,accent:`#84cc16`,border:`#25421d`},{id:`monokai-night`,name:`Monokai Night`,category:`Dark & Neon`,bgPrimary:`#171814`,bgSecondary:`#20211b`,bgCard:`#2a2b24`,textPrimary:`#f8f8f2`,textMuted:`#a2a392`,accent:`#a6e22e`,border:`#414338`},{id:`gruvbox-dark`,name:`Gruvbox Dark`,category:`Dark & Neon`,bgPrimary:`#1d2021`,bgSecondary:`#282828`,bgCard:`#32302f`,textPrimary:`#ebdbb2`,textMuted:`#a89984`,accent:`#fe8019`,border:`#504945`},{id:`ayu-mirage`,name:`Ayu Mirage`,category:`Dark & Neon`,bgPrimary:`#171c26`,bgSecondary:`#1f2430`,bgCard:`#272e3d`,textPrimary:`#cbccc6`,textMuted:`#8a94a6`,accent:`#ffcc66`,border:`#394359`},{id:`ayu-dark`,name:`Ayu Dark`,category:`Dark & Neon`,bgPrimary:`#0a0e14`,bgSecondary:`#10151e`,bgCard:`#171e2b`,textPrimary:`#bfbdb6`,textMuted:`#7f8999`,accent:`#ffb454`,border:`#253042`},{id:`onedark-pro`,name:`One Dark Pro`,category:`Dark & Neon`,bgPrimary:`#181a1f`,bgSecondary:`#21252b`,bgCard:`#282c34`,textPrimary:`#abb2bf`,textMuted:`#828997`,accent:`#61afef`,border:`#3b404d`},{id:`github-dark`,name:`GitHub Dimmed`,category:`Dark & Neon`,bgPrimary:`#0d1117`,bgSecondary:`#161b22`,bgCard:`#1c2128`,textPrimary:`#e6edf3`,textMuted:`#8b949e`,accent:`#58a6ff`,border:`#30363d`},{id:`night-owl`,name:`Night Owl`,category:`Dark & Neon`,bgPrimary:`#011627`,bgSecondary:`#051d33`,bgCard:`#0b2942`,textPrimary:`#d6deeb`,textMuted:`#7e97b8`,accent:`#82aaff`,border:`#1d3b53`},{id:`shades-purple`,name:`Shades of Purple`,category:`Dark & Neon`,bgPrimary:`#1a1830`,bgSecondary:`#221f3d`,bgCard:`#2d2b55`,textPrimary:`#ffffff`,textMuted:`#a599e9`,accent:`#fad000`,border:`#433f75`},{id:`cobalt-two`,name:`Cobalt Classic`,category:`Dark & Neon`,bgPrimary:`#0d2238`,bgSecondary:`#132d4a`,bgCard:`#193549`,textPrimary:`#ffffff`,textMuted:`#8fb4d4`,accent:`#ffc600`,border:`#274d69`},{id:`horizon-dark`,name:`Horizon Dusk`,category:`Dark & Neon`,bgPrimary:`#16161c`,bgSecondary:`#1c1e26`,bgCard:`#232530`,textPrimary:`#d5d8da`,textMuted:`#8f93a2`,accent:`#e95678`,border:`#343847`},{id:`kanagawa-wave`,name:`Kanagawa Wave`,category:`Dark & Neon`,bgPrimary:`#16161d`,bgSecondary:`#1f1f28`,bgCard:`#2a2a37`,textPrimary:`#dcd7ba`,textMuted:`#98937c`,accent:`#7e9cd8`,border:`#3d3d4f`},{id:`kanagawa-dragon`,name:`Kanagawa Dragon`,category:`Dark & Neon`,bgPrimary:`#12120f`,bgSecondary:`#181616`,bgCard:`#22201e`,textPrimary:`#c5c9c5`,textMuted:`#8a8980`,accent:`#c4746e`,border:`#383430`},{id:`everforest-dark`,name:`Everforest Dark`,category:`Dark & Neon`,bgPrimary:`#232a2e`,bgSecondary:`#2d353b`,bgCard:`#343f44`,textPrimary:`#d3c6aa`,textMuted:`#9da9a0`,accent:`#a7c080`,border:`#475258`},{id:`material-ocean`,name:`Material Ocean`,category:`Dark & Neon`,bgPrimary:`#090b10`,bgSecondary:`#0f111a`,bgCard:`#181b28`,textPrimary:`#eeffff`,textMuted:`#848bb0`,accent:`#82aaff`,border:`#292d42`},{id:`laser-berry`,name:`Laser Berry`,category:`Dark & Neon`,bgPrimary:`#140610`,bgSecondary:`#1e0918`,bgCard:`#290d21`,textPrimary:`#fdf2f8`,textMuted:`#bd80aa`,accent:`#f43f8e`,border:`#47183a`},{id:`quantum-blue`,name:`Quantum Blue`,category:`Dark & Neon`,bgPrimary:`#050914`,bgSecondary:`#091024`,bgCard:`#0e1936`,textPrimary:`#e0f2fe`,textMuted:`#7898c4`,accent:`#60a5fa`,border:`#192b59`},{id:`carbon-copper`,name:`Carbon Copper`,category:`Dark & Neon`,bgPrimary:`#120d0a`,bgSecondary:`#1a130f`,bgCard:`#241b15`,textPrimary:`#faf5f0`,textMuted:`#b09686`,accent:`#e07a3f`,border:`#3d2e24`},{id:`titanium-slate`,name:`Titanium Slate`,category:`Dark & Neon`,bgPrimary:`#0f1115`,bgSecondary:`#171a21`,bgCard:`#20242e`,textPrimary:`#f1f5f9`,textMuted:`#94a3b8`,accent:`#38bdf8`,border:`#313746`},{id:`midnight-orchid`,name:`Midnight Orchid`,category:`Dark & Neon`,bgPrimary:`#120a17`,bgSecondary:`#1b0f24`,bgCard:`#261633`,textPrimary:`#fae8ff`,textMuted:`#ae89c4`,accent:`#d946ef`,border:`#422657`},{id:`catppuccin-mocha`,name:`Catppuccin Mocha`,category:`Cozy & Pastel`,bgPrimary:`#1e1e2e`,bgSecondary:`#181825`,bgCard:`#28283d`,textPrimary:`#cdd6f4`,textMuted:`#9399b2`,accent:`#cba6f7`,border:`#3b3b58`},{id:`nord-frost`,name:`Nord Frost`,category:`Cozy & Pastel`,bgPrimary:`#242933`,bgSecondary:`#2e3440`,bgCard:`#3b4252`,textPrimary:`#eceff4`,textMuted:`#a6b3c7`,accent:`#88c0d0`,border:`#4c566a`},{id:`tokyo-night`,name:`Tokyo Night`,category:`Cozy & Pastel`,bgPrimary:`#16161e`,bgSecondary:`#1a1b26`,bgCard:`#24283b`,textPrimary:`#c0caf5`,textMuted:`#7882ad`,accent:`#7aa2f7`,border:`#343b58`},{id:`lavender-dusk`,name:`Lavender Dusk`,category:`Cozy & Pastel`,bgPrimary:`#1b1826`,bgSecondary:`#231f31`,bgCard:`#2d2840`,textPrimary:`#f3efff`,textMuted:`#a79cc9`,accent:`#a78bfa`,border:`#443d5e`},{id:`matcha-latte`,name:`Matcha Latte`,category:`Cozy & Pastel`,bgPrimary:`#f2f5eb`,bgSecondary:`#e7ecdc`,bgCard:`#fbfcf7`,textPrimary:`#1f2d1b`,textMuted:`#586e51`,accent:`#5b8c51`,border:`#cfd8be`,isLight:!0},{id:`peach-blossom`,name:`Peach Blossom`,category:`Cozy & Pastel`,bgPrimary:`#fcf2ed`,bgSecondary:`#f6e4db`,bgCard:`#fffaf7`,textPrimary:`#361f18`,textMuted:`#825d52`,accent:`#e07a5f`,border:`#e8cbc0`,isLight:!0},{id:`rose-pine`,name:`Rose Pine`,category:`Cozy & Pastel`,bgPrimary:`#191724`,bgSecondary:`#1f1d2e`,bgCard:`#26233a`,textPrimary:`#e0def4`,textMuted:`#908caa`,accent:`#ebbcba`,border:`#403d52`},{id:`mint-breeze`,name:`Mint Breeze`,category:`Cozy & Pastel`,bgPrimary:`#ebf7f3`,bgSecondary:`#dcf0e9`,bgCard:`#f7fcfa`,textPrimary:`#102a23`,textMuted:`#477064`,accent:`#14b8a6`,border:`#bfe2d6`,isLight:!0},{id:`catppuccin-macchiato`,name:`Catppuccin Macchiato`,category:`Cozy & Pastel`,bgPrimary:`#24273a`,bgSecondary:`#1e2030`,bgCard:`#363a4f`,textPrimary:`#cad3f5`,textMuted:`#939ab7`,accent:`#f5bde6`,border:`#494d64`},{id:`catppuccin-frappe`,name:`Catppuccin Frappe`,category:`Cozy & Pastel`,bgPrimary:`#303446`,bgSecondary:`#292c3c`,bgCard:`#414559`,textPrimary:`#c6d0f5`,textMuted:`#949cbb`,accent:`#ca9ee6`,border:`#51576d`},{id:`catppuccin-latte`,name:`Catppuccin Latte`,category:`Cozy & Pastel`,bgPrimary:`#eff1f5`,bgSecondary:`#e6e9ef`,bgCard:`#ffffff`,textPrimary:`#4c4f69`,textMuted:`#6c6f85`,accent:`#8839ef`,border:`#ccd0da`,isLight:!0},{id:`rose-pine-moon`,name:`Rose Pine Moon`,category:`Cozy & Pastel`,bgPrimary:`#232136`,bgSecondary:`#2a273f`,bgCard:`#393552`,textPrimary:`#e0def4`,textMuted:`#908caa`,accent:`#ea9a97`,border:`#44415a`},{id:`rose-pine-dawn`,name:`Rose Pine Dawn`,category:`Cozy & Pastel`,bgPrimary:`#faf4ed`,bgSecondary:`#f2e9e1`,bgCard:`#fffaf3`,textPrimary:`#575279`,textMuted:`#797593`,accent:`#d7827e`,border:`#dfdad9`,isLight:!0},{id:`sakura-petal`,name:`Sakura Petal`,category:`Cozy & Pastel`,bgPrimary:`#fdf2f6`,bgSecondary:`#fae5ee`,bgCard:`#ffffff`,textPrimary:`#3b1526`,textMuted:`#7a4b60`,accent:`#ec4899`,border:`#f3cadc`,isLight:!0},{id:`warm-cocoa`,name:`Warm Cocoa`,category:`Cozy & Pastel`,bgPrimary:`#231915`,bgSecondary:`#2c201b`,bgCard:`#382923`,textPrimary:`#f7ece6`,textMuted:`#b59c91`,accent:`#e3a078`,border:`#4f3b33`},{id:`honey-oat`,name:`Honey Oat`,category:`Cozy & Pastel`,bgPrimary:`#fbf7eb`,bgSecondary:`#f3ebd4`,bgCard:`#fffdf7`,textPrimary:`#362b12`,textMuted:`#73613c`,accent:`#d97706`,border:`#e5d8b8`,isLight:!0},{id:`sage-garden`,name:`Sage Garden`,category:`Cozy & Pastel`,bgPrimary:`#1a211c`,bgSecondary:`#222b25`,bgCard:`#2c3830`,textPrimary:`#ecf2ed`,textMuted:`#95ab9b`,accent:`#86efac`,border:`#3e4f43`},{id:`lilac-mist`,name:`Lilac Mist`,category:`Cozy & Pastel`,bgPrimary:`#f5f2fc`,bgSecondary:`#ebe5fa`,bgCard:`#ffffff`,textPrimary:`#271c45`,textMuted:`#63548a`,accent:`#7c3aed`,border:`#d6cbf2`,isLight:!0},{id:`sky-cloud`,name:`Sky Cloud`,category:`Cozy & Pastel`,bgPrimary:`#f0f7fd`,bgSecondary:`#e1effa`,bgCard:`#ffffff`,textPrimary:`#112a42`,textMuted:`#4e6f8f`,accent:`#0ea5e9`,border:`#c7dff2`,isLight:!0},{id:`chai-latte`,name:`Chai Latte`,category:`Cozy & Pastel`,bgPrimary:`#f5efe6`,bgSecondary:`#ebe0d1`,bgCard:`#fcf9f5`,textPrimary:`#332518`,textMuted:`#735e4a`,accent:`#b45309`,border:`#d9cab6`,isLight:!0},{id:`plum-velvet`,name:`Plum Velvet`,category:`Cozy & Pastel`,bgPrimary:`#211524`,bgSecondary:`#2b1b2f`,bgCard:`#38243d`,textPrimary:`#faeffc`,textMuted:`#b594bd`,accent:`#e8a8df`,border:`#503457`},{id:`periwinkle-haze`,name:`Periwinkle Haze`,category:`Cozy & Pastel`,bgPrimary:`#eef1fc`,bgSecondary:`#e0e6f7`,bgCard:`#ffffff`,textPrimary:`#1a2347`,textMuted:`#535f8a`,accent:`#4f46e5`,border:`#c9d2ed`,isLight:!0},{id:`soft-terracotta`,name:`Soft Terracotta`,category:`Cozy & Pastel`,bgPrimary:`#261816`,bgSecondary:`#301f1c`,bgCard:`#3d2824`,textPrimary:`#fbeee9`,textMuted:`#bd9a91`,accent:`#f29f85`,border:`#573a34`},{id:`buttercream-cream`,name:`Buttercream Silk`,category:`Cozy & Pastel`,bgPrimary:`#fcf9ec`,bgSecondary:`#f5efcf`,bgCard:`#ffffff`,textPrimary:`#362e10`,textMuted:`#756839`,accent:`#ca8a04`,border:`#e5dcaf`,isLight:!0},{id:`seafoam-cove`,name:`Seafoam Cove`,category:`Cozy & Pastel`,bgPrimary:`#142224`,bgSecondary:`#1a2c2e`,bgCard:`#223a3d`,textPrimary:`#eaf7f8`,textMuted:`#8db3b6`,accent:`#6ee7b7`,border:`#325256`},{id:`pistachio-frost`,name:`Pistachio Frost`,category:`Cozy & Pastel`,bgPrimary:`#eff7ec`,bgSecondary:`#e0eedb`,bgCard:`#fafdf9`,textPrimary:`#1a2e16`,textMuted:`#4e6e48`,accent:`#4d7c0f`,border:`#c4dbb9`,isLight:!0},{id:`blush-linen`,name:`Blush Linen`,category:`Cozy & Pastel`,bgPrimary:`#faf0f0`,bgSecondary:`#f2e1e1`,bgCard:`#ffffff`,textPrimary:`#381a1b`,textMuted:`#7d5253`,accent:`#e11d48`,border:`#e3c8c8`,isLight:!0},{id:`mocha-espresso`,name:`Mocha Espresso`,category:`Cozy & Pastel`,bgPrimary:`#1c1614`,bgSecondary:`#241c19`,bgCard:`#302521`,textPrimary:`#f2eae6`,textMuted:`#a8968f`,accent:`#d6a481`,border:`#473731`},{id:`twilight-fig`,name:`Twilight Fig`,category:`Cozy & Pastel`,bgPrimary:`#1c1421`,bgSecondary:`#251a2b`,bgCard:`#312338`,textPrimary:`#f5edf9`,textMuted:`#a891b5`,accent:`#d49ce8`,border:`#4a3554`},{id:`misty-fjord`,name:`Misty Fjord`,category:`Cozy & Pastel`,bgPrimary:`#1c242b`,bgSecondary:`#232e36`,bgCard:`#2d3b45`,textPrimary:`#edf2f7`,textMuted:`#98aab8`,accent:`#7dd3fc`,border:`#415463`},{id:`apricot-sorbet`,name:`Apricot Sorbet`,category:`Cozy & Pastel`,bgPrimary:`#fdf4eb`,bgSecondary:`#fae7d4`,bgCard:`#ffffff`,textPrimary:`#3b210e`,textMuted:`#805739`,accent:`#ea580c`,border:`#ebd0b7`,isLight:!0},{id:`bluebell-meadow`,name:`Bluebell Meadow`,category:`Cozy & Pastel`,bgPrimary:`#edf3fc`,bgSecondary:`#dde7f7`,bgCard:`#ffffff`,textPrimary:`#152545`,textMuted:`#4e638a`,accent:`#2563eb`,border:`#c2d2ed`,isLight:!0},{id:`everforest-light`,name:`Everforest Cream`,category:`Cozy & Pastel`,bgPrimary:`#fdf6e3`,bgSecondary:`#f4f0d9`,bgCard:`#fffbef`,textPrimary:`#3c474d`,textMuted:`#6b777d`,accent:`#6a994e`,border:`#ddd8be`,isLight:!0},{id:`gruvbox-soft`,name:`Gruvbox Cream`,category:`Cozy & Pastel`,bgPrimary:`#fbf1c7`,bgSecondary:`#f2e5bc`,bgCard:`#fff9e0`,textPrimary:`#3c3836`,textMuted:`#665c54`,accent:`#d65d0e`,border:`#d5c4a1`,isLight:!0},{id:`nord-aurora`,name:`Nord Aurora`,category:`Cozy & Pastel`,bgPrimary:`#222630`,bgSecondary:`#2a303d`,bgCard:`#353d4d`,textPrimary:`#eceff4`,textMuted:`#9eabbf`,accent:`#a3be8c`,border:`#475266`},{id:`wisteria-garden`,name:`Wisteria Garden`,category:`Cozy & Pastel`,bgPrimary:`#201b2e`,bgSecondary:`#29223b`,bgCard:`#342c4a`,textPrimary:`#f4f0ff`,textMuted:`#a699c9`,accent:`#c4b5fd`,border:`#4c406b`},{id:`eucalyptus-calm`,name:`Eucalyptus Calm`,category:`Cozy & Pastel`,bgPrimary:`#ebf4f0`,bgSecondary:`#dcebe4`,bgCard:`#f9fcfb`,textPrimary:`#162b22`,textMuted:`#4c6e5f`,accent:`#059669`,border:`#bed8cc`,isLight:!0},{id:`pistachio-mocha`,name:`Pistachio Dusk`,category:`Cozy & Pastel`,bgPrimary:`#19211b`,bgSecondary:`#212b24`,bgCard:`#2b382f`,textPrimary:`#ecf5ee`,textMuted:`#94ad9b`,accent:`#bef264`,border:`#3e5244`},{id:`coral-cream`,name:`Coral Cream`,category:`Cozy & Pastel`,bgPrimary:`#fff2f4`,bgSecondary:`#fde2e8`,bgCard:`#ffffff`,textPrimary:`#38101a`,textMuted:`#7d4754`,accent:`#f43f5e`,border:`#f5c6d0`,isLight:!0},{id:`lavender-fog`,name:`Lavender Fog`,category:`Cozy & Pastel`,bgPrimary:`#201e2b`,bgSecondary:`#282636`,bgCard:`#333045`,textPrimary:`#f1effa`,textMuted:`#a29cc2`,accent:`#b794f4`,border:`#494563`},{id:`vanilla-sky`,name:`Vanilla Sky`,category:`Cozy & Pastel`,bgPrimary:`#f6f8fb`,bgSecondary:`#eaeff5`,bgCard:`#ffffff`,textPrimary:`#172336`,textMuted:`#54647d`,accent:`#3b82f6`,border:`#cfd8e6`,isLight:!0},{id:`pure-paper-light`,name:`Pure Paper Light`,category:`High-Contrast & Light`,bgPrimary:`#f8fafc`,bgSecondary:`#ffffff`,bgCard:`#ffffff`,textPrimary:`#0f172a`,textMuted:`#475569`,accent:`#059669`,border:`#cbd5e1`,isLight:!0},{id:`solarized-light`,name:`Solarized Light`,category:`High-Contrast & Light`,bgPrimary:`#fdf6e3`,bgSecondary:`#eee8d5`,bgCard:`#fffdf7`,textPrimary:`#073642`,textMuted:`#586e75`,accent:`#268bd2`,border:`#d8cfb8`,isLight:!0},{id:`solarized-dark`,name:`Solarized Dark`,category:`High-Contrast & Light`,bgPrimary:`#002b36`,bgSecondary:`#073642`,bgCard:`#0c4352`,textPrimary:`#fdf6e3`,textMuted:`#93a1a1`,accent:`#2aa198`,border:`#195463`},{id:`arctic-ice`,name:`Arctic Ice`,category:`High-Contrast & Light`,bgPrimary:`#eef6fc`,bgSecondary:`#e1effa`,bgCard:`#ffffff`,textPrimary:`#0a2540`,textMuted:`#476a8a`,accent:`#0284c7`,border:`#c2dbf0`,isLight:!0},{id:`desert-sand`,name:`Desert Sand`,category:`High-Contrast & Light`,bgPrimary:`#f7f1e3`,bgSecondary:`#ece2cd`,bgCard:`#fcf9f2`,textPrimary:`#2c2214`,textMuted:`#6e5c43`,accent:`#c26d1f`,border:`#d9cbb0`,isLight:!0},{id:`slate-graphite`,name:`Slate Graphite`,category:`High-Contrast & Light`,bgPrimary:`#111318`,bgSecondary:`#191c24`,bgCard:`#222631`,textPrimary:`#f8fafc`,textMuted:`#9ca3af`,accent:`#e2e8f0`,border:`#374151`},{id:`royal-gold`,name:`Royal Gold`,category:`High-Contrast & Light`,bgPrimary:`#0d0b14`,bgSecondary:`#151121`,bgCard:`#1e1930`,textPrimary:`#fefce8`,textMuted:`#a69dc2`,accent:`#eab308`,border:`#3b325c`},{id:`deep-ocean`,name:`Deep Ocean`,category:`High-Contrast & Light`,bgPrimary:`#06101c`,bgSecondary:`#0a1829`,bgCard:`#10233a`,textPrimary:`#f0f9ff`,textMuted:`#7ea6cc`,accent:`#38bdf8`,border:`#1c3b5c`},{id:`swiss-ivory`,name:`Swiss Ivory`,category:`High-Contrast & Light`,bgPrimary:`#fafaf9`,bgSecondary:`#f5f5f4`,bgCard:`#ffffff`,textPrimary:`#1c1917`,textMuted:`#57534e`,accent:`#dc2626`,border:`#d6d3d1`,isLight:!0},{id:`cobalt-paper`,name:`Cobalt Paper`,category:`High-Contrast & Light`,bgPrimary:`#f8fafc`,bgSecondary:`#f1f5f9`,bgCard:`#ffffff`,textPrimary:`#0f172a`,textMuted:`#475569`,accent:`#1d4ed8`,border:`#cbd5e1`,isLight:!0},{id:`stark-monochrome`,name:`Stark Monochrome`,category:`High-Contrast & Light`,bgPrimary:`#000000`,bgSecondary:`#0a0a0a`,bgCard:`#141414`,textPrimary:`#ffffff`,textMuted:`#a3a3a3`,accent:`#ffffff`,border:`#333333`},{id:`ink-white`,name:`Ink & White`,category:`High-Contrast & Light`,bgPrimary:`#ffffff`,bgSecondary:`#f4f4f5`,bgCard:`#ffffff`,textPrimary:`#09090b`,textMuted:`#52525b`,accent:`#18181b`,border:`#d4d4d8`,isLight:!0},{id:`amber-contrast`,name:`Amber Contrast`,category:`High-Contrast & Light`,bgPrimary:`#000000`,bgSecondary:`#0d0b06`,bgCard:`#17130a`,textPrimary:`#fef08a`,textMuted:`#d4b855`,accent:`#facc15`,border:`#423614`},{id:`glacial-silver`,name:`Glacial Silver`,category:`High-Contrast & Light`,bgPrimary:`#f1f5f9`,bgSecondary:`#e2e8f0`,bgCard:`#ffffff`,textPrimary:`#0f172a`,textMuted:`#475569`,accent:`#0f766e`,border:`#cbd5e1`,isLight:!0},{id:`newsprint-press`,name:`Newsprint Press`,category:`High-Contrast & Light`,bgPrimary:`#f4f1ea`,bgSecondary:`#e9e4d9`,bgCard:`#fbf9f5`,textPrimary:`#1a1815`,textMuted:`#595349`,accent:`#b91c1c`,border:`#cfc8ba`,isLight:!0},{id:`oxford-navy`,name:`Oxford Navy`,category:`High-Contrast & Light`,bgPrimary:`#081226`,bgSecondary:`#0d1b38`,bgCard:`#13264d`,textPrimary:`#f8fafc`,textMuted:`#94a8cf`,accent:`#fbbf24`,border:`#253f75`},{id:`blueprint-light`,name:`Blueprint Crisp`,category:`High-Contrast & Light`,bgPrimary:`#eff6ff`,bgSecondary:`#dbeafe`,bgCard:`#ffffff`,textPrimary:`#172554`,textMuted:`#3b528c`,accent:`#1d4ed8`,border:`#bfdbfe`,isLight:!0},{id:`emerald-ledger`,name:`Emerald Ledger`,category:`High-Contrast & Light`,bgPrimary:`#f0fdf4`,bgSecondary:`#dcfce7`,bgCard:`#ffffff`,textPrimary:`#052e16`,textMuted:`#2e6645`,accent:`#15803d`,border:`#bbf7d0`,isLight:!0},{id:`studio-grey`,name:`Studio Grey`,category:`High-Contrast & Light`,bgPrimary:`#f3f4f6`,bgSecondary:`#e5e7eb`,bgCard:`#ffffff`,textPrimary:`#111827`,textMuted:`#4b5563`,accent:`#4f46e5`,border:`#d1d5db`,isLight:!0},{id:`crimson-editorial`,name:`Crimson Editorial`,category:`High-Contrast & Light`,bgPrimary:`#fef2f2`,bgSecondary:`#fee2e2`,bgCard:`#ffffff`,textPrimary:`#450a0a`,textMuted:`#7f3333`,accent:`#dc2626`,border:`#fecaca`,isLight:!0},{id:`obsidian-sharp`,name:`Obsidian Sharp`,category:`High-Contrast & Light`,bgPrimary:`#090b0f`,bgSecondary:`#11151d`,bgCard:`#191f2b`,textPrimary:`#ffffff`,textMuted:`#9aa5ba`,accent:`#22d3ee`,border:`#2d3748`},{id:`github-paper`,name:`GitHub Light`,category:`High-Contrast & Light`,bgPrimary:`#ffffff`,bgSecondary:`#f6f8fa`,bgCard:`#ffffff`,textPrimary:`#1f2328`,textMuted:`#59636e`,accent:`#0969da`,border:`#d0d7de`,isLight:!0},{id:`ayu-daylight`,name:`Ayu Daylight`,category:`High-Contrast & Light`,bgPrimary:`#fafafa`,bgSecondary:`#f0f0f0`,bgCard:`#ffffff`,textPrimary:`#363b42`,textMuted:`#6a727d`,accent:`#f29718`,border:`#dcdcdc`,isLight:!0},{id:`tokyo-daylight`,name:`Tokyo Daylight`,category:`High-Contrast & Light`,bgPrimary:`#e1e2e7`,bgSecondary:`#d5d6db`,bgCard:`#f4f5f8`,textPrimary:`#232842`,textMuted:`#565a73`,accent:`#2e7de9`,border:`#c2c4cf`,isLight:!0},{id:`nord-snow`,name:`Nord Snow`,category:`High-Contrast & Light`,bgPrimary:`#eceff4`,bgSecondary:`#e5e9f0`,bgCard:`#ffffff`,textPrimary:`#2e3440`,textMuted:`#4c566a`,accent:`#5e81ac`,border:`#d8dee9`,isLight:!0},{id:`cobalt-night`,name:`Cobalt Contrast`,category:`High-Contrast & Light`,bgPrimary:`#030b1a`,bgSecondary:`#07142b`,bgCard:`#0c1f40`,textPrimary:`#ffffff`,textMuted:`#93b0e0`,accent:`#60a5fa`,border:`#1d3a6e`},{id:`forest-chalk`,name:`Forest Chalk`,category:`High-Contrast & Light`,bgPrimary:`#081712`,bgSecondary:`#0d241c`,bgCard:`#133328`,textPrimary:`#f0fdf4`,textMuted:`#8ec4ad`,accent:`#34d399`,border:`#215442`},{id:`plum-ink`,name:`Plum Contrast`,category:`High-Contrast & Light`,bgPrimary:`#faf5ff`,bgSecondary:`#f3e8ff`,bgCard:`#ffffff`,textPrimary:`#2e1065`,textMuted:`#5b3994`,accent:`#7e22ce`,border:`#e9d5ff`,isLight:!0},{id:`bronze-parchment`,name:`Bronze Parchment`,category:`High-Contrast & Light`,bgPrimary:`#fefce8`,bgSecondary:`#fef9c3`,bgCard:`#ffffff`,textPrimary:`#422006`,textMuted:`#714b21`,accent:`#a16207`,border:`#fde68a`,isLight:!0},{id:`slate-alpine`,name:`Alpine Slate`,category:`High-Contrast & Light`,bgPrimary:`#f8fafc`,bgSecondary:`#eef2f6`,bgCard:`#ffffff`,textPrimary:`#0f172a`,textMuted:`#475569`,accent:`#e11d48`,border:`#cbd5e1`,isLight:!0},{id:`indigo-slate`,name:`Indigo Sharp`,category:`High-Contrast & Light`,bgPrimary:`#0b0e1c`,bgSecondary:`#11162b`,bgCard:`#19203d`,textPrimary:`#f8fafc`,textMuted:`#9aa7d4`,accent:`#818cf8`,border:`#2c3866`},{id:`turquoise-day`,name:`Turquoise Day`,category:`High-Contrast & Light`,bgPrimary:`#ecfeff`,bgSecondary:`#cffafe`,bgCard:`#ffffff`,textPrimary:`#083344`,textMuted:`#2b6175`,accent:`#0891b2`,border:`#a5f3fc`,isLight:!0},{id:`graphite-amber`,name:`Graphite Amber`,category:`High-Contrast & Light`,bgPrimary:`#141416`,bgSecondary:`#1c1c1f`,bgCard:`#26262b`,textPrimary:`#fafafa`,textMuted:`#a1a1aa`,accent:`#fbbf24`,border:`#3f3f46`},{id:`cherry-chalk`,name:`Cherry Chalk`,category:`High-Contrast & Light`,bgPrimary:`#fff1f2`,bgSecondary:`#ffe4e6`,bgCard:`#ffffff`,textPrimary:`#4c0519`,textMuted:`#882b44`,accent:`#be123c`,border:`#fecdd3`,isLight:!0},{id:`midnight-azure`,name:`Midnight Azure`,category:`High-Contrast & Light`,bgPrimary:`#070f1c`,bgSecondary:`#0c182b`,bgCard:`#132440`,textPrimary:`#f0f9ff`,textMuted:`#8aa8cf`,accent:`#38bdf8`,border:`#213c66`},{id:`chalkboard-classic`,name:`Chalkboard Classic`,category:`High-Contrast & Light`,bgPrimary:`#141e19`,bgSecondary:`#1b2922`,bgCard:`#24362d`,textPrimary:`#f3f7f4`,textMuted:`#9eb8aa`,accent:`#fde047`,border:`#385245`},{id:`marble-stone`,name:`Marble Stone`,category:`High-Contrast & Light`,bgPrimary:`#f5f5f4`,bgSecondary:`#e7e5e4`,bgCard:`#ffffff`,textPrimary:`#1c1917`,textMuted:`#57534e`,accent:`#0d9488`,border:`#d6d3d1`,isLight:!0},{id:`velvet-burgundy`,name:`Velvet Burgundy`,category:`High-Contrast & Light`,bgPrimary:`#1a090e`,bgSecondary:`#260d14`,bgCard:`#33121b`,textPrimary:`#fff1f2`,textMuted:`#c78999`,accent:`#fda4af`,border:`#521e2c`},{id:`polar-day`,name:`Polar Day`,category:`High-Contrast & Light`,bgPrimary:`#f4f9ff`,bgSecondary:`#e5f0ff`,bgCard:`#ffffff`,textPrimary:`#0a1f3d`,textMuted:`#415c82`,accent:`#2563eb`,border:`#c4dbfa`,isLight:!0},{id:`steel-contrast`,name:`Steel Contrast`,category:`High-Contrast & Light`,bgPrimary:`#101418`,bgSecondary:`#181e24`,bgCard:`#222a33`,textPrimary:`#f8fafc`,textMuted:`#9ca8b5`,accent:`#a5f3fc`,border:`#36424f`},{id:`ivory-sage`,name:`Ivory Sage`,category:`High-Contrast & Light`,bgPrimary:`#f7f9f5`,bgSecondary:`#ebf0e6`,bgCard:`#ffffff`,textPrimary:`#1b2618`,textMuted:`#51634c`,accent:`#15803d`,border:`#ccd9c3`,isLight:!0},...[[`obsidian-cyan`,`Obsidian Cyan`,`Dark & Neon`,`Dark Sleek`,`#06090f`,`#0b1019`,`#121926`,`#f1f5f9`,`#8fa3bd`,`#22d3ee`,`#1e293b`,!1],[`carbon-coral`,`Carbon Coral`,`Dark & Neon`,`Dark Sleek`,`#0b0a0c`,`#131115`,`#1c181f`,`#faf5f6`,`#a899a1`,`#fb7185`,`#2d2630`,!1],[`onyx-cobalt`,`Onyx Cobalt`,`Dark & Neon`,`Dark Sleek`,`#07090f`,`#0d111c`,`#141a2b`,`#eff6ff`,`#8ea3c7`,`#3b82f6`,`#212b45`,!1],[`slate-teal`,`Slate Teal`,`Dark & Neon`,`Dark Sleek`,`#090e12`,`#10181f`,`#18242e`,`#f0fdfa`,`#88a6ab`,`#14b8a6`,`#263847`,!1],[`graphite-mint`,`Graphite Mint`,`Dark & Neon`,`Dark Sleek`,`#0a0d0c`,`#111715`,`#19221f`,`#ecfdf5`,`#8aa69c`,`#34d399`,`#25332e`,!1],[`basalt-gold`,`Basalt Gold`,`Dark & Neon`,`Dark Sleek`,`#0d0c0a`,`#161410`,`#211d17`,`#fefce8`,`#ada28d`,`#eab308`,`#332d23`,!1],[`ink-indigo`,`Ink Indigo`,`Dark & Neon`,`Dark Sleek`,`#080914`,`#0f1124`,`#171a36`,`#eef2ff`,`#9299c7`,`#6366f1`,`#262b54`,!1],[`charcoal-rose`,`Charcoal Rose`,`Dark & Neon`,`Dark Sleek`,`#100c0e`,`#1a1317`,`#241b20`,`#fff1f2`,`#b3949d`,`#f43f5e`,`#382931`,!1],[`eclipse-sky`,`Eclipse Sky`,`Dark & Neon`,`Dark Sleek`,`#070b12`,`#0d1421`,`#152033`,`#f0f9ff`,`#8ea8c7`,`#38bdf8`,`#22334f`,!1],[`anthracite-lime`,`Anthracite Lime`,`Dark & Neon`,`Dark Sleek`,`#0b0d09`,`#13170f`,`#1d2217`,`#f7fee7`,`#99a888`,`#84cc16`,`#2c3323`,!1],[`velvet-noir`,`Velvet Noir`,`Dark & Neon`,`Dark Sleek`,`#09070d`,`#110d1a`,`#1a1426`,`#f5f3ff`,`#9f91bd`,`#a78bfa`,`#2a213d`,!1],[`cyber-orchid`,`Cyber Orchid`,`Dark & Neon`,`Neon Cyberpunk`,`#110617`,`#1a0a24`,`#261036`,`#fdf4ff`,`#c28ed4`,`#e879f9`,`#451d5e`,!1],[`neon-volt`,`Neon Volt`,`Dark & Neon`,`Neon Cyberpunk`,`#080e04`,`#101a08`,`#18290c`,`#f7fee7`,`#93b874`,`#a3e635`,`#2c4717`,!1],[`arcade-magenta`,`Arcade Magenta`,`Dark & Neon`,`Neon Cyberpunk`,`#140510`,`#1f0819`,`#2e0d25`,`#fdf2f8`,`#cc8ab6`,`#ec4899`,`#521842`,!1],[`tokyo-circuit`,`Tokyo Circuit`,`Dark & Neon`,`Neon Cyberpunk`,`#050b14`,`#0a1424`,`#102038`,`#ecfeff`,`#7eb0c9`,`#00f5d4`,`#1b3559`,!1],[`laser-tangerine`,`Laser Tangerine`,`Dark & Neon`,`Neon Cyberpunk`,`#140804`,`#1f0d07`,`#2e140b`,`#fff7ed`,`#c7927d`,`#ff6b35`,`#522414`,!1],[`hyper-violet`,`Hyper Violet`,`Dark & Neon`,`Neon Cyberpunk`,`#0c051c`,`#140a2e`,`#1f1045`,`#f5f3ff`,`#9c8ad4`,`#a855f7`,`#351c73`,!1],[`plasma-ice`,`Plasma Ice`,`Dark & Neon`,`Neon Cyberpunk`,`#040d14`,`#081724`,`#0e2438`,`#ecfeff`,`#7ab0cc`,`#06b6d4`,`#193e5e`,!1],[`acid-emerald`,`Acid Emerald`,`Dark & Neon`,`Neon Cyberpunk`,`#030e08`,`#061a10`,`#0b2919`,`#ecfdf5`,`#6eb893`,`#10b981`,`#15472d`,!1],[`chrome-pulse`,`Chrome Pulse`,`Dark & Neon`,`Neon Cyberpunk`,`#090814`,`#110f26`,`#1a173b`,`#eef2ff`,`#9295cf`,`#38bdf8`,`#2c2761`,!1],[`neural-crimson`,`Neural Crimson`,`Dark & Neon`,`Neon Cyberpunk`,`#140408`,`#21070d`,`#300b14`,`#fff1f2`,`#cc7e8e`,`#ff2e63`,`#541424`,!1],[`glitch-cyan`,`Glitch Cyan`,`Dark & Neon`,`Neon Cyberpunk`,`#051014`,`#091b21`,`#0f2b33`,`#f0fdfa`,`#76b5bd`,`#22d3ee`,`#194652`,!1],[`frost-pane`,`Frost Pane`,`Cozy & Pastel`,`Glassmorphism`,`#101824`,`#172233`,`#202e45`,`#f0f7ff`,`#94abc7`,`#60a5fa`,`#2f4363`,!1],[`smoked-quartz`,`Smoked Quartz`,`Cozy & Pastel`,`Glassmorphism`,`#161419`,`#201d24`,`#2c2830`,`#f7f5fa`,`#a89eb3`,`#c084fc`,`#403b47`,!1],[`mist-aurora`,`Mist Aurora`,`Cozy & Pastel`,`Glassmorphism`,`#0d1a1a`,`#132626`,`#1b3636`,`#ecfeff`,`#8ab8b8`,`#2dd4bf`,`#2b5252`,!1],[`crystal-lilac`,`Crystal Lilac`,`Cozy & Pastel`,`Glassmorphism`,`#f5f3ff`,`#ebe6ff`,`#ffffff`,`#221445`,`#584785`,`#7c3aed`,`#d8cffc`,!0],[`glacier-sheen`,`Glacier Sheen`,`Cozy & Pastel`,`Glassmorphism`,`#eef6fb`,`#e0eef7`,`#ffffff`,`#0c2338`,`#42607d`,`#0284c7`,`#c5dff2`,!0],[`rose-veil`,`Rose Veil`,`Cozy & Pastel`,`Glassmorphism`,`#fff4f6`,`#ffe8ec`,`#ffffff`,`#3d0b19`,`#7d4051`,`#e11d48`,`#fecdd6`,!0],[`pearl-mist`,`Pearl Mist`,`Cozy & Pastel`,`Glassmorphism`,`#f7f7fb`,`#ededf5`,`#ffffff`,`#191929`,`#575773`,`#4f46e5`,`#dad9eb`,!0],[`amber-glass`,`Amber Glass`,`Cozy & Pastel`,`Glassmorphism`,`#1a140d`,`#261d14`,`#33271b`,`#fffbeb`,`#bda68a`,`#fbbf24`,`#4d3b29`,!1],[`opal-lagoon`,`Opal Lagoon`,`Cozy & Pastel`,`Glassmorphism`,`#0c171c`,`#122229`,`#1a303b`,`#ecfeff`,`#89aebd`,`#38bdf8`,`#2a4c5c`,!1],[`linen-glass`,`Linen Glass`,`High-Contrast & Light`,`Glassmorphism`,`#f9f8f6`,`#efede8`,`#ffffff`,`#1c1b18`,`#5c584f`,`#0d9488`,`#dbd6cc`,!0],[`pure-obsidian-mono`,`Pure Obsidian Mono`,`High-Contrast & Light`,`Monochrome`,`#080808`,`#111111`,`#1a1a1a`,`#fafafa`,`#a3a3a3`,`#e5e5e5`,`#2e2e2e`,!1],[`zinc-studio`,`Zinc Studio`,`Dark & Neon`,`Monochrome`,`#09090b`,`#121216`,`#1b1b21`,`#f4f4f5`,`#a1a1aa`,`#d4d4d8`,`#2e2e36`,!1],[`graphite-ink`,`Graphite Ink`,`Dark & Neon`,`Monochrome`,`#121316`,`#1a1c20`,`#24272c`,`#f3f4f6`,`#9ca3af`,`#e5e7eb`,`#373b42`,!1],[`silver-print`,`Silver Print`,`High-Contrast & Light`,`Monochrome`,`#f4f4f5`,`#e4e4e7`,`#ffffff`,`#09090b`,`#52525b`,`#18181b`,`#d4d4d8`,!0],[`newsprint-bw`,`Newsprint Mono`,`High-Contrast & Light`,`Monochrome`,`#f7f6f2`,`#ebe9e1`,`#ffffff`,`#141413`,`#57564f`,`#262624`,`#d4d1c5`,!0],[`ash-slate`,`Ash Slate`,`Dark & Neon`,`Monochrome`,`#141619`,`#1d2024`,`#272b30`,`#f8fafc`,`#9aa1ab`,`#cbd5e1`,`#3b414a`,!1],[`platinum-day`,`Platinum Day`,`High-Contrast & Light`,`Monochrome`,`#f8fafc`,`#eef1f5`,`#ffffff`,`#0f172a`,`#475569`,`#334155`,`#cbd5e1`,!0],[`carbon-wire`,`Carbon Wire`,`High-Contrast & Light`,`Monochrome`,`#050505`,`#0d0d0d`,`#171717`,`#ffffff`,`#a1a1aa`,`#f4f4f5`,`#2b2b2b`,!1],[`chalk-minimal`,`Chalk Minimal`,`High-Contrast & Light`,`Monochrome`,`#ffffff`,`#f3f4f6`,`#fafafa`,`#111827`,`#4b5563`,`#1f2937`,`#e5e7eb`,!0],[`iron-charcoal`,`Iron Charcoal`,`Dark & Neon`,`Monochrome`,`#161618`,`#202024`,`#2b2b30`,`#f5f5f7`,`#a0a0ab`,`#e4e4eb`,`#3f3f47`,!1],[`retro-atari`,`Retro Atari`,`Dark & Neon`,`Retro`,`#170f0a`,`#24170f`,`#332116`,`#fff7ed`,`#c49d80`,`#f97316`,`#523422`,!1],[`crt-phosphor`,`CRT Phosphor`,`Dark & Neon`,`Retro`,`#051208`,`#091f0e`,`#0e2e16`,`#dcfce7`,`#74b887`,`#4ade80`,`#184a25`,!1],[`commodore-64`,`Commodore Slate`,`Dark & Neon`,`Retro`,`#10142e`,`#171d42`,`#202859`,`#eef2ff`,`#929cd4`,`#60a5fa`,`#33408a`,!1],[`cassette-cream`,`Cassette Cream`,`Cozy & Pastel`,`Retro`,`#fbf6eb`,`#f2e9d5`,`#ffffff`,`#291f14`,`#6b5742`,`#d97706`,`#e0d0b0`,!0],[`polaroid-77`,`Polaroid 77`,`Cozy & Pastel`,`Retro`,`#faf5ee`,`#f0e6d8`,`#ffffff`,`#241912`,`#6b5344`,`#dc2626`,`#dfd0bc`,!0],[`arcade-cabinet`,`Arcade Cabinet`,`Dark & Neon`,`Retro`,`#140b1c`,`#1e102b`,`#2b173d`,`#fdf2f8`,`#b98fd1`,`#facc15`,`#472763`,!1],[`nes-cartridge`,`8-Bit Cartridge`,`Dark & Neon`,`Retro`,`#17171a`,`#212126`,`#2d2d33`,`#f8fafc`,`#a4a4b0`,`#ef4444`,`#46464f`,!1],[`gameboy-olive`,`Handheld Olive`,`High-Contrast & Light`,`Retro`,`#eef2e2`,`#e0e8cb`,`#f7faef`,`#1a2410`,`#4a5c35`,`#3f6212`,`#c4d1a3`,!0],[`miami-1984`,`Miami 1984`,`Dark & Neon`,`Retro`,`#16091f`,`#220e30`,`#301445`,`#fdf4ff`,`#c28cd9`,`#22d3ee`,`#4f2270`,!1],[`kodachrome-gold`,`Kodachrome Gold`,`Cozy & Pastel`,`Retro`,`#1c150c`,`#291e12`,`#382918`,`#fefce8`,`#c4ab87`,`#f59e0b`,`#574026`,!1],[`vinyl-espresso`,`Vinyl Espresso`,`Cozy & Pastel`,`Retro`,`#17110d`,`#241b14`,`#33261d`,`#faf5f0`,`#bfa593`,`#fb923c`,`#4f3b2d`,!1],[`moss-canopy`,`Moss Canopy`,`Cozy & Pastel`,`Nature`,`#0b1710`,`#122419`,`#1a3324`,`#ecfdf5`,`#87b59a`,`#4ade80`,`#2b523b`,!1],[`redwood-bark`,`Redwood Bark`,`Cozy & Pastel`,`Nature`,`#170f0b`,`#241712`,`#332019`,`#fff7ed`,`#bfa091`,`#fb923c`,`#523428`,!1],[`alpine-meadow`,`Alpine Meadow`,`High-Contrast & Light`,`Nature`,`#f2f9f5`,`#e2f2e8`,`#ffffff`,`#0c2618`,`#3c6950`,`#16a34a`,`#bee0cb`,!0],[`kelp-forest`,`Kelp Forest`,`Dark & Neon`,`Nature`,`#081412`,`#0e211e`,`#14302c`,`#f0fdfa`,`#80b0a8`,`#2dd4bf`,`#214d46`,!1],[`canyon-terracotta`,`Canyon Dusk`,`Cozy & Pastel`,`Nature`,`#1c0f0c`,`#2b1713`,`#3b201a`,`#fff7ed`,`#c9988c`,`#f97316`,`#5e332a`,!1],[`glacier-stream`,`Glacier Stream`,`Cozy & Pastel`,`Nature`,`#eff8fc`,`#deeff7`,`#ffffff`,`#0b2533`,`#3d6378`,`#0ea5e9`,`#bee0f0`,!0],[`bamboo-zen`,`Bamboo Zen`,`High-Contrast & Light`,`Nature`,`#f6f8f0`,`#eaf0dc`,`#ffffff`,`#1b2410`,`#515e3d`,`#65a30d`,`#cfdbb6`,!0],[`autumn-maple`,`Autumn Maple`,`Cozy & Pastel`,`Nature`,`#1a0c09`,`#29130e`,`#381a13`,`#fff7ed`,`#c79385`,`#ef4444`,`#59291e`,!1],[`tidal-pool`,`Tidal Pool`,`Dark & Neon`,`Nature`,`#07141a`,`#0c2029`,`#122f3b`,`#ecfeff`,`#7daec2`,`#06b6d4`,`#1f4c5e`,!1],[`pine-needle`,`Pine Needle`,`Dark & Neon`,`Nature`,`#08120c`,`#0e1f15`,`#162e20`,`#ecfdf5`,`#82ad93`,`#22c55e`,`#244a34`,!1],[`meadow-buttercup`,`Meadow Light`,`High-Contrast & Light`,`Nature`,`#fcfcf2`,`#f5f5dc`,`#ffffff`,`#26230a`,`#635c2c`,`#ca8a04`,`#e3dfa8`,!0],[`sovereign-plum`,`Sovereign Plum`,`Dark & Neon`,`Royal`,`#13081c`,`#1d0d2b`,`#29133d`,`#faf5ff`,`#b592d1`,`#c084fc`,`#432063`,!1],[`imperial-gold`,`Imperial Gold`,`Dark & Neon`,`Royal`,`#120e07`,`#1c160b`,`#292010`,`#fefce8`,`#bfb084`,`#facc15`,`#47381b`,!1],[`sapphire-crown`,`Sapphire Crown`,`Dark & Neon`,`Royal`,`#070d1f`,`#0d1736`,`#14224f`,`#eff6ff`,`#8ea4db`,`#60a5fa`,`#233a80`,!1],[`velvet-ruby`,`Velvet Ruby`,`Dark & Neon`,`Royal`,`#1a070d`,`#290c15`,`#38101d`,`#fff1f2`,`#c78598`,`#fb7185`,`#5c1c30`,!1],[`emerald-throne`,`Emerald Throne`,`Dark & Neon`,`Royal`,`#06140f`,`#0b2119`,`#113025`,`#ecfdf5`,`#80b5a2`,`#34d399`,`#1d4f3d`,!1],[`ivory-herald`,`Ivory Herald`,`High-Contrast & Light`,`Royal`,`#fcfaf5`,`#f5efe0`,`#ffffff`,`#261a08`,`#695434`,`#b45309`,`#e3d5b3`,!0],[`amethyst-crest`,`Amethyst Crest`,`Cozy & Pastel`,`Royal`,`#160d24`,`#211436`,`#2e1c4a`,`#f5f3ff`,`#b099d6`,`#a78bfa`,`#4a2e75`,!1],[`cobalt-monarch`,`Cobalt Monarch`,`High-Contrast & Light`,`Royal`,`#f4f7ff`,`#e6edff`,`#ffffff`,`#0d1a40`,`#41558f`,`#2563eb`,`#c7d5fa`,!0],[`burgundy-velvet`,`Burgundy Velvet`,`Dark & Neon`,`Royal`,`#17080c`,`#240c13`,`#33121c`,`#fff1f2`,`#c28898`,`#f43f5e`,`#521e2e`,!1],[`obsidian-crown`,`Obsidian Crown`,`Dark & Neon`,`Royal`,`#0b0a10`,`#13111c`,`#1d1a2b`,`#fafafa`,`#9e97b8`,`#fbbf24`,`#312c47`,!1],[`teal-dynasty`,`Teal Dynasty`,`Dark & Neon`,`Royal`,`#061417`,`#0b2126`,`#113038`,`#ecfeff`,`#80b0ba`,`#2dd4bf`,`#1d4e59`,!1],[`champagne-parchment`,`Champagne Crest`,`High-Contrast & Light`,`Royal`,`#fdfbf7`,`#f7f1e3`,`#ffffff`,`#291f10`,`#6e5c40`,`#d97706`,`#e6d8ba`,!0]].map(([e,t,n,r,i,a,o,s,c,l,u,d])=>({id:e,name:t,category:n,studioCategory:r,bgPrimary:i,bgSecondary:a,bgCard:o,textPrimary:s,textMuted:c,accent:l,border:u,...d?{isLight:!0}:{}}))];function ge(e){if(e.studioCategory)return e.studioCategory;let t=`${e.id} ${e.name}`.toLowerCase();return/oled|noir|midnight|obsidian|charcoal|carbon|graphite|slate/.test(t)&&!/gold|royal|frost/.test(t)?/mono|zinc|ash|chalk|silver|steel|paper|newsprint/.test(t)?`Monochrome`:`Dark Sleek`:/neon|cyber|synth|laser|plasma|hyper|vapor|matrix|electric|volt|crimson|tokyo/.test(t)?`Neon Cyberpunk`:/glass|frost|ice|mist|crystal|arctic|turquoise|polar|cloud|pearl|quartz/.test(t)?`Glassmorphism`:/mono|zinc|ash|paper|marble|chalk|silver|graphite|slate|ink/.test(t)?`Monochrome`:/retro|amber|terminal|sunset|peach|desert|bronze|espresso|solarized|sepia/.test(t)?`Retro`:/emerald|forest|matcha|mint|sage|ocean|coral|sakura|blossom|lagoon|sky/.test(t)?`Nature`:/royal|gold|velvet|plum|dracula|indigo|lavender|violet|ruby|burgundy|cobalt/.test(t)?`Royal`:e.category===`Dark & Neon`?`Dark Sleek`:e.category===`Cozy & Pastel`?`Glassmorphism`:`Monochrome`}var _e=`https://cdn.jsdelivr.net/gh/bubbls/UGS-Assets@main`,ve=`adventures.adventure.capitalist.basketball.superstars.minutes.minute.till.dawn.cookie.clicker.subway.surfers.surfer.burrito.bison.stickman.hunters.hunter.ducklife.bitlife.polytrack.snowrider.retro.bowl.doodle.jump.bouncy.motors.smash.karts.drift.boss.paper.hole.block.miner.post.clash.duel.tower.defense.idle.tycoon.space.alien.dash.doom.card.poker.ball.balls.rush.run.date.danger.buckshot.russian.football.soccer.weird.gun.game.tiny.fishing.bad.monday.pizza.tower.geometry.monkey.mart.one.bit.endacopia.quake`.split(`.`).sort((e,t)=>t.length-e.length);function ye(e){let t=e.toLowerCase();if(t.length<7||/[^a-z]/i.test(e))return[e];let n=t.length,r=Array(n+1).fill(null);r[0]=[];for(let e=0;e<n;e++)if(r[e]){for(let n of ve)if(t.startsWith(n,e)){let t=e+n.length,i=[...r[e],n];(!r[t]||i.length<r[t].length)&&(r[t]=i)}}return r[n]&&r[n].length>1?r[n]:[e]}function be(e){let t=(e||``).trim();if(!t)return`UNTITLED MODULE`;t=t.includes(`/`)?t.split(`/`)[0]:t.replace(/\.html?$/i,``),t=t.replace(/([_-](?:main|master|gh-pages|branch))$/i,``).replace(/[_/]+/g,` `).replace(/-/g,` `).replace(/([a-z])([A-Z])/g,`$1 $2`).replace(/([A-Z]+)([A-Z][a-z])/g,`$1 $2`).replace(/(\d)([a-zA-Z])/g,(e,t,n,r,i)=>{let a=i.slice(r+1);return/^(?:d\b|st\b|nd\b|rd\b|th\b|x\b)/i.test(a)?e:`${t} ${n}`}).replace(/([a-zA-Z])(\d)/g,(e,t,n,r,i)=>{let a=i.slice(Math.max(0,r-1),r+1);return/^v$/i.test(t)||a.length===2&&/\s/.test(a[0])?e:`${t} ${n}`});let n=t.split(/\s+/).filter(Boolean),r=[];for(let e of n)r.push(...ye(e));return r.join(` `).replace(/\s+/g,` `).trim().toUpperCase()}function xe(e){return e.split(`/`).map(e=>encodeURIComponent(e)).join(`/`)}function Se(e,t=_e){return`${t.replace(/\/+$/,``)}/${xe(e.replace(/^\/+/,``))}`}function Ce(e,t=_e){let n=e.replace(/^\/+/,``).split(`/`);return n.length<=1?`${t.replace(/\/+$/,``)}/`:(n.pop(),`${t.replace(/\/+$/,``)}/${xe(n.join(`/`))}/`)}var we=[{path:`10minutestilldawn/index.html`,cover:`10minutestilldawn/icon.png`},{path:`slope 3/index.html`},{path:`slope 2 player/index.html`},{path:`retro bowl/new.html`},{path:`cookieclicker/index.html`},{path:`drift-hunters/index.html`,cover:`drift-hunters/favicon.ico`},{path:`snow-rider/index.html`},{path:`monkey mart v6.3/index.html`},{path:`stickman hook/index.html`},{path:`BurritoBison-main/index.html`},{path:`doodle jump/index.html`,cover:`doodle jump/favicon.ico`},{path:`big 2048/index.html`,cover:`big 2048/favicon.ico`},{path:`basketball-superstars/index.html`},{path:`bouncy basketball/index.html`},{path:`adventure-capitalist/index.html`,cover:`adventure-capitalist/logo.webp`},{path:`3dash/index.html`,cover:`3dash/logo.png`},{path:`2doom/index.html`},{path:`russian-buckshot/index.html`},{path:`ovomod/index.html`},{path:`ages of conflict/index.html`}];function Te(e=_e){return we.map(t=>{let n=t.path.split(`/`)[0];return{id:`ugs:${n}`,name:be(n),folder:n,path:t.path,url:Se(t.path,e),baseUrl:Ce(t.path,e),cover:t.cover?Se(t.cover,e):null,featured:!0}}).sort((e,t)=>e.name.localeCompare(t.name))}var T=`wss://wisp.mercurywork.shop/`,E=`wss://my-wisp-server-ocnq.onrender.com/wisp/`,Ee=`https://duck.ai`,De=`https://classroom.google.com`,Oe=`https://ssl.gstatic.com/classroom/ic_product_classroom_144.png`,ke=`VALemStandalone`,Ae=`VALemStandaloneFrame`,D=`popup=yes,width=1280,height=800,left=100,top=100,menubar=no,toolbar=no,location=no,status=no,resizable=yes`;function je(e){return e?e.key===`Control`&&!e.repeat&&!e.altKey&&!e.shiftKey&&!e.metaKey:!1}function Me(e,t){try{return new URLSearchParams(String(e||``)).get(`vb`)===`1`&&String(t||``)===`VALemStandaloneFrame`}catch{return!1}}function Ne(e,t){let n=String(e||``).trim();return n?n===`${String(t||``).replace(/\/+$/,``)}/scram/`||n.endsWith(`/scram/`):!1}function Pe(){return new URLSearchParams({bg:`#0b0608`,bgSec:`#080406`,surface:`#140a0e`,text:`#fdf2f4`,muted:`#9f878f`,border:`rgba(255,255,255,0.08)`,primary:`#ff5c7c`,light:`0`}).toString()}function Fe(e){try{let t=new URL(e);return t.searchParams.set(`vb`,`1`),t.toString()}catch{let t=String(e||``).split(`#`)[0];return t?t.includes(`?`)?`${t}&vb=1`:`${t}?vb=1`:`/?vb=1`}}function Ie(e,t=De){return`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Home - Classroom</title>
  <link rel="icon" type="image/png" href="${Oe}" />
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
    name="${Ae}"
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
</html>`}function Le(e,t,n=De){try{e&&(e.fullscreenElement&&typeof e.exitFullscreen==`function`&&e.exitFullscreen().catch(()=>{}),e.title=`Google Classroom`,e.documentElement&&(e.documentElement.style.display=`none`))}catch{}try{t&&t.parent&&t.parent!==t&&t.parent.postMessage({type:`valbrowse-panic`},`*`)}catch{}try{if(t){let e=t.top&&t.top!==t?t.top:t;if(e.opener&&typeof e.close==`function`)try{e.close()}catch{}e.location.replace(n);return}}catch{}try{t&&t.location&&t.location.replace(n)}catch{}}var Re=`https://cdn.jsdelivr.net/gh/WanoCapy/ChickenKingsVault@main`,ze=`https://api.github.com/repos/WanoCapy/ChickenKingsVault/git/trees/main?recursive=1`,Be=[`https://cdn.jsdelivr.net/gh/gmshelf/ckv@main/ckv.json`,`https://fastly.jsdelivr.net/gh/gmshelf/ckv@main/ckv.json`,`https://gcore.jsdelivr.net/gh/gmshelf/ckv@main/ckv.json`];function Ve(e){return String(e||``).replace(/^\/+/,``).split(`/`).map(e=>encodeURIComponent(e)).join(`/`)}function He(e,t=Re){return`${t.replace(/\/+$/,``)}/${Ve(e)}`}function Ue(e=Re){return`${e.replace(/\/+$/,``)}/gamefiles/`}function We(e){let t=String(e||``).trim();return!t||(t=t.replace(/^gamefiles\//i,``).replace(/\.html?$/i,``).replace(/[-_]+/g,` `).replace(/\s+/g,` `).trim(),!t)?`Untitled Module`:t.split(` `).map(e=>e?e.charAt(0).toUpperCase()+e.slice(1):``).join(` `)}var Ge=[{path:`gamefiles/2048 Merge Run.html`,cover:`gameimages/2048mergerun.png`},{path:`gamefiles/1v1.LoL.html`,cover:`gameimages/1v1.lol.webp`},{path:`gamefiles/Retro Bowl.html`,cover:`gameimages/retrobowl.png`},{path:`gamefiles/Cookie Clicker.html`,cover:`gameimages/cookieclicker.png`},{path:`gamefiles/Basket Random.html`,cover:`gameimages/basketrandom.png`},{path:`gamefiles/Drift Boss.html`,cover:`gameimages/driftboss.jpg`},{path:`gamefiles/Drift Hunters.html`,cover:`gameimages/drifthunters.png`},{path:`gamefiles/Snow Rider 3D.html`,cover:`gameimages/snowrider3d.webp`},{path:`gamefiles/Stickman Hook.html`,cover:`gameimages/stickmanhook.jfif`},{path:`gamefiles/Monkey Mart.html`,cover:`gameimages/monkeymart.jpg`},{path:`gamefiles/Subway Surfers.html`,cover:`gameimages/subwaysurfers.png`},{path:`gamefiles/Run 3.html`,cover:`gameimages/run3.jpg`},{path:`gamefiles/Moto X3M.html`,cover:`gameimages/motox3m.png`},{path:`gamefiles/Geometry Dash.html`,cover:`gameimages/geometrydash.png`},{path:`gamefiles/Chess Classic.html`,cover:`gameimages/chessclassic.png`},{path:`gamefiles/Drive Mad.html`,cover:`gameimages/drivemad.png`},{path:`gamefiles/Crossy Road.html`,cover:`gameimages/crossyroad.jpg`},{path:`gamefiles/Flappy Bird.html`,cover:`gameimages/flappybird.jpg`},{path:`gamefiles/Doodle Jump.html`,cover:`gameimages/doodlejump.jpg`},{path:`gamefiles/Tetris.html`,cover:`gameimages/tetris.png`}];function Ke(e=Re){let t=Ue(e);return Ge.map(n=>{let r=n.path.slice(10).replace(/\.html?$/i,``),i=n.cover||`gameimages/${r}.png`;return{id:`ckv:${n.path}`,provider:`ckv`,name:We(n.path),path:n.path,url:He(n.path,e),baseUrl:t,cover:He(i,e),featured:!0}}).sort((e,t)=>e.name.localeCompare(t.name))}var qe=`https://cdn.jsdelivr.net/gh/freebuisness/covers@main`,Je=`https://cdn.jsdelivr.net/gh/freebuisness/html@main`,Ye=[`https://cdn.jsdelivr.net/gh/gn-math/gn-math.github.io@main/index.html`,`https://fastly.jsdelivr.net/gh/gn-math/gn-math.github.io@main/index.html`,`https://gcore.jsdelivr.net/gh/gn-math/gn-math.github.io@main/index.html`,`https://raw.githubusercontent.com/gn-math/gn-math.github.io/main/index.html`],Xe=`https://api.tvmaze.com/shows?page=0`,Ze=`https://api.tvmaze.com/search/shows?q=`,Qe=`https://archive.org/advancedsearch.php?q=collection:(feature_films)+AND+mediatype:(movies)&fl[]=identifier,title,description,year&rows=30&output=json`;function $e(e){return String(e||``).replace(/<\/?(?:b|i|em|strong|span|u)\b[^>]*>/gi,``).replace(/<[^>]+>/g,` `).replace(/&nbsp;/gi,` `).replace(/&amp;/gi,`&`).replace(/&quot;/gi,`"`).replace(/&#39;/gi,`'`).replace(/\s+/g,` `).replace(/\s+([.,!?;:])/g,`$1`).trim()}function et(e){if(!e||!e.identifier)return null;let t=String(e.identifier).trim(),n=Array.isArray(e.title)?String(e.title[0]||t).trim():String(e.title||t).trim(),r=Array.isArray(e.description)?e.description[0]:e.description,i=Array.isArray(e.year)?e.year[0]:e.year,a=i?String(i).slice(0,4):``,o=`${n} ${String(r||``)}`.toLowerCase(),s=[`Public Domain`],c=[`all`,`public-domain`];return/comedy|keaton|chaplin|laurel|hardy/.test(o)&&(s.push(`Comedy`),c.push(`comedy`)),/sci-fi|space|plan 9|living dead|scientist|superman|monster|alien/.test(o)&&(s.push(`Sci-Fi`),c.push(`sci-fi`)),/action|adventure|western|war|general/.test(o)&&(s.push(`Action`),c.push(`action`)),{id:`archive:${t}`,externalId:t,source:`archive`,title:n,year:a,rating:null,genres:s,categoryTags:Array.from(new Set(c)),summary:$e(r)||`Complete legal public-domain feature film on Internet Archive.`,poster:`https://archive.org/services/img/${encodeURIComponent(t)}`,backdrop:`https://archive.org/services/img/${encodeURIComponent(t)}`,networkOrStudio:`Internet Archive Cinema`,cast:[`Public Domain Feature`],embedUrl:`https://archive.org/embed/${encodeURIComponent(t)}`,watchPageUrl:`https://archive.org/details/${encodeURIComponent(t)}`,isFullMovie:!0}}function tt(){return[{identifier:`night_of_the_living_dead`,title:`Night of the Living Dead`,year:`1968`,description:`George A. Romero’s landmark sci-fi horror feature following strangers trapped inside a Pennsylvania farmhouse.`},{identifier:`Charade_1963`,title:`Charade`,year:`1963`,description:`Cary Grant and Audrey Hepburn star in Stanley Donen’s acclaimed Parisian mystery thriller.`},{identifier:`The_General_1926`,title:`The General`,year:`1926`,description:`Buster Keaton’s iconic silent action comedy masterpiece centered on a daring locomotive chase.`},{identifier:`House_on_Haunted_Hill_1959`,title:`House on Haunted Hill`,year:`1959`,description:`Vincent Price invites five guests to survive one night in a locked hillside mansion for $10,000.`},{identifier:`GulliversTravels1939`,title:`Gulliver's Travels`,year:`1939`,description:`Fleischer Studios’ full-length Technicolor animated adventure adapting Jonathan Swift’s classic.`},{identifier:`Plan_9_from_Outer_Space_1959`,title:`Plan 9 from Outer Space`,year:`1959`,description:`Cult-classic 1950s retro sci-fi feature involving flying saucers over Southern California.`},{identifier:`HisGirlFriday1940`,title:`His Girl Friday`,year:`1940`,description:`Howard Hawks’ fast-talking screwball comedy starring Cary Grant and Rosalind Russell.`},{identifier:`superman_1941`,title:`Superman: The Mad Scientist`,year:`1941`,description:`Fleischer Studios’ acclaimed 1941 animated sci-fi action theatrical short.`}].map(e=>et(e)).filter(e=>!!e)}function nt(){return[{id:`tvmaze:82`,externalId:`82`,source:`tvmaze`,title:`Game of Thrones`,year:`2011`,rating:8.9,genres:[`Drama`,`Adventure`,`Fantasy`],categoryTags:[`all`,`trending`,`action`,`sci-fi`],summary:`Nine noble families fight for control over the mythical lands of Westeros while an ancient enemy returns.`,poster:`https://static.tvmaze.com/uploads/images/medium_portrait/498/1245274.jpg`,backdrop:`https://static.tvmaze.com/uploads/images/original_untouched/498/1245274.jpg`,networkOrStudio:`HBO`,cast:[`Emilia Clarke`,`Kit Harington`,`Peter Dinklage`],embedUrl:``,watchPageUrl:`https://www.tvmaze.com/shows/82/game-of-thrones`,isFullMovie:!1},{id:`tvmaze:169`,externalId:`169`,source:`tvmaze`,title:`Breaking Bad`,year:`2008`,rating:9.2,genres:[`Drama`,`Crime`,`Thriller`],categoryTags:[`all`,`trending`,`action`],summary:`A high school chemistry teacher diagnosed with terminal cancer turns to manufacturing to secure his family’s future.`,poster:`https://static.tvmaze.com/uploads/images/medium_portrait/501/1253519.jpg`,backdrop:`https://static.tvmaze.com/uploads/images/original_untouched/501/1253519.jpg`,networkOrStudio:`AMC`,cast:[`Bryan Cranston`,`Aaron Paul`,`Anna Gunn`],embedUrl:``,watchPageUrl:`https://www.tvmaze.com/shows/169/breaking-bad`,isFullMovie:!1},{id:`tvmaze:216`,externalId:`216`,source:`tvmaze`,title:`Rick and Morty`,year:`2013`,rating:8.8,genres:[`Comedy`,`Adventure`,`Science-Fiction`],categoryTags:[`all`,`trending`,`comedy`,`sci-fi`,`action`],summary:`An eccentric scientist drags his anxious grandson on chaotic interdimensional adventures across the multiverse.`,poster:`https://static.tvmaze.com/uploads/images/medium_portrait/477/1194843.jpg`,backdrop:`https://static.tvmaze.com/uploads/images/original_untouched/477/1194843.jpg`,networkOrStudio:`Adult Swim`,cast:[`Ian Cardoni`,`Harry Belden`,`Chris Parnell`],embedUrl:``,watchPageUrl:`https://www.tvmaze.com/shows/216/rick-and-morty`,isFullMovie:!1},{id:`tvmaze:1505`,externalId:`1505`,source:`tvmaze`,title:`One-Punch Man`,year:`2015`,rating:8.5,genres:[`Action`,`Comedy`,`Anime`],categoryTags:[`all`,`trending`,`action`,`comedy`,`anime`],summary:`Saitama is a hero so overwhelmingly strong he defeats every opponent with a single punch and seeks a worthy rival.`,poster:`https://static.tvmaze.com/uploads/images/medium_portrait/464/1160027.jpg`,backdrop:`https://static.tvmaze.com/uploads/images/original_untouched/464/1160027.jpg`,networkOrStudio:`TV Tokyo`,cast:[`Makoto Furukawa`,`Kaito Ishikawa`],embedUrl:``,watchPageUrl:`https://www.tvmaze.com/shows/1505/one-punch-man`,isFullMovie:!1}]}var rt=[{id:`lofi-study`,title:`Lofi Study Beats`,artist:`Vux Tape Deck`,genre:`Lo-Fi Chill`,bpm:76,durationSec:210,filterHz:1050,waveform:`triangle`,chords:[[261.63,329.63,392,493.88],[220,261.63,329.63,392],[174.61,220,261.63,329.63],[196,246.94,293.66,349.23]],accentColor:`#ff5c7c`},{id:`synthwave-night`,title:`Synthwave Night`,artist:`Neon Horizon FM`,genre:`Retrowave`,bpm:96,durationSec:240,filterHz:1550,waveform:`sawtooth`,chords:[[146.83,220,261.63,349.23],[130.81,196,246.94,329.63],[116.54,174.61,220,293.66],[130.81,196,261.63,329.63]],accentColor:`#a855f7`},{id:`deep-focus`,title:`Deep Focus Ambient`,artist:`Quiet Drift`,genre:`Ambient`,bpm:60,durationSec:300,filterHz:780,waveform:`sine`,chords:[[246.94,293.66,369.99,440],[220,261.63,329.63,415.3],[196,246.94,293.66,369.99],[164.81,220,246.94,329.63]],accentColor:`#38bdf8`},{id:`chill-piano`,title:`Chill Piano`,artist:`Midnight Felt Keys`,genre:`Acoustic Keys`,bpm:72,durationSec:195,filterHz:1350,waveform:`triangle`,chords:[[293.66,349.23,440,523.25],[261.63,329.63,392,493.88],[220,261.63,329.63,440],[196,246.94,293.66,392]],accentColor:`#34d399`},{id:`gaming-bass`,title:`Gaming Bass`,artist:`Overdrive Radio`,genre:`Electronic`,bpm:118,durationSec:180,filterHz:1750,waveform:`sawtooth`,chords:[[130.81,196,261.63,311.13],[116.54,174.61,233.08,293.66],[103.83,155.56,207.65,261.63],[116.54,174.61,233.08,293.66]],accentColor:`#f59e0b`},{id:`nature-rain`,title:`Nature Rain`,artist:`Rainforest Canopy`,genre:`Nature Soundscape`,bpm:64,durationSec:360,filterHz:680,waveform:`sine`,chords:[[220,293.66,329.63,440],[196,261.63,329.63,392],[174.61,220,293.66,349.23],[196,246.94,293.66,392]],accentColor:`#2dd4bf`}],it=[{id:`rain`,label:`Rain`,description:`Soft steady rainfall`,defaultVolume:0},{id:`fireplace`,label:`Fireplace`,description:`Warm crackling hearth`,defaultVolume:0},{id:`cafe`,label:`Cafe Chatter`,description:`Mellow coffeehouse murmur`,defaultVolume:0},{id:`keyboard`,label:`Keyboard Clicks`,description:`Crisp tactile typing rhythm`,defaultVolume:0}],at=[{id:`general`,name:`general`,topic:`Hangout, chill & share Vux tips`},{id:`games`,name:`games`,topic:`Discuss gn-math, Seraph high scores & co-op links`},{id:`movies`,name:`movies`,topic:`Cinema watchlists, embeds & show recommendations`},{id:`links-and-themes`,name:`links-and-themes`,topic:`Share VUX1 theme codes & proxy bookmarks`}],ot=[{id:`first-launch`,name:`First Launch`,description:`Opened the isolated Vux workspace`,check:()=>!0},{id:`tab-explorer`,name:`Tab Explorer`,description:`Opened 5+ proxy tabs`,check:e=>e.tabsOpened>=5},{id:`arcade-regular`,name:`Arcade Regular`,description:`Launched 3+ games`,check:e=>e.gamesLaunched>=3},{id:`style-architect`,name:`Style Architect`,description:`Tried 3+ themes or backgrounds`,check:e=>e.themesTried>=3},{id:`chatterbox`,name:`Chatterbox`,description:`Sent 3+ messages in Vux Chat`,check:e=>e.messagesSent>=3},{id:`audiophile`,name:`Audiophile`,description:`Played music in StudyHub MP3 Player`,check:e=>e.tracksPlayed>=1},{id:`streak-3`,name:`3-Day Streak`,description:`Visited Vux 3 days in a row`,check:e=>e.streakDays>=3},{id:`power-user`,name:`Vux Power User`,description:`10+ combined tabs & games launched`,check:e=>e.tabsOpened+e.gamesLaunched>=10}];function st(e=Date.now()){return[{id:`seed-gen-1`,channelId:`general`,author:`VuxBot`,avatarColor:`#ff5c7c`,text:`Welcome to #general! Messages sync live across your open Vux tabs. Press Ctrl+K anytime for instant search.`,timestamp:e-42e4,reactions:{"👋":4,"🔥":3}},{id:`seed-gen-2`,channelId:`general`,author:`Nova`,avatarColor:`#38bdf8`,text:`Try picking a Cursive & Calligraphy font or turning on Cursor Trails in Studio Settings — looks awesome over the Nebula canvas.`,timestamp:e-18e4,reactions:{"❤️":2}},{id:`seed-games-1`,channelId:`games`,author:`Kai`,avatarColor:`#34d399`,text:`Seraph + gn-math catalogs are both loaded. You can pop any game into the PiP mini-window while chatting here!`,timestamp:e-3e5,reactions:{"🎮":5}},{id:`seed-movies-1`,channelId:`movies`,author:`Elena`,avatarColor:`#a855f7`,text:`Internet Archive full public-domain classics play right inside the Cinema Theater player.`,timestamp:e-24e4,reactions:{"👍":3}},{id:`seed-themes-1`,channelId:`links-and-themes`,author:`Milo`,avatarColor:`#f59e0b`,text:`Drop your exported VUX1:... theme codes or favorite Speed-Dial links here to back them up.`,timestamp:e-12e4,reactions:{"🔥":2}}]}var ct=`https://cdn.jsdelivr.net/gh/a456pur/seraph@main`,lt=[`https://cdn.jsdelivr.net/gh/a456pur/seraph@main/games/index.html`,`https://fastly.jsdelivr.net/gh/a456pur/seraph@main/games/index.html`,`https://gcore.jsdelivr.net/gh/a456pur/seraph@main/games/index.html`],ut=[{slug:`slope`,name:`Slope`,category:`Platformer`,thumb:`images/thumbnails/slope.jpg`},{slug:`subwaysurfers`,name:`Subway Surfers`,category:`Platformer`,thumb:`images/thumbnails/subwaysurfers.jpeg`},{slug:`flappy`,name:`Flappy Bird`,category:`Mobile`,thumb:`images/thumbnails/flappybird.jpg`},{slug:`papaspizzaria`,name:`Papa's Pizzaria`,category:`Simulation`,thumb:`images/thumbnails/papaspizzeria.jpg`},{slug:`papasburgeria`,name:`Papa's Burgeria`,category:`Simulation`,thumb:`images/thumbnails/papasburgeria.jpg`},{slug:`sm64`,name:`Super Mario 64`,category:`Platformer`,thumb:`images/thumbnails/sm64.jpg`},{slug:`run3`,name:`Run 3`,category:`Platformer`,thumb:`images/thumbnails/run3.jpg`},{slug:`1v1lol`,name:`1v1.LOL`,category:`Arcade`,thumb:`images/thumbnails/1v1lol.jpg`},{slug:`2048`,name:`2048`,category:`Puzzle`,thumb:`images/thumbnails/2048.png`},{slug:`bitlife`,name:`BitLife`,category:`Simulation`,thumb:`images/thumbnails/bitlife.jpg`},{slug:`retrobowl`,name:`Retro Bowl`,category:`Arcade`,thumb:`images/thumbnails/retrobowl.jpg`},{slug:`cookieclicker`,name:`Cookie Clicker`,category:`Simulation`,thumb:`images/thumbnails/cookieclicker.png`},{slug:`drifthunters`,name:`Drift Hunters`,category:`Arcade`,thumb:`images/thumbnails/drifthunters.jpg`},{slug:`drivemad`,name:`Drive Mad`,category:`Arcade`,thumb:`images/thumbnails/drivemad.jpg`},{slug:`geometrydash`,name:`Geometry Dash`,category:`Platformer`,thumb:`images/thumbnails/geometrydash.png`},{slug:`motox3m`,name:`Moto X3M`,category:`Arcade`,thumb:`images/thumbnails/motox3m.jpg`},{slug:`amongus`,name:`Among Us`,category:`Adventure`,thumb:`images/thumbnails/amongus.png`},{slug:`basketrandom`,name:`Basket Random`,category:`Arcade`,thumb:`images/thumbnails/basketrandom.jpeg`},{slug:`stickmanhook`,name:`Stickman Hook`,category:`Platformer`,thumb:`images/thumbnails/stickmanhook.jpg`},{slug:`monkeymart`,name:`Monkey Mart`,category:`Simulation`,thumb:`images/thumbnails/monkeymart.png`},{slug:`10minutestilldawn`,name:`10 Minutes Till Dawn`,category:`Arcade`,thumb:`images/thumbnails/10minutestilldawn.png`},{slug:`adofai`,name:`A Dance of Fire and Ice`,category:`Arcade`,thumb:`images/thumbnails/adofai.png`},{slug:`adventurecapitalist`,name:`AdVenture Capitalist`,category:`Simulation`,thumb:`images/thumbnails/adventurecapitalist.jpg`},{slug:`ageofwar`,name:`Age of War`,category:`Adventure`,thumb:`images/thumbnails/ageofwar.jpg`},{slug:`baldisbasics`,name:`Baldi's Basics`,category:`Adventure`,thumb:`images/thumbnails/baldisbasics.jpg`},{slug:`burritobison`,name:`Burrito Bison`,category:`Arcade`,thumb:`images/thumbnails/burritobison.jpg`},{slug:`chess`,name:`Chess`,category:`Puzzle`,thumb:`images/thumbnails/chess.png`},{slug:`crossyroad`,name:`Crossy Road`,category:`Arcade`,thumb:`images/thumbnails/crossyroad.jpg`},{slug:`doodlejump`,name:`Doodle Jump`,category:`Mobile`,thumb:`images/thumbnails/doodlejump.png`},{slug:`ducklife4`,name:`Duck Life 4`,category:`Adventure`,thumb:`images/thumbnails/ducklife4.png`},{slug:`fnaf`,name:`Five Nights at Freddy's`,category:`Adventure`,thumb:`images/thumbnails/fnaf.jpg`},{slug:`fruitninja`,name:`Fruit Ninja`,category:`Mobile`,thumb:`images/thumbnails/fruitninja.png`},{slug:`happywheels`,name:`Happy Wheels`,category:`Platformer`,thumb:`images/thumbnails/happywheels.jpg`},{slug:`jetpackjoyride`,name:`Jetpack Joyride`,category:`Mobile`,thumb:`images/thumbnails/jetpackjoyride.jpg`},{slug:`minesweeper`,name:`Minesweeper`,category:`Puzzle`,thumb:`images/thumbnails/minesweeper.png`},{slug:`ovo`,name:`OvO`,category:`Platformer`,thumb:`images/thumbnails/ovo.png`},{slug:`pacman`,name:`Pac-Man`,category:`Arcade`,thumb:`images/thumbnails/pacman.jpg`},{slug:`rooftopsnipers`,name:`Rooftop Snipers`,category:`Arcade`,thumb:`images/thumbnails/rooftopsnipers.jpg`},{slug:`tetris`,name:`Tetris`,category:`Puzzle`,thumb:`images/thumbnails/tetris.png`},{slug:`tinyfishing`,name:`Tiny Fishing`,category:`Mobile`,thumb:`images/thumbnails/tinyfishing.jpg`}];function dt(e=ct){let t=e.replace(/\/+$/,``);return ut.map(e=>{let n=`${t}/games/${e.slug}/index.html`;return{id:`seraph:${e.slug}`,provider:`seraph`,name:e.name,slug:e.slug,category:e.category,url:n,baseUrl:`${t}/games/${e.slug}/`,cover:`${t}/${e.thumb}`,featured:!0}})}var ft=`https://cdn.jsdelivr.net/gh/gmshelf/truffled@main`,pt=`https://cdn.jsdelivr.net/gh/gmshelf/ckv@main`,mt=`https://cdn.jsdelivr.net/gh/gmshelf/ugs@main`,ht=[{collection:`truffled`,cdnBase:ft,manifestUrls:[`${ft}/truffled.json`,`https://fastly.jsdelivr.net/gh/gmshelf/truffled@main/truffled.json`,`https://gcore.jsdelivr.net/gh/gmshelf/truffled@main/truffled.json`]},{collection:`ckv`,cdnBase:pt,manifestUrls:[`${pt}/ckv.json`,`https://fastly.jsdelivr.net/gh/gmshelf/ckv@main/ckv.json`]},{collection:`ugs`,cdnBase:mt,manifestUrls:[`${mt}/ugs.json`,`https://fastly.jsdelivr.net/gh/gmshelf/ugs@main/ugs.json`]}];function gt(e,t){let n=`${e} ${t}`.toLowerCase();return/soccer|basket|bowl|football|drift|drive|moto|racing|kart|golf|baseball|hockey|cup|slope/.test(n)?`Sports & Racing`:/2048|chess|sudoku|puzzle|tetris|minesweeper|wordle|portal|unblock|mahjong|cut the rope/.test(n)?`Puzzle`:/mario|celeste|ovo|run 3|run3|geometry|subway|stickman|platform|climbing|happy wheels|antonblast|hollow/.test(n)?`Platformer`:/bitlife|papa|cookie|mart|tycoon|craft|sim|animal crossing|stardew|farming|capitalist|clicker/.test(n)?`Simulation`:/1v1|dawn|doom|fnaf|undertale|deltarune|cuphead|hotline|smash|sniper|shooter|vampire|gun|combat|knight|roguelike/.test(n)?`Action`:`Arcade`}var _t=[{slug:`10minutestilldawn`,name:`10 Minutes Till Dawn`,coverFile:`10.webp`},{slug:`1v1lol`,name:`1v1.LOL`,entryFile:`1v1.html`,coverFile:`1v1.webp`},{slug:`2048`,name:`2048`,coverFile:`2048.webp`},{slug:`asmallworldcup`,name:`A Small World Cup`,entryFile:`aswc.html`},{slug:`angrybirdsonline`,name:`Angry Birds Online`,entryFile:`angrybirdsonline.html`},{slug:`animalcrossingwildworld`,name:`Animal Crossing Wild World`,entryFile:`acww.html`},{slug:`antonblast`,name:`Antonblast`,entryFile:`anton.html`},{slug:`balatro`,name:`Balatro`},{slug:`basketballstars`,name:`Basketball Stars`},{slug:`bitlife`,name:`BitLife`},{slug:`celeste`,name:`Celeste`},{slug:`clusterrush`,name:`Cluster Rush`},{slug:`cookieclicker`,name:`Cookie Clicker`},{slug:`crossyroad`,name:`Crossy Road`},{slug:`cuphead`,name:`Cuphead`},{slug:`deltarune`,name:`Deltarune`},{slug:`doom`,name:`DOOM`},{slug:`drifthunters`,name:`Drift Hunters`},{slug:`drivemad`,name:`Drive Mad`},{slug:`ducklife4`,name:`Duck Life 4`},{slug:`fnaf`,name:`Five Nights at Freddy's`},{slug:`fridaynightfunkin`,name:`Friday Night Funkin'`},{slug:`geometrydash`,name:`Geometry Dash`},{slug:`hollowknight`,name:`Hollow Knight`},{slug:`hotlinemiami`,name:`Hotline Miami`},{slug:`minecraft`,name:`Minecraft Classic`},{slug:`monkeymart`,name:`Monkey Mart`},{slug:`motox3m`,name:`Moto X3M`},{slug:`omori`,name:`OMORI`},{slug:`ovo`,name:`OvO`},{slug:`papaspizzaria`,name:`Papa's Pizzeria`},{slug:`retrobowl`,name:`Retro Bowl`},{slug:`run3`,name:`Run 3`},{slug:`slope`,name:`Slope`},{slug:`smashkarts`,name:`Smash Karts`},{slug:`subwaysurfers`,name:`Subway Surfers`},{slug:`sm64`,name:`Super Mario 64`},{slug:`terraria`,name:`Terraria`},{slug:`undertale`,name:`Undertale`},{slug:`vampiresurvivors`,name:`Vampire Survivors`}];function vt(e=ft){let t=e.replace(/\/+$/,``);return _t.map(e=>{let n=e.entryFile||`index.html`,r=`${t}/truffled/${e.slug}/${n}`,i=e.coverFile||`${e.slug}.webp`;return{id:`gmshelf:truffled:${e.slug}`,provider:`gmshelf`,name:e.name,slug:e.slug,collection:`truffled`,category:gt(e.name,e.slug),url:r,baseUrl:`${t}/truffled/${e.slug}/`,cover:`${t}/covers/${i}`,featured:!0}})}var yt=[`Octopuses have three hearts: two pump blood to the gills, and one pumps it to the rest of the body.`,`Honey never spoils — archaeologists have tasted 3,000-year-old honey from Egyptian tombs that was still edible.`,`A day on Venus is longer than a year on Venus because it rotates more slowly than it orbits the Sun.`,`Bananas are botanically classified as berries, while strawberries are not.`,`Sharks existed on Earth before trees — shark fossils date back over 400 million years.`,`Wombat droppings are cube-shaped, helping them stay put on rocks to mark territory.`,`The Eiffel Tower grows roughly 15 centimeters taller during hot summer days due to thermal expansion.`,`Sea otters hold hands while sleeping in water so they do not drift apart.`,`Neutron stars are so dense that a single teaspoon of their matter would weigh billions of tons.`,`Cleopatra lived closer in time to the Moon landing than to the construction of the Great Pyramid of Giza.`,`Oxford University is older than the Aztec Empire — teaching began in Oxford around 1096.`,`Hot water can sometimes freeze faster than cold water under specific conditions, known as the Mpemba effect.`,`There are more possible iterations of a chess game than there are atoms in the observable universe.`,`A group of flamingos is officially called a flamboyance.`,`Sloths can hold their breath longer than dolphins by slowing their heart rate to a third of normal.`,`The human nose can distinguish more than one trillion distinct scents.`,`Saturn’s moon Titan has thick nitrogen clouds and rivers and lakes made of liquid methane.`,`Koalas have fingerprints nearly indistinguishable from human fingerprints, even under a microscope.`,`Scotland’s national animal is the unicorn, chosen in the 14th century as a symbol of purity and chivalry.`,`A bolt of lightning is roughly five times hotter than the surface of the Sun.`,`Dolphins give each other unique signature whistles that function much like personal names.`,`The first computer bug was an actual moth found stuck inside a Harvard Mark II relay in 1947.`,`Light takes only about 1.28 seconds to travel from the Moon to Earth.`,`Pineapples take nearly two years to grow from planting to harvest.`,`An adult blue whale’s heart weighs roughly as much as a small car and beats only 8–10 times per minute underwater.`,`The shortest war in recorded history lasted between 38 and 45 minutes (Anglo-Zanzibar War, 1896).`,`Crows can recognize individual human faces and even pass warnings about threatening people to their chicks.`,`Glass is neither a true liquid nor a classic crystal — it is an amorphous solid.`,`Nintendo was founded in 1889 in Kyoto as a handmade playing-card company.`,`Water expands by about 9% when it freezes, which is why icebergs float.`,`Mars appears red because its surface dust is rich in iron oxide — essentially rust.`,`A hummingbird’s wings beat up to 80 times per second, allowing it to hover and fly backward.`,`The Great Barrier Reef is the largest living structure on Earth and is visible from orbit.`,`Some bamboo species can grow up to 91 centimeters (35 inches) in a single day.`,`Voyager 1, launched in 1977, is the farthest human-made object from Earth and still transmits radio signals.`,`Humans share roughly 60% of their DNA with bananas.`,`Antarctica is technically Earth’s largest desert because it receives very little annual precipitation.`,`Bees can perceive ultraviolet light patterns on flower petals that are invisible to humans.`,`On Jupiter and Saturn, intense atmospheric pressure can compress carbon into falling diamond rain.`,`The wood frog of North America can survive freezing solid for weeks during winter and thaw alive in spring.`,`Sound travels more than four times faster in water than in air.`,`An apple floats in water because roughly 25% of its volume is air.`,`The Pacific Ocean is wider than the Moon’s diameter at its widest point.`,`A single strand of spider silk is stronger than a steel strand of the exact same thickness.`,`Butterflies taste food using chemoreceptors located on their feet.`,`The letter J was the last letter added to the modern English alphabet in the 1500s.`,`Bubble wrap was originally invented in 1957 as textured 3D plastic wallpaper.`,`Pluto’s surface area is slightly smaller than the land area of Russia.`,`Cats spend roughly 70% of their lives sleeping.`,`A flock of crows is called a murder, while a group of owls is called a parliament.`,`Polar bear fur is actually transparent and hollow — it only looks white because it scatters visible light.`,`Your stomach lining completely replaces itself every few days to avoid digesting itself.`,`In 1969, the Apollo 11 guidance computer had less memory and processing power than a modern USB-C charger.`,`The Sahara Desert transforms into a lush green savannah roughly every 20,000 years due to Earth’s axial tilt cycle.`,`There are more trees on Earth (around 3 trillion) than stars in the Milky Way galaxy.`,`Pigeons can learn to distinguish between paintings by Monet and Picasso in controlled studies.`,`Mantis shrimp can strike with an acceleration comparable to a .22 caliber bullet, boiling water around their claws.`,`Carrots were originally purple and yellow before orange varieties were bred in the Netherlands in the 17th century.`,`The longest musical piece ever composed is John Cage’s ASLSP, currently being played on an organ in Germany for 639 years.`,`Clouds look weightless, yet an average cumulus cloud weighs roughly 500 metric tons.`,`A chameleon’s tongue can accelerate faster than a fighter jet and reach twice its body length.`,`Venus rotates clockwise, opposite to nearly every other planet in our solar system.`,`Squirrels accidentally plant thousands of trees every year simply by forgetting where they buried their acorns.`,`The world’s oldest known wooden wheel is over 5,100 years old, discovered in Slovenia.`,`Tardigrades ("water bears") can survive extreme temperatures, crushing ocean depths, and even the vacuum of space.`,`Earth’s core is roughly as hot as the surface of the Sun — around 5,500 °C.`,`A single Google search uses roughly the energy needed to turn on a 60W lightbulb for 17 seconds, though modern chips cut that sharply.`,`Giraffes and humans both have exactly seven neck vertebrae.`,`The Mona Lisa has no clearly visible eyebrows or eyelashes.`,`An octopus has nine brains: one central brain plus one mini-brain in each of its eight arms.`,`Chocolate was once used as currency by the Aztecs.`,`Mount Everest grows roughly 4 millimeters taller each year due to tectonic plate collision.`,`Peanuts are not true nuts — they are legumes that grow underground.`,`The color orange was named after the fruit, not the other way around; before that, English speakers called it "yellow-red".`,`At the bottom of the Mariana Trench, water pressure exceeds 1,000 atmospheres — over 8 tons per square inch.`,`Elephants are the only mammals that cannot jump.`,`Every planet in our solar system could fit side-by-side in the distance between Earth and the Moon, with room to spare.`,`Dragonflies have a hunting success rate around 95%, making them one of nature’s most efficient predators.`,`The first webcam ever built was pointed at a coffee pot at Cambridge University in 1991 so researchers wouldn’t walk down empty-handed.`,`Your fingernails grow about four times faster than your toenails.`,`A jellyfish known as Turritopsis dohrnii can revert its cells back to an earlier stage, making it biologically immortal.`,`The total weight of all ants on Earth rivals or exceeds the combined weight of all wild birds and mammals.`,`Astronauts grow up to 5 centimeters taller in microgravity because their spinal discs decompress.`,`The word "robot" comes from the Czech word "robota," meaning forced labor, coined in a 1920 play.`,`Raindrops aren’t shaped like teardrops — surface tension flattens them into tiny hamburger-bun domes as they fall.`,`Starfish have no brains and no blood; they circulate filtered seawater through a water vascular system.`,`On Mercury, extreme temperature swings take the surface from 430 °C in daylight down to -180 °C at night.`,`A piano has 88 keys, spanning slightly more than seven octaves.`,`Kangaroos cannot walk backward due to their large muscular tail and hind-limb anatomy.`,`The Library of Congress holds over 170 million items across more than 800 miles of bookshelves.`,`Snakes smell with their tongues by carrying scent particles up to the Jacobson’s organ in the roof of their mouths.`,`Copper surfaces naturally neutralize many bacteria within hours through the oligodynamic effect.`,`Some turtles can absorb oxygen through specialized blood vessels in their rear end while hibernating underwater.`,`The Sun accounts for 99.86% of all mass in the entire solar system.`,`Morse code was invented by Samuel Morse, who was originally a portrait painter.`,`Iceland has no native mosquitoes due to its rapidly fluctuating oceanic freeze-thaw cycles.`,`A single lightning flash carries enough energy to toast roughly 100,000 slices of bread.`,`Platypuses glow blue-green under ultraviolet light, a phenomenon called biofluorescence.`,`The fastest wind speed recorded on Neptune reaches over 2,100 kilometers per hour — supersonic speed.`,`Freshwater lakes hold less than 1% of Earth’s water, yet they support over 40% of all fish species.`,`Cheetahs cannot roar; instead, they chirp, purr, and meow like giant housecats.`,`DNA inside a single human cell would stretch about 2 meters long if uncoiled.`,`In 1903, the Wright brothers’ first powered flight covered 120 feet — shorter than the wingspan of a Boeing 747.`,`Lobsters taste with tiny hairs on their legs and feet.`,`Auroras happen when charged solar wind particles collide with oxygen and nitrogen high in Earth’s magnetic field.`,`A day on Jupiter lasts just under 10 hours, making it the fastest-spinning planet in the solar system.`,`The world’s quietest anechoic chamber is so silent you can hear your own heartbeat and blood flowing.`,`Hippo sweat turns reddish-orange in sunlight and acts as both natural sunscreen and antibiotic.`,`Every time you shuffle a standard 52-card deck thoroughly, the resulting order has likely never existed before in history.`,`Trees in a forest share nutrients and chemical warning signals underground through symbiotic fungal networks.`,`The speed of light in vacuum is exactly 299,792,458 meters per second — defining the meter itself.`,`Axolotls can regenerate entire limbs, spinal cord segments, and even parts of their hearts and brains.`,`The tiny pocket above the main right pocket on jeans was originally designed in the 1870s to hold a pocket watch.`,`Whale songs can travel hundreds of miles through deep ocean sound channels.`,`The golden ratio (approximately 1.618) appears in sunflower seed spirals, pinecones, and nautilus shell geometry.`],bt=[`Hypnotic Waves`,`Sacred Geometry`,`Particle Nebula`,`Matrix & Cyber`,`Liquid Gradients`,`Minimalist Flow`],xt={"Hypnotic Waves":[`Sine Harmonics`,`Oceanic Swell`,`Resonant Ribbon`,`Tidal Whisper`,`Acoustic Drift`,`Standing Wave`,`Phase Interference`,`Boreal Currents`,`Silk Undulation`,`Pendulum Echo`,`Chorus Ribbons`,`Subharmonic Flow`,`Prism Oscillations`,`Spectral Crest`,`Zenith Tide`,`Drift Horizon`,`Harmonic Cascade`],"Sacred Geometry":[`Flower of Life`,`Metatron Orbits`,`Golden Mandala`,`Fibonacci Spiral`,`HexaLattice Spin`,`Rosette Bloom`,`Astral Compass`,`Polyhedral Prism`,`Vesica Rings`,`Lissajous Lotus`,`Octagon Kaleido`,`Spirograph Crown`,`Euclidean Orbit`,`Harmonic Mandala`,`Celestial Astrolabe`,`Infinite Knot`,`Solar Spiro`],"Particle Nebula":[`Constellation Mesh`,`Supernova Dust`,`Orion Drift`,`Firefly Canopy`,`Galaxy Core`,`Biolume Spores`,`Comet Shower`,`Gravity Well`,`Pulsar Halo`,`Deep Starfield`,`Stardust Veil`,`Orbital Cluster`,`Photosphere`,`Photon Drift`,`Nebula Filament`,`Ion Cloud`,`Quasar Bloom`],"Matrix & Cyber":[`Emerald Rain`,`Synth Horizon Grid`,`Cyber Tunnel`,`Oscilloscope Trace`,`Hex Stream`,`Radar Telemetry`,`Circuit Pulse`,`Neon Vector Floor`,`Laser Lattice`,`Wireframe Peaks`,`Subroutine Waterfall`,`Sonar Sweep`,`Binary Mist`,`Retro CRT Scan`,`Fiber Matrix`,`Telemetry Orbit`],"Liquid Gradients":[`Mercury Caustics`,`Plasma Veil`,`Velvet Smoke`,`Oil Prism`,`Lava Drift`,`Silk Aurora`,`Thermal Plume`,`Liquid Gold`,`Chroma Tide`,`Glass Refraction`,`Obsidian Ripple`,`Molten Coral`,`Mist Cauldron`,`Ether Flow`,`Fluid Bloom`,`Pearl Current`,`Iridescent Gel`],"Minimalist Flow":[`Whisper Mist`,`Topo Contours`,`Breathable Dots`,`Fine Horizon`,`Calm Vector`,`Zen Ripples`,`Monolith Grid`,`Soft Breath`,`Paper Grain Drift`,`Silent Isobar`,`Nordic Fog`,`Cloud Contour`,`Quiet Meridian`,`Subtle Spark`,`Dusk Horizon`,`Linen Drift`]},St={"Hypnotic Waves":[`waves`,`flow`,`rings`],"Sacred Geometry":[`sacred`,`rings`,`tunnel`],"Particle Nebula":[`nebula`,`constellation`,`tunnel`],"Matrix & Cyber":[`matrix`,`cybergrid`,`tunnel`],"Liquid Gradients":[`liquid`,`caustics`,`flow`],"Minimalist Flow":[`minimal`,`flow`,`rings`]},Ct=(()=>{let e=[],t=0;for(let n of bt){let r=xt[n],i=St[n];for(let a=0;a<r.length;a++){let o=r[a];e.push({id:`abg-${n.toLowerCase().replace(/[^a-z0-9]+/g,`-`)}-${a+1}`,name:o,category:n,algo:i[a%i.length],speedMul:Number((.65+t%7*.14).toFixed(2)),density:16+t*7%44,hueOffset:t*23%360,paramA:2+a%7,paramB:1.1+a%5*.35}),t+=1}}return e})(),wt=[`Aurora`,`Sunset`,`Cyber Neon`,`Deep Ocean`,`Pastel Calm`,`Midnight`],Tt={Aurora:[`Borealis Curtain`,`Polar Mint`,`Glacial Emerald`,`Solar Wind Veil`,`Arctic Glow`,`Nordic Ribbon`,`Ionized Sky`,`Tundra Shimmer`,`Magnetosphere`,`Fjord Haze`,`Frostfire Drift`,`Aurora Teal`,`Spectral Zenith`,`Luminous Ice`,`Starlight Veil`,`Subarctic Wave`,`Emerald Solstice`],Sunset:[`Amber Horizon`,`Tangerine Dusk`,`Crimson Sundown`,`Coral Flamingo`,`Desert Mirage`,`Golden Hour`,`Volcanic Dusk`,`Terracotta Fade`,`Peach Mirage`,`Saffron Glow`,`Caldera Ember`,`Canyon Twilight`,`Rosy Alpenglow`,`Honeyed Dusk`,`Apricot Breeze`,`Copper Skyline`,`Velvet Sundown`],"Cyber Neon":[`Synthwave Drive`,`Plasma Arc`,`Laser Grid`,`Hyper Cyan`,`Electric Orchid`,`Neon Tokyo`,`Overdrive Violet`,`Voltage Lime`,`Hologram Pulse`,`Arcade Flash`,`Ion Magenta`,`Circuit Blue`,`Chromic Flux`,`Turbo Ultraviolet`,`Matrix Glow`,`Vector Beam`,`Cybernetic Bloom`],"Deep Ocean":[`Mariana Trench`,`Bioluminescent Bay`,`Cobalt Abyss`,`Coral Reef Drift`,`Pacific Swell`,`Kelp Shadow`,`Pelagic Blue`,`Lagoon Tide`,`Midnight Atoll`,`Sunken Pearl`,`Aegean Depth`,`Tidal Basin`,`Seafoam Mist`,`Nautilus Deep`,`Glacier Current`,`Harbor Dusk`,`Azure Current`],"Pastel Calm":[`Lavender Mist`,`Sakura Breeze`,`Matcha Cloud`,`Cotton Candy`,`Mint Sorbet`,`Peach Milk`,`Cloud Nine`,`Iris Silk`,`Vanilla Sky`,`Periwinkle Soft`,`Powder Rose`,`Pistachio Dream`,`Lilac Dew`,`Morning Blossom`,`Misty Apricot`,`Soft Horizon`],Midnight:[`Obsidian Velvet`,`Nocturne Plum`,`Eclipse Shadow`,`Dark Sapphire`,`Moonlit Slate`,`Starless Void`,`Inkwell Indigo`,`Shadow Onyx`,`Deep Garnet`,`Charcoal Nebula`,`Carbon Frost`,`Twilight Charcoal`,`Dusk Espresso`,`Blackberry Night`,`Umbra Glow`,`Phantom Blue`]},Et={Aurora:[[`#042f2e`,`#059669`,`#22d3ee`],[`#0f172a`,`#10b981`,`#818cf8`],[`#022c22`,`#2dd4bf`,`#a78bfa`],[`#064e3b`,`#34d399`,`#38bdf8`]],Sunset:[[`#431407`,`#ea580c`,`#fb7185`],[`#4c0519`,`#f43f5e`,`#f59e0b`],[`#3b0764`,`#ec4899`,`#fb923c`],[`#27272a`,`#d97706`,`#f43f5e`]],"Cyber Neon":[[`#1e1b4b`,`#e879f9`,`#22d3ee`],[`#052e16`,`#00ff88`,`#06b6d4`],[`#2e1065`,`#ff4ecd`,`#3b82f6`],[`#09090b`,`#f43f5e`,`#8b5cf6`]],"Deep Ocean":[[`#020617`,`#0369a1`,`#06b6d4`],[`#082f49`,`#0284c7`,`#2dd4bf`],[`#0c0a2a`,`#1d4ed8`,`#38bdf8`],[`#042f2e`,`#0e7490`,`#6366f1`]],"Pastel Calm":[[`#1e1b2e`,`#c4b5fd`,`#fbcfe8`],[`#1c1926`,`#99f6e4`,`#a5f3fc`],[`#231b22`,`#fda4af`,`#fed7aa`],[`#19212a`,`#bae6fd`,`#ddd6fe`]],Midnight:[[`#050508`,`#1e1b4b`,`#312e81`],[`#09090b`,`#27272a`,`#3f3f46`],[`#0b0608`,`#3b0764`,`#4c0519`],[`#020617`,`#0f172a`,`#1e3a5f`]]};function Dt(e,t){let n=e.replace(`#`,``),r=parseInt(n.slice(0,2),16)/255,i=parseInt(n.slice(2,4),16)/255,a=parseInt(n.slice(4,6),16)/255,o=Math.max(r,i,a),s=Math.min(r,i,a),c=0,l=0,u=(o+s)/2;if(o!==s){let e=o-s;l=u>.5?e/(2-o-s):e/(o+s),c=o===r?(i-a)/e+(i<a?6:0):o===i?(a-r)/e+2:(r-i)/e+4,c/=6}let d=((c*360+t)%360+360)%360/360,f=(e,t,n)=>{let r=n;return r<0&&(r+=1),r>1&&--r,r<1/6?e+(t-e)*6*r:r<1/2?t:r<2/3?e+(t-e)*(2/3-r)*6:e},p=u<.5?u*(1+l):u+l-u*l,m=2*u-p;return`#${[Math.round(f(m,p,d+1/3)*255),Math.round(f(m,p,d)*255),Math.round(f(m,p,d-1/3)*255)].map(e=>e.toString(16).padStart(2,`0`)).join(``)}`}var Ot=(()=>{let e=[],t=[`shift`,`pulse`,`conic`],n=0;for(let r of wt){let i=Tt[r],a=Et[r];for(let o=0;o<i.length;o++){let s=a[o%a.length],c=o*11%36;e.push({id:`dcbg-${r.toLowerCase().replace(/[^a-z0-9]+/g,`-`)}-${o+1}`,name:i[o],category:r,colors:[Dt(s[0],c),Dt(s[1],c),Dt(s[2],c)],angle:(115+n*17)%360,mode:t[n%t.length]}),n+=1}}return e})(),kt=[`Modern Sans`,`Geometric`,`Monospace & Code`,`Futuristic & Tech`,`Serif & Editorial`,`Cursive & Calligraphy`,`Handwritten & Display`],At={"Modern Sans":`Plus Jakarta Sans.DM Sans.Manrope.Public Sans.Work Sans.Rubik.Nunito.Nunito Sans.Mulish.Karla.Barlow.Quicksand.Raleway.Poppins.Figtree.Sora.Albert Sans.Hanken Grotesk.Onest.Red Hat Display.Red Hat Text.Lexend.Lexend Deca.Atkinson Hyperlegible.Lato.Open Sans.Noto Sans.Source Sans 3.IBM Plex Sans.Fira Sans.Cabin.Hind.Heebo.Assistant.Catamaran.Dosis.Exo.Titillium Web.Overpass.Signika.Asap.Varela Round.Chivo.Prompt.Kanit.Sarabun.Instrument Sans.Schibsted Grotesk.Bricolage Grotesque.Golos Text`.split(`.`),Geometric:`Outfit.Urbanist.Jost.Josefin Sans.Montserrat.Questrial.Comfortaa.Syncopate.Syne.Archivo.Epilogue.Kumbh Sans.Readex Pro.Be Vietnam Pro.Sen.Viga.Righteous.Didact Gothic.Monda.Niramit.K2D.Kodchasan.KoHo.Bai Jamjuree.Thasadith.Fahkwang.Palanquin.Alegreya Sans.Oxygen.Cantarell.Gudea.Pontano Sans.Telex.Voltaire.Paytone One.Francois One.Yanone Kaffeesatz.Oswald.Barlow Condensed.Antonio.Big Shoulders Display.Staatliches.Bebas Neue`.split(`.`),"Monospace & Code":`JetBrains Mono.IBM Plex Mono.Fira Code.Source Code Pro.Space Mono.Inconsolata.Roboto Mono.DM Mono.Ubuntu Mono.Azeret Mono.Anonymous Pro.VT323.Share Tech Mono.Victor Mono.Martian Mono.Spline Sans Mono.Courier Prime.Cousine.Nanum Gothic Coding.Overpass Mono.Oxygen Mono.PT Mono.Red Hat Mono.Syne Mono.Xanh Mono.Major Mono Display.Nova Mono.Cutive Mono.B612 Mono.Fira Mono.Chivo Mono.Sono.Fragment Mono.Georama.Lilex`.split(`.`),"Futuristic & Tech":`Orbitron.Exo 2.Rajdhani.Chakra Petch.Michroma.Audiowide.Saira.Saira Condensed.Oxanium.Jura.Electrolize.Quantico.Teko.Iceland.Bruno Ace.Bruno Ace SC.Tektur.Silkscreen.Press Start 2P.Russo One.Black Ops One.Bungee.Bungee Inline.Aldrich.Wallpoet.Keania One.Share Tech.Turret Road.Goldman.Space Grotesk.Nova Square.Geo.Wire One.Megrim.Codystar.Rationale.offside.Krona One.Genos.Tourney.MuseoModerno.Gruppo`.split(`.`),"Serif & Editorial":`Playfair Display.Fraunces.Cormorant Garamond.Bodoni Moda.Cinzel.Lora.Source Serif 4.Merriweather.Libre Baskerville.Crimson Pro.EB Garamond.Spectral.Bitter.Cardo.Vollkorn.DM Serif Display.DM Serif Text.Prata.Marcellus.Yeseva One.Cinzel Decorative.Cormorant.Alegreya.Arvo.Domine.Frank Ruhl Libre.Gelasio.Hepta Slab.Josefin Slab.Literata.Lusitana.Neuton.Noticia Text.Old Standard TT.Philosopher.Podkova.Quattrocento.Rokkitt.Rufina.Sorts Mill Goudy.Tinos.Unna.Vidaloka.Zilla Slab.Newsreader.Instrument Serif`.split(`.`),"Cursive & Calligraphy":`Dancing Script.Great Vibes.Pacifico.Sacramento.Allura.Alex Brush.Caveat.Kaushan Script.Lobster.Satisfy.Parisienne.Tangerine.Marck Script.Pinyon Script.Mr De Haviland.Petit Formal Script.Herr Von Muellerhoff.Italianno.Courgette.Yellowtail.Cookie.Damion.Bad Script.La Belle Aurore.Kristi.Cedarville Cursive.Homemade Apple.Zeyada.Bilbo Swash Caps.Seaweed Script.Niconne.Yesteryear.Rouge Script.Grand Hotel`.split(`.`),"Handwritten & Display":`Shadows Into Light.Indie Flower.Permanent Marker.Kalam.Patrick Hand.Abril Fatface.Anton.Bangers.Alfa Slab One.Unbounded.Fredoka.Amatic SC.Architects Daughter.Berkshire Swash.Boogaloo.Chewy.Covered By Your Grace.Creepster.Gloria Hallelujah.Handlee.Leckerli One.Lilita One.Lobster Two.Luckiest Guy.Merienda.Nothing You Could Do.Orbit.Poiret One.Reenie Beanie.Rock Salt.Titan One.Shrikhand`.split(`.`)};function jt(e){return e.charAt(0).toUpperCase()+e.slice(1)}var Mt=(()=>{let e=new Set,t=[];for(let n of kt){let r=n===`Monospace & Code`?`monospace`:n===`Serif & Editorial`?`serif`:n===`Handwritten & Display`||n===`Cursive & Calligraphy`?`cursive`:`sans-serif`;for(let i of At[n]){let a=jt(i),o=a.toLowerCase().replace(/[^a-z0-9]+/g,`-`);e.has(o)||(e.add(o),t.push({id:o,name:a,category:n,family:a,fallback:r}))}}return t})(),O=[{id:`left-collapsible-default`,name:`Left Collapsible Sidebar`,description:`Classic left glass rail paired with split hero start page.`,navPosition:`left`,railMode:`expanded`,homeLayout:`split`,radius:12,density:`cozy`},{id:`right-sidebar-split`,name:`Right Sidebar`,description:`Moves the primary navigation rail to the right edge.`,navPosition:`right`,railMode:`expanded`,homeLayout:`split`,radius:12,density:`cozy`},{id:`top-horizontal-tabs`,name:`Top Horizontal Tabs`,description:`Full-width top navigation bar with clean horizontal tabs.`,navPosition:`top`,railMode:`expanded`,homeLayout:`normal`,radius:12,density:`cozy`},{id:`floating-dock`,name:`Floating Dock`,description:`Centered bottom glassmorphic dock inspired by macOS.`,navPosition:`dock`,railMode:`compact`,homeLayout:`normal`,radius:16,density:`spacious`},{id:`compact-icon-rail`,name:`Compact Icon Rail`,description:`Slim 58px icon-only left navigation for maximum viewport width.`,navPosition:`left`,railMode:`compact`,homeLayout:`split`,radius:10,density:`compact`},{id:`right-compact-rail`,name:`Right Compact Rail`,description:`Slim icon-only navigation anchored on the right side.`,navPosition:`right`,railMode:`compact`,homeLayout:`side`,radius:10,density:`compact`},{id:`dual-pane-split`,name:`Dual-Pane Split`,description:`Side-by-side command rail with balanced search and launchpad.`,navPosition:`left`,railMode:`expanded`,homeLayout:`side`,radius:12,density:`cozy`},{id:`minimalist-zen`,name:`Minimalist Zen Mode`,description:`Auto-hidden chrome with floating menu button and quiet start page.`,navPosition:`zen`,railMode:`hidden`,homeLayout:`minimal`,radius:14,density:`spacious`},{id:`side-shortcuts-bar`,name:`Side Shortcuts Bar`,description:`Expanded sidebar paired with side-aligned social shortcuts.`,navPosition:`left`,railMode:`expanded`,homeLayout:`side`,radius:12,density:`cozy`},{id:`top-bar-split-hero`,name:`Top Bar + Split Hero`,description:`Horizontal header navigation over the 2-column launchpad.`,navPosition:`top`,railMode:`expanded`,homeLayout:`split`,radius:12,density:`cozy`},{id:`top-bar-minimal`,name:`Top Bar Minimalist`,description:`Sleek top navigation strip with distraction-free minimal search.`,navPosition:`top`,railMode:`compact`,homeLayout:`minimal`,radius:10,density:`compact`},{id:`dock-split-launchpad`,name:`Floating Dock + Launchpad`,description:`Bottom floating dock combined with full app shortcuts grid.`,navPosition:`dock`,railMode:`compact`,homeLayout:`split`,radius:16,density:`cozy`},{id:`dock-zen-focus`,name:`Dock Focus Mode`,description:`Bottom glass dock over minimal center search.`,navPosition:`dock`,railMode:`compact`,homeLayout:`minimal`,radius:18,density:`spacious`},{id:`right-normal-engine`,name:`Right Rail Search Engine`,description:`Right sidebar with classic centered search engine homepage.`,navPosition:`right`,railMode:`expanded`,homeLayout:`normal`,radius:12,density:`cozy`},{id:`right-zen-minimal`,name:`Right Rail Minimal`,description:`Right sidebar paired with minimal omnibar start screen.`,navPosition:`right`,railMode:`compact`,homeLayout:`minimal`,radius:10,density:`compact`},{id:`sharp-command-deck`,name:`Terminal Command Deck`,description:`Crisp 6px corners and compact rail for dense power browsing.`,navPosition:`left`,railMode:`compact`,homeLayout:`normal`,radius:6,density:`compact`},{id:`soft-glass-studio`,name:`Soft Glass Studio`,description:`Rounded 18px containers with roomy top navigation bar.`,navPosition:`top`,railMode:`expanded`,homeLayout:`side`,radius:18,density:`spacious`},{id:`wide-cinema-frame`,name:`Wide Cinema Focus`,description:`Zen auto-hide chrome for full-bleed games, movies, and browsing.`,navPosition:`zen`,railMode:`hidden`,homeLayout:`split`,radius:12,density:`cozy`},{id:`arcade-cabinet`,name:`Arcade Command Frame`,description:`Top navigation bar with high-density shortcut launchpad.`,navPosition:`top`,railMode:`expanded`,homeLayout:`side`,radius:8,density:`compact`},{id:`editorial-left-normal`,name:`Editorial Left + Search`,description:`Full left sidebar paired with centered search engine layout.`,navPosition:`left`,railMode:`expanded`,homeLayout:`normal`,radius:10,density:`spacious`},{id:`floating-side-dock`,name:`Dock + Side Shortcuts`,description:`Bottom floating dock paired with side-column shortcuts.`,navPosition:`dock`,railMode:`compact`,homeLayout:`side`,radius:16,density:`cozy`},{id:`ultra-compact-left`,name:`Ultra-Compact Rail`,description:`Icon-only left rail with minimal center search.`,navPosition:`left`,railMode:`compact`,homeLayout:`minimal`,radius:8,density:`compact`},{id:`zen-normal-search`,name:`Zen Classic Search`,description:`Hidden rail with clean classic search engine view.`,navPosition:`zen`,railMode:`hidden`,homeLayout:`normal`,radius:12,density:`spacious`},{id:`zen-side-panel`,name:`Zen Side Launchpad`,description:`Hidden rail with split side-by-side shortcuts.`,navPosition:`zen`,railMode:`hidden`,homeLayout:`side`,radius:14,density:`cozy`},{id:`top-compact-pill`,name:`Compact Top Ribbon`,description:`Sleek single-row header with sharp 6px controls.`,navPosition:`top`,railMode:`compact`,homeLayout:`split`,radius:6,density:`compact`},{id:`balanced-studio-left`,name:`Balanced Studio Shell`,description:`Soft 16px corners, expanded left rail, and minimal focus.`,navPosition:`left`,railMode:`expanded`,homeLayout:`minimal`,radius:16,density:`spacious`}],Nt=`<svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:76%;height:76%;display:block;" aria-hidden="true"><defs><linearGradient id="vuxPrismG" x1="4" y1="3" x2="32" y2="33" gradientUnits="userSpaceOnUse"><stop offset="0%" stop-color="#ff6b8b"/><stop offset="55%" stop-color="#ff3b6b"/><stop offset="100%" stop-color="#a855f7"/></linearGradient></defs><path d="M18 2.5L31.5 10.2V25.8L18 33.5L4.5 25.8V10.2L18 2.5Z" fill="url(#vuxPrismG)" fill-opacity="0.22" stroke="url(#vuxPrismG)" stroke-width="1.8"/><path d="M9.8 11.8L18 27L26.2 11.8H22L18 19.6L14 11.8H9.8Z" fill="#ffffff"/><path d="M18 19.6L22 11.8H26.2L18 27V19.6Z" fill="url(#vuxPrismG)" fill-opacity="0.9"/><circle cx="18" cy="7.8" r="1.4" fill="#ffffff"/></svg>`,Pt=`<svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><defs><linearGradient id="vuxAiCoreG" x1="3" y1="3" x2="25" y2="25" gradientUnits="userSpaceOnUse"><stop offset="0%" stop-color="#ff5c7c"/><stop offset="100%" stop-color="#38bdf8"/></linearGradient></defs><polygon points="14,2.2 24.5,8.2 24.5,19.8 14,25.8 3.5,19.8 3.5,8.2" stroke="url(#vuxAiCoreG)" stroke-width="1.8" fill="url(#vuxAiCoreG)" fill-opacity="0.16"/><path d="M8.6 9.5L14 19.5L19.4 9.5" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><circle cx="14" cy="8.2" r="1.5" fill="url(#vuxAiCoreG)"/></svg>`;function Ft(e){return JSON.stringify(e).replace(/<\//g,`<\\/`)}function It(e,t){let n=String(e||``).replace(/\/+$/,``),r=`${n}/scramjet-browser.html?${Pe()}`,i=Ft({origin:n,originUrl:n,scramjetSrc:r,defaultWisp:T,renderWispUrl:E,vuxAiTargetUrl:Ee,panicUrl:De,classroomFavicon:Oe,standaloneWindowName:ke,standaloneWindowFeatures:D,themePresets:w.map(e=>({...e,studioCategory:ge(e)})),studioThemeCategories:he,funFacts:yt,animatedBgPresets:Ct,animatedBgCategories:bt,dynamicColorBgPresets:Ot,dynamicColorBgCategories:wt,fontLibrary:Mt,fontCategories:kt,layoutPresets:O,gnCoverUrl:qe,gnHtmlUrl:Je,gnScriptUrls:Ye,staticModules:t.map(e=>({id:`builtin:`+e.slug,provider:`builtin`,name:e.title,category:e.category,url:e.url.startsWith(`/`)?`${n}${e.url}`:e.url,featured:!0})),fallbackUgs:Te(_e).map(e=>({...e,provider:`ugs`})),ckvCdnBase:Re,ckvTreeApiUrl:ze,ckvGmshelfMirrors:Be,fallbackCkv:Ke(Re).map(e=>({...e,provider:`ckv`})),seraphCdnBase:ct,seraphIndexMirrors:lt,fallbackSeraph:dt(ct),gmshelfSources:ht,fallbackGmshelf:vt(),tvmazeShowsUrl:Xe,tvmazeSearchUrl:Ze,archiveFeatureFilmsUrl:Qe,cinemaFallbackShows:nt(),cinemaFallbackMovies:tt(),audioStations:rt,ambientLayers:it,chatChannels:at,badgeDefs:ot,initialChatMessages:st(),adPrelude:me,srcBlocklist:fe.map(e=>({source:e.source,flags:e.flags})),inlineBlocklist:pe.map(e=>({source:e.source,flags:e.flags}))});return`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Vux — Isolated Workspace</title>
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
      --ease: cubic-bezier(0.22, 1, 0.36, 1);
      --ease-spring: cubic-bezier(0.34, 1.45, 0.64, 1);
      --font-display: 'Outfit', 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
      --font-ui: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
      --font-mono: 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
    }

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    html {
      width: 100%;
      height: 100%;
      overflow: hidden;
      background: var(--bg);
    }

    body {
      width: 100%;
      height: 100%;
      overflow: hidden;
      background: transparent;
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
      width: 30px;
      height: 30px;
      border-radius: 9px;
      background: color-mix(in srgb, var(--accent) 14%, var(--surface));
      border: 1px solid color-mix(in srgb, var(--accent) 44%, transparent);
      box-shadow: 0 4px 14px var(--accent-soft);
      color: var(--text);
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
      animation: vuxPanelIn 0.32s var(--ease);
    }

    @keyframes vuxPanelIn {
      from { opacity: 0; transform: translateY(8px) scale(0.994); }
      to { opacity: 1; transform: translateY(0) scale(1); }
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
    }

    @keyframes vbFade {
      from { opacity: 0; transform: translateY(6px); }
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
      content-visibility: auto;
      contain-intrinsic-size: 205px;
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
      font-family: var(--font-display);
      font-size: 12px;
      font-weight: 700;
      letter-spacing: -0.01em;
      color: var(--text);
      background:
        radial-gradient(circle at 22% 18%, color-mix(in srgb, var(--accent) 28%, transparent), transparent 64%),
        linear-gradient(135deg, color-mix(in srgb, var(--accent) 18%, var(--surface-2)) 0%, var(--bg) 100%);
      padding: 12px;
      text-align: center;
      text-shadow: 0 2px 10px rgba(0, 0, 0, 0.55);
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

    /* ---------------- ANIMATED CANVAS & DYNAMIC COLOR BACKGROUND LAYERS ---------------- */
    .vb-dynamic-bg {
      position: fixed;
      inset: 0;
      z-index: 1;
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.45s ease;
    }

    body[data-dyn-bg-on="1"] .vb-dynamic-bg {
      opacity: var(--dyn-bg-opacity, 0.72);
    }

    .vb-bg-canvas {
      position: fixed;
      inset: 0;
      width: 100%;
      height: 100%;
      z-index: 2;
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.4s ease;
    }

    body[data-anim-bg-on="1"] .vb-bg-canvas {
      opacity: var(--anim-bg-opacity, 0.72);
    }

    .app-shell {
      z-index: 3;
      background: transparent;
    }

    .stage-wrap {
      background: transparent;
    }

    body[data-anim-bg-on="1"] .view-scroll,
    body[data-dyn-bg-on="1"] .view-scroll {
      background-color: color-mix(in srgb, var(--bg) 52%, transparent);
      background-image: none;
    }

    /* ---------------- 5-POSITION STUDIO LAYOUT MODES ---------------- */
    body[data-nav-pos="right"] .app-shell {
      flex-direction: row-reverse;
    }
    body[data-nav-pos="right"] .rail {
      border-right: none;
      border-left: 1px solid var(--border);
    }
    body[data-nav-pos="right"] .rail.hidden-rail {
      margin-left: 0;
      margin-right: -232px;
    }
    body[data-nav-pos="right"] .rail-reopen-btn {
      left: auto;
      right: 10px;
    }

    body[data-nav-pos="top"] .app-shell {
      flex-direction: column;
    }
    body[data-nav-pos="top"] .rail {
      width: 100% !important;
      height: 48px;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      padding: 4px 10px;
      border-right: none;
      border-bottom: 1px solid var(--border);
      gap: 6px;
      overflow-x: auto;
      overflow-y: hidden;
      scrollbar-width: thin;
    }
    body[data-nav-pos="top"] .rail::-webkit-scrollbar { height: 3px; }
    body[data-nav-pos="top"] .rail-top,
    body[data-nav-pos="top"] .rail-bottom {
      flex-direction: row;
      align-items: center;
      gap: 3px;
      flex-shrink: 0;
    }
    body[data-nav-pos="top"] .rail-header {
      border-bottom: none;
      margin-bottom: 0;
      padding: 0 6px 0 0;
      min-height: 32px;
    }
    body[data-nav-pos="top"] .rail-group-label,
    body[data-nav-pos="top"] .rail-divider,
    body[data-nav-pos="top"] .rail-ai-quick-wrap,
    body[data-nav-pos="top"] .rail-collapse-btn,
    body[data-nav-pos="top"] #btn-rail-hide {
      display: none !important;
    }
    body[data-nav-pos="top"] .rail-btn {
      width: auto;
      height: 30px;
      padding: 0 8px;
      gap: 5px;
      font-size: 11px;
      flex-shrink: 0;
    }
    body[data-nav-pos="top"] .rail-btn svg {
      width: 14px;
      height: 14px;
    }
    body[data-nav-pos="top"] .rail-label {
      opacity: 1 !important;
      width: auto !important;
    }
    body[data-nav-pos="top"] .rail-badge {
      display: none !important;
    }

    body[data-nav-pos="dock"] .rail {
      position: fixed;
      bottom: 14px;
      left: 50%;
      transform: translateX(-50%);
      width: auto !important;
      max-width: calc(100vw - 24px);
      height: 56px;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      padding: 6px 10px;
      border: 1px solid var(--border-strong);
      border-radius: calc(var(--ui-radius) + 6px);
      box-shadow: 0 22px 52px rgba(0, 0, 0, 0.58);
      z-index: 65;
      gap: 5px;
      overflow-x: auto;
      overflow-y: hidden;
      scrollbar-width: none;
    }
    body[data-nav-pos="dock"] .rail::-webkit-scrollbar { display: none; }
    body[data-nav-pos="dock"] .rail-top,
    body[data-nav-pos="dock"] .rail-bottom {
      flex-direction: row;
      align-items: center;
      gap: 4px;
      flex-shrink: 0;
    }
    body[data-nav-pos="dock"] .rail-header,
    body[data-nav-pos="dock"] .rail-group-label,
    body[data-nav-pos="dock"] .rail-divider,
    body[data-nav-pos="dock"] .rail-label,
    body[data-nav-pos="dock"] .rail-badge {
      display: none !important;
    }
    body[data-nav-pos="dock"] .rail-btn {
      width: 40px;
      height: 40px;
      padding: 0;
      justify-content: center;
      border-radius: calc(var(--ui-radius));
      flex-shrink: 0;
    }

    body[data-nav-pos="zen"] .rail {
      width: 232px;
      margin-left: -232px;
      opacity: 0;
      pointer-events: none;
    }
    body[data-nav-pos="zen"] .rail-reopen-btn {
      display: inline-flex;
    }

    body[data-density="compact"] .view-scroll { padding: 14px 16px 26px; }
    body[data-density="compact"] .container { gap: 12px; }
    body[data-density="spacious"] .view-scroll { padding: 28px 34px 48px; }
    body[data-density="spacious"] .container { gap: 22px; }

    /* ---------------- VUX.AI DEDICATED GLASSMORPHIC WORKSPACE ---------------- */
    .vux-ai-shell {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      padding: 12px 14px 14px;
      gap: 10px;
      min-height: 0;
    }
    .vux-ai-topbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      flex-wrap: wrap;
      padding: 10px 14px;
      border-radius: calc(var(--ui-radius) + 2px);
      background: color-mix(in srgb, var(--surface) 84%, transparent);
      backdrop-filter: blur(var(--glass-blur));
      border: 1px solid var(--border-strong);
      box-shadow: 0 10px 28px rgba(0, 0, 0, 0.28);
    }
    .vux-ai-brand {
      display: flex;
      align-items: center;
      gap: 10px;
      min-width: 0;
    }
    .vux-ai-crest-box {
      width: 34px;
      height: 34px;
      border-radius: 10px;
      background: color-mix(in srgb, var(--accent) 16%, var(--surface-2));
      border: 1px solid color-mix(in srgb, var(--accent) 42%, transparent);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      box-shadow: 0 4px 14px var(--accent-soft);
    }
    .vux-ai-crest-box svg {
      width: 22px;
      height: 22px;
    }
    .vux-ai-status-pill {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 4px 10px;
      border-radius: 8px;
      background: var(--surface-2);
      border: 1px solid var(--border);
      font-family: var(--font-mono);
      font-size: 11px;
      color: var(--muted);
    }
    .vux-ai-stage {
      flex: 1;
      min-height: 0;
      position: relative;
      border-radius: calc(var(--ui-radius) + 4px);
      border: 1px solid var(--border-strong);
      background: color-mix(in srgb, var(--surface) 78%, #070408 22%);
      backdrop-filter: blur(var(--glass-blur));
      overflow: hidden;
      box-shadow: 0 18px 46px rgba(0, 0, 0, 0.42);
    }
    .vux-ai-stage iframe {
      width: 100%;
      height: 100%;
      border: 0;
      display: block;
      background: #0d090f;
    }

    /* ---------------- ANIMATED LOADING SCREEN & WELCOME OVERLAY ---------------- */
    .vb-loader {
      position: fixed;
      inset: 0;
      z-index: 200;
      background: var(--bg);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
      transition: opacity 0.42s var(--ease), visibility 0.42s ease;
    }
    .vb-loader.done {
      opacity: 0;
      visibility: hidden;
      pointer-events: none;
    }
    .vb-loader-canvas {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
    }
    .vb-loader-card {
      position: relative;
      z-index: 2;
      width: min(560px, 100%);
      padding: 26px 24px;
      border-radius: 18px;
      background: color-mix(in srgb, var(--surface) 88%, transparent);
      backdrop-filter: blur(18px);
      border: 1px solid var(--border-strong);
      box-shadow: 0 28px 70px rgba(0, 0, 0, 0.65);
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .vb-loader-bar-track {
      width: 100%;
      height: 6px;
      border-radius: 999px;
      background: var(--surface-2);
      border: 1px solid var(--border);
      overflow: hidden;
    }
    .vb-loader-bar-fill {
      width: 12%;
      height: 100%;
      border-radius: 999px;
      background: linear-gradient(90deg, var(--accent), color-mix(in srgb, var(--accent) 60%, #ffffff));
      transition: width 0.25s ease;
    }
    .vb-loader-fact-box {
      padding: 12px 14px;
      border-radius: 12px;
      background: var(--surface-2);
      border: 1px solid var(--border);
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .vb-welcome-backdrop {
      position: fixed;
      inset: 0;
      z-index: 180;
      background: rgba(5, 2, 3, 0.76);
      backdrop-filter: blur(10px);
      display: none;
      align-items: center;
      justify-content: center;
      padding: 18px;
    }
    .vb-welcome-backdrop.open {
      display: flex;
    }
    .vb-welcome-card {
      width: min(680px, 100%);
      max-height: 90vh;
      overflow-y: auto;
      padding: 24px;
      border-radius: 18px;
      background: var(--surface);
      border: 1px solid var(--border-strong);
      box-shadow: 0 28px 72px rgba(0, 0, 0, 0.72);
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .vb-welcome-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 10px;
    }
    .vb-welcome-tile {
      padding: 12px;
      border-radius: 12px;
      background: var(--surface-2);
      border: 1px solid var(--border);
      display: flex;
      flex-direction: column;
      gap: 4px;
      text-align: left;
      cursor: pointer;
      color: var(--text);
      font-family: var(--font-ui);
      transition: border-color 0.15s var(--ease), transform 0.14s var(--ease);
    }
    .vb-welcome-tile:hover {
      border-color: var(--accent);
      transform: translateY(-1px);
    }

    /* ---------------- STUDIO GRIDS ---------------- */
    .studio-modal-card {
      max-width: 940px;
    }
    .studio-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(175px, 1fr));
      gap: 8px;
      max-height: 330px;
      overflow-y: auto;
      padding-right: 4px;
    }
    .studio-card-btn {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 4px;
      padding: 9px 11px;
      border-radius: 10px;
      border: 1px solid var(--border);
      background: var(--surface-2);
      color: var(--text);
      font-family: var(--font-ui);
      text-align: left;
      cursor: pointer;
      transition: border-color 0.15s var(--ease), transform 0.12s var(--ease);
    }
    .studio-card-btn:hover {
      border-color: var(--accent);
      transform: translateY(-1px);
    }
    .studio-card-btn.active {
      border-color: var(--accent);
      box-shadow: 0 0 0 2px var(--accent-soft);
    }
    .dyn-swatch-bar {
      width: 100%;
      height: 18px;
      border-radius: 6px;
      border: 1px solid rgba(255, 255, 255, 0.14);
    }

    /* ---------------- SMOOTH MICRO-INTERACTIONS & GLASS OVERHAUL ---------------- */
    .card, .panel-box, .studio-card-btn, .preset-item {
      transition: transform 0.24s var(--ease-spring), border-color 0.2s var(--ease), background 0.2s var(--ease), box-shadow 0.24s var(--ease);
    }
    .card:hover {
      transform: translateY(-4px);
      box-shadow: 0 14px 32px rgba(0, 0, 0, 0.34);
    }
    .modal-backdrop.open .modal-card,
    .vb-welcome-backdrop.open .vb-welcome-card {
      animation: vuxModalPop 0.28s var(--ease-spring);
    }
    @keyframes vuxModalPop {
      from { opacity: 0; transform: scale(0.955) translateY(8px); }
      to { opacity: 1; transform: scale(1) translateY(0); }
    }
    body[data-has-fx="1"] .rail {
      background: color-mix(in srgb, var(--rail) 78%, transparent);
    }
    body[data-has-fx="1"] .panel-box,
    body[data-has-fx="1"] .card {
      background: color-mix(in srgb, var(--surface) 74%, transparent);
      backdrop-filter: blur(var(--glass-blur));
    }

    /* ---------------- ONLINE STATUS & LIVE PERF PILL ---------------- */
    .vux-online-badge {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 6px;
      padding: 5px 9px;
      margin: 2px 0 4px;
      border-radius: 9px;
      background: color-mix(in srgb, #10b981 12%, var(--surface));
      border: 1px solid rgba(16, 185, 129, 0.32);
      font-size: 11px;
      font-weight: 700;
      color: var(--text);
      white-space: nowrap;
      overflow: hidden;
    }
    .rail.compact .vux-online-badge,
    body[data-nav-pos="top"] .vux-online-badge,
    body[data-nav-pos="dock"] .vux-online-badge {
      display: none !important;
    }
    .vux-online-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #22c55e;
      box-shadow: 0 0 10px rgba(34, 197, 94, 0.85);
      animation: vuxPulseDot 1.9s ease-in-out infinite;
      flex-shrink: 0;
    }
    @keyframes vuxPulseDot {
      0%, 100% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.28); opacity: 0.72; }
    }
    .vux-perf-pill {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 6px;
      padding: 6px 8px;
      border-radius: 9px;
      background: var(--surface);
      border: 1px solid var(--border);
      font-family: var(--font-mono);
      font-size: 10px;
      color: var(--muted);
      margin-bottom: 2px;
    }
    .rail.compact .vux-perf-pill,
    body[data-nav-pos="top"] .vux-perf-pill,
    body[data-nav-pos="dock"] .vux-perf-pill {
      display: none !important;
    }
    .vux-wake-btn {
      border: 1px solid var(--border-strong);
      background: var(--accent-soft);
      color: var(--accent);
      border-radius: 6px;
      padding: 2px 6px;
      font-family: var(--font-mono);
      font-size: 10px;
      font-weight: 700;
      cursor: pointer;
      transition: background 0.16s ease, transform 0.14s ease;
    }
    .vux-wake-btn:hover { background: var(--accent); color: var(--accent-text); }

    /* ---------------- VUX CHAT (DISCORD STYLE) ---------------- */
    .vux-chat-shell {
      flex: 1;
      min-height: 0;
      display: grid;
      grid-template-columns: 224px minmax(0, 1fr);
      height: 100%;
    }
    @media (max-width: 820px) {
      .vux-chat-shell { grid-template-columns: 1fr; grid-template-rows: auto minmax(0, 1fr); }
    }
    .chat-sidebar {
      background: color-mix(in srgb, var(--rail) 84%, transparent);
      backdrop-filter: blur(var(--glass-blur));
      border-right: 1px solid var(--border);
      padding: 14px 10px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 12px;
      overflow-y: auto;
    }
    .chat-ch-btn {
      width: 100%;
      padding: 8px 10px;
      border-radius: 9px;
      border: 1px solid transparent;
      background: transparent;
      color: var(--muted);
      font-family: var(--font-ui);
      font-size: 13px;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
      text-align: left;
      transition: background 0.16s var(--ease), color 0.16s var(--ease), border-color 0.16s var(--ease);
    }
    .chat-ch-btn:hover { background: var(--surface-2); color: var(--text); }
    .chat-ch-btn.active { background: var(--accent-soft); border-color: var(--accent); color: var(--text); }
    .chat-main {
      display: flex;
      flex-direction: column;
      min-width: 0;
      min-height: 0;
      background: color-mix(in srgb, var(--bg) 60%, transparent);
      backdrop-filter: blur(6px);
    }
    .chat-topbar {
      padding: 12px 18px;
      border-bottom: 1px solid var(--border);
      background: color-mix(in srgb, var(--surface) 78%, transparent);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      flex-wrap: wrap;
    }
    .chat-messages {
      flex: 1;
      min-height: 0;
      overflow-y: auto;
      padding: 16px 18px;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .chat-msg {
      position: relative;
      display: flex;
      gap: 12px;
      padding: 8px 10px;
      border-radius: 11px;
      border: 1px solid transparent;
      transition: background 0.15s ease, border-color 0.15s ease;
      animation: vbFade 0.2s var(--ease);
    }
    .chat-msg:hover {
      background: color-mix(in srgb, var(--surface) 76%, transparent);
      border-color: var(--border);
    }
    .chat-avatar {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-family: var(--font-display);
      font-weight: 800;
      font-size: 14px;
      color: #fff;
      flex-shrink: 0;
    }
    .chat-msg-body { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 4px; }
    .chat-msg-head { display: flex; align-items: baseline; gap: 8px; flex-wrap: wrap; }
    .chat-msg-user { font-size: 13px; font-weight: 700; color: var(--text); }
    .chat-msg-time { font-family: var(--font-mono); font-size: 10px; color: var(--muted); }
    .chat-reply-quote {
      font-size: 11px;
      color: var(--muted);
      padding: 4px 8px;
      border-left: 2px solid var(--accent);
      background: var(--surface-2);
      border-radius: 4px;
    }
    .chat-msg-text { font-size: 13px; line-height: 1.48; color: var(--text); word-break: break-word; }
    .chat-reactions { display: flex; gap: 5px; flex-wrap: wrap; margin-top: 2px; }
    .chat-react-pill {
      padding: 2px 7px;
      border-radius: 999px;
      border: 1px solid var(--border);
      background: var(--surface);
      color: var(--text);
      font-size: 11px;
      cursor: pointer;
    }
    .chat-react-pill:hover { border-color: var(--accent); background: var(--accent-soft); }
    .chat-hover-tools {
      position: absolute;
      top: 6px;
      right: 8px;
      display: flex;
      gap: 4px;
      opacity: 0;
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 2px 4px;
      transition: opacity 0.14s ease;
    }
    .chat-msg:hover .chat-hover-tools { opacity: 1; }
    .chat-tool-btn {
      border: none;
      background: transparent;
      color: var(--muted);
      font-size: 12px;
      cursor: pointer;
      padding: 2px 5px;
      border-radius: 5px;
    }
    .chat-tool-btn:hover { background: var(--accent-soft); color: var(--text); }
    .chat-composer-wrap {
      padding: 10px 16px 14px;
      border-top: 1px solid var(--border);
      background: color-mix(in srgb, var(--surface) 84%, transparent);
      display: flex;
      flex-direction: column;
      gap: 7px;
    }

    /* ---------------- STUDYHUB ALL-IN-ONE MP3 PLAYER & AMBIENT MIXER ---------------- */
    .mp3-station-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
      gap: 10px;
    }
    .mp3-station-card {
      padding: 11px 12px;
      border-radius: 12px;
      border: 1px solid var(--border);
      background: var(--surface-2);
      color: var(--text);
      text-align: left;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      gap: 4px;
      transition: transform 0.2s var(--ease-spring), border-color 0.18s ease, background 0.18s ease;
    }
    .mp3-station-card:hover { border-color: var(--accent); transform: translateY(-2px); }
    .mp3-station-card.active {
      border-color: var(--accent);
      background: var(--accent-soft);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.28);
    }
    .ambient-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      padding: 10px 12px;
      border-radius: 10px;
      background: var(--surface-2);
      border: 1px solid var(--border);
    }

    /* ---------------- COMMAND PALETTE, PIP, NOTES, BADGES, CURSOR ---------------- */
    .vux-cursor-canvas {
      position: fixed;
      inset: 0;
      width: 100%;
      height: 100%;
      z-index: 160;
      pointer-events: none;
    }
    .vux-cmd-backdrop {
      position: fixed;
      inset: 0;
      z-index: 190;
      background: rgba(5, 2, 3, 0.72);
      backdrop-filter: blur(8px);
      display: none;
      align-items: flex-start;
      justify-content: center;
      padding: 9vh 16px 20px;
    }
    .vux-cmd-backdrop.open { display: flex; }
    .vux-cmd-card {
      width: min(620px, 100%);
      background: color-mix(in srgb, var(--surface) 96%, transparent);
      border: 1px solid var(--border-strong);
      border-radius: 16px;
      box-shadow: 0 28px 72px rgba(0, 0, 0, 0.72);
      overflow: hidden;
      display: flex;
      flex-direction: column;
      animation: vuxModalPop 0.22s var(--ease-spring);
    }
    .vux-cmd-results { max-height: 360px; overflow-y: auto; padding: 8px; display: flex; flex-direction: column; gap: 4px; }
    .vux-cmd-item {
      width: 100%;
      padding: 9px 12px;
      border-radius: 10px;
      border: 1px solid transparent;
      background: transparent;
      color: var(--text);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      cursor: pointer;
      text-align: left;
      font-family: var(--font-ui);
    }
    .vux-cmd-item:hover, .vux-cmd-item.selected { background: var(--accent-soft); border-color: var(--accent); }

    .vux-notes-drawer {
      position: fixed;
      top: 14px;
      right: 14px;
      bottom: 14px;
      width: min(360px, 92vw);
      z-index: 84;
      background: color-mix(in srgb, var(--surface) 95%, transparent);
      backdrop-filter: blur(18px);
      border: 1px solid var(--border-strong);
      border-radius: 16px;
      box-shadow: 0 22px 54px rgba(0, 0, 0, 0.65);
      display: flex;
      flex-direction: column;
      padding: 14px;
      gap: 10px;
      transform: translateX(115%);
      transition: transform 0.28s var(--ease);
      pointer-events: none;
    }
    .vux-notes-drawer.open { transform: translateX(0); pointer-events: auto; }

    .vux-pip-widget {
      position: fixed;
      right: 20px;
      bottom: 20px;
      width: 440px;
      height: 300px;
      min-width: 280px;
      min-height: 180px;
      max-width: 92vw;
      max-height: 84vh;
      resize: both;
      overflow: hidden;
      z-index: 150;
      border-radius: 14px;
      background: var(--surface);
      border: 1px solid var(--accent);
      box-shadow: 0 26px 64px rgba(0, 0, 0, 0.7);
      display: none;
      flex-direction: column;
    }
    .vux-pip-widget.open { display: flex; animation: vuxModalPop 0.24s var(--ease-spring); }
    .vux-pip-widget.minimized { height: 40px !important; min-height: 40px !important; resize: none; }
    .vux-pip-head {
      height: 40px;
      padding: 0 10px;
      background: var(--rail);
      border-bottom: 1px solid var(--border);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      cursor: move;
      user-select: none;
      flex-shrink: 0;
    }
    .vux-pip-body { flex: 1; min-height: 0; background: #000; position: relative; }
    .vux-pip-body iframe { width: 100%; height: 100%; border: 0; display: block; background: #fff; }
  </style>
  <style id="vux-user-custom-css"></style>
</head>
<body>
  <div class="vb-dynamic-bg" id="vb-dynamic-bg" aria-hidden="true"></div>
  <canvas class="vb-bg-canvas" id="vb-bg-canvas" aria-hidden="true"></canvas>
  <canvas class="vux-cursor-canvas" id="vux-cursor-canvas" aria-hidden="true"></canvas>

  <div class="app-shell">
    <button type="button" class="rail-reopen-btn" id="btn-rail-reopen" aria-label="Show Sidebar Menu">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
      <span>Vux Menu</span>
    </button>

    <!-- Collapsible Glassmorphic Sidebar Rail -->
    <aside class="rail" id="rail" aria-label="Vux Navigation">
      <div class="rail-top">
        <div class="rail-header">
          <div class="rail-brand">
            <span class="rail-logo-mark">${Nt}</span>
            <span class="rail-logo-name">Vux</span>
          </div>
          <button type="button" class="rail-collapse-btn" id="btn-rail-toggle" aria-expanded="true" aria-label="Collapse or Expand Sidebar" title="Collapse / Expand Sidebar">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
        </div>

        <div class="vux-online-badge" id="vux-online-badge" title="Active Vux browser sessions">
          <span style="display:inline-flex;align-items:center;gap:6px;">
            <span class="vux-online-dot" aria-hidden="true"></span>
            <span>Online Now</span>
          </span>
          <span id="vux-online-count" style="font-family:var(--font-mono);color:#4ade80;">1 active</span>
        </div>

        <button type="button" class="rail-btn" id="btn-rail-cmdk" aria-label="Quick Command Search (Ctrl+K)" title="Quick Search (Ctrl+K)">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <span class="rail-label">Command Search</span>
          <span class="rail-badge">Ctrl+K</span>
        </button>

        <button type="button" class="rail-btn active" data-view="browser" aria-label="Vux Proxy Browser" title="Vux Proxy Browser">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          <span class="rail-label">Vux Browser</span>
        </button>

        <button type="button" class="rail-btn" data-view="chat" aria-label="Vux Discord Community Chat" title="Vux Chat">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          <span class="rail-label">Vux Chat</span>
          <span class="rail-badge" id="badge-chat">4 ch</span>
        </button>

        <button type="button" class="rail-btn" id="btn-rail-ai" data-view="ai" aria-label="Vux.ai Private Assistant" title="Vux.ai">
          ${Pt}
          <span class="rail-label">Vux.ai</span>
          <span class="rail-badge">AI</span>
        </button>

        <div class="rail-group-label">Arcade Hub</div>

        <button type="button" class="rail-btn" data-view="modules" aria-label="All Games Hub" title="All Games">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="6" y1="12" x2="10" y2="12"/><line x1="8" y1="10" x2="8" y2="14"/><line x1="15" y1="13" x2="15.01" y2="13"/><line x1="18" y1="11" x2="18.01" y2="11"/><rect x="2" y="6" width="20" height="12" rx="6"/></svg>
          <span class="rail-label">All Games</span>
          <span class="rail-badge" id="badge-modules">0</span>
        </button>

        <button type="button" class="rail-btn" data-view="seraph" aria-label="Seraph Games Library" title="Seraph Games">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
          <span class="rail-label">Seraph Games</span>
          <span class="rail-badge" id="badge-seraph">0</span>
        </button>

        <button type="button" class="rail-btn" data-view="gmshelf" aria-label="GMShelf Games Library" title="GMShelf Games">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="6" rx="2"/><rect x="3" y="14" width="18" height="6" rx="2"/><line x1="7" y1="7" x2="11" y2="7"/><line x1="7" y1="17" x2="13" y2="17"/></svg>
          <span class="rail-label">GMShelf</span>
          <span class="rail-badge" id="badge-gmshelf">0</span>
        </button>

        <button type="button" class="rail-btn" data-view="ckv" aria-label="CKV Games Library" title="CKV Games">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 19 6.5 19 17.5 12 22 5 17.5 5 6.5 12 2"/><path d="M9.5 12l2 2 3.5-4"/></svg>
          <span class="rail-label">CKV Games</span>
          <span class="rail-badge" id="badge-ckv">0</span>
        </button>

        <div class="rail-divider"></div>
        <div class="rail-group-label">Media &amp; Library</div>

        <button type="button" class="rail-btn" data-view="gnmath" aria-label="gn-math Script and Zones" title="gn-math Script">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
          <span class="rail-label">gn-math Script</span>
          <span class="rail-badge" id="badge-gn">0</span>
        </button>

        <button type="button" class="rail-btn" data-view="movies" aria-label="Movies and TV" title="Movies & TV">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="2.18"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/></svg>
          <span class="rail-label">Movies &amp; TV</span>
        </button>

        <button type="button" class="rail-btn" data-view="books" aria-label="Books and Manga" title="Books & Manga">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
          <span class="rail-label">Books &amp; Manga</span>
        </button>

        <button type="button" class="rail-btn" data-view="music" aria-label="Vux StudyHub MP3 Player" title="MP3 &amp; Ambient Player">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
          <span class="rail-label">MP3 &amp; Ambient</span>
        </button>
      </div>

      <div class="rail-bottom">
        <div class="rail-divider"></div>
        <div class="vux-perf-pill" id="vux-perf-pill">
          <span id="vux-fps-text">60 FPS</span>
          <span id="vux-ping-text">Wisp: --</span>
          <button type="button" class="vux-wake-btn" id="btn-wake-wisp" title="Ping Mercury &amp; Render Wisp servers">Wake</button>
        </div>

        <button type="button" class="rail-btn" id="btn-rail-notes" aria-label="Open Scratchpad Notes" title="Scratchpad Notes">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
          <span class="rail-label">Scratchpad</span>
        </button>

        <button type="button" class="rail-btn" id="btn-rail-badges" aria-label="Daily Streak and Badges" title="Streak &amp; Badges">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>
          <span class="rail-label">Streak &amp; Badges</span>
          <span class="rail-badge" id="badge-streak-days">1d</span>
        </button>

        <button type="button" class="rail-btn" id="btn-rail-standalone-blob" aria-label="Open Standalone :blob Window" title="Open Standalone :blob Window">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
          <span class="rail-label">Standalone :blob</span>
        </button>

        <button type="button" class="rail-btn" id="btn-rail-hide" aria-label="Auto-Hide Sidebar" title="Hide Sidebar for Fullscreen Width">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="3" x2="9" y2="21"/></svg>
          <span class="rail-label">Hide Sidebar</span>
        </button>

        <button type="button" class="rail-btn" id="btn-open-settings" aria-label="Vux Customization Studio &amp; ${w.length} Themes" title="Vux Customization Studio (${w.length} Themes, ${Mt.length}+ Fonts)">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
          <span class="rail-label">Studio Settings</span>
          <span class="rail-badge">${w.length}</span>
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
        <span style="font-weight:800;color:var(--accent);font-size:15px;font-family:var(--font-display);">Vux</span>
        <button type="button" class="btn" id="btn-mobile-panic" style="border-color:rgba(244,63,94,0.4);color:#fda4af;">Panic (Esc)</button>
      </div>

      <!-- 1. Vux Scramjet v2 Frontpage -->
      <section class="view-panel active" id="view-browser" aria-label="Vux Proxy Browser">
        <iframe
          id="valbrowse-proxy-frame"
          title="Vux Scramjet v2 Browser"
          src="${r.replace(/"/g,`&quot;`)}"
          allow="autoplay; gamepad; fullscreen"
          allowtransparency="true"
          referrerpolicy="no-referrer"
          style="width:100%;height:100%;border:0;display:block;background:transparent;"
        ></iframe>
      </section>

      <!-- 1B. Built-In Discord-Styled Community Chat (Vux Chat) -->
      <section class="view-panel" id="view-chat" aria-label="Vux Community Chat Room">
        <div class="vux-chat-shell">
          <div class="chat-sidebar">
            <div style="display:flex;flex-direction:column;gap:8px;">
              <div style="display:flex;align-items:center;justify-content:space-between;padding:0 4px;">
                <span class="eyebrow">Vux Chat Channels</span>
                <span class="sub" id="chat-sync-status">Live Sync</span>
              </div>
              <div id="chat-channel-list" style="display:flex;flex-direction:column;gap:4px;"></div>
            </div>
            <div class="panel-box" style="padding:10px;gap:8px;">
              <span class="eyebrow">Chat Identity</span>
              <input type="text" class="input" id="chat-profile-name" placeholder="Nickname..." maxlength="20" style="height:30px;font-size:12px;" />
              <div style="display:flex;align-items:center;justify-content:space-between;gap:6px;">
                <span class="sub">Avatar Color</span>
                <div id="chat-color-swatches" style="display:flex;gap:4px;"></div>
              </div>
            </div>
          </div>

          <div class="chat-main">
            <div class="chat-topbar">
              <div>
                <div style="font-family:var(--font-display);font-size:16px;font-weight:800;" id="chat-active-channel-title">#general</div>
                <div class="sub" id="chat-active-channel-topic">Hang out, share links, and chat across tabs</div>
              </div>
              <div class="pill-row">
                <button type="button" class="btn" id="chat-clear-channel-btn" style="height:28px;font-size:11px;">Reset Room</button>
              </div>
            </div>

            <div class="chat-messages" id="chat-messages" aria-live="polite"></div>

            <form class="chat-composer-wrap" id="chat-composer-form">
              <div id="chat-reply-banner" style="display:none;align-items:center;justify-content:space-between;padding:4px 8px;border-radius:7px;background:var(--surface-2);font-size:11px;color:var(--muted);">
                <span id="chat-reply-preview">Replying...</span>
                <button type="button" class="btn" id="chat-reply-cancel" style="height:20px;padding:0 6px;font-size:10px;">Cancel</button>
              </div>
              <div class="pill-row" style="width:100%;">
                <input type="text" class="input" id="chat-message-input" placeholder="Message #general..." maxlength="420" style="flex:1;height:36px;" autocomplete="off" />
                <button type="submit" class="btn btn-primary" style="height:36px;padding:0 16px;">Send</button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <!-- 1C. Native Vux.ai Full-Height Proxied Workspace (Custom-Skinned Over Render Wisp) -->
      <section class="view-panel" id="view-ai" aria-label="Vux.ai">
        <div class="vux-ai-shell">
          <div class="vux-ai-topbar">
            <div class="vux-ai-brand">
              <span class="vux-ai-crest-box">${Pt}</span>
              <div>
                <div style="font-family:var(--font-display);font-size:17px;font-weight:800;letter-spacing:-0.025em;display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
                  <span>Vux.ai</span>
                  <span class="vux-ai-status-pill" id="ai-model-indicator">Model: Private Cloud AI</span>
                  <span class="vux-ai-status-pill" id="ai-panel-status">Render Wisp</span>
                </div>
                <div class="sub">Native theme-matched AI workspace over Scramjet v2 &amp; ${E}</div>
              </div>
            </div>
            <div class="pill-row">
              <button type="button" class="btn btn-primary" id="ai-panel-newchat" style="height:31px;padding:0 12px;">New Chat</button>
              <button type="button" class="btn" id="ai-panel-reload" style="height:31px;padding:0 11px;">Reload</button>
              <button type="button" class="btn" id="ai-panel-open-tab" style="height:31px;padding:0 11px;">Open in Browser</button>
              <button type="button" class="btn" id="ai-panel-fs" style="height:31px;padding:0 11px;">Fullscreen</button>
            </div>
          </div>

          <div class="vux-ai-stage" id="ai-panel-stage">
            <iframe
              id="ai-panel-frame"
              title="Vux.ai Assistant"
              allow="autoplay; fullscreen; clipboard-read; clipboard-write"
            ></iframe>
            <div class="overlay-status" id="ai-panel-loading">
              <div class="vux-ai-crest-box" style="width:44px;height:44px;margin-bottom:4px;">${Pt}</div>
              <div class="spinner"></div>
              <div id="ai-panel-loading-msg" style="font-size:13px;font-weight:600;">Initializing Vux.ai via Render Wisp...</div>
              <button type="button" class="btn" id="ai-panel-dismiss-load" style="height:28px;font-size:11px;">Dismiss Loader</button>
            </div>
          </div>
        </div>
      </section>

      <!-- 2. Combined Study Modules Hub -->
      <section class="view-panel" id="view-modules" aria-label="Games Hub">
        <div class="view-scroll">
          <div class="container">
            <div class="section-head">
              <div>
                <div class="eyebrow">Combined Library · Built-In + gn-math + Seraph + GMShelf + UGS + CKV</div>
                <h1 class="h1">All Games (<span id="modules-total-count">0</span>)</h1>
              </div>
              <button type="button" class="btn" id="btn-refresh-modules">Refresh Live Catalogs</button>
            </div>

            <div class="toolbar">
              <div class="pill-row" id="modules-filter-pills">
                <button type="button" class="pill-btn active" data-mfilter="all">All</button>
                <button type="button" class="pill-btn" data-mfilter="gn">gn-math</button>
                <button type="button" class="pill-btn" data-mfilter="seraph">Seraph</button>
                <button type="button" class="pill-btn" data-mfilter="gmshelf">GMShelf</button>
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

      <!-- 2B. Seraph Games Provider -->
      <section class="view-panel" id="view-seraph" aria-label="Seraph Games Provider">
        <div class="view-scroll">
          <div class="container">
            <div class="section-head">
              <div>
                <div class="eyebrow">Dedicated Games Provider · a456pur/seraph</div>
                <h1 class="h1">Seraph Games (<span id="seraph-total-count">0</span>)</h1>
              </div>
              <div class="pill-row">
                <span class="sub" id="seraph-status">Syncing live Seraph catalog...</span>
                <button type="button" class="btn" id="btn-refresh-seraph">Sync Seraph</button>
              </div>
            </div>

            <div class="toolbar">
              <div class="pill-row" id="seraph-genre-pills">
                <button type="button" class="pill-btn active" data-sgenre="All">All</button>
                <button type="button" class="pill-btn" data-sgenre="Arcade">Arcade</button>
                <button type="button" class="pill-btn" data-sgenre="Platformer">Platformer</button>
                <button type="button" class="pill-btn" data-sgenre="Adventure">Adventure</button>
                <button type="button" class="pill-btn" data-sgenre="Puzzle">Puzzle</button>
                <button type="button" class="pill-btn" data-sgenre="Simulation">Simulation</button>
                <button type="button" class="pill-btn" data-sgenre="Mobile">Mobile</button>
              </div>
              <input type="text" class="input" id="seraph-search" placeholder="Search Seraph catalog..." style="width:240px;" />
            </div>

            <div class="modules-grid" id="seraph-grid"></div>
          </div>
        </div>
      </section>

      <!-- 2C. GMShelf Games Provider -->
      <section class="view-panel" id="view-gmshelf" aria-label="GMShelf Games Provider">
        <div class="view-scroll">
          <div class="container">
            <div class="section-head">
              <div>
                <div class="eyebrow">Dedicated Games Provider · github.com/gmshelf</div>
                <h1 class="h1">GMShelf Games (<span id="gmshelf-total-count">0</span>)</h1>
              </div>
              <div class="pill-row">
                <span class="sub" id="gmshelf-status">Syncing live GMShelf catalog...</span>
                <button type="button" class="btn" id="btn-refresh-gmshelf">Sync GMShelf</button>
              </div>
            </div>

            <div class="toolbar">
              <div class="pill-row" id="gmshelf-genre-pills">
                <button type="button" class="pill-btn active" data-ggenre="All">All</button>
                <button type="button" class="pill-btn" data-ggenre="Action">Action</button>
                <button type="button" class="pill-btn" data-ggenre="Platformer">Platformer</button>
                <button type="button" class="pill-btn" data-ggenre="Arcade">Arcade</button>
                <button type="button" class="pill-btn" data-ggenre="Puzzle">Puzzle</button>
                <button type="button" class="pill-btn" data-ggenre="Sports &amp; Racing">Sports &amp; Racing</button>
                <button type="button" class="pill-btn" data-ggenre="Simulation">Simulation</button>
              </div>
              <input type="text" class="input" id="gmshelf-search" placeholder="Search GMShelf catalog..." style="width:240px;" />
            </div>

            <div class="modules-grid" id="gmshelf-grid"></div>
          </div>
        </div>
      </section>

      <!-- 2D. CKV Games Provider (Full WanoCapy/ChickenKingsVault & gmshelf/ckv) -->
      <section class="view-panel" id="view-ckv" aria-label="CKV Games Provider">
        <div class="view-scroll">
          <div class="container">
            <div class="section-head">
              <div>
                <div class="eyebrow">Dedicated Games Provider · ChickenKingsVault (Full Catalog)</div>
                <h1 class="h1">CKV Games (<span id="ckv-total-count">0</span>)</h1>
              </div>
              <div class="pill-row">
                <span class="sub" id="ckv-status">Syncing full CKV game vault...</span>
                <button type="button" class="btn" id="btn-refresh-ckv">Sync CKV</button>
              </div>
            </div>

            <div class="toolbar">
              <div class="pill-row" id="ckv-sort-pills">
                <button type="button" class="pill-btn active" data-ckvsort="featured">Featured First</button>
                <button type="button" class="pill-btn" data-ckvsort="az">A-Z</button>
                <button type="button" class="pill-btn" data-ckvsort="za">Z-A</button>
              </div>
              <input type="text" class="input" id="ckv-search" placeholder="Search all CKV games..." style="width:240px;" />
            </div>

            <div class="modules-grid" id="ckv-grid"></div>
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
                <button type="button" class="btn" id="gn-open-proxy">Open in Vux</button>
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

      <!-- 5. Books & Manga -->
      <section class="view-panel" id="view-books" aria-label="Books and Manga">
        <div class="view-scroll">
          <div class="container">
            <div class="section-head">
              <div>
                <div class="eyebrow">Vux Library · Gutendex Reader</div>
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

      <!-- 6. StudyHub-Style All-in-One MP3 Player & Ambient Sound Mixer -->
      <section class="view-panel" id="view-music" aria-label="Vux Audio and Ambient Studio">
        <div class="view-scroll">
          <div class="container">
            <div class="section-head">
              <div>
                <div class="eyebrow">Persistent Audio Engine · Stations · Visualizer · Ambient Mixer</div>
                <h1 class="h1">Vux MP3 &amp; Ambient Studio</h1>
              </div>
              <div class="pill-row">
                <span class="sub" id="vux-audio-mode-badge">Ready</span>
              </div>
            </div>

            <audio id="vux-global-audio" crossorigin="anonymous" preload="metadata" style="display:none;"></audio>

            <div class="music-grid">
              <div class="panel-box" style="grid-column:span 1;">
                <div style="display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap;">
                  <div>
                    <div class="eyebrow" id="vux-audio-station-cat">STUDYHUB STATION</div>
                    <strong style="font-size:17px;font-family:var(--font-display);" id="vux-audio-track-title">Lofi Study Beats</strong>
                    <div class="sub" id="vux-audio-track-desc">Warm rhodes chords for study sessions</div>
                  </div>
                  <div class="pill-row">
                    <button type="button" class="pill-btn" id="vux-audio-shuffle" title="Shuffle Stations">Shuffle: Off</button>
                    <button type="button" class="pill-btn" id="vux-audio-repeat" title="Repeat Current Track">Repeat: Off</button>
                  </div>
                </div>

                <canvas id="vux-audio-viz" width="560" height="96" style="width:100%;height:96px;border-radius:10px;background:var(--bg);border:1px solid var(--border);"></canvas>

                <div style="display:flex;flex-direction:column;gap:6px;">
                  <input type="range" id="vux-audio-seek" min="0" max="100" value="0" style="width:100%;accent-color:var(--accent);" aria-label="Seek Audio Position" />
                  <div style="display:flex;justify-content:space-between;font-family:var(--font-mono);font-size:11px;color:var(--muted);">
                    <span id="vux-audio-cur">0:00</span>
                    <span id="vux-audio-dur">3:00</span>
                  </div>
                </div>

                <div style="display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap;">
                  <div class="pill-row">
                    <button type="button" class="btn" id="vux-audio-prev">Prev</button>
                    <button type="button" class="btn btn-primary" id="vux-audio-play" style="min-width:86px;">Play</button>
                    <button type="button" class="btn" id="vux-audio-next">Next</button>
                  </div>
                  <div class="pill-row">
                    <span class="sub">Vol</span>
                    <input type="range" id="vux-audio-vol" min="0" max="100" value="80" style="width:110px;accent-color:var(--accent);" aria-label="Master Audio Volume" />
                  </div>
                </div>

                <div class="mp3-station-grid" id="vux-audio-stations"></div>

                <form id="vux-custom-mp3-form" class="pill-row" style="width:100%;padding-top:6px;border-top:1px solid var(--border);">
                  <input type="text" class="input" id="vux-custom-mp3-url" placeholder="Paste direct MP3 / OGG / WAV stream URL..." style="flex:1;min-width:180px;" />
                  <button type="submit" class="btn btn-primary">Load MP3</button>
                </form>

                <div style="display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap;">
                  <span style="font-size:12px;font-weight:600;">Upload Local MP3 / Audio File</span>
                  <input type="file" id="local-audio-input" accept="audio/*" style="font-size:12px;color:var(--muted);" />
                </div>
              </div>

              <div class="panel-box" id="vux-ambient-mixer">
                <div>
                  <div class="eyebrow">Ambient Sound Mixer</div>
                  <strong style="font-size:15px;">Layer Atmospheric Noise Over Music</strong>
                  <p class="sub" style="margin-top:3px;">Mix gentle rain, warm fireplace crackle, cafe chatter &amp; mechanical clicks locally via Web Audio.</p>
                </div>
                <div id="vux-ambient-list" style="display:flex;flex-direction:column;gap:8px;"></div>
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
        <button type="button" class="btn" id="module-ov-pip">PiP Window</button>
        <button type="button" class="btn" id="module-ov-proxy">Open in Vux</button>
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
        <button type="button" class="btn" id="movie-ov-pip">PiP Window</button>
        <button type="button" class="btn" id="movie-ov-theater">Theater Mode</button>
        <button type="button" class="btn" id="movie-ov-fs">Fullscreen</button>
        <button type="button" class="btn" id="movie-ov-proxy">Open in Vux</button>
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
            title="Vux Embedded Theater Player"
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
              <button type="button" class="btn" id="cinema-fallback-proxy">Search Watch Page in Vux</button>
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

  <!-- Floating Quick Scratchpad / Notes Drawer -->
  <aside class="vux-notes-drawer" id="vux-notes-drawer" aria-label="Vux Quick Scratchpad Notes">
    <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;">
      <div>
        <span class="eyebrow">Auto-Saved Notes</span>
        <div style="font-family:var(--font-display);font-size:15px;font-weight:800;">Scratchpad</div>
      </div>
      <div class="pill-row">
        <button type="button" class="btn" id="vux-notes-copy" style="height:28px;">Copy</button>
        <button type="button" class="btn" id="vux-notes-clear" style="height:28px;">Clear</button>
        <button type="button" class="btn btn-primary" id="vux-notes-close" style="height:28px;">Close</button>
      </div>
    </div>
    <textarea id="vux-notes-textarea" class="input" placeholder="Jot down notes, links, study reminders, or chat drafts..." style="flex:1;resize:none;padding:12px;line-height:1.55;height:auto;"></textarea>
    <div class="sub" id="vux-notes-stats" style="font-family:var(--font-mono);">0 words · 0 chars</div>
  </aside>

  <!-- Floating Picture-in-Picture Draggable Mini Browser Widget -->
  <div class="vux-pip-widget" id="vux-pip-widget" role="dialog" aria-label="Vux Floating Mini Window">
    <div class="vux-pip-head" id="vux-pip-drag-handle">
      <div style="display:flex;align-items:center;gap:6px;min-width:0;flex:1;">
        <span class="rail-logo-mark" style="width:20px;height:20px;font-size:10px;">${Nt}</span>
        <strong id="vux-pip-title" style="font-size:12px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">Vux Mini Player</strong>
      </div>
      <div class="pill-row">
        <button type="button" class="btn" id="vux-pip-min" style="height:24px;padding:0 7px;font-size:11px;">Min</button>
        <button type="button" class="btn btn-primary" id="vux-pip-close" style="height:24px;padding:0 8px;font-size:11px;">&times;</button>
      </div>
    </div>
    <div class="vux-pip-body">
      <iframe id="vux-pip-frame" allow="autoplay; fullscreen; gamepad; encrypted-media; picture-in-picture" referrerpolicy="no-referrer"></iframe>
    </div>
  </div>

  <!-- Floating Command Palette (Ctrl+K) -->
  <div class="vux-cmd-backdrop" id="vux-cmd-palette" role="dialog" aria-modal="true" aria-label="Vux Command Palette">
    <div class="vux-cmd-card">
      <div style="display:flex;align-items:center;gap:10px;padding:12px 14px;border-bottom:1px solid var(--border);">
        <span class="eyebrow">Vux</span>
        <input type="text" id="vux-cmd-input" class="input" placeholder="Search games, movies, chat channels, MP3 stations, themes, fonts, or enter URL..." style="flex:1;border:none;background:transparent;" autocomplete="off" />
        <button type="button" class="btn" id="vux-cmd-close" style="height:26px;font-size:11px;">Esc</button>
      </div>
      <div class="vux-cmd-results" id="vux-cmd-results"></div>
    </div>
  </div>

  <!-- Daily Streak & Achievement Badges Modal -->
  <div class="modal-backdrop" id="vux-badges-modal" role="dialog" aria-label="Vux Streak and Badges">
    <div class="modal-card" style="max-width:640px;">
      <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;">
        <div>
          <span class="eyebrow" id="vux-streak-eyebrow">1-Day Streak</span>
          <h3 style="font-family:var(--font-display);font-size:19px;font-weight:800;">Daily Streak &amp; Achievement Badges</h3>
        </div>
        <button type="button" class="btn" id="vux-badges-close">Close</button>
      </div>
      <div class="studio-grid" id="vux-badges-grid" style="max-height:360px;"></div>
    </div>
  </div>

  <!-- Customization Studio Modal (${w.length} Themes, ${Ct.length} Animated BGs, ${Ot.length} Color Shifts, ${Mt.length}+ Fonts, ${O.length} Layouts) -->
  <div class="modal-backdrop" id="settings-modal">
    <div class="modal-card studio-modal-card">
      <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;">
        <div>
          <strong style="font-size:17px;font-family:var(--font-display);">Vux Customization Studio</strong>
          <div class="sub">${w.length} Themes · ${Ct.length} Animated BGs · ${Ot.length} Dynamic Gradients · ${Mt.length}+ Fonts (incl. Cursive) · ${O.length} Layouts</div>
        </div>
        <button type="button" class="btn" id="btn-close-settings">Close</button>
      </div>

      <div class="settings-nav" id="settings-tabs">
        <button type="button" class="pill-btn active" data-stab="appearance">${w.length} Themes</button>
        <button type="button" class="pill-btn" data-stab="animbg">${Ct.length} Animated BGs</button>
        <button type="button" class="pill-btn" data-stab="dynbg">${Ot.length} Color Shifts</button>
        <button type="button" class="pill-btn" data-stab="fonts">${Mt.length}+ Fonts</button>
        <button type="button" class="pill-btn" data-stab="layout">${O.length}+ Layouts</button>
        <button type="button" class="pill-btn" data-stab="cloak">Cloak &amp; Share</button>
      </div>

      <!-- Pane 1: ${w.length} UI Color Themes -->
      <div class="settings-pane active" id="spane-appearance">
        <div style="display:flex;flex-direction:column;gap:8px;">
          <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap;">
            <span class="eyebrow">UI Color Themes (<span id="themes-count-shown">${w.length}</span> / ${w.length})</span>
            <div class="pill-row">
              <input type="text" class="input" id="preset-search" placeholder="Search ${w.length} themes..." aria-label="Search color presets" style="height:28px;width:165px;font-size:11px;padding:0 9px;" />
              <button type="button" class="btn" id="btn-preset-random" style="height:28px;font-size:11px;padding:0 10px;">Random Theme</button>
              <button type="button" class="btn" id="btn-preset-reset-coral" style="height:28px;font-size:11px;padding:0 10px;">Default Coral</button>
            </div>
          </div>
          <div class="pill-row" id="preset-cat-pills">
            <button type="button" class="pill-btn active" data-pcat="All">All (${w.length})</button>
            ${he.map(e=>`<button type="button" class="pill-btn" data-pcat="${e}">${e.replace(/&/g,`&amp;`)}</button>`).join(`
            `)}
          </div>
          <div class="preset-grid" id="color-presets-grid" style="max-height:290px;"></div>
        </div>

        <div class="setting-row">
          <div class="setting-row-meta">
            <span class="setting-row-title">Cursor Trail &amp; Click Ripples</span>
            <span class="setting-row-desc">Smooth interactive cursor FX tinted with your active Vux theme</span>
          </div>
          <div class="pill-row" id="cursor-trail-pills">
            <button type="button" class="pill-btn" data-cursortrail="off">Off</button>
            <button type="button" class="pill-btn active" data-cursortrail="glow">Glow Trail</button>
            <button type="button" class="pill-btn" data-cursortrail="sparks">Spark Dots</button>
            <button type="button" class="pill-btn" data-cursortrail="stars">Starlight</button>
          </div>
        </div>

        <div class="setting-row">
          <div class="setting-row-meta">
            <span class="setting-row-title">Static Fallback Texture</span>
            <span class="setting-row-desc">Used when Animated &amp; Dynamic Canvas backgrounds are off</span>
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
            <span class="setting-row-title">Corner Shape &amp; Glow (<span id="glow-pct-val">100%</span>)</span>
            <span class="setting-row-desc">Fine-tune UI roundness, ambient glow, and frosted glass blur</span>
          </div>
          <div class="pill-row">
            <div class="pill-row" id="radius-pills">
              <button type="button" class="pill-btn" data-radius="6">Sharp</button>
              <button type="button" class="pill-btn active" data-radius="12">Balanced</button>
              <button type="button" class="pill-btn" data-radius="18">Soft</button>
            </div>
            <input type="range" id="custom-glow-range" min="0" max="150" value="100" style="accent-color:var(--accent);width:95px;" />
            <button type="button" class="pill-btn active" id="btn-toggle-blur">Glass Blur: On</button>
          </div>
        </div>
      </div>

      <!-- Pane 2: ${Ct.length} Animated Canvas Backgrounds -->
      <div class="settings-pane" id="spane-animbg">
        <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap;">
          <span class="eyebrow">Canvas FX (<span id="animbg-count-shown">${Ct.length}</span> / ${Ct.length})</span>
          <div class="pill-row">
            <input type="text" class="input" id="animbg-search" placeholder="Search ${Ct.length} canvas effects..." style="height:28px;width:185px;font-size:11px;padding:0 9px;" />
            <button type="button" class="btn" id="btn-animbg-off" style="height:28px;font-size:11px;padding:0 10px;">Turn Off</button>
          </div>
        </div>
        <div class="pill-row" id="animbg-cat-pills">
          <button type="button" class="pill-btn active" data-animcat="All">All (${Ct.length})</button>
          ${bt.map(e=>`<button type="button" class="pill-btn" data-animcat="${e}">${e.replace(/&/g,`&amp;`)}</button>`).join(`
          `)}
        </div>
        <div class="studio-grid" id="animbg-grid"></div>
        <div class="setting-row">
          <div class="setting-row-meta">
            <span class="setting-row-title">Animation Speed &amp; Opacity</span>
            <span class="setting-row-desc">GPU-throttled requestAnimationFrame visible globally behind homepage &amp; tabs</span>
          </div>
          <div class="pill-row">
            <label class="sub">Speed <span id="animbg-speed-val">1.0x</span></label>
            <input type="range" id="animbg-speed-range" min="20" max="250" value="100" style="accent-color:var(--accent);width:95px;" />
            <label class="sub">Opacity <span id="animbg-opacity-val">72%</span></label>
            <input type="range" id="animbg-opacity-range" min="15" max="100" value="72" style="accent-color:var(--accent);width:95px;" />
          </div>
        </div>
      </div>

      <!-- Pane 3: ${Ot.length} Dynamic Color-Changing Backgrounds -->
      <div class="settings-pane" id="spane-dynbg">
        <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap;">
          <span class="eyebrow">Color-Shifting Ambients (<span id="dynbg-count-shown">${Ot.length}</span> / ${Ot.length})</span>
          <div class="pill-row">
            <input type="text" class="input" id="dynbg-search" placeholder="Search ${Ot.length} mood shifts..." style="height:28px;width:185px;font-size:11px;padding:0 9px;" />
            <button type="button" class="btn" id="btn-dynbg-off" style="height:28px;font-size:11px;padding:0 10px;">Turn Off</button>
          </div>
        </div>
        <div class="pill-row" id="dynbg-cat-pills">
          <button type="button" class="pill-btn active" data-dyncat="All">All (${Ot.length})</button>
          ${wt.map(e=>`<button type="button" class="pill-btn" data-dyncat="${e}">${e.replace(/&/g,`&amp;`)}</button>`).join(`
          `)}
        </div>
        <div class="studio-grid" id="dynbg-grid"></div>
        <div class="setting-row">
          <div class="setting-row-meta">
            <span class="setting-row-title">Color Shift Speed &amp; Intensity</span>
            <span class="setting-row-desc">Smooth ambient hue modulation behind homepage, cards, and sidebars</span>
          </div>
          <div class="pill-row">
            <label class="sub">Speed <span id="dynbg-speed-val">1.0x</span></label>
            <input type="range" id="dynbg-speed-range" min="20" max="250" value="100" style="accent-color:var(--accent);width:95px;" />
            <label class="sub">Intensity <span id="dynbg-opacity-val">72%</span></label>
            <input type="range" id="dynbg-opacity-range" min="15" max="100" value="72" style="accent-color:var(--accent);width:95px;" />
          </div>
        </div>
      </div>

      <!-- Pane 4: ${Mt.length}+ Curated Google Fonts -->
      <div class="settings-pane" id="spane-fonts">
        <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap;">
          <span class="eyebrow">Font Library (<span id="fonts-count-shown">${Mt.length}</span> fonts · lazy loaded)</span>
          <div class="pill-row">
            <input type="text" class="input" id="font-preview-sample" value="The quick brown fox jumps — 12345" placeholder="Preview text..." style="height:28px;width:205px;font-size:11px;padding:0 9px;" />
            <input type="text" class="input" id="fonts-search" placeholder="Search ${Mt.length}+ fonts..." style="height:28px;width:145px;font-size:11px;padding:0 9px;" />
            <button type="button" class="btn" id="btn-font-reset" style="height:28px;font-size:11px;padding:0 10px;">Default Font</button>
          </div>
        </div>
        <div class="pill-row" id="fonts-cat-pills">
          <button type="button" class="pill-btn active" data-fcat="All">All (${Mt.length})</button>
          ${kt.map(e=>`<button type="button" class="pill-btn" data-fcat="${e}">${e.replace(/&/g,`&amp;`)}</button>`).join(`
          `)}
        </div>
        <div class="studio-grid" id="fonts-grid"></div>
      </div>

      <!-- Pane 5: ${O.length}+ Switchable Layout Presets -->
      <div class="settings-pane" id="spane-layout">
        <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap;">
          <span class="eyebrow">Workspace Layout Presets (${O.length})</span>
          <input type="text" class="input" id="layouts-search" placeholder="Search ${O.length} layouts..." style="height:28px;width:185px;font-size:11px;padding:0 9px;" />
        </div>
        <div class="studio-grid" id="layouts-grid" style="max-height:230px;"></div>

        <div class="setting-row">
          <div class="setting-row-meta">
            <span class="setting-row-title">Start Page &amp; Sidebar Controls</span>
            <span class="setting-row-desc">Fine-tune arrangement, sidebar rail mode, clock, launchpad &amp; scale</span>
          </div>
          <div class="pill-row" id="home-layout-pills">
            <button type="button" class="pill-btn active" data-homelayout="split">Split Hero</button>
            <button type="button" class="pill-btn" data-homelayout="normal">Normal Search</button>
            <button type="button" class="pill-btn" data-homelayout="side">Side Search</button>
            <button type="button" class="pill-btn" data-homelayout="minimal">Minimal</button>
          </div>
          <div class="pill-row" id="sidebar-mode-pills">
            <button type="button" class="pill-btn active" data-railmode="expanded">Expanded</button>
            <button type="button" class="pill-btn" data-railmode="compact">Compact Rail</button>
            <button type="button" class="pill-btn" data-railmode="hidden">Auto-Hide</button>
          </div>
        </div>

        <div class="setting-row">
          <div class="pill-row">
            <button type="button" class="pill-btn active" id="btn-toggle-clock">Live Clock: On</button>
            <button type="button" class="pill-btn active" id="btn-toggle-shortcuts">Launchpad: On</button>
          </div>
          <div class="pill-row" id="font-scale-pills">
            <button type="button" class="pill-btn" data-fscale="0.92">Compact</button>
            <button type="button" class="pill-btn active" data-fscale="1">Default</button>
            <button type="button" class="pill-btn" data-fscale="1.08">Large</button>
            <button type="button" class="pill-btn" id="btn-toggle-motion">Motion: Smooth</button>
          </div>
        </div>
      </div>

      <!-- Pane 6: Cloak, Panic & VUX1 Theme Share / Custom CSS -->
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
          <span class="eyebrow">Theme Exporter / Importer (VUX1 Share Code)</span>
          <div class="pill-row">
            <input type="text" class="input" id="vux-share-code-input" placeholder="Click Generate or paste VUX1:... share code" style="flex:1;min-width:210px;font-family:var(--font-mono);font-size:11px;" />
            <button type="button" class="btn" id="btn-vux-export-code">Generate &amp; Copy</button>
            <button type="button" class="btn btn-primary" id="btn-vux-import-code">Import Code</button>
          </div>
        </div>

        <div style="display:flex;flex-direction:column;gap:6px;">
          <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;">
            <span class="eyebrow">Live Custom CSS Snippet</span>
            <div class="pill-row">
              <button type="button" class="btn" id="btn-vux-clear-css" style="height:26px;font-size:11px;">Clear CSS</button>
              <button type="button" class="btn btn-primary" id="btn-vux-apply-css" style="height:26px;font-size:11px;">Apply CSS</button>
            </div>
          </div>
          <textarea id="vux-custom-css-input" class="input" placeholder="/* Example: .rail { border-right-color: var(--accent); } */" style="height:76px;padding:8px 10px;font-family:var(--font-mono);font-size:11px;resize:vertical;"></textarea>
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

        <div style="padding:10px 12px;border-radius:10px;background:var(--surface-2);border:1px solid var(--border);font-family:var(--font-mono);font-size:11px;color:var(--muted);display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap;">
          <div>
            Active Default Wisp Endpoint:<br />
            <span style="color:var(--accent);">${T}</span>
          </div>
          <button type="button" class="btn" id="btn-replay-welcome" style="height:28px;font-size:11px;">Show Welcome Screen</button>
        </div>

        <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;">
          <div class="sub">Press <code style="color:var(--text);">Esc</code> anywhere to immediately close or redirect to your Panic destination.</div>
          <button type="button" class="btn" id="btn-reset-all-custom">Reset All Settings</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Dismissible Welcome Overlay -->
  <div class="vb-welcome-backdrop" id="vb-welcome" role="dialog" aria-label="Welcome to Vux">
    <div class="vb-welcome-card">
      <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:12px;flex-wrap:wrap;">
        <div>
          <span class="eyebrow" id="vb-welcome-streak-pill">Isolated Workspace Ready</span>
          <h2 style="font-family:var(--font-display);font-size:24px;font-weight:800;letter-spacing:-0.03em;margin-top:3px;">Welcome to Vux</h2>
          <p class="sub" style="margin-top:4px;line-height:1.5;">Scramjet v2 + Libcurl proxy, Vux.ai via Render Wisp, Discord-styled Vux Chat, GMShelf &amp; Seraph &amp; gn-math arcade, Movies &amp; TV, StudyHub MP3 + Ambient Mixer, and ${w.length}+ Studio Themes.</p>
        </div>
        <button type="button" class="btn" id="vb-welcome-close-x" aria-label="Close welcome screen">Close</button>
      </div>

      <div class="vb-welcome-grid">
        <button type="button" class="vb-welcome-tile" data-welcome-go="browser">
          <strong style="font-size:13px;color:var(--accent);">Vux Proxy Browser</strong>
          <span class="sub">Multi-tab Libcurl + Wisp proxy with authentic shortcut logos &amp; PiP window.</span>
        </button>
        <button type="button" class="vb-welcome-tile" data-welcome-go="chat">
          <strong style="font-size:13px;color:var(--accent);">Vux Community Chat</strong>
          <span class="sub">Discord-styled #general, #games, #movies &amp; #links-and-themes rooms.</span>
        </button>
        <button type="button" class="vb-welcome-tile" data-welcome-go="ai">
          <strong style="font-size:13px;color:var(--accent);">Vux.ai (Render Wisp)</strong>
          <span class="sub">Native dark-glass AI assistant powered privately through Scramjet v2 + Render Wisp.</span>
        </button>
        <button type="button" class="vb-welcome-tile" data-welcome-go="ckv">
          <strong style="font-size:13px;color:var(--accent);">CKV, GMShelf &amp; Seraph Arcade</strong>
          <span class="sub">Play 100% of CKV, GMShelf, Seraph, gn-math &amp; classic games inside Vux.</span>
        </button>
      </div>

      <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;padding-top:6px;border-top:1px solid var(--border);">
        <label style="display:inline-flex;align-items:center;gap:8px;font-size:12px;color:var(--muted);cursor:pointer;">
          <input type="checkbox" id="vb-welcome-dont-show" style="accent-color:var(--accent);" />
          <span>Don&apos;t show welcome screen again</span>
        </label>
        <button type="button" class="btn btn-primary" id="vb-welcome-start">Get Started</button>
      </div>
    </div>
  </div>

  <!-- Soothing Animated Launch Loading Screen + Random Fun Fact -->
  <div class="vb-loader" id="vb-loader" role="status" aria-live="polite">
    <canvas class="vb-loader-canvas" id="vb-loader-canvas" aria-hidden="true"></canvas>
    <div class="vb-loader-card">
      <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;">
        <div style="display:flex;align-items:center;gap:10px;">
          <span class="rail-logo-mark" style="width:38px;height:38px;font-size:16px;">${Nt}</span>
          <div>
            <div style="font-family:var(--font-display);font-size:18px;font-weight:800;letter-spacing:-0.03em;">Vux</div>
            <div class="sub" id="vb-loader-status">Preparing isolated workspace &amp; themes...</div>
          </div>
        </div>
        <button type="button" class="btn" id="vb-loader-skip" style="height:30px;">Skip</button>
      </div>

      <div class="vb-loader-bar-track">
        <div class="vb-loader-bar-fill" id="vb-loader-bar-fill"></div>
      </div>

      <div class="vb-loader-fact-box">
        <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;">
          <span class="eyebrow">Did You Know? · Random Fun Fact</span>
          <button type="button" class="btn" id="vb-loader-next-fact" style="height:24px;padding:0 8px;font-size:10px;">New Fact</button>
        </div>
        <p id="vb-loader-fact" style="font-size:13px;line-height:1.55;color:var(--text);"></p>
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
        if (viewId === 'ai' && typeof loadVuxAi === 'function') {
          var aiF = document.getElementById('ai-panel-frame');
          if (!aiF || !aiF.getAttribute('src')) loadVuxAi(false);
          else if (typeof injectAiFrameSkin === 'function') injectAiFrameSkin();
        }
        if (viewId === 'modules' && dirtyViews.modules) {
          dirtyViews.modules = false;
          renderModulesGrid();
        }
        if (viewId === 'gnmath' && dirtyViews.gnmath) {
          dirtyViews.gnmath = false;
          renderGnGrid();
        }
        if (viewId === 'seraph') {
          if (dirtyViews.seraph) { dirtyViews.seraph = false; renderSeraphGrid(); }
          if (!seraphFetchedOnce) fetchSeraphCatalog();
        }
        if (viewId === 'gmshelf') {
          if (dirtyViews.gmshelf) { dirtyViews.gmshelf = false; renderGmshelfGrid(); }
          if (!gmshelfFetchedOnce) fetchGmshelfCatalog();
        }
        if (viewId === 'ckv') {
          if (dirtyViews.ckv) { dirtyViews.ckv = false; renderCkvGrid(); }
          if (!ckvFetchedOnce) fetchCkvCatalog();
        }
        if (viewId === 'books' && !booksLoadedOnce) {
          booksLoadedOnce = true;
          searchBooks('classic');
        }
        if (viewId === 'chat' && typeof renderChatView === 'function') {
          renderChatView();
        }
        if (viewId === 'music' && typeof drawAudioViz === 'function') {
          syncAudioVizLoop();
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
          if (customSettings && customSettings.navPosition === 'zen') {
            customSettings.navPosition = 'left';
            applyCustomSettings(customSettings);
          }
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
          openStudioModal('appearance');
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
          var allowed = { browser: 1, chat: 1, ai: 1, modules: 1, seraph: 1, gmshelf: 1, ckv: 1, gnmath: 1, movies: 1, books: 1, music: 1 };
          if (allowed[targetTab]) {
            switchView(targetTab);
          }
        } else if (ev.data.type === 'vux-open-pip') {
          if (typeof openVuxPip === 'function') {
            openVuxPip(ev.data.url || '', ev.data.title || 'Vux Mini Player', ev.data.proxy !== false);
          }
        } else if (ev.data.type === 'vux-audio-control') {
          if (typeof handleExternalAudioControl === 'function') {
            handleExternalAudioControl(ev.data.action);
          }
        } else if (ev.data.type === 'vux-tab-opened') {
          if (typeof recordVuxStat === 'function') {
            recordVuxStat('tabsOpened', 1);
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

      var dirtyViews = {
        modules: true,
        gnmath: true,
        seraph: true,
        gmshelf: true,
        ckv: true
      };

      function flushVisibleCatalogView() {
        if (currentView === 'modules' && dirtyViews.modules) { dirtyViews.modules = false; renderModulesGrid(); }
        else if (currentView === 'gnmath' && dirtyViews.gnmath) { dirtyViews.gnmath = false; renderGnGrid(); }
        else if (currentView === 'seraph' && dirtyViews.seraph) { dirtyViews.seraph = false; renderSeraphGrid(); }
        else if (currentView === 'gmshelf' && dirtyViews.gmshelf) { dirtyViews.gmshelf = false; renderGmshelfGrid(); }
        else if (currentView === 'ckv' && dirtyViews.ckv) { dirtyViews.ckv = false; renderCkvGrid(); }
      }

      function toggleFavorite(moduleId) {
        var idx = favorites.indexOf(moduleId);
        if (idx === -1) favorites.unshift(moduleId);
        else favorites.splice(idx, 1);
        safeLSSet('euler_favs', JSON.stringify(favorites));
        dirtyViews.modules = true;
        dirtyViews.gnmath = true;
        dirtyViews.seraph = true;
        dirtyViews.gmshelf = true;
        dirtyViews.ckv = true;
        flushVisibleCatalogView();
      }

      var gnZones = [];
      var seraphModules = Array.isArray(CFG.fallbackSeraph) ? CFG.fallbackSeraph.slice() : [];
      var gmshelfModules = Array.isArray(CFG.fallbackGmshelf) ? CFG.fallbackGmshelf.slice() : [];
      var ugsModules = CFG.fallbackUgs.slice();
      var ckvModules = CFG.fallbackCkv.slice();
      var mergedModules = [];
      var activeModuleFilter = 'all';
      var activeSeraphGenre = 'All';
      var activeGmshelfGenre = 'All';
      var activeCkvSort = 'featured';
      var activePopularityPeriod = 'featured';
      var popularityMap = {};
      var gnZonesLoadedOnce = false;
      var seraphFetchedOnce = false;
      var gmshelfFetchedOnce = false;
      var ckvFetchedOnce = false;

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
        addList(seraphModules);
        addList(gmshelfModules);
        addList(ugsModules);
        addList(ckvModules);
        addList(CFG.staticModules);
        mergedModules = out;
        document.getElementById('modules-total-count').textContent = String(mergedModules.length);
        document.getElementById('badge-modules').textContent = String(mergedModules.length);
        document.getElementById('badge-gn').textContent = String(gnZones.length);
        var seraphBadge = document.getElementById('badge-seraph');
        var seraphTotal = document.getElementById('seraph-total-count');
        if (seraphBadge) seraphBadge.textContent = String(seraphModules.length);
        if (seraphTotal) seraphTotal.textContent = String(seraphModules.length);
        var gmshelfBadge = document.getElementById('badge-gmshelf');
        var gmshelfTotal = document.getElementById('gmshelf-total-count');
        if (gmshelfBadge) gmshelfBadge.textContent = String(gmshelfModules.length);
        if (gmshelfTotal) gmshelfTotal.textContent = String(gmshelfModules.length);
        var ckvBadge = document.getElementById('badge-ckv');
        var ckvTotal = document.getElementById('ckv-total-count');
        if (ckvBadge) ckvBadge.textContent = String(ckvModules.length);
        if (ckvTotal) ckvTotal.textContent = String(ckvModules.length);
        dirtyViews.modules = true;
        dirtyViews.gnmath = true;
        dirtyViews.seraph = true;
        dirtyViews.gmshelf = true;
        dirtyViews.ckv = true;
        flushVisibleCatalogView();
      }

      function inferGmshelfCategoryClient(name, rawUrl) {
        var text = (String(name || '') + ' ' + String(rawUrl || '')).toLowerCase();
        if (/(mario|sonic|celeste|ovo|vex|parkour|platform|jump|geometry|run\\s*3|slope)/i.test(text)) return 'Platformer';
        if (/(soccer|basketball|fifa|drift|moto|car|rac|golf|football|baseball|boxing)/i.test(text)) return 'Sports & Racing';
        if (/(2048|chess|sudoku|tetris|puzzle|wordle|portal|cut the rope|mine|mahjong)/i.test(text)) return 'Puzzle';
        if (/(papa|tycoon|craft|sim|bitlife|cookie|idle|clicker|garden|farm)/i.test(text)) return 'Simulation';
        if (/(1v1|shoot|gun|zombie|war|battle|strike|sniper|fnaf|doom|quake|superhot|ultrakill|halo)/i.test(text)) return 'Action';
        return 'Arcade';
      }

      function resolveGmshelfUrlClient(rawPath, cdnBase) {
        var v = String(rawPath || '').trim();
        if (!v || /^(javascript|data|mailto|vbscript):/i.test(v)) return '';
        if (/^https?:\\/\\//i.test(v)) return v;
        var cleanBase = String(cdnBase || 'https://cdn.jsdelivr.net/gh/gmshelf/truffled@main').replace(/\\/+$/, '');
        if (v.charAt(0) === '/') return cleanBase + v;
        return cleanBase + '/' + v.replace(/^\\.\\/+/, '');
      }

      function deriveGmshelfBaseClient(gameUrl) {
        try {
          var u = new URL(gameUrl);
          var parts = u.pathname.split('/');
          parts.pop();
          return u.origin + parts.join('/') + '/';
        } catch (_e) {
          return String(gameUrl || '').slice(0, String(gameUrl || '').lastIndexOf('/') + 1);
        }
      }

      function parseGmshelfManifestClient(rawJson, srcMeta) {
        var rows = Array.isArray(rawJson) ? rawJson : (rawJson && Array.isArray(rawJson.games) ? rawJson.games : []);
        if (!rows.length) return [];
        var col = (srcMeta && srcMeta.collection) || 'truffled';
        var cdnBase = (srcMeta && srcMeta.cdnBase) || 'https://cdn.jsdelivr.net/gh/gmshelf/truffled@main';
        var out = [];
        var seen = Object.create(null);
        rows.forEach(function (row) {
          if (!row || !row.name || !row.url) return;
          var name = String(row.name).replace(/<[^>]+>/g, '').replace(/\\s+/g, ' ').trim();
          if (!name || name === 'Untitled Game') return;
          if (/^-[a-z0-9]$/i.test(name)) name = name.slice(1).toUpperCase();
          var cleanUrl = String(row.url).split('?')[0].split('#')[0];
          var parts = cleanUrl.split('/').filter(Boolean);
          var slug = (parts.length >= 2 ? parts[1].replace(/\\.html?$/i, '').toLowerCase() : '') || normalizeKey(name);
          if (!slug || seen[slug]) return;
          var gameUrl = resolveGmshelfUrlClient(row.url, cdnBase);
          if (!gameUrl) return;
          seen[slug] = true;
          var imgRaw = String(row.img || '').trim();
          var cover = null;
          if (imgRaw && !/placeholder\\./i.test(imgRaw)) {
            cover = resolveGmshelfUrlClient(imgRaw, cdnBase);
          } else if (col === 'truffled' || col === 'seraph') {
            cover = cdnBase.replace(/\\/+$/, '') + '/covers/' + encodeURIComponent(slug) + '.webp';
          }
          out.push({
            id: 'gmshelf:' + col + ':' + slug,
            provider: 'gmshelf',
            collection: col,
            name: name,
            slug: slug,
            category: inferGmshelfCategoryClient(name, row.url),
            url: gameUrl,
            baseUrl: deriveGmshelfBaseClient(gameUrl),
            cover: cover,
            featured: out.length < 40
          });
        });
        return out;
      }

      async function fetchGmshelfCatalog() {
        gmshelfFetchedOnce = true;
        var stEl = document.getElementById('gmshelf-status');
        if (stEl) stEl.textContent = 'Syncing full GMShelf manifests (truffled + ckv + ugs)...';
        var sources = Array.isArray(CFG.gmshelfSources) ? CFG.gmshelfSources : [];
        var combined = [];
        var seen = Object.create(null);
        for (var i = 0; i < sources.length; i++) {
          var src = sources[i];
          var urls = Array.isArray(src.manifestUrls) ? src.manifestUrls : [];
          for (var j = 0; j < urls.length; j++) {
            try {
              var res = await fetch(urls[j] + '?t=' + Date.now());
              if (!res.ok) continue;
              var json = await res.json();
              var parsed = parseGmshelfManifestClient(json, src);
              if (parsed.length > 0) {
                parsed.forEach(function (item) {
                  var k = normalizeKey(item.name);
                  if (k && !seen[k]) {
                    seen[k] = true;
                    item.featured = item.featured || combined.length < 48;
                    combined.push(item);
                  }
                });
                break;
              }
            } catch (_e) {}
          }
        }
        if (combined.length > 0) {
          gmshelfModules = combined;
          rebuildMergedModules();
          if (stEl) stEl.textContent = 'Synced 100% — ' + combined.length + ' GMShelf games';
          return;
        }
        if (stEl) stEl.textContent = 'Showing ' + gmshelfModules.length + ' curated GMShelf games';
      }

      function encodeCkvPathClient(repoPath) {
        return String(repoPath || '').replace(/^\\/+/, '').split('/').map(function (s) {
          return encodeURIComponent(s);
        }).join('/');
      }

      function parseCkvTreeClient(treeItems, cdnBase) {
        if (!Array.isArray(treeItems)) return [];
        var cleanBase = String(cdnBase || CFG.ckvCdnBase || 'https://cdn.jsdelivr.net/gh/WanoCapy/ChickenKingsVault@main').replace(/\\/+$/, '');
        var exactImg = Object.create(null);
        var normImg = Object.create(null);
        function scoreExt(p) {
          var l = p.toLowerCase();
          if (/\\.png$/.test(l)) return 5;
          if (/\\.webp$/.test(l)) return 4;
          if (/\\.jpe?g$/.test(l)) return 3;
          if (/\\.avif$/.test(l)) return 2;
          return 1;
        }
        for (var i = 0; i < treeItems.length; i++) {
          var it = treeItems[i];
          if (!it || it.type !== 'blob' || typeof it.path !== 'string') continue;
          var p = it.path.replace(/^\\/+/, '');
          if (!/^gameimages\\/.+\\.(?:png|jpe?g|webp|avif|jfif|gif|svg|ico)$/i.test(p)) continue;
          var stem = p.slice('gameimages/'.length).replace(/\\.[^.]+$/, '');
          var ex = stem.toLowerCase();
          if (!exactImg[ex] || scoreExt(p) > scoreExt(exactImg[ex])) exactImg[ex] = p;
          var nk = normalizeKey(stem);
          if (nk && (!normImg[nk] || scoreExt(p) > scoreExt(normImg[nk]))) normImg[nk] = p;
        }
        var baseUrl = cleanBase + '/gamefiles/';
        var out = [];
        for (var j = 0; j < treeItems.length; j++) {
          var row = treeItems[j];
          if (!row || row.type !== 'blob' || typeof row.path !== 'string') continue;
          var fp = row.path.replace(/^\\/+/, '');
          if (!/^gamefiles\\/.+\\.html?$/i.test(fp)) continue;
          var fStem = fp.slice('gamefiles/'.length).replace(/\\.html?$/i, '');
          var title = fStem.replace(/[-_]+/g, ' ').replace(/\\s+/g, ' ').trim();
          title = title ? title.split(' ').map(function (w) { return w ? w.charAt(0).toUpperCase() + w.slice(1) : ''; }).join(' ') : 'Untitled Game';
          var matched = exactImg[fStem.toLowerCase()] || normImg[normalizeKey(fStem)];
          out.push({
            id: 'ckv:' + fp,
            provider: 'ckv',
            name: title,
            category: inferGmshelfCategoryClient(title, fp),
            url: cleanBase + '/' + encodeCkvPathClient(fp),
            baseUrl: baseUrl,
            cover: matched ? (cleanBase + '/' + encodeCkvPathClient(matched)) : null,
            featured: out.length < 36
          });
        }
        out.sort(function (a, b) { return a.name.localeCompare(b.name); });
        return out;
      }

      function parseCkvJsonFallbackClient(rawJson) {
        var rows = rawJson && Array.isArray(rawJson.games) ? rawJson.games : (Array.isArray(rawJson) ? rawJson : []);
        var base = 'https://cdn.jsdelivr.net/gh/gmshelf/ckv@main';
        var out = [];
        var seen = Object.create(null);
        rows.forEach(function (r) {
          if (!r || !r.name || !r.url) return;
          var name = String(r.name).trim();
          var k = normalizeKey(name);
          if (!k || seen[k]) return;
          seen[k] = true;
          var u = resolveGmshelfUrlClient(r.url, base);
          if (!u) return;
          var img = r.img && !/placeholder\\./i.test(String(r.img)) ? resolveGmshelfUrlClient(r.img, base) : null;
          out.push({
            id: 'ckv:gmshelf:' + k,
            provider: 'ckv',
            name: name,
            category: inferGmshelfCategoryClient(name, r.url),
            url: u,
            baseUrl: deriveGmshelfBaseClient(u),
            cover: img,
            featured: out.length < 36
          });
        });
        out.sort(function (a, b) { return a.name.localeCompare(b.name); });
        return out;
      }

      async function fetchCkvCatalog() {
        ckvFetchedOnce = true;
        var stEl = document.getElementById('ckv-status');
        if (stEl) stEl.textContent = 'Syncing full CKV game vault...';
        if (CFG.ckvTreeApiUrl) {
          try {
            var res = await fetch(CFG.ckvTreeApiUrl);
            if (res.ok) {
              var treeJson = await res.json();
              if (treeJson && Array.isArray(treeJson.tree)) {
                var fullList = parseCkvTreeClient(treeJson.tree, CFG.ckvCdnBase);
                if (fullList.length > 0) {
                  ckvModules = fullList;
                  rebuildMergedModules();
                  if (stEl) stEl.textContent = 'Synced 100% — ' + fullList.length + ' CKV games';
                  return;
                }
              }
            }
          } catch (_e) {}
        }
        var mirrors = Array.isArray(CFG.ckvGmshelfMirrors) ? CFG.ckvGmshelfMirrors : [];
        for (var i = 0; i < mirrors.length; i++) {
          try {
            var mr = await fetch(mirrors[i] + '?t=' + Date.now());
            if (!mr.ok) continue;
            var mj = await mr.json();
            var altList = parseCkvJsonFallbackClient(mj);
            if (altList.length > 0) {
              ckvModules = altList;
              rebuildMergedModules();
              if (stEl) stEl.textContent = 'Synced 100% — ' + altList.length + ' CKV games';
              return;
            }
          } catch (_e) {}
        }
        if (stEl) stEl.textContent = 'Showing ' + ckvModules.length + ' CKV games';
      }

      function parseSeraphHtmlClient(rawHtml, cdnBase) {
        if (!rawHtml) return [];
        var cleanBase = String(cdnBase || CFG.seraphCdnBase).replace(/\\/+$/, '');
        var out = [];
        var seen = Object.create(null);
        try {
          var doc = new DOMParser().parseFromString(rawHtml, 'text/html');
          var anchors = doc.querySelectorAll('.button-container a[href], a[href]');
          anchors.forEach(function (a) {
            var href = String(a.getAttribute('href') || '').trim();
            if (!href || href.charAt(0) === '#' || /^https?:/i.test(href) || href.indexOf('..') === 0) return;
            if (!/\\.html?$/i.test(href)) return;
            var h2 = a.querySelector('h2');
            if (!h2 || !h2.textContent) return;
            var slug = href.split('/')[0].toLowerCase();
            if (!slug || seen[slug]) return;
            seen[slug] = true;
            var btnDiv = a.querySelector('[data-genre]') || a.querySelector('.button');
            var rawGenre = btnDiv ? (btnDiv.getAttribute('data-genre') || 'arcade') : 'arcade';
            var genre = rawGenre.charAt(0).toUpperCase() + rawGenre.slice(1).toLowerCase();
            var styleAttr = btnDiv ? String(btnDiv.getAttribute('style') || '') : '';
            var bgMatch = styleAttr.match(/url\\(\\s*['"]?([^'")]+)['"]?\\s*\\)/i);
            var cover = null;
            if (bgMatch && bgMatch[1]) {
              var relCover = bgMatch[1].trim();
              if (/^https?:/i.test(relCover)) cover = relCover;
              else cover = cleanBase + '/' + relCover.replace(/^(\\.\\.\\/)+/, '').replace(/^\\.\\//, '');
            }
            var gameUrl = cleanBase + '/games/' + href.replace(/^\\.\\//, '');
            var baseUrl = gameUrl.slice(0, gameUrl.lastIndexOf('/') + 1);
            out.push({
              id: 'seraph:' + slug,
              provider: 'seraph',
              name: h2.textContent.replace(/\\s+/g, ' ').trim(),
              slug: slug,
              category: genre,
              url: gameUrl,
              baseUrl: baseUrl,
              cover: cover,
              featured: out.length < 30
            });
          });
        } catch (_e) {}
        return out;
      }

      async function fetchSeraphCatalog() {
        seraphFetchedOnce = true;
        var stEl = document.getElementById('seraph-status');
        if (stEl) stEl.textContent = 'Syncing Seraph catalog...';
        var mirrors = Array.isArray(CFG.seraphIndexMirrors) ? CFG.seraphIndexMirrors : [];
        for (var i = 0; i < mirrors.length; i++) {
          try {
            var res = await fetch(mirrors[i] + '?t=' + Date.now());
            if (!res.ok) continue;
            var html = await res.text();
            var parsed = parseSeraphHtmlClient(html, CFG.seraphCdnBase);
            if (parsed.length > 0) {
              seraphModules = parsed;
              rebuildMergedModules();
              if (stEl) stEl.textContent = 'Synced ' + parsed.length + ' Seraph games';
              return;
            }
          } catch (_e) {}
        }
        if (stEl) stEl.textContent = 'Showing ' + seraphModules.length + ' curated Seraph games';
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
        var hueSeed = 0;
        for (var hi = 0; hi < mod.name.length; hi++) hueSeed = (hueSeed * 31 + mod.name.charCodeAt(hi)) % 360;
        fb.style.background = 'radial-gradient(circle at 22% 18%, hsla(' + hueSeed + ',78%,54%,0.34), transparent 64%), linear-gradient(135deg, hsla(' + ((hueSeed + 40) % 360) + ',52%,20%,0.95) 0%, var(--bg) 100%)';
        fb.textContent = mod.name;
        thumb.appendChild(fb);

        if (mod.cover) {
          var img = document.createElement('img');
          img.src = mod.cover;
          img.alt = mod.name;
          img.loading = 'lazy';
          img.decoding = 'async';
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

      function renderCardsChunked(grid, list, emptyMsg) {
        if (!grid) return;
        var token = (grid._renderToken || 0) + 1;
        grid._renderToken = token;
        if (grid._renderRaf) {
          cancelAnimationFrame(grid._renderRaf);
          grid._renderRaf = 0;
        }
        grid.innerHTML = '';
        if (!list.length) {
          var empty = document.createElement('div');
          empty.className = 'sub';
          empty.textContent = emptyMsg || 'No games found.';
          grid.appendChild(empty);
          return;
        }
        var cursor = 0;
        var firstBatch = 60;
        var stepBatch = 120;
        function flush(limit) {
          if (grid._renderToken !== token) return;
          var end = Math.min(list.length, cursor + limit);
          var frag = document.createDocumentFragment();
          for (var i = cursor; i < end; i++) {
            var item = list[i];
            var hits = typeof item.numericId === 'number' ? (popularityMap[item.numericId] || 0) : 0;
            frag.appendChild(createStudyCard(item, hits));
          }
          grid.appendChild(frag);
          cursor = end;
          if (cursor < list.length) {
            grid._renderRaf = requestAnimationFrame(function () {
              flush(stepBatch);
            });
          } else {
            grid._renderRaf = 0;
          }
        }
        flush(firstBatch);
      }

      function renderModulesGrid() {
        var grid = document.getElementById('modules-grid');
        if (!grid) return;
        var q = (document.getElementById('modules-search').value || '').trim().toLowerCase();
        var sort = document.getElementById('modules-sort').value;
        var pool = mergedModules;
        if (activeModuleFilter === 'gn') pool = gnZones;
        else if (activeModuleFilter === 'seraph') pool = seraphModules;
        else if (activeModuleFilter === 'gmshelf') pool = gmshelfModules;
        else if (activeModuleFilter === 'ugs') pool = ugsModules;
        else if (activeModuleFilter === 'ckv') pool = ckvModules;
        else if (activeModuleFilter === 'builtin') pool = CFG.staticModules;

        var list = pool.filter(function (m) {
          if (activeModuleFilter === 'favorites') {
            if (favorites.indexOf(m.id) === -1 && favorites.indexOf(m.name) === -1) return false;
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

        renderCardsChunked(grid, list, 'No games matched your filter.');
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
        renderCardsChunked(grid, list, 'Syncing gn-math zones.json...');
      }

      function renderSeraphGrid() {
        var grid = document.getElementById('seraph-grid');
        if (!grid) return;
        var searchEl = document.getElementById('seraph-search');
        var q = (searchEl ? searchEl.value : '').trim().toLowerCase();
        var list = seraphModules.filter(function (m) {
          var matchGenre = activeSeraphGenre === 'All' || String(m.category || '').toLowerCase() === activeSeraphGenre.toLowerCase();
          var matchQ = !q || m.name.toLowerCase().indexOf(q) !== -1 || String(m.category || '').toLowerCase().indexOf(q) !== -1;
          return matchGenre && matchQ;
        });
        renderCardsChunked(grid, list, 'No Seraph games matched "' + q + '" in ' + activeSeraphGenre + '.');
      }

      function renderGmshelfGrid() {
        var grid = document.getElementById('gmshelf-grid');
        if (!grid) return;
        var searchEl = document.getElementById('gmshelf-search');
        var q = (searchEl ? searchEl.value : '').trim().toLowerCase();
        var list = gmshelfModules.filter(function (m) {
          var matchGenre = activeGmshelfGenre === 'All' || String(m.category || '').toLowerCase() === activeGmshelfGenre.toLowerCase();
          var matchQ = !q || m.name.toLowerCase().indexOf(q) !== -1 || String(m.category || '').toLowerCase().indexOf(q) !== -1;
          return matchGenre && matchQ;
        });
        renderCardsChunked(grid, list, 'No GMShelf games matched "' + q + '" in ' + activeGmshelfGenre + '.');
      }

      function renderCkvGrid() {
        var grid = document.getElementById('ckv-grid');
        if (!grid) return;
        var searchEl = document.getElementById('ckv-search');
        var q = (searchEl ? searchEl.value : '').trim().toLowerCase();
        var list = ckvModules.filter(function (m) {
          return !q || m.name.toLowerCase().indexOf(q) !== -1 || String(m.category || '').toLowerCase().indexOf(q) !== -1;
        });
        list.sort(function (a, b) {
          if (activeCkvSort === 'az') return a.name.localeCompare(b.name);
          if (activeCkvSort === 'za') return b.name.localeCompare(a.name);
          return Number(b.featured) - Number(a.featured) || a.name.localeCompare(b.name);
        });
        renderCardsChunked(grid, list, 'No CKV games matched "' + q + '".');
      }

      document.querySelectorAll('#seraph-genre-pills .pill-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
          activeSeraphGenre = btn.getAttribute('data-sgenre') || 'All';
          document.querySelectorAll('#seraph-genre-pills .pill-btn').forEach(function (b) {
            b.classList.toggle('active', b === btn);
          });
          renderSeraphGrid();
        });
      });

      document.querySelectorAll('#gmshelf-genre-pills .pill-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
          activeGmshelfGenre = btn.getAttribute('data-ggenre') || 'All';
          document.querySelectorAll('#gmshelf-genre-pills .pill-btn').forEach(function (b) {
            b.classList.toggle('active', b === btn);
          });
          renderGmshelfGrid();
        });
      });

      document.querySelectorAll('#ckv-sort-pills .pill-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
          activeCkvSort = btn.getAttribute('data-ckvsort') || 'featured';
          document.querySelectorAll('#ckv-sort-pills .pill-btn').forEach(function (b) {
            b.classList.toggle('active', b === btn);
          });
          renderCkvGrid();
        });
      });

      var seraphSearchEl = document.getElementById('seraph-search');
      if (seraphSearchEl) seraphSearchEl.addEventListener('input', renderSeraphGrid);
      var seraphRefreshBtn = document.getElementById('btn-refresh-seraph');
      if (seraphRefreshBtn) seraphRefreshBtn.addEventListener('click', fetchSeraphCatalog);

      var gmshelfSearchEl = document.getElementById('gmshelf-search');
      if (gmshelfSearchEl) gmshelfSearchEl.addEventListener('input', renderGmshelfGrid);
      var gmshelfRefreshBtn = document.getElementById('btn-refresh-gmshelf');
      if (gmshelfRefreshBtn) gmshelfRefreshBtn.addEventListener('click', fetchGmshelfCatalog);

      var ckvSearchEl = document.getElementById('ckv-search');
      if (ckvSearchEl) ckvSearchEl.addEventListener('input', renderCkvGrid);
      var ckvRefreshBtn = document.getElementById('btn-refresh-ckv');
      if (ckvRefreshBtn) ckvRefreshBtn.addEventListener('click', fetchCkvCatalog);

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
      document.getElementById('btn-refresh-modules').addEventListener('click', function () {
        fetchGnZones();
        fetchSeraphCatalog();
        fetchGmshelfCatalog();
        fetchCkvCatalog();
      });
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
        if (typeof recordVuxStat === 'function') recordVuxStat('gamesLaunched', 1);
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
        try {
          moduleMsg.textContent = 'Routing ' + moduleItem.name + ' through Vux Scramjet proxy...';
          var scramRes = await resolveScramUrlViaBridge(moduleItem.url);
          if (activeModuleObj !== moduleItem) return;
          if (scramRes && scramRes.encodedUrl) {
            moduleFrame.onload = function () { moduleStatus.classList.remove('open'); };
            moduleFrame.src = scramRes.encodedUrl;
            setTimeout(function () { moduleStatus.classList.remove('open'); }, 3500);
            return;
          }
        } catch (_pe) {}
        moduleSpinner.style.display = 'none';
        moduleMsg.textContent = 'Unable to load module directly — click Open in Vux to launch in a proxied tab.';
      }

      document.getElementById('module-ov-close').addEventListener('click', function () {
        activeModuleObj = null;
        moduleFrame.removeAttribute('srcdoc');
        moduleFrame.removeAttribute('src');
        moduleOverlay.classList.remove('open');
      });
      var modPipBtn = document.getElementById('module-ov-pip');
      if (modPipBtn) {
        modPipBtn.addEventListener('click', function () {
          if (!activeModuleObj) return;
          var modSnap = activeModuleObj;
          var docHtml = moduleFrame.getAttribute('srcdoc') || '';
          document.getElementById('module-ov-close').click();
          if (docHtml && typeof openVuxPipSrcdoc === 'function') {
            openVuxPipSrcdoc(docHtml, modSnap.name);
          } else if (typeof openVuxPip === 'function') {
            openVuxPip(modSnap.url, modSnap.name, true);
          }
        });
      }
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
        st.textContent = 'Unable to reach jsDelivr right now — click Open in Vux to proxy gn-math.';
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

      var movPipBtn = document.getElementById('movie-ov-pip');
      if (movPipBtn) {
        movPipBtn.addEventListener('click', function () {
          if (!activeMovieObj) return;
          var frameUrl = document.getElementById('cinema-player-frame').getAttribute('src') || activeMovieObj.watchPageUrl || '';
          var movTitle = activeMovieObj.title;
          document.getElementById('movie-ov-close').click();
          if (frameUrl && typeof openVuxPip === 'function') {
            openVuxPip(frameUrl, movTitle, false);
          }
        });
      }

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

      /* ---------------- STUDYHUB ALL-IN-ONE MP3 PLAYER & AMBIENT MIXER ---------------- */
      var audioStations = Array.isArray(CFG.audioStations) && CFG.audioStations.length ? CFG.audioStations : [];
      var ambientSpecs = Array.isArray(CFG.ambientLayers) && CFG.ambientLayers.length ? CFG.ambientLayers : [];
      var globalAudioEl = document.getElementById('vux-global-audio');
      var audioVizCanvas = document.getElementById('vux-audio-viz');
      var audioVizCtx = audioVizCanvas ? audioVizCanvas.getContext('2d') : null;
      var audioPlayBtn = document.getElementById('vux-audio-play');
      var audioPrevBtn = document.getElementById('vux-audio-prev');
      var audioNextBtn = document.getElementById('vux-audio-next');
      var audioShuffleBtn = document.getElementById('vux-audio-shuffle');
      var audioRepeatBtn = document.getElementById('vux-audio-repeat');
      var audioSeekEl = document.getElementById('vux-audio-seek');
      var audioVolEl = document.getElementById('vux-audio-vol');
      var audioCurEl = document.getElementById('vux-audio-cur');
      var audioDurEl = document.getElementById('vux-audio-dur');
      var audioTitleEl = document.getElementById('vux-audio-track-title');
      var audioDescEl = document.getElementById('vux-audio-track-desc');
      var audioCatEl = document.getElementById('vux-audio-station-cat');
      var audioBadgeEl = document.getElementById('vux-audio-mode-badge');

      var audioMode = 'station'; // 'station' | 'url' | 'file'
      var activeStationIdx = 0;
      var audioPlaying = false;
      var audioShuffle = false;
      var audioRepeat = false;
      var audioMasterVol = 0.8;
      var synthElapsed = 0;
      var synthStep = 0;
      var synthStepTimer = null;
      var synthSecTimer = null;
      var audioCtx = null;
      var audioMasterGain = null;
      var audioFilter = null;
      var audioAnalyser = null;
      var audioAnalyserData = null;
      var mediaElConnected = false;
      var audioVizRaf = 0;
      var ambientNodes = Object.create(null);
      var ambientVols = Object.create(null);
      try {
        var rawAmb = safeLSGet('vux_ambient_vols');
        if (rawAmb) ambientVols = JSON.parse(rawAmb) || Object.create(null);
      } catch (_e) {}

      function formatTrackTime(sec) {
        var s = Math.max(0, Math.floor(Number.isFinite(sec) ? sec : 0));
        return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0');
      }

      function ensureVuxAudioEngine() {
        var Ctx = window.AudioContext || window.webkitAudioContext;
        if (!Ctx) return null;
        if (!audioCtx) {
          audioCtx = new Ctx();
          audioMasterGain = audioCtx.createGain();
          audioMasterGain.gain.value = audioMasterVol;
          audioFilter = audioCtx.createBiquadFilter();
          audioFilter.type = 'lowpass';
          audioFilter.frequency.value = 1100;
          audioAnalyser = audioCtx.createAnalyser();
          audioAnalyser.fftSize = 64;
          audioAnalyserData = new Uint8Array(audioAnalyser.frequencyBinCount);
          audioFilter.connect(audioMasterGain);
          audioMasterGain.connect(audioAnalyser);
          audioAnalyser.connect(audioCtx.destination);
        }
        if (audioCtx.state === 'suspended') {
          audioCtx.resume().catch(function () {});
        }
        return audioCtx;
      }

      function broadcastAudioState() {
        var st = audioStations[activeStationIdx];
        var title = audioMode === 'station' && st ? st.title : (audioTitleEl ? audioTitleEl.textContent : 'Vux Audio');
        var artist = audioMode === 'station' && st ? (st.artist + ' · ' + st.genre) : 'Custom Audio Stream';
        var frame = document.getElementById('valbrowse-proxy-frame');
        if (frame && frame.contentWindow) {
          try {
            frame.contentWindow.postMessage({
              type: 'vux-audio-state',
              playing: audioPlaying,
              label: audioPlaying ? title : 'Nothing playing',
              title: title,
              artist: artist
            }, '*');
          } catch (_e) {}
        }
      }

      function updateAudioTimeUi() {
        if (audioMode === 'station') {
          var st = audioStations[activeStationIdx];
          var dur = st ? st.durationSec : 180;
          if (audioCurEl) audioCurEl.textContent = formatTrackTime(synthElapsed);
          if (audioDurEl) audioDurEl.textContent = formatTrackTime(dur);
          if (audioSeekEl) {
            audioSeekEl.max = String(dur);
            audioSeekEl.value = String(Math.min(dur, Math.floor(synthElapsed)));
          }
        } else if (globalAudioEl) {
          var elDur = Number.isFinite(globalAudioEl.duration) && globalAudioEl.duration > 0 ? globalAudioEl.duration : 0;
          if (audioCurEl) audioCurEl.textContent = formatTrackTime(globalAudioEl.currentTime || 0);
          if (audioDurEl) audioDurEl.textContent = elDur ? formatTrackTime(elDur) : '--:--';
          if (audioSeekEl && elDur) {
            audioSeekEl.max = String(Math.floor(elDur));
            audioSeekEl.value = String(Math.floor(globalAudioEl.currentTime || 0));
          }
        }
      }

      function stopStationTimers() {
        if (synthStepTimer) { clearInterval(synthStepTimer); synthStepTimer = null; }
        if (synthSecTimer) { clearInterval(synthSecTimer); synthSecTimer = null; }
      }

      function triggerStationChord() {
        var st = audioStations[activeStationIdx];
        if (!st || !audioCtx || !audioFilter || audioMode !== 'station' || !audioPlaying) return;
        if (synthStep % 4 === 0) {
          var chords = st.chords || [[261.63, 329.63, 392, 493.88]];
          var chord = chords[Math.floor(synthStep / 4) % chords.length];
          var now = audioCtx.currentTime;
          var durSec = (60 / (st.bpm || 76)) * 2.2;
          chord.forEach(function (freq) {
            var osc = audioCtx.createOscillator();
            var gain = audioCtx.createGain();
            osc.type = st.waveform || 'triangle';
            osc.frequency.setValueAtTime(freq, now);
            gain.gain.setValueAtTime(0.0001, now);
            gain.gain.linearRampToValueAtTime(0.042, now + 0.09);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + durSec);
            osc.connect(gain);
            gain.connect(audioFilter);
            osc.start(now);
            osc.stop(now + durSec + 0.05);
          });
        }
        synthStep += 1;
      }

      function drawAudioViz() {
        audioVizRaf = 0;
        if (!audioVizCtx || !audioVizCanvas) return;
        var w = audioVizCanvas.width;
        var h = audioVizCanvas.height;
        audioVizCtx.clearRect(0, 0, w, h);
        var accent = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#ff5c7c';
        var bars = 32;
        var barW = (w - 16) / bars;
        if (audioAnalyser && audioAnalyserData && audioPlaying) {
          audioAnalyser.getByteFrequencyData(audioAnalyserData);
        }
        var t = performance.now() * 0.003;
        for (var i = 0; i < bars; i++) {
          var rawVal = (audioPlaying && audioAnalyserData) ? audioAnalyserData[i % audioAnalyserData.length] / 255 : 0;
          var waveFallback = audioPlaying ? (0.18 + 0.42 * Math.abs(Math.sin(t + i * 0.35))) : (0.08 + 0.04 * Math.sin(i * 0.4));
          var amp = Math.max(0.08, Math.min(0.95, rawVal * 0.85 + waveFallback * (rawVal > 0.02 ? 0.15 : 1)));
          var bh = Math.max(6, Math.round(amp * (h - 16)));
          var x = 8 + i * barW;
          var y = h - 8 - bh;
          audioVizCtx.fillStyle = accent;
          audioVizCtx.globalAlpha = audioPlaying ? (0.45 + amp * 0.55) : 0.24;
          audioVizCtx.fillRect(x, y, Math.max(3, barW - 4), bh);
        }
        audioVizCtx.globalAlpha = 1;
        if (currentView === 'music' && !document.hidden && (audioPlaying || hasAnyActiveAmbient())) {
          audioVizRaf = requestAnimationFrame(drawAudioViz);
        }
      }

      function syncAudioVizLoop() {
        if (audioVizRaf) { cancelAnimationFrame(audioVizRaf); audioVizRaf = 0; }
        if (currentView === 'music') {
          audioVizRaf = requestAnimationFrame(drawAudioViz);
        }
      }

      function renderAudioStations() {
        var wrap = document.getElementById('vux-audio-stations');
        if (!wrap) return;
        wrap.innerHTML = '';
        audioStations.forEach(function (st, idx) {
          var card = document.createElement('button');
          card.type = 'button';
          card.className = 'mp3-station-card' + (audioMode === 'station' && activeStationIdx === idx ? ' active' : '');
          card.setAttribute('data-station-id', st.id);
          var t = document.createElement('div');
          t.style.cssText = 'font-size:13px;font-weight:700;';
          t.textContent = st.title;
          var sub = document.createElement('div');
          sub.className = 'sub';
          sub.textContent = st.genre + ' · ' + st.bpm + ' BPM';
          card.appendChild(t);
          card.appendChild(sub);
          card.onclick = function () {
            selectStation(idx, true);
          };
          wrap.appendChild(card);
        });
      }

      function pauseAudioPlayback() {
        audioPlaying = false;
        stopStationTimers();
        if (globalAudioEl && !globalAudioEl.paused) {
          try { globalAudioEl.pause(); } catch (_e) {}
        }
        if (audioPlayBtn) audioPlayBtn.textContent = 'Play';
        if (audioBadgeEl) audioBadgeEl.textContent = 'Paused';
        broadcastAudioState();
        syncAudioVizLoop();
      }

      function startAudioPlayback() {
        ensureVuxAudioEngine();
        audioPlaying = true;
        if (typeof recordVuxStat === 'function') recordVuxStat('tracksPlayed', 1);
        if (audioMode === 'station') {
          if (globalAudioEl && !globalAudioEl.paused) {
            try { globalAudioEl.pause(); } catch (_e) {}
          }
          var st = audioStations[activeStationIdx];
          if (audioFilter && audioCtx && st) {
            audioFilter.frequency.setTargetAtTime(st.filterHz || 1050, audioCtx.currentTime, 0.05);
          }
          stopStationTimers();
          synthStep = 0;
          triggerStationChord();
          var stepMs = Math.max(160, Math.round((60 / ((st && st.bpm) || 76) / 2) * 1000));
          synthStepTimer = setInterval(triggerStationChord, stepMs);
          synthSecTimer = setInterval(function () {
            if (!audioPlaying || audioMode !== 'station') return;
            synthElapsed += 1;
            var dur = (st && st.durationSec) || 180;
            if (synthElapsed >= dur) {
              if (audioRepeat) synthElapsed = 0;
              else stepStation(1);
            }
            updateAudioTimeUi();
          }, 1000);
        } else if (globalAudioEl) {
          stopStationTimers();
          if (!mediaElConnected && audioCtx && audioMasterGain) {
            try {
              var srcNode = audioCtx.createMediaElementSource(globalAudioEl);
              srcNode.connect(audioMasterGain);
              mediaElConnected = true;
            } catch (_e) {}
          }
          globalAudioEl.volume = audioMasterVol;
          globalAudioEl.play().catch(function () {});
        }
        if (audioPlayBtn) audioPlayBtn.textContent = 'Pause';
        if (audioBadgeEl) audioBadgeEl.textContent = 'Playing';
        broadcastAudioState();
        syncAudioVizLoop();
      }

      function selectStation(idx, autoPlay) {
        if (!audioStations.length) return;
        activeStationIdx = ((idx % audioStations.length) + audioStations.length) % audioStations.length;
        audioMode = 'station';
        synthElapsed = 0;
        var st = audioStations[activeStationIdx];
        if (audioCatEl) audioCatEl.textContent = 'STUDYHUB STATION · ' + st.genre.toUpperCase();
        if (audioTitleEl) audioTitleEl.textContent = st.title;
        if (audioDescEl) audioDescEl.textContent = st.artist + ' · ' + st.bpm + ' BPM';
        renderAudioStations();
        updateAudioTimeUi();
        if (autoPlay || audioPlaying) startAudioPlayback();
        else broadcastAudioState();
      }

      function stepStation(delta) {
        if (!audioStations.length) return;
        if (audioShuffle && audioStations.length > 1) {
          var nextIdx = activeStationIdx;
          while (nextIdx === activeStationIdx) {
            nextIdx = Math.floor(Math.random() * audioStations.length);
          }
          selectStation(nextIdx, true);
        } else {
          selectStation(activeStationIdx + delta, true);
        }
      }

      function handleExternalAudioControl(action) {
        if (action === 'prev') stepStation(-1);
        else if (action === 'next') stepStation(1);
        else if (action === 'toggle') {
          if (audioPlaying) pauseAudioPlayback();
          else startAudioPlayback();
        }
      }

      if (audioPlayBtn) {
        audioPlayBtn.addEventListener('click', function () {
          if (audioPlaying) pauseAudioPlayback();
          else startAudioPlayback();
        });
      }
      if (audioPrevBtn) audioPrevBtn.addEventListener('click', function () { stepStation(-1); });
      if (audioNextBtn) audioNextBtn.addEventListener('click', function () { stepStation(1); });
      if (audioShuffleBtn) {
        audioShuffleBtn.addEventListener('click', function () {
          audioShuffle = !audioShuffle;
          audioShuffleBtn.classList.toggle('active', audioShuffle);
          audioShuffleBtn.textContent = 'Shuffle: ' + (audioShuffle ? 'On' : 'Off');
        });
      }
      if (audioRepeatBtn) {
        audioRepeatBtn.addEventListener('click', function () {
          audioRepeat = !audioRepeat;
          audioRepeatBtn.classList.toggle('active', audioRepeat);
          audioRepeatBtn.textContent = 'Repeat: ' + (audioRepeat ? 'On' : 'Off');
          if (globalAudioEl) globalAudioEl.loop = audioRepeat;
        });
      }
      if (audioSeekEl) {
        audioSeekEl.addEventListener('input', function () {
          var v = Number(audioSeekEl.value) || 0;
          if (audioMode === 'station') {
            synthElapsed = v;
          } else if (globalAudioEl && Number.isFinite(globalAudioEl.duration)) {
            globalAudioEl.currentTime = v;
          }
          updateAudioTimeUi();
        });
      }
      if (audioVolEl) {
        audioVolEl.addEventListener('input', function () {
          audioMasterVol = Math.max(0, Math.min(1, Number(audioVolEl.value) / 100));
          if (audioMasterGain && audioCtx) {
            audioMasterGain.gain.setTargetAtTime(audioMasterVol, audioCtx.currentTime, 0.04);
          }
          if (globalAudioEl) globalAudioEl.volume = audioMasterVol;
        });
      }

      if (globalAudioEl) {
        globalAudioEl.addEventListener('timeupdate', updateAudioTimeUi);
        globalAudioEl.addEventListener('ended', function () {
          if (audioRepeat) {
            globalAudioEl.currentTime = 0;
            globalAudioEl.play().catch(function () {});
          } else {
            stepStation(1);
          }
        });
      }

      var mp3Form = document.getElementById('vux-custom-mp3-form');
      var mp3UrlIn = document.getElementById('vux-custom-mp3-url');
      if (mp3Form && mp3UrlIn && globalAudioEl) {
        mp3Form.addEventListener('submit', function (e) {
          e.preventDefault();
          var raw = (mp3UrlIn.value || '').trim();
          if (!raw || /^(javascript|data|vbscript|file):/i.test(raw)) return;
          audioMode = 'url';
          stopStationTimers();
          globalAudioEl.src = raw;
          if (audioCatEl) audioCatEl.textContent = 'CUSTOM STREAM';
          if (audioTitleEl) audioTitleEl.textContent = raw.split('/').pop().split('?')[0] || 'Custom MP3 Stream';
          if (audioDescEl) audioDescEl.textContent = raw;
          renderAudioStations();
          startAudioPlayback();
        });
      }

      var localAudioIn = document.getElementById('local-audio-input');
      if (localAudioIn && globalAudioEl) {
        localAudioIn.addEventListener('change', function (e) {
          var f = e.target.files && e.target.files[0];
          if (!f) return;
          audioMode = 'file';
          stopStationTimers();
          globalAudioEl.src = URL.createObjectURL(f);
          if (audioCatEl) audioCatEl.textContent = 'LOCAL AUDIO FILE';
          if (audioTitleEl) audioTitleEl.textContent = f.name;
          if (audioDescEl) audioDescEl.textContent = Math.round(f.size / 1024) + ' KB · Local Device';
          renderAudioStations();
          startAudioPlayback();
        });
      }

      /* ---------------- AMBIENT SOUND MIXER (RAIN, FIREPLACE, CAFE, KEYBOARD) ---------------- */
      function hasAnyActiveAmbient() {
        return Object.keys(ambientVols).some(function (k) { return Number(ambientVols[k]) > 0; });
      }

      function createNoiseBuffer(ctx, secs) {
        var len = Math.floor(ctx.sampleRate * secs);
        var buf = ctx.createBuffer(1, len, ctx.sampleRate);
        var out = buf.getChannelData(0);
        var last = 0;
        for (var i = 0; i < len; i++) {
          var white = Math.random() * 2 - 1;
          last = (last + 0.04 * white) / 1.04;
          out[i] = last * 3.2;
        }
        return buf;
      }

      function setAmbientLayerVolume(layerId, volPct) {
        var vol = Math.max(0, Math.min(100, Number(volPct) || 0));
        ambientVols[layerId] = vol;
        safeLSSet('vux_ambient_vols', JSON.stringify(ambientVols));
        if (vol <= 0) {
          if (ambientNodes[layerId]) {
            try {
              if (ambientNodes[layerId].gain && audioCtx) {
                ambientNodes[layerId].gain.gain.setTargetAtTime(0.0001, audioCtx.currentTime, 0.05);
              }
            } catch (_e) {}
          }
          renderAmbientMixer();
          return;
        }
        var ctx = ensureVuxAudioEngine();
        if (!ctx || !audioAnalyser) return;
        if (!ambientNodes[layerId]) {
          var gainNode = ctx.createGain();
          gainNode.gain.value = (vol / 100) * 0.25;
          gainNode.connect(audioAnalyser);
          if (layerId === 'keyboard') {
            var kTimer = setInterval(function () {
              var curV = Number(ambientVols.keyboard || 0);
              if (curV <= 0 || !audioCtx || document.hidden) return;
              if (Math.random() < 0.65) {
                var o = audioCtx.createOscillator();
                var kg = audioCtx.createGain();
                o.type = 'triangle';
                o.frequency.setValueAtTime(420 + Math.random() * 340, audioCtx.currentTime);
                kg.gain.setValueAtTime(0.0001, audioCtx.currentTime);
                kg.gain.linearRampToValueAtTime((curV / 100) * 0.08, audioCtx.currentTime + 0.004);
                kg.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.032);
                o.connect(kg);
                kg.connect(gainNode);
                o.start();
                o.stop(audioCtx.currentTime + 0.036);
              }
            }, 145);
            ambientNodes[layerId] = { gain: gainNode, timer: kTimer };
          } else {
            var src = ctx.createBufferSource();
            src.buffer = createNoiseBuffer(ctx, 3);
            src.loop = true;
            var flt = ctx.createBiquadFilter();
            if (layerId === 'rain') { flt.type = 'bandpass'; flt.frequency.value = 1150; flt.Q.value = 0.6; }
            else if (layerId === 'fireplace') { flt.type = 'lowpass'; flt.frequency.value = 460; }
            else { flt.type = 'bandpass'; flt.frequency.value = 720; flt.Q.value = 1.1; }
            src.connect(flt);
            flt.connect(gainNode);
            src.start();
            ambientNodes[layerId] = { gain: gainNode, src: src, flt: flt };
          }
        } else {
          ambientNodes[layerId].gain.gain.setTargetAtTime((vol / 100) * 0.25, ctx.currentTime, 0.05);
        }
        renderAmbientMixer();
        syncAudioVizLoop();
      }

      function renderAmbientMixer() {
        var wrap = document.getElementById('vux-ambient-list');
        if (!wrap) return;
        wrap.innerHTML = '';
        ambientSpecs.forEach(function (spec) {
          var v = Math.max(0, Math.min(100, Number(ambientVols[spec.id] || 0)));
          var row = document.createElement('div');
          row.className = 'ambient-row';
          var meta = document.createElement('div');
          meta.style.minWidth = '130px';
          var nm = document.createElement('div');
          nm.style.cssText = 'font-size:13px;font-weight:700;';
          nm.textContent = spec.label;
          var ds = document.createElement('div');
          ds.className = 'sub';
          ds.textContent = spec.description;
          meta.appendChild(nm);
          meta.appendChild(ds);

          var ctrls = document.createElement('div');
          ctrls.className = 'pill-row';
          var sl = document.createElement('input');
          sl.type = 'range';
          sl.min = '0';
          sl.max = '100';
          sl.value = String(v);
          sl.style.cssText = 'width:100px;accent-color:var(--accent);';
          sl.setAttribute('aria-label', spec.label + ' ambient volume');
          sl.oninput = function () { setAmbientLayerVolume(spec.id, Number(sl.value)); };
          var tog = document.createElement('button');
          tog.type = 'button';
          tog.className = 'pill-btn' + (v > 0 ? ' active' : '');
          tog.style.height = '28px';
          tog.textContent = v > 0 ? (v + '%') : 'Off';
          tog.onclick = function () {
            setAmbientLayerVolume(spec.id, v > 0 ? 0 : 48);
          };
          ctrls.appendChild(sl);
          ctrls.appendChild(tog);
          row.appendChild(meta);
          row.appendChild(ctrls);
          wrap.appendChild(row);
        });
      }

      selectStation(0, false);
      renderAmbientMixer();

      /* ---------------- VUX.AI (CUSTOM-SKINNED DUCK.AI OVER SCRAMJET EMBED + WISP) ---------------- */
      var aiFrameEl = document.getElementById('ai-panel-frame');
      var aiLoadingEl = document.getElementById('ai-panel-loading');
      var aiLoadingMsgEl = document.getElementById('ai-panel-loading-msg');
      var aiStatusEl = document.getElementById('ai-panel-status');
      var aiModelEl = document.getElementById('ai-model-indicator');
      var aiRequestSeq = 1;
      var pendingScramResolvers = Object.create(null);

      window.addEventListener('message', function (ev) {
        if (!ev || !ev.data) return;
        if (ev.data.type === 'valem-scram-url-ready') {
          var resolver = pendingScramResolvers[ev.data.requestId];
          if (resolver) {
            delete pendingScramResolvers[ev.data.requestId];
            resolver(ev.data);
          }
          return;
        }
        if (ev.data.type === 'vux-ai-wisp-status' && ev.data.label && aiStatusEl) {
          aiStatusEl.textContent = ev.data.label;
          return;
        }
        if (ev.data.type === 'vux-ai-model-update' && ev.data.model && aiModelEl) {
          aiModelEl.textContent = 'Model: ' + ev.data.model;
          return;
        }
        if (ev.data.type === 'vux-ai-ready') {
          if (aiLoadingEl) aiLoadingEl.classList.remove('open');
          injectAiFrameSkin();
        }
      });

      function resolveScramUrlViaBridge(targetUrl, optionalWispUrl) {
        return new Promise(function (resolve) {
          var proxyFrame = document.getElementById('valbrowse-proxy-frame');
          var reqId = 'aireq_' + (aiRequestSeq++);
          var timer = setTimeout(function () {
            delete pendingScramResolvers[reqId];
            resolve({ ok: false, encodedUrl: CFG.origin + '/scram/' + encodeURIComponent(targetUrl), targetUrl: targetUrl, wispUrl: optionalWispUrl || CFG.defaultWisp });
          }, 15000);
          pendingScramResolvers[reqId] = function (data) {
            clearTimeout(timer);
            resolve(data);
          };
          try {
            if (proxyFrame && proxyFrame.contentWindow) {
              proxyFrame.contentWindow.postMessage({
                type: 'valem-resolve-scram-url',
                requestId: reqId,
                targetUrl: targetUrl,
                wispUrl: optionalWispUrl || ''
              }, '*');
            } else {
              clearTimeout(timer);
              delete pendingScramResolvers[reqId];
              resolve({ ok: false, encodedUrl: CFG.origin + '/scram/' + encodeURIComponent(targetUrl), targetUrl: targetUrl, wispUrl: optionalWispUrl || CFG.defaultWisp });
            }
          } catch (_e) {
            clearTimeout(timer);
            delete pendingScramResolvers[reqId];
            resolve({ ok: false, encodedUrl: CFG.origin + '/scram/' + encodeURIComponent(targetUrl), targetUrl: targetUrl, wispUrl: optionalWispUrl || CFG.defaultWisp });
          }
        });
      }

      function getCurrentVuxThemeTokens() {
        var cs = getComputedStyle(document.documentElement);
        return {
          bg: cs.getPropertyValue('--bg').trim() || '#0b0608',
          bgSec: cs.getPropertyValue('--surface-2').trim() || '#080406',
          surface: cs.getPropertyValue('--surface').trim() || '#140b0e',
          text: cs.getPropertyValue('--text').trim() || '#fdf2f4',
          muted: cs.getPropertyValue('--muted').trim() || '#9f878f',
          border: cs.getPropertyValue('--border').trim() || 'rgba(255,255,255,0.08)',
          primary: cs.getPropertyValue('--accent').trim() || '#ff5c7c',
          font: cs.getPropertyValue('--font-ui').trim() || "'Plus Jakarta Sans', system-ui, sans-serif",
          light: document.documentElement.getAttribute('data-light') === '1' ? '1' : '0'
        };
      }

      function injectAiFrameSkin() {
        try {
          if (aiFrameEl && aiFrameEl.contentWindow) {
            var tokens = getCurrentVuxThemeTokens();
            aiFrameEl.contentWindow.postMessage(Object.assign({ type: 'vux-ai-skin' }, tokens), '*');
          }
        } catch (_e) {}
      }

      function loadVuxAi(forceReload) {
        var targetUrl = CFG.vuxAiTargetUrl || 'https://duck.ai';
        var renderWisp = CFG.renderWispUrl || 'wss://my-wisp-server-ocnq.onrender.com/wisp/';
        if (aiLoadingEl) aiLoadingEl.classList.add('open');
        if (aiLoadingMsgEl) aiLoadingMsgEl.textContent = forceReload
          ? 'Starting fresh Vux.ai session via Wisp...'
          : 'Connecting Vux.ai via Scramjet v2 & Wisp...';
        if (aiStatusEl) aiStatusEl.textContent = 'Connecting Render Wisp...';

        var tokens = getCurrentVuxThemeTokens();
        var q = [
          'embed=ai',
          'url=' + encodeURIComponent(targetUrl),
          'wisp=' + encodeURIComponent(renderWisp),
          'bg=' + encodeURIComponent(tokens.bg),
          'bgSec=' + encodeURIComponent(tokens.bgSec),
          'surface=' + encodeURIComponent(tokens.surface),
          'text=' + encodeURIComponent(tokens.text),
          'muted=' + encodeURIComponent(tokens.muted),
          'border=' + encodeURIComponent(tokens.border),
          'primary=' + encodeURIComponent(tokens.primary),
          'font=' + encodeURIComponent(tokens.font),
          'light=' + encodeURIComponent(tokens.light)
        ];
        if (forceReload) q.push('_vux=' + Date.now());
        var embedUrl = CFG.origin + '/scramjet-browser.html?' + q.join('&');

        if (aiFrameEl) {
          aiFrameEl.onload = function () {
            injectAiFrameSkin();
          };
          aiFrameEl.src = embedUrl;
          setTimeout(function () {
            if (aiLoadingEl) aiLoadingEl.classList.remove('open');
            injectAiFrameSkin();
          }, 9000);
        }
      }

      function startNewAiChat() {
        try {
          if (aiFrameEl && aiFrameEl.contentWindow && aiFrameEl.getAttribute('src')) {
            aiFrameEl.contentWindow.postMessage({ type: 'vux-ai-newchat' }, '*');
            showToast('Started new Vux.ai conversation.');
            return;
          }
        } catch (_e) {}
        loadVuxAi(true);
      }

      var aiDismissBtn = document.getElementById('ai-panel-dismiss-load');
      if (aiDismissBtn && aiLoadingEl) {
        aiDismissBtn.addEventListener('click', function () {
          aiLoadingEl.classList.remove('open');
        });
      }

      var aiNewChatBtn = document.getElementById('ai-panel-newchat');
      if (aiNewChatBtn) {
        aiNewChatBtn.addEventListener('click', startNewAiChat);
      }

      var aiReloadBtn = document.getElementById('ai-panel-reload');
      if (aiReloadBtn) {
        aiReloadBtn.addEventListener('click', function () {
          loadVuxAi(true);
        });
      }

      var aiOpenTabBtn = document.getElementById('ai-panel-open-tab');
      if (aiOpenTabBtn) {
        aiOpenTabBtn.addEventListener('click', function () {
          openInValBrowse(CFG.vuxAiTargetUrl || 'https://duck.ai');
        });
      }

      var aiFsBtn = document.getElementById('ai-panel-fs');
      if (aiFsBtn) {
        aiFsBtn.addEventListener('click', function () {
          var st = document.getElementById('ai-panel-stage');
          if (!st) return;
          if (document.fullscreenElement) document.exitFullscreen().catch(function () {});
          else if (st.requestFullscreen) st.requestFullscreen().catch(function () {});
        });
      }

      /* ---------------- CUSTOMIZATION STUDIO STATE & ENGINES ---------------- */
      var settingsModal = document.getElementById('settings-modal');
      var activePresetCat = 'All';
      var presetSearchQuery = '';
      var activePresetId = safeLSGet('valbrowse_color_preset') || 'coral-default';

      var activeAnimCat = 'All';
      var animSearchQuery = '';
      var activeDynCat = 'All';
      var dynSearchQuery = '';
      var activeFontCat = 'All';
      var fontSearchQuery = '';
      var fontPreviewSample = 'The quick brown fox jumps — 12345';
      var layoutSearchQuery = '';

      var loadedGoogleFonts = Object.create(null);

      function buildGoogleFontHref(fontFamily) {
        var clean = String(fontFamily || '').replace(/['"]/g, '').trim();
        return 'https://fonts.googleapis.com/css2?family=' + encodeURIComponent(clean).replace(/%20/g, '+') + ':wght@400;600;700&display=swap';
      }

      function ensureGoogleFontLoaded(fontFamily) {
        var clean = String(fontFamily || '').replace(/['"]/g, '').trim();
        if (!clean || loadedGoogleFonts[clean]) return;
        loadedGoogleFonts[clean] = true;
        try {
          var link = document.createElement('link');
          link.rel = 'stylesheet';
          link.href = buildGoogleFontHref(clean);
          document.head.appendChild(link);
        } catch (_e) {}
      }

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
        return lum > 0.24 ? '#09090b' : '#ffffff';
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
        if (typeof injectAiFrameSkin === 'function') injectAiFrameSkin();
      }

      function renderColorPresetsGrid() {
        var grid = document.getElementById('color-presets-grid');
        var shownEl = document.getElementById('themes-count-shown');
        if (!grid) return;
        grid.innerHTML = '';
        var q = String(presetSearchQuery || '').trim().toLowerCase();
        var filtered = CFG.themePresets.filter(function (t) {
          var matchCat = activePresetCat === 'All' || t.studioCategory === activePresetCat || t.category === activePresetCat;
          var matchQ = !q || t.name.toLowerCase().indexOf(q) !== -1 || String(t.studioCategory || t.category).toLowerCase().indexOf(q) !== -1;
          return matchCat && matchQ;
        });
        if (shownEl) shownEl.textContent = String(filtered.length);
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
          d2.style.background = t.bgCard;
          var d3 = document.createElement('span');
          d3.className = 'preset-dot';
          d3.style.background = t.accent;
          sw.appendChild(d1);
          sw.appendChild(d2);
          sw.appendChild(d3);

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
        if (typeof broadcastAudioState === 'function') broadcastAudioState();
      });

      /* ---------------- CUSTOM SETTINGS STATE (BG FX, COLOR SHIFTS, FONTS, LAYOUTS) ---------------- */
      var DEFAULT_CUSTOM_SETTINGS = {
        homeLayout: 'split',
        navPosition: 'left',
        density: 'cozy',
        layoutPresetId: 'left-collapsible-default',
        bgStyle: 'aurora',
        animatedBgId: 'abg-particle-nebula-1',
        animBgSpeed: 1,
        animBgOpacity: 0.72,
        dynamicBgId: 'off',
        dynBgSpeed: 1,
        dynBgOpacity: 0.72,
        fontFamily: '',
        uiRadius: 12,
        glowStrength: 1,
        glassBlur: 14,
        fontScale: 1,
        showClock: true,
        showShortcuts: true,
        reducedMotion: false,
        cursorTrail: 'glow',
        customCss: '',
        panicUrl: CFG.panicUrl
      };

      var customSettings = Object.assign({}, DEFAULT_CUSTOM_SETTINGS);
      try {
        var rawCustomSaved = safeLSGet('valem_custom_settings');
        if (rawCustomSaved) {
          customSettings = Object.assign({}, DEFAULT_CUSTOM_SETTINGS, JSON.parse(rawCustomSaved));
        }
      } catch (_e) {}

      /* ---------------- ANIMATED CANVAS BACKGROUND ENGINE (100 PRESETS) ---------------- */
      var bgCanvasEl = document.getElementById('vb-bg-canvas');
      var bgCtx = bgCanvasEl ? bgCanvasEl.getContext('2d') : null;
      var animBgRafId = 0;
      var animLastTs = 0;
      var animPhase = 0;
      var animParticles = [];
      for (var pi = 0; pi < 56; pi++) {
        animParticles.push({
          x: Math.random(),
          y: Math.random(),
          vx: (Math.random() - 0.5) * 0.0014,
          vy: (Math.random() - 0.5) * 0.0014,
          r: 1.2 + Math.random() * 2.4,
          phase: Math.random() * Math.PI * 2
        });
      }

      function findAnimPreset(id) {
        if (!id || id === 'off') return null;
        var normId = id === 'anim-particle-nebula-1' ? 'abg-particle-nebula-1' : id;
        for (var i = 0; i < CFG.animatedBgPresets.length; i++) {
          if (CFG.animatedBgPresets[i].id === normId) return CFG.animatedBgPresets[i];
        }
        return null;
      }

      function resizeBgCanvas() {
        if (!bgCanvasEl) return;
        var dpr = Math.min(window.devicePixelRatio || 1, 1.5);
        var w = Math.max(1, Math.floor(window.innerWidth * dpr));
        var h = Math.max(1, Math.floor(window.innerHeight * dpr));
        if (bgCanvasEl.width !== w || bgCanvasEl.height !== h) {
          bgCanvasEl.width = w;
          bgCanvasEl.height = h;
        }
      }
      window.addEventListener('resize', resizeBgCanvas);

      function drawAnimatedBgFrame(ts) {
        animBgRafId = 0;
        var preset = findAnimPreset(customSettings.animatedBgId);
        if (!preset || document.hidden || customSettings.reducedMotion || !bgCtx || !bgCanvasEl) {
          return;
        }
        resizeBgCanvas();
        var w = bgCanvasEl.width;
        var h = bgCanvasEl.height;
        var dt = animLastTs ? Math.min(0.06, (ts - animLastTs) / 1000) : 0.016;
        animLastTs = ts;
        var speed = (preset.speedMul || 1) * (customSettings.animBgSpeed || 1);
        animPhase += dt * speed;

        var accent = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#ff5c7c';
        bgCtx.clearRect(0, 0, w, h);

        var algo = preset.algo;
        var hueBase = (preset.hueOffset + animPhase * 14) % 360;
        var count = Math.max(8, Math.round(28 * (preset.density || 1)));

        if (algo === 'waves' || algo === 'minimal' || algo === 'flow') {
          var layers = algo === 'minimal' ? 4 : Math.min(9, Math.max(4, Math.round(preset.paramA || 5)));
          for (var li = 0; li < layers; li++) {
            bgCtx.beginPath();
            var yBase = h * (0.18 + (li / Math.max(1, layers - 1)) * 0.64);
            var amp = (algo === 'minimal' ? 18 : 34) * (preset.density || 1);
            bgCtx.strokeStyle = li % 2 === 0 ? accent : ('hsla(' + ((hueBase + li * 28) % 360) + ', 82%, 64%, 0.55)');
            bgCtx.lineWidth = algo === 'flow' ? 2.6 : 1.7;
            bgCtx.globalAlpha = algo === 'minimal' ? 0.35 : 0.52;
            for (var x = 0; x <= w; x += 24) {
              var nx = x / w;
              var y = yBase + Math.sin(nx * (4 + li * 0.45) + animPhase * (1 + li * 0.12)) * amp +
                Math.cos(nx * 2.5 - animPhase * 0.8 + li) * (amp * 0.4);
              if (x === 0) bgCtx.moveTo(x, y);
              else bgCtx.lineTo(x, y);
            }
            bgCtx.stroke();
          }
          bgCtx.globalAlpha = 1;
        } else if (algo === 'sacred' || algo === 'rings' || algo === 'tunnel') {
          var cx = w * 0.5;
          var cy = h * 0.5;
          var maxR = Math.min(w, h) * 0.44;
          var ringCount = algo === 'tunnel' ? 12 : Math.min(10, Math.max(4, Math.round(preset.paramA || 6)));
          for (var ri = 0; ri < ringCount; ri++) {
            var prog = ((ri / ringCount) + (algo === 'tunnel' ? (animPhase * 0.18) : 0)) % 1;
            var r = algo === 'tunnel' ? (prog * maxR) : (maxR * (0.2 + (ri / ringCount) * 0.78));
            var rot = animPhase * (ri % 2 === 0 ? 0.32 : -0.25);
            bgCtx.save();
            bgCtx.translate(cx, cy);
            bgCtx.rotate(rot);
            bgCtx.strokeStyle = ri % 2 === 0 ? accent : ('hsla(' + ((hueBase + ri * 32) % 360) + ', 85%, 65%, 0.55)');
            bgCtx.lineWidth = 1.4;
            bgCtx.globalAlpha = algo === 'tunnel' ? (1 - prog) * 0.72 : 0.45;
            if (algo === 'sacred') {
              var petals = Math.max(5, Math.round(preset.paramA || 6));
              for (var pt = 0; pt < petals; pt++) {
                var ang = (pt / petals) * Math.PI * 2;
                bgCtx.beginPath();
                bgCtx.arc(Math.cos(ang) * r * 0.5, Math.sin(ang) * r * 0.5, r * 0.5, 0, Math.PI * 2);
                bgCtx.stroke();
              }
            } else {
              bgCtx.beginPath();
              bgCtx.arc(0, 0, r, 0, Math.PI * 2);
              bgCtx.stroke();
            }
            bgCtx.restore();
          }
          bgCtx.globalAlpha = 1;
        } else if (algo === 'matrix' || algo === 'cybergrid') {
          if (algo === 'matrix') {
            var cols = Math.min(44, Math.max(16, count));
            var colW = w / cols;
            bgCtx.font = Math.max(11, Math.round(colW * 0.45)) + 'px monospace';
            for (var mc = 0; mc < cols; mc++) {
              var dropY = ((animPhase * 120 * (0.7 + (mc % 5) * 0.18) + mc * 67) % (h + 160)) - 80;
              bgCtx.fillStyle = mc % 3 === 0 ? accent : ('hsla(' + ((hueBase + mc * 6) % 360) + ', 88%, 62%, 0.65)');
              for (var trail = 0; trail < 6; trail++) {
                bgCtx.globalAlpha = Math.max(0.08, 0.72 - trail * 0.11);
                var ch = String.fromCharCode(48 + ((mc + trail + Math.floor(animPhase * 8)) % 42));
                bgCtx.fillText(ch, mc * colW + 4, dropY - trail * 18);
              }
            }
            bgCtx.globalAlpha = 1;
          } else {
            var horizon = h * 0.48;
            bgCtx.strokeStyle = accent;
            bgCtx.lineWidth = 1.2;
            bgCtx.globalAlpha = 0.42;
            for (var gx = -8; gx <= 8; gx++) {
              bgCtx.beginPath();
              bgCtx.moveTo(w * 0.5 + gx * (w * 0.03), horizon);
              bgCtx.lineTo(w * 0.5 + gx * (w * 0.16), h);
              bgCtx.stroke();
            }
            for (var gy = 0; gy < 10; gy++) {
              var gp = ((gy / 10) + (animPhase * 0.28)) % 1;
              var py = horizon + Math.pow(gp, 1.8) * (h - horizon);
              bgCtx.beginPath();
              bgCtx.moveTo(0, py);
              bgCtx.lineTo(w, py);
              bgCtx.stroke();
            }
            bgCtx.globalAlpha = 1;
          }
        } else if (algo === 'liquid' || algo === 'caustics') {
          var blobs = Math.min(7, Math.max(3, Math.round(preset.paramA || 4)));
          for (var bi = 0; bi < blobs; bi++) {
            var bx = w * (0.5 + 0.34 * Math.sin(animPhase * 0.55 + bi * 1.9));
            var by = h * (0.5 + 0.34 * Math.cos(animPhase * 0.42 + bi * 2.3));
            var br = Math.min(w, h) * (0.24 + 0.08 * Math.sin(animPhase + bi));
            var grad = bgCtx.createRadialGradient(bx, by, 10, bx, by, br);
            grad.addColorStop(0, 'hsla(' + ((hueBase + bi * 48) % 360) + ', 84%, 60%, 0.44)');
            grad.addColorStop(1, 'hsla(' + ((hueBase + bi * 48) % 360) + ', 84%, 50%, 0)');
            bgCtx.fillStyle = grad;
            bgCtx.beginPath();
            bgCtx.arc(bx, by, br, 0, Math.PI * 2);
            bgCtx.fill();
          }
        } else {
          // nebula / constellation with soft cosmic blooms + glowing stardust
          if (algo === 'nebula') {
            for (var ni = 0; ni < 3; ni++) {
              var nx = w * (0.22 + ni * 0.28 + 0.08 * Math.sin(animPhase * 0.45 + ni * 1.7));
              var ny = h * (0.3 + (ni % 2) * 0.36 + 0.09 * Math.cos(animPhase * 0.38 + ni * 2.1));
              var nr = Math.min(w, h) * (0.32 + 0.06 * Math.sin(animPhase + ni));
              var nGrad = bgCtx.createRadialGradient(nx, ny, 8, nx, ny, nr);
              nGrad.addColorStop(0, 'hsla(' + ((hueBase + ni * 42) % 360) + ', 88%, 62%, 0.24)');
              nGrad.addColorStop(0.55, 'hsla(' + ((hueBase + ni * 42 + 24) % 360) + ', 82%, 52%, 0.09)');
              nGrad.addColorStop(1, 'hsla(' + ((hueBase + ni * 42) % 360) + ', 82%, 45%, 0)');
              bgCtx.fillStyle = nGrad;
              bgCtx.beginPath();
              bgCtx.arc(nx, ny, nr, 0, Math.PI * 2);
              bgCtx.fill();
            }
          }
          var nCount = Math.min(animParticles.length, Math.max(24, count));
          for (var i1 = 0; i1 < nCount; i1++) {
            var p1 = animParticles[i1];
            p1.x = (p1.x + p1.vx * speed + 1) % 1;
            p1.y = (p1.y + p1.vy * speed + 1) % 1;
            var px1 = p1.x * w;
            var py1 = p1.y * h;
            var starR = p1.r * (0.95 + 0.35 * Math.sin(animPhase * 2 + p1.phase));
            var starColor = i1 % 4 === 0 ? accent : ('hsla(' + ((hueBase + i1 * 9) % 360) + ', 88%, 74%, 0.88)');

            if (i1 % 3 === 0) {
              bgCtx.fillStyle = i1 % 4 === 0 ? accent : ('hsla(' + ((hueBase + i1 * 9) % 360) + ', 88%, 72%, 0.22)');
              bgCtx.globalAlpha = 0.24;
              bgCtx.beginPath();
              bgCtx.arc(px1, py1, starR * 3.4, 0, Math.PI * 2);
              bgCtx.fill();
              bgCtx.globalAlpha = 1;
            }

            bgCtx.fillStyle = starColor;
            bgCtx.beginPath();
            bgCtx.arc(px1, py1, starR, 0, Math.PI * 2);
            bgCtx.fill();

            if (algo === 'constellation') {
              for (var i2 = i1 + 1; i2 < nCount; i2++) {
                var p2 = animParticles[i2];
                var dx = (p2.x - p1.x) * w;
                var dy = (p2.y - p1.y) * h;
                var dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 155) {
                  bgCtx.strokeStyle = 'hsla(' + hueBase + ', 82%, 70%, ' + ((1 - dist / 155) * 0.34).toFixed(3) + ')';
                  bgCtx.lineWidth = 1;
                  bgCtx.beginPath();
                  bgCtx.moveTo(px1, py1);
                  bgCtx.lineTo(p2.x * w, p2.y * h);
                  bgCtx.stroke();
                }
              }
            }
          }
        }

        animBgRafId = requestAnimationFrame(drawAnimatedBgFrame);
      }

      function syncAnimatedBgEngine() {
        var preset = findAnimPreset(customSettings.animatedBgId);
        var active = Boolean(preset && !customSettings.reducedMotion);
        document.body.setAttribute('data-anim-bg-on', active ? '1' : '0');
        document.documentElement.style.setProperty('--anim-bg-opacity', String(customSettings.animBgOpacity || 0.72));
        if (animBgRafId) {
          cancelAnimationFrame(animBgRafId);
          animBgRafId = 0;
        }
        if (active && !document.hidden) {
          animLastTs = 0;
          animBgRafId = requestAnimationFrame(drawAnimatedBgFrame);
        } else if (bgCtx && bgCanvasEl) {
          bgCtx.clearRect(0, 0, bgCanvasEl.width, bgCanvasEl.height);
        }
      }

      /* ---------------- DYNAMIC COLOR-CHANGING BACKGROUND ENGINE (100 PRESETS) ---------------- */
      var dynBgEl = document.getElementById('vb-dynamic-bg');
      var dynBgTimer = null;
      var dynPhase = 0;

      function findDynPreset(id) {
        if (!id || id === 'off') return null;
        for (var i = 0; i < CFG.dynamicColorBgPresets.length; i++) {
          if (CFG.dynamicColorBgPresets[i].id === id) return CFG.dynamicColorBgPresets[i];
        }
        return null;
      }

      function renderDynBgStep() {
        var preset = findDynPreset(customSettings.dynamicBgId);
        if (!preset || !dynBgEl || document.hidden || customSettings.reducedMotion) return;
        dynPhase += 0.04 * (customSettings.dynBgSpeed || 1);
        var ang = Math.round((preset.angle + dynPhase * 28) % 360);
        var shiftPct = Math.round(50 + Math.sin(dynPhase) * 28);
        if (preset.mode === 'conic') {
          dynBgEl.style.background = 'conic-gradient(from ' + ang + 'deg at ' + shiftPct + '% 50%, ' + preset.colors[0] + ', ' + preset.colors[1] + ', ' + preset.colors[2] + ', ' + preset.colors[0] + ')';
        } else if (preset.mode === 'pulse') {
          dynBgEl.style.background = 'radial-gradient(circle at ' + shiftPct + '% ' + (100 - shiftPct) + '%, ' + preset.colors[1] + ' 0%, ' + preset.colors[2] + ' 42%, ' + preset.colors[0] + ' 100%)';
        } else {
          dynBgEl.style.background = 'linear-gradient(' + ang + 'deg, ' + preset.colors[0] + ' 0%, ' + preset.colors[1] + ' ' + shiftPct + '%, ' + preset.colors[2] + ' 100%)';
        }
      }

      function syncDynamicColorEngine() {
        var preset = findDynPreset(customSettings.dynamicBgId);
        var active = Boolean(preset);
        document.body.setAttribute('data-dyn-bg-on', active ? '1' : '0');
        document.documentElement.style.setProperty('--dyn-bg-opacity', String(customSettings.dynBgOpacity || 0.72));
        if (dynBgTimer) {
          clearInterval(dynBgTimer);
          dynBgTimer = null;
        }
        if (active && dynBgEl) {
          renderDynBgStep();
          if (!customSettings.reducedMotion) {
            dynBgTimer = setInterval(renderDynBgStep, 80);
          }
        } else if (dynBgEl) {
          dynBgEl.style.background = 'none';
        }
      }

      document.addEventListener('visibilitychange', function () {
        if (document.hidden) {
          if (animBgRafId) { cancelAnimationFrame(animBgRafId); animBgRafId = 0; }
        } else {
          syncAnimatedBgEngine();
        }
      });

      /* ---------------- STUDIO GRIDS RENDERERS ---------------- */
      function renderAnimBgGrid() {
        var grid = document.getElementById('animbg-grid');
        var countEl = document.getElementById('animbg-count-shown');
        if (!grid) return;
        grid.innerHTML = '';
        var q = animSearchQuery.trim().toLowerCase();
        var list = CFG.animatedBgPresets.filter(function (p) {
          var matchCat = activeAnimCat === 'All' || p.category === activeAnimCat;
          var matchQ = !q || p.name.toLowerCase().indexOf(q) !== -1 || p.category.toLowerCase().indexOf(q) !== -1 || p.algo.toLowerCase().indexOf(q) !== -1;
          return matchCat && matchQ;
        });
        if (countEl) countEl.textContent = String(list.length);
        list.forEach(function (p) {
          var b = document.createElement('button');
          b.type = 'button';
          b.className = 'studio-card-btn' + (customSettings.animatedBgId === p.id ? ' active' : '');
          b.setAttribute('data-animbg-id', p.id);
          b.innerHTML = '<div style="font-size:12px;font-weight:700;"></div><div class="sub" style="font-family:var(--font-mono);font-size:10px;"></div>';
          b.children[0].textContent = p.name;
          b.children[1].textContent = p.category + ' · ' + p.algo;
          b.onclick = function () {
            customSettings.animatedBgId = p.id;
            applyCustomSettings(customSettings);
            renderAnimBgGrid();
          };
          grid.appendChild(b);
        });
      }

      function renderDynBgGrid() {
        var grid = document.getElementById('dynbg-grid');
        var countEl = document.getElementById('dynbg-count-shown');
        if (!grid) return;
        grid.innerHTML = '';
        var q = dynSearchQuery.trim().toLowerCase();
        var list = CFG.dynamicColorBgPresets.filter(function (p) {
          var matchCat = activeDynCat === 'All' || p.category === activeDynCat;
          var matchQ = !q || p.name.toLowerCase().indexOf(q) !== -1 || p.category.toLowerCase().indexOf(q) !== -1;
          return matchCat && matchQ;
        });
        if (countEl) countEl.textContent = String(list.length);
        list.forEach(function (p) {
          var b = document.createElement('button');
          b.type = 'button';
          b.className = 'studio-card-btn' + (customSettings.dynamicBgId === p.id ? ' active' : '');
          b.setAttribute('data-dynbg-id', p.id);
          var bar = document.createElement('div');
          bar.className = 'dyn-swatch-bar';
          bar.style.background = 'linear-gradient(' + p.angle + 'deg, ' + p.colors[0] + ', ' + p.colors[1] + ', ' + p.colors[2] + ')';
          var nm = document.createElement('div');
          nm.style.cssText = 'font-size:12px;font-weight:700;margin-top:2px;';
          nm.textContent = p.name;
          var sub = document.createElement('div');
          sub.className = 'sub';
          sub.style.cssText = 'font-family:var(--font-mono);font-size:10px;';
          sub.textContent = p.category + ' · ' + p.mode;
          b.appendChild(bar);
          b.appendChild(nm);
          b.appendChild(sub);
          b.onclick = function () {
            customSettings.dynamicBgId = p.id;
            applyCustomSettings(customSettings);
            renderDynBgGrid();
          };
          grid.appendChild(b);
        });
      }

      var fontCardObserver = null;
      if (typeof IntersectionObserver === 'function') {
        fontCardObserver = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              var fam = entry.target.getAttribute('data-font-family');
              if (fam) ensureGoogleFontLoaded(fam);
              fontCardObserver.unobserve(entry.target);
            }
          });
        }, { threshold: 0.1 });
      }

      function renderFontsGrid() {
        var grid = document.getElementById('fonts-grid');
        var countEl = document.getElementById('fonts-count-shown');
        if (!grid) return;
        grid.innerHTML = '';
        var q = fontSearchQuery.trim().toLowerCase();
        var list = CFG.fontLibrary.filter(function (f) {
          var matchCat = activeFontCat === 'All' || f.category === activeFontCat;
          var matchQ = !q || f.name.toLowerCase().indexOf(q) !== -1 || f.category.toLowerCase().indexOf(q) !== -1;
          return matchCat && matchQ;
        });
        if (countEl) countEl.textContent = String(list.length);
        list.forEach(function (f) {
          var b = document.createElement('button');
          b.type = 'button';
          b.className = 'studio-card-btn' + (customSettings.fontFamily === f.family ? ' active' : '');
          b.setAttribute('data-font-family', f.family);
          var nm = document.createElement('div');
          nm.style.cssText = 'font-size:12px;font-weight:700;';
          nm.textContent = f.name;
          var cat = document.createElement('div');
          cat.className = 'sub';
          cat.style.cssText = 'font-family:var(--font-mono);font-size:10px;';
          cat.textContent = f.category;
          var sample = document.createElement('div');
          sample.style.cssText = 'font-size:13px;color:var(--accent);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;width:100%;margin-top:2px;';
          sample.style.fontFamily = "'" + f.family + "', " + f.fallback;
          sample.textContent = fontPreviewSample || 'The quick brown fox jumps — 12345';
          b.appendChild(nm);
          b.appendChild(cat);
          b.appendChild(sample);
          b.onclick = function () {
            ensureGoogleFontLoaded(f.family);
            customSettings.fontFamily = f.family;
            applyCustomSettings(customSettings);
            renderFontsGrid();
          };
          grid.appendChild(b);
          if (fontCardObserver) fontCardObserver.observe(b);
        });
      }

      function renderLayoutsGrid() {
        var grid = document.getElementById('layouts-grid');
        if (!grid) return;
        grid.innerHTML = '';
        var q = layoutSearchQuery.trim().toLowerCase();
        var list = CFG.layoutPresets.filter(function (lp) {
          return !q || lp.name.toLowerCase().indexOf(q) !== -1 || lp.description.toLowerCase().indexOf(q) !== -1 || lp.navPosition.indexOf(q) !== -1;
        });
        list.forEach(function (lp) {
          var b = document.createElement('button');
          b.type = 'button';
          b.className = 'studio-card-btn' + (customSettings.layoutPresetId === lp.id ? ' active' : '');
          b.setAttribute('data-layout-preset-id', lp.id);
          var nm = document.createElement('div');
          nm.style.cssText = 'font-size:12px;font-weight:700;';
          nm.textContent = lp.name;
          var meta = document.createElement('div');
          meta.className = 'eyebrow';
          meta.style.fontSize = '9px';
          meta.textContent = lp.navPosition.toUpperCase() + ' · ' + lp.homeLayout.toUpperCase() + ' · ' + lp.radius + 'px';
          var desc = document.createElement('div');
          desc.className = 'sub';
          desc.style.fontSize = '11px';
          desc.textContent = lp.description;
          b.appendChild(nm);
          b.appendChild(meta);
          b.appendChild(desc);
          b.onclick = function () {
            customSettings.layoutPresetId = lp.id;
            customSettings.navPosition = lp.navPosition;
            customSettings.homeLayout = lp.homeLayout;
            customSettings.uiRadius = lp.radius;
            customSettings.density = lp.density;
            applyRailMode(lp.railMode);
            applyCustomSettings(customSettings);
            renderLayoutsGrid();
          };
          grid.appendChild(b);
        });
      }

      function applyCustomSettings(next) {
        customSettings = Object.assign({}, DEFAULT_CUSTOM_SETTINGS, next || {});
        if (
          customSettings.homeLayout !== 'normal' &&
          customSettings.homeLayout !== 'side' &&
          customSettings.homeLayout !== 'minimal'
        ) {
          customSettings.homeLayout = 'split';
        }
        if (
          customSettings.navPosition !== 'right' &&
          customSettings.navPosition !== 'top' &&
          customSettings.navPosition !== 'dock' &&
          customSettings.navPosition !== 'zen'
        ) {
          customSettings.navPosition = 'left';
        }
        safeLSSet('valem_custom_settings', JSON.stringify(customSettings));
        safeLSSet('valem_panic_url', customSettings.panicUrl || CFG.panicUrl);
        CFG.panicUrl = customSettings.panicUrl || 'https://classroom.google.com';

        var root = document.documentElement;
        document.body.setAttribute('data-bg-style', customSettings.bgStyle || 'aurora');
        document.body.setAttribute('data-home-layout', customSettings.homeLayout || 'split');
        document.body.setAttribute('data-nav-pos', customSettings.navPosition || 'left');
        document.body.setAttribute('data-density', customSettings.density || 'cozy');
        document.body.setAttribute('data-reduced-motion', customSettings.reducedMotion ? '1' : '0');
        root.style.setProperty('--ui-radius', (customSettings.uiRadius || 12) + 'px');
        root.style.setProperty('--glow-strength', String(typeof customSettings.glowStrength === 'number' ? customSettings.glowStrength : 1));
        root.style.setProperty('--glass-blur', (typeof customSettings.glassBlur === 'number' ? customSettings.glassBlur : 14) + 'px');
        root.style.setProperty('--font-scale', String(customSettings.fontScale || 1));

        var fontSpec = '';
        if (customSettings.fontFamily) {
          ensureGoogleFontLoaded(customSettings.fontFamily);
          var cleanFam = String(customSettings.fontFamily).replace(/['"]/g, '');
          fontSpec = encodeURIComponent(cleanFam).replace(/%20/g, '+') + ':wght@400;600;700';
          var fontStack = "'" + cleanFam + "', 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif";
          root.style.setProperty('--font-ui', fontStack);
          root.style.setProperty('--font-display', fontStack);
        } else {
          root.style.setProperty('--font-ui', "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif");
          root.style.setProperty('--font-display', "'Outfit', 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif");
        }

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

        var animSpdEl = document.getElementById('animbg-speed-range');
        var animSpdVal = document.getElementById('animbg-speed-val');
        var animOpEl = document.getElementById('animbg-opacity-range');
        var animOpVal = document.getElementById('animbg-opacity-val');
        if (animSpdEl) animSpdEl.value = String(Math.round((customSettings.animBgSpeed || 1) * 100));
        if (animSpdVal) animSpdVal.textContent = Number(customSettings.animBgSpeed || 1).toFixed(1) + 'x';
        if (animOpEl) animOpEl.value = String(Math.round((customSettings.animBgOpacity || 0.72) * 100));
        if (animOpVal) animOpVal.textContent = Math.round((customSettings.animBgOpacity || 0.72) * 100) + '%';

        var dynSpdEl = document.getElementById('dynbg-speed-range');
        var dynSpdVal = document.getElementById('dynbg-speed-val');
        var dynOpEl = document.getElementById('dynbg-opacity-range');
        var dynOpVal = document.getElementById('dynbg-opacity-val');
        if (dynSpdEl) dynSpdEl.value = String(Math.round((customSettings.dynBgSpeed || 1) * 100));
        if (dynSpdVal) dynSpdVal.textContent = Number(customSettings.dynBgSpeed || 1).toFixed(1) + 'x';
        if (dynOpEl) dynOpEl.value = String(Math.round((customSettings.dynBgOpacity || 0.72) * 100));
        if (dynOpVal) dynOpVal.textContent = Math.round((customSettings.dynBgOpacity || 0.72) * 100) + '%';

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

        var hasGlobalFx = Boolean(
          (customSettings.animatedBgId !== 'off' || customSettings.dynamicBgId !== 'off') &&
          !customSettings.reducedMotion
        );
        document.body.setAttribute('data-has-fx', hasGlobalFx ? '1' : '0');

        document.querySelectorAll('#cursor-trail-pills .pill-btn').forEach(function (b) {
          b.classList.toggle('active', b.getAttribute('data-cursortrail') === (customSettings.cursorTrail || 'glow'));
        });

        var userCssEl = document.getElementById('vux-user-custom-css');
        if (userCssEl) userCssEl.textContent = String(customSettings.customCss || '').slice(0, 1800);
        var customCssInput = document.getElementById('vux-custom-css-input');
        if (customCssInput && document.activeElement !== customCssInput) {
          customCssInput.value = String(customSettings.customCss || '');
        }

        syncAnimatedBgEngine();
        syncDynamicColorEngine();

        var frame = document.getElementById('valbrowse-proxy-frame');
        if (frame && frame.contentWindow) {
          try {
            frame.contentWindow.postMessage({
              type: 'valem-custom-settings',
              settings: Object.assign({}, customSettings, {
                fontSpec: fontSpec,
                hasGlobalFx: hasGlobalFx
              })
            }, '*');
          } catch (_e) {}
        }
        if (typeof injectAiFrameSkin === 'function') injectAiFrameSkin();
      }

      function activateSettingsTab(target) {
        document.querySelectorAll('#settings-tabs .pill-btn').forEach(function (b) {
          b.classList.toggle('active', b.getAttribute('data-stab') === target);
        });
        document.querySelectorAll('.settings-pane').forEach(function (pane) {
          pane.classList.toggle('active', pane.id === 'spane-' + target);
        });
        if (target === 'appearance') renderColorPresetsGrid();
        else if (target === 'animbg') renderAnimBgGrid();
        else if (target === 'dynbg') renderDynBgGrid();
        else if (target === 'fonts') renderFontsGrid();
        else if (target === 'layout') renderLayoutsGrid();
      }

      function openStudioModal(initialTab) {
        activateSettingsTab(initialTab || 'appearance');
        settingsModal.classList.add('open');
      }

      document.querySelectorAll('#settings-tabs .pill-btn').forEach(function (tabBtn) {
        tabBtn.addEventListener('click', function () {
          activateSettingsTab(tabBtn.getAttribute('data-stab'));
        });
      });

      document.querySelectorAll('#animbg-cat-pills .pill-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
          activeAnimCat = btn.getAttribute('data-animcat') || 'All';
          document.querySelectorAll('#animbg-cat-pills .pill-btn').forEach(function (b) { b.classList.toggle('active', b === btn); });
          renderAnimBgGrid();
        });
      });
      var animSearchEl = document.getElementById('animbg-search');
      if (animSearchEl) animSearchEl.addEventListener('input', function () { animSearchQuery = animSearchEl.value || ''; renderAnimBgGrid(); });
      var animOffBtn = document.getElementById('btn-animbg-off');
      if (animOffBtn) animOffBtn.addEventListener('click', function () { customSettings.animatedBgId = 'off'; applyCustomSettings(customSettings); renderAnimBgGrid(); });
      var animSpdRange = document.getElementById('animbg-speed-range');
      if (animSpdRange) animSpdRange.addEventListener('input', function () { customSettings.animBgSpeed = Number(animSpdRange.value) / 100; applyCustomSettings(customSettings); });
      var animOpRange = document.getElementById('animbg-opacity-range');
      if (animOpRange) animOpRange.addEventListener('input', function () { customSettings.animBgOpacity = Number(animOpRange.value) / 100; applyCustomSettings(customSettings); });

      document.querySelectorAll('#dynbg-cat-pills .pill-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
          activeDynCat = btn.getAttribute('data-dyncat') || 'All';
          document.querySelectorAll('#dynbg-cat-pills .pill-btn').forEach(function (b) { b.classList.toggle('active', b === btn); });
          renderDynBgGrid();
        });
      });
      var dynSearchEl = document.getElementById('dynbg-search');
      if (dynSearchEl) dynSearchEl.addEventListener('input', function () { dynSearchQuery = dynSearchEl.value || ''; renderDynBgGrid(); });
      var dynOffBtn = document.getElementById('btn-dynbg-off');
      if (dynOffBtn) dynOffBtn.addEventListener('click', function () { customSettings.dynamicBgId = 'off'; applyCustomSettings(customSettings); renderDynBgGrid(); });
      var dynSpdRange = document.getElementById('dynbg-speed-range');
      if (dynSpdRange) dynSpdRange.addEventListener('input', function () { customSettings.dynBgSpeed = Number(dynSpdRange.value) / 100; applyCustomSettings(customSettings); });
      var dynOpRange = document.getElementById('dynbg-opacity-range');
      if (dynOpRange) dynOpRange.addEventListener('input', function () { customSettings.dynBgOpacity = Number(dynOpRange.value) / 100; applyCustomSettings(customSettings); });

      document.querySelectorAll('#fonts-cat-pills .pill-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
          activeFontCat = btn.getAttribute('data-fcat') || 'All';
          document.querySelectorAll('#fonts-cat-pills .pill-btn').forEach(function (b) { b.classList.toggle('active', b === btn); });
          renderFontsGrid();
        });
      });
      var fontsSearchEl = document.getElementById('fonts-search');
      if (fontsSearchEl) fontsSearchEl.addEventListener('input', function () { fontSearchQuery = fontsSearchEl.value || ''; renderFontsGrid(); });
      var fontPreviewIn = document.getElementById('font-preview-sample');
      if (fontPreviewIn) fontPreviewIn.addEventListener('input', function () { fontPreviewSample = fontPreviewIn.value || ''; renderFontsGrid(); });
      var fontResetBtn = document.getElementById('btn-font-reset');
      if (fontResetBtn) fontResetBtn.addEventListener('click', function () { customSettings.fontFamily = ''; applyCustomSettings(customSettings); renderFontsGrid(); });

      var layoutsSearchEl = document.getElementById('layouts-search');
      if (layoutsSearchEl) layoutsSearchEl.addEventListener('input', function () { layoutSearchQuery = layoutsSearchEl.value || ''; renderLayoutsGrid(); });

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
          document.title = 'Vux — Isolated Workspace';
          showToast('All Vux custom settings restored to defaults.');
        });
      }

      document.querySelectorAll('#cursor-trail-pills .pill-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
          customSettings.cursorTrail = btn.getAttribute('data-cursortrail') || 'glow';
          applyCustomSettings(customSettings);
          if (typeof recordVuxStat === 'function') recordVuxStat('themesTried', 1);
        });
      });

      function encodeVuxShareCodeClient(payload) {
        var json = JSON.stringify(payload);
        var bytes = new TextEncoder().encode(json);
        var bin = '';
        for (var i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
        return 'VUX1:' + btoa(bin).replace(/\\+/g, '-').replace(/\\//g, '_').replace(/=+$/, '');
      }

      function decodeVuxShareCodeClient(raw) {
        var s = String(raw || '').trim();
        if (s.indexOf('VUX1:') !== 0) return null;
        var b64 = s.slice(5).replace(/-/g, '+').replace(/_/g, '/');
        if (!b64) return null;
        try {
          while (b64.length % 4) b64 += '=';
          var bin = atob(b64);
          var bytes = new Uint8Array(bin.length);
          for (var i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
          return JSON.parse(new TextDecoder().decode(bytes));
        } catch (_e) {
          return null;
        }
      }

      var exportCodeBtn = document.getElementById('btn-vux-export-code');
      var importCodeBtn = document.getElementById('btn-vux-import-code');
      var shareCodeInput = document.getElementById('vux-share-code-input');
      if (exportCodeBtn && shareCodeInput) {
        exportCodeBtn.addEventListener('click', function () {
          var code = encodeVuxShareCodeClient({
            presetId: activePresetId,
            animBgId: customSettings.animatedBgId,
            dynBgId: customSettings.dynamicBgId,
            fontId: customSettings.fontFamily || '',
            layoutId: customSettings.layoutPresetId,
            cursorTrail: customSettings.cursorTrail || 'glow',
            customCss: customSettings.customCss || ''
          });
          shareCodeInput.value = code;
          try { if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(code); } catch (_e) {}
          showToast('VUX1 share code generated & copied!');
        });
      }
      if (importCodeBtn && shareCodeInput) {
        importCodeBtn.addEventListener('click', function () {
          var parsed = decodeVuxShareCodeClient(shareCodeInput.value);
          if (!parsed) {
            showToast('Invalid VUX1 share code.');
            return;
          }
          if (parsed.presetId) applyColorPreset(parsed.presetId);
          if (parsed.animBgId) customSettings.animatedBgId = parsed.animBgId;
          if (parsed.dynBgId) customSettings.dynamicBgId = parsed.dynBgId;
          if (typeof parsed.fontId === 'string') customSettings.fontFamily = parsed.fontId;
          if (parsed.layoutId) customSettings.layoutPresetId = parsed.layoutId;
          if (parsed.cursorTrail) customSettings.cursorTrail = parsed.cursorTrail;
          if (typeof parsed.customCss === 'string') customSettings.customCss = parsed.customCss.slice(0, 1800);
          applyCustomSettings(customSettings);
          if (typeof recordVuxStat === 'function') recordVuxStat('themesTried', 1);
          showToast('Imported Vux theme & settings!');
        });
      }

      var applyCssBtn = document.getElementById('btn-vux-apply-css');
      var clearCssBtn = document.getElementById('btn-vux-clear-css');
      var cssTextarea = document.getElementById('vux-custom-css-input');
      if (applyCssBtn && cssTextarea) {
        applyCssBtn.addEventListener('click', function () {
          customSettings.customCss = (cssTextarea.value || '').slice(0, 1800);
          applyCustomSettings(customSettings);
          showToast('Custom CSS applied to Vux.');
        });
      }
      if (clearCssBtn && cssTextarea) {
        clearCssBtn.addEventListener('click', function () {
          cssTextarea.value = '';
          customSettings.customCss = '';
          applyCustomSettings(customSettings);
          showToast('Custom CSS cleared.');
        });
      }

      document.getElementById('btn-open-settings').addEventListener('click', function () {
        openStudioModal('appearance');
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

      /* ---------------- LIVE ONLINE USERS COUNTER (MULTI-TAB PRESENCE) ---------------- */
      var onlineCountEl = document.getElementById('vux-online-count');
      var presenceTabId = 'vux_' + Math.random().toString(36).slice(2, 10);
      var presencePeers = Object.create(null);
      presencePeers[presenceTabId] = Date.now();
      var presenceChan = typeof BroadcastChannel === 'function' ? new BroadcastChannel('vux_presence_channel') : null;

      function updateOnlineBadgeCount() {
        var now = Date.now();
        presencePeers[presenceTabId] = now;
        var count = 0;
        Object.keys(presencePeers).forEach(function (id) {
          if (now - presencePeers[id] > 12000) delete presencePeers[id];
          else count += 1;
        });
        if (onlineCountEl) {
          onlineCountEl.textContent = Math.max(1, count) + ' active';
        }
      }
      if (presenceChan) {
        presenceChan.onmessage = function (ev) {
          if (!ev || !ev.data) return;
          if (ev.data.type === 'ping' && ev.data.id) {
            presencePeers[ev.data.id] = Date.now();
            updateOnlineBadgeCount();
          } else if (ev.data.type === 'bye' && ev.data.id) {
            delete presencePeers[ev.data.id];
            updateOnlineBadgeCount();
          }
        };
        setInterval(function () {
          try { presenceChan.postMessage({ type: 'ping', id: presenceTabId }); } catch (_e) {}
          updateOnlineBadgeCount();
        }, 3500);
        try { presenceChan.postMessage({ type: 'ping', id: presenceTabId }); } catch (_e) {}
        window.addEventListener('beforeunload', function () {
          try { presenceChan.postMessage({ type: 'bye', id: presenceTabId }); } catch (_e) {}
        });
      }
      updateOnlineBadgeCount();

      /* ---------------- LIVE FPS, PING & WAKE WISP STATUS PILL ---------------- */
      var fpsTextEl = document.getElementById('vux-fps-text');
      var pingTextEl = document.getElementById('vux-ping-text');
      var wakeWispBtn = document.getElementById('btn-wake-wisp');
      var fpsFrames = 0;
      var fpsLastSample = performance.now();

      function tickFpsMonitor(now) {
        fpsFrames += 1;
        if (now - fpsLastSample >= 950) {
          var fps = Math.round((fpsFrames * 1000) / Math.max(1, now - fpsLastSample));
          if (fpsTextEl) fpsTextEl.textContent = Math.min(240, Math.max(1, fps)) + ' FPS';
          fpsFrames = 0;
          fpsLastSample = now;
        }
        if (!document.hidden) requestAnimationFrame(tickFpsMonitor);
      }
      requestAnimationFrame(tickFpsMonitor);
      document.addEventListener('visibilitychange', function () {
        if (!document.hidden) {
          fpsFrames = 0;
          fpsLastSample = performance.now();
          requestAnimationFrame(tickFpsMonitor);
        }
      });

      function probeWispLatency(manualWake) {
        var activeWisp = (safeLSGet('valbrowse_wisp_url') || CFG.defaultWisp || 'wss://wisp.mercurywork.shop/').trim();
        var targets = [activeWisp];
        if (manualWake && targets.indexOf('https://my-wisp-server-ocnq.onrender.com/') === -1) {
          fetch('https://my-wisp-server-ocnq.onrender.com/', { mode: 'no-cors' }).catch(function () {});
        }
        var t0 = performance.now();
        if (pingTextEl) pingTextEl.textContent = 'Wisp: ...';
        try {
          var ws = new WebSocket(activeWisp);
          var done = false;
          var fallbackTimer = setTimeout(function () {
            if (done) return;
            done = true;
            try { ws.close(); } catch (_e) {}
            if (pingTextEl) pingTextEl.textContent = 'Wisp: Wait';
          }, 4500);
          ws.onopen = function () {
            if (done) return;
            done = true;
            clearTimeout(fallbackTimer);
            var ms = Math.max(1, Math.round(performance.now() - t0));
            if (pingTextEl) pingTextEl.textContent = 'Wisp: ' + ms + 'ms';
            if (manualWake) showToast('Wisp awake (' + ms + 'ms) — ' + activeWisp);
            try { ws.close(); } catch (_e) {}
          };
          ws.onerror = function () {
            if (done) return;
            done = true;
            clearTimeout(fallbackTimer);
            var ms = Math.max(1, Math.round(performance.now() - t0));
            if (pingTextEl) pingTextEl.textContent = 'Wisp: ' + ms + 'ms';
          };
        } catch (_e) {
          if (pingTextEl) pingTextEl.textContent = 'Wisp: Ready';
        }
      }
      if (wakeWispBtn) {
        wakeWispBtn.addEventListener('click', function () { probeWispLatency(true); });
      }
      setTimeout(function () { probeWispLatency(false); }, 1800);

      /* ---------------- BUILT-IN DISCORD-STYLED COMMUNITY CHAT (VUX CHAT) ---------------- */
      var chatChannels = Array.isArray(CFG.chatChannels) ? CFG.chatChannels : [{ id: 'general', name: 'general', topic: 'Vux chat' }];
      var activeChatChannel = 'general';
      var chatReplyState = null;
      var CHAT_COLORS = ['#ff5c7c', '#38bdf8', '#34d399', '#a855f7', '#f59e0b', '#ec4899'];
      var chatProfile = { name: 'Guest-' + Math.floor(100 + Math.random() * 899), color: CHAT_COLORS[0] };
      try {
        var savedProf = safeLSGet('vux_chat_profile');
        if (savedProf) chatProfile = Object.assign(chatProfile, JSON.parse(savedProf));
      } catch (_e) {}

      var chatMessages = [];
      try {
        var savedChat = safeLSGet('vux_chat_messages_v1');
        if (savedChat) chatMessages = JSON.parse(savedChat) || [];
      } catch (_e) {}
      if (!Array.isArray(chatMessages) || !chatMessages.length) {
        chatMessages = Array.isArray(CFG.initialChatMessages) ? CFG.initialChatMessages.slice() : [];
        safeLSSet('vux_chat_messages_v1', JSON.stringify(chatMessages));
      }

      var chatSyncChan = typeof BroadcastChannel === 'function' ? new BroadcastChannel('vux_chat_sync') : null;
      if (chatSyncChan) {
        chatSyncChan.onmessage = function (ev) {
          if (!ev || !ev.data || ev.data.type !== 'sync' || !Array.isArray(ev.data.messages)) return;
          chatMessages = ev.data.messages;
          safeLSSet('vux_chat_messages_v1', JSON.stringify(chatMessages));
          renderChatView();
        };
      }

      function persistAndBroadcastChat() {
        safeLSSet('vux_chat_messages_v1', JSON.stringify(chatMessages.slice(-240)));
        if (chatSyncChan) {
          try { chatSyncChan.postMessage({ type: 'sync', messages: chatMessages }); } catch (_e) {}
        }
      }

      function renderChatProfileControls() {
        var nameIn = document.getElementById('chat-profile-name');
        var swWrap = document.getElementById('chat-color-swatches');
        if (nameIn && document.activeElement !== nameIn) nameIn.value = chatProfile.name;
        if (swWrap) {
          swWrap.innerHTML = '';
          CHAT_COLORS.forEach(function (hex) {
            var b = document.createElement('button');
            b.type = 'button';
            b.style.cssText = 'width:16px;height:16px;border-radius:50%;border:2px solid ' + (chatProfile.color === hex ? '#fff' : 'transparent') + ';background:' + hex + ';cursor:pointer;';
            b.title = 'Avatar color ' + hex;
            b.onclick = function () {
              chatProfile.color = hex;
              safeLSSet('vux_chat_profile', JSON.stringify(chatProfile));
              renderChatProfileControls();
            };
            swWrap.appendChild(b);
          });
        }
      }

      function renderChatView() {
        var chListEl = document.getElementById('chat-channel-list');
        var msgListEl = document.getElementById('chat-messages');
        var titleEl = document.getElementById('chat-active-channel-title');
        var topicEl = document.getElementById('chat-active-channel-topic');
        var msgInEl = document.getElementById('chat-message-input');
        if (!chListEl || !msgListEl) return;

        chListEl.innerHTML = '';
        var activeSpec = chatChannels[0];
        chatChannels.forEach(function (ch) {
          if (ch.id === activeChatChannel) activeSpec = ch;
          var btn = document.createElement('button');
          btn.type = 'button';
          btn.className = 'chat-ch-btn' + (ch.id === activeChatChannel ? ' active' : '');
          btn.setAttribute('data-chat-channel', ch.id);
          btn.textContent = '# ' + ch.name;
          btn.onclick = function () {
            activeChatChannel = ch.id;
            renderChatView();
          };
          chListEl.appendChild(btn);
        });

        if (titleEl && activeSpec) titleEl.textContent = '#' + activeSpec.name;
        if (topicEl && activeSpec) topicEl.textContent = activeSpec.topic;
        if (msgInEl && activeSpec) msgInEl.placeholder = 'Message #' + activeSpec.name + '...';

        var roomMsgs = chatMessages.filter(function (m) { return m && m.channelId === activeChatChannel; });
        msgListEl.innerHTML = '';
        roomMsgs.forEach(function (m) {
          var row = document.createElement('div');
          row.className = 'chat-msg';

          var av = document.createElement('div');
          av.className = 'chat-avatar';
          av.style.background = m.avatarColor || '#ff5c7c';
          av.textContent = String(m.author || 'V').charAt(0).toUpperCase();

          var body = document.createElement('div');
          body.className = 'chat-msg-body';

          if (m.replyToAuthor) {
            var rep = document.createElement('div');
            rep.className = 'chat-reply-quote';
            rep.textContent = 'Replying to ' + m.replyToAuthor + ': ' + (m.replyToSnippet || '');
            body.appendChild(rep);
          }

          var meta = document.createElement('div');
          meta.style.cssText = 'display:flex;align-items:baseline;gap:8px;';
          var auth = document.createElement('span');
          auth.style.cssText = 'font-size:13px;font-weight:700;color:' + (m.avatarColor || 'var(--accent)') + ';';
          auth.textContent = m.author;
          var ts = document.createElement('span');
          ts.className = 'sub';
          ts.style.fontSize = '10px';
          ts.textContent = new Date(m.timestamp || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          meta.appendChild(auth);
          meta.appendChild(ts);

          var txt = document.createElement('div');
          txt.style.cssText = 'font-size:13px;line-height:1.45;color:var(--text);word-break:break-word;';
          txt.textContent = m.text;

          var reacts = document.createElement('div');
          reacts.className = 'chat-reactions-row';
          var rxObj = m.reactions || {};
          Object.keys(rxObj).forEach(function (emoji) {
            if (!rxObj[emoji]) return;
            var pill = document.createElement('button');
            pill.type = 'button';
            pill.className = 'chat-react-pill';
            pill.textContent = emoji + ' ' + rxObj[emoji];
            pill.onclick = function () {
              m.reactions = m.reactions || {};
              m.reactions[emoji] = Number(m.reactions[emoji] || 0) + 1;
              persistAndBroadcastChat();
              renderChatView();
            };
            reacts.appendChild(pill);
          });

          var tools = document.createElement('div');
          tools.className = 'chat-hover-tools';
          ['🔥', '👍', '❤️', '🎮'].forEach(function (em) {
            var eb = document.createElement('button');
            eb.type = 'button';
            eb.className = 'chat-tool-btn';
            eb.textContent = em;
            eb.onclick = function () {
              m.reactions = m.reactions || {};
              m.reactions[em] = Number(m.reactions[em] || 0) + 1;
              persistAndBroadcastChat();
              renderChatView();
            };
            tools.appendChild(eb);
          });
          var repBtn = document.createElement('button');
          repBtn.type = 'button';
          repBtn.className = 'chat-tool-btn';
          repBtn.textContent = 'Reply';
          repBtn.onclick = function () {
            chatReplyState = { author: m.author, snippet: String(m.text || '').slice(0, 60) };
            var ban = document.getElementById('chat-reply-banner');
            var pre = document.getElementById('chat-reply-preview');
            if (ban && pre) {
              pre.textContent = 'Replying to ' + m.author + ': "' + chatReplyState.snippet + '"';
              ban.style.display = 'flex';
            }
            if (msgInEl) msgInEl.focus();
          };
          tools.appendChild(repBtn);

          body.appendChild(meta);
          body.appendChild(txt);
          if (reacts.children.length) body.appendChild(reacts);
          row.appendChild(av);
          row.appendChild(body);
          row.appendChild(tools);
          msgListEl.appendChild(row);
        });
        msgListEl.scrollTop = msgListEl.scrollHeight;
      }

      var chatNameIn = document.getElementById('chat-profile-name');
      if (chatNameIn) {
        chatNameIn.addEventListener('input', function () {
          chatProfile.name = (chatNameIn.value || '').trim().slice(0, 20) || 'Guest';
          safeLSSet('vux_chat_profile', JSON.stringify(chatProfile));
        });
      }
      var chatReplyCancel = document.getElementById('chat-reply-cancel');
      if (chatReplyCancel) {
        chatReplyCancel.addEventListener('click', function () {
          chatReplyState = null;
          var ban = document.getElementById('chat-reply-banner');
          if (ban) ban.style.display = 'none';
        });
      }
      var chatClearBtn = document.getElementById('chat-clear-channel-btn');
      if (chatClearBtn) {
        chatClearBtn.addEventListener('click', function () {
          var seeds = (CFG.initialChatMessages || []).filter(function (m) { return m.channelId === activeChatChannel; });
          chatMessages = chatMessages.filter(function (m) { return m.channelId !== activeChatChannel; }).concat(seeds);
          persistAndBroadcastChat();
          renderChatView();
          showToast('Reset #' + activeChatChannel + ' to starter messages.');
        });
      }
      var chatForm = document.getElementById('chat-composer-form');
      var chatInput = document.getElementById('chat-message-input');
      if (chatForm && chatInput) {
        chatForm.addEventListener('submit', function (e) {
          e.preventDefault();
          var text = (chatInput.value || '').trim().slice(0, 420);
          if (!text) return;
          chatMessages.push({
            id: 'msg_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6),
            channelId: activeChatChannel,
            author: chatProfile.name || 'Guest',
            avatarColor: chatProfile.color || '#ff5c7c',
            text: text,
            timestamp: Date.now(),
            replyToAuthor: chatReplyState ? chatReplyState.author : undefined,
            replyToSnippet: chatReplyState ? chatReplyState.snippet : undefined,
            reactions: {}
          });
          chatInput.value = '';
          chatReplyState = null;
          var ban = document.getElementById('chat-reply-banner');
          if (ban) ban.style.display = 'none';
          persistAndBroadcastChat();
          renderChatView();
          if (typeof recordVuxStat === 'function') recordVuxStat('messagesSent', 1);
        });
      }
      renderChatProfileControls();
      renderChatView();

      /* ---------------- PICTURE-IN-PICTURE FLOATING BROWSER WIDGET ---------------- */
      var pipEl = document.getElementById('vux-pip-widget');
      var pipFrame = document.getElementById('vux-pip-frame');
      var pipTitleEl = document.getElementById('vux-pip-title');
      var pipDragHandle = document.getElementById('vux-pip-drag-handle');
      var pipMinBtn = document.getElementById('vux-pip-min');
      var pipCloseBtn = document.getElementById('vux-pip-close');

      async function openVuxPip(targetUrl, title, useProxy) {
        if (!pipEl || !pipFrame) return;
        if (pipTitleEl) pipTitleEl.textContent = title || 'Vux Mini Player';
        pipEl.classList.remove('minimized');
        pipEl.classList.add('open');
        pipFrame.removeAttribute('srcdoc');
        if (useProxy && /^https?:/i.test(String(targetUrl || ''))) {
          var res = await resolveScramUrlViaBridge(targetUrl);
          pipFrame.src = res.encodedUrl || (CFG.origin + '/scram/' + encodeURIComponent(targetUrl));
        } else {
          pipFrame.src = targetUrl;
        }
      }

      function openVuxPipSrcdoc(htmlStr, title) {
        if (!pipEl || !pipFrame) return;
        if (pipTitleEl) pipTitleEl.textContent = title || 'Vux Mini Window';
        pipEl.classList.remove('minimized');
        pipEl.classList.add('open');
        pipFrame.removeAttribute('src');
        pipFrame.srcdoc = htmlStr;
      }

      if (pipCloseBtn && pipEl && pipFrame) {
        pipCloseBtn.addEventListener('click', function () {
          pipEl.classList.remove('open');
          pipFrame.removeAttribute('srcdoc');
          pipFrame.removeAttribute('src');
        });
      }
      if (pipMinBtn && pipEl) {
        pipMinBtn.addEventListener('click', function () {
          var m = pipEl.classList.toggle('minimized');
          pipMinBtn.textContent = m ? 'Max' : 'Min';
        });
      }
      if (pipDragHandle && pipEl) {
        var dragOffX = 0, dragOffY = 0, draggingPip = false;
        pipDragHandle.addEventListener('pointerdown', function (e) {
          if (e.target && e.target.closest('button')) return;
          draggingPip = true;
          var rect = pipEl.getBoundingClientRect();
          dragOffX = e.clientX - rect.left;
          dragOffY = e.clientY - rect.top;
          pipEl.style.right = 'auto';
          pipEl.style.bottom = 'auto';
          pipEl.style.left = rect.left + 'px';
          pipEl.style.top = rect.top + 'px';
        });
        window.addEventListener('pointermove', function (e) {
          if (!draggingPip) return;
          var nx = Math.max(8, Math.min(window.innerWidth - 120, e.clientX - dragOffX));
          var ny = Math.max(8, Math.min(window.innerHeight - 48, e.clientY - dragOffY));
          pipEl.style.left = nx + 'px';
          pipEl.style.top = ny + 'px';
        });
        window.addEventListener('pointerup', function () { draggingPip = false; });
      }

      /* ---------------- FLOATING COMMAND PALETTE (CTRL+K) ---------------- */
      var cmdBackdrop = document.getElementById('vux-cmd-palette');
      var cmdInput = document.getElementById('vux-cmd-input');
      var cmdResultsEl = document.getElementById('vux-cmd-results');
      var cmdCloseBtn = document.getElementById('vux-cmd-close');
      var cmdSelIdx = 0;
      var cmdCurrentList = [];

      function buildCommandResults(query) {
        var q = String(query || '').trim().toLowerCase();
        var items = [];
        function add(title, category, action) {
          items.push({ title: title, category: category, action: action });
        }

        add('Vux Proxy Browser', 'View', function () { switchView('browser'); });
        add('Vux Community Chat (#general)', 'Chat', function () { activeChatChannel = 'general'; switchView('chat'); });
        add('Vux.ai Assistant', 'AI Tool', function () { switchView('ai'); });
        add('All Games Hub', 'Arcade', function () { switchView('modules'); });
        add('Seraph Games Provider', 'Arcade', function () { switchView('seraph'); });
        add('GMShelf Games Provider', 'Arcade', function () { switchView('gmshelf'); });
        add('CKV Games Provider', 'Arcade', function () { switchView('ckv'); });
        add('gn-math Script & Zones', 'Arcade', function () { switchView('gnmath'); });
        add('Movies & TV Theater', 'Cinema', function () { switchView('movies'); });
        add('StudyHub MP3 & Ambient Studio', 'Audio', function () { switchView('music'); });
        add('Quick Scratchpad Notes', 'Utility', function () { toggleNotesDrawer(true); });
        add('Customization Studio Settings', 'Studio', function () { openStudioModal('appearance'); });
        add('Cursive & Calligraphy Fonts', 'Studio', function () { activeFontCat = 'Cursive & Calligraphy'; openStudioModal('fonts'); });
        add('Streak & Achievement Badges', 'Profile', function () { openBadgesModal(); });

        if (q) {
          if (q.indexOf('.') !== -1 || q.indexOf('http') === 0) {
            var direct = q.indexOf('http') === 0 ? q : ('https://' + q);
            add('Open "' + direct + '" in Vux Browser', 'Direct URL', function () { openInValBrowse(direct); });
          } else {
            add('Search "' + query.trim() + '" in Vux Browser', 'Web Search', function () { openInValBrowse(query.trim()); });
          }
          mergedModules.filter(function (m) { return m.name.toLowerCase().indexOf(q) !== -1; }).slice(0, 5).forEach(function (m) {
            add(m.name, 'Game (' + String(m.provider || 'arcade').toUpperCase() + ')', function () { launchStudyModule(m); });
          });
          getActiveCinemaPool().filter(function (m) { return m.title.toLowerCase().indexOf(q) !== -1; }).slice(0, 4).forEach(function (m) {
            add(m.title, 'Cinema', function () { openMovie(m); });
          });
          audioStations.filter(function (s) { return s.title.toLowerCase().indexOf(q) !== -1; }).slice(0, 3).forEach(function (s, idx) {
            add('Play ' + s.title, 'Audio Station', function () { switchView('music'); selectStation(audioStations.indexOf(s) !== -1 ? audioStations.indexOf(s) : idx, true); });
          });
          CFG.themePresets.filter(function (t) { return t.name.toLowerCase().indexOf(q) !== -1; }).slice(0, 4).forEach(function (t) {
            add('Apply Theme: ' + t.name, 'Studio Theme', function () { applyColorPreset(t.id); showToast('Theme: ' + t.name); });
          });
          CFG.fontLibrary.filter(function (f) { return f.name.toLowerCase().indexOf(q) !== -1; }).slice(0, 4).forEach(function (f) {
            add('Apply Font: ' + f.name, 'Font (' + f.category + ')', function () {
              ensureGoogleFontLoaded(f.family);
              customSettings.fontFamily = f.family;
              applyCustomSettings(customSettings);
              showToast('Font: ' + f.name);
            });
          });
        } else {
          items = items.slice(0, 12);
        }

        if (q) {
          var staticMatched = items.filter(function (it) {
            return it.category.indexOf('URL') !== -1 || it.category.indexOf('Web') !== -1 ||
              it.category.indexOf('Game') !== -1 || it.category.indexOf('Cinema') !== -1 ||
              it.category.indexOf('Audio') !== -1 || it.category.indexOf('Theme') !== -1 ||
              it.category.indexOf('Font') !== -1 || it.title.toLowerCase().indexOf(q) !== -1 || it.category.toLowerCase().indexOf(q) !== -1;
          });
          return staticMatched.slice(0, 14);
        }
        return items;
      }

      function renderCmdResults() {
        if (!cmdResultsEl || !cmdInput) return;
        cmdCurrentList = buildCommandResults(cmdInput.value);
        if (cmdSelIdx >= cmdCurrentList.length) cmdSelIdx = 0;
        cmdResultsEl.innerHTML = '';
        cmdCurrentList.forEach(function (it, idx) {
          var b = document.createElement('button');
          b.type = 'button';
          b.className = 'vux-cmd-item' + (idx === cmdSelIdx ? ' selected' : '');
          var t = document.createElement('span');
          t.style.cssText = 'font-size:13px;font-weight:600;';
          t.textContent = it.title;
          var c = document.createElement('span');
          c.className = 'eyebrow';
          c.style.fontSize = '10px';
          c.textContent = it.category;
          b.appendChild(t);
          b.appendChild(c);
          b.onclick = function () {
            closeCmdPalette();
            it.action();
          };
          cmdResultsEl.appendChild(b);
        });
      }

      function openCmdPalette() {
        if (!cmdBackdrop || !cmdInput) return;
        cmdBackdrop.classList.add('open');
        cmdInput.value = '';
        cmdSelIdx = 0;
        renderCmdResults();
        setTimeout(function () { cmdInput.focus(); }, 25);
      }

      function closeCmdPalette() {
        if (cmdBackdrop) cmdBackdrop.classList.remove('open');
      }

      var railCmdBtn = document.getElementById('btn-rail-cmdk');
      if (railCmdBtn) railCmdBtn.addEventListener('click', openCmdPalette);
      if (cmdCloseBtn) cmdCloseBtn.addEventListener('click', closeCmdPalette);
      if (cmdBackdrop) {
        cmdBackdrop.addEventListener('click', function (ev) {
          if (ev.target === cmdBackdrop) closeCmdPalette();
        });
      }
      if (cmdInput) {
        cmdInput.addEventListener('input', function () {
          cmdSelIdx = 0;
          renderCmdResults();
        });
        cmdInput.addEventListener('keydown', function (ev) {
          if (ev.key === 'ArrowDown') {
            ev.preventDefault();
            cmdSelIdx = (cmdSelIdx + 1) % Math.max(1, cmdCurrentList.length);
            renderCmdResults();
          } else if (ev.key === 'ArrowUp') {
            ev.preventDefault();
            cmdSelIdx = (cmdSelIdx - 1 + Math.max(1, cmdCurrentList.length)) % Math.max(1, cmdCurrentList.length);
            renderCmdResults();
          } else if (ev.key === 'Enter' && cmdCurrentList[cmdSelIdx]) {
            ev.preventDefault();
            var act = cmdCurrentList[cmdSelIdx].action;
            closeCmdPalette();
            act();
          }
        });
      }
      window.addEventListener('keydown', function (ev) {
        if (ev && (ev.ctrlKey || ev.metaKey) && String(ev.key || '').toLowerCase() === 'k') {
          ev.preventDefault();
          if (cmdBackdrop && cmdBackdrop.classList.contains('open')) closeCmdPalette();
          else openCmdPalette();
        }
      });

      /* ---------------- CUSTOM CURSOR TRAILS & CLICK RIPPLES ---------------- */
      var cursorCanvas = document.getElementById('vux-cursor-canvas');
      var cursorCtx = cursorCanvas ? cursorCanvas.getContext('2d') : null;
      var cursorPuffs = [];
      var cursorRipples = [];
      var cursorRaf = 0;

      function resizeCursorCanvas() {
        if (!cursorCanvas) return;
        if (cursorCanvas.width !== window.innerWidth || cursorCanvas.height !== window.innerHeight) {
          cursorCanvas.width = window.innerWidth;
          cursorCanvas.height = window.innerHeight;
        }
      }

      function tickCursorCanvas() {
        cursorRaf = 0;
        if (!cursorCtx || !cursorCanvas || document.hidden || customSettings.reducedMotion || (customSettings.cursorTrail || 'glow') === 'off') {
          if (cursorCtx && cursorCanvas) cursorCtx.clearRect(0, 0, cursorCanvas.width, cursorCanvas.height);
          cursorPuffs = [];
          cursorRipples = [];
          return;
        }
        resizeCursorCanvas();
        var w = cursorCanvas.width;
        var h = cursorCanvas.height;
        cursorCtx.clearRect(0, 0, w, h);
        var accent = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#ff5c7c';
        for (var i = cursorPuffs.length - 1; i >= 0; i--) {
          var p = cursorPuffs[i];
          p.x += p.vx;
          p.y += p.vy;
          p.life -= 0.045;
          if (p.life <= 0) { cursorPuffs.splice(i, 1); continue; }
          cursorCtx.fillStyle = accent;
          cursorCtx.globalAlpha = p.life * 0.55;
          cursorCtx.beginPath();
          if (p.kind === 'stars') {
            cursorCtx.fillRect(p.x - p.r, p.y - 0.8, p.r * 2, 1.6);
            cursorCtx.fillRect(p.x - 0.8, p.y - p.r, 1.6, p.r * 2);
          } else {
            cursorCtx.arc(p.x, p.y, p.r * p.life, 0, Math.PI * 2);
            cursorCtx.fill();
          }
        }
        for (var j = cursorRipples.length - 1; j >= 0; j--) {
          var rp = cursorRipples[j];
          rp.r += 2.1;
          rp.life -= 0.04;
          if (rp.life <= 0) { cursorRipples.splice(j, 1); continue; }
          cursorCtx.strokeStyle = accent;
          cursorCtx.lineWidth = 1.6;
          cursorCtx.globalAlpha = rp.life * 0.65;
          cursorCtx.beginPath();
          cursorCtx.arc(rp.x, rp.y, rp.r, 0, Math.PI * 2);
          cursorCtx.stroke();
        }
        cursorCtx.globalAlpha = 1;
        if (cursorPuffs.length > 0 || cursorRipples.length > 0) {
          cursorRaf = requestAnimationFrame(tickCursorCanvas);
        }
      }

      window.addEventListener('pointermove', function (e) {
        if (customSettings.reducedMotion || (customSettings.cursorTrail || 'glow') === 'off') return;
        var kind = customSettings.cursorTrail || 'glow';
        cursorPuffs.push({
          x: e.clientX,
          y: e.clientY,
          vx: kind === 'sparks' ? (Math.random() - 0.5) * 1.8 : 0,
          vy: kind === 'sparks' ? (Math.random() - 0.5) * 1.8 : 0,
          r: kind === 'glow' ? 7 : 4.2,
          kind: kind,
          life: 1
        });
        if (cursorPuffs.length > 36) cursorPuffs.shift();
        if (!cursorRaf) cursorRaf = requestAnimationFrame(tickCursorCanvas);
      });
      window.addEventListener('pointerdown', function (e) {
        if (customSettings.reducedMotion || (customSettings.cursorTrail || 'glow') === 'off') return;
        cursorRipples.push({ x: e.clientX, y: e.clientY, r: 4, life: 1 });
        if (!cursorRaf) cursorRaf = requestAnimationFrame(tickCursorCanvas);
      });

      /* ---------------- QUICK SCRATCHPAD / NOTES DRAWER ---------------- */
      var notesDrawerEl = document.getElementById('vux-notes-drawer');
      var notesTextareaEl = document.getElementById('vux-notes-textarea');
      var notesStatsEl = document.getElementById('vux-notes-stats');
      var notesRailBtn = document.getElementById('btn-rail-notes');
      var notesCopyBtn = document.getElementById('vux-notes-copy');
      var notesClearBtn = document.getElementById('vux-notes-clear');
      var notesCloseBtn = document.getElementById('vux-notes-close');

      function updateNotesStats() {
        if (!notesTextareaEl || !notesStatsEl) return;
        var v = notesTextareaEl.value || '';
        var words = v.trim() ? v.trim().split(/\\s+/).length : 0;
        notesStatsEl.textContent = words + ' words · ' + v.length + ' chars';
      }
      function toggleNotesDrawer(forceOpen) {
        if (!notesDrawerEl) return;
        var open = typeof forceOpen === 'boolean' ? forceOpen : !notesDrawerEl.classList.contains('open');
        notesDrawerEl.classList.toggle('open', open);
        if (notesRailBtn) notesRailBtn.classList.toggle('active', open);
      }
      if (notesTextareaEl) {
        notesTextareaEl.value = safeLSGet('vux_scratchpad_notes') || '';
        updateNotesStats();
        notesTextareaEl.addEventListener('input', function () {
          safeLSSet('vux_scratchpad_notes', notesTextareaEl.value);
          updateNotesStats();
        });
      }
      if (notesRailBtn) notesRailBtn.addEventListener('click', function () { toggleNotesDrawer(); });
      if (notesCloseBtn) notesCloseBtn.addEventListener('click', function () { toggleNotesDrawer(false); });
      if (notesClearBtn && notesTextareaEl) {
        notesClearBtn.addEventListener('click', function () {
          notesTextareaEl.value = '';
          safeLSSet('vux_scratchpad_notes', '');
          updateNotesStats();
        });
      }
      if (notesCopyBtn && notesTextareaEl) {
        notesCopyBtn.addEventListener('click', function () {
          try { if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(notesTextareaEl.value || ''); } catch (_e) {}
          showToast('Scratchpad notes copied.');
        });
      }

      /* ---------------- DAILY STREAK & ACHIEVEMENT BADGES ---------------- */
      var badgesModal = document.getElementById('vux-badges-modal');
      var badgesGrid = document.getElementById('vux-badges-grid');
      var streakDaysEl = document.getElementById('badge-streak-days');
      var streakEyebrowEl = document.getElementById('vux-streak-eyebrow');
      var welcomeStreakPill = document.getElementById('vb-welcome-streak-pill');
      var userStats = {
        streakDays: 1,
        lastVisitDate: '',
        tabsOpened: 0,
        gamesLaunched: 0,
        themesTried: 0,
        messagesSent: 0,
        tracksPlayed: 0
      };
      try {
        var rawSt = safeLSGet('vux_user_stats');
        if (rawSt) userStats = Object.assign(userStats, JSON.parse(rawSt));
      } catch (_e) {}

      (function syncVisitStreak() {
        var today = new Date().toISOString().slice(0, 10);
        if (userStats.lastVisitDate !== today) {
          var nextStreak = 1;
          if (userStats.lastVisitDate) {
            var pMs = Date.parse(userStats.lastVisitDate + 'T00:00:00Z');
            var cMs = Date.parse(today + 'T00:00:00Z');
            if (Number.isFinite(pMs) && Number.isFinite(cMs) && Math.round((cMs - pMs) / 86400000) === 1) {
              nextStreak = Math.max(1, Number(userStats.streakDays || 1) + 1);
            }
          }
          userStats.streakDays = nextStreak;
          userStats.lastVisitDate = today;
          safeLSSet('vux_user_stats', JSON.stringify(userStats));
        }
      })();

      function isBadgeUnlocked(b) {
        if (b.id === 'first-launch') return true;
        if (b.id === 'tab-explorer') return userStats.tabsOpened >= 5;
        if (b.id === 'arcade-regular') return userStats.gamesLaunched >= 3;
        if (b.id === 'style-architect') return userStats.themesTried >= 3;
        if (b.id === 'chatterbox') return userStats.messagesSent >= 3;
        if (b.id === 'audiophile') return userStats.tracksPlayed >= 1;
        if (b.id === 'streak-3') return userStats.streakDays >= 3;
        if (b.id === 'power-user') return (userStats.tabsOpened + userStats.gamesLaunched) >= 10;
        return false;
      }

      function saveAndEvaluateBadges() {
        safeLSSet('vux_user_stats', JSON.stringify(userStats));
        var defs = Array.isArray(CFG.badgeDefs) ? CFG.badgeDefs : [];
        var unlockedCount = defs.filter(isBadgeUnlocked).length;
        if (streakDaysEl) streakDaysEl.textContent = userStats.streakDays + 'd';
        if (streakEyebrowEl) streakEyebrowEl.textContent = userStats.streakDays + '-Day Streak · ' + unlockedCount + '/' + defs.length + ' Unlocked';
        if (welcomeStreakPill) welcomeStreakPill.textContent = userStats.streakDays + '-Day Streak · ' + unlockedCount + '/' + defs.length + ' Badges Unlocked';
        if (badgesGrid) {
          badgesGrid.innerHTML = '';
          defs.forEach(function (b) {
            var ok = isBadgeUnlocked(b);
            var card = document.createElement('div');
            card.className = 'studio-card-btn' + (ok ? ' active' : '');
            card.style.cursor = 'default';
            var nm = document.createElement('div');
            nm.style.cssText = 'font-size:13px;font-weight:700;';
            nm.textContent = (ok ? '★ ' : '○ ') + b.name;
            var desc = document.createElement('div');
            desc.className = 'sub';
            desc.textContent = b.description;
            var st = document.createElement('div');
            st.className = 'eyebrow';
            st.style.fontSize = '9px';
            st.textContent = ok ? 'Unlocked' : 'Locked';
            card.appendChild(nm);
            card.appendChild(desc);
            card.appendChild(st);
            badgesGrid.appendChild(card);
          });
        }
      }

      function recordVuxStat(field, delta) {
        userStats[field] = Number(userStats[field] || 0) + (delta || 1);
        saveAndEvaluateBadges();
      }

      function openBadgesModal() {
        saveAndEvaluateBadges();
        if (badgesModal) badgesModal.classList.add('open');
      }
      var badgesRailBtn = document.getElementById('btn-rail-badges');
      var badgesCloseBtn = document.getElementById('vux-badges-close');
      if (badgesRailBtn) badgesRailBtn.addEventListener('click', openBadgesModal);
      if (badgesCloseBtn && badgesModal) badgesCloseBtn.addEventListener('click', function () { badgesModal.classList.remove('open'); });
      if (badgesModal) {
        badgesModal.addEventListener('click', function (ev) {
          if (ev.target === badgesModal) badgesModal.classList.remove('open');
        });
      }
      saveAndEvaluateBadges();

      /* ---------------- ANIMATED LOADING SCREEN & WELCOME OVERLAY ---------------- */
      var loaderEl = document.getElementById('vb-loader');
      var loaderCanvasEl = document.getElementById('vb-loader-canvas');
      var loaderBarFillEl = document.getElementById('vb-loader-bar-fill');
      var loaderFactEl = document.getElementById('vb-loader-fact');
      var loaderStatusEl = document.getElementById('vb-loader-status');
      var loaderNextFactBtn = document.getElementById('vb-loader-next-fact');
      var loaderSkipBtn = document.getElementById('vb-loader-skip');
      var welcomeEl = document.getElementById('vb-welcome');
      var welcomeDontShowEl = document.getElementById('vb-welcome-dont-show');
      var loaderDismissed = false;
      var loaderRafId = 0;

      function pickFunFact() {
        var facts = Array.isArray(CFG.funFacts) && CFG.funFacts.length ? CFG.funFacts : ['Vux isolates your browsing session with Scramjet v2 and Libcurl over Wisp.'];
        var picked = facts[Math.floor(Math.random() * facts.length)];
        if (loaderFactEl) loaderFactEl.textContent = picked;
      }

      function dismissWelcomeOverlay() {
        if (welcomeEl) welcomeEl.classList.remove('open');
        if (welcomeDontShowEl && welcomeDontShowEl.checked) {
          safeLSSet('valbrowse_hide_welcome', '1');
        }
      }

      function openWelcomeOverlay() {
        if (!welcomeEl) return;
        if (welcomeDontShowEl) {
          welcomeDontShowEl.checked = safeLSGet('valbrowse_hide_welcome') === '1';
        }
        welcomeEl.classList.add('open');
      }

      function finishLoadingScreen() {
        if (loaderDismissed) return;
        loaderDismissed = true;
        if (loaderBarFillEl) loaderBarFillEl.style.width = '100%';
        if (loaderEl) loaderEl.classList.add('done');
        if (loaderRafId) {
          cancelAnimationFrame(loaderRafId);
          loaderRafId = 0;
        }
        if (safeLSGet('valbrowse_hide_welcome') !== '1') {
          setTimeout(openWelcomeOverlay, 240);
        }
      }

      function runLoaderAnimation() {
        pickFunFact();
        var lCtx = loaderCanvasEl ? loaderCanvasEl.getContext('2d') : null;
        var startTs = performance.now();
        var durationMs = 1550;

        function tick(now) {
          if (loaderDismissed) return;
          var elapsed = now - startTs;
          var pct = Math.min(100, Math.max(12, Math.round((elapsed / durationMs) * 100)));
          if (loaderBarFillEl) loaderBarFillEl.style.width = pct + '%';
          if (loaderStatusEl) {
            if (pct < 40) loaderStatusEl.textContent = 'Warming Vux Scramjet + Libcurl Wisp engine...';
            else if (pct < 78) loaderStatusEl.textContent = 'Loading Vux.ai, GMShelf, Seraph & Customization Studio...';
            else loaderStatusEl.textContent = 'Ready — launching isolated Vux workspace...';
          }

          if (lCtx && loaderCanvasEl) {
            var w = loaderCanvasEl.width = window.innerWidth;
            var h = loaderCanvasEl.height = window.innerHeight;
            var t = now * 0.0012;
            var acc = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#ff5c7c';
            lCtx.clearRect(0, 0, w, h);
            for (var wave = 0; wave < 5; wave++) {
              lCtx.beginPath();
              lCtx.strokeStyle = acc;
              lCtx.globalAlpha = 0.14 + wave * 0.05;
              lCtx.lineWidth = 2;
              for (var x = 0; x <= w; x += 28) {
                var y = h * 0.5 + Math.sin(x * 0.005 + t * (1 + wave * 0.2) + wave) * (32 + wave * 12);
                if (x === 0) lCtx.moveTo(x, y);
                else lCtx.lineTo(x, y);
              }
              lCtx.stroke();
            }
            for (var dot = 0; dot < 24; dot++) {
              var dx = ((dot * 97 + t * 28) % w);
              var dy = h * (0.2 + 0.6 * Math.abs(Math.sin(dot + t * 0.5)));
              lCtx.fillStyle = acc;
              lCtx.globalAlpha = 0.26;
              lCtx.beginPath();
              lCtx.arc(dx, dy, 2.2, 0, Math.PI * 2);
              lCtx.fill();
            }
            lCtx.globalAlpha = 1;
          }

          if (elapsed >= durationMs) {
            finishLoadingScreen();
            return;
          }
          loaderRafId = requestAnimationFrame(tick);
        }
        loaderRafId = requestAnimationFrame(tick);
      }

      if (loaderNextFactBtn) loaderNextFactBtn.addEventListener('click', pickFunFact);
      if (loaderSkipBtn) loaderSkipBtn.addEventListener('click', finishLoadingScreen);
      var welcomeStartBtn = document.getElementById('vb-welcome-start');
      var welcomeCloseX = document.getElementById('vb-welcome-close-x');
      if (welcomeStartBtn) welcomeStartBtn.addEventListener('click', dismissWelcomeOverlay);
      if (welcomeCloseX) welcomeCloseX.addEventListener('click', dismissWelcomeOverlay);
      if (welcomeDontShowEl) {
        welcomeDontShowEl.addEventListener('change', function () {
          safeLSSet('valbrowse_hide_welcome', welcomeDontShowEl.checked ? '1' : '0');
        });
      }
      document.querySelectorAll('[data-welcome-go]').forEach(function (tile) {
        tile.addEventListener('click', function () {
          var dest = tile.getAttribute('data-welcome-go');
          dismissWelcomeOverlay();
          if (dest === 'ai') switchView('ai');
          else if (dest === 'studio') openStudioModal('appearance');
          else if (dest === 'chat') switchView('chat');
          else if (dest === 'ckv') switchView('ckv');
          else if (dest === 'gmshelf') switchView('gmshelf');
          else if (dest === 'seraph') switchView('seraph');
          else switchView('browser');
        });
      });
      var replayWelcomeBtn = document.getElementById('btn-replay-welcome');
      if (replayWelcomeBtn) {
        replayWelcomeBtn.addEventListener('click', function () {
          settingsModal.classList.remove('open');
          openWelcomeOverlay();
        });
      }

      /* ---------------- BOOT ---------------- */
      var savedCloak = safeLSGet('valem_cloak_title');
      if (savedCloak) document.title = savedCloak;
      applyRailMode(railMode);
      applyColorPreset(activePresetId);
      applyCustomSettings(customSettings);
      rebuildMergedModules();
      fetchGnZones();
      fetchSeraphCatalog();
      fetchGmshelfCatalog();
      fetchCkvCatalog();
      runLoaderAnimation();
    })();
  <\/script>
</body>
</html>`}function Lt(e,t=2){let n=10**t;return Math.round(e*n)/n}function Rt(e){let t=Lt(e,2);return t>=0?`+ ${t}`:`- ${Math.abs(t)}`}function zt(e,t){return e.mode===`linear`?e.m*t+e.b:e.mode===`quadratic`?e.m*t*t+e.b*t+e.c:e.m*Math.sin(e.b*t)+e.c}function Bt(e){let t=Lt(e.m,2),n=Lt(e.b,2),r=Lt(e.c,2),i=``,a=0,o=`None in domain`,s=``;if(e.mode===`linear`)i=n===0?`y = ${t}x`:`y = ${t}x ${Rt(n)}`,a=n,o=Math.abs(t)<1e-6?Math.abs(n)<1e-6?`All real x`:`None (horizontal)`:`(${Lt(-n/t,2)}, 0)`,s=`dy/dx = ${t}`;else if(e.mode===`quadratic`){if(i=`y = ${t}x² ${Rt(n)}x ${Rt(r)}`,a=r,Math.abs(t)<1e-6)o=Math.abs(n)<1e-6?`None`:`(${Lt(-r/n,2)}, 0)`;else{let e=n*n-4*t*r;o=e<-1e-6?`No real roots (Δ < 0)`:Math.abs(e)<=1e-6?`(${Lt(-n/(2*t),2)}, 0)`:`(${Lt((-n-Math.sqrt(e))/(2*t),2)}, 0), (${Lt((-n+Math.sqrt(e))/(2*t),2)}, 0)`}s=`dy/dx = ${Lt(2*t,2)}x ${Rt(n)}`}else i=r===0?`y = ${t}·sin(${n}x)`:`y = ${t}·sin(${n}x) ${Rt(r)}`,a=r,o=Math.abs(t)>=Math.abs(r)?`Periodic intersections`:`None`,s=`dy/dx = ${Lt(t*n,2)}·cos(${n}x)`;let c=[];for(let t=-100;t<=100;t++){let n=t/10;c.push({x:n,y:zt(e,n)})}return{equationText:i,points:c,yIntercept:`(0, ${Lt(a,2)})`,xIntercepts:o,derivativeText:s}}function Vt(e=0){let t=[{id:`lin-intercept-1`,unit:`Unit 3 · Linear Functions`,prompt:`For the line y = 1.5x + 1, what is the value of y when x = 4?`,hint:`Substitute x = 4 directly into y = 1.5(4) + 1.`,expectedValue:7,tolerance:.01,steps:[`Start with y = 1.5x + 1`,`Substitute x = 4 -> y = 1.5(4) + 1`,`Multiply: 6 + 1 = 7`]},{id:`lin-slope-2`,unit:`Unit 3 · Slope & Rate of Change`,prompt:`Find the slope m of the line passing through points (2, 3) and (6, 11).`,hint:`Use m = (y₂ - y₁) / (x₂ - x₁).`,expectedValue:2,tolerance:.01,steps:[`m = (11 - 3) / (6 - 2)`,`m = 8 / 4`,`m = 2`]},{id:`quad-vertex-3`,unit:`Unit 4 · Quadratic Vertex`,prompt:`What is the x-coordinate of the vertex of y = x² - 6x + 5?`,hint:`Use the axis of symmetry formula x = -b / (2a).`,expectedValue:3,tolerance:.01,steps:[`Here a = 1 and b = -6`,`x = -(-6) / (2 · 1)`,`x = 6 / 2 = 3`]},{id:`calc-deriv-4`,unit:`Unit 6 · Differential Calculus`,prompt:`Evaluate the derivative f′(2) for f(x) = 3x² - 4x + 7.`,hint:`Apply the power rule first: f′(x) = 6x - 4.`,expectedValue:8,tolerance:.01,steps:[`Differentiate: f′(x) = 6x - 4`,`Plug in x = 2: 6(2) - 4`,`12 - 4 = 8`]},{id:`geom-hyp-5`,unit:`Unit 2 · Right Triangle Geometry`,prompt:`A right triangle has legs of length 6 and 8. What is the length of its hypotenuse?`,hint:`Apply the Pythagorean theorem: c = √(a² + b²).`,expectedValue:10,tolerance:.01,steps:[`a² + b² = 6² + 8² = 36 + 64 = 100`,`c = √100 = 10`]},{id:`alg-solve-6`,unit:`Unit 1 · Linear Equations`,prompt:`Solve for x: 4x - 9 = 19.`,hint:`Add 9 to both sides, then divide by 4.`,expectedValue:7,tolerance:.01,steps:[`4x - 9 = 19`,`4x = 28`,`x = 7`]}];return t[Math.abs(Math.floor(e))%t.length]}function Ht(e,t){let n=String(t||``).trim();if(!n)return{isValidNumber:!1,isCorrect:!1,parsedValue:null};let r=Number(n);return Number.isFinite(r)?{isValidNumber:!0,isCorrect:Math.abs(r-e.expectedValue)<=e.tolerance,parsedValue:r}:{isValidNumber:!1,isCorrect:!1,parsedValue:null}}var Ut=[{id:`f-slope`,category:`Linear & Coordinate`,name:`Slope-Intercept Form`,expression:`y = mx + b`,notes:`m = (y₂ - y₁) / (x₂ - x₁) represents constant rate of change; b is the y-intercept.`},{id:`f-distance`,category:`Linear & Coordinate`,name:`Euclidean Distance Formula`,expression:`d = √((x₂ - x₁)² + (y₂ - y₁)²)`,notes:`Measures straight-line separation between any two points on the Cartesian plane.`},{id:`f-quad`,category:`Quadratics`,name:`Quadratic Formula`,expression:`x = (-b ± √(b² - 4ac)) / (2a)`,notes:`Solves ax² + bx + c = 0; discriminant Δ = b² - 4ac determines real root count.`},{id:`f-vertex`,category:`Quadratics`,name:`Vertex & Axis of Symmetry`,expression:`h = -b / (2a), k = f(h)`,notes:`Locates the global extremum of a parabola f(x) = a(x - h)² + k.`},{id:`f-pyth-trig`,category:`Trigonometry`,name:`Pythagorean Identity`,expression:`sin²(θ) + cos²(θ) = 1`,notes:`Derived directly from unit circle coordinates (cos θ, sin θ).`},{id:`f-law-cos`,category:`Trigonometry`,name:`Law of Cosines`,expression:`c² = a² + b² - 2ab·cos(C)`,notes:`Generalizes the Pythagorean theorem to any triangle with included angle C.`},{id:`f-power-rule`,category:`Calculus`,name:`Power Rule for Derivatives`,expression:`d/dx [xⁿ] = n·xⁿ⁻¹`,notes:`Computes instantaneous slope of polynomial terms for any real exponent n.`},{id:`f-ftc`,category:`Calculus`,name:`Fundamental Theorem of Calculus`,expression:`∫ₐᵇ f(x) dx = F(b) - F(a)`,notes:`Links definite area accumulation directly to any antiderivative F where F′ = f.`}],Wt=o((e=>{var t=Symbol.for(`react.transitional.element`),n=Symbol.for(`react.fragment`);function r(e,n,r){var i=null;if(r!==void 0&&(i=``+r),n.key!==void 0&&(i=``+n.key),`key`in n)for(var a in r={},n)a!==`key`&&(r[a]=n[a]);else r=n;return n=r.ref,{$$typeof:t,type:e,key:i,ref:n===void 0?null:n,props:r}}e.Fragment=n,e.jsx=r,e.jsxs=r})),k=o(((e,t)=>{t.exports=Wt()}))(),A=`eulerpath_progress_v1`;function Gt(){try{let e=localStorage.getItem(A);if(!e)return{attempted:0,correct:0,streak:0,solvedIds:[]};let t=JSON.parse(e);return{attempted:Number(t.attempted)||0,correct:Number(t.correct)||0,streak:Number(t.streak)||0,solvedIds:Array.isArray(t.solvedIds)?t.solvedIds:[]}}catch{return{attempted:0,correct:0,streak:0,solvedIds:[]}}}var Kt=()=>{let[e,t]=(0,x.useState)(`graph`),[n,r]=(0,x.useState)({mode:`linear`,m:1.5,b:1,c:0}),[i,a]=(0,x.useState)(0),[o,s]=(0,x.useState)(``),[c,l]=(0,x.useState)(!1),[u,d]=(0,x.useState)({type:`idle`,message:``}),[f,p]=(0,x.useState)(`All`),[m,h]=(0,x.useState)(Gt);(0,x.useEffect)(()=>{try{localStorage.setItem(A,JSON.stringify(m))}catch{}},[m]);let g=(0,x.useMemo)(()=>Bt(n),[n]),_=(0,x.useMemo)(()=>Vt(i),[i]),v=e=>28+(e- -10)/20*464,y=e=>332-(e- -10)/20*304,b=(0,x.useMemo)(()=>{let e=``,t=!1;for(let n of g.points){if(n.y<-14||n.y>14||!Number.isFinite(n.y)){t=!1;continue}let r=v(n.x).toFixed(1),i=y(n.y).toFixed(1);e+=t?` L ${r} ${i}`:`M ${r} ${i}`,t=!0}return e},[g.points]),ee=()=>{a(e=>e+1),s(``),l(!1),d({type:`idle`,message:``})},te=e=>{e.preventDefault();let t=Ht(_,o);t.isValidNumber?t.isCorrect?(d({type:`correct`,message:`Correct! ${_.steps[_.steps.length-1]}`}),h(e=>({attempted:e.attempted+1,correct:e.correct+1,streak:e.streak+1,solvedIds:e.solvedIds.includes(_.id)?e.solvedIds:[...e.solvedIds,_.id]}))):(d({type:`wrong`,message:`Not quite. Review the hint or compare your substitution steps below.`}),h(e=>({...e,attempted:e.attempted+1,streak:0}))):d({type:`invalid`,message:`Enter a numeric value to verify your step.`})},ne=[-10,-8,-6,-4,-2,0,2,4,6,8,10],S=[`All`,`Linear & Coordinate`,`Quadratics`,`Trigonometry`,`Calculus`],ce=f===`All`?Ut:Ut.filter(e=>e.category===f),le=m.attempted>0?Math.round(m.correct/m.attempted*100):100;return(0,k.jsxs)(`div`,{className:`min-h-screen flex flex-col bg-slate-50 text-slate-900`,children:[(0,k.jsxs)(`header`,{className:`sticky top-0 z-30 bg-white border-b border-slate-200/90`,children:[(0,k.jsxs)(`div`,{className:`max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4`,children:[(0,k.jsxs)(`button`,{type:`button`,onClick:()=>t(`graph`),className:`flex items-center gap-2.5 text-left cursor-pointer focus:outline-none`,children:[(0,k.jsx)(`div`,{className:`w-8 h-8 rounded-lg bg-[#1d4ed8] text-white flex items-center justify-center shadow-xs`,children:(0,k.jsx)(ae,{className:`w-4 h-4`})}),(0,k.jsx)(`span`,{className:`text-lg font-extrabold tracking-tight text-slate-900`,children:`EulerPath`})]}),(0,k.jsx)(`nav`,{className:`hidden md:flex items-center gap-6 text-sm font-medium text-slate-600`,"aria-label":`Primary Math Navigation`,children:[[`graph`,`Interactive Graph`],[`practice`,`Practice Set`],[`formulas`,`Formula Sheet`],[`progress`,`Progress`]].map(([n,r])=>(0,k.jsx)(`button`,{type:`button`,onClick:()=>t(n),className:`py-1 transition-colors cursor-pointer ${e===n?`text-[#1d4ed8] font-semibold border-b-2 border-[#1d4ed8]`:`hover:text-slate-900`}`,children:r},n))}),(0,k.jsx)(`button`,{type:`button`,onClick:()=>{ee(),(e===`formulas`||e===`progress`)&&t(`practice`)},className:`px-4 py-2 rounded-lg bg-[#1d4ed8] hover:bg-[#1e40af] text-white text-xs sm:text-sm font-semibold shadow-xs transition cursor-pointer whitespace-nowrap`,children:`New Problem`})]}),(0,k.jsx)(`div`,{className:`md:hidden px-4 py-2 border-t border-slate-200 flex items-center gap-4 text-xs overflow-x-auto bg-white`,children:[[`graph`,`Interactive Graph`],[`practice`,`Practice Set`],[`formulas`,`Formula Sheet`],[`progress`,`Progress`]].map(([n,r])=>(0,k.jsx)(`button`,{type:`button`,onClick:()=>t(n),className:`whitespace-nowrap shrink-0 cursor-pointer ${e===n?`text-[#1d4ed8] font-bold`:`text-slate-600`}`,children:r},n))})]}),(0,k.jsxs)(`main`,{className:`flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8 space-y-7`,children:[e===`graph`&&(0,k.jsxs)(k.Fragment,{children:[(0,k.jsxs)(`section`,{className:`space-y-3 max-w-3xl`,children:[(0,k.jsx)(`div`,{className:`text-xs font-semibold text-[#1d4ed8] tracking-wide`,children:`Unit 3 · Analytic Geometry & Functions`}),(0,k.jsx)(`h1`,{className:`text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight`,children:`Explore Equations Visually and Check Every Step`}),(0,k.jsx)(`p`,{className:`text-sm sm:text-base text-slate-600 leading-relaxed`,children:`Adjust coefficients on the coordinate plane, solve targeted algebra problems, and check how slopes, intercepts, and ratios respond in real time.`})]}),(0,k.jsxs)(`section`,{className:`grid grid-cols-1 lg:grid-cols-12 gap-6 items-start`,children:[(0,k.jsxs)(`div`,{className:`lg:col-span-7 bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 space-y-4`,children:[(0,k.jsxs)(`div`,{className:`flex items-center justify-between gap-3 flex-wrap`,children:[(0,k.jsx)(`div`,{className:`font-mono text-base sm:text-lg font-bold text-slate-900`,children:g.equationText}),(0,k.jsx)(`div`,{className:`flex items-center gap-1.5`,children:[[`linear`,`Linear`],[`quadratic`,`Quadratic`],[`sine`,`Sine`]].map(([e,t])=>(0,k.jsx)(`button`,{type:`button`,onClick:()=>r(t=>({...t,mode:e,m:e===`quadratic`?.5:e===`sine`?4:1.5,b:e===`quadratic`?-1:e===`sine`?.8:1,c:e===`quadratic`?-2:0})),className:`px-2.5 py-1 rounded-md text-xs font-semibold transition cursor-pointer ${n.mode===e?`bg-blue-50 text-[#1d4ed8] border border-blue-200`:`text-slate-600 hover:bg-slate-100 border border-transparent`}`,children:t},e))})]}),(0,k.jsx)(`div`,{className:`rounded-xl border border-slate-200 bg-slate-50/40 overflow-hidden`,children:(0,k.jsxs)(`svg`,{viewBox:`0 0 520 360`,className:`w-full h-auto block`,role:`img`,"aria-label":`Coordinate plane plotting ${g.equationText}`,children:[(0,k.jsx)(`defs`,{children:(0,k.jsx)(`clipPath`,{id:`euler-grid-clip`,children:(0,k.jsx)(`rect`,{x:28,y:28,width:464,height:304})})}),ne.map(e=>(0,k.jsxs)(`g`,{children:[(0,k.jsx)(`line`,{x1:v(e),y1:28,x2:v(e),y2:332,stroke:e===0?`#64748b`:`#e2e8f0`,strokeWidth:e===0?1.5:1}),(0,k.jsx)(`line`,{x1:28,y1:y(e),x2:492,y2:y(e),stroke:e===0?`#64748b`:`#e2e8f0`,strokeWidth:e===0?1.5:1}),e!==0&&(0,k.jsx)(`text`,{x:v(e),y:y(0)+14,textAnchor:`middle`,fontSize:`10`,fill:`#64748b`,fontFamily:`JetBrains Mono, monospace`,children:e})]},e)),n.mode===`linear`&&Math.abs(n.m)>0&&(0,k.jsxs)(`g`,{clipPath:`url(#euler-grid-clip)`,opacity:`0.72`,children:[(0,k.jsx)(`line`,{x1:v(0),y1:y(n.b),x2:v(2),y2:y(n.b),stroke:`#0284c7`,strokeWidth:`1.5`,strokeDasharray:`4 3`}),(0,k.jsx)(`line`,{x1:v(2),y1:y(n.b),x2:v(2),y2:y(2*n.m+n.b),stroke:`#0284c7`,strokeWidth:`1.5`,strokeDasharray:`4 3`}),(0,k.jsx)(`circle`,{cx:v(2),cy:y(2*n.m+n.b),r:`3.5`,fill:`#0284c7`,stroke:`#ffffff`,strokeWidth:`1.25`})]}),(0,k.jsx)(`path`,{d:b,fill:`none`,stroke:`#1d4ed8`,strokeWidth:`2.75`,strokeLinecap:`round`,strokeLinejoin:`round`,clipPath:`url(#euler-grid-clip)`}),(0,k.jsx)(`circle`,{cx:v(0),cy:y(n.mode===`linear`?n.b:n.c),r:`4.5`,fill:`#2563eb`,stroke:`#ffffff`,strokeWidth:`1.5`,clipPath:`url(#euler-grid-clip)`})]})}),(0,k.jsxs)(`div`,{className:`grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 pt-1 text-xs`,children:[(0,k.jsxs)(`div`,{className:`p-2.5 rounded-lg bg-slate-50 border border-slate-200/80 min-w-0`,children:[(0,k.jsx)(`span`,{className:`text-slate-500 block text-[11px]`,children:`y-intercept`}),(0,k.jsx)(`span`,{className:`font-mono font-bold text-slate-900`,children:g.yIntercept})]}),(0,k.jsxs)(`div`,{className:`p-2.5 rounded-lg bg-slate-50 border border-slate-200/80 min-w-0`,children:[(0,k.jsx)(`span`,{className:`text-slate-500 block text-[11px]`,children:`x-intercept(s)`}),(0,k.jsx)(`span`,{className:`font-mono font-bold text-slate-900 block`,children:g.xIntercepts})]}),(0,k.jsxs)(`div`,{className:`p-2.5 rounded-lg bg-slate-50 border border-slate-200/80 min-w-0`,children:[(0,k.jsx)(`span`,{className:`text-slate-500 block text-[11px]`,children:`Derivative`}),(0,k.jsx)(`span`,{className:`font-mono font-bold text-slate-900 block`,children:g.derivativeText})]})]}),(0,k.jsxs)(`div`,{className:`pt-2 border-t border-slate-100`,children:[(0,k.jsxs)(`div`,{className:`flex items-center justify-between text-[11px] text-slate-500 mb-2`,children:[(0,k.jsx)(`span`,{className:`font-semibold text-slate-700`,children:`Sampled Coordinate Values`}),(0,k.jsxs)(`span`,{className:`font-mono`,children:[`x ∈ `,`{-2, -1, 0, 1, 2}`]})]}),(0,k.jsx)(`div`,{className:`grid grid-cols-5 gap-1.5 text-center font-mono text-xs tabular-nums`,children:[-2,-1,0,1,2].map(e=>{let t=Math.round(zt(n,e)*100)/100;return(0,k.jsxs)(`div`,{className:`py-1.5 px-1 rounded-md bg-slate-50 border border-slate-200/70`,children:[(0,k.jsxs)(`div`,{className:`text-[10px] text-slate-500`,children:[`x=`,e]}),(0,k.jsx)(`div`,{className:`font-bold text-slate-900`,children:t})]},e)})})]})]}),(0,k.jsxs)(`div`,{className:`lg:col-span-5 space-y-5`,children:[(0,k.jsxs)(`div`,{className:`bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 space-y-4`,children:[(0,k.jsxs)(`div`,{className:`flex items-center justify-between`,children:[(0,k.jsx)(`h2`,{className:`text-sm font-bold text-slate-900`,children:`Coefficient Controls`}),(0,k.jsxs)(`button`,{type:`button`,onClick:()=>r({mode:`linear`,m:1.5,b:1,c:0}),className:`text-xs font-medium text-slate-500 hover:text-slate-900 inline-flex items-center gap-1 cursor-pointer`,children:[(0,k.jsx)(se,{className:`w-3 h-3`}),`Reset`]})]}),(0,k.jsxs)(`div`,{className:`space-y-3 text-xs`,children:[(0,k.jsxs)(`label`,{className:`block space-y-1.5`,children:[(0,k.jsxs)(`div`,{className:`flex justify-between font-medium text-slate-700`,children:[(0,k.jsx)(`span`,{children:n.mode===`linear`?`Slope (m)`:n.mode===`quadratic`?`Leading Coefficient (a)`:`Amplitude (a)`}),(0,k.jsx)(`span`,{className:`font-mono font-bold text-[#1d4ed8]`,children:n.m})]}),(0,k.jsx)(`input`,{type:`range`,min:`-5`,max:`5`,step:`0.25`,value:n.m,onChange:e=>r(t=>({...t,m:Number(e.target.value)})),className:`w-full accent-[#1d4ed8]`})]}),(0,k.jsxs)(`label`,{className:`block space-y-1.5`,children:[(0,k.jsxs)(`div`,{className:`flex justify-between font-medium text-slate-700`,children:[(0,k.jsx)(`span`,{children:n.mode===`linear`?`y-Intercept (b)`:n.mode===`quadratic`?`Linear Term (b)`:`Frequency (b)`}),(0,k.jsx)(`span`,{className:`font-mono font-bold text-[#1d4ed8]`,children:n.b})]}),(0,k.jsx)(`input`,{type:`range`,min:`-8`,max:`8`,step:`0.5`,value:n.b,onChange:e=>r(t=>({...t,b:Number(e.target.value)})),className:`w-full accent-[#1d4ed8]`})]}),n.mode!==`linear`&&(0,k.jsxs)(`label`,{className:`block space-y-1.5`,children:[(0,k.jsxs)(`div`,{className:`flex justify-between font-medium text-slate-700`,children:[(0,k.jsx)(`span`,{children:`Vertical Shift (c)`}),(0,k.jsx)(`span`,{className:`font-mono font-bold text-[#1d4ed8]`,children:n.c})]}),(0,k.jsx)(`input`,{type:`range`,min:`-8`,max:`8`,step:`0.5`,value:n.c,onChange:e=>r(t=>({...t,c:Number(e.target.value)})),className:`w-full accent-[#1d4ed8]`})]})]})]}),(0,k.jsxs)(`div`,{className:`bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 space-y-3.5`,children:[(0,k.jsxs)(`div`,{className:`flex items-center justify-between gap-2`,children:[(0,k.jsx)(`span`,{className:`text-[11px] font-semibold uppercase tracking-wider text-[#1d4ed8]`,children:_.unit}),(0,k.jsxs)(`button`,{type:`button`,onClick:ee,className:`text-xs font-medium text-slate-500 hover:text-slate-900 inline-flex items-center gap-1 cursor-pointer`,children:[(0,k.jsx)(oe,{className:`w-3 h-3`}),`Next`]})]}),(0,k.jsx)(`p`,{className:`text-sm font-semibold text-slate-900 leading-snug`,children:_.prompt}),(0,k.jsxs)(`form`,{onSubmit:te,className:`flex items-center gap-2`,children:[(0,k.jsx)(`input`,{type:`text`,value:o,onChange:e=>s(e.target.value),placeholder:`Enter numeric answer...`,"aria-label":`Step check numeric answer`,className:`flex-1 h-9 px-3 rounded-lg border border-slate-200 bg-slate-50 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500`}),(0,k.jsx)(`button`,{type:`submit`,className:`h-9 px-3.5 rounded-lg bg-[#1d4ed8] hover:bg-[#1e40af] text-white text-xs font-semibold cursor-pointer`,children:`Check Step`})]}),(0,k.jsxs)(`div`,{className:`flex items-center justify-between text-xs`,children:[(0,k.jsxs)(`button`,{type:`button`,onClick:()=>l(e=>!e),className:`text-slate-500 hover:text-slate-900 inline-flex items-center gap-1 cursor-pointer`,children:[(0,k.jsx)(C,{className:`w-3.5 h-3.5`}),(0,k.jsx)(`span`,{children:c?`Hide Hint`:`Show Hint`})]}),(0,k.jsxs)(`span`,{className:`font-mono text-slate-500`,children:[`Streak: `,m.streak]})]}),c&&(0,k.jsx)(`div`,{className:`p-2.5 rounded-lg bg-blue-50/70 border border-blue-100 text-xs text-slate-700`,children:_.hint}),u.type!==`idle`&&(0,k.jsxs)(`div`,{className:`p-2.5 rounded-lg border text-xs flex items-start gap-2 ${u.type===`correct`?`bg-emerald-50 border-emerald-200 text-emerald-800`:`bg-rose-50 border-rose-200 text-rose-800`}`,children:[u.type===`correct`?(0,k.jsx)(re,{className:`w-4 h-4 shrink-0 mt-0.5`}):(0,k.jsx)(ie,{className:`w-4 h-4 shrink-0 mt-0.5`}),(0,k.jsx)(`span`,{children:u.message})]})]})]})]})]}),e===`practice`&&(0,k.jsxs)(`section`,{className:`max-w-3xl space-y-5`,children:[(0,k.jsxs)(`div`,{className:`space-y-1.5`,children:[(0,k.jsx)(`div`,{className:`text-xs font-semibold text-[#1d4ed8]`,children:_.unit}),(0,k.jsx)(`h1`,{className:`text-2xl font-extrabold text-slate-900`,children:`Worked Practice Problem`})]}),(0,k.jsxs)(`div`,{className:`bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-xs`,children:[(0,k.jsx)(`p`,{className:`text-base font-semibold text-slate-900`,children:_.prompt}),(0,k.jsxs)(`form`,{onSubmit:te,className:`flex flex-wrap items-center gap-2.5`,children:[(0,k.jsx)(`input`,{type:`text`,value:o,onChange:e=>s(e.target.value),placeholder:`Enter exact value...`,"aria-label":`Practice problem answer`,className:`flex-1 min-w-[180px] h-10 px-3 rounded-lg border border-slate-200 bg-slate-50 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500`}),(0,k.jsx)(`button`,{type:`submit`,className:`h-10 px-4 rounded-lg bg-[#1d4ed8] hover:bg-[#1e40af] text-white text-sm font-semibold cursor-pointer`,children:`Verify Answer`}),(0,k.jsx)(`button`,{type:`button`,onClick:ee,className:`h-10 px-4 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-sm font-semibold cursor-pointer`,children:`Next Problem`})]}),u.type!==`idle`&&(0,k.jsxs)(`div`,{className:`p-3 rounded-xl border text-xs space-y-1.5 ${u.type===`correct`?`bg-emerald-50 border-emerald-200 text-emerald-900`:`bg-rose-50 border-rose-200 text-rose-900`}`,children:[(0,k.jsx)(`div`,{className:`font-semibold`,children:u.message}),u.type===`correct`&&(0,k.jsx)(`ol`,{className:`list-decimal list-inside space-y-0.5 text-emerald-800`,children:_.steps.map((e,t)=>(0,k.jsx)(`li`,{children:e},t))})]}),(0,k.jsxs)(`div`,{className:`pt-2 border-t border-slate-100 text-xs text-slate-600`,children:[(0,k.jsx)(`span`,{className:`font-semibold text-slate-800`,children:`Method Hint: `}),_.hint]})]})]}),e===`formulas`&&(0,k.jsxs)(`section`,{className:`space-y-5`,children:[(0,k.jsxs)(`div`,{className:`flex flex-col sm:flex-row sm:items-end justify-between gap-3`,children:[(0,k.jsxs)(`div`,{children:[(0,k.jsx)(`div`,{className:`text-xs font-semibold text-[#1d4ed8]`,children:`Quick Reference`}),(0,k.jsx)(`h1`,{className:`text-2xl font-extrabold text-slate-900`,children:`Mathematics Formula Sheet`})]}),(0,k.jsx)(`div`,{className:`flex items-center gap-1.5 flex-wrap`,children:S.map(e=>(0,k.jsx)(`button`,{type:`button`,onClick:()=>p(e),className:`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition ${f===e?`bg-[#1d4ed8] text-white`:`bg-white border border-slate-200 text-slate-700 hover:bg-slate-100`}`,children:e},e))})]}),(0,k.jsx)(`div`,{className:`grid grid-cols-1 md:grid-cols-2 gap-4`,children:ce.map(e=>(0,k.jsxs)(`div`,{className:`bg-white rounded-xl border border-slate-200 p-5 space-y-2 shadow-2xs`,children:[(0,k.jsx)(`div`,{className:`text-[11px] font-semibold uppercase tracking-wider text-[#1d4ed8]`,children:e.category}),(0,k.jsx)(`h2`,{className:`text-sm font-bold text-slate-900`,children:e.name}),(0,k.jsx)(`div`,{className:`p-2.5 rounded-lg bg-slate-50 border border-slate-200 font-mono text-sm font-bold text-slate-900`,children:e.expression}),(0,k.jsx)(`p`,{className:`text-xs text-slate-600 leading-relaxed`,children:e.notes})]},e.id))})]}),e===`progress`&&(0,k.jsxs)(`section`,{className:`max-w-3xl space-y-5`,children:[(0,k.jsxs)(`div`,{className:`flex items-center justify-between gap-3`,children:[(0,k.jsxs)(`div`,{children:[(0,k.jsx)(`div`,{className:`text-xs font-semibold text-[#1d4ed8]`,children:`Mastery Telemetry`}),(0,k.jsx)(`h1`,{className:`text-2xl font-extrabold text-slate-900`,children:`Student Progress Overview`})]}),(0,k.jsx)(`button`,{type:`button`,onClick:()=>h({attempted:0,correct:0,streak:0,solvedIds:[]}),className:`px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 cursor-pointer`,children:`Reset Progress`})]}),(0,k.jsxs)(`div`,{className:`grid grid-cols-2 sm:grid-cols-4 gap-4`,children:[(0,k.jsxs)(`div`,{className:`bg-white rounded-xl border border-slate-200 p-4`,children:[(0,k.jsx)(`div`,{className:`text-xs text-slate-500`,children:`Problems Checked`}),(0,k.jsx)(`div`,{className:`text-2xl font-extrabold text-slate-900 mt-1 tabular-nums`,children:m.attempted})]}),(0,k.jsxs)(`div`,{className:`bg-white rounded-xl border border-slate-200 p-4`,children:[(0,k.jsx)(`div`,{className:`text-xs text-slate-500`,children:`Correct Solutions`}),(0,k.jsx)(`div`,{className:`text-2xl font-extrabold text-emerald-600 mt-1 tabular-nums`,children:m.correct})]}),(0,k.jsxs)(`div`,{className:`bg-white rounded-xl border border-slate-200 p-4`,children:[(0,k.jsx)(`div`,{className:`text-xs text-slate-500`,children:`Accuracy`}),(0,k.jsxs)(`div`,{className:`text-2xl font-extrabold text-[#1d4ed8] mt-1 tabular-nums`,children:[le,`%`]})]}),(0,k.jsxs)(`div`,{className:`bg-white rounded-xl border border-slate-200 p-4`,children:[(0,k.jsx)(`div`,{className:`text-xs text-slate-500`,children:`Current Streak`}),(0,k.jsx)(`div`,{className:`text-2xl font-extrabold text-slate-900 mt-1 tabular-nums`,children:m.streak})]})]})]})]})]})};function qt(){let e=(0,x.useMemo)(()=>{try{return typeof window<`u`&&Me(window.location.search,window.name)}catch{return!1}},[]),[t,n]=(0,x.useState)(!1),r=(0,x.useMemo)(()=>e?It(typeof window<`u`?window.location.origin:``,de):``,[e]),i=(0,x.useCallback)(()=>{n(!1);let e=Ie(Fe(window.location.origin)),t=new Blob([e],{type:`text/html`}),r=URL.createObjectURL(t);window.open(r,`VALemStandalone`,`popup=yes,width=1280,height=800,left=100,top=100,menubar=no,toolbar=no,location=no,status=no,resizable=yes`)||n(!0),setTimeout(()=>{URL.revokeObjectURL(r)},1e4)},[]);return(0,x.useEffect)(()=>{if(!t)return;let e=window.setTimeout(()=>n(!1),7e3);return()=>window.clearTimeout(e)},[t]),(0,x.useEffect)(()=>{let t=t=>{!e&&je(t)?i():e&&t.key===`Escape`&&(t.preventDefault(),Le(document,window))},n=t=>{e&&t?.data?.type===`valbrowse-panic`&&Le(document,window)};return window.addEventListener(`keydown`,t,!0),window.addEventListener(`message`,n),()=>{window.removeEventListener(`keydown`,t,!0),window.removeEventListener(`message`,n)}},[e,i]),e&&r?(0,k.jsx)(`div`,{className:`fixed inset-0 z-50 bg-[#080406] flex flex-col`,role:`dialog`,"aria-modal":`true`,"aria-label":`Vux Workspace`,children:(0,k.jsx)(`iframe`,{"data-testid":`valbrowse-blob-iframe`,srcDoc:r,title:`Vux Workspace`,allow:`autoplay; gamepad; fullscreen`,className:`w-full h-full border-0 bg-[#0b0608]`})}):(0,k.jsxs)(`div`,{className:`min-h-screen bg-slate-50 text-slate-900`,children:[(0,k.jsx)(Kt,{}),t&&(0,k.jsxs)(`div`,{role:`status`,"data-testid":`popup-blocked-toast`,className:`fixed bottom-4 right-4 z-[70] max-w-sm rounded-xl bg-zinc-900 border border-amber-500/40 shadow-2xl px-4 py-3 text-xs text-zinc-100 flex items-start gap-2.5`,children:[(0,k.jsx)(ce,{className:`w-4 h-4 text-amber-400 shrink-0 mt-0.5`}),(0,k.jsxs)(`div`,{className:`flex-1 leading-relaxed`,children:[`Popup blocked — allow popups for this site in your browser's address bar, then press`,` `,(0,k.jsx)(`strong`,{children:`Control`}),` again.`]}),(0,k.jsx)(`button`,{type:`button`,onClick:()=>n(!1),className:`text-zinc-400 hover:text-white cursor-pointer`,"aria-label":`Dismiss popup notice`,children:(0,k.jsx)(le,{className:`w-4 h-4`})})]})]})}try{typeof navigator<`u`&&`serviceWorker`in navigator&&typeof navigator.serviceWorker.getRegistrations==`function`&&navigator.serviceWorker.getRegistrations().then(e=>{e.forEach(e=>{try{Ne(e.scope,window.location.origin)||e.unregister()}catch{}})}).catch(()=>{})}catch{}(0,ue.createRoot)(document.getElementById(`root`)).render((0,k.jsx)(qt,{}));
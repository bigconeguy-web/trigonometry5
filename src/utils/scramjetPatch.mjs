const UNGUARDED_FUNCTION_HOOK_RE =
  /let ([A-Za-z_$][\w$]*)=([A-Za-z_$][\w$]*)\.natives\.call\("eval",null,"\(function \(\) \{\}\)"\)\.constructor,([A-Za-z_$][\w$]*)=\2\.natives\.call\("eval",null,"\(async function \(\) \{\}\)"\)\.constructor,([A-Za-z_$][\w$]*)=\2\.natives\.call\("eval",null,"\(function\* \(\) \{\}\)"\)\.constructor,([A-Za-z_$][\w$]*)=\2\.natives\.call\("eval",null,"\(async function\* \(\) \{\}\)"\)\.constructor;\2\.RawProxy\(\1\.prototype,"constructor",([A-Za-z_$][\w$]*)\),\2\.RawProxy\(\3\.prototype,"constructor",\6\),\2\.RawProxy\(\4\.prototype,"constructor",\6\),\2\.RawProxy\(\5\.prototype,"constructor",\6\)/g;

/**
 * Guards Scramjet's Function/AsyncFunction/GeneratorFunction constructor trap
 * against realms where `eval` returns null/undefined or throws (for example,
 * `<iframe sandbox="allow-same-origin" src="about:blank">` created by YouTube's
 * history state initializer or strict CSP frames).
 *
 * @param {string} source
 * @returns {string}
 */
export function patchScramjetBundle(source) {
  if (typeof source !== 'string' || !source) return source;
  return source.replace(
    UNGUARDED_FUNCTION_HOOK_RE,
    (_match, _fnVar, clientVar, _asyncVar, _genVar, _asyncGenVar, handlerVar) =>
      `for(const _sjSrc of["(function () {})","(async function () {})","(function* () {})","(async function* () {})"]){try{const _sjFn=${clientVar}.natives.call("eval",null,_sjSrc);_sjFn&&_sjFn.constructor&&${clientVar}.RawProxy(_sjFn.constructor.prototype,"constructor",${handlerVar})}catch(_sjErr){}}`
  );
}

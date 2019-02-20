import { checkTypeCore } from './checkType'
import { Options, PrefixedText, Result } from './types'
import { ArrayLiteral, Tuple } from './util'
type CTuple<T, L extends number> = T[] //[...T[]]&{length: L}//&ArrayLiteral<T,L>//  (T[])&{length: L}//Tuple<T, L>

export function checkCompile<L extends number>(
  options: Options = {},
  value: (...types: CTuple<string, L>) => string,
  ...types: CTuple<PrefixedText, L>
): Result {
  const code = buildCode<L>(types, value)
  const result = checkTypeCore(code, '', { ...options, asString: true, dontCreateTestCodeVariable: true })
  return result
}

export function expectCompile<L extends number>(
  options: Options = {},
  value: (...types: CTuple<string, L>) => string,
  ...types: CTuple<PrefixedText, L>
): boolean {
  const code = buildCode<L>(types, value)
  const result = checkTypeCore(code, '', { ...options, asString: true, dontCreateTestCodeVariable: true })
  return result.pass
}

function buildCode<L extends number>(types: CTuple<PrefixedText, L>, value: (...types: CTuple<string, L>) => string) {
  const prefix = types
    .map(t => t!.__tsdCR_prefix)
    .filter((t, i, a) => a.indexOf(t) === i)
    .join('\n')
  const typeStrings = types.map(t => t.text) //as CTuple<string, L>;
  const valueString = value(...(typeStrings as any))
  const code = `
  // PREFIX
  ${prefix}
  // TYPE
  ${valueString}`
  return code
}

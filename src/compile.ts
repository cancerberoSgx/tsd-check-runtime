import { checkTypeCore } from './checkType'
import { Options, PrefixedText, Result } from './types'

/**
 * Build test code fragment using given types (and its prefix) and value function and then calls [[checkType]]
 * passing it. It forces options `{asString: true, dontCreateTestCodeVariable: true}`
 */
export function checkCompile(
  options: Options = {},
  value: (...types: string[]) => string,
  ...types: PrefixedText[]
): Result {
  const code = buildCode(types, value)
  const result = checkTypeCore(code, '', { ...options, asString: true, dontCreateTestCodeVariable: true })
  return result
}

/**
 * Shortcut return value for [[checkCompile]]
 */
export function expectCompile(
  options: Options = {},
  value: (...types: string[]) => string,
  ...types: PrefixedText[]
): boolean {
  const code = buildCode(types, value)
  const result = checkTypeCore(code, '', { ...options, asString: true, dontCreateTestCodeVariable: true })
  return result.pass
}

function buildCode(types: PrefixedText[], value: (...types: string[]) => string) {
  const prefix = types
    .map(t => t!.__tsdCR_prefix)
    .filter((t, i, a) => a.indexOf(t) === i)
    .join('\n')
  const typeStrings = types.map(t => t.text)
  const valueString = value(...typeStrings)
  const code = `
  // PREFIX
  ${prefix}
  // TYPE
  ${valueString}`
  return code
}

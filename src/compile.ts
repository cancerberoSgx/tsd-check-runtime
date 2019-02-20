import { checkTypeCore } from './checkType';
import { Options, PrefixedText, Result } from './types';
import { ArrayLiteral } from './util';

export function checkCompile<L extends number>(options: Options = {}, value: (...types: ArrayLiteral<string, L>) => string, ...types: ArrayLiteral<PrefixedText, L>): Result {
  const code = buildCode<L>(types, value);
  const result = checkTypeCore(code, '', { ...options, asString: true, dontCreateTestCodeVariable: true });
  return result;
}

export function expectCompile<L extends number>(options: Options = {}, value: (...types: ArrayLiteral<string, L>) => string, ...types: ArrayLiteral<PrefixedText, L>): boolean {
  const code = buildCode<L>(types, value);
  const result = checkTypeCore(code, '', { ...options, asString: true, dontCreateTestCodeVariable: true });
  return result.pass;
}

function buildCode<L extends number>(types: ArrayLiteral<PrefixedText, L>, value: (...types: ArrayLiteral<string, L>) => string) {
  const prefix = (types as PrefixedText[]).map(t => t!.__tsdCR_prefix).filter((t, i, a) => a.indexOf(t) === i).join('\n');
  const typeStrings = (types as PrefixedText[]).map(t => t.text) as ArrayLiteral<string, L>;
  const valueString = value(...typeStrings);
  const code = `
  // PREFIX
  ${prefix}
  // TYPE
  ${valueString}`;
  return code;
}
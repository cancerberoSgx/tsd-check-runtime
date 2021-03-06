import { Diagnostic, ts } from 'ts-simple-ast'
import { Options, CompilationError } from './types'
import { stringify } from 'javascript-stringify'

/** @internal */

export function formatDiagnostics(d: Diagnostic[]): CompilationError[] {
  return d.map(tsd => ({
    message: ts.flattenDiagnosticMessageText(tsd.compilerObject.messageText, '\n'),
    code: tsd.getCode(),
    file: tsd.getSourceFile() && tsd.getSourceFile()!.getFilePath(),
    length: tsd.getLength(),
    lineNumber: tsd.getLineNumber(),
    start: tsd.getStart(),
    startColumn: ts.getLineAndCharacterOfPosition(tsd.getSourceFile()!.compilerNode, tsd.getStart()!).character + 1,
    startLineNumber: ts.getLineAndCharacterOfPosition(tsd.getSourceFile()!.compilerNode, tsd.getStart()!).line + 1,
    endColumn:
      ts.getLineAndCharacterOfPosition(tsd.getSourceFile()!.compilerNode, tsd.getStart()! + tsd.getLength()!)
        .character + 1,
    endLineNumber:
      ts.getLineAndCharacterOfPosition(tsd.getSourceFile()!.compilerNode, tsd.getStart()! + tsd.getLength()!).line + 1
  }))
}
let _unique: number = 0
/** @internal */
export function unique(prefix: string = '_'): string {
  return prefix + _unique++
}

/** @internal */
export function quote(s: string, q: string = '"'): string {
  return q + s.replace(new RegExp(q, 'g'), '\\' + q) + q
}

/** @internal */
export function escapeValue<T>(v: T, options: Options): string | undefined {
  if (typeof v === 'string' || options.asString) {
    return quote(v + '')
  } else if (options.enforceJsonValues) {
    try {
      return JSON.stringify(v)
    } catch (error) {
      return undefined
    }
  } else if (typeof v === 'undefined') {
    return 'undefined'
  } else if (v === null) {
    return 'null'
  } else {
    const s = stringify(v)
    if (s === undefined) {
      throw new Error('Cannot escape value ' + v)
    } else {
      return s
    }
  }
}

const callsites = require('callsites')
/** @internal */
export function getCallerFile(): { callerFile: string | undefined; allCallerFiles: string[] } {
  const c = callsites() as any[]
  let f: string | undefined
  const jestMatcher = c
    .filter(c => c.getFileName())
    .findIndex(
      c => c.getFileName().endsWith('dist/src/jestMatcher.js') || c.getFileName().endsWith('src/jestMatcher.ts')
    )
  if (jestMatcher !== -1) {
    // this is for the case of using jest matcher from an external project:
    f = c[jestMatcher + 2].getFileName()
  } else {
    // this works for the rest of the environments
    f = c[3] && c[3].getFileName()
  }
  // console.log('choose: ', f, 'all\n', c.map((c: any) => c.getFileName()))
  return { callerFile: f, allCallerFiles: c.map((c: any) => c.getFileName()).map(c => c) }
}

export type ArrayLiteral<T, L> = 0 extends L
  ? []
  : 1 extends L
  ? [T]
  : 2 extends L
  ? [T, T]
  : 3 extends L
  ? [T, T, T]
  : 4 extends L
  ? [T, T, T, T]
  : 5 extends L
  ? [T, T, T, T, T]
  : 6 extends L
  ? [T, T, T, T, T, T]
  : 7 extends L
  ? [T, T, T, T, T, T, T]
  : 8 extends L
  ? [T, T, T, T, T, T, T, T]
  : 9 extends L
  ? [T, T, T, T, T, T, T, T, T]
  : 10 extends L
  ? [T, T, T, T, T, T, T, T, T, T]
  : 11 extends L
  ? [T, T, T, T, T, T, T, T, T, T, T]
  : never

export type Tuple<TItem, TLength extends number> = [TItem, ...TItem[]] & {
  length: TLength
}

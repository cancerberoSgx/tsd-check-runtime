export interface Options {
  /** Use another tsconfig.json file than the default './tsconfig.json'. If so make sure you also set the property `folder` if it's in another folder */
  tsConfigFilePath?: string
  enforceJsonValues?: boolean
  /** When using `tsConfigFilePath`  that's in another folder specify it with this option.*/
  folder?: string
  dontVerifyFile?: boolean
  /** pass true if you are already passing a quoted value. By default value is escaped in the output */
  dontEscape?: boolean
  /** in cases where the value is an object that knows how to print itself and you don't want to be processed by Stringify - force it to be rendered as string . Implies `dontScape` */
  asString?: boolean
  verifyProject?: boolean
  printResultIfFail?: boolean
  printResult?: boolean
  dontCreateTestCodeVariable?: boolean
}
export interface Result {
  pass: boolean
  error?: string
  failErrors?: CompilationError[]
  code?: string
  testCode?: string
  callerFile?: string
  filePath?: string
  allCallerFiles: string[]
}
export interface CompilationError {
  message: string
  code: number
  file: string | undefined
  length: number | undefined
  lineNumber: number | undefined
  start: number | undefined
  startColumn: number
  startLineNumber: number
  endColumn: number
  endLineNumber: number
}
export type TypeRepresentation<T> = string | ((value: T | string, type?: TypeRepresentation<T>) => string)

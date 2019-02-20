export interface Options {

  /** 
   * Use another tsconfig.json file than the default './tsconfig.json'. If so make sure you also set the property `folder` if it's in another folder 
   */
  tsConfigFilePath?: string

  /**
   * If true, it will fail if a value is not JSON 
   */
  enforceJsonValues?: boolean

  /** 
   * When using `tsConfigFilePath`  that's in another folder specify it with this option.
   */
  folder?: string

  /**
   * Won't make the initial verification of the file. Could be a bit faster, but if the file already has compilation errors the test will always fail
   */
  dontVerifyFile?: boolean

  /** 
   * Pass true if you are already passing a quoted value. By default value is escaped in the output 
   */
  dontEscape?: boolean

  /** 
   * In cases where the value is an object that knows how to print itself and you don't want to be processed by Stringify - force it to be rendered as string . Implies `dontScape` 
   */
  asString?: boolean

  /**
   * Besides making an initial file verification, it will also verify that the whole project compiles without errors. If not, the test will fail
   */
  verifyProject?: boolean

  /**
   * Prints the test results to stdout if it fails 
   */
  printResultIfFail?: boolean
  
  /**
   * Prints the test results to stdout
   */
  printResult?: boolean
  
  /**
   * If the type is a string and not a function, then it will not create the dummy variable in the test code
   */
  dontCreateTestCodeVariable?: boolean
  
  /**
   * If given, it will fail only if error codes included in this are found. If other errors are found, it will still return pass===true
   */
  failOnlyWithErrorCodes?: number[]
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

export interface Options {
  /**
   * Use another tsconfig.json file than the default './tsconfig.json'. If so make sure you also set the
   * property `folder` if it's in another folder
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
   * Won't make the initial verification of the file. Could be a bit faster, but if the file already has
   * compilation errors the test will always fail
   */
  dontVerifyFile?: boolean

  /**
   * Pass true if you are already passing a quoted value. By default value is escaped in the output
   */
  dontEscape?: boolean

  /**
   * In cases where the value is an object that knows how to print itself and you don't want to be processed
   * by Stringify - force it to be rendered as string . Implies `dontScape`
   */
  asString?: boolean

  /**
   * Besides making an initial file verification, it will also verify that the whole project compiles without
   * errors. If not, the test will fail
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
   * If given, it will fail only if error codes included in this are found. If other errors are found, it will
   * still return pass===true
   */
  failOnlyWithErrorCodes?: number[]
}

export interface Result {
  /**
   * if true it means that types matched and there were no compile errors given the `options` conditions. If
   * false, `failErrors` contains compilation errors or if there were an internal/user error (like project
   * configuration not found) it will be returned in `error`
   */
  pass: boolean
  /**
   * If there was an user error or internal error (i.e: project configuration not found, or callerFile
   * couldnt' be resolved) then that kind of error is returned here and `pass` will be false.
   */
  error?: string
  /**
   * in case `pass` is false because a compilation error, it probably means that the types don't match and the
   * list of compile diagnostic errors will be returned here.
   */
  failErrors?: CompilationError[]
  /**
   * The whole source code of the compiled source file created - that is the caller source file with the test
   * code prepended
   */
  code?: string
  /**
   * the test code prepended to the caller file to build the new source file that was compiled to type check.
   * It contains user code and declarations that add names in relevant scopes (like variables declared in
   * define(), it(), test(), etc)
   */
  testCode?: string
  /**
   * Absolute path to the caller file, this is, the file from where the checkType() or expectType() or
   * expect().toMatchType() functions were called. This file contents is used to build a new file with some
   * extra "text code" prepended to it and that file is then compiled and check for errors to perform the
   * "type checking"
   */
  callerFile?: string
  /**
   * Absolute path to the new file created (from `callerFile`) with test code prepended. Notice that this file
   * is actually not created, this is the path the compiler uses in the project to reference it virtually.
   */
  filePath?: string
  /**
   * A list of ordered caller files absolute paths to debug
   */
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

export type TypeRepresentation<T> = string | PrefixedText | ((value: T, type?: TypeRepresentation<T>) => string)

export interface PrefixedText {
  text: string
  __tsdCR_prefix: string | undefined
}

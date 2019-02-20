import { Project, Diagnostic, ts, SourceFile } from 'ts-simple-ast'
import { dirname, join, basename } from 'path'
import { readFileSync } from 'fs'
import { Options, Result, TypeRepresentation, PrefixedText } from './types'
import { getCallerFile, formatDiagnostics, unique, escapeValue } from './util'

export function checkType<T>(typeOrFunction: TypeRepresentation<T>, value: T, options: Options = {}): Result {
  return checkTypeCore(typeOrFunction, value, options)
}
/** @internal */
export function checkTypeCore<T>(typeOrFunction: TypeRepresentation<T>, value: T, options: Options = {}): Result {
  options.dontEscape = options.asString || options.dontEscape
  options.printResult && console.log(options)

  let d: Diagnostic<ts.Diagnostic>[]
  let sourceFile: SourceFile
  const tsConfigFilePath = options.tsConfigFilePath || './tsconfig.json'
  if (!project) {
    project = new Project({
      tsConfigFilePath,
      addFilesFromTsConfig: true
    })
  }
  const { callerFile, allCallerFiles } = getCallerFile()
  if (!callerFile) {
    return {
      pass: false,
      error: `Caller source file cannot be found, aborting`,
      allCallerFiles
    }
  }
  const callerSourceFile = project.getSourceFile(callerFile)
  if (!callerSourceFile) {
    return {
      pass: false,
      error: `Caller source must belong to ${tsConfigFilePath} project but ${callerFile} does not`,
      callerFile,
      allCallerFiles
    }
  }
  if (options.verifyProject) {
    d = project.getPreEmitDiagnostics()
    if (d.length) {
      return {
        pass: false,
        error: `Given TypeScript project cannot have compilation errors, fix them and try again. Errors: ${formatDiagnostics(
          d
        )}`,
        callerFile,
        allCallerFiles
      }
    }
  } else if (!options.dontVerifyFile) {
    d = callerSourceFile.getPreEmitDiagnostics()
    if (d.length) {
      return {
        pass: false,
        error: `Caller TypeScript file cannot have compilation errors, fix them and try again. Errors: ${formatDiagnostics(
          d
        )}`,
        callerFile,
        allCallerFiles
      }
    }
  }
  //TODO: verify it's contained in project
  const folderName = dirname(callerFile)
  const fileName = `${options.folder || ''}${unique(basename(callerFile, '.ts'))}.ts` // TODO: callerFile could be tsx
  const filePath = join(folderName, fileName)
  let testCode: string
  const escapedValue = options.dontEscape ? value : escapeValue(value, options)
  if (escapedValue === undefined) {
    return {
      pass: false,
      error: `Value is not JSON and option enforceJsonValues was used`,
      callerFile,
      filePath,
      allCallerFiles
    }
  }

  if (typeof typeOrFunction === 'function') {
    typeOrFunction = typeOrFunction(escapedValue as T)
    options.dontCreateTestCodeVariable = true
  }

  let { text, __tsdCR_prefix: prefix } =
    typeof typeOrFunction === 'string' ? { text: typeOrFunction, __tsdCR_prefix: '' } : typeOrFunction

  if (!prefix && value && typeof ((value as any) as PrefixedText).__tsdCR_prefix === 'string') {
    prefix = ((value as any) as PrefixedText).__tsdCR_prefix
  }

  if (options.dontCreateTestCodeVariable) {
    testCode = `${prefix}\n${text}`
  } else {
    testCode = `${prefix}\nconst ${unique('variable')}: ${text} = ${escapedValue}`
  }

  const code = `
${readFileSync(callerFile).toString()}
function ${unique('__checkType')}(){
${testCode}
}`
  sourceFile = project.createSourceFile(filePath, code)
  d = sourceFile.getPreEmitDiagnostics()
  const failErrors = formatDiagnostics(d)
  const pass =
    d.length === 0
      ? true
      : options.failOnlyWithErrorCodes
      ? !failErrors.find(e => options.failOnlyWithErrorCodes!.includes(e.code))
      : false

  const r = {
    pass,
    failErrors,
    code,
    testCode,
    callerFile,
    filePath,
    allCallerFiles
  }

  if (options.printResult || (!r.pass && options.printResultIfFail)) {
    console.log(JSON.stringify({ ...r, code: null }, null, 2))
  }

  return r
}
let project: Project

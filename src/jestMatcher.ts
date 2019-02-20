import { Options, TypeRepresentation, PrefixedText } from './types'
import { checkType } from './checkType'
import { escapeValue, unique } from './util'
import { number } from './typeTestUtil'
import { checkCompile } from './compile'

declare global {
  namespace jest {
    interface Matchers<R> {
      /**
       * calls [[checkType]] with given value and type and optional options. Options might also include
       * `exactly` property which will verify that the value type not only match given type but also that they
       * are identical
       */
      toMatchType<R>(type: TypeRepresentation<R>, options?: Options & { exactly?: boolean }): R
      /**
       * Calls [[checkCompile]] with given value and type and optional options.
       */
      toCompile<R>(options: Options, ...types: PrefixedText[]): R
      /**
       * Calls [[checkCompile]] with given value and type and optional options.
       */
      toCompile<R>(...types: PrefixedText[]): R
    }
  }
}

if (typeof expect !== 'undefined') {
  expect.extend({
    toMatchType<T>(value: T, type: TypeRepresentation<T>, options: Options & { exactly?: boolean } = {}) {
      if (options.exactly) {
        type = `
function ${unique('__jestMatcher_toMatchType')}(){
  type ExactlyMatch<t1, t2> = t1 extends t2 ? t2 extends t1 ? true : never : never
  var anotherVariable = ${escapeValue(value, options)}
  var variableToMatchTypeExactly: ExactlyMatch<${type}, typeof anotherVariable> = true
}`
        options = { ...options, dontCreateTestCodeVariable: true }
      }

      const r = checkType(type, value, options)
      return {
        pass: r.pass,
        message: () =>
          `expect value ${escapeValue(value, options)} ${this.isNot ? 'not ' : ''}to match ${
            typeof type === 'string' ? `type ${type}` : `types in code "${r.testCode}"`
          } but ${
            this.isNot
              ? 'did'
              : `[${
                  r.failErrors
                    ? r.failErrors.map(r => `(${r.code}) ${r.message}`).join('\n')
                    : r.error
                    ? r.error
                    : 'UNKNOWN'
                }]`
          }`
      }
    },

    toCompile(value: (...values: string[]) => string, ...optionsOrTypes: (Options | PrefixedText)[]) {
      let { options, types } = optionsOrTypes.length
        ? typeof ((optionsOrTypes[0] as any) as PrefixedText).__tsdCR_prefix === 'string'
          ? { options: {} as Options, types: optionsOrTypes as PrefixedText[] }
          : {
              options: optionsOrTypes[0] as Options,
              types: optionsOrTypes.slice(1, optionsOrTypes.length) as PrefixedText[]
            }
        : { options: {} as Options, types: [] as PrefixedText[] }

      const r = checkCompile(options, value, ...types)

      return {
        pass: r.pass,
        message: () =>
          `expect value "${value}" ${this.isNot ? 'not ' : ''}to compile but ${
            this.isNot
              ? 'did'
              : `thrown [${
                  r.failErrors
                    ? r.failErrors.map(r => `(${r.code}) ${r.message}`).join('\n')
                    : r.error
                    ? r.error
                    : 'UNKNOWN'
                }]`
          }`
      }
    }
  })
}

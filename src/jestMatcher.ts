import { Options, TypeRepresentation } from './types'
import { checkType } from './checkType'
import { escapeValue, unique } from './util'
import { number } from './typeTestUtil'

declare global {
  namespace jest {
    interface Matchers<R> {
      toMatchType<T>(type: TypeRepresentation<T>, options?: Options & { exactly?: boolean }): R
      toCompile<T>(options?: Options): R
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

    toCompile<T>(value: T, options: Options = { asString: true, dontEscape: true }) {
      options = { ...options, ...{ asString: true, dontEscape: true } }
      const r = checkType(() => value + '', '', options)
      return {
        pass: r.pass,
        message: () =>
          `expect value "${value}" ${this.isNot ? 'not ' : ''}to compile but ${
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
    }
  })
}

// \ntype ExactlyMatch<t1, t2> = t1 extends t2 ? t2 extends t1 ? true : never : never\nvar variableToMatchTypeExactly: ExactlyMatch<(value, type) => `\ntype ExactlyMatch<t1, t2> = t1 extends t2 ? t2 extends t1 ? true : never : never\nvar variableToMatchTypeExactly: ExactlyMatch<${type}, typeof ${value}> = true\n            `, typeof \"testVariable1\"> = true\n

// ignore errors that are not 2322 ("Type X is not assignable to type Y")

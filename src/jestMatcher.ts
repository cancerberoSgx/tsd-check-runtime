import {Options, TypeRepresentation} from './types'
import {checkType} from './checkType'
import {escapeValue} from './util'

declare global {
  namespace jest {
    interface Matchers<R> {
      toMatchType<T>(type: TypeRepresentation<T>, options?: Options): R
      toCompile<T>(options?: Options): R
    }
  }
}
if (typeof expect !== 'undefined') {
  expect.extend({
    toMatchType<T>(value: T, type: TypeRepresentation<T>, options: Options = {}) {
      const r = checkType(type, value, options)
      return {
        pass: r.pass,
        message: () =>
          `expect value ${escapeValue(value, options)} ${this.isNot ? 'not ' : ''}to match ${
            typeof type === 'string' ? `type ${type}` : `types in code "${r.testCode}"`
          }but ${
            this.isNot
              ? "did"
              : `[${r.failErrors ? r.failErrors.map(r => r.message).join('\n') : r.error ? r.error : 'UNKNOWN'}]`
          }`,
      }
    },

    toCompile<T>(value: T, options: Options = {asString: true, dontEscape: true}) {
      options = {...options, ...{asString: true, dontEscape: true}}
      const r = checkType(()=>value+'', '', options)
      return {
        pass: r.pass,
        message: () =>
          `expect value "${value}" ${this.isNot ? 'not ' : ''}to compile but ${
            this.isNot
              ? "did"
              : `[${r.failErrors ? r.failErrors.map(r => r.message).join('\n') : r.error ? r.error : 'UNKNOWN'}]`
          }`,
      }
    },
    
  })
}

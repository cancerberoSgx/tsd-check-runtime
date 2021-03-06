import '..'
import { Type } from '..'
type UnionOf<T extends any[]> = T[number]

interface A {}
interface B extends A {
  b: number
}
var testVariable1: B = { b: 8 }

describe('jestMatchers', () => {
  describe('toMatchType', () => {
    it('should work jest matcher toMatchType', () => {
      expect('a').not.toMatchType(`UnionOf<[1, false]>`)
      expect(2).not.toMatchType(`UnionOf<[1, false]>`)
      expect(1).toMatchType(`UnionOf<[1, false]>`)
    })
    it('jest matcher should work', () => {
      expect(1).toMatchType('number')
      expect(1).not.toMatchType('string')
    })
  })

  describe('exactly', () => {
    it('should exactly match type if exactly is passed', () => {
      expect(testVariable1).toMatchType('B', { exactly: true })
      expect(testVariable1).toMatchType('B')
      expect(testVariable1).not.toMatchType('A', { exactly: true })
      expect(testVariable1).toMatchType('A')
    })
  })

  describe('toCompile', () => {
    it('toCompile', () => {
      expect(() => `var a = 1`).toCompile()
      expect(() => `v a r a = 1`).not.toCompile()
      expect((n: string) => `var a: ${n} = 1`).toCompile(Type<number>())
      expect((n: string) => `var a: ${n} = 1`).not.toCompile(Type<string>())
      interface II {
        foo: Date[][]
        m(): string[]
      }
      expect(
        (II: string, mReturnType: string) => `var a: ${II} = {foo: [], m(){return null as any as ${mReturnType}}}`
      ).toCompile(Type<II>(), Type<string[]>())
      expect(
        (II: string, mReturnType: string) => `var a: ${II} = {foo: [], m(){return null as any as ${mReturnType}}}`
      ).not.toCompile(Type<II>(), Type<number[]>())
    })
  })
})

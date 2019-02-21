import { Type } from '..'
import { checkCompile, expectCompile } from '../compile'
import { Result } from '../types'
import { ArrayLiteral, Tuple } from '../util'
import { get } from "./__tsd_check_runtime__";

describe('compile', () => {
  describe('checkCompile', () => {
    interface I {
      m(): number
    }
    class C {
      m() {
        return false
      }
    }

    it('should reference given list of types', () => {
      let r: Result
      r = checkCompile(
        {},
        (I, returnType) => `
    var c: {m():${returnType}} = null as any
    var d: ${I} = c    
    `,
        Type<I>(get(1, 0)),
        Type<number | string>(get(1, 1))
      )
      expect(r.pass).toBe(false)
      expect(r.failErrors).toHaveLength(1)
      expect(r.failErrors![0].code).toBe(2322)
      expect(r.failErrors![0].message).toContain('is not assignable')

      r = checkCompile(
        {},
        (I, returnType) => `
    var c: {m():${returnType}} = null as any
    var d: ${I} = c
    `,
        Type<I>(get(1, 2)),
        Type<number>(get(1, 3))
      )
      expect(r.pass).toBe(true)
      expect(r.failErrors).toHaveLength(0)
    })
  })

  describe('expectCompile', () => {
    it('should let me test code arbitrarily', () => {
      interface A {
        n: number
      }
      type Array2 = ArrayLiteral<A, 2>
      type Tuple2 = Tuple<A, 2>

      expect(
        expectCompile({}, (Array2, Tuple2) => `var c: ${Array2} = [{n: 1}, {n: 2}]`, Type<Array2>(get(1, 4)), Type<Tuple2>(get(1, 5)))
      ).toBe(true)

      expect(
        expectCompile({}, (Array2, Tuple2) => `var c: ${Tuple2} = [{n: 1}, {n: 2}]`, Type<Array2>(get(1, 6)), Type<Tuple2>(get(1, 7)))
      ).toBe(true)

      expect(
        expectCompile({}, (Array2, Tuple2) => `var c: ${Array2} = [{n: 1}, {n: '2'}]`, Type<Array2>(get(1, 8)), Type<Tuple2>(get(1, 9)))
      ).toBe(false)

      expect(
        expectCompile({}, (Array2, Tuple2) => `var c: ${Tuple2} = [{n: 1}, {n: '2'}]`, Type<Array2>(get(1, 10)), Type<Tuple2>(get(1, 11)))
      ).toBe(false)

      expect(
        expectCompile(
          {},
          (Array2, Tuple2) => `var c: ${Array2} = [{n: 1}, {n: 2}, {n: 3}]`,
          Type<Array2>(get(1, 12)),
          Type<Tuple2>(get(1, 13))
        )
      ).toBe(false)

      expect(
        expectCompile(
          {},
          (Array2, Tuple2) => `var c: ${Tuple2} = [{n: 1}, {n: 2}, {n: 3}]`,
          Type<Array2>(get(1, 14)),
          Type<Tuple2>(get(1, 15))
        )
      ).toBe(false)

      expect(
        expectCompile(
          {},
          (Array2, Tuple2) => `var c: ${Array2} = [{n: 1}, {n: 2}]; var d = c[3]`,
          Type<Array2>(get(1, 16)),
          Type<Tuple2>(get(1, 17))
        )
      ).toBe(false)

      expect(
        expectCompile(
          {},
          (Array2, Tuple2) => `var c: ${Tuple2} = [{n: 1}, {n: 2} ]; var d = c[3]`,
          Type<Array2>(get(1, 18)),
          Type<Tuple2>(get(1, 19))
        )
      ).toBe(true)
    })
  })
})

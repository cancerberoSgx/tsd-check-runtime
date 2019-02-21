import { Type } from '..'
import { get } from "./__tsd_check_runtime__";

describe('Type', () => {
  it('basic Type with toMatchType', () => {
    interface I {
      m(): number
    }
    class C {
      m() {
        return false
      }
    }
    expect({
      m() {
        return 12
      }
    }).toMatchType(Type<I>(get(0, 0)))
    expect({
      m() {
        return '12'
      }
    }).not.toMatchType(Type<I>(get(0, 1)))
    expect({
      m() {
        return false
      }
    }).toMatchType(Type<C>(get(0, 2)))
    expect({
      m() {
        return new Date()
      }
    }).not.toMatchType(Type<C>(get(0, 3)))
  })

  type UnionOf<T extends any[]> = T[number]

  it('should be able to reference types declared on any scope', () => {
    expect('a').not.toMatchType(Type<UnionOf<[1, false]>>(get(0, 4)))
    expect(2).not.toMatchType(Type<UnionOf<[1, false]>>(get(0, 5)))
    expect(1).toMatchType(Type<UnionOf<[1, false]>>(get(0, 6)), {})

    interface A {
      a: number
    }
    interface B extends A {
      b: string
    }
    var b: B = { a: 1, b: 's' }
    type Identical<t1, t2> = t1 extends t2 ? (t2 extends t1 ? true : never) : never
    type Extends<t1, t2> = t1 extends t2 ? true : never

    expect(true).not.toMatchType(Type<Identical<typeof b, A>>(get(0, 7)))
    expect(true).toMatchType(Type<Extends<typeof b, A>>(get(0, 8)))
  })

  it('should be able to pass a type as value for complex asserts', () => {
    type Tuple<TItem, TLength extends number> = [TItem, ...TItem[]] & {
      length: TLength
    }

    type ArrayLiteral<T, L> = 0 extends L
      ? []
      : 1 extends L
      ? [T]
      : 2 extends L
      ? [T, T]
      : 3 extends L
      ? [T, T, T]
      : 4 extends L
      ? [T, T, T, T]
      : never
    expect(Type<Tuple<[{ a: string }], 2>>(get(0, 9))).toMatchType(
      v => `
      var var_a: ${v} = null as any as ${v}
      var var_b = var_a[33] 
      `,
      { asString: true }
    )
    expect(Type<Tuple<[{ a: string }], 2>>(get(0, 10))).toMatchType(
      v => `
      var var_a: ${v} = null as any as ${v}
      var var_b = var_a[1]  
      `,
      { asString: true }
    )
    expect(Type<ArrayLiteral<[{ a: string }], 2>>(get(0, 11))).not.toMatchType(
      v => `
      var var_a: ${v} = null as any as ${v}
      var var_b = var_a[33] 
      `,
      { asString: true }
    )
    expect(Type<ArrayLiteral<[{ a: string }], 2>>(get(0, 12))).toMatchType(
      v => `
      var var_a: ${v} = null as any as ${v}
      var var_b = var_a[1] 
      `,
      { asString: true }
    )
  })

  it('should be able to pass undefined as value', () => {
    expect(undefined).not.toMatchType(Type<string>(get(0, 13)))
  })
})

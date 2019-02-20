import { Type, PrefixedText } from 'tsd-check-runtime';

describe('Type', () => {

  type UnionOf<T extends any[]> = T[number];

  it('should be able to reference types declared on any scope', () => {
    expect('a').not.toMatchType(Type<UnionOf<[1, false]>>())
    expect(2).not.toMatchType(Type<UnionOf<[1, false]>>())
    expect(1).toMatchType(Type<UnionOf<[1, false]>>(), {  })

    interface A { a: number }
    interface B extends A { b: string }
    var b: B = { a: 1, b: 's' }
    type Identical<t1, t2> = t1 extends t2 ? t2 extends t1 ? true : never : never
    type Extends<t1, t2> = t1 extends t2 ? true : never

    expect(true).not.toMatchType(Type<Identical<typeof b, A>>())
    expect(true).toMatchType(Type<Extends<typeof b, A>>())
  })

  it('should be able to pass a type as value for complex asserts', () => {
    type Tuple<TItem, TLength extends number> = [TItem, ...TItem[]] & {
      length: TLength
    }

    type ArrayLiteral<T, L> = 0 extends L ? [] : 1 extends L ? [T] : 2 extends L ? 
    [T, T] : 3 extends L
      ? [T, T, T]
      : 4 extends L
      ? [T, T, T, T]
      : never
    expect(Type<Tuple<[{ a: string }], 2>>()).toMatchType<PrefixedText>(
      v => `
      var var_a: ${v.text} = null as any as ${v.text}
      var var_b = var_a[33] 
      `, { asString: true},
    )
    expect(Type<Tuple<[{ a: string }], 2>>()).toMatchType<PrefixedText>(
      v => `
      var var_a: ${v.text} = null as any as ${v.text}
      var var_b = var_a[1]  
      `, { asString: true},
    )
    expect(Type<ArrayLiteral<[{ a: string }], 2>>()).not.toMatchType<PrefixedText>(
      v => `
      var var_a: ${v.text} = null as any as ${v.text}
      var var_b = var_a[33] 
      `, { asString: true },
    )
    expect(Type<ArrayLiteral<[{ a: string }], 2>>()).toMatchType<PrefixedText>(
      v => `
      var var_a: ${v.text} = null as any as ${v.text}
      var var_b = var_a[1] 
      `, { asString: true },
    )
  })

  
  it('should be able to pass undefined as value', () => {
    expect(undefined).not.toMatchType(Type<string>())
  })
  


}) 
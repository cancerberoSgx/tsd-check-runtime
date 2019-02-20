import { Type } from 'tsd-check-runtime';

describe('Type', () => {

  type UnionOf<T extends any[]> = T[number];

  it('should be able to reference types declared on any scope', () => {
    expect('a').not.toMatchType(Type<UnionOf<[1, false]>>({"text":"UnionOf<[1, false]>","prefix":"type UnionOf<T extends any[]> = T[number];\ninterface A{a: number}\ninterface B extends A {b:string}\nvar b: B = {a: 1, b: 's'}\ntype Identical<t1, t2> = t1 extends t2 ? t2 extends t1 ? true : never : never\ntype Extends<t1, t2> = t1 extends t2 ?  true : never"}))
    expect(2).not.toMatchType(Type<UnionOf<[1, false]>>({"text":"UnionOf<[1, false]>","prefix":"type UnionOf<T extends any[]> = T[number];\ninterface A{a: number}\ninterface B extends A {b:string}\nvar b: B = {a: 1, b: 's'}\ntype Identical<t1, t2> = t1 extends t2 ? t2 extends t1 ? true : never : never\ntype Extends<t1, t2> = t1 extends t2 ?  true : never"}))
    expect(1).toMatchType(Type<UnionOf<[1, false]>>({"text":"UnionOf<[1, false]>","prefix":"type UnionOf<T extends any[]> = T[number];\ninterface A{a: number}\ninterface B extends A {b:string}\nvar b: B = {a: 1, b: 's'}\ntype Identical<t1, t2> = t1 extends t2 ? t2 extends t1 ? true : never : never\ntype Extends<t1, t2> = t1 extends t2 ?  true : never"}) )
    
    interface A{a: number}
    interface B extends A {b:string}
    var b: B = {a: 1, b: 's'}
    type Identical<t1, t2> = t1 extends t2 ? t2 extends t1 ? true : never : never
    type Extends<t1, t2> = t1 extends t2 ?  true : never  

    expect(true).not.toMatchType(Type<Identical<typeof b, A>>({"text":"Identical<typeof b, A>","prefix":"type UnionOf<T extends any[]> = T[number];\ninterface A{a: number}\ninterface B extends A {b:string}\nvar b: B = {a: 1, b: 's'}\ntype Identical<t1, t2> = t1 extends t2 ? t2 extends t1 ? true : never : never\ntype Extends<t1, t2> = t1 extends t2 ?  true : never"}))
    expect(true).toMatchType(Type<Extends<typeof b, A>>({"text":"Extends<typeof b, A>","prefix":"type UnionOf<T extends any[]> = T[number];\ninterface A{a: number}\ninterface B extends A {b:string}\nvar b: B = {a: 1, b: 's'}\ntype Identical<t1, t2> = t1 extends t2 ? t2 extends t1 ? true : never : never\ntype Extends<t1, t2> = t1 extends t2 ?  true : never"}))
  }) 
  
}) 
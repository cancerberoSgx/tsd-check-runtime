import { Type } from 'tsd-check-runtime';

describe('Type', () => {

  type UnionOf<T extends any[]> = T[number];
  var b=1

  it('should be able to reference types declared on any scope', () => {
    expect('a').not.toMatchType(Type<UnionOf<[1, false]>>())
    expect(2).not.toMatchType(Type<UnionOf<[1, false]>>())
    expect(1).toMatchType(Type<UnionOf<[1, false]>>() )
    
    interface A{a: number}
    interface B extends A {b:string}
    var b: B = {a: 1, b: 's'}
    type Identical<t1, t2> = t1 extends t2 ? t2 extends t1 ? true : never : never
    type Extends<t1, t2> = t1 extends t2 ?  true : never  

    expect(true).not.toMatchType(Type<Identical<typeof b, A>>())
    expect(true).toMatchType(Type<Extends<typeof b, A>>())
  }) 
  
}) 
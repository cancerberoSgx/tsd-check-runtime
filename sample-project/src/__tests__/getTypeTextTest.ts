import { Type } from 'tsd-check-runtime';
import 'tsd-check-runtime';
describe('getTypeTest', () => {
  type UnionOf<T extends any[]> = T[number];
  it('should work jest matcher toMatchType', () => {
    expect('a').not.toMatchType(Type<UnionOf<[1, false]>>({"text":"UnionOf<[1, false]>","prefix":"type UnionOf<T extends any[]> = T[number];"}))
    expect('a').not.toMatchType(Type<UnionOf<[1, false]>>({"text":"UnionOf<[1, false]>","prefix":"type UnionOf<T extends any[]> = T[number];"}))

    expect(2).not.toMatchType(`UnionOf<[1, false]>`)
    expect(1).toMatchType(Type<UnionOf<[1, false]>>({"text":"UnionOf<[1, false]>","prefix":"type UnionOf<T extends any[]> = T[number];"}) )
    expect(1).toBe(1)
  }) 
}) 

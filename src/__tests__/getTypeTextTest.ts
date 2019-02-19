import '..'
import TypeText from 'get-type-text'
type UnionOf<T extends any[]> = T[number]
test('should work with get-type-text', () => {
  expect('a').not.toMatchType(TypeText<UnionOf<[1, false]>>())
  expect(2).not.toMatchType(TypeText<UnionOf<[1, false]>>())
  expect(1).toMatchType(TypeText<UnionOf<[1, false]>>())
})

import '..'

type UnionOf<T extends any[]> = T[number]
let c: UnionOf<[1, false]>

test('jest matcher should work', () => {
  expect(1).toMatchType('number')
  expect(1).not.toMatchType('string')
})
describe('ValueOfStringKeyInArray', () => {
  it('should work jest matcher toMatchType', () => {
    expect('a').not.toMatchType(`UnionOf<[1, false]>`)
    expect(2).not.toMatchType(`UnionOf<[1, false]>`)
    expect(1).toMatchType(`UnionOf<[1, false]>`)
  })
})

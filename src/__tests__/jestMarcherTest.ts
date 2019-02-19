import '..'

type UnionOf<T extends any[]> = T[number]

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

  describe('toCompile', () => {
    it('toCompile', () => {
      expect(`var a = 1`).toCompile()
      expect(`v a r a = 1`).not.toCompile()
    })
  })
})

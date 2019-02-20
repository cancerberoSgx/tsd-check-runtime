import { Type } from '..'

describe('compile', () => {
  const aa = 9
  it('basic Type test first', () => {
    const t = Type<number|string>()
    interface I{m():number}
    class C{m(){return false}}
    expect({m(){return 12}}).toMatchType(Type<I>())
    expect({m(){return '12'}}).not.toMatchType(Type<I>())
    expect({m(){return false}}).toMatchType(Type<C>())
    expect({m(){return new Date()}}).not.toMatchType(Type<C>())
  })

  // it('should reference given list of types', () => {
  // })

})

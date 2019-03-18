import { UnionOf } from '../union';
import 'tsd-check-runtime'
import TypeText from 'get-type-text'
import { expectType } from 'tsd-check-runtime';
// TODO: is working for external project but not here. see util/getCallerFile)()
describe('getTypeTextTest', ()=>{ 
  it('should work jest matcher toMatchType', ()=>{
    expect('a').not.toMatchType(TypeText<UnionOf<[1, false]>>('UnionOf<[1, false]>')+'')
    expect(2).not.toMatchType(`UnionOf<[1, false]>`)
    expect(1).toMatchType(TypeText<UnionOf<[1, false]>>('UnionOf<[1, false]>')+'')
  })
  // it('should work without using jest matcher', ()=>{
  //   expect(expectType(`UnionOf<[1, false]>`, 1)).toBe(true)
  //   expect(expectType(`UnionOf<[1, false]>`, 2)).not.toBe(true)
  //   expect(expectType(`UnionOf<[1, false]>`, 3)).not.toBe(true)
  // })
})
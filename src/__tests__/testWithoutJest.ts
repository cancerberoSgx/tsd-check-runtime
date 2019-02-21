import { checkType, Type, expectType, expectCompile } from '..'
import { ok } from 'assert'
type UnionOf<T extends any[]> = T[number]

try {

  // hard-code types as strings
  ok(!checkType(`UnionOf<[1, false]>`, 'a').pass)
  ok(!checkType(`UnionOf<[1, false]>`, 2).pass)
  ok(checkType(`UnionOf<[1, false]>`, 1).pass)

  // Using Type and tsd-test-runtime CLI tool:
  ok(expectType(Type<UnionOf<[string, string[], Date]>>(), 'a'))
  ok(!expectType(Type<UnionOf<[string, string[], Date]>>(), 1))
  ok(expectCompile({}, T => `var a: ${T} = [1]`, Type<UnionOf<[string, number[], Date]>>()))
  ok(!expectCompile({}, T => `var a: ${T} = [1]`, Type<UnionOf<[string, string[], Date]>>()))
} catch (error) {
  console.error(error, error.stack)
  console.log((error.stack as string).split('\n').map(l => ` * ${l}`))

  throw error
}

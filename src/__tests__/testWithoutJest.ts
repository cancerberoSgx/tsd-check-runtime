import { checkType } from '..'
import { ok } from 'assert'

export type UnionOf<T extends any[]> = T[number]

ok(!checkType(`UnionOf<[1, false]>`, 'a').pass)
ok(!checkType(`UnionOf<[1, false]>`, 2).pass)
ok(checkType(`UnionOf<[1, false]>`, 1).pass)

import { UnionOf } from '../union';
import { checkType } from 'tsd-check-runtime';
import { ok } from 'assert';
ok(!checkType(`UnionOf<[1, false]>`, 'a').pass)
ok(!checkType(`UnionOf<[1, false]>`, 2).pass)
ok(checkType(`UnionOf<[1, false]>`, 1).pass)

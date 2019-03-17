import { UnionOf } from '../union';
import { checkType } from 'tsd-check-runtime';
// let c: UnionOf<[1, false]>;
const r = checkType(`UnionOf<[1, false]>`, 'a')
console.log(r);

    // const a = [{a: 1, b: 's'}]
    // type t = ValueOfStringKeyInArray<typeof a, 'a'>
    // expect(1).toBe(1)
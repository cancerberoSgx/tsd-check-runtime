
Check TypeScript Type errors at runtime. Write type tests and _run_ them instead of just _compile_ them.

Motivation
----------

To test TypeScript Type libraries (like DefinitelyTyped, [SimplyTyped](https://github.com/andnp/SimplyTyped)), tools like tsd-check are used which perform verifications at compile time. Since the project cannot have compile errors, is not possible to check for failures.

In other words you cannot assert using the negative, like in `expect(foo).not.toHaveType(Bar)`

This tool allows to compile TypeScript code at runtime, using the context of the current project and the caller file, and support a easy to use API for type assertion.

Usage
-----

**IMPORTANT** Unless you use `Type` and `tsd-check-runtime` CLI tool (see below), you probably will need to run the tests using `ts-node`, `ts-jest` or similar tool.

```sh
npm install -D tsd-check-runtime
```

### API

*   Expectation JS APIs:
    *   [JS API Options](api/interfaces/_types_.options.md)
    *   [`checkType()`](api/modules/_checktype_.md)
    *   [`expectType()`](api/modules/_expecttype_.md),
    *   [`checkCompile()` and `expectCompile()`](api/modules/_compile_.md)
    *   [`Result` object returned by `checkType()`and `checkCompile()`](api/interfaces/_types_.result.md)
*   [jest matchers `toMatchType()` and `toCompile()`](api/interfaces/_jestmatcher_.__global.jest.matchers.md)
*   [`Type()` function for extracting Types text](api/modules/_customextractor_.md#type)
*   [CLI options of `tsd-check-runtime` CLI tool](api/interfaces/_customextractormain_.tsdcheckruntimeclioptions.md)

### expectType()

A simplified API.

```ts
import {expectType} from 'tsd-check-runtime'
import {KeysToTuple} from './assets/type2'
type UnionOf<T extends any[]> = T[number]

test('expectType - the high level API', () => {
  // you can safely reference an imported type:
  expect(expectType('KeysToTuple<typeof Object.prototype>', 'will fail')).toBe(false)
  expect(
    expectType('KeysToTuple<typeof Object.prototype>', 
      ['hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable']),
  ).toBe(true)

  // you can reference a local type as long as it's declared in the global scope of the file, like UnionOf:
  expect(expectType('UnionOf<[1,2]>', 'will fail')).toBe(false)
  expect(expectType('UnionOf<[1,2]>', 1)).toBe(true)
  expect(expectType('UnionOf<[1,2]>[]', [2, 1])).toBe(true)
  expect(expectType('UnionOf<[1,2]>[]', [1, 2, 3])).toBe(false)

  // for more complex stuff, define the type with a string template. in this case you will need to supply the test code
  // yourself. Note: the value is already escaped for you
  expect(expectType(value => `const v: ReturnType<typeof Math.min> = ${value}`, 'invalid')).toBe(false)
  expect(expectType(value => `const v: ReturnType<typeof Math.min> = ${value}`, Math.PI)).toBe(true)
}

```

### checkType()

The low level API. Does the same thing as the simplified one, but returns result object with more information.

```ts
import {checkType} from 'tsd-check-runtime'
const result = checkType(value => `
    var a: KeysToTuple<Date> = ${value}`,
  ['toUTCString', 'toISOString', 'toJSON'],
)
if(!result.pass){
  console.error(result.error, result.code, result.failErrors, result.testCode);
}
```

### Jest custom matcher

Adds `toMatchType` and `toCompile` jest matcher that can be used like this:

```ts
import 'tsd-check-runtime'
test('jest matcher should work', () => {
  expect(1).toMatchType('number')
  expect(1).not.toMatchType('string')
})
```

`toCompile` matcher is more general, and allows to check if an expression just compiles or not:

```ts
expect(`var a = 1`).toCompile()
expect(`v a r a = 1`).not.toCompile()
```

`exactly` option for strict identical types:

```ts
interface A {}
interface B extends A {b: number}
var testVariable1 : B = {b: 8}
...
expect(testVariable1).toMatchType('A')
expect(testVariable1).not.toMatchType('A', {exactly: true})
```

### Use `Type` to extract type text at compile time

[get-type-text](get-type-text) allows to get a type text at runtime by preprocessing the sources in the development workflow. Based on [typescript-poor-man-reflection](https://github.com/cancerberoSgx/typescript-poor-man-reflection).

```ts
import { Type } from 'tsd-check-runtime';

describe('Type', () => {

  type UnionOf<T extends any[]> = T[number];

  it('should be able to reference types declared on any scope', () => {
    expect('a').not.toMatchType(Type<UnionOf<[1, false]>>())
    expect(2).not.toMatchType(Type<UnionOf<[1, false]>>())
    expect(1).toMatchType(Type<UnionOf<[1, false]>>() )

    interface A{a: number}
    interface B extends A {b:string}
    var b: B = {a: 1, b: 's'}
    type Identical<t1, t2> = t1 extends t2 ? t2 extends t1 ? true : never : never
    type Extends<t1, t2> = t1 extends t2 ?  true : never  

    expect(true).not.toMatchType(Type<Identical<typeof b, A>>())
    expect(true).toMatchType(Type<Extends<typeof b, A>>())
  }) 

}) 

```

For it to work you need to execute `npx tsd-check-runtime` before `tsc` or `npm test`. This will modify your sources!. For undo the modifications execute `npx tsd-check-runtime --clean`. Advantages:

*   types are not hard-coded as strings so tests won't get outdated on refactors
*   you can reference types or variables on any scope of the file, not only globals

How it works
------------

*   Loads the current TypeScript project (defaults to `./tsconfig.json`) with all its files, libraries and configuration. It uses ([https://github.com/dsherret/ts-simple-ast)\[ts-simple-ast\]](https://github.com/dsherret/ts-simple-ast)%5Bts-simple-ast%5D) for this.
*   Resolves the file that called the `expectType` or `checkType` function
*   create a new file just next to it and preppends a test code that will fail if the types doesn't match (see `result.code`)
*   try to compile the source file and if it fails we known there's an error. (previously it verifies that the original file compiles OK)
*   the value is escaped in the test code. Any object should be supported since it uses ([https://github.com/blakeembrey/javascript-stringify)\[javascript-stringify\]](https://github.com/blakeembrey/javascript-stringify)%5Bjavascript-stringify%5D).

Limitations
-----------

### Type information lost in value

**Always remember that values are serialized so all type information is lost, only their values are maintained**

Don't pass types to the function type representation since they will be lost, for example, the following will fail:

```ts
expectType(value => `const v: typeof describe = ${value}`, describe)
```

Because it generates test code like this:

```ts
const v: typeof describe = function describe(description, specDefinitions) 
  {return env.describe(description, specDefinitions);} 
```

another example, this is a false positive caused by the lost ot type information. Because the types are inferred if not declared, it will match but it shouldn't:

```ts
expect(expectType(value => `const v: typeof Math.pow = ${value}`, 
  (a: Date, b: string) => 2)).toBe(true)
```

If you really need to do so, use the option dontEscape and pass the string literal yourself:

```ts
expect(expectType(value => `const v: typeof Math.pow = ${value}`, `(a:Date, b:string)=>1`, 
  {dontEscape: true})).toBe(false)
expect(expectType(value => `const v: typeof Math.pow = ${value}`, `(a:number, b:number)=>1`, 
  {dontEscape: true})).toBe(true)
```

If you want to play safer use the option `enforceJsonValues` so functions are not allowed. Functions are dangerous because parameters and return values are not declared - only their type is. The following fails because JSON values are enforced:

```ts
expect(expectType(value => `const v: typeof describe = ${value}`, describe, 
  {enforceJsonValues: true})).toBe(false)
```

### Type Reference limitations

**reference types in the global scope only**. If you reference a type that is declared in the local closure (i.e inside the `it()` it will fail)

TODO/Ideas
----------

*   we only have checkType (toMatchType) - would be nice to also have others like expect(a).toTypeIdentical(B) and toTypeExtendedBy toTypeExtend, toTypeNever, etc

Problems
--------

*   (solved by get-type-text) : Writing types as string has a big problem and that is refactors since they won't be updated. can we don something about it?

## Index

### External modules

* ["checkType"](modules/_checktype_.md)
* ["compile"](modules/_compile_.md)
* ["customExtractor"](modules/_customextractor_.md)
* ["expectType"](modules/_expecttype_.md)
* ["index"](modules/_index_.md)
* ["jestMatcher"](modules/_jestmatcher_.md)
* ["typeTestUtil"](modules/_typetestutil_.md)
* ["types"](modules/_types_.md)
* ["util"](modules/_util_.md)

---


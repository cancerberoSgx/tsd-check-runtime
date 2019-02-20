[tsd-check-runtime](../README.md) > ["jestMatcher"](../modules/_jestmatcher_.md) > [__global](../modules/_jestmatcher_.__global.md) > [jest](../modules/_jestmatcher_.__global.jest.md) > [Matchers](../interfaces/_jestmatcher_.__global.jest.matchers.md)

# Interface: Matchers

## Type parameters
#### R 
## Hierarchy

**Matchers**

## Index

### Methods

* [toCompile](_jestmatcher_.__global.jest.matchers.md#tocompile)
* [toMatchType](_jestmatcher_.__global.jest.matchers.md#tomatchtype)

---

## Methods

<a id="tocompile"></a>

###  toCompile

▸ **toCompile**<`R`>(options: *[Options](_types_.options.md)*, ...types: *[PrefixedText](_types_.prefixedtext.md)[]*): `R`

▸ **toCompile**<`R`>(...types: *[PrefixedText](_types_.prefixedtext.md)[]*): `R`

*Defined in [jestMatcher.ts:20](https://github.com/cancerberoSgx/tsd-check-runtime/blob/a00c97c/src/jestMatcher.ts#L20)*

Calls [checkCompile](../modules/_compile_.md#checkcompile) with given value and type and optional options.

**Type parameters:**

#### R 
**Parameters:**

| Name | Type |
| ------ | ------ |
| options | [Options](_types_.options.md) |
| `Rest` types | [PrefixedText](_types_.prefixedtext.md)[] |

**Returns:** `R`

*Defined in [jestMatcher.ts:25](https://github.com/cancerberoSgx/tsd-check-runtime/blob/a00c97c/src/jestMatcher.ts#L25)*

Calls [checkCompile](../modules/_compile_.md#checkcompile) with given value and type and optional options.

**Type parameters:**

#### R 
**Parameters:**

| Name | Type |
| ------ | ------ |
| `Rest` types | [PrefixedText](_types_.prefixedtext.md)[] |

**Returns:** `R`

___
<a id="tomatchtype"></a>

###  toMatchType

▸ **toMatchType**<`R`>(type: *[TypeRepresentation](../modules/_types_.md#typerepresentation)<`R`>*, options?: *[Options](_types_.options.md) & `object`*): `R`

*Defined in [jestMatcher.ts:15](https://github.com/cancerberoSgx/tsd-check-runtime/blob/a00c97c/src/jestMatcher.ts#L15)*

calls [checkType](../modules/_checktype_.md#checktype) with given value and type and optional options. Options might also include `exactly` property which will verify that the value type not only match given type but also that they are identical

**Type parameters:**

#### R 
**Parameters:**

| Name | Type |
| ------ | ------ |
| type | [TypeRepresentation](../modules/_types_.md#typerepresentation)<`R`> |
| `Optional` options | [Options](_types_.options.md) & `object` |

**Returns:** `R`

___


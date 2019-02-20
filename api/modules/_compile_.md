[tsd-check-runtime](../README.md) > ["compile"](../modules/_compile_.md)

# External module: "compile"

## Index

### Functions

* [buildCode](_compile_.md#buildcode)
* [checkCompile](_compile_.md#checkcompile)
* [expectCompile](_compile_.md#expectcompile)

---

## Functions

<a id="buildcode"></a>

###  buildCode

▸ **buildCode**(types: *[PrefixedText](../interfaces/_types_.prefixedtext.md)[]*, value: *`function`*): `string`

*Defined in [compile.ts:31](https://github.com/cancerberoSgx/tsd-check-runtime/blob/a00c97c/src/compile.ts#L31)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| types | [PrefixedText](../interfaces/_types_.prefixedtext.md)[] |
| value | `function` |

**Returns:** `string`

___
<a id="checkcompile"></a>

###  checkCompile

▸ **checkCompile**(options?: *[Options](../interfaces/_types_.options.md)*, value: *`function`*, ...types: *[PrefixedText](../interfaces/_types_.prefixedtext.md)[]*): [Result](../interfaces/_types_.result.md)

*Defined in [compile.ts:8](https://github.com/cancerberoSgx/tsd-check-runtime/blob/a00c97c/src/compile.ts#L8)*

Build test code fragment using given types (and its prefix) and value function and then calls [checkType](_checktype_.md#checktype) passing it. It forces options `{asString: true, dontCreateTestCodeVariable: true}`

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| `Default value` options | [Options](../interfaces/_types_.options.md) |  {} |
| value | `function` | - |
| `Rest` types | [PrefixedText](../interfaces/_types_.prefixedtext.md)[] | - |

**Returns:** [Result](../interfaces/_types_.result.md)

___
<a id="expectcompile"></a>

###  expectCompile

▸ **expectCompile**(options?: *[Options](../interfaces/_types_.options.md)*, value: *`function`*, ...types: *[PrefixedText](../interfaces/_types_.prefixedtext.md)[]*): `boolean`

*Defined in [compile.ts:21](https://github.com/cancerberoSgx/tsd-check-runtime/blob/a00c97c/src/compile.ts#L21)*

Shortcut return value for [checkCompile](_compile_.md#checkcompile)

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| `Default value` options | [Options](../interfaces/_types_.options.md) |  {} |
| value | `function` | - |
| `Rest` types | [PrefixedText](../interfaces/_types_.prefixedtext.md)[] | - |

**Returns:** `boolean`

___


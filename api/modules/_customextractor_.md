[tsd-check-runtime](../README.md) > ["customExtractor"](../modules/_customextractor_.md)

# External module: "customExtractor"

## Index

### Variables

* [sourceFilesPrepend](_customextractor_.md#sourcefilesprepend)

### Functions

* [Type](_customextractor_.md#type)
* [customExtractor](_customextractor_.md#customextractor)
* [getNames](_customextractor_.md#getnames)

---

## Variables

<a id="sourcefilesprepend"></a>

### `<Const>` sourceFilesPrepend

**● sourceFilesPrepend**: *`object`*

*Defined in [customExtractor.ts:26](https://github.com/cancerberoSgx/tsd-check-runtime/blob/a00c97c/src/customExtractor.ts#L26)*

#### Type declaration

[name: `string`]: `number`

___

## Functions

<a id="type"></a>

###  Type

▸ **Type**<`T`>(t?: *[PrefixedText](../interfaces/_types_.prefixedtext.md)*): [PrefixedText](../interfaces/_types_.prefixedtext.md)

*Defined in [customExtractor.ts:22](https://github.com/cancerberoSgx/tsd-check-runtime/blob/a00c97c/src/customExtractor.ts#L22)*

Use this function to extract a type text from TypeScript code as a string variable.

For this to work you need to preprocess your source code using the following command before compiling with tsc:

```
npx tsd-check-runtime
```

**Warning**, your source files calling this function will be modified

To undo the changes call the following command, for example, after the tests finish executing:

```
npx tsd-check-runtime --clean
```

**Type parameters:**

#### T 
**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` t | [PrefixedText](../interfaces/_types_.prefixedtext.md) |

**Returns:** [PrefixedText](../interfaces/_types_.prefixedtext.md)

___
<a id="customextractor"></a>

### `<Const>` customExtractor

▸ **customExtractor**(n: *`CallExpression`*, index: *`number`*, extractorPrependVariableName: *`string`*): `object` \| `object`

*Defined in [customExtractor.ts:28](https://github.com/cancerberoSgx/tsd-check-runtime/blob/a00c97c/src/customExtractor.ts#L28)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| n | `CallExpression` |
| index | `number` |
| extractorPrependVariableName | `string` |

**Returns:** `object` \| `object`

___
<a id="getnames"></a>

###  getNames

▸ **getNames**(n: *`Node`*): `string`[]

*Defined in [customExtractor.ts:110](https://github.com/cancerberoSgx/tsd-check-runtime/blob/a00c97c/src/customExtractor.ts#L110)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| n | `Node` |

**Returns:** `string`[]

___


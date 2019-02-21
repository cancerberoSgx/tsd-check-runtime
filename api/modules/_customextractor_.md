[tsd-check-runtime](../README.md) > ["customExtractor"](../modules/_customextractor_.md)

# External module: "customExtractor"

## Index

### Variables

* [sourceFilesPrepend](_customextractor_.md#sourcefilesprepend)
* [sourceFilesPrependToFile](_customextractor_.md#sourcefilesprependtofile)

### Functions

* [Type](_customextractor_.md#type)
* [customExtractor](_customextractor_.md#customextractor)
* [getNames](_customextractor_.md#getnames)

---

## Variables

<a id="sourcefilesprepend"></a>

### `<Const>` sourceFilesPrepend

**● sourceFilesPrepend**: *`object`*

*Defined in [customExtractor.ts:27](https://github.com/cancerberoSgx/tsd-check-runtime/blob/1e47935/src/customExtractor.ts#L27)*

#### Type declaration

[name: `string`]: `number`

___
<a id="sourcefilesprependtofile"></a>

### `<Const>` sourceFilesPrependToFile

**● sourceFilesPrependToFile**: *`object`*

*Defined in [customExtractor.ts:29](https://github.com/cancerberoSgx/tsd-check-runtime/blob/1e47935/src/customExtractor.ts#L29)*

#### Type declaration

[index: `number`]: `string`

___

## Functions

<a id="type"></a>

###  Type

▸ **Type**<`T`>(t?: *[PrefixedText](../interfaces/_types_.prefixedtext.md)*): [PrefixedText](../interfaces/_types_.prefixedtext.md)

*Defined in [customExtractor.ts:23](https://github.com/cancerberoSgx/tsd-check-runtime/blob/1e47935/src/customExtractor.ts#L23)*

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

###  customExtractor

▸ **customExtractor**(n: *`CallExpression`*, index: *`number`*, getter: *`ExtractorGetter`*, options: *`ReplaceProjectFunctionCallOptions` & `object`*): `object` \| `object`

*Defined in [customExtractor.ts:30](https://github.com/cancerberoSgx/tsd-check-runtime/blob/1e47935/src/customExtractor.ts#L30)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| n | `CallExpression` |
| index | `number` |
| getter | `ExtractorGetter` |
| options | `ReplaceProjectFunctionCallOptions` & `object` |

**Returns:** `object` \| `object`

___
<a id="getnames"></a>

###  getNames

▸ **getNames**(n: *`Node`*): `string`[]

*Defined in [customExtractor.ts:155](https://github.com/cancerberoSgx/tsd-check-runtime/blob/1e47935/src/customExtractor.ts#L155)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| n | `Node` |

**Returns:** `string`[]

___


[tsd-check-runtime](../README.md) > ["util"](../modules/_util_.md)

# External module: "util"

## Index

### Type aliases

* [ArrayLiteral](_util_.md#arrayliteral)
* [Tuple](_util_.md#tuple)

### Variables

* [_unique](_util_.md#_unique)
* [callsites](_util_.md#callsites)

### Functions

* [escapeValue](_util_.md#escapevalue)
* [formatDiagnostics](_util_.md#formatdiagnostics)
* [getCallerFile](_util_.md#getcallerfile)
* [quote](_util_.md#quote)
* [unique](_util_.md#unique)

---

## Type aliases

<a id="arrayliteral"></a>

###  ArrayLiteral

**Ƭ ArrayLiteral**: *`ArrayLiteral<T, L>`*

*Defined in [util.ts:80](https://github.com/cancerberoSgx/tsd-check-runtime/blob/1e47935/src/util.ts#L80)*

___
<a id="tuple"></a>

###  Tuple

**Ƭ Tuple**: *[`TItem`, `Array`] & `object`*

*Defined in [util.ts:106](https://github.com/cancerberoSgx/tsd-check-runtime/blob/1e47935/src/util.ts#L106)*

___

## Variables

<a id="_unique"></a>

### `<Let>` _unique

**● _unique**: *`number`* = 0

*Defined in [util.ts:24](https://github.com/cancerberoSgx/tsd-check-runtime/blob/1e47935/src/util.ts#L24)*

___
<a id="callsites"></a>

### `<Const>` callsites

**● callsites**: *`any`* =  require('callsites')

*Defined in [util.ts:59](https://github.com/cancerberoSgx/tsd-check-runtime/blob/1e47935/src/util.ts#L59)*

___

## Functions

<a id="escapevalue"></a>

###  escapeValue

▸ **escapeValue**<`T`>(v: *`T`*, options: *[Options](../interfaces/_types_.options.md)*): `string` \| `undefined`

*Defined in [util.ts:36](https://github.com/cancerberoSgx/tsd-check-runtime/blob/1e47935/src/util.ts#L36)*

*__internal__*: 

**Type parameters:**

#### T 
**Parameters:**

| Name | Type |
| ------ | ------ |
| v | `T` |
| options | [Options](../interfaces/_types_.options.md) |

**Returns:** `string` \| `undefined`

___
<a id="formatdiagnostics"></a>

###  formatDiagnostics

▸ **formatDiagnostics**(d: *`Diagnostic`[]*): [CompilationError](../interfaces/_types_.compilationerror.md)[]

*Defined in [util.ts:7](https://github.com/cancerberoSgx/tsd-check-runtime/blob/1e47935/src/util.ts#L7)*

*__internal__*: 

**Parameters:**

| Name | Type |
| ------ | ------ |
| d | `Diagnostic`[] |

**Returns:** [CompilationError](../interfaces/_types_.compilationerror.md)[]

___
<a id="getcallerfile"></a>

###  getCallerFile

▸ **getCallerFile**(): `object`

*Defined in [util.ts:61](https://github.com/cancerberoSgx/tsd-check-runtime/blob/1e47935/src/util.ts#L61)*

*__internal__*: 

**Returns:** `object`

___
<a id="quote"></a>

###  quote

▸ **quote**(s: *`string`*, q?: *`string`*): `string`

*Defined in [util.ts:31](https://github.com/cancerberoSgx/tsd-check-runtime/blob/1e47935/src/util.ts#L31)*

*__internal__*: 

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| s | `string` | - |
| `Default value` q | `string` | &quot;&quot;&quot; |

**Returns:** `string`

___
<a id="unique"></a>

###  unique

▸ **unique**(prefix?: *`string`*): `string`

*Defined in [util.ts:26](https://github.com/cancerberoSgx/tsd-check-runtime/blob/1e47935/src/util.ts#L26)*

*__internal__*: 

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| `Default value` prefix | `string` | &quot;_&quot; |

**Returns:** `string`

___


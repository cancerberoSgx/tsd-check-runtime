[tsd-check-runtime](../README.md) > ["util"](../modules/_util_.md)

# External module: "util"

## Index

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

## Variables

<a id="_unique"></a>

### `<Let>` _unique

**● _unique**: *`number`* = 0

*Defined in [util.ts:23](https://github.com/cancerberoSgx/tsd-check-runtime/blob/463b5ee/src/util.ts#L23)*

___
<a id="callsites"></a>

### `<Const>` callsites

**● callsites**: *`any`* =  require('callsites')

*Defined in [util.ts:58](https://github.com/cancerberoSgx/tsd-check-runtime/blob/463b5ee/src/util.ts#L58)*

___

## Functions

<a id="escapevalue"></a>

###  escapeValue

▸ **escapeValue**<`T`>(v: *`T`*, options: *[Options](../interfaces/_types_.options.md)*): `string` \| `undefined`

*Defined in [util.ts:35](https://github.com/cancerberoSgx/tsd-check-runtime/blob/463b5ee/src/util.ts#L35)*

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

*Defined in [util.ts:6](https://github.com/cancerberoSgx/tsd-check-runtime/blob/463b5ee/src/util.ts#L6)*

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

*Defined in [util.ts:60](https://github.com/cancerberoSgx/tsd-check-runtime/blob/463b5ee/src/util.ts#L60)*

*__internal__*: 

**Returns:** `object`

___
<a id="quote"></a>

###  quote

▸ **quote**(s: *`string`*, q?: *`string`*): `string`

*Defined in [util.ts:30](https://github.com/cancerberoSgx/tsd-check-runtime/blob/463b5ee/src/util.ts#L30)*

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

*Defined in [util.ts:25](https://github.com/cancerberoSgx/tsd-check-runtime/blob/463b5ee/src/util.ts#L25)*

*__internal__*: 

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| `Default value` prefix | `string` | &quot;_&quot; |

**Returns:** `string`

___


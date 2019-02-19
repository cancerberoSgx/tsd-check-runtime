[tsd-check-runtime](../README.md) > ["types"](../modules/_types_.md) > [Options](../interfaces/_types_.options.md)

# Interface: Options

## Hierarchy

**Options**

## Index

### Properties

* [asString](_types_.options.md#asstring)
* [dontEscape](_types_.options.md#dontescape)
* [dontVerifyFile](_types_.options.md#dontverifyfile)
* [enforceJsonValues](_types_.options.md#enforcejsonvalues)
* [folder](_types_.options.md#folder)
* [printResult](_types_.options.md#printresult)
* [printResultIfFail](_types_.options.md#printresultiffail)
* [tsConfigFilePath](_types_.options.md#tsconfigfilepath)
* [verifyProject](_types_.options.md#verifyproject)

---

## Properties

<a id="asstring"></a>

### `<Optional>` asString

**● asString**: *`undefined` \| `false` \| `true`*

*Defined in [types.ts:11](https://github.com/cancerberoSgx/tsd-check-runtime/blob/463b5ee/src/types.ts#L11)*

in cases where the value is an object that knows how to print itself and you don't want to be processed by Stringify - force it to be rendered as string . Implies `dontScape`

___
<a id="dontescape"></a>

### `<Optional>` dontEscape

**● dontEscape**: *`undefined` \| `false` \| `true`*

*Defined in [types.ts:9](https://github.com/cancerberoSgx/tsd-check-runtime/blob/463b5ee/src/types.ts#L9)*

pass true if you are already passing a quoted value. By default value is escaped in the output

___
<a id="dontverifyfile"></a>

### `<Optional>` dontVerifyFile

**● dontVerifyFile**: *`undefined` \| `false` \| `true`*

*Defined in [types.ts:7](https://github.com/cancerberoSgx/tsd-check-runtime/blob/463b5ee/src/types.ts#L7)*

___
<a id="enforcejsonvalues"></a>

### `<Optional>` enforceJsonValues

**● enforceJsonValues**: *`undefined` \| `false` \| `true`*

*Defined in [types.ts:4](https://github.com/cancerberoSgx/tsd-check-runtime/blob/463b5ee/src/types.ts#L4)*

___
<a id="folder"></a>

### `<Optional>` folder

**● folder**: *`undefined` \| `string`*

*Defined in [types.ts:6](https://github.com/cancerberoSgx/tsd-check-runtime/blob/463b5ee/src/types.ts#L6)*

When using `tsConfigFilePath` that's in another folder specify it with this option.

___
<a id="printresult"></a>

### `<Optional>` printResult

**● printResult**: *`undefined` \| `false` \| `true`*

*Defined in [types.ts:14](https://github.com/cancerberoSgx/tsd-check-runtime/blob/463b5ee/src/types.ts#L14)*

___
<a id="printresultiffail"></a>

### `<Optional>` printResultIfFail

**● printResultIfFail**: *`undefined` \| `false` \| `true`*

*Defined in [types.ts:13](https://github.com/cancerberoSgx/tsd-check-runtime/blob/463b5ee/src/types.ts#L13)*

___
<a id="tsconfigfilepath"></a>

### `<Optional>` tsConfigFilePath

**● tsConfigFilePath**: *`undefined` \| `string`*

*Defined in [types.ts:3](https://github.com/cancerberoSgx/tsd-check-runtime/blob/463b5ee/src/types.ts#L3)*

Use another tsconfig.json file than the default './tsconfig.json'. If so make sure you also set the property `folder` if it's in another folder

___
<a id="verifyproject"></a>

### `<Optional>` verifyProject

**● verifyProject**: *`undefined` \| `false` \| `true`*

*Defined in [types.ts:12](https://github.com/cancerberoSgx/tsd-check-runtime/blob/463b5ee/src/types.ts#L12)*

___


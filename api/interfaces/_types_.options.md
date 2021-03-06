[tsd-check-runtime](../README.md) > ["types"](../modules/_types_.md) > [Options](../interfaces/_types_.options.md)

# Interface: Options

## Hierarchy

**Options**

## Index

### Properties

* [asString](_types_.options.md#asstring)
* [dontCreateTestCodeVariable](_types_.options.md#dontcreatetestcodevariable)
* [dontEscape](_types_.options.md#dontescape)
* [dontVerifyFile](_types_.options.md#dontverifyfile)
* [enforceJsonValues](_types_.options.md#enforcejsonvalues)
* [failOnlyWithErrorCodes](_types_.options.md#failonlywitherrorcodes)
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

*Defined in [types.ts:35](https://github.com/cancerberoSgx/tsd-check-runtime/blob/1e47935/src/types.ts#L35)*

In cases where the value is an object that knows how to print itself and you don't want to be processed by Stringify - force it to be rendered as string . Implies `dontScape`

___
<a id="dontcreatetestcodevariable"></a>

### `<Optional>` dontCreateTestCodeVariable

**● dontCreateTestCodeVariable**: *`undefined` \| `false` \| `true`*

*Defined in [types.ts:56](https://github.com/cancerberoSgx/tsd-check-runtime/blob/1e47935/src/types.ts#L56)*

If the type is a string and not a function, then it will not create the dummy variable in the test code

___
<a id="dontescape"></a>

### `<Optional>` dontEscape

**● dontEscape**: *`undefined` \| `false` \| `true`*

*Defined in [types.ts:29](https://github.com/cancerberoSgx/tsd-check-runtime/blob/1e47935/src/types.ts#L29)*

Pass true if you are already passing a quoted value. By default value is escaped in the output

___
<a id="dontverifyfile"></a>

### `<Optional>` dontVerifyFile

**● dontVerifyFile**: *`undefined` \| `false` \| `true`*

*Defined in [types.ts:24](https://github.com/cancerberoSgx/tsd-check-runtime/blob/1e47935/src/types.ts#L24)*

Won't make the initial verification of the file. Could be a bit faster, but if the file already has compilation errors the test will always fail

___
<a id="enforcejsonvalues"></a>

### `<Optional>` enforceJsonValues

**● enforceJsonValues**: *`undefined` \| `false` \| `true`*

*Defined in [types.ts:13](https://github.com/cancerberoSgx/tsd-check-runtime/blob/1e47935/src/types.ts#L13)*

If true, it will fail if a value is not JSON

___
<a id="failonlywitherrorcodes"></a>

### `<Optional>` failOnlyWithErrorCodes

**● failOnlyWithErrorCodes**: *`number`[]*

*Defined in [types.ts:62](https://github.com/cancerberoSgx/tsd-check-runtime/blob/1e47935/src/types.ts#L62)*

If given, it will fail only if error codes included in this are found. If other errors are found, it will still return pass===true

___
<a id="folder"></a>

### `<Optional>` folder

**● folder**: *`undefined` \| `string`*

*Defined in [types.ts:18](https://github.com/cancerberoSgx/tsd-check-runtime/blob/1e47935/src/types.ts#L18)*

When using `tsConfigFilePath` that's in another folder specify it with this option.

___
<a id="printresult"></a>

### `<Optional>` printResult

**● printResult**: *`undefined` \| `false` \| `true`*

*Defined in [types.ts:51](https://github.com/cancerberoSgx/tsd-check-runtime/blob/1e47935/src/types.ts#L51)*

Prints the test results to stdout

___
<a id="printresultiffail"></a>

### `<Optional>` printResultIfFail

**● printResultIfFail**: *`undefined` \| `false` \| `true`*

*Defined in [types.ts:46](https://github.com/cancerberoSgx/tsd-check-runtime/blob/1e47935/src/types.ts#L46)*

Prints the test results to stdout if it fails

___
<a id="tsconfigfilepath"></a>

### `<Optional>` tsConfigFilePath

**● tsConfigFilePath**: *`undefined` \| `string`*

*Defined in [types.ts:8](https://github.com/cancerberoSgx/tsd-check-runtime/blob/1e47935/src/types.ts#L8)*

Use another tsconfig.json file than the default './tsconfig.json'. If so make sure you also set the property `folder` if it's in another folder

___
<a id="verifyproject"></a>

### `<Optional>` verifyProject

**● verifyProject**: *`undefined` \| `false` \| `true`*

*Defined in [types.ts:41](https://github.com/cancerberoSgx/tsd-check-runtime/blob/1e47935/src/types.ts#L41)*

Besides making an initial file verification, it will also verify that the whole project compiles without errors. If not, the test will fail

___


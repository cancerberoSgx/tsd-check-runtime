[tsd-check-runtime](../README.md) > ["types"](../modules/_types_.md) > [Result](../interfaces/_types_.result.md)

# Interface: Result

## Hierarchy

**Result**

## Index

### Properties

* [allCallerFiles](_types_.result.md#allcallerfiles)
* [callerFile](_types_.result.md#callerfile)
* [code](_types_.result.md#code)
* [error](_types_.result.md#error)
* [failErrors](_types_.result.md#failerrors)
* [filePath](_types_.result.md#filepath)
* [pass](_types_.result.md#pass)
* [testCode](_types_.result.md#testcode)

---

## Properties

<a id="allcallerfiles"></a>

###  allCallerFiles

**● allCallerFiles**: *`string`[]*

*Defined in [types.ts:106](https://github.com/cancerberoSgx/tsd-check-runtime/blob/14a8bce/src/types.ts#L106)*

A list of ordered caller files absolute paths to debug

___
<a id="callerfile"></a>

### `<Optional>` callerFile

**● callerFile**: *`undefined` \| `string`*

*Defined in [types.ts:97](https://github.com/cancerberoSgx/tsd-check-runtime/blob/14a8bce/src/types.ts#L97)*

Absolute path to the caller file, this is, the file from where the checkType() or expectType() or expect().toMatchType() functions were called. This file contents is used to build a new file with some extra "text code" prepended to it and that file is then compiled and check for errors to perform the "type checking"

___
<a id="code"></a>

### `<Optional>` code

**● code**: *`undefined` \| `string`*

*Defined in [types.ts:84](https://github.com/cancerberoSgx/tsd-check-runtime/blob/14a8bce/src/types.ts#L84)*

The whole source code of the compiled source file created - that is the caller source file with the test code prepended

___
<a id="error"></a>

### `<Optional>` error

**● error**: *`undefined` \| `string`*

*Defined in [types.ts:74](https://github.com/cancerberoSgx/tsd-check-runtime/blob/14a8bce/src/types.ts#L74)*

If there was an user error or internal error (i.e: project configuration not found, or callerFile couldnt' be resolved) then that kind of error is returned here and `pass` will be false.

___
<a id="failerrors"></a>

### `<Optional>` failErrors

**● failErrors**: *[CompilationError](_types_.compilationerror.md)[]*

*Defined in [types.ts:79](https://github.com/cancerberoSgx/tsd-check-runtime/blob/14a8bce/src/types.ts#L79)*

in case `pass` is false because a compilation error, it probably means that the types don't match and the list of compile diagnostic errors will be returned here.

___
<a id="filepath"></a>

### `<Optional>` filePath

**● filePath**: *`undefined` \| `string`*

*Defined in [types.ts:102](https://github.com/cancerberoSgx/tsd-check-runtime/blob/14a8bce/src/types.ts#L102)*

Absolute path to the new file created (from `callerFile`) with test code prepended. Notice that this file is actually not created, this is the path the compiler uses in the project to reference it virtually.

___
<a id="pass"></a>

###  pass

**● pass**: *`boolean`*

*Defined in [types.ts:69](https://github.com/cancerberoSgx/tsd-check-runtime/blob/14a8bce/src/types.ts#L69)*

if true it means that types matched and there were no compile errors given the `options` conditions. If false, `failErrors` contains compilation errors or if there were an internal/user error (like project configuration not found) it will be returned in `error`

___
<a id="testcode"></a>

### `<Optional>` testCode

**● testCode**: *`undefined` \| `string`*

*Defined in [types.ts:90](https://github.com/cancerberoSgx/tsd-check-runtime/blob/14a8bce/src/types.ts#L90)*

the test code prepended to the caller file to build the new source file that was compiled to type check. It contains user code and declarations that add names in relevant scopes (like variables declared in define(), it(), test(), etc)

___


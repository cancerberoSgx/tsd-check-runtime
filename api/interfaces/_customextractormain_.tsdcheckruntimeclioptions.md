[tsd-check-runtime](../README.md) > ["customExtractorMain"](../modules/_customextractormain_.md) > [TsdCheckRuntimeCliOptions](../interfaces/_customextractormain_.tsdcheckruntimeclioptions.md)

# Interface: TsdCheckRuntimeCliOptions

## Hierarchy

 `ReplaceProjectFunctionCallOptions`

**↳ TsdCheckRuntimeCliOptions**

## Index

### Properties

* [clean](_customextractormain_.tsdcheckruntimeclioptions.md#clean)
* [debug](_customextractormain_.tsdcheckruntimeclioptions.md#debug)
* [extractorPrependVariableName](_customextractormain_.tsdcheckruntimeclioptions.md#extractorprependvariablename)
* [extracts](_customextractormain_.tsdcheckruntimeclioptions.md#extracts)
* [help](_customextractormain_.tsdcheckruntimeclioptions.md#help)
* [moduleSpecifier](_customextractormain_.tsdcheckruntimeclioptions.md#modulespecifier)
* [out](_customextractormain_.tsdcheckruntimeclioptions.md#out)
* [tsConfigFilePath](_customextractormain_.tsdcheckruntimeclioptions.md#tsconfigfilepath)

---

## Properties

<a id="clean"></a>

### `<Optional>` clean

**● clean**: *`undefined` \| `false` \| `true`*

*Inherited from ReplaceFileFunctionCallOptions.clean*

*Defined in /home/sg/git/tsd-check-runtime/node_modules/typescript-poor-man-reflection/dist/src/types.d.ts:44*

If true the tool will clean all arguments in matched function call expressions

___
<a id="debug"></a>

### `<Optional>` debug

**● debug**: *`undefined` \| `false` \| `true`*

*Inherited from ReplaceProjectFunctionCallOptions.debug*

*Defined in /home/sg/git/tsd-check-runtime/node_modules/typescript-poor-man-reflection/dist/src/types.d.ts:24*

Prints details in stdout, default is false

___
<a id="extractorprependvariablename"></a>

### `<Optional>` extractorPrependVariableName

**● extractorPrependVariableName**: *`undefined` \| `string`*

*Inherited from ReplaceFileFunctionCallOptions.extractorPrependVariableName*

*Defined in /home/sg/git/tsd-check-runtime/node_modules/typescript-poor-man-reflection/dist/src/types.d.ts:60*

In case custom `extracts` return `prependToFile` property, they also can configure the name of the array variable prepended in the file that contains all values. By default it's `__extractor_prepend__`.

___
<a id="extracts"></a>

### `<Optional>` extracts

**● extracts**: *`undefined` \| `object`*

*Inherited from ReplaceFileFunctionCallOptions.extracts*

*Defined in /home/sg/git/tsd-check-runtime/node_modules/typescript-poor-man-reflection/dist/src/types.d.ts:48*

Custom extracts declaring custom function names

___
<a id="help"></a>

### `<Optional>` help

**● help**: *`undefined` \| `string`*

*Inherited from ReplaceProjectFunctionCallOptions.help*

*Defined in /home/sg/git/tsd-check-runtime/node_modules/typescript-poor-man-reflection/dist/src/types.d.ts:32*

Shows usage help and exit.

___
<a id="modulespecifier"></a>

### `<Optional>` moduleSpecifier

**● moduleSpecifier**: *`undefined` \| `string`*

*Inherited from ReplaceFileFunctionCallOptions.moduleSpecifier*

*Defined in /home/sg/git/tsd-check-runtime/node_modules/typescript-poor-man-reflection/dist/src/types.d.ts:56*

Custom name of the import module specifier from which the target function in the function call expression needs to be imported in order to perform the arguments modification. Default value: `typescript-poor-man-reflection`.

___
<a id="out"></a>

### `<Optional>` out

**● out**: *`undefined` \| `string`*

*Inherited from ReplaceProjectFunctionCallOptions.out*

*Defined in /home/sg/git/tsd-check-runtime/node_modules/typescript-poor-man-reflection/dist/src/types.d.ts:28*

Instead of writing existing files, will create a copy of the project, with modified files, at this folder

___
<a id="tsconfigfilepath"></a>

### `<Optional>` tsConfigFilePath

**● tsConfigFilePath**: *`undefined` \| `string`*

*Inherited from ReplaceProjectFunctionCallOptions.tsConfigFilePath*

*Defined in /home/sg/git/tsd-check-runtime/node_modules/typescript-poor-man-reflection/dist/src/types.d.ts:20*

Default value `'./tsconfig.json'`. The target `tsconfig.json` file from which the project is loaded. `typescript-poor-man-reflection` will load and parse the project with this identical configuration. All the files referenced by this configuration will be examined, with the exception of .d.ts and external library files.

___


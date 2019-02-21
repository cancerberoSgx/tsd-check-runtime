[tsd-check-runtime](../README.md) > ["types"](../modules/_types_.md) > [TsdCheckRuntimeCliOptions](../interfaces/_types_.tsdcheckruntimeclioptions.md)

# Interface: TsdCheckRuntimeCliOptions

## Hierarchy

 `ReplaceProjectFunctionCallOptions`

**↳ TsdCheckRuntimeCliOptions**

## Index

### Properties

* [clean](_types_.tsdcheckruntimeclioptions.md#clean)
* [debug](_types_.tsdcheckruntimeclioptions.md#debug)
* [dontFailOnDuplicateVariable](_types_.tsdcheckruntimeclioptions.md#dontfailonduplicatevariable)
* [extraOptionsHelp](_types_.tsdcheckruntimeclioptions.md#extraoptionshelp)
* [extractorDataFolderFileName](_types_.tsdcheckruntimeclioptions.md#extractordatafolderfilename)
* [extractorDataMode](_types_.tsdcheckruntimeclioptions.md#extractordatamode)
* [extractorDataVariableName](_types_.tsdcheckruntimeclioptions.md#extractordatavariablename)
* [extracts](_types_.tsdcheckruntimeclioptions.md#extracts)
* [filePattern](_types_.tsdcheckruntimeclioptions.md#filepattern)
* [help](_types_.tsdcheckruntimeclioptions.md#help)
* [moduleSpecifier](_types_.tsdcheckruntimeclioptions.md#modulespecifier)
* [out](_types_.tsdcheckruntimeclioptions.md#out)
* [tsConfigFilePath](_types_.tsdcheckruntimeclioptions.md#tsconfigfilepath)

---

## Properties

<a id="clean"></a>

### `<Optional>` clean

**● clean**: *`undefined` \| `false` \| `true`*

*Inherited from ReplaceFileFunctionCallOptions.clean*

*Defined in /home/sg/git/tsd-check-runtime/node_modules/typescript-poor-man-reflection/dist/src/types.d.ts:55*

If true the tool will clean all arguments in matched function call expressions

___
<a id="debug"></a>

### `<Optional>` debug

**● debug**: *`undefined` \| `false` \| `true`*

*Inherited from ReplaceProjectFunctionCallOptions.debug*

*Defined in /home/sg/git/tsd-check-runtime/node_modules/typescript-poor-man-reflection/dist/src/types.d.ts:24*

Prints details in stdout, default is false

___
<a id="dontfailonduplicatevariable"></a>

### `<Optional>` dontFailOnDuplicateVariable

**● dontFailOnDuplicateVariable**: *`undefined` \| `false` \| `true`*

*Defined in [types.ts:135](https://github.com/cancerberoSgx/tsd-check-runtime/blob/1e47935/src/types.ts#L135)*

Don't abort when two declarations with same name are detected, just warn.

___
<a id="extraoptionshelp"></a>

### `<Optional>` extraOptionsHelp

**● extraOptionsHelp**: *`undefined` \| `object`*

*Inherited from ReplaceProjectFunctionCallOptions.extraOptionsHelp*

*Defined in /home/sg/git/tsd-check-runtime/node_modules/typescript-poor-man-reflection/dist/src/types.d.ts:37*

for third party using it programmatically, they can declare new CLI options and their descriptions so they appear with --help

___
<a id="extractordatafolderfilename"></a>

### `<Optional>` extractorDataFolderFileName

**● extractorDataFolderFileName**: *`undefined` \| `string`*

*Inherited from ReplaceFileFunctionCallOptions.extractorDataFolderFileName*

*Defined in /home/sg/git/tsd-check-runtime/node_modules/typescript-poor-man-reflection/dist/src/types.d.ts:89*

The name of the file to store extractor data in case `extractorDataMode` is `'folderFile'`. By default it will be named `__tsd_check_runtime__.ts`. See \[\['folderFile'\]\]

___
<a id="extractordatamode"></a>

### `<Optional>` extractorDataMode

**● extractorDataMode**: *`ExtractorDataMode`*

*Inherited from ReplaceFileFunctionCallOptions.extractorDataMode*

*Defined in /home/sg/git/tsd-check-runtime/node_modules/typescript-poor-man-reflection/dist/src/types.d.ts:84*

Mode in which the extractor data is stored in the source code.

If `prependVariable`, an array variable will be prepended at the top of the same file and function calls will access the array directly.

If `folderFile`, the data is stored in a separate file that exports a function to access to array. An import declaration will be added to the file and function calls will use the imported function to access the array. There will be one of these files per folder with the name given by option `extractorDataFolderFileName` that will contain the data of all this folder's immediate children.

___
<a id="extractordatavariablename"></a>

### `<Optional>` extractorDataVariableName

**● extractorDataVariableName**: *`undefined` \| `string`*

*Inherited from ReplaceFileFunctionCallOptions.extractorDataVariableName*

*Defined in /home/sg/git/tsd-check-runtime/node_modules/typescript-poor-man-reflection/dist/src/types.d.ts:72*

In case custom `extracts` return `prependToFile` property, they also can configure the name of the array variable prepended in the file that contains all values. By default it's `__extractor_prepend__`.

___
<a id="extracts"></a>

### `<Optional>` extracts

**● extracts**: *`undefined` \| `object`*

*Inherited from ReplaceFileFunctionCallOptions.extracts*

*Defined in /home/sg/git/tsd-check-runtime/node_modules/typescript-poor-man-reflection/dist/src/types.d.ts:59*

Custom extracts declaring custom function names

___
<a id="filepattern"></a>

### `<Optional>` filePattern

**● filePattern**: *`undefined` \| `string`*

*Inherited from ReplaceProjectFunctionCallOptions.filePattern*

*Defined in /home/sg/git/tsd-check-runtime/node_modules/typescript-poor-man-reflection/dist/src/types.d.ts:43*

If provided it will only modify files that match the given glob

___
<a id="help"></a>

### `<Optional>` help

**● help**: *`undefined` \| `false` \| `true`*

*Inherited from ReplaceProjectFunctionCallOptions.help*

*Defined in /home/sg/git/tsd-check-runtime/node_modules/typescript-poor-man-reflection/dist/src/types.d.ts:32*

Shows usage help and exit.

___
<a id="modulespecifier"></a>

### `<Optional>` moduleSpecifier

**● moduleSpecifier**: *`undefined` \| `string`*

*Inherited from ReplaceFileFunctionCallOptions.moduleSpecifier*

*Defined in /home/sg/git/tsd-check-runtime/node_modules/typescript-poor-man-reflection/dist/src/types.d.ts:67*

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


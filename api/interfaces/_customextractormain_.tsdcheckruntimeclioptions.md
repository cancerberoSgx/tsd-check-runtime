[tsd-check-runtime](../README.md) > ["customExtractorMain"](../modules/_customextractormain_.md) > [TsdCheckRuntimeCliOptions](../interfaces/_customextractormain_.tsdcheckruntimeclioptions.md)

# Interface: TsdCheckRuntimeCliOptions

## Hierarchy

 `ReplaceProjectFunctionCallOptions`

**↳ TsdCheckRuntimeCliOptions**

## Index

### Properties

* [clean](_customextractormain_.tsdcheckruntimeclioptions.md#clean)
* [debug](_customextractormain_.tsdcheckruntimeclioptions.md#debug)
* [dontFailOnDuplicateVariable](_customextractormain_.tsdcheckruntimeclioptions.md#dontfailonduplicatevariable)
* [externalFolderFileName](_customextractormain_.tsdcheckruntimeclioptions.md#externalfolderfilename)
* [extraOptionsHelp](_customextractormain_.tsdcheckruntimeclioptions.md#extraoptionshelp)
* [extractorDataMode](_customextractormain_.tsdcheckruntimeclioptions.md#extractordatamode)
* [extractorDataVariableName](_customextractormain_.tsdcheckruntimeclioptions.md#extractordatavariablename)
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

*Defined in /home/sg/git/tsd-check-runtime/node_modules/typescript-poor-man-reflection/dist/src/types.d.ts:51*

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

*Defined in [customExtractorMain.ts:9](https://github.com/cancerberoSgx/tsd-check-runtime/blob/84ed4b1/src/customExtractorMain.ts#L9)*

Don't abort when two declarations with same name are detected, just warn.

___
<a id="externalfolderfilename"></a>

### `<Optional>` externalFolderFileName

**● externalFolderFileName**: *`undefined` \| `string`*

*Inherited from ReplaceFileFunctionCallOptions.externalFolderFileName*

*Defined in /home/sg/git/tsd-check-runtime/node_modules/typescript-poor-man-reflection/dist/src/types.d.ts:85*

The name of the file to store extractor data in case `extractorDataMode` is `'externalFolderFile'`. By default it will be named `__tsd_check_runtime__.ts`. See \[\['externalFolderFile'\]\]

___
<a id="extraoptionshelp"></a>

### `<Optional>` extraOptionsHelp

**● extraOptionsHelp**: *`undefined` \| `object`*

*Inherited from ReplaceProjectFunctionCallOptions.extraOptionsHelp*

*Defined in /home/sg/git/tsd-check-runtime/node_modules/typescript-poor-man-reflection/dist/src/types.d.ts:37*

for third party using it programmatically, they can declare new CLI options and their descriptions so they appear with --help

___
<a id="extractordatamode"></a>

### `<Optional>` extractorDataMode

**● extractorDataMode**: *"prependVariable" \| "externalFolderFile"*

*Inherited from ReplaceFileFunctionCallOptions.extractorDataMode*

*Defined in /home/sg/git/tsd-check-runtime/node_modules/typescript-poor-man-reflection/dist/src/types.d.ts:80*

Mode in which the extractor data is stored in the source code.

If `prependVariable`, an array variable will be prepended at the top of the same file and function calls will access the array directly.

If `externalFolderFile`, the data is stored in a separate file that exports a function to access to array. An import declaration will be added to the file and function calls will use the imported function to access the array. There will be one of these files per folder with the name given by option `externalFolderFileName` that will contain the data of all this folder's immediate children.

___
<a id="extractordatavariablename"></a>

### `<Optional>` extractorDataVariableName

**● extractorDataVariableName**: *`undefined` \| `string`*

*Inherited from ReplaceFileFunctionCallOptions.extractorDataVariableName*

*Defined in /home/sg/git/tsd-check-runtime/node_modules/typescript-poor-man-reflection/dist/src/types.d.ts:68*

In case custom `extracts` return `prependToFile` property, they also can configure the name of the array variable prepended in the file that contains all values. By default it's `__extractor_prepend__`.

___
<a id="extracts"></a>

### `<Optional>` extracts

**● extracts**: *`undefined` \| `object`*

*Inherited from ReplaceFileFunctionCallOptions.extracts*

*Defined in /home/sg/git/tsd-check-runtime/node_modules/typescript-poor-man-reflection/dist/src/types.d.ts:55*

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

*Defined in /home/sg/git/tsd-check-runtime/node_modules/typescript-poor-man-reflection/dist/src/types.d.ts:63*

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


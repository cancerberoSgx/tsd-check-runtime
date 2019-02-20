[tsd-check-runtime](../README.md) > ["checkType"](../modules/_checktype_.md)

# External module: "checkType"

## Index

### Variables

* [project](_checktype_.md#project)

### Functions

* [checkType](_checktype_.md#checktype)
* [checkTypeCore](_checktype_.md#checktypecore)

---

## Variables

<a id="project"></a>

### `<Let>` project

**● project**: *`Project`*

*Defined in [checkType.ts:140](https://github.com/cancerberoSgx/tsd-check-runtime/blob/a00c97c/src/checkType.ts#L140)*

___

## Functions

<a id="checktype"></a>

###  checkType

▸ **checkType**<`T`>(typeOrFunction: *[TypeRepresentation](_types_.md#typerepresentation)<`T`>*, value: *`T`*, options?: *[Options](../interfaces/_types_.options.md)*): [Result](../interfaces/_types_.result.md)

*Defined in [checkType.ts:9](https://github.com/cancerberoSgx/tsd-check-runtime/blob/a00c97c/src/checkType.ts#L9)*

Low level public API to check type of `value` match type `typeOrFunction` in the context of project `tsConfigFilePath`.

**Type parameters:**

#### T 
**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| typeOrFunction | [TypeRepresentation](_types_.md#typerepresentation)<`T`> | - |
| value | `T` | - |
| `Default value` options | [Options](../interfaces/_types_.options.md) |  {} |

**Returns:** [Result](../interfaces/_types_.result.md)

___
<a id="checktypecore"></a>

###  checkTypeCore

▸ **checkTypeCore**<`T`>(typeOrFunction: *[TypeRepresentation](_types_.md#typerepresentation)<`T`>*, value: *`T`*, options?: *[Options](../interfaces/_types_.options.md)*): [Result](../interfaces/_types_.result.md)

*Defined in [checkType.ts:14](https://github.com/cancerberoSgx/tsd-check-runtime/blob/a00c97c/src/checkType.ts#L14)*

*__internal__*: 

**Type parameters:**

#### T 
**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| typeOrFunction | [TypeRepresentation](_types_.md#typerepresentation)<`T`> | - |
| value | `T` | - |
| `Default value` options | [Options](../interfaces/_types_.options.md) |  {} |

**Returns:** [Result](../interfaces/_types_.result.md)

___


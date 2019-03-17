import {checkType} from '../../checkType'
import {Result, Options, TypeRepresentation} from '../../types'

export function intermediateFunction<T>(
  typeOrFunction: TypeRepresentation<T>,
  value: T,
  options: Options = {},
): Result {
  return checkType(typeOrFunction, value, options)
}

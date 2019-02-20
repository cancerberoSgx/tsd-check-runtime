import { Result, Options, TypeRepresentation } from '../../types'
import { intermediateFunction } from './intermediaFunction'

export function intermediateFunction2<T>(
  typeOrFunction: TypeRepresentation<T>,
  value: T,
  options: Options = {}
): Result {
  return intermediateFunction(typeOrFunction, value, options)
}

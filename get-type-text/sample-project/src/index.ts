import TypeText from 'get-type-text'
type Type<T> = {a: string, b: T}[]
const n = TypeText<Type<Date>>()
const b = TypeText<{a:'a'}>()
const c = TypeText<{a:"a"}>()
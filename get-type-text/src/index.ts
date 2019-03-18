export default function TypeText<T>( t?:string): {toString():string|undefined} {
  return {
    // toString: (function (this:string|undefined){
    //   return this
    // }).bind(t)
    toString(){
      return t
    }
  }
}

export default function TypeText<T>( t?:string): string {
  // return {
  //   // toString: (function (this:string|undefined){
  //   //   return this
  //   // }).bind(t)
  //   toString(){
  //     return t
  //   }
  // }
  return t! // we want to return undefined if that's the case should explore in user face.
}

trying to develop a preprocessing tool to mutate TypeScript and replace certain function call expressions with referenced type text so we have access to this info at runtime

WIP

 * if I cannot radically replace types with strings in files in place because types will be lost

alternative 1: Make the function signature to return more than a string.replace inplace function calls by adding a parameter with the string. Uers will know not to touch that (we can put a comment). Also the second time we want to replace in the existing string. 

type TypeText = <T>(_typeText?: string)=>{toString():string}

user authored:

var a=TypeText<{super:string,type:boolean[][]}>()

after running the tool for the first time: 

var a=TypeText<{super:string,type:boolean[][]}>(/*DONT_TOUCH*/"{super:string,type:boolean[][]}"/*DONT_TOUCH*/)

user changed the type (in a refactor):


var a=TypeText<MyOtherType>(/*DONT_TOUCH*/"{super:string,type:boolean[][]}"/*DONT_TOUCH*/)

second time the the tool runs:

var a=TypeText<MyOtherType>(/*DONT_TOUCH*/"MyOtherType"/*DONT_TOUCH*/)

Notes:

 * user never touch the parameter
 * we dont need the comment - is just for the user
 * we can alternatively mark the string: var a=TypeText<MyOtherType>("_DONT_TOUCH_MyOtherType")

Initial implementation limitations: 

 * user needs to import the function using that module specifier 'get-type-text'
 * they cannot call on a reference only to the exported id of that module



alternative 2: generate comments inplace .ts and then post process emitted files and replace there. I dont like it
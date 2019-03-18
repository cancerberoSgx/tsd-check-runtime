// import {Project} from 'ts-simple-ast'
// import { replaceFunctionCall } from '../replaceFunctionCall';


// describe('replaceFunctionCall', ()=>{ 
//   it('should  replace given function name and module specifier with first type attr text', ()=>{
//     const project = new Project()
//     const sourceFile= project.createSourceFile('test.ts', `
// import NameOf from 'foo'
// type Type<T> = {a: string, b: T}[]
// const n = NameOf<Type<Date>>()
// const b = NameOf<{a:'a'}>()
// const c = NameOf<{a:"a"}>()
// NameOf<Type<Date>>()
// NameOf<{a:'a'}>()
// NameOf<{a:"a"}>()
//     `)

//     replaceFunctionCall(sourceFile, 'foo', 'NameOf');
    
//     const t = project.getSourceFile('test.ts')!.getText()
    
//     console.log(t);

//     expect(t).toContain(`
// import NameOf from 'foo'
// type Type<T> = {a: string, b: T}[]
// const n = "Type<Date>"
// const b = "{a:'a'}"
// const c = "{a:\\"a\\"}"
// "Type<Date>"
// "{a:'a'}"
// "{a:\\"a\\"}"
//     `.trim())
    
//   })
// })




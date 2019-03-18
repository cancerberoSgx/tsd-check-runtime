import {Project} from 'ts-simple-ast'
import { replaceFunctionCall } from '../replaceFunctionCall';


describe('replaceFunctionCall', ()=>{ 
  it('should  replace given function name and module specifier with first type attr text', ()=>{
    const project = new Project()
      project.createSourceFile('test.ts', `
import TypeText from 'get-type-text'
type Type<T> = {a: string, b: T}[]
const n = TypeText<Type<Date>>()
const b = TypeText<{a:'a'}>()
const c = TypeText<{a:"a"}>()
    `)

    replaceFunctionCall(project.getSourceFile('test.ts')!, {moduleSpecifier: 'get-type-text', functionName: 'TypeText'});
    
    const t = project.getSourceFile('test.ts')!.getText()
    

    expect(t).toContain(`
import TypeText from 'get-type-text'
type Type<T> = {a: string, b: T}[]
const n = TypeText<Type<Date>>('Type<Date>')
const b = TypeText<{a:'a'}>('{a:\\'a\\'}')
const c = TypeText<{a:"a"}>('{a:"a"}')
    `.trim())
    
    // and now the second time without modifications
    project.getSourceFile('test.ts')!.replaceWithText(`
import TypeText from 'get-type-text'
type Type<T> = {a: string, b: T}[]
const n = TypeText<Type<Date>>('Type<Date>')
const b = TypeText<Type<{a:'a'}>>('{a:\\'a\\'}')
const c = TypeText<{a:Type<number>}>('{a:"a"}')
        `.trim())

    // console.log(project.getSourceFile('test.ts')!.getText());


    replaceFunctionCall(project.getSourceFile('test.ts')!);
    // project.getSourceFile('test.ts')!.saveSync()
    // project.saveSync()

    const t2 = project.getSourceFile('test.ts')!.getText()
    // console.log(project.getSourceFile('test.ts')!.getText());

    expect(t2).toContain(`
import TypeText from 'get-type-text'
type Type<T> = {a: string, b: T}[]
const n = TypeText<Type<Date>>('Type<Date>')
const b = TypeText<Type<{a:'a'}>>('Type<{a:\\'a\\'}>')
const c = TypeText<{a:Type<number>}>('{a:Type<number>}')
`.trim())
  })
})




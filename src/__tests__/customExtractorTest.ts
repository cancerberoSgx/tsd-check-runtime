import Project from 'ts-simple-ast'
import {replaceFileFunctionCall} from 'typescript-poor-man-reflection'
import '..'
import {customExtractor} from '../customExtractor'

describe('Type() and custom extractor', () => {
  it('should build custom extractor for extracting  all declarations in current source file', () => {
    const project = new Project()
    project.createSourceFile(
      'test.ts',
      `
describe('ff', ()=>{
interface I{
  i:number
}
it('as', ()=>{
  class C implements I {
    i:number=0
    m(){
      var foo=1
      while(true){
        var t0 = Date.now()
      }
    }
  }
})  
})
test('bar', ()=>{
  const var55 = 's'
})
const body = Type<any>()
    `,
    )

    replaceFileFunctionCall(project.getSourceFile('test.ts')!, {extracts: {Type: customExtractor}})

    expect(project.getSourceFile('test.ts')!.getText()).toContain(
      `const body = Type<any>({\"text\":\"any\",\"prefix\":\"interface I{\\n  i:number\\n}\\nclass C implements I {\\n    i:number=0\\n    m(){\\n      var foo=1\\n      while(true){\\n        var t0 = Date.now()\\n      }\\n    }\\n  }\\nconst var55 = 's'\"})`,
    )
  })

  it('should throw in case duplicate declaration names are found', () => {
    const project = new Project()
    project.createSourceFile(
      'test.ts',
      `
var b = 1
describe('ff', ()=>{
  var b = 2
  it('as', ()=>{
    var b = 3
    const a = Type<any>()
  })  
})`,
    )

    expect(() =>
      replaceFileFunctionCall(project.getSourceFile('test.ts')!, {extracts: {Type: customExtractor}}),
    ).toThrow()
  })
})

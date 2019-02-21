import Project from 'ts-simple-ast'
import { replaceFileFunctionCall } from 'typescript-poor-man-reflection'
import '..'
import { customExtractor } from '../customExtractor'
import { unique } from '../util'
describe('Type() and custom extractor', () => {
  it('should build custom extractor for extracting all declarations that add names in current source file global or describe(), it(), test() closures', () => {
    const project = new Project()
    const file = unique('test_') + '.ts'
    project.createSourceFile(
      file,
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
    `
    )

    replaceFileFunctionCall(project.getSourceFile(file)!, {
      extracts: {
        Type: customExtractor
      },
      extractorDataMode: 'prependVariable',
      extractorDataVariableName: '__CE'
    })

    expect(project.getSourceFile(file)!.getText()).toContain(
      `const body = Type<any>({text: "any", __tsdCR_prefix: __CE[0]})`
    )
    expect(project.getSourceFile(file)!.getText()).toContain(
      `const __CE = ["interface I{\\n  i:number\\n}\\nclass C implements I {\\n    i:number=0\\n    m(){\\n      var foo=1\\n      while(true){\\n        var t0 = Date.now()\\n      }\\n    }\\n  }\\nconst var55 = 's'"]`
    )
    expect(project.getSourceFile(file)!.getText()).not.toContain(`\\nvar foo`)
  })

  it('should throw in case duplicate declaration names are found', () => {
    const project = new Project()
    const file = unique('test_') + '.ts'
    project.createSourceFile(
      file,
      `
describe('ff', ()=>{
  var b = 2
  it('as', ()=>{
    var b = 3
    const a = Type<any>()
  })  
})`
    )
    expect(() =>
      replaceFileFunctionCall(project.getSourceFile(file)!, {
        extracts: {
          Type: customExtractor
        }
      })
    ).toThrowError()
  })
})

import { TypeGuards, SyntaxKind, Identifier, SourceFile, CallExpression } from 'ts-simple-ast';
import { quote } from "./util";
import { Replacement } from './main';

export interface ReplaceFunctionCallsOptions {
  moduleSpecifier?:string
  functionName?: string
  cleanArguments?: boolean
}
  export function replaceFunctionCall(sourceFile: SourceFile, {moduleSpecifier='get-type-text', functionName='TypeText', cleanArguments=false}: ReplaceFunctionCallsOptions={moduleSpecifier: 'get-type-text', functionName: 'TypeText'}):(Replacement|undefined)[]  {
  const replaced: Replacement[]= [ ]
  const callExpressions = extractCallExpressionsFrom(sourceFile, moduleSpecifier, functionName, );
  callExpressions.forEach(c => {
    
    //TODO: verify type argument 0 exists and has correct type
    if(c.getArguments().length===0 && !cleanArguments){
      // first time
      const r = getTypeText(c)
    c.addArgument(r)
    replaced.push({file: sourceFile.getFilePath(), replacement: r, firstTime: true})
    }
    else if(c.getArguments().length===1){
// second time}
const t = cleanArguments?'':getArgumentText(c)
c.getArguments()[0].replaceWithText(t)
replaced.push({file: sourceFile.getFilePath(), replacement: t, firstTime: false})

    }
    else {
      throw 'more than 1 argument - contract broken'
      // TODO: remove all the arguments
    }
    // c.replaceWithText(quote(c.getTypeArguments()[0]!.getText()))
  });
  return replaced
}

function getTypeText(c:CallExpression){
  //TODO: verify type argument exist
  const t= c.getTypeArguments()[0]!.getText()
  return quote(t)
}
function getArgumentText(c: CallExpression){
  const text = getTypeText(c)

  // const s = quote(`${text}`)
return text
  // return ``
}
// function extractArgumentText(c: CallExpression):string{
//     //TODO: verify type argument 0 exists and has correct type
//   return c.getArguments()[0]!.getText()
// }
function extractCallExpressionsFrom(sourceFile: SourceFile, moduleSpecifier: string, name: string) {
  const ids = sourceFile.getDescendants().filter(TypeGuards.isCallExpression).map(c => c.getFirstChildByKind(SyntaxKind.Identifier)).filter(i => i && i.getText() === name) as Identifier[];
  const callExpressionsImportedFromFooParent = ids
    .filter(i => i.findReferences().map(r => r.getDefinition())
      .map(d => d.getDeclarationNode()!.getParent()!)
      .filter(TypeGuards.isImportDeclaration)
      .map(i => i.getModuleSpecifier().getText() === moduleSpecifier))
    .map(i => i.getParentIfKind(SyntaxKind.CallExpression))
    .filter(i => i) as CallExpression[];
  return callExpressionsImportedFromFooParent;
}

import {TypeGuards, SyntaxKind, Identifier, SourceFile, CallExpression} from 'ts-simple-ast'
import {Replacement, ReplaceFunctionCallsOptions, FUNCTION_NAME, MODULE_SPECIFIER_DEFAULT} from './types'

/** JavaScript API to replace arguments of all function expression calls in given (ts-simple-ast SourceFile) file that match given options. See  `ReplaceFunctionCallsOptions`. */
export function replaceFunctionCall(
  sourceFile: SourceFile,
  {
    moduleSpecifier = MODULE_SPECIFIER_DEFAULT,
    functionName = FUNCTION_NAME,
    cleanArguments = false,
  }: ReplaceFunctionCallsOptions = {moduleSpecifier: 'get-type-text', functionName: 'TypeText'},
): (Replacement | undefined)[] {
  const replaced: Replacement[] = []
  const callExpressions = extractCallExpressionsFrom(sourceFile, moduleSpecifier, functionName)
  callExpressions.forEach(c => {
    if (c.getArguments().length === 0 && !cleanArguments) {
      // first time
      const r = quote(c.getTypeArguments()[0]!.getText())
      c.addArgument(r)
      replaced.push({file: sourceFile.getFilePath(), replacement: r, firstTime: true})
    } else if (c.getArguments().length === 1) {
      // second time - dispatch --cleanArguments or replace existing one
      const r = cleanArguments ? '' : quote(c.getTypeArguments()[0]!.getText())
      const comma = c.getArguments()[0].getNextSiblingIfKind(SyntaxKind.CommaToken)
      if (comma) {
        comma.replaceWithText('')
      }
      c.getArguments()[0].replaceWithText(r)
      replaced.push({file: sourceFile.getFilePath(), replacement: r, firstTime: false})
    } else if (c.getArguments().length > 1) {
      console.error(
        `more than 1 argument found in file ${sourceFile.getFilePath()} function call expression ${c.getText()}`,
      )
    }
  })
  return replaced
}

function extractCallExpressionsFrom(sourceFile: SourceFile, moduleSpecifier: string, name: string) {
  const ids = sourceFile
    .getDescendants()
    .filter(TypeGuards.isCallExpression)
    .map(c => c.getFirstChildByKind(SyntaxKind.Identifier))
    .filter(i => i && i.getText() === name) as Identifier[]
  const callExpressionsImportedFromFooParent = ids
    .filter(i =>
      i
        .findReferences()
        .map(r => r.getDefinition())
        .map(d => d.getDeclarationNode()!.getParent()!)
        .filter(TypeGuards.isImportDeclaration)
        .map(i => i.getModuleSpecifier().getText() === moduleSpecifier),
    )
    .map(i => i.getParentIfKind(SyntaxKind.CallExpression))
    .filter(i => i) as CallExpression[]
  return callExpressionsImportedFromFooParent
}

export function quote(s: string, q: string = "'"): string {
  return q + s.replace(new RegExp(q, 'g'), '\\' + q) + q
}

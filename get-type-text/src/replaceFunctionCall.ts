import { TypeGuards, SyntaxKind, Identifier, SourceFile, CallExpression } from 'ts-simple-ast';
import { quote } from "./util";
export function replaceFunctionCall(sourceFile: SourceFile, moduleSpecifier: string, name: string) {
  const callExpressions = extractCallExpressionsFrom(sourceFile, 'foo', 'NameOf');
  callExpressions.forEach(c => c.replaceWithText(quote(c.getTypeArguments()[0]!.getText())));
}
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

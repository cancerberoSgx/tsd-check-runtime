import { CallExpression, TypeGuards, SyntaxKind } from 'ts-simple-ast';
import { PrefixedText } from './types';

export const customExtractor = (n: CallExpression) => {
  const declarations = n.getSourceFile().getDescendants().filter(d => {
    return TypeGuards.isCallSignatureDeclaration(d) ||
      TypeGuards.isClassDeclaration(d) ||
      TypeGuards.isClassLikeDeclarationBase(d) ||
      TypeGuards.isEnumDeclaration(d) ||
      TypeGuards.isVariableDeclarationList(d) ||
      TypeGuards.isFunctionDeclaration(d) ||
      TypeGuards.isInterfaceDeclaration(d) ||
      TypeGuards.isIndexSignatureDeclaration(d) ||
      TypeGuards.isNamespaceDeclaration(d) ||
      TypeGuards.isTypeAliasDeclaration(d)
  }).filter(d => {
    const block = d.getFirstAncestorByKind(SyntaxKind.Block)
    if (block && block.getParent() && block.getParent()!.getParent() && TypeGuards.isCallExpression(block.getParent()!.getParent()!)) {
      const ce = block.getParent()!.getParent()! as CallExpression
      const id = ce.getFirstChildByKind(SyntaxKind.Identifier)
      if (id) {
        return ['describe', 'it', 'test'].includes(id.getText())
      }
    }
  })

  // console.log(JSON.stringify({
  //   text: `${n.getTypeArguments()[0].getText()}`,
  //   prefix: `${declarations.map(d => d.getText()).join('\n')}`
  // }));
  
  return JSON.stringify({
    text: `${n.getTypeArguments()[0].getText()}`,
    prefix: `${declarations.map(d => d.getText()).join('\n')}`
  })
}

export function Type<T>(t?:PrefixedText): PrefixedText {
  return t! // we want to return undefined if that's the case should explore in user face.
}
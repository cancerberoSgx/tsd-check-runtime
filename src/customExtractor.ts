import { CallExpression, TypeGuards, SyntaxKind, Node } from 'ts-simple-ast'
import { PrefixedText } from './types'

export function Type<T>(t?: PrefixedText): PrefixedText {
  return t! // we want to return undefined if that's the case should explore in user face.
}

const sourceFilesPrepend: { [name: string]: number } = {}
export const customExtractor = (n: CallExpression, index: number, extractorPrependVariableName: string) => {

  if (typeof sourceFilesPrepend[n.getSourceFile().getFilePath()] === 'undefined') {
    const declarations = n
      .getSourceFile()
      .getDescendants()
      .filter(d => {
        return (
          TypeGuards.isCallSignatureDeclaration(d) ||
          TypeGuards.isClassDeclaration(d) ||
          TypeGuards.isEnumDeclaration(d) ||
          TypeGuards.isVariableDeclarationList(d) ||
          TypeGuards.isFunctionDeclaration(d) ||
          TypeGuards.isInterfaceDeclaration(d) ||
          TypeGuards.isIndexSignatureDeclaration(d) ||
          TypeGuards.isTypeAliasDeclaration(d)
        )
      })
      .filter(d => {
        const block = d.getFirstAncestorByKind(SyntaxKind.Block)
        if (
          block &&
          block.getParent() &&
          block.getParent()!.getParent() &&
          TypeGuards.isCallExpression(block.getParent()!.getParent()!)
        ) {
          const ce = block.getParent()!.getParent()! as CallExpression
          const id = ce.getFirstChildByKind(SyntaxKind.Identifier)
          if (id) {
            return ['describe', 'it', 'test'].includes(id.getText())
          }
        } else if (d.getParent() && TypeGuards.isSourceFile(d.getParent()!.getParent())) {
          return true
        }
      })

    let sameName = ''
    let sameNameLineNumber = 0
    declarations.some(d => {
      const dNames = getNames(d)
      return !!declarations.find(
        d2 =>
          d2 !== d &&
          !!getNames(d2).find(n => {
            if (dNames.includes(n)) {
              sameName = `"${n}" found in "${d.getText()}" and in "${d2.getText()}"`
              sameNameLineNumber = d.getStartLineNumber()
              return true
            }
            return false
          })
      )
    })

    if (sameName!) {
      throw new Error(`Declarations with same name detected !
File: "${n.getSourceFile().getFilePath()}:${sameNameLineNumber}"
Names: ${sameName}
Type() could fail, rename these identifiers in order to use it!. Aborting.`)
    }

    sourceFilesPrepend[n.getSourceFile().getFilePath()] = index

    return {
      argument: `{text: ${JSON.stringify(
        `${n.getTypeArguments()[0].getText()}`
      )}, prefix: ${extractorPrependVariableName}[${sourceFilesPrepend[n.getSourceFile().getFilePath()]}]}`,
      prependToFile: JSON.stringify(`${declarations.map(d => d.getText()).join('\n')}`)
    }
  } else {
    return {
      argument: `{text: ${JSON.stringify(
        `${n.getTypeArguments()[0].getText()}`
      )}, prefix: ${extractorPrependVariableName}[${sourceFilesPrepend[n.getSourceFile().getFilePath()]}]}`
    }
  }
}

function getNames(n: Node): string[] {
  if (TypeGuards.isVariableDeclarationList(n)) {
    return n.getDeclarations().map(d => d.getFirstChildByKind(SyntaxKind.Identifier)!.getText())
  } else {
    return [n.getFirstChildByKind(SyntaxKind.Identifier)!.getText()]
  }
}

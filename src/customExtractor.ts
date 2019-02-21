import { CallExpression, TypeGuards, SyntaxKind, Node } from 'ts-simple-ast'
import { PrefixedText, TsdCheckRuntimeCliOptions } from './types'
import { ExtractorGetter,  ExtractorDataMode, ReplaceProjectFunctionCallOptions } from 'typescript-poor-man-reflection'


/**
 * Use this function to extract a type text from TypeScript code as a string variable.
 *
 * For this to work you need to preprocess your source code using the following command before compiling with
 * tsc:
 *
 * ```
 * npx tsd-check-runtime
 * ```
 *
 * **Warning**, your source files calling this function will be modified
 *
 * To undo the changes call the following command, for example, after the tests finish executing:
 *
 * ```
 * npx tsd-check-runtime --clean
 * ```
 */
export function Type<T>(t?: PrefixedText): PrefixedText {
  return t! // we want to return undefined if that's the case should explore in user face.
}

const sourceFilesPrepend: { [name: string]: number } = {}
// stores actual prependToFile string here to not calculate it again., TODO: we are repeating it in the output file: TODO: reference it and dont have multiple copies. 
const sourceFilesPrependToFile: {[index:number]:string} = {}
export function customExtractor(  n: CallExpression, index: number, getter: ExtractorGetter, options:ReplaceProjectFunctionCallOptions&{dontFailOnDuplicateVariable?: boolean}) {
  if (typeof sourceFilesPrepend[n.getSourceFile().getFilePath()] === 'undefined') {
    // rootDeclarations are considered for repeated names but not added to sourceFilesPrepend
    const rootDeclarations: Node[] = []
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
        } else if (
          (d.getParent() && TypeGuards.isSourceFile(d.getParent()!)) ||
          (d.getParent()!.getParent() && TypeGuards.isSourceFile(d.getParent()!.getParent()))
        ) {
          rootDeclarations.push(d)
        }
      })

    let sameName = ''
    let sameNameLineNumber = 0
    declarations.some(d => {
      const dNames = getNames(d)
      return !![...declarations, ...rootDeclarations].find(
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
      const msg = `Declarations with same name detected !
File: "${n.getSourceFile().getFilePath()}:${sameNameLineNumber}"
Names: ${sameName}
Type() could fail, rename these identifiers in order to use it!`
      if (options.dontFailOnDuplicateVariable) {
        console.warn(msg);
      }
      else {
        throw new Error(msg + '. Aborting.')
      }
    }

    sourceFilesPrepend[n.getSourceFile().getFilePath()] = index

    if (options.extractorDataMode === 'prependVariable') {
      return {
        argument: `{text: ${JSON.stringify(`${n.getTypeArguments()[0].getText()}`)}, __tsdCR_prefix: ${
          getter(sourceFilesPrepend[n.getSourceFile().getFilePath()])}}`,
        prependToFile: JSON.stringify(`${declarations.map(d => d.getText()).join('\n')}`)
      }
    }
    else {
      // const prependToFilePrefix = `
      // {
      //   __tsdCR_prefix: ${JSON.stringify(declarations.map(d => d.getText()).join('\n'))},
      //   text: ${JSON.stringify(n.getTypeArguments()[0].getText())}
      // }`
      sourceFilesPrependToFile[index]=JSON.stringify(declarations.map(d => d.getText()).join('\n'))
      return {
      //   argument: getter(sourceFilesPrepend[n.getSourceFile().getFilePath()]),
      //   prependToFile: JSON.stringify(`${declarations.map(d => d.getText()).join('\n')}`)
      // }
      // {}, __tsdCR_prefix: ${
        argument: getter(index),
      // getter(sourceFilesPrepend[n.getSourceFile().getFilePath()])}}`,
      prependToFile: 
        `{text: ${JSON.stringify(`${n.getTypeArguments()[0].getText()}`)}, __tsdCR_prefix:${sourceFilesPrependToFile[index]}}`,
          // argument:  `{text: ${JSON.stringify(`${n.getTypeArguments()[0].getText()}`)}, __tsdCR_prefix: }`,
      }
    }

  } else {
    if (options.extractorDataMode === 'prependVariable') {
      return {
        argument: `{text: ${JSON.stringify(`${
          n.getTypeArguments()[0].getText()}`)}, __tsdCR_prefix: ${
          getter(sourceFilesPrepend[n.getSourceFile().getFilePath()])}}`
      }
    } else {
     return {
      argument: getter(index),
      prependToFile: 
      `
{
  __tsdCR_prefix: ${sourceFilesPrependToFile[sourceFilesPrepend[n.getSourceFile().getFilePath()]]},
  text: ${JSON.stringify(`${n.getTypeArguments()[0].getText()}`)    }
}
      `.trim()
     }
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

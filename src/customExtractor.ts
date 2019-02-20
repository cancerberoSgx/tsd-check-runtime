import { CallExpression, TypeGuards, SyntaxKind, Node } from 'ts-simple-ast';
import { PrefixedText } from './types';

export function Type<T>(t?:PrefixedText): PrefixedText {
  return t! // we want to return undefined if that's the case should explore in user face.
}

export const customExtractor = (n: CallExpression) => {
  const declarations = n.getSourceFile().getDescendants().filter(d => {
    return TypeGuards.isCallSignatureDeclaration(d) ||
      TypeGuards.isClassDeclaration(d) ||
      // TypeGuards.isClassLikeDeclarationBase(d) ||
      TypeGuards.isEnumDeclaration(d) ||
      TypeGuards.isVariableDeclarationList(d) ||
      TypeGuards.isFunctionDeclaration(d) ||
      TypeGuards.isInterfaceDeclaration(d) ||
      TypeGuards.isIndexSignatureDeclaration(d) ||
      // TypeGuards.isNamespaceDeclaration(d) ||
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

  let sameName:string|undefined
  let sameNameLineNumber=0
  if(declarations.find((d,i,a)=>{
    const dName=getNames(d)
    // let repeatedName :string|undefined
    if(declarations.find(d2=>d2!==d && !!getNames(d2).find(n=>{if(dName.includes(n)){sameName=`"${n}" found in "${d.getText()}" and in "${d2.getText()}"`; sameNameLineNumber=d.getStartLineNumber(); return true}return false}))) {
      return true
    }
    return false
  }))
  if(sameName){
    // console.error('Declarations with same name detected: '+sameName+'. Type() could fail, try to rename declarations!');
    throw  new Error(`Declarations with same name detected !
File: "${n.getSourceFile().getFilePath()}:${sameNameLineNumber}"
Names: ${sameName}
Type() could fail, rename these identifiers in order to use it!. Aborting.`)
  }
  
  return JSON.stringify({
    text: `${n.getTypeArguments()[0].getText()}`,
    prefix: `${declarations.map(d => d.getText()).join('\n')}`
  })
}

function getNames(n:Node): string[]{
  if(TypeGuards.isVariableDeclarationList(n)) {
    return n.getDeclarations().map(d=>d.getFirstChildByKind(SyntaxKind.Identifier)!.getText())
  } else {
    return [n.getFirstChildByKind(SyntaxKind.Identifier)!.getText()]
  }
}


// function commonAncestor(a: Node, b: Node) {
//   let n: Node=a
//   const ba = b.getAncestors()
//   let a_a = a.getParentWhile(n=>ba.includes(n))
//   // do{
//   //   if(ba.includes(n)){
//   //     a_a = n
//   //     break
//   //   }
//   // }while(n=n.getParent())

//   // const aa = a.getAncestors()
//   // n=b
//   const aa = a.getAncestors()

//   let b_a = b.getParentWhile(n=>aa.includes(n))
//   if(a_a && b_a) {
//     if(a_a===b_a){
//       return a_a
//     }
//     if(a_a.getAncestors().includes(b_a)){
//       return a_a
//     }
//     if(b_a.getAncestors().includes(a_a)){
//       return b_a
//     }
//   }
//   // do{
//   //   if(ba.includes(n)){
//   //     a_a = n
//   //     break
//   //   }
//   // }while(n=n.getParent())

// }
// function distance(a: Node, b: Node) {
//   const ca = commonAncestor(a, b)
//   // if(ca===a)
//   let aDistance = 0
//   if(a!==ca){
//     a.getParentWhile(p=>{aDistance++; return p===ca})
//   }
//   // const aDistance=a===ca?0 : a.getParentWhile(p=>{i++; return p===ca})
//   let bDistance = 0
//   if(b!=ca){
//     b.getParentWhile(p=>{bDistance++; return p===ca})
//   }
//   console.log({distance: [aDistance, bDistance]});
  
//   return Math.abs(aDistance-bDistance)

//   // if(a===b){
//   //   return 0
//   // }
//   // if(a.getParent()){
//   //   return distance()
//   // }
// }


  // .filter((d, i, arr)=>{
  //   const dId = d.getFirstChildByKind(SyntaxKind.Identifier)
  //   const othersWithSameName = arr.filter(o=>{
  //     if(arr.indexOf(o)!==i){
  //       const oId = o.getFirstChildByKind(SyntaxKind.Identifier); 
  //       if(!dId||!oId){
  //         return false
  //       }
  //       return (dId?dId.getText():undefined)===(oId?oId.getText():undefined)
  //     }
  //   })
  //   console.log('othersWithSameName', dId && dId.getText(), othersWithSameName);
    
  //     // .filter(o=>arr.indexOf(o)!==i)
  //   if(othersWithSameName.find(o=>distance(o, n)<distance(d, n))){
  //     return false
  //   }
  //   else {
  //     return true
  //   }
  //   // return othersWithSameName.find()
  // })

  // console.log(JSON.stringify({
  //   text: `${n.getTypeArguments()[0].getText()}`,
  //   prefix: `${declarations.map(d => d.getText()).join('\n')}`
  // }));
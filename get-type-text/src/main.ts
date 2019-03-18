import Project from 'ts-simple-ast';
import { replaceFunctionCall } from './replaceFunctionCall';

export interface Replacement{file:string, replacement:string, firstTime: boolean}

export interface Config {
  tsConfigFilePath?: string
  importSpecifier?:string
  functionName?: string
}
export function main(c: Config){
  const {tsConfigFilePath='./tsconfig.json', importSpecifier='get-type-text', functionName='TypeText'} = c
  const project = new Project({
    tsConfigFilePath, 
    addFilesFromTsConfig:true
  })
  
  const r:(Replacement|undefined)[] = []
  project.getSourceFiles().filter(f=>!f.isFromExternalLibrary()&&!f.isDeclarationFile()).forEach(f=>{
    r.push(...replaceFunctionCall(f,  importSpecifier, functionName))
  })
  project.saveSync()
}
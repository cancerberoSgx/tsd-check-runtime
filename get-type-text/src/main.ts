import Project from 'ts-simple-ast';
import { replaceFunctionCall, ReplaceFunctionCallsOptions } from './replaceFunctionCall';

export interface Replacement{file:string, replacement:string, firstTime: boolean}

export interface Config extends ReplaceFunctionCallsOptions{
  tsConfigFilePath?: string
}
export function main(c: Config){
  const {tsConfigFilePath='./tsconfig.json', } = c
  const project = new Project({
    tsConfigFilePath, 
    addFilesFromTsConfig:true
  })
  
  const r:(Replacement|undefined)[] = []
  project.getSourceFiles().filter(f=>!f.isFromExternalLibrary()&&!f.isDeclarationFile()).forEach(f=>{
    r.push(...replaceFunctionCall(f,  c))
  })
  project.saveSync()
}
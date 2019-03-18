import Project from 'ts-simple-ast';
import { replaceFunctionCall } from './replaceFunctionCall';

interface Config {
  tsConfigFilePath?: string
  importSpecifier?:string
  functionName?: string
}
const args = require('yargs-parser')(process.argv.slice(2)) as Config

function main(c: Config){
  const {tsConfigFilePath='./tsconfig.json', importSpecifier='get-type-text', functionName='NameOf'} = c
  const project = new Project({
    tsConfigFilePath, 
    addFilesFromTsConfig:true
  })
  project.getSourceFiles().filter(f=>!f.isFromExternalLibrary()&&!f.isDeclarationFile).forEach(f=>{
    replaceFunctionCall(f,  importSpecifier, functionName);
  })
}
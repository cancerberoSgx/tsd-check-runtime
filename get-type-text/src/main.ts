import Project from 'ts-simple-ast'
import {replaceFunctionCall} from './replaceFunctionCall'
import {Config, Replacement} from './types'

/** public JavaScript API to execute the tool on a given TypeScript project in filesystem. See `Config`. */
export function main(c: Config) {
  const {tsConfigFilePath = './tsconfig.json'} = c
  c.debug && console.log('Starting with configuration:\n', c)
  const project = new Project({
    tsConfigFilePath,
    addFilesFromTsConfig: true,
  })
  const r: (Replacement | undefined)[] = []
  project
    .getSourceFiles()
    .filter(f => !f.isFromExternalLibrary() && !f.isDeclarationFile())
    .forEach(f => {
      r.push(...replaceFunctionCall(f, c))
    })

  c.debug &&
    console.log(`Summary: 
    
${JSON.stringify(r)}`)
  project.saveSync()
}

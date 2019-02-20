import { main } from 'typescript-poor-man-reflection'
import { customExtractor } from './customExtractor'
import { ReplaceProjectFunctionCallOptions } from 'typescript-poor-man-reflection/dist/src/types'

export interface TsdCheckRuntimeCliOptions extends ReplaceProjectFunctionCallOptions {
  /**
   * Don't abort when two declarations with same name are detected, just warn.
   */
  dontFailOnDuplicateVariable?: boolean
}

const args = require('yargs-parser')(process.argv.slice(2)) as TsdCheckRuntimeCliOptions
main({
  ...args,
  extracts: {
    Type: customExtractor.bind(args)
  },
  moduleSpecifier: 'tsx-check-runtime',
  extractorDataVariableName: '__CE',
  extractorDataMode: 'folderFile',
  extraOptionsHelp: {
    dontFailOnDuplicateVariable: "don't abort when two declarations with the same name are found, just warn."
  }
})

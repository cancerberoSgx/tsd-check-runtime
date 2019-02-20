import { main } from 'typescript-poor-man-reflection'
import { customExtractor } from './customExtractor'
import { ReplaceProjectFunctionCallOptions } from 'typescript-poor-man-reflection/dist/src/types'

export interface TsdCheckRuntimeCliOptions extends ReplaceProjectFunctionCallOptions {}

const args = require('yargs-parser')(process.argv.slice(2)) as TsdCheckRuntimeCliOptions

main({
  ...args,
  extracts: {
    Type: customExtractor
  },
  moduleSpecifier: 'tsx-check-runtime',
  extractorPrependVariableName: '__CE'
})

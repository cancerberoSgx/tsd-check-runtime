import { main } from 'typescript-poor-man-reflection'
import { customExtractor,  extractorDataMode } from './customExtractor'
import { TsdCheckRuntimeCliOptions } from './types';
const args = require('yargs-parser')(process.argv.slice(2)) as TsdCheckRuntimeCliOptions
main({
  ...args,
  extracts: {
    Type: customExtractor.bind(args)
  },
  moduleSpecifier: 'tsx-check-runtime',
  extractorDataVariableName: '__CE',
  extractorDataMode,
  extraOptionsHelp: {
    dontFailOnDuplicateVariable: "don't abort when two declarations with the same name are found, just warn."
  }
})


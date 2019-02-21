import { main } from 'typescript-poor-man-reflection'
import { customExtractor } from './customExtractor'
import { TsdCheckRuntimeCliOptions } from './types';
const args = require('yargs-parser')(process.argv.slice(2)) as TsdCheckRuntimeCliOptions
main({
  extracts: {
    Type: customExtractor
  },
  moduleSpecifier: 'tsx-check-runtime',
  extractorDataVariableName: '__CE',
  extractorDataMode: 'folderFile',
  extractorDataFolderFileName: '__tsd_check_runtime__',
  extraOptionsHelp: {
    dontFailOnDuplicateVariable: "don't abort when two declarations with the same name are found, just warn."
  },
  ...args,
})

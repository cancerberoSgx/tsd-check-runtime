
import {main} from 'typescript-poor-man-reflection'
import { customExtractor } from './customExtractor';
import { Config } from 'typescript-poor-man-reflection/dist/src/types';

const args = require('yargs-parser')(process.argv.slice(2)) as Config

main({
  ...args, 
  extracts: {
    Type: customExtractor
  }, 
  moduleSpecifier: 'tsx-check-runtime'
})
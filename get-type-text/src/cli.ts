import {main, Config} from './main'

const args = require('yargs-parser')(process.argv.slice(2)) as Config
main(args)

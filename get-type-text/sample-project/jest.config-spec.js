module.exports = {
  "testEnvironment": "node",
  "testRegex": "__gtt_sample_tests__/.*\.*Test\.[t]sx?$",
  "transform": {
    ".(ts|tsx)": "ts-jest"
  },
  "rootDir":"./src", 
  "moduleFileExtensions": [
    "ts",
    "tsx",
    "js"
  ]
}
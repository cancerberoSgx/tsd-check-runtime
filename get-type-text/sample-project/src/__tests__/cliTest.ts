import { execSync } from 'child_process';
import { exec } from 'shelljs';
import { readFileSync, writeFileSync } from 'fs';
let bkp :string
beforeAll(()=>{
  bkp = readFileSync('src/index.ts').toString()
})
afterAll(()=>{
  writeFileSync('src/index.ts', bkp)

})
describe('cli', ()=>{ 
  it('should work', ()=>{
    let r = exec('npx ts-node src/index')
expect(r.code).toBe(0)
expect(r.stdout).toContain('undefined undefined undefined')

r = exec('npx  get-type-text')
expect(r.code).toBe(0)

r = exec('npx ts-node src/index')
expect(r.code).toBe(0)
expect(r.stdout).toContain(`Type<Date> {a:'a'} {a:"a"}`)

r = exec('npx  get-type-text --cleanArguments')
expect(r.code).toBe(0)

r = exec('npx ts-node src/index')
expect(r.code).toBe(0)
expect(r.stdout).toContain('undefined undefined undefined')

})
})




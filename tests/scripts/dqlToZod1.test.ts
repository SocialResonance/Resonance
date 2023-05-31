/* eslint-disable @typescript-eslint/no-var-requires */
import dqlToZod from 'dql-to-zod'
import fs from 'fs'

const schema = fs.readFileSync('interfaces/schema.txt', 'utf8')

//should write zod Schemas and types to the file system in the specified path and delete the file after the test

describe('dqlToZod', () => {
  afterAll(() => {
    fs.unlinkSync('tests/temp/zodSchemasAndTypesTest.ts')
  })

  it('should write zod Schemas and types to the file system in the specified path', () => {
    dqlToZod(schema, 'tests/temp/zodSchemasAndTypesTest.ts')

    expect(fs.existsSync('tests/temp/zodSchemasAndTypesTest.ts')).toBe(true)
  })

  it('should have generated correct zod Schemas and types', () => {
    const {
      MembershipFee,
      Newsletter,
      Space,
      User,
    } = require('../temp/zodSchemasAndTypesTest.ts')
  })
})

/* eslint-disable @typescript-eslint/no-var-requires */
import dqlToZod from 'dql-to-zod'
import fs from 'fs'
import {
  MembershipFee as importedMembershipFee,
  Newsletter as importedNewsletter,
  Space as importedSpace,
  User as importedUser,
} from '../../interfaces/zodSchemasAndTypes'
const schema = fs.readFileSync('interfaces/schema.txt', 'utf8')
import { generateMock } from '@anatine/zod-mock'

//should write zod Schemas and types to the file system in the specified path and delete the file after the test

describe('dqlToZod', () => {
  afterAll(() => {
    fs.unlinkSync('tests/temp/zodSchemasAndTypesTest.ts')
  })

  it('should write zod Schemas and types to the file system in the specified path', () => {
    dqlToZod(schema, 'tests/temp/zodSchemasAndTypesTest.ts')

    expect(fs.existsSync('tests/temp/zodSchemasAndTypesTest.ts')).toBe(true)
  })

  it('should have generated correct zod Schemas', () => {
    const {
      MembershipFee,
      Newsletter,
      Space,
      User,
    } = require('../temp/zodSchemasAndTypesTest.ts')

    const mockMembershipFeeData = generateMock(importedMembershipFee)
    const mockNewsletterData = generateMock(importedNewsletter)
    const mockSpaceData = generateMock(importedSpace)
    const mockUserData = generateMock(importedUser)

    expect(MembershipFee.parse(mockMembershipFeeData)).toBeTruthy()
    expect(Newsletter.parse(mockNewsletterData)).toBeTruthy()
    expect(Space.parse(mockSpaceData)).toBeTruthy()
    expect(User.parse(mockUserData)).toBeTruthy()
  })
})

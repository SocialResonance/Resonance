/* eslint-disable @typescript-eslint/no-var-requires */
import dqlToZod from 'dql-to-zod'
import fs from 'fs'
import path from 'path'
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
  const tempPath = 'tests/temp'
  const filePath = path.join(tempPath, 'zodSchemasAndTypesTest.ts')

  beforeAll(() => {
    if (!fs.existsSync(tempPath)) {
      fs.mkdirSync(tempPath, { recursive: true })
    }
  })

  afterAll(() => {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath)
    }
  })

  it('should write zod Schemas and types to the file system in the specified path', () => {
    dqlToZod(schema, filePath)
    expect(fs.existsSync(filePath)).toBe(true)
  })

  it('should have generated correct zod Schemas', () => {
    const { MembershipFee, Newsletter, Space, User } = require(path.relative(
      __dirname,
      filePath
    ))

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

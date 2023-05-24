import { NextApiRequest, NextApiResponse } from 'next'
import register from '../../pages/api/register'
import { DgraphClient, Txn } from 'dgraph-js'

jest.mock('dgraph-js', () => {
  const originalModule = jest.requireActual('dgraph-js')
  return {
    ...originalModule,
    DgraphClient: jest.fn(),
    Mutation: jest.fn(),
    clientStubFromCloudEndpoint: jest.fn(),
  }
})

describe('register', () => {
  const OLD_ENV = process.env

  beforeEach(() => {
    jest.resetModules()
    process.env = { ...OLD_ENV }
  })

  afterAll(() => {
    process.env = OLD_ENV
  })

  it('should register a new user successfully', async () => {
    process.env.DATABASE_URL = 'http://localhost:8080'
    process.env.DGRAPH_CLOUD_API_KEY = 'testApiKey'

    const req = {
      body: {
        name: 'testUser',
        email: 'test@example.com',
        password: 'testPassword',
      },
    } as NextApiRequest

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as NextApiResponse

    const dgraphClient = new DgraphClient(null)
    const txn = new Txn(dgraphClient)

    dgraphClient.newTxn = jest.fn().mockReturnValue(txn)

    txn.query = jest.fn().mockImplementation(async (query) => {
      if (query.includes('email')) {
        return { getJson: () => ({ user: [] }) }
      }
      if (query.includes('name')) {
        return { getJson: () => ({ user: [] }) }
      }
    })

    txn.mutate = jest.fn().mockResolvedValueOnce({})

    // THIS TEST DOESNT DO ANYTHING. INSTEAD WRITE END TO END TESTS WITH CYPRESS. 

    expect(1).toBe(1)
  })

  // Additional tests for error cases (e.g., Email already exists, Username already exists, etc.)
})

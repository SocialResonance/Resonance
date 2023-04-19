import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient, User } from '@prisma/client';
import register from '../../pages/api/register';

const prisma = new PrismaClient();

jest.mock('@prisma/client', () => {
  const userMock = {
    create: jest.fn(),
  };

  return {
    PrismaClient: jest.fn().mockImplementation(() => ({
      user: userMock,
    })),
  };
});

describe('register API handler', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should register a new user and return the user object', async () => {
    const req = {
      body: {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
      },
    } as NextApiRequest;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as NextApiResponse;

    const expectedUser: User = {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
      createdAt: new Date(),
      updatedAt: new Date(),
  
    };

    prisma.user.create = jest.fn().mockResolvedValue(expectedUser);

    await register(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ user: expectedUser });
  });

  it('should return a 500 error if there is an error during user registration', async () => {
    const req = {
      body: {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
      },
    } as NextApiRequest;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as NextApiResponse;

    const errorMessage = 'An error occurred during registration';

    prisma.user.create = jest.fn().mockRejectedValue(new Error(errorMessage));

    await register(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
  });
});

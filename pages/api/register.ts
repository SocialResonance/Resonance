import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient, User } from '@prisma/client'

// Register a new user in the database and return the user object if successful or an error message if not successful

const prisma = new PrismaClient()

const register = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    console.log('test')
    const { name, email, password } = req.body
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    })
    res.status(200).json({ user })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message })
  }
}

export default register

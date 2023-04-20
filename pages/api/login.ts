import { NextApiRequest, NextApiResponse } from 'next'

const login = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { email, password } = req.body
    console.log('email', email)
    console.log('password', password)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export default login

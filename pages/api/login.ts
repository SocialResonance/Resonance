import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';


export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { email, password } = req.body;

} catch (error) {
    res.status(500).json({ error: error.message });
  }
};
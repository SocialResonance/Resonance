import { NextApiRequest, NextApiResponse } from 'next';


// Register a new user in the database and return the user object if successful or an error message if not successful


export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    console.log("test")

} catch (error) {
    res.status(500).json({ error: error.message });
  }
};

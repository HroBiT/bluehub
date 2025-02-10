import { NextApiRequest, NextApiResponse } from 'next';
import { CreateUser } from '@/Actions/Actions';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, name, password, login } = req.body;
    try {
      await CreateUser({ email, name, password, login });
      res.status(200).json({ message: 'User created successfully' });
    } catch {
      res.status(500).json({ error: 'Failed to create user' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
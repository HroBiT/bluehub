import { NextApiRequest, NextApiResponse } from 'next';
import { Login } from '@/Actions/Actions';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { login, password } = req.body;
    try {
      const user = await Login({ login, password });
      res.status(200).json(user);
    } catch{
      res.status(401).json({ error: 'Invalid login or password' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
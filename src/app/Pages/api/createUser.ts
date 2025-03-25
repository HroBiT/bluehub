// filepath: /c:/Users/gruca/bluehub/src/pages/api/createUser.ts
import { NextApiRequest, NextApiResponse } from 'next';
import prisma  from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, name, password, login } = req.body;
    try {
      const newUser = await prisma.user.create({
        data: {
          email,
          name,
          password,
          Login: login,
        },
      });
      res.status(200).json(newUser);
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'Failed to create user' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
// filepath: /c:/Users/gruca/bluehub/src/pages/api/login.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { login, password } = req.body;
    try {
      const user = await prisma.user.findFirst({
        where: {
          Login: login,
          password: password,
        },
      });

      if (!user) {
        return res.status(401).json({ error: 'Invalid login or password' });
      }

      res.status(200).json({ login: user.Login, name: user.name, isAdmin: user.isAdmin, userId: user.id });
    } catch (error) {
      res.status(500).json({ error: 'Failed to log in' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
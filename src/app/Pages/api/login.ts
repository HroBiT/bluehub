import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/db';
import bcrypt from 'bcrypt';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { login, password } = req.body;
    try {
      const user = await prisma.user.findFirst({
        where: {
          Login: login,
        },
      });

      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ error: 'Invalid login or password' });
      }

      res.status(200).json({ login: user.Login, name: user.name, isAdmin: user.isAdmin, userId: user.id });
    } catch (error: any) {
      console.error('Login error:', error.message || error); // Loguj szczegóły błędu
      res.status(500).json({ error: 'Failed to log in', details: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
import { NextApiRequest, NextApiResponse } from 'next';
import  prisma  from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const products = await prisma.product.findMany();
      res.status(200).json(products);
    } catch {
      res.status(500).json({ error: 'Failed to get products' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
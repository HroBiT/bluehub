import { NextApiRequest, NextApiResponse } from 'next';
import { getProducts } from '@/Actions/Actions';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const products = await getProducts();
      res.status(200).json(products);
    } catch {
      res.status(500).json({ error: 'Failed to get products' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
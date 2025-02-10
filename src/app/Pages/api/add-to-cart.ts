import { NextApiRequest, NextApiResponse } from 'next';
import { AddToCart } from '@/Actions/CartActions';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { userId, productId, quantity } = req.body;
    try {
      await AddToCart({ userId, productId, quantity });
      res.status(200).json({ message: 'Product added to cart successfully' });
    } catch {
      res.status(500).json({ error: 'Failed to add product to cart' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
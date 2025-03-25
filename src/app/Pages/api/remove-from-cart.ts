import { NextApiRequest, NextApiResponse } from 'next';
import { RemoveFromCart } from '@/Actions/CartActions';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { userId, productId } = req.body;
    try {
      await RemoveFromCart(userId, productId);
      res.status(200).json({ message: 'Product removed from cart successfully' });
    } catch {
      res.status(500).json({ error: 'Failed to remove product from cart' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
} 
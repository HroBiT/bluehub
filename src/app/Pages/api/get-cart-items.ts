import { NextApiRequest, NextApiResponse } from 'next';
import { GetCartItems } from '@/Actions/CartActions';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { userId } = req.query;
    try {
      const cartItems = await GetCartItems(Number(userId));
      res.status(200).json(cartItems);
    } catch{
      res.status(500).json({ error: 'Failed to get cart items' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
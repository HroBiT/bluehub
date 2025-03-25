import { NextApiRequest, NextApiResponse } from 'next';
import  prisma  from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const products = await prisma.product.findMany();
      res.status(200).json(products);
    } catch (error) {
      console.error("Error adding product:", error); 
      res.status(500).json({ error: 'Failed to fetch products' });
    }
  } else if (req.method === 'POST') {
    const { name, description, price } = req.body;
    try {
      const addedProduct = await prisma.product.create({
        data: {
          name,
          description,
          price: parseFloat(price),
        },
      });
      res.status(201).json(addedProduct);

    } catch (error) {
      console.error("Error adding product:", error); 
      res.status(500).json({ error: 'Failed to add product' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
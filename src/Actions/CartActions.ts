

import { prisma } from "@/lib/db";

type AddToCartParams = {
  userId: number;
  productId: number;
  quantity: number;
};

type CartItem = {
  id: number;
  productId: number;
  quantity: number;
  price: number;
  product: {
    name: string;
  };
};

export async function AddToCart({ userId, productId, quantity }: AddToCartParams): Promise<void> {
  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new Error('User not found');
    }

    const product = await prisma.product.findUnique({ where: { id: productId } });
    if (!product) {
      throw new Error('Product not found');
    }

    let cart = await prisma.cart.findUnique({ where: { userId: userId } });
    if (!cart) {
      cart = await prisma.cart.create({
        data: {
          userId: userId,
        },
      });
    }

    const cartItem = await prisma.cartItem.findFirst({
      where: {
        cartId: cart.id,
        productId: productId,
      },
    });

    if (cartItem) {
      await prisma.cartItem.update({
        where: { id: cartItem.id },
        data: { quantity: cartItem.quantity + quantity },
      });
    } else {
      await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId: productId,
          quantity: quantity,
        },
      });
    }
  } catch (error) {
    console.error("Error adding to cart:", error);
    throw new Error('Failed to add to cart');
  }
}


export async function RemoveFromCart(userId: number, productId: number) {
  try {
    console.log("RemoveFromCart called with userId:", userId, "and productId:", productId);
    const product = await prisma.product.findUnique({ where: { id: productId } });
    if (!product) {
      throw new Error('Product not found');
    }

    const cart = await prisma.cart.findUnique({ where: { userId: userId } });
    if (!cart) {
      throw new Error('Cart not found');
    }

    await prisma.cartItem.deleteMany({
      where: {
        cartId: cart.id,
        productId: productId,
      },
    });

    console.log("Product removed successfully from cart");
  } catch (error) {
    console.error("Error removing from cart:", error);
    throw new Error('Failed to remove from cart');
  }
}

export async function GetCartItems(userId: number): Promise<CartItem[]> {
  const cartItems = await prisma.cartItem.findMany({
    where: { cart: { userId } },
    include: { product: true },
  });

  return cartItems.map(item => ({
    id: item.id,
    productId: item.productId,
    quantity: item.quantity,
    price: item.product.price,
    product: {
      name: item.product.name,
    },
  }));
}
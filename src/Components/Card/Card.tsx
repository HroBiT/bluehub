"use client";

import Link from "next/link";
import { AddToCart } from "@/Actions/CartActions";
import { getSession } from "@/Actions/Session";

type CardProps = {
  title: string;
  description: string;
  id: number;
  price?: number;
};

export function Card({ title, description, id, price }: CardProps) {
  const handleAddToCart = async () => {
    const session = await getSession();
    if (!session) {
      alert("Please log in to add items to the cart.");
      return;
    }

    const userId = session.UserId;
    const quantity = 1;

    try {
      await AddToCart({ userId, productId: id, quantity });
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md m-4 hover:shadow-lg transition-shadow duration-300 w-[200px]">
      <h1 className="text-2xl font-semibold text-gray-800 mb-2">{title}</h1>
      <p className="text-gray-600 mb-4">{description}</p>
      <p className="text-lg font-bold text-gray-800 mb-4">{price ? `${price.toFixed(2)} zł` : "Price not available"}</p>
      <Link href={`/Pages/Posts/${id}`}>
        <p className="text-blue-500 hover:underline mb-4 block">Read more about !</p>
      </Link>
      <button
        onClick={handleAddToCart}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
      >
        Add to Cart
      </button>
    </div>
  );
}

export default Card;
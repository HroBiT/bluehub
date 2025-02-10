"use client";

import { getSession } from "@/Actions/Session";
import { GetCartItems, RemoveFromCart } from "@/Actions/CartActions";
import { useEffect, useState } from "react";
import { CartItem, Session } from "@/types/types";

export default function CartPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    const fetchSession = async () => {
      const sessionData: Session | null = await getSession();
      console.log("Session data:", sessionData);
      setSession(sessionData);

      if (sessionData) {
        const items: CartItem[] = await GetCartItems(sessionData.UserId);
        setCartItems(items);

        const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        setTotalPrice(total);
      }
    };

    fetchSession();
  }, []);

  return (
    <div className="flex justify-center p-4 ">
      <div className="bg-white p-6 rounded-lg shadow-md text-center w-full max-w-2xl font-bold text-2xl">
        <h1>Cart of {session?.name}</h1>
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div key={item.id} className="p-4 border-b border-gray-200 flex justify-between items-center">
              <p>{item.product.name} - {item.quantity} x {item.price.toFixed(2)} zl</p>
              <button className="bg-red-700 text-white px-4 py-2 rounded hover:bg-red-800 transition duration-300" onClick={async () => {
              if (session?.UserId) {
                console.log("Removing item with id:", item.id);
                await RemoveFromCart(session.UserId, item.id);
                const updatedItems = await GetCartItems(session.UserId);
                setCartItems(updatedItems);
                const total = updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
                setTotalPrice(total);
              }
            }}>delete</button>
            </div>
          ))
        ) : (
          <p className="mt-10">No items in cart</p>
        )}
      </div>
      <div className="ml-4 h-1/4 max-w-2xl text-right bg-white p-6 rounded-lg shadow-md">
        <p className="text-xl font-semibold">Total Price: {totalPrice.toFixed(2)} zł</p>
        <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300">Proceed to Checkout</button>
      </div>
    </div>
  );
}
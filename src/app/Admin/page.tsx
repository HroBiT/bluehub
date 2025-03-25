"use client";

import { useState } from "react";

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  createdAt: Date;
  updatedAt: Date;
};

const initialProducts: Product[] = [
  { id: 1, name: "Product 1", description: "Description 1", price: 100, category: "Category 1", createdAt: new Date(), updatedAt: new Date() },
  { id: 2, name: "Product 2", description: "Description 2", price: 200, category: "Category 2", createdAt: new Date(), updatedAt: new Date() },
];

export default function AdminPage() {
  const [newProduct, setNewProduct] = useState({ name: "", description: "", price: "" });
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const price = parseFloat(newProduct.price);
    if (isNaN(price)) {
      setError("Price must be a valid number");
      return;
    }

    const addedProduct: Product = {
      id: products.length + 1,
      name: newProduct.name,
      description: newProduct.description,
      price,
      category: "New Category",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setProducts([...products, addedProduct]);
    setNewProduct({ name: "", description: "", price: "" });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Page</h1>

      <h1 className="text-xl font-semibold mb-2">Add New Product</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="mb-4 bg-white p-4 rounded-lg shadow">
        <div className="mb-2">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={newProduct.name}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Name..."
            required
          />
        </div>
        <div className="mb-2">
          <label className="block text-gray-700">Description</label>
          <textarea
            name="description"
            value={newProduct.description}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Description..."
            required
          />
        </div>
        <div className="mb-2">
          <label className="block text-gray-700">Price</label>
          <input
            type="number"
            name="price"
            value={newProduct.price}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Price..."
            required
          />
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Add Product</button>
      </form>

      <h1 className="text-xl font-semibold mb-2">Products</h1>
      <ul className="space-y-4">
        {
          products.map((product) => (
            <li key={product.id} className="bg-white border border-black p-4 rounded-lg shadow">
              <h1 className="text-lg font-semibold">{product.name}</h1>
              <p className="text-gray-700">{product.description}</p>
              <p className="text-gray-900 font-bold">{product.price} zł</p>
              <button className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Delete</button>
            </li>
          ))
        }
      </ul>
    </div>
  );
}
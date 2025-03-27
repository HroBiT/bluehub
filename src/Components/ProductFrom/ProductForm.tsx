"use client";

import { useState, useEffect } from "react";

type Product = {
  id?: number;
  name: string;
  description: string;
  price: number;
  category: string;
};

type ProductFormProps = {
  editingProduct: Product | null;
  onSave: (product: Product) => Promise<void>; // Zmieniono na funkcję asynchroniczną
  onCancel: () => void;
};

export default function ProductForm({ editingProduct, onSave, onCancel }: ProductFormProps) {
  const [formData, setFormData] = useState<Product>({
    name: "",
    description: "",
    price: 0,
    category: "",
  });

  useEffect(() => {
    if (editingProduct) {
      setFormData(editingProduct);
    } else {
      setFormData({ name: "", description: "", price: 0, category: "" });
    }
  }, [editingProduct]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave(formData); // Obsługa funkcji asynchronicznej
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 bg-white p-4 rounded-lg shadow">
      <h1 className="text-xl font-semibold mb-2">{editingProduct ? "Edit Product" : "Add Product"}</h1>
      <div className="mb-2">
        <label className="block text-gray-700">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div className="mb-2">
        <label className="block text-gray-700">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div className="mb-2">
        <label className="block text-gray-700">Price</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div className="mb-2">
        <label className="block text-gray-700">Category</label>
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        {editingProduct ? "Update Product" : "Add Product"}
      </button>
      <button
        type="button"
        onClick={onCancel}
        className="ml-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
      >
        Cancel
      </button>
    </form>
  );
}
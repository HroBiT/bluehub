"use client";

import { GetProducts, AddProductWithImage } from "@/Actions/UploadAction";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  createdAt: Date;
  updatedAt: Date;
  image?: {
    id: number;
    path: string;
    size: number;
    width: number;
    height: number;
  };
};

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await GetProducts();
        setProducts(products);
      } catch (err) {
        setError("Failed to fetch products: " + err);
      }
    };
    fetchProducts();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Pokaż podgląd obrazu
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);
      const addedProduct = await AddProductWithImage(formData);
      setProducts([...products, addedProduct]);
      
      // Resetuj formularz i podgląd obrazu
      formRef.current?.reset();
      setImagePreview(null);
    } catch (err: any) {
      setError("Failed to add product: " + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Page</h1>

      <h1 className="text-xl font-semibold mb-2">Add New Product</h1>
      {error && <p className="text-red-500">{error}</p>}
      
      <form 
        ref={formRef}
        onSubmit={handleSubmit} 
        className="mb-4 bg-white p-4 rounded-lg shadow"
      >
        <div className="mb-2">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Name..."
            required
          />
        </div>
        
        <div className="mb-2">
          <label className="block text-gray-700">Description</label>
          <textarea
            name="description"
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
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Price..."
            required
          />
        </div>
        
        <div className="mb-2">
          <label className="block text-gray-700">Category</label>
          <input
            type="text"
            name="category"
            defaultValue="Electronics"
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Category..."
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700">Product Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
          
          {imagePreview && (
            <div className="mt-2">
              <p className="text-sm text-gray-600 mb-1">Image Preview:</p>
              <div className="relative h-48 w-48 border border-gray-300">
                <Image 
                  src={imagePreview} 
                  alt="Preview" 
                  fill 
                  className="object-contain"
                />
              </div>
            </div>
          )}
        </div>
        
        <button 
          type="submit" 
          disabled={isSubmitting}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
        >
          {isSubmitting ? "Adding..." : "Add Product"}
        </button>
      </form>

      <h1 className="text-xl font-semibold mb-2">Products</h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <li key={product.id} className="bg-white border border-gray-200 p-4 rounded-lg shadow">
            {product.image && (
              <div className="relative h-48 w-full mb-3">
                <Image 
                  src={product.image.path} 
                  alt={product.name}
                  fill
                  className="object-contain rounded"
                />
              </div>
            )}
            <h1 className="text-lg font-semibold">{product.name}</h1>
            <p className="text-gray-700">{product.description}</p>
            <p className="text-gray-900 font-bold">{product.price} zł</p>
            <div className="text-sm text-gray-500 mt-1">Category: {product.category}</div>
            <button className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

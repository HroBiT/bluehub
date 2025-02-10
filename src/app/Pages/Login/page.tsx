"use client";

import { useState, useEffect } from "react";
import { Login } from "@/Actions/Actions";
import { useRouter } from 'next/navigation';
import { setSession } from '@/Actions/Session';

export default function LoginPage() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const user = await Login({ login, password });
      alert("User logged in successfully!");
      setSession({ login: user.login ?? "", name: user.name ?? "" });
      if (isClient) {
        router.push('/');
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setError("Failed to log in.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-4 text-center">Strona logowania</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <p className="text-red-500">{error}</p>}
        <input
          type="text"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          placeholder="Login"
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Hasło"
          className="w-full p-2 border border-gray-300 rounded"
        />
        <button
          type="submit"
          className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Zaloguj się
        </button>
      </form>
    </div>
  );
}
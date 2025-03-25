"use client";
//:) 

import { useState } from "react";
import { Login } from "@/Actions/Actions";
import { useRouter } from 'next/navigation';
import { setSession } from '@/Actions/Session';


export default function LoginPage() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError(""); // Resetujemy błąd przed próbą logowania

    try {
      const user = await Login({ login, password, isAdmin: false });
      alert("User logged in successfully!");
      setSession({ UserId: user.userId ,login: user.login ?? "", name: user.name ?? "", isAdmin: user.isAdmin ?? false });
      if (typeof window !== "undefined") {
        router.push('/');
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setError("Failed to log in. Please check your login credentials and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-4 text-center">Strona logowania</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <p className="text-red-500 text-center">{error}</p>}
        <input
          type="text"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          placeholder="Login"
          className="w-full p-2 border border-gray-300 rounded"
          aria-label="Login"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Hasło"
          className="w-full p-2 border border-gray-300 rounded"
          aria-label="Hasło"
        />
        <button
          type="submit"
          className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? "Logowanie..." : "Zaloguj się"}
        </button>
      </form>
    </div>
  );
}

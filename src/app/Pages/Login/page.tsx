"use client";

import { useState, useEffect } from "react";
<<<<<<< HEAD
import { useRouter } from "next/navigation";
=======
import { useRouter } from 'next/navigation';
import { setSession } from '@/Actions/Session';
>>>>>>> 65898da838e4c6c9417c1e0aef32b6ab1833c9d2

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
<<<<<<< HEAD
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Błąd logowania");
        return;
=======
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ login, password }),
      });

      if (!response.ok) {
        throw new Error('Invalid login or password');
      }

      const user = await response.json();
      alert("User logged in successfully!");
      setSession({ UserId: user.userId, login: user.login ?? "", name: user.name ?? "", isAdmin: user.isAdmin ?? false });
      if (isClient) {
        router.push('/');
>>>>>>> 65898da838e4c6c9417c1e0aef32b6ab1833c9d2
      }

      console.log("Zalogowano:", data);

      router.push("/");
    } catch (err) {
      setError("Wystąpił błąd. Spróbuj ponownie.");
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

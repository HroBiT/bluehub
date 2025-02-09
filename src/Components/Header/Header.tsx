"use client";
import { useEffect, useState } from "react";
import { getSession, clearSession } from '@/Actions/Session';
import Link from "next/link";

export function Header() {
  interface Session {
    login: string;
    name: string;
  }

  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const sessionData = getSession();
    setSession(sessionData);
  }, []);

  const handleLogout = () => {
    clearSession();
    setSession(null);
  };

  return (
    <div className="flex justify-between items-center p-4 bg-gray-800 text-white sticky">
      <h1 className="text-2xl font-bold">Blue<span className="text-blue-500">Hub</span></h1> 
      {session ? (
        <div className="flex items-center space-x-4"> 
          <p>Welcome, {session.login}!</p> 
          <button 
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
            onClick={handleLogout}
          >
            Log out
          </button>
        </div>
      ) : (
        <div className="flex items-center space-x-4">
          <Link href="/Pages/Login">
            <p className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">Log in</p>
          </Link>
          <Link href="/Pages/Register">
            <p className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">Register</p>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Header;
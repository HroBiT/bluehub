"use client";
import { useEffect, useState } from "react";
import { getSession, clearSession } from '@/Actions/Session';
import Link from "next/link";

export function Header() {
  interface Session {
    login: string;
    name: string;
    isAdmin: boolean;
  }

  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const sessionData = getSession();
    console.log("Session data:", sessionData);
    setSession(sessionData);
  }, []);

  const handleLogout = () => {
    clearSession();
    setSession(null);
  };

  return (
    <div className="flex justify-between items-center p-4 bg-gray-800 text-white sticky rounded-xl shadow-2xl mt-5 ml-5 mr-5">
      <Link href={"/"}><h1 className="ml-10 text-2xl font-bold">Blue<span className="text-blue-500">Hub</span></h1> </Link>
      {session ? (
        <div className="flex items-center space-x-4 mr-10"> 
          <p>Welcome, {session.name}!</p> 
          {session.isAdmin && (
            <Link href="/Admin">
              <p className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition">Admin Panel</p>
            </Link>
          )}
          <Link href="/Users/Cart">
            <p className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">Cart</p>
          </Link>
          <button 
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
            onClick={handleLogout}
          >
            Log out
          </button>
        </div>
      ) : (
        <div className="flex items-center space-x-4">
          <Link href="/Users/Login">
            <p className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">Log in</p>
          </Link>
          <Link href="/Users/Register">
            <p className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">Register</p>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Header;
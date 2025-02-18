// filepath: /c:/Users/gruca/bluehub/src/app/Pages/Register/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

const RegisterPage = () => {
    const [email, setEmail] = useState("");
    const [login, setLogin] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await fetch('/api/createUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, login, name, password }),
            });

            if (!response.ok) {
                const errorData = await response.text();
                console.error('Error response:', errorData);
                throw new Error('Failed to register user');
            }

            const userData = await response.json();
            console.log('User registered successfully:', userData);
            router.push("/Pages/Login");
        } catch (error) {
            console.error("Error registering user:", error);
            alert("Failed to register user.");
        }
    };

    return (
        <div className="mx-auto p-6 flex justify-center items-center h-screen">
            <div className="w-1/2 font-bold mb-4 bg-white border border-black justify-center p-10 rounded-xl flex flex-col">
                <h1 className="text-2xl font-bold justify-center">Register Form</h1>
                <form onSubmit={handleSubmit} className="space-y-4 flex md:flex-col pt-10">
                    <input
                        type="text"
                        className="p-2 border-black rounded-xl border"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="text"
                        className="p-2 border-black rounded-xl border"
                        placeholder="Login"
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                    />
                    <input
                        type="text"
                        className="p-2 border-black rounded-xl border"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type="password"
                        className="p-2 border-black rounded-xl border"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className="justify-center bg-blue-600 p-2 text-white rounded hover:bg-blue-700">
                        Sign up
                    </button>
                </form>
            </div>
        </div>
    );
};

export default dynamic(() => Promise.resolve(RegisterPage), { ssr: false });
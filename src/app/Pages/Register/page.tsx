"use client";


import { useState } from "react";
import { CreateUser } from "@/Actions/Actions";

export default function RegisterPage() {
    const [email, setEmail] = useState("");
    const [login, setLogin] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            await CreateUser({ email, login, name, password });
            alert("User registered successfully!");
        } catch (error) {
            console.error("Error registering user:", error);
            alert("Failed to register user.");
        }
    };

    return (
        <div className="mx-auto p-6 bg-white flex justify-center items-center h-screen">
            <div className="w-1/2 font-bold mb-4 border border-black justify-center p-10 rounded-xl flex flex-col">
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
}
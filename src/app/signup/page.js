"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    if (!res.ok) {
      const { message } = await res.json();
      setError(message || "Registration failed.");
    } else {
      router.push("/login");
    }
  };

  return (
    <div className="mt-40 p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Register new account</h1>
      <p className="text-sm">
        Already have an account ?
        <Link href="/login" className="ml-1 text-blue-600 hover:underline">
          Sign In
        </Link>
      </p>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          Name
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-1 w-full border rounded px-2 py-1"
          />
        </label>
        <label className="block">
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 w-full border rounded px-2 py-1"
          />
        </label>
        <label className="block">
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 w-full border rounded px-2 py-1"
          />
        </label>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-green-600 text-white rounded"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}

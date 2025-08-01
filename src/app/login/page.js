"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res.error) {
      setError("Login failed. Please check your email and password.");
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="mt-40 p-8 max-w-sm mx-auto">
      <h1 className="text-2xl mb-4">Login</h1>
      <p className="text-sm">
        Without an account ?
        <Link href="/signup" className="ml-1 text-blue-600 hover:underline">
          Sign Up
        </Link>
      </p>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full border rounded px-2 py-1"
            required
          />
        </label>
        <label className="block">
          password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full border rounded px-2 py-1"
            required
          />
        </label>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-600 text-white rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
}

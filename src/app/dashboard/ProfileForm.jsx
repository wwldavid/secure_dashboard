"use client";
import { useState } from "react";
import escapeHTML from "escape-html";

export default function ProfileForm({ privateData }) {
  const [form, setForm] = useState(privateData);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (!res.ok) {
      const body = await res.json();
      setError(body.errors?.map((e) => e.msg).join(";") || "unknown error");
    } else {
      alert("successfully updated!");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="text-red-400">{error}</div>}
      <label className="block">
        Name:
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          className="mt-1 w-full border rounded px-2 py-1"
        />
      </label>
      <label className="block">
        Email:
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          className="mt-1 w-full border rounded px-2 py-1"
        />
      </label>
      <label className="block">
        Introduction:
        <Textarea
          name="bio"
          value={form.bio}
          onChange={handleChange}
          className="mt-1 w-full border rounded px-2 py-1"
          rows={8}
        />
      </label>
      <button type="submit" className="px-4 py-2 bg-[#6e7955] text-white">
        Save
      </button>
    </form>
  );
}

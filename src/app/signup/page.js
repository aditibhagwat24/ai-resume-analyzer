"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
        setLoading(false);
        return;
      }

      router.push("/signin");
    } catch (err) {
      setError("something is wrong please try again");
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="max-w-md w-full bg-white border border-[#16213E]/10 p-8 rounded-2xl space-y-5"
      >
        <div className="text-center mb-2">
          <p className="text-xs tracking-widest uppercase text-[#16213E]/50 mb-1">
            Get started
          </p>
          <h1 className="font-display text-3xl font-semibold text-[#16213E]">
            Create Account
          </h1>
        </div>

        {error && (
          <div className="bg-[#D64545]/10 text-[#D64545] p-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <div>
          <label className="block text-xs tracking-wide uppercase text-[#16213E]/60 mb-2">
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full text-sm border border-[#16213E]/15 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#E8A33D]/50"
          />
        </div>

        <div>
          <label className="block text-xs tracking-wide uppercase text-[#16213E]/60 mb-2">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full text-sm border border-[#16213E]/15 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#E8A33D]/50"
          />
        </div>

        <div>
          <label className="block text-xs tracking-wide uppercase text-[#16213E]/60 mb-2">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full text-sm border border-[#16213E]/15 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#E8A33D]/50"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#16213E] text-white py-3 rounded-full font-medium hover:bg-[#16213E]/90 disabled:opacity-50 transition-colors"
        >
          {loading ? "Creating account..." : "Sign Up"}
        </button>

        <p className="text-sm text-center text-[#16213E]/60">
          Already have an account?{" "}
          <Link href="/signin" className="text-[#16213E] font-medium hover:underline">
            Sign In
          </Link>
        </p>
      </form>
    </main>
  );
}
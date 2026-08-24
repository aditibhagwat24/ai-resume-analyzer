"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError("Invalid email or password");
      return;
    }

    router.push("/");
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white border border-[#16213E]/10 p-8 rounded-2xl space-y-5">
        <div className="text-center mb-2">
          <p className="text-xs tracking-widest uppercase text-[#16213E]/50 mb-1">
            Welcome back
          </p>
          <h1 className="font-display text-3xl font-semibold text-[#16213E]">
            Sign In
          </h1>
        </div>

        {error && (
          <div className="bg-[#D64545]/10 text-[#D64545] p-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
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
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-[#16213E]/10" />
          <span className="text-xs text-[#16213E]/40 uppercase tracking-wide">
            or
          </span>
          <div className="flex-1 h-px bg-[#16213E]/10" />
        </div>

        <button
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="w-full border border-[#16213E]/15 py-3 rounded-full hover:bg-[#16213E]/5 transition-colors text-sm font-medium text-[#16213E]"
        >
          Continue with Google
        </button>

        <p className="text-sm text-center text-[#16213E]/60">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-[#16213E] font-medium hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </main>
  );
}

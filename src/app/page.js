"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import UploadForm from "@/components/UploadForm";

export default function Home() {
  const { data: session, status } = useSession();

  return (
    <main className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-xl mx-auto flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">AI Resume Analyzer</h1>

        {status === "loading" ? (
          <span className="text-sm text-gray-500">Loading...</span>
        ) : session ? (
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-700">
              {session.user.name || session.user.email}
            </span>
            <button
              onClick={() => signOut()}
              className="text-sm bg-red-500 text-white px-3 py-1.5 rounded-md hover:bg-red-600"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <Link
            href="/signin"
            className="text-sm bg-indigo-600 text-white px-3 py-1.5 rounded-md hover:bg-indigo-700"
          >
            Sign In
          </Link>
        )}
      </div>

      <UploadForm />
    </main>
  );
}
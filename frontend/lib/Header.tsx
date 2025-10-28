"use client";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FaUser } from "react-icons/fa6";

export default function Header() {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <header className="flex flex-row items-center justify-between border-b py-5 w-full border-gray-400">
      <h2 className="font-bold text-blue-500 ml-5 text-xl">TodoApp</h2>

      <div className="flex flex-row items-center gap-5 mr-5">
        <span className="text-gray-500 font-semibold">Todos</span>
        <FaUser className="text-gray-700" />

        {session ? (
          <>
            <span className="text-gray-700">{session.user?.name}</span>
            <button
              onClick={() => signOut()}
              className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Sign out
            </button>
          </>
        ) : (
          <button
            onClick={() => router.push("/login")}
            className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Sign in
          </button>
        )}
      </div>
    </header>
  );
}

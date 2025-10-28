"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleCredentialsLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await signIn("credentials", {
      email,
      password,
      redirect: true,
      callbackUrl: "/todos",
    });
  };

  return (
    <div className="flex flex-col items-center justify-center h-[80vh] space-y-6">
      <h1 className="text-2xl font-bold">Login</h1>

      <form
        onSubmit={handleCredentialsLogin}
        className="flex flex-col gap-3 w-72"
      >
        <input
          type="email"
          placeholder="Email"
          className="border p-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white rounded p-2 border-2 border-gray-700 hover:bg-blue-700"
        >
          Login with Credentials
        </button>
      </form>

      <hr className="w-96 font-light text-gray-300" />

      <div className="flex flex-col gap-3 md:flex-row">
        <button
          onClick={() => signIn("github", { callbackUrl: "/todos" })}
          className="bg-green-600 text-white p-2 rounded border-2 border-gray-700"
        >
          Login with GitHub
        </button>

        <button
          onClick={() => signIn("google", { callbackUrl: "/todos" })}
          className="bg-green-600 text-white p-2 rounded border-2 border-gray-700"
        >
          Login with Google
        </button>
      </div>

      <hr className="w-96 font-light text-gray-300" />

      <button
        className="bg-blue-600 text-white p-2 rounded w-72 border-2 border-gray-700"
        onClick={() => router.push("/register")}
      >
        Register
      </button>
    </div>
  );
}

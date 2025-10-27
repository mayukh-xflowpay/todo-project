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
          className="bg-blue-600 text-white rounded p-2 hover:bg-blue-700"
        >
          Login with Credentials
        </button>
      </form>

      <button
        onClick={() => signIn("github", { callbackUrl: "/todos" })}
        className="bg-gray-800 text-white p-2 rounded"
      >
        Login with GitHub
      </button>

      <button onClick={() => router.push("/register")}>Register</button>
    </div>
  );
}

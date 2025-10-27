import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center h-[80vh] bg-gradient-to-br from-sky-50 to-white text-center rounded-lg">
      <div className="max-w-md w-full bg-white shadow-md border border-gray-200 rounded-xl p-8 transition-transform hover:scale-[1.01]">
        <h1 className="text-3xl font-semibold text-gray-800 mb-3">
          Welcome Back!
        </h1>
        <p className="text-gray-600 mb-6">
          Organize your day efficiently with TodoApp
          <br />
          Track your tasks, stay on schedule, and get things done effortlessly.
        </p>

        <Link
          href="/todos"
          className="inline-block bg-blue-500 text-white font-medium px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors shadow-sm"
        >
          Go to Todos
        </Link>
      </div>
    </main>
  );
}

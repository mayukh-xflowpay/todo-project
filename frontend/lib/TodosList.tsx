"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaEye, FaPen } from "react-icons/fa";
import Paginator from "@/lib/Paginator";
import Search from "@/lib/search";
import NoTodos from "@/lib/noTodos";
import { Todo } from "@/lib/interfacesAndTypes/todo.interface";
import getListTodos from "@/hooks/useListTodos";
import { Session } from "next-auth";

export default function TodosList({
  initialData,
  session,
}: {
  initialData: any;
  session: Session;
}) {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [data, setData] = useState(initialData);
  const isFirstRender = useRef(true);
  const take = 6;
  const skip = (page - 1) * take;

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return; // Skip first render
    }

    const fetchTodos = async () => {
      setLoading(true);
      try {
        const res = await getListTodos({
          skip,
          take,
          search: debouncedSearch,
          session,
        });
        setData(res);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, [skip, take, debouncedSearch]);

  if (loading) return <p>Loading</p>;

  const totalTodos = data?.total || 0;

  if (totalTodos === 0)
    return (
      <div className="p-6">
        <div className="flex flex-col justify-between items-center mb-6 gap-3">
          <h1 className="text-3xl font-semibold text-gray-800 w-[100%]">
            My Todos
          </h1>
          <NoTodos />
        </div>
      </div>
    );

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-3">
        <h1 className="text-3xl font-semibold text-gray-800">My Todos</h1>
        <div className="flex gap-3 w-full sm:w-auto">
          <Search
            setSearch={setDebouncedSearch}
            setPage={setPage}
            searchVal={debouncedSearch}
          />
          <Link href={"/todos/create"}>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
              + New Todo
            </button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data?.todos.map((todo: Todo) => (
          <div
            key={todo.id}
            className="border border-gray-200 rounded-lg p-5 shadow-sm bg-white hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                {todo.title}
              </h3>
              <p className="text-gray-600 mt-1 mb-3">
                {todo.description
                  ? todo.description.length > 50
                    ? todo.description.slice(0, 45) + "..."
                    : todo.description
                  : "No description"}
              </p>
            </div>

            <div className="flex justify-between items-center mt-auto">
              <span
                className={`text-sm px-3 py-1 rounded-full font-medium ${
                  todo.completed
                    ? "bg-green-100 text-green-700"
                    : "bg-orange-100 text-orange-700"
                }`}
              >
                {todo.completed ? "Complete" : "Pending"}
              </span>

              <div className="flex gap-3">
                <button
                  onClick={() => router.push(`/todos/${todo.id}`)}
                  className="p-2 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  <FaEye size={14} />
                </button>
                <button
                  onClick={() => router.push(`/todos/${todo.id}/edit`)}
                  className="p-2 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  <FaPen size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-center">
        <Paginator
          currentPage={page}
          totalPages={Math.ceil(totalTodos / take)}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}

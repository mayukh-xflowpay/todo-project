"use client";
import useListTodos from "@/hooks/useListTodos";
import { Todo } from "@/lib/interfacesAndTypes/todo.interface";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Paginator from "@/lib/Paginator";
import Search from "@/lib/search";

export default function Todos() {
  const router = useRouter();
  const take = 6;
  const [page, setPage] = useState(1);
  // const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const skip = (page - 1) * take;

  const { data, isPending, isError, error } = useListTodos(
    skip,
    take,
    debouncedSearch
  );

  const totalTodos = data?.total || 0;

  useEffect(() => {
    console.log(debouncedSearch);
  }, [debouncedSearch]);

  if (isPending) return <h3>Loading Todos...</h3>;
  if (isError) return <h3>Unexpected error: {error.message}</h3>;

  return (
    <div>
      <Search setSearch={setDebouncedSearch} setPage={setPage} />
      <Link href={"/todos/create"}>
        <button>Create New Todo</button>
      </Link>
      {data.todos.map((todo: Todo) => (
        <div
          key={"todo" + todo.id}
          onClick={() => router.push(`/todos/${todo.id!}`)}
        >
          <h3>{todo.title}</h3>
          <p>{todo.completed ? "Completed" : "Ongoing"}</p>
          {todo.description && (
            <p>
              {todo.description.length > 40
                ? todo.description.slice(0, 20) + "..."
                : todo.description}
            </p>
          )}
        </div>
      ))}
      <Paginator
        currentPage={page}
        totalPages={Math.ceil(totalTodos / take)}
        onPageChange={setPage}
      />
    </div>
  );
}

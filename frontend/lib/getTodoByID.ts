import { useQuery } from "@tanstack/react-query";

async function fetchTodo(todoID: string) {
  const res = await fetch("http://localhost:3000/todos/" + todoID, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Something went wrong");
  }
  return res.json();
}

export function getTodoByID(todoID: string) {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["todos", todoID],
    queryFn: async ({ queryKey }) => await fetchTodo(queryKey[1] as string),
    // queryFn: () => fetchTodo(todoID),
  });
  return { isPending, isError, data, error };
}

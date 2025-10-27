// import { useQuery } from "@tanstack/react-query";
import { Session } from "next-auth";

export async function fetchTodo(todoID: string, session: Session) {
  // console.log(session);
  const res = await fetch("http://localhost:3000/todos/" + todoID, {
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${session.user.accessToken}`,
    },
  });
  if (!res.ok) {
    throw new Error("Something went wrong");
  }
  return res.json();
}

// export function getTodoByID(todoID: string) {
//   const { isPending, isError, data, error } = useQuery({
//     queryKey: ["todos", todoID],
//     queryFn: async ({ queryKey }) => await fetchTodo(queryKey[1] as string),
//     // queryFn: () => fetchTodo(todoID),
//   });
//   return { isPending, isError, data, error };
// }

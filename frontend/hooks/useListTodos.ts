"use client";
import client from "@/lib/graphql/client";
import { LIST_TODOS } from "@/lib/graphql/operations";
import { useQuery } from "@tanstack/react-query";

export default function useListTodos(
  skip?: number,
  take?: number,
  search?: string
) {
  return useQuery({
    queryKey: ["todos", skip, take, search],
    queryFn: async () => {
      // console.log("Getting todos...(queryFn for useListTodos)");
      const data = await client.request(LIST_TODOS, {
        skip: skip || 0,
        take: take || 6,
        search: search || "",
      });
      return data.listTodos;
    },
  });
}

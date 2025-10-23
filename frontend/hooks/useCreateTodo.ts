"use client";
import { CREATE_TODO } from "@/lib/graphql/operations";
import client from "@/lib/graphql/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FormTodo } from "@/lib/interfacesAndTypes/formData.type";

export default function useCreateTodo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: FormTodo) => {
      const res = await client.request(CREATE_TODO, { input: data });
      return res;
    },
    mutationKey: ["todos", "create"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
}

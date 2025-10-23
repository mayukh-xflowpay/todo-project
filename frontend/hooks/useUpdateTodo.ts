"use client";
import { useMutation } from "@tanstack/react-query";
import updateTodo from "@/lib/updateTodo";
import { useQueryClient } from "@tanstack/react-query";

export default function useUpdateTodo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: (error: Error) => {
      console.error("Update Todo Error:", error.message);
    },
  });
}

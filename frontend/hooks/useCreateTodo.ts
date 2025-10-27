// "use client";
import { CREATE_TODO } from "@/lib/graphql/operations";
import client from "@/lib/graphql/client";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FormTodo } from "@/lib/interfacesAndTypes/formData.type";
import { Session } from "next-auth";

export function useCreateTodo(session: Session) {
  client.setHeader("authorization", `Bearer ${session.user.accessToken}`);
  return async function handleCreate(data: FormTodo) {
    "use server";
    const res = await client.request(CREATE_TODO, { input: data });
    return res;
  };
}

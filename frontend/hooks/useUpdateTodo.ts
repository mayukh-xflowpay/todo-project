// "use client";
// import { useMutation } from "@tanstack/react-query";
// import updateTodo from "@/lib/updateTodo";
// import { useQueryClient } from "@tanstack/react-query";
import { Session } from "next-auth";

export default function useUpdateTodo(session: Session, todoID: string) {
  const handleMutate = async (formValues: any) => {
    "use server";
    const res = await fetch(`http://localhost:3000/todos/${todoID}`, {
      method: "PUT",
      body: JSON.stringify(formValues),
      headers: {
        Authorization: `Bearer ${session.user.accessToken}`,
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) throw new Error("Something went wrong");
    return res.json();
  };
  return handleMutate;
}

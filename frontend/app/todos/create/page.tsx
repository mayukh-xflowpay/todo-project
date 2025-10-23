"use client";
import useCreateTodo from "@/hooks/useCreateTodo";
import Form from "@/lib/form";
import Link from "next/link";

export default function CreateTodo() {
  const { mutateAsync, isError, isPending, error } = useCreateTodo();

  return (
    <>
      {Form(mutateAsync, isPending)}
      <Link href={"/todos"}>Back to all todos</Link>
    </>
  );
}

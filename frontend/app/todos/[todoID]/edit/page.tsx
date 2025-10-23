"use client";
import { useParams } from "next/navigation";
import Form from "@/lib/form";
import useUpdateTodo from "@/hooks/useUpdateTodo";
import { getTodoByID } from "@/lib/getTodoByID";
import Link from "next/link";

export default function UpdateTodo() {
  const params = useParams();
  const todoID = params?.todoID as string;

  const {
    data: todo,
    isPending: isLoading,
    isError,
    error,
  } = getTodoByID(todoID);

  const { mutateAsync, isPending: isMutating } = useUpdateTodo();

  if (isLoading) return <p>Loading todo...</p>;
  if (isError) return <p>Error: {error!.message}</p>;
  if (!todo) return <p>Todo not found</p>;

  const handleMutate = (formValues: any) =>
    mutateAsync({ id: todoID, data: formValues });

  const formData = {
    title: todo.title,
    description: todo.description,
    completed: todo.completed,
  };

  return (
    <>
      {Form(handleMutate, isMutating, formData)}
      <Link href={"/todos"}>Back to all todos</Link>
      <Link href={`/todos/${todoID}`}>Cancel editing</Link>
    </>
  );
}

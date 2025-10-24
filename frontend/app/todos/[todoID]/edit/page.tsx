"use client";
import { useParams } from "next/navigation";
import Form from "@/lib/form";
import useUpdateTodo from "@/hooks/useUpdateTodo";
import { getTodoByID } from "@/lib/getTodoByID";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

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

  if (isLoading)
    return <p className="text-center text-gray-600 mt-10">Loading todo...</p>;
  if (isError)
    return (
      <p className="text-center text-red-600 mt-10">Error: {error!.message}</p>
    );
  if (!todo)
    return <p className="text-center text-gray-600 mt-10">Todo not found</p>;

  const handleMutate = (formValues: any) =>
    mutateAsync({ id: todoID, data: formValues });

  const formData = {
    title: todo.title,
    description: todo.description,
    completed: todo.completed,
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 px-4">
      <Link
        href={`/todos/${todoID}`}
        className="inline-flex items-center text-blue-600 hover:underline mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Todo
      </Link>

      <h1 className="text-3xl font-bold mb-6">Edit Todo</h1>

      <Form
        mutateAsync={handleMutate}
        isPending={isMutating}
        defaultData={formData}
        mode="edit"
      />
    </div>
  );
}

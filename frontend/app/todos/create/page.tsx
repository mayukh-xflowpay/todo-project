"use client";
import useCreateTodo from "@/hooks/useCreateTodo";
import Form from "@/lib/form";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

export default function CreateTodo() {
  const { mutateAsync, isError, isPending, error } = useCreateTodo();

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <Link
        href={"/todos"}
        className="text-blue-600 hover:underline flex items-center gap-2 mb-5"
      >
        <FaArrowLeft size={14} /> Back to Todos
      </Link>

      <Form mutateAsync={mutateAsync} isPending={isPending} mode="edit" />

      {isError && (
        <p className="text-red-600 text-sm mt-4 text-center">
          Unexpected error: {error.message}
        </p>
      )}
    </div>
  );
}

// "use client";
// import useCreateTodo from "@/hooks/useCreateTodo";
import Form from "@/lib/form";
// import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import { useCreateTodo } from "@/hooks/useCreateTodo";
import LinkComponent from "@/lib/LinkComponent";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";

export default async function CreateTodo() {
  // const { mutateAsync, isError, isPending, error } = useCreateTodo();
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");
  const handleCreate = useCreateTodo(session);

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <LinkComponent
        href={"/todos"}
        className="text-blue-600 hover:underline flex items-center gap-2 mb-5"
      >
        <FaArrowLeft size={14} /> Back to Todos
      </LinkComponent>

      <Form handleMutate={handleCreate} />
    </div>
  );
}

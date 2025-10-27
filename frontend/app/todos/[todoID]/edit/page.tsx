// import { useParams } from "next/navigation";
import Form from "@/lib/form";
import useUpdateTodo from "@/hooks/useUpdateTodo";
import { fetchTodo } from "@/lib/getTodoByID";
import LinkComponent from "@/lib/LinkComponent";
import { ArrowLeft } from "lucide-react";
import { getServerSession } from "next-auth";
import { notFound, redirect } from "next/navigation";
import { authOptions } from "@/lib/authOptions";

export default async function UpdateTodo({
  params,
}: {
  params: Promise<{ todoID: string }>;
}) {
  const session = await getServerSession(authOptions);
  const { todoID } = await params;

  if (!session) redirect("/login");

  const todo = await fetchTodo(todoID, session);

  if (!todo) return notFound();

  // const { mutateAsync, isPending: isMutating } = useUpdateTodo();
  const handleMutate = useUpdateTodo(session, todoID);

  // if (isLoading)
  //   return <p className="text-center text-gray-600 mt-10">Loading todo...</p>;
  // if (isError)
  //   return (
  //     <p className="text-center text-red-600 mt-10">Error: {error!.message}</p>
  //   );
  // if (!todo)
  //   return <p className="text-center text-gray-600 mt-10">Todo not found</p>;

  // mutateAsync({ id: todoID, data: formValues });

  const formData = {
    title: todo.title,
    description: todo.description,
    completed: todo.completed,
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 px-4">
      <LinkComponent
        href={`/todos/${todoID}`}
        className="inline-flex items-center text-blue-600 hover:underline mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Todo
      </LinkComponent>

      <h1 className="text-3xl font-bold mb-6">Edit Todo</h1>

      <Form handleMutate={handleMutate} defaultData={formData} mode="edit" />
    </div>
  );
}

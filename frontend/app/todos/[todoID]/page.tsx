import React from "react";
import { fetchTodo } from "@/lib/getTodoByID";
import { redirect } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import LinkComponent from "@/lib/LinkComponent";

export default async function ViewTodo({
  params,
}: {
  params: Promise<{ todoID: string }>;
}) {
  const session = await getServerSession(authOptions);
  // const params = useParams();
  const { todoID } = await params;
  if (!session) redirect("/login");

  const data = await fetchTodo(todoID, session);

  // if (isPending) return <p className="text-center mt-10">Loading...</p>;
  // if (isError)
  //   return (
  //     <p className="text-center mt-10 text-red-600">
  //       Error occurred: {error?.message ?? "Unknown error"}
  //     </p>
  //   );

  const createdAt = new Date(data.createdAt).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  const updatedAt = new Date(data.updatedAt).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <LinkComponent
        href="/todos"
        className="text-blue-600 hover:underline flex items-center gap-2 mb-6"
      >
        <FaArrowLeft size={14} /> Back to Todos
      </LinkComponent>

      <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 relative">
        <div className="flex justify-between items-start mb-4">
          <h1 className="text-2xl font-semibold text-gray-900 leading-tight">
            {data.title}
          </h1>

          <LinkComponent
            href={`/todos/${todoID}/edit`}
            className="bg-blue-500 text-white text-sm px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Edit
          </LinkComponent>
        </div>

        <span
          className={`inline-block text-sm font-medium px-3 py-1 rounded-full mb-4 ${
            data.completed
              ? "bg-green-100 text-green-700"
              : "bg-orange-100 text-orange-700"
          }`}
        >
          {data.completed ? "Complete" : "Pending"}
        </span>

        {data.description && (
          <p className="text-gray-700 leading-relaxed mb-6">
            {data.description}
          </p>
        )}

        <hr className="border-gray-200 mb-4" />

        <div className="text-sm text-gray-500 flex flex-wrap gap-4">
          <p>
            <span className="font-medium">Created:</span> {createdAt}
          </p>
          <p>
            <span className="font-medium">Updated:</span> {updatedAt}
          </p>
        </div>
      </div>
    </div>
  );
}

"use client";
import React from "react";
import Link from "next/link";
import { getTodoByID } from "@/lib/getTodoByID";
import { useParams } from "next/navigation";

export default function ViewTodo() {
  const params = useParams();
  const todoID = params.todoID as string;

  const { isPending, isError, data, error } = getTodoByID(todoID);
  if (isPending) {
    return <div> Loading</div>;
  }
  if (isError) {
    return <div>Error occurred: {error?.message ?? "Unknown error"}</div>;
  }
  return (
    <div key={data.id}>
      <h3>{data.title}</h3>
      {data.description && (
        <p>
          <strong>Description: </strong>
          {data.description}
        </p>
      )}
      <p>
        <strong>Completion Status: </strong>
        {data.completed ? "Completed" : "Not completed"}{" "}
      </p>
      <p>
        <strong>Created at:</strong>
        {data.createdAt}
      </p>
      <p>
        <strong>Updated at:</strong>
        {data.updatedAt}
      </p>
      <Link href={`/todos/${todoID}/edit`}>Edit Todo</Link>
      <Link href={"/todos"}>Back to All Todos</Link>
    </div>
  );
}

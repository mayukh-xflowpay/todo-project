import { FormTodo } from "./interfacesAndTypes/formData.type";
import { Todo } from "./interfacesAndTypes/todo.interface";

export default async function updateTodo({
  id,
  data,
}: {
  id: string;
  data: FormTodo;
}): Promise<Todo> {
  const res = await fetch(`/todos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Something went wrong");

  return res.json();
}

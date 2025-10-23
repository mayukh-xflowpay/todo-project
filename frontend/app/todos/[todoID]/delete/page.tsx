import { useParams } from "next/navigation";

export default function DeleteTodo() {
  const params = useParams();
  const todoID = params.todoID as string;

  return <h1>Delete todo page for {todoID}</h1>;
}

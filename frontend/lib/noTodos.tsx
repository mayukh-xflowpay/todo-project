import Image from "next/image";
import Link from "next/link";
import TodosImage from "@/public/todos.png";

export default function NoTodos() {
  return (
    <div className="flex flex-col items-center">
      <Image src={TodosImage} width={500} height={500} alt="Todos Image" />
      <h3 className="text-lg font-semibold mb-2">No todos yet</h3>
      <p>Create your first todo to get started</p>
      <Link href="/todos/create">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mt-2">
          + Create Todo
        </button>
      </Link>
    </div>
  );
}

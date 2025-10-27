import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/authOptions";
import getListTodos from "@/hooks/useListTodos";
import TodosClient from "@/lib/TodosList";

export default async function TodosPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const todosData = await getListTodos({
    session,
    skip: 0,
    take: 6,
    search: "",
  });

  return <TodosClient initialData={todosData} session={session} />;
}

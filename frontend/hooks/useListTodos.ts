import client from "@/lib/graphql/client";
import { Session } from "next-auth";
import { LIST_TODOS } from "@/lib/graphql/operations";

export default async function getListTodos({
  skip = 0,
  take = 6,
  search = "",
  session,
}: {
  skip?: number;
  take?: number;
  search?: string;
  session: Session;
}) {
  // console.log(session);
  if (!session?.user?.accessToken) {
    throw new Error("Unauthorized");
  }

  client.setHeader("authorization", `Bearer ${session.user.accessToken}`);
  return client
    .request(LIST_TODOS, { skip, take, search })
    .then((res) => res.listTodos);
}

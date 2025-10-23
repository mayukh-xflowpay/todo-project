import { gql } from "graphql-request";

export const LIST_TODOS = gql`
  query GetTodos($skip: Int, $take: Int, $search: String) {
    listTodos(skip: $skip, take: $take, search: $search) {
      todos {
        id
        title
        description
        completed
      }
      total
    }
  }
`;

export const CREATE_TODO = gql`
  mutation CreateTodo($input: CreateTodoDto!) {
    createTodo(input: $input) {
      id
      title
      description
      completed
    }
  }
`;

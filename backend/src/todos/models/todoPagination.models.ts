import { ObjectType, Field, Int } from '@nestjs/graphql';
import Todo from './todos.models';

@ObjectType()
export class TodoPagination {
  @Field(() => [Todo])
  todos: Todo[];

  @Field(() => Int)
  total: number;
}

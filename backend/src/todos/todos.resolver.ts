import { Args, Mutation, Resolver, Query, Int } from '@nestjs/graphql';
import { TodosService } from './todos.service';
import Todo from './models/todos.models';
import { CreateTodoDto } from './dtos/createTodo.dto';
import { TodoPagination } from './models/todoPagination.models';

@Resolver(() => Todo)
export class TodosResolver {
  constructor(private readonly todosService: TodosService) {}

  @Query(() => TodoPagination)
  async listTodos(
    @Args('skip', { type: () => Int, nullable: true }) skip?: number,
    @Args('take', { type: () => Int, nullable: true }) take?: number,
    @Args('search', { type: () => String, nullable: true }) search?: string,
  ) {
    return this.todosService.findAll(skip, take, search);
  }

  @Mutation(() => Todo)
  async createTodo(@Args('input') input: CreateTodoDto) {
    return this.todosService.create(input);
  }
}

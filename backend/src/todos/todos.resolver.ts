import { Args, Mutation, Resolver, Query, Int } from '@nestjs/graphql';
import { TodosService } from './todos.service';
import Todo from './models/todos.models';
import { CreateTodoDto } from './dtos/createTodo.dto';
import { TodoPagination } from './models/todoPagination.models';
import { CurrentUser } from 'src/auth/decorators/currentUser.decorator';

@Resolver(() => Todo)
export class TodosResolver {
  constructor(private readonly todosService: TodosService) {}

  @Query(() => TodoPagination)
  async listTodos(
    @CurrentUser() user: { userId: number; email: string },
    @Args('skip', { type: () => Int, nullable: true }) skip?: number,
    @Args('take', { type: () => Int, nullable: true }) take?: number,
    @Args('search', { type: () => String, nullable: true }) search?: string,
  ) {
    return this.todosService.findAll(user, skip, take, search);
  }

  @Mutation(() => Todo)
  async createTodo(
    @Args('input') input: CreateTodoDto,
    @CurrentUser() user: { userId: number; email: string },
  ) {
    return this.todosService.create(user, input);
  }
}

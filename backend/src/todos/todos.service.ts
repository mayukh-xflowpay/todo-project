import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './entities/todos.entity';
import { CreateTodoDto } from './dtos/createTodo.dto';
import { UpdateTodoDto } from './dtos/updateTodo.dto';
import { TodoPagination } from './models/todoPagination.models';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private todosRepository: Repository<Todo>,

    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(
    user: { userId: number; email: string },
    skip?: number,
    take?: number,
    search?: string,
  ): Promise<TodoPagination> {
    const query = this.todosRepository
      .createQueryBuilder('todo')
      .where('user_id = :id', { id: user.userId });

    if (search)
      query.andWhere('LOWER(todo.title) LIKE :search', {
        search: `${search.toLowerCase()}%`,
      });

    const total = await query.getCount();

    const todos = await query
      .skip(skip || 0)
      .take(take || 6)
      .getMany();

    return { todos, total };
  }

  async findOne(id: string): Promise<Todo | null> {
    if (!id) {
      throw new NotFoundException('Todo id not provided');
    }
    if (isNaN(Number(id))) {
      throw new NotFoundException('Invalid ID');
    }

    const todoID = Number(id);

    const res = await this.todosRepository.findOneBy({ id: todoID });
    if (res === null) {
      throw new NotFoundException('Todo not found');
    }
    return res;
  }

  async create(
    userPayload: { userId: number; email: string },
    createTodoDto: CreateTodoDto,
  ): Promise<Todo> {
    const user = await this.userRepository.findOneBy({
      id: userPayload.userId,
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const newTodo = this.todosRepository.create({ ...createTodoDto, user });
    await this.todosRepository.save(newTodo);
    return newTodo;
  }

  async update(id: string, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    if (!id) {
      throw new NotFoundException('Todo id not provided');
    }
    if (isNaN(Number(id))) {
      throw new NotFoundException('Invalid ID');
    }

    const todoID = Number(id);

    const affectedTodo = await this.todosRepository.findOneBy({ id: todoID });
    if (affectedTodo === null) {
      throw new NotFoundException('Todo not found');
    }

    const res = this.todosRepository.merge(affectedTodo!, updateTodoDto);
    this.todosRepository.save(res);
    return res;
  }
}

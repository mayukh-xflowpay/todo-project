import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './entities/todos.entity';
import { CreateTodoDto } from './dtos/createTodo.dto';
import { UpdateTodoDto } from './dtos/updateTodo.dto';
import { TodoPagination } from './models/todoPagination.models';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private todosRepository: Repository<Todo>,
  ) {}

  async findAll(
    skip?: number,
    take?: number,
    search?: string,
  ): Promise<TodoPagination> {
    const query = this.todosRepository.createQueryBuilder('todo');

    if (search) query.where('LOWER(todo.title) LIKE :search%', { search: `` });

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

  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    const newTodo = this.todosRepository.create(createTodoDto);
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

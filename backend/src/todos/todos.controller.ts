import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { TodosService } from './todos.service';
import { UpdateTodoDto } from './dtos/updateTodo.dto';

@Controller('todos')
export class TodosController {
    constructor(private readonly todosService: TodosService) {}

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.todosService.findOne(id);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
        return this.todosService.update(id, updateTodoDto);
    }
}

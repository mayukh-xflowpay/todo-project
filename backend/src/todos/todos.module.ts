import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './entities/todos.entity';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';
import { TodosResolver } from './todos.resolver';

@Module({
    imports: [TypeOrmModule.forFeature([Todo])],
    providers: [TodosService, TodosResolver],
    controllers: [TodosController]
})
export class TodosModule {
    
}

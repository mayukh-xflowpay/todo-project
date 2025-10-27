import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './entities/todos.entity';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';
import { TodosResolver } from './todos.resolver';
import { UsersModule } from 'src/users/users.module';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Todo, User]), UsersModule],
  providers: [TodosService, TodosResolver],
  controllers: [TodosController],
})
export class TodosModule {}

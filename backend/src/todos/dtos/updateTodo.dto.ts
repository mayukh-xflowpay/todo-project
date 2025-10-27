import { InputType, Field, PartialType } from '@nestjs/graphql';
import { CreateTodoDto } from './createTodo.dto';

@InputType()
export class UpdateTodoDto extends PartialType(CreateTodoDto) {}

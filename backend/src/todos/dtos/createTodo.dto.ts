import { InputType, Field } from '@nestjs/graphql';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateTodoDto {
  @Field()
  @IsNotEmpty()
  title: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  description: string;

  @Field((type) => Boolean, { defaultValue: false })
  @IsBoolean()
  @IsOptional()
  completed: boolean;
}

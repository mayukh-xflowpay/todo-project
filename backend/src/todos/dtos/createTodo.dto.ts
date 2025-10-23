import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateTodoDto {
  @Field()
  title: string;

  @Field({ nullable: true })
  description: string;

  @Field((type) => Boolean, { defaultValue: false })
  completed: boolean;
}

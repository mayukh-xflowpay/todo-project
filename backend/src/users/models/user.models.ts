import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserModel {
  @Field(() => ID)
  id: number;

  @Field()
  email: string;

  @Field()
  name: string;
}

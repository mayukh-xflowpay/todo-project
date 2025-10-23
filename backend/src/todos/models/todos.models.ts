import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
export default class Todo {
    @Field(type => ID)
    id: number;

    @Field()
    title: string;

    @Field({nullable: true})
    description: string;

    @Field(type => Boolean, { defaultValue: false })
    completed: boolean = false;
}
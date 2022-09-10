import { Field, ID, ObjectType, registerEnumType } from "@nestjs/graphql";

export enum TodoStatus {
  NEW,
  IN_PROGRESS,
  COMPLETE,
}

registerEnumType(TodoStatus, {
  name: "TodoStatus",
});

@ObjectType()
export class Todo {
  @Field((type) => ID)
  id: string;

  @Field()
  title: string;

  @Field({ nullable: true })
  description: string;

  @Field((type) => TodoStatus)
  status: TodoStatus;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

import { Args, ID, Mutation, Query, Resolver, Subscription } from "@nestjs/graphql";
import { PubSub } from "graphql-subscriptions";

import { Todo } from "./models/todo.models";
import { TodoService } from "./todo.service";

const pubSub = new PubSub();

@Resolver()
export class TodoResolver {
  constructor(private todoService: TodoService) {}

  @Query(() => [Todo], { nullable: "items" })
  findAll() {
    return this.todoService.findAll();
  }

  @Query(() => Todo)
  findOneById(@Args("id", { type: () => ID }) id: string) {
    return this.todoService.findOneById(id);
  }

  @Mutation(() => Todo)
  async insertTodo(@Args("id", { type: () => ID }) id: string) {
    const newTodo = this.todoService.insertTodo(id);
    pubSub.publish("insertTodo", { todoAdded: newTodo });
    return newTodo;
  }

  @Subscription(() => Todo)
  todoAdded() {
    return pubSub.asyncIterator("insertTodo");
  }
}

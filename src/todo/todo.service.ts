// src/todo/todo.service.ts
import { Injectable, NotFoundException } from "@nestjs/common";

import { Todo } from "./models/todo.models";

@Injectable()
export class TodoService {
  private todos: Todo[] = [
    {
      createdAt: new Date(),
      description: "descriptionっす",
      id: "idす",
      status: 0,
      title: "titleっす",
      updatedAt: new Date(),
    },
    {
      createdAt: new Date(),
      description: "description2っす",
      id: "id2す",
      status: 1,
      title: "title2っす",
      updatedAt: new Date(),
    },
  ];

  findAll(): Todo[] {
    return this.todos;
  }
  findOneById(id: string): Todo {
    const result = this.todos.find((todo) => id === todo.id);
    if (!result) {
      throw new NotFoundException();
    }
    return result;
  }
  insertTodo(id: string): Todo {
    const todo: Todo = {
      createdAt: new Date(),
      description: "new description",
      id,
      status: 2,
      title: "new title",
      updatedAt: new Date(),
    };
    this.todos.push(todo);
    return todo;
  }
}

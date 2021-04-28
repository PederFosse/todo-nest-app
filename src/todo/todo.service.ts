import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { todos } from 'src/mock/todos.mock';
import { toTodoDto } from 'src/shared/mapper';
import { toPromise } from 'src/shared/utils';
import { TodoEntity } from './entity/todo.entity';
import { v4 as uuidv4 } from 'uuid';
import { TodoDto } from './dto/todo.dto';
import { TodoCreateDto } from './dto/todo.create.dto';

@Injectable()
export class TodoService {
  todos: TodoEntity[] = todos;

  async getOneTodo(id: string): Promise<TodoDto> {
    const todo = this.todos.find(todo => todo.id === id);

    if (!todo) {
      throw new HttpException(`Todo item does not exist`, HttpStatus.BAD_REQUEST);
    }

    return toPromise(toTodoDto(todo));
  }

  async createTodo(todoDto: TodoCreateDto): Promise<TodoDto> {
    const { name, description } = todoDto;

    const todo: TodoEntity = {
      id: uuidv4(),
      name,
      description,
    };

    this.todos.push(todo);

    return toPromise(toTodoDto(todo));
  }

  async destroyTodo(id: string): Promise<TodoDto> {
    const todo = this.todos.find(todo => todo.id === id);

    if (!todo) {
      throw new HttpException(`Todo item does not exist`, HttpStatus.BAD_REQUEST);
    }

    this.todos.splice(this.todos.indexOf(todo), 1);

    return toPromise(toTodoDto(todo));
  }

  async getAllTodo(): Promise<TodoDto[]> {
    return toPromise(todos.map(todo => toTodoDto(todo)));
  }

  async updateTodo(id: string, todoDto: TodoDto): Promise<TodoDto> {
    const todo = this.todos.find(todo => todo.id === id);

    if (!todo) {
      throw new HttpException(`Todo item does not exist`, HttpStatus.BAD_REQUEST);
    }

    todo.name = todoDto.name;
    todo.description = todoDto.description;

    return toPromise(toTodoDto(todo));
  }
}

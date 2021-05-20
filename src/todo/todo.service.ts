import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { todos } from 'src/mock/todos.mock';
import { toTodoDto } from 'src/shared/mapper';
import { toPromise } from 'src/shared/utils';
import { TodoEntity } from '@todo/entity/todo.entity';
import { TodoDto } from './dto/todo.dto';
import { TodoCreateDto } from './dto/todo.create.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity)
    private readonly todoRepo: Repository<TodoEntity>
  ) {}

  async getOneTodo(id: string): Promise<TodoDto> {
    const todo = await this.todoRepo.findOne({
      where: { id },
      relations: ['tasks']
    });

    if (!todo) {
      throw new HttpException(`Todo item does not exist`, HttpStatus.BAD_REQUEST);
    }

    return toTodoDto(todo);
  }

  async createTodo(todoDto: TodoCreateDto): Promise<TodoDto> {
    const { name, description } = todoDto;

    const todo: TodoEntity = await this.todoRepo.create({ name, description });

    await this.todoRepo.save(todo);

    return toPromise(toTodoDto(todo));
  }

  async destroyTodo(id: string): Promise<TodoDto> {
    const todo: TodoEntity = await this.todoRepo.findOne({
      where: { id },
      relations: ['tasks']
    });

    if (!todo) {
      throw new HttpException(`Todo item does not exist`, HttpStatus.BAD_REQUEST);
    }

    if (todo.tasks && todo.tasks.length > 0) {
      throw new HttpException("Cannot delete this todo list, it has existing tasks", HttpStatus.FORBIDDEN);
    }

    await this.todoRepo.delete({ id });

    return toTodoDto(todo);
  }

  async getAllTodo(): Promise<TodoDto[]> {
    const todos = await this.todoRepo.find({ relations: ['tasks'] });
    return todos.map(todo => toTodoDto(todo));
  }

  async updateTodo(id: string, todoDto: TodoDto): Promise<TodoDto> {
    const { name, description } = todoDto;

    let todo: TodoEntity = await this.todoRepo.findOne({ where: { id }, relations: ['tasks']});

    if (!todo) {
      throw new HttpException(`Todo item does not exist`, HttpStatus.BAD_REQUEST);
    }

    todo = {
      id,
      name,
      description,
    };

    await this.todoRepo.update({ id }, todo);

    todo = await this.todoRepo.findOne({
      where: { id },
    })

    return toTodoDto(todo);
  }
}

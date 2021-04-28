import { Body, Controller, Delete, Get, Logger, Param, Post, Put } from '@nestjs/common';
import { toPromise } from 'src/shared/utils';
import { TodoCreateDto } from './dto/todo.create.dto';
import { TodoDto } from './dto/todo.dto';
import { TodoListDto } from './dto/todo.list.dto';
import { TodoService } from './todo.service';

@Controller('api/todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get() // get all todos
  async findAll(): Promise<TodoListDto> {
    const todos = await this.todoService.getAllTodo();

    return toPromise({ todos });
  }

  @Get(":id") // get one todo by id
  async findOne(@Param("id") id: string): Promise<TodoDto> {
    return await this.todoService.getOneTodo(id);
  }

  @Post() // create a new todo
  async create(@Body() todoCreateDto: TodoCreateDto): Promise<TodoDto> {
    return await this.todoService.createTodo(todoCreateDto);
  }

  @Put(":id") // update a todo by id
  async update(
    @Param("id") id: string,
    @Body() todoDto: TodoDto
  ): Promise<TodoDto> {
    return await this.todoService.updateTodo(id, todoDto);
  }

  @Delete(":id") // delete one todo by id
  async destroy(@Param("id") id: string): Promise<TodoDto> {
    return await this.todoService.destroyTodo(id);
  }
}

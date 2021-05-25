import { Body, Controller, Delete, Get, Logger, Param, Post, Put, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserDto } from '@user/dto/user.dto';
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
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard())
  async create(@Body() todoCreateDto: TodoCreateDto, @Req() req: any): Promise<TodoDto> {
    const user = req.user as UserDto;

    return await this.todoService.createTodo(user, todoCreateDto);
  }

  @Put(":id") // update a todo by id
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard())
  async update(
    @Param("id") id: string,
    @Body() todoDto: TodoDto,
  ): Promise<TodoDto> {
    return await this.todoService.updateTodo(id, todoDto);
  }

  @Delete(":id") // delete one todo by id
  @UseGuards(AuthGuard())
  async destroy(@Param("id") id: string): Promise<TodoDto> {
    return await this.todoService.destroyTodo(id);
  }
}

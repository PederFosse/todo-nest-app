import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateTaskDto } from '@todo/dto/task.create.dto';
import { TaskDto } from '@todo/dto/task.dto';
import { TaskListDto } from '@todo/dto/task.list.dto';
import { TaskService } from './task.service';

@Controller('api/tasks')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get(':id')
  async findOneTask(@Param('id') id: string): Promise<TaskDto> {
    return await this.taskService.getTask(id);
  }

 @Get('todo/:id')
 async findTasksByTodo(@Param('id') id: string): Promise<TaskListDto> {
   const tasks = await this.taskService.getTasksByTodo(id);
   return { tasks };
 }

 @Post('todo/:id')
 @UseGuards(AuthGuard())
 async create(
   @Param('id') todo: string,
   @Body() createTaskDto: CreateTaskDto,
 ): Promise<TaskDto> {
   return await this.taskService.createTask(todo, createTaskDto);
 }

 @Delete(':id')
 @UseGuards(AuthGuard())
 async destroy(@Param('id') id: string): Promise<TaskDto> {
   return await this.taskService.destroyTask(id);
 }
}

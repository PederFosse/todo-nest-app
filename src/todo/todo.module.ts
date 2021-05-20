import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from "@todo/entity/task.entity";
import { TodoEntity } from "@todo/entity/todo.entity";
import { TaskController } from './task/task.controller';
import { TaskService } from './task/task.service';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';

@Module({
  imports:[TypeOrmModule.forFeature([TodoEntity, TaskEntity])],
  controllers: [TodoController, TaskController],
  providers: [TodoService, TaskService],
})
export class TodoModule {}

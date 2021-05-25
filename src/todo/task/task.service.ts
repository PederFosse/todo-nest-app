import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { toTaskDto } from '@shared/mapper';
import { toPromise } from '@shared/utils';
import { CreateTaskDto } from '@todo/dto/task.create.dto';
import { TaskDto } from '@todo/dto/task.dto';
import { TaskListDto } from '@todo/dto/task.list.dto';
import { TaskEntity } from '@todo/entity/task.entity';
import { TodoEntity } from '@todo/entity/todo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskRepo: Repository<TaskEntity>,
    @InjectRepository(TodoEntity)
    private readonly todoRepo: Repository<TodoEntity>,
  ) {}
  
  // get one task by id
  async getTask(id: string): Promise<TaskDto> {
    const task: TaskEntity = await this.taskRepo.findOne({ where: { id } });

    if (!task) {
      throw new HttpException("Task does not exist", HttpStatus.BAD_REQUEST);
    }

    return toTaskDto(task);
  }

  // get tasks by todo
  async getTasksByTodo(id: string): Promise<TaskDto[]> {
    const tasks: TaskEntity[] = await this.taskRepo.find({
      where: { todo: {id} },
    });

    return tasks.map(task => toTaskDto(task));
  }

  // create a new task
  async createTask(todoId: string, taskDto: CreateTaskDto): Promise<TaskDto> {
    const { name } = taskDto;

    const todo: TodoEntity = await this.todoRepo.findOne({
      where: { id: todoId },
    });

    const task: TaskEntity = await this.taskRepo.create({
      name,
      todo,
    });

    await this.taskRepo.save(task);

    return toTaskDto(task);
  }

  // destroy task by id
  async destroyTask(id: string): Promise<TaskDto> {
    const task: TaskEntity = await this.taskRepo.findOne({ where: { id } });

    if (!task) {
      throw new HttpException("Task does not exist", HttpStatus.BAD_REQUEST);
    }

    await this.taskRepo.delete({ id });
    return toTaskDto(task);
  }
}

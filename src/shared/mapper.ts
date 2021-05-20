import { TodoDto } from "@todo/dto/todo.dto";
import { TodoEntity } from "@todo/entity/todo.entity";
import { TaskEntity } from "@todo/entity/task.entity";
import { TaskDto } from "@todo/dto/task.dto";

export const toTodoDto = (data: TodoEntity): TodoDto => {
  const { id, name, description, createdOn, tasks } = data;

  let todoDto: TodoDto = { id, name, description, createdOn };

  if (tasks) {
    todoDto = {
      ...todoDto,
      tasks: tasks.map((task: TaskEntity) => toTaskDto(task)),
    };
  };
  
  return todoDto;
};

export const toTaskDto = (data: TaskEntity): TaskDto => {
  const {id, name, createdOn} = data;

  let taskDto: TaskDto = {id, name, createdOn};
  return taskDto;
}

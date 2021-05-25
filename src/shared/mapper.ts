import { TodoDto } from "@todo/dto/todo.dto";
import { TodoEntity } from "@todo/entity/todo.entity";
import { TaskEntity } from "@todo/entity/task.entity";
import { TaskDto } from "@todo/dto/task.dto";
import { UserEntity } from "@user/entity/user.entity";
import { UserDto } from "@user/dto/user.dto";

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

export const toUserDto = (data: UserEntity): UserDto => {
  const { id, username, email } = data;
  let userDto: UserDto = { id, username, email };
  return userDto;
}
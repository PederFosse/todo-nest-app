import { UserDto } from "@user/dto/user.dto";
import { IsNotEmpty } from "class-validator";
import { TaskDto } from "./task.dto";

export class TodoDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  name: string;

  createdOn?: Date;
  description?: string;

  owner: UserDto;
  
  tasks?: TaskDto[];
}
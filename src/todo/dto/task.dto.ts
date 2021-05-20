import { IsNotEmpty } from "class-validator";

export class TaskDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  name: string;
  
  createdOn?: Date;
}
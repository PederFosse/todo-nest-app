import { IsNotEmpty, MaxLength } from "class-validator";

export class CreateTaskDto {
  @IsNotEmpty()
  name: string;

  description?: string;
}
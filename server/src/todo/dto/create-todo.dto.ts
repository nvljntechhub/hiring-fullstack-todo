import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateTodoDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @IsOptional()
  readonly description?: string;
}

import { IsString, IsNotEmpty, IsIn, IsOptional, IsEmpty } from 'class-validator';
import { TaskStatus } from '../entities/task.entity';

export class CreateTaskDto {
  @IsString({ message: 'El título debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El título no puede estar vacío' })
  title: string;

  @IsString({ message: 'La descripción debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'La descripción no puede estar vacía' })
  description: string;

  @IsIn([TaskStatus.PENDING, TaskStatus.IN_PROGRESS, TaskStatus.COMPLETED], {
    message: 'El estado debe ser uno de los siguientes: pending, in_progress, completed',
  })
  @IsOptional()
  status?: TaskStatus;
}

export class UpdateTaskDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsIn([TaskStatus.PENDING, TaskStatus.IN_PROGRESS, TaskStatus.COMPLETED], {
    message: 'Status must be one of: pending, in_progress, completed',
  })
  @IsOptional()
  status?: TaskStatus;
}

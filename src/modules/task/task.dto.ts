import { IsString, IsNotEmpty, IsIn, IsOptional, isNotEmpty, Validate } from 'class-validator';
import { TaskStatus } from './task.entity';
import { IsInt, Min } from 'class-validator';

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

  @IsNotEmpty({ message: 'El ID del usuario no puede estar vacío' })
  @IsInt({ message: 'El ID del usuario debe ser un número entero' })
  @Min(1, { message: 'El ID del usuario debe ser mayor o igual a 1' })
  // @Validate(UserExistsConstraint, { message: 'El usuario no existe' })
  userId: number;
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

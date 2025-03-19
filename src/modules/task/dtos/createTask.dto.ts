import { IsString, IsNotEmpty, IsEnum } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsEnum(['pending', 'in_progress', 'completed'], {
    message: 'Status must be one of: pending, in_progress, completed',
  })
  status: string;
}

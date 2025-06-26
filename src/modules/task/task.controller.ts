import { Body, Controller, Delete, Get, Param, Post, Patch, UseGuards } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './task.entity';
import { CreateTaskDto, UpdateTaskDto } from './task.dto';
import { Public } from '../../decorators/public.decorator';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Public()
  @Get()
  async findAll(): Promise<Task[]> {
    return await this.taskService.findAll();
  }

  @Public()
  @Get(':id')
  async findByID(@Param('id') id: number): Promise<Task> {
    return await this.taskService.findById(id);
  }

  @Post()
  async createTask(@Body() createTaskDto: CreateTaskDto) {
    return await this.taskService.createTask(createTaskDto, createTaskDto.userId);
  }

  @Patch(':id')
  async updateTask(@Param('id') id: number, @Body() updateTaskDto: UpdateTaskDto) {
    return await this.taskService.updateTask(id, updateTaskDto);
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: number) {
    return await this.taskService.deleteTask(id);
  }
}

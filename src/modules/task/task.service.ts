import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  async findAll(): Promise<Task[]> {
    return this.taskRepository.find();
  }

  async findById(id: number): Promise<Task> {
    const task = await this.taskRepository.findOneBy({ id });
    if (!task) {
      throw new NotFoundException(`Tarea con ID ${id} no encontrada`);
    }
    return task;
  }

  async createTask(task: Partial<Task>): Promise<Task> {
    return this.taskRepository.save(task);
  }

  async updateTask(id: number, task: Partial<Task>): Promise<Task> {
    await this.findById(id); // Verifica si existe
    await this.taskRepository.update(id, task);
    return this.findById(id);
  }

  async deleteTask(id: number): Promise<void> {
    const result = await this.taskRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Tarea con ID ${id} no encontrada`);
    }
  }
}

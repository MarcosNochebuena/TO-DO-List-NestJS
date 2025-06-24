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
    return await this.taskRepository.find();
  }

  async findById(id: number): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id } });
    if (!task) {
      throw new NotFoundException(`Tarea con ID ${id} no encontrada`);
    }
    return task;
  }

  async createTask(task: Partial<Task>): Promise<Task> {
    return await this.taskRepository.save(task);
  }

  async updateTask(id: number, updateFields: Partial<Task>): Promise<Task> {
    const task = await this.findById(id); // Verifica si existe
    if (!task) {
      throw new NotFoundException("Tarea no encontrada");

    }
    await this.taskRepository.update(id, updateFields);
    return await this.findById(id);
  }

  async deleteTask(id: number): Promise<String> {
    const task = await this.findById(id); // Ver
    if (!task) {
      throw new NotFoundException(`Tarea con ID ${id} no encontrada`);
    }
    await this.taskRepository.delete(id);
    return "Tare eliminada correctamente"
  }
}

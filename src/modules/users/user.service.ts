import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { UserValidator } from './user.validator';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    private userValidator: UserValidator
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findById(id: number): Promise<User> {
    const user = await this.userValidator.findUser(id);
    return user;
  }

  async createUser(user: Partial<User>): Promise<User> {
    await this.userValidator.validateUser(user);
    const newUser = this.userRepository.create(user);

    return await this.userRepository.save(newUser);
  }

  async updateUser(id: number, updateFields: Partial<User>): Promise<User> {
    await this.userValidator.findUser(id);
    await this.userRepository.update(id, updateFields);
    return await this.findById(id);
  }

  async deleteUser(id: number): Promise<string> {
    await this.userValidator.findUser(id);
    await this.userRepository.delete(id);
    return `Usuario eliminado correctamente`;
  }

  async findByUsername(username: string): Promise<User | null> {
    const userFound = await this.userRepository.findOne({ where: { username } });
    return userFound;
  }
}

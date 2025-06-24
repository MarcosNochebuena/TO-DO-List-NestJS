import { Repository } from "typeorm";
import { User } from "./user.entity";
import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class UserValidator {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  async validateUser(user: Partial<User>): Promise<void> {
    const existingUser = await this.userRepository.findOne({ where: { username: user.username } });
    if (existingUser) {
      throw new ForbiddenException(`Usuario con nombre ${user.username} ya existe`);
    }
    const existingEmail = await this.userRepository.findOne({ where: { email: user.email } });
    if (existingEmail) {
      throw new ForbiddenException(`Usuario con email ${user.email} ya existe`);
    }
  }

  async findUser(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    return user;
  }
}

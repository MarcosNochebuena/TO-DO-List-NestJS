import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { CreateUserDto } from './user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<User> {
    return this.userService.findById(id);
  }

  @Post()
  async createUser(@Body() user: CreateUserDto): Promise<User> {
    return this.userService.createUser(user);
  }

  @Patch(':id')
  async updateUser(@Param('id') id: number, @Body() updateFields: Partial<User>): Promise<User> {
    return this.userService.updateUser(id, updateFields);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: number): Promise<string>{
    return this.userService.deleteUser(id);
  }
}

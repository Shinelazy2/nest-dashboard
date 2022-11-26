import { Controller, Delete, Get, Param } from '@nestjs/common';
import { User } from './entity/user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/')
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  // @Get(':id')
  // findOne(@Param() username: string): Promise<User> {
  //   return this.usersService.find(username);
  // }

  @Delete(':id')
  async remove(@Param() id: string): Promise<void> {
    await this.usersService.remove(id);
  }

  async createNewUser(user: User): Promise<void> {
    await this.usersService.createNewUser(user);
  }
}

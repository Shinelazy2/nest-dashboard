import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  // async find(username: string): Promise<User | undefined> {
  //   return this.usersRepository.findOneBy({ username });
  // }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async createNewUser(user: User): Promise<void> {
    await this.usersRepository.save(user);
  }
}

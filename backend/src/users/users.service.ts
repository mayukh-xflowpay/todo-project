import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async createUser(email: string, name: string, hashedPassword: string) {
    const newUser = this.usersRepository.create({
      email,
      name,
      password: hashedPassword,
    });
    return this.usersRepository.save(newUser);
  }

  async createOAuthUser(
    email: string,
    name: string,
    provider: string,
    providerId: string,
  ) {
    const user = this.usersRepository.create({
      email,
      name,
      provider,
      providerId,
    });
    return this.usersRepository.save(user);
  }
}

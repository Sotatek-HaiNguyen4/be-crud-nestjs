import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async findOrCreateByGoogle(payload: any) {
    const user = await this.userRepo.findOneBy({ email: payload.email });

    if (user) return user;

    const newUser = this.userRepo.create({
      email: payload.email,
      name: payload.name,
      avatar: payload.picture,
      googleId: payload.sub,
    });

    return this.userRepo.save(newUser);
  }

  create(dto: CreateUserDto) {
    const user = this.userRepo.create(dto);
    return this.userRepo.save(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepo.findOne({ where: { email } });
  }

  findAll() {
    return this.userRepo.find();
  }

  findOne(id: string) {
    return this.userRepo.findOneBy({ id });
  }

  update(id: number, dto: UpdateUserDto) {
    return this.userRepo.update(id, dto);
  }

  remove(id: number) {
    return this.userRepo.delete(id);
  }
}

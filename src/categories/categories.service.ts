import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepo: Repository<Category>,
  ) {}

  async create(userId: string, dto: CreateCategoryDto): Promise<Category> {
    const user = new User();
    user.id = userId;

    const category = this.categoryRepo.create({
      ...dto,
      user,
    });
    return this.categoryRepo.save(category);
  }

  async findAll(userId: string): Promise<Category[]> {
    return this.categoryRepo.find({ where: { user: { id: userId } } });
  }

  async remove(userId: string, categoryId: string) {
    const category = await this.categoryRepo.findOne({
      where: { id: categoryId, user: { id: userId } },
    });
    if (!category) throw new NotFoundException('Category not found');
    return this.categoryRepo.remove(category);
  }
}

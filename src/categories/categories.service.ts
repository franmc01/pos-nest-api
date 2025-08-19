import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category) private readonly repo: Repository<Category>,
  ) {}

  create(createCategoryDto: CreateCategoryDto) {
    const category = this.repo.create(createCategoryDto);
    return this.repo.save(category);
  }

  findAll() {
    return this.repo.find();
  }

  async findOne(id: number) {
    const item = await this.repo.findOneBy({ id });

    if (!item) throw new NotFoundException('Category not found');

    return item;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = this.repo.preload({ id, ...updateCategoryDto });
    const dataUpdated = Object.assign(category, updateCategoryDto);
    return this.repo.save(dataUpdated);
  }

  async remove(id: number) {
    const result = await this.repo.delete(id);

    if (!result.affected) throw new NotFoundException('Category not found');

    return {
      message: 'Category deleted successfully',
    };
  }
}

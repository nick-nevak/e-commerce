import { CategoriesRepository } from '@infra/categories/categories.repository';
import {
  CategoryModel,
  CategorySchema
} from '@infra/categories/categories.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

const CategoryModelModule = MongooseModule.forFeature([
  { name: CategoryModel.name, schema: CategorySchema },
]);

@Module({
  imports: [CategoryModelModule],
  providers: [CategoriesRepository],
  exports: [CategoriesRepository, CategoryModelModule]
})
export class CategoriesRepositoryModule { }

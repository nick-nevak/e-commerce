import { CategoriesRepository } from '@infra/categories/categories.repository';
import {
  CategoryModel,
  CategorySchema,
} from '@infra/categories/categories.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CategoryModel.name, schema: CategorySchema },
    ]),
  ],
  providers: [CategoriesRepository],
})
export class CategoriesModule {}

import { CategoriesService } from '@app/categories.service';
import { CategoriesRepository } from '@infra/categories/categories.repository';
import {
  CategoryModel,
  CategorySchema
} from '@infra/categories/categories.schema';
import { categoriesSeed } from '@infra/seeds/categories.seed';
import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriesController } from './categories.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CategoryModel.name, schema: CategorySchema },
    ]),
  ],
  controllers: [CategoriesController],
  providers: [CategoriesRepository, CategoriesService],
})
export class CategoriesModule implements OnApplicationBootstrap {
  constructor(private readonly repository: CategoriesRepository) { }

  onApplicationBootstrap() {
    // console.warn('CATEGORIES', JSON.stringify(categoriesSeed));
    this.repository.seed(categoriesSeed).subscribe();
  }
}

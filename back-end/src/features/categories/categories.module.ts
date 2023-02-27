import { CategoriesService } from '@app/categories/categories.service';
import { CategoriesRepositoryModule } from '@infra/categories/categories-repository.module';
import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';

@Module({
  imports: [CategoriesRepositoryModule],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule { }

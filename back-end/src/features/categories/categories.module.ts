import { CategoriesService } from '@app/categories/categories.service';
import { CategoriesRepositoryModule } from '@infra/categories/categories-repository.module';
import { CategoriesRepository } from '@infra/categories/categories.repository';
import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { CategoriesController } from './categories.controller';

@Module({
  imports: [CategoriesRepositoryModule],
  controllers: [CategoriesController],
  providers: [CategoriesRepository, CategoriesService],
})
export class CategoriesModule implements OnApplicationBootstrap {
  constructor(private readonly repository: CategoriesRepository) { }

  onApplicationBootstrap() {
    this.repository.seed().subscribe();
  }
}

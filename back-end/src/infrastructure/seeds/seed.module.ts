import { CategoriesRepositoryModule } from '@infra/categories/categories-repository.module';
import { CategoriesRepository } from '@infra/categories/categories.repository';
import { ProductsRepositoryModule } from '@infra/products/products-repository.module';
import { ProductsRepository } from '@infra/products/products.repository';
import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { log } from '@shared/utils/rx/rx-js';
import { switchMap } from 'rxjs';

@Module({
  imports: [ProductsRepositoryModule, CategoriesRepositoryModule]
})
export class SeedModule implements OnApplicationBootstrap {
  constructor(
    private readonly productRepository: ProductsRepository,
    private readonly categoriesRepository: CategoriesRepository
  ) { }

  async onApplicationBootstrap() {
    this.categoriesRepository.seed().pipe(
      switchMap(() =>
        this.categoriesRepository.findAllLeafs().pipe(
          switchMap((categories) => this.productRepository.seed(categories)
          )
        )
      ),
      log('Seeding done')
    ).subscribe();
  }
}

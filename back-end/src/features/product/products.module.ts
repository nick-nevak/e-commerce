import { ProductsService } from '@app/products/products.service';
import { CategoriesRepositoryModule } from '@infra/categories/categories-repository.module';
import { CategoriesRepository } from '@infra/categories/categories.repository';
import { ProductRepository } from '@infra/products/product.repository';
import { ProductsRepositoryModule } from '@infra/products/products-repository.module';
import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { switchMap } from 'rxjs';
import { ProductsController } from './products.controller';

@Module({
  imports: [ProductsRepositoryModule, CategoriesRepositoryModule],
  controllers: [ProductsController],
  providers: [ProductsService, ProductRepository, CategoriesRepository],
})
export class ProductsModule implements OnApplicationBootstrap {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly categoriesRepository: CategoriesRepository
  ) { }

  async onApplicationBootstrap() {
    this.categoriesRepository.findLeafs().pipe(
      switchMap((categories) => this.productRepository.seed(categories))
    ).subscribe();
  }
}

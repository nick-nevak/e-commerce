import { CategoriesRepositoryModule } from '@infra/categories/categories-repository.module';
import { ProductsRepositoryModule } from '@infra/products/products-repository.module';
import { Module } from '@nestjs/common';
import { CatalogRepository } from './catalog.repository';

@Module({
  imports: [
    ProductsRepositoryModule,
    CategoriesRepositoryModule
  ],
  providers: [CatalogRepository],
  exports: [CatalogRepository]
})
export class CatalogRepositoryModule { }

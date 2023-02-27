import { ProductsService } from '@app/products/products.service';
import { ProductsRepositoryModule } from '@infra/products/products-repository.module';
import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';

@Module({
  imports: [ProductsRepositoryModule],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule { }

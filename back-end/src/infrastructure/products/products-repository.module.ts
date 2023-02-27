import { ProductModel, ProductSchema } from '@infra/products/product.schema';
import { ProductsRepository } from '@infra/products/products.repository';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';


const ProductModelModule = MongooseModule.forFeature([
  { name: ProductModel.name, schema: ProductSchema },
]);

@Module({
  imports: [ProductModelModule],
  providers: [ProductsRepository],
  exports: [ProductsRepository, ProductModelModule]
})
export class ProductsRepositoryModule { }

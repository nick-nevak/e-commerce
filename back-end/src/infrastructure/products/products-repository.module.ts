import { ProductRepository } from '@infra/products/product.repository';
import { ProductModel, ProductSchema } from '@infra/products/product.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';


const ProductModelModule = MongooseModule.forFeature([
  { name: ProductModel.name, schema: ProductSchema },
]);

@Module({
  imports: [ProductModelModule],
  providers: [ProductRepository],
  exports: [ProductRepository, ProductModelModule]
})
export class ProductsRepositoryModule { }

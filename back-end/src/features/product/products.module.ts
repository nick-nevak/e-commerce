import { ProductsService } from '@app/product/products.service';
import { ProductRepository } from '@infra/products/product.repository';
import { ProductSchema } from '@infra/products/product.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsController } from './products.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ProductSchema.name, schema: ProductSchema },
    ]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService, ProductRepository],
})
export class ProductsModule {}

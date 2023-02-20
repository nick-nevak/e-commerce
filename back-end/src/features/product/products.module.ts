import { ProductsService } from '@app/products.service';
import { ProductRepository } from '@infra/products/product.repository';
import { ProductModel, ProductSchema } from '@infra/products/product.schema';
import { productsSeed } from '@infra/seeds/products-seed';
import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsController } from './products.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ProductModel.name, schema: ProductSchema },
    ]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService, ProductRepository],
})
export class ProductsModule implements OnApplicationBootstrap {
  constructor(private readonly repository: ProductRepository) { }

  async onApplicationBootstrap() {
    await this.repository.seed(productsSeed);
  }
}

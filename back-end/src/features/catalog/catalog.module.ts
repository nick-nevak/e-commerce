import { CatalogService } from '@app/catalog/catalog.service';
import { CatalogRepository } from '@infra/catalog/catalog.repository';
import { ProductModel, ProductSchema } from '@infra/products/product.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CatalogController } from './catalog.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ProductModel.name, schema: ProductSchema },
    ]),
  ],
  controllers: [CatalogController],
  providers: [CatalogService, CatalogRepository],
})
export class CatalogModule { }

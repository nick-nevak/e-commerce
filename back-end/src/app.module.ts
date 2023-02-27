import { CatalogModule } from '@features/catalog/catalog.module';
import { CategoriesModule } from '@features/categories/categories.module';
import { ProductsModule } from '@features/product/products.module';
import { SeedModule } from '@infra/seeds/seed.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { connectionString } from 'config';
import { AppController } from './app.controller';

@Module({
  imports: [
    ProductsModule,
    CatalogModule,
    CategoriesModule,
    SeedModule,
    MongooseModule.forRoot(connectionString),
  ],
  controllers: [AppController],
})
export class AppModule { }

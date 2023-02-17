import { CatalogModule } from '@features/catalog/catalog.module';
import { ProductsModule } from '@features/product/products.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';

@Module({
  imports: [ProductsModule, CatalogModule],
  controllers: [AppController],
})
export class AppModule {}

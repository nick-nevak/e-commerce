import { CatalogService } from '@app/catalog/catalog.service';
import { CatalogRepositoryModule } from '@infra/catalog/catalog-repository.module';
import { Module } from '@nestjs/common';
import { CatalogController } from './catalog.controller';

@Module({
  imports: [CatalogRepositoryModule],
  controllers: [CatalogController],
  providers: [CatalogService,],
})
export class CatalogModule { }

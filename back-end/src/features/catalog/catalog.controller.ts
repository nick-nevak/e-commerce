import { CatalogService } from '@app/catalog/catalog.service';
import { Controller, Get } from '@nestjs/common';
import { mapToCatalogItemDto } from 'mappers/catalog-item.mapper';
import { map } from 'rxjs';

@Controller('catalog')
export class CatalogController {
  constructor(private readonly serive: CatalogService) {}

  @Get()
  getAllProducts() {
    return this.serive
      .getAll()
      .pipe(map((products) => products.map(mapToCatalogItemDto)));
  }

  @Get('filters')
  getFilters() {
    return this.serive.getFilters();
  }
}

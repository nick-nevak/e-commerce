import { CatalogService } from '@app/catalog.service';
import { Controller, Get } from '@nestjs/common';
import { toCatalogItemDtos } from 'mappers/catalog-item.mapper';
import { map } from 'rxjs';

@Controller('catalog')
export class CatalogController {
  constructor(private readonly serive: CatalogService) { }

  @Get()
  getAllProducts() {
    return this.serive
      .getAll()
      .pipe(map(toCatalogItemDtos));
  }

  @Get('filters')
  getFilters() {
    return this.serive.getFilters();
  }
}

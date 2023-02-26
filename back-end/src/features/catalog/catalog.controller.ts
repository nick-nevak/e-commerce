import { CatalogService } from '@app/catalog/catalog.service';
import { Controller, Get, Param, Query } from '@nestjs/common';
import { toCatalogItemDtos } from 'mappers/catalog-item.mapper';
import { map } from 'rxjs';

@Controller('catalog')
export class CatalogController {
  constructor(private readonly serive: CatalogService) { }

  @Get()
  getProductsPage(
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 50,
  ) {
    return this.serive
      .getPage(page, pageSize)
      .pipe(map(toCatalogItemDtos));
  }

  @Get('category/:id')
  getProductsByCategory(@Param('id') id: string) {
    return this.serive
      .getByCategoryId(id)
      .pipe(map(toCatalogItemDtos));
  }

  @Get('filters')
  getFilters() {
    return this.serive.getFilters();
  }
}

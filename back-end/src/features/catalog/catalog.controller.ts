import { CatalogService } from '@app/catalog/catalog.service';
import { Controller, Get } from '@nestjs/common';
import { mapCatalogItemToDto } from '@shared/dto/product.dto copy';
import { map } from 'rxjs';

@Controller('catalog')
export class CatalogController {
  constructor(private readonly serive: CatalogService) {}

  @Get()
  getAllProducts() {
    return this.serive
      .getAll()
      .pipe(map((products) => products.map(mapCatalogItemToDto)));
  }
}

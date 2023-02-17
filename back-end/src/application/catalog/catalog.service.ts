import { CatalogItem } from '@domain/catalog/catalog-item';
import { CatalogRepository } from '@infra/catalog/catalog.repository';
import { Injectable } from '@nestjs/common';
import { map } from 'rxjs';

@Injectable()
export class CatalogService {
  constructor(private readonly repository: CatalogRepository) {}

  getAll = () =>
    this.repository
      .findAll()
      .pipe(map((catalogItems) => catalogItems.map(CatalogItem.create)));
}

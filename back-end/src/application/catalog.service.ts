import { CatalogRepository } from '@infra/catalog/catalog.repository';
import { seedFilters } from '@infra/seeds/filters-seed';
import { toCatalogItems } from '@mappers/catalog-item.mapper';
import { Injectable } from '@nestjs/common';
import { map } from 'rxjs';

@Injectable()
export class CatalogService {
  constructor(private readonly repository: CatalogRepository) { }

  getAll = () =>
    this.repository.findAll().pipe(map(toCatalogItems));

  getFilters = () =>
    seedFilters;
}

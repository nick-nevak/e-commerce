import { CatalogItem } from '@domain/catalog/catalog-item';
import { CatalogItemDocument } from '@infra/catalog/catalog.repository';
import { CatalogItemDto } from '@shared/dto/catalog-item.dto';

export const mapToCatalogItem = (p: CatalogItemDocument): CatalogItem =>
  CatalogItem.create({
    ...p,
    id: p._id.toString(),
  });

export const mapToCatalogItemDto = (p: CatalogItem): CatalogItemDto => ({
  ...p,
});

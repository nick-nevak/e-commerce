import { CatalogItem } from '@domain/catalog/catalog-item';
import { CatalogItemDocument } from '@infra/catalog/catalog.repository';
import { CatalogItemDto } from '@shared/dto/catalog-item.dto';
import { map } from 'lodash/fp';

export const toCatalogItem = (p: CatalogItemDocument): CatalogItem =>
  CatalogItem.create({ ...p, id: p._id.toString(), });

export const toCatalogItemDto = (p: CatalogItem): CatalogItemDto =>
  ({ ...p, });

export const toCatalogItems = map(toCatalogItem);
export const toCatalogItemDtos = map(toCatalogItemDto);

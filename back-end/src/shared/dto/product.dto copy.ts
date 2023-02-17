import { CatalogItem } from '@domain/catalog/catalog-item';

export interface CatalogItemDto {
  id: string;
  title: string;
  price: number;
  description: string;
  brand: string;
  imageUrl: string;
}

export const mapCatalogItemToDto = (p: CatalogItem): CatalogItemDto => ({
  id: p.id,
  title: p.title,
  price: p.price,
  description: p.description,
  brand: p.brand,
  imageUrl: p.imageUrl,
});

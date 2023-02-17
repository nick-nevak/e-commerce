import { Product } from '@domain/product/product';

export interface ProductDto {
  id: string;
  title: string;
  price: number;
  description: string;
  category: string;
  deliveryTime: string | Date;
  brand: string;
  rating: number;
  imageUrls: string[];
  sizes: { size: string; available: boolean }[];
}

export const mapProductToDto = (p: Product): ProductDto => ({
  id: p.id,
  title: p.title,
  price: p.price,
  description: p.description,
  category: p.category,
  deliveryTime: p.deliveryTime,
  brand: p.brand,
  rating: p.rating,
  imageUrls: p.imageUrls,
  sizes: p.sizes,
});

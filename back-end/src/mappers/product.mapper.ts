import { Product } from '@domain/product/product';
import { ProductDocument } from '@infra/products/product.schema';
import { ProductDto } from '@shared/dto/product.dto';
import { map } from 'lodash/fp';
import { toProductCategory, toProductCategoryDto } from './categories.mapper';

export const toProduct = (p: ProductDocument): Product =>
  Product.create({ ...p, id: p.id, category: toProductCategory(p.category) });

export const toProductDto = (p: Product): ProductDto => ({ ...p, category: toProductCategoryDto(p.category) });

export const toProducts = map(toProduct);
export const toProductDtos = map(toProductDto);

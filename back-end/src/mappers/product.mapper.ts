import { Product } from '@domain/product/product';
import { ProductDocument } from '@infra/products/product.schema';
import { ProductDto } from '@shared/dto/product.dto';
import { map } from 'lodash/fp';

export const toProduct = (p: ProductDocument): Product =>
  Product.create({ ...p, id: p._id.toString() });

export const toProductDto = (p: Product): ProductDto => ({ ...p });

export const toProducts = map(toProduct);
export const toProductDtos = map(toProductDto);

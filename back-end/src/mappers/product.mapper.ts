import { Product } from '@domain/product/product';
import { ProductDocument } from '@infra/products/product.schema';
import { ProductDto } from '@shared/dto/product.dto';

export const mapToProduct = (p: ProductDocument): Product =>
  Product.create({
    ...p,
    id: p._id.toString(),
  });

export const mapProductToDto = (p: Product): ProductDto => ({ ...p });

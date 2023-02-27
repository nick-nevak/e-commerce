import { Product } from '@domain/product/product';
import { ProductsRepository } from '@infra/products/products.repository';
import { toProduct, toProducts } from '@mappers/product.mapper';
import { Injectable } from '@nestjs/common';
import { map } from 'rxjs';

@Injectable()
export class ProductsService {
  constructor(private readonly repository: ProductsRepository) { }

  getAllProducts = () =>
    this.repository.findAll().pipe(map(toProducts));

  getProductById = (id: string) =>
    this.repository.findById(id).pipe(map(toProduct));

  createProduct = (product: Product) =>
    this.repository.create(product).pipe(map(toProduct));

  updateProduct = (id: string, product: Product) =>
    this.repository.update(id, product).pipe(map(toProduct));

  deleteProduct = (id: string) => this.repository.delete(id);
}

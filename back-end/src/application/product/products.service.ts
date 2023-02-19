import { Product } from '@domain/product/product';
import { ProductRepository } from '@infra/products/product.repository';
import { mapToProduct } from '@mappers/product.mapper';
import { Injectable } from '@nestjs/common';
import { map } from 'rxjs';

@Injectable()
export class ProductsService {
  constructor(private readonly repository: ProductRepository) {}

  getAllProducts = () =>
    this.repository
      .findAll()
      .pipe(map((products) => products.map(mapToProduct)));

  getProductById = (id: string) =>
    this.repository.findById(id).pipe(map(mapToProduct));

  createProduct = (product: Product) =>
    this.repository.create(product).pipe(map(mapToProduct));

  updateProduct = (id: string, product: Product) =>
    this.repository.update(id, product).pipe(map(mapToProduct));

  deleteProduct = (id: string) => this.repository.delete(id);
}

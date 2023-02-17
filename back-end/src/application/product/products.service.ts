import { Product } from '@domain/product/product';
import { ProductRepository } from '@infra/products/product.repository';
import { Injectable } from '@nestjs/common';
import { map } from 'rxjs';

@Injectable()
export class ProductsService {
  constructor(private readonly repository: ProductRepository) {}

  getAllProducts = () =>
    this.repository
      .findAll()
      .pipe(map((products) => products.map(Product.create)));

  getProductById = (id: string) =>
    this.repository.findById(id).pipe(map(Product.create));

  createProduct = (product: Product) =>
    this.repository.create(product).pipe(map(Product.create));

  updateProduct = (id: string, product: Product) =>
    this.repository.update(id, product).pipe(map(Product.create));

  deleteProduct = (id: string) => this.repository.delete(id);
}

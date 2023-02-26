import { ProductCategory } from '@domain/category/category';
import { v4 as uuidv4 } from 'uuid';

export class Product {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly price: number,
    public readonly description: string,
    public readonly brand: string,
    public readonly rating: number,
    public readonly imageUrls: string[],
    public readonly deliveryTime: string | Date,
    public readonly sizes: { size: string; available: boolean }[],
    public readonly category: ProductCategory,
  ) { }

  static create(data: Partial<Product>): Product {
    const id = data.id || uuidv4();
    const title = data.title || '';
    const price = data.price || 0;
    const description = data.description || '';
    const category = data.category!;
    const deliveryTime = data.deliveryTime || new Date();
    const brand = data.brand || '';
    const rating = data.rating || 0;
    const imageUrls = data.imageUrls || [];
    const sizes = data.sizes || [];

    return new Product(
      id,
      title,
      price,
      description,
      brand,
      rating,
      imageUrls,
      deliveryTime,
      sizes,
      category,
    );
  }
}

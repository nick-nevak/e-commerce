import { ProductSchema } from '@infra/products/product.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { from } from 'rxjs';

export type CatalogItemProjection = {
  title: string;
  brand: string;
  price: number;
  description: string;
  imageUrls: string[];
};

export class CatalogRepository {
  constructor(
    @InjectModel(ProductSchema.name)
    private readonly model: Model<CatalogItemProjection>,
  ) {}

  private readonly projection: { [K in keyof CatalogItemProjection]: true } = {
    title: true,
    price: true,
    description: true,
    brand: true,
    imageUrls: true,
  };

  findAll = () => from(this.model.find({}, this.projection).lean().exec());
}

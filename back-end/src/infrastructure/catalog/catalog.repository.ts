import { ProductModel } from '@infra/products/product.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { from } from 'rxjs';

export type CatalogItemModel = {
  title: string;
  brand: string;
  price: number;
  description: string;
  imageUrl: string;
};

export type CatalogItemDocument = { _id: ObjectId } & CatalogItemModel &
  Document;

export class CatalogRepository {
  constructor(
    @InjectModel(ProductModel.name)
    private readonly model: Model<CatalogItemDocument>,
  ) { }

  private readonly projection: { [K in keyof CatalogItemModel]: any } = {
    title: 1,
    price: 1,
    description: 1,
    brand: 1,
    imageUrl: { $arrayElemAt: ['$imageUrls', 0] },
  };

  findAll = () => from(
    this.model.aggregate<CatalogItemDocument>([{ $project: this.projection }]).exec(),
  );
}

import { ProductModel } from '@infra/products/product.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';
import { from, of, switchMap } from 'rxjs';

export type CatalogItemModel = {
  _id: string;
  title: string;
  brand: string;
  price: number;
  description: string;
  imageUrl: string;
};

export type CatalogItemDocument = CatalogItemModel & Document;

export class CatalogRepository {
  constructor(
    @InjectModel(ProductModel.name)
    private readonly model: Model<CatalogItemDocument>,
  ) { }

  private readonly projection: { [K in keyof CatalogItemModel]: any } = {
    _id: 1,
    title: 1,
    price: 1,
    description: 1,
    brand: 1,
    imageUrl: { $arrayElemAt: ['$imageUrls', 0] },
  };

  findAll = () => from(
    this.model.find({}, this.projection).lean().exec(),
  );

  findPage = (page: number, pageSize: number) =>
    of((page - 1) * pageSize).pipe(
      switchMap((skip) =>
        this.model.find({}, this.projection)
          .skip(skip)
          .limit(pageSize)
          .lean()
          .exec()
      )
    );


  findByCategoryId = (id: string) => from(
    this.model.find({ category: id }, this.projection)
      .lean()
      .exec(),
  );
}

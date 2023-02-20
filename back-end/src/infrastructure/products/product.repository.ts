import { Product } from '@domain/product/product';
import { InjectModel } from '@nestjs/mongoose';
import { log, proceed, throwErrorIfNullish } from '@shared/utils/rx/rx-js';
import { Model } from 'mongoose';
import { from, map, switchMap } from 'rxjs';
import { ProductDocument, ProductModel } from './product.schema';

export class ProductRepository {
  constructor(
    @InjectModel(ProductModel.name)
    private readonly model: Model<ProductDocument>,
  ) { }

  create = (product: Product) => from(new this.model(product).save());

  findById = (id: string) => from(this.model.findById(id).exec())
    .pipe(throwErrorIfNullish(`Product with id ${id} not found`));

  findAll = () => from(this.model.find().exec());

  update = (id: string, product: Product) =>
    from(this.model.findByIdAndUpdate(id, product, { new: true }).exec())
      .pipe(throwErrorIfNullish(`Product with id ${id} not found`));

  delete = (id: string) =>
    from(this.model.findByIdAndDelete(id).exec()).pipe(map(() => null));

  seed = (products: InstanceType<typeof ProductModel>[]) => from(this.model.estimatedDocumentCount().exec()).pipe(
    switchMap(count => count > 0
      ? proceed().pipe(
        log('Products already exist in the database. Skipping seed data.'))
      : from(this.model.insertMany(products)).pipe(
        log('Seed data added to the database.'))
    )
  );
}

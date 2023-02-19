import { Product } from '@domain/product/product';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { from, map } from 'rxjs';
import { ProductDocument, ProductModel } from './product.schema';

export class ProductRepository {
  constructor(
    @InjectModel(ProductModel.name)
    private readonly model: Model<ProductDocument>,
  ) {}

  create = (product: Product) => from(new this.model(product).save());

  findById = (id: string) => from(this.model.findById(id).exec());

  findAll = () => from(this.model.find().exec());

  update = (id: string, product: Product) =>
    from(this.model.findByIdAndUpdate(id, product, { new: true }).exec());

  delete = (id: string) =>
    from(this.model.findByIdAndDelete(id).exec()).pipe(map(() => null));

  seed = async (products: InstanceType<typeof ProductModel>[]) => {
    const count = await this.model.estimatedDocumentCount();
    if (count > 0) {
      console.log(
        'Products already exist in the database. Skipping seed data.',
      );
      return;
    }

    await this.model.insertMany(products);
    console.log('Seed data added to the database.');
  };
}

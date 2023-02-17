import { Product } from '@domain/product/product';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { from, map, Observable } from 'rxjs';
import { ProductSchema } from './product.schema';

export class ProductRepository {
  constructor(
    @InjectModel(ProductSchema.name)
    private readonly model: Model<ProductSchema>,
  ) {}

  create = (product: Product) => from(new this.model(product).save());

  findById = (id: string) => from(this.model.findById(id).exec());

  findAll = () => from(this.model.find().exec());

  update = (id: string, product: Product) =>
    from(this.model.findByIdAndUpdate(id, product, { new: true }).exec());

  delete = (id: string): Observable<void> =>
    from(this.model.findByIdAndDelete(id).exec()).pipe(map(() => null));
}

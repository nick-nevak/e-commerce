import { CategoryDocument } from '@infra/categories/categories.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, Types } from 'mongoose';

@Schema({ collection: 'products' })
export class ProductModel {
  @Prop()
  title: string;

  @Prop()
  price: number;

  @Prop()
  description: string;

  @Prop()
  deliveryTime: Date;

  @Prop()
  brand: string;

  @Prop()
  rating: number;

  @Prop([String])
  imageUrls: string[];

  @Prop([{ size: String, available: Boolean }])
  sizes: { size: string; available: boolean }[];

  @Prop({ type: Types.ObjectId, ref: 'Category' })
  category: CategoryDocument;
}

export type ProductDocument = { _id: ObjectId } & ProductModel & Document;

export const ProductSchema = SchemaFactory.createForClass(ProductModel);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ collection: 'categories' })
export class CategoryModel {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  depth: number;

  @Prop({ required: true })
  left: number;

  @Prop({ required: true })
  right: number;

  @Prop({ type: Types.ObjectId, ref: 'Category' })
  parent: CategoryModel;
}

export type CategoryDocument = CategoryModel & Document;
export const CategorySchema = SchemaFactory.createForClass(CategoryModel);

// CategorySchema.index({ left: 1, right: -1 });
// CategorySchema.index({ left: 1, right: 1 });
CategorySchema.index({ left: 1 });
// CategorySchema.index({ left: -1 });
// CategorySchema.index({ right: 1 });
// CategorySchema.index({ right: -1 });

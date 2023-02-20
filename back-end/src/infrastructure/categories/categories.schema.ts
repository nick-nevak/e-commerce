import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'categories' })
export class CategoryModel {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  left: number;

  @Prop({ required: true })
  right: number;
}

export type CategoryDocument = CategoryModel & Document;
export type CategoryDocumentWithDepth = CategoryDocument & { depth: number };
export const CategorySchema = SchemaFactory.createForClass(CategoryModel);

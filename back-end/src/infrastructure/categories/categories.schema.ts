import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';

@Schema()
export class CategoryModel {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  left: number;

  @Prop({ required: true })
  right: number;
}

export type CategoryDocument = { _id: ObjectId } & CategoryModel & Document;
export const CategorySchema = SchemaFactory.createForClass(CategoryModel);

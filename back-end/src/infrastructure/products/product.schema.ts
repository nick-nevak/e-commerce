import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export class ProductSchema {
  @Prop()
  title: string;

  @Prop()
  price: number;

  @Prop()
  description: string;

  @Prop()
  category: string;

  @Prop()
  deliveryTime: string | Date;

  @Prop()
  brand: string;

  @Prop()
  rating: number;

  @Prop([String])
  imageUrls: string[];

  @Prop([{ size: String, available: Boolean }])
  sizes: { size: string; available: boolean }[];
}

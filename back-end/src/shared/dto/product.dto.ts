import { ProductCategoryDto } from "./catogory.dto";

export interface ProductDto {
  id: string;
  title: string;
  price: number;
  description: string;
  category: ProductCategoryDto;
  deliveryTime: string | Date;
  brand: string;
  rating: number;
  imageUrls: string[];
  sizes: { size: string; available: boolean }[];
}

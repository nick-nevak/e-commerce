export type ProductDetails = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  deliveryTime: string | Date;
  brand: string;
  rating: number;
  imageUrls: string[];
  sizes: {
    size: string;
    available: boolean;
  }[];
};

import { faker } from "@faker-js/faker";
import { ProductDetails } from "../../types/product-details";

export const mockProductDetails: ProductDetails = {
  id: faker.datatype.number(),
  title: faker.commerce.productName(),
  brand: faker.company.name(),
  price: Number(faker.commerce.price()),
  description: faker.commerce.productDescription(),
  imageUrls: [...Array(4)].map((_, i) =>
    faker.image.imageUrl(undefined, undefined, "cats", true)
  ),
  rating: faker.datatype.number({ min: 1, max: 5 }),
  category: faker.commerce.productMaterial(),
  deliveryTime: faker.date.soon(),
  sizes: ["S", "M", "L", "XL"].map((size) => ({
    size,
    available: faker.datatype.boolean(),
  })),
};

import { faker } from "@faker-js/faker";
import { Product } from "../../types/product";

export const mockProducts: Product[] = [...Array(50)].map((_, i) => ({
  id: faker.datatype.uuid(),
  title: faker.commerce.productName(),
  price: Number(faker.commerce.price()),
  description: faker.commerce.productDescription(),
  category: faker.commerce.department(),
  brand: faker.company.name(),
  image: faker.image.imageUrl(),
  rating: Number(faker.finance.amount(0, 5, 1)),
  imageUrl: faker.image.imageUrl(undefined, undefined, "cats", true),
}));

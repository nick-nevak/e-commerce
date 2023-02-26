import { faker } from '@faker-js/faker';
import { CategoryDocument } from '@infra/categories/categories.schema';
import { ProductModel } from '@infra/products/product.schema';

export const generateProductsSeed = (amount: number, category: CategoryDocument): InstanceType<typeof ProductModel>[] =>
  [...Array(amount)].map(() => ({
    title: faker.commerce.productName(),
    brand: faker.company.name(),
    price: Number(faker.commerce.price()),
    description: faker.commerce.productDescription(),
    imageUrls: [...Array(4)].map((_, i) =>
      faker.image.imageUrl(undefined, undefined, 'cats', true),
    ),
    rating: faker.datatype.number({ min: 1, max: 5 }),
    deliveryTime: faker.date.soon(),
    sizes: ['S', 'M', 'L', 'XL'].map((size) => ({
      size,
      available: faker.datatype.boolean(),
    })),
    category: category._id,
  }));

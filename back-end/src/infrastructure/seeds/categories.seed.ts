import { faker } from '@faker-js/faker';

export type CategorySeed = {
  name: string;
  children: CategorySeed[] | null;
};

export const categoriesSeed = {
  name: 'root',
  children: generateCategories(2)
};

function generateCategories(depth: number): CategorySeed[] {
  const categories: CategorySeed[] = [];
  const count = faker.datatype.number({ min: 2, max: 2 })

  for (let i = 0; i < count; i++) {
    const category: CategorySeed = {
      name: faker.commerce.department(),
      children: depth > 1 ? generateCategories(depth - 1) : null,
    };
    categories.push(category);
  }

  return categories;
};
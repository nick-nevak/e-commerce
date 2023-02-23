import { faker } from '@faker-js/faker';

export type CategorySeed = {
  name: string;
  children: CategorySeed[] | null;
};

const lvlQtyConfig = {
  1: faker.datatype.number({ min: 10, max: 20 }),
  2: faker.datatype.number({ min: 6, max: 13 }),
  3: 30,
};

export const categoriesSeed = {
  name: 'root',
  children: generateCategories(3),
};

function generateCategories(depth: number): CategorySeed[] {
  const categories: CategorySeed[] = [];
  const count = lvlQtyConfig[depth];

  for (let i = 0; i < count; i++) {
    const category: CategorySeed = {
      name: faker.commerce.department(),
      children: depth > 1 ? generateCategories(depth - 1) : null,
    };
    categories.push(category);
  };

  return categories;
};
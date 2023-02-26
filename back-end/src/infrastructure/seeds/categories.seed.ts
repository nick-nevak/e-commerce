import { faker } from '@faker-js/faker';

export type CategorySeed = {
  name: string;
  children: CategorySeed[] | null;
};

const getQuantityForDepth = (depth: number) => ([
  30,
  faker.datatype.number({ min: 6, max: 13 }),
  faker.datatype.number({ min: 10, max: 20 }),
  faker.datatype.number({ min: 2, max: 3 }),
][depth]);

const generateCategories = (depth: number, maxDepth: number): CategorySeed[] => {
  const categories: CategorySeed[] = [];
  const quantity = getQuantityForDepth(depth);

  for (let i = 0; i < quantity; i++) {
    categories.push({
      name: faker.commerce.department(),
      children: depth < (maxDepth - 1) ? generateCategories(depth + 1, maxDepth) : null,
    });
  };
  return categories
};

export const maxDepth = 4;

export const generateCategoriesSeed = () => ({
  name: 'root',
  children: generateCategories(0, maxDepth),
});
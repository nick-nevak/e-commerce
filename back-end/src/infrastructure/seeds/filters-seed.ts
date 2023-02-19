import { faker } from '@faker-js/faker';

export type Filter = {
  name: string;
  values: FilterValue[];
};

export type FilterValue = {
  name: string;
  checked: boolean;
};

export const seedFilters: Filter[] = [...Array(5)].map((_, i) => ({
  id: faker.datatype.uuid(),
  name: faker.commerce.department(),
  values: [...Array(10)].map((_, i) => ({
    id: faker.datatype.uuid(),
    name: faker.commerce.productMaterial(),
    checked: faker.datatype.boolean(),
  })),
}));

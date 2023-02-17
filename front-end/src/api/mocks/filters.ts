import { faker } from "@faker-js/faker";
import { Filter } from "../../types/filters";

export const mockFilters: Filter[] = [...Array(5)].map((_, i) => ({
  id: faker.datatype.uuid(),
  name: faker.commerce.department(),
  values: [...Array(10)].map((_, i) => ({
    id: faker.datatype.uuid(),
    name: faker.commerce.productMaterial(),
    checked: faker.datatype.boolean(),
  })),
}));

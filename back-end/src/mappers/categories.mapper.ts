import { Category } from "@domain/category/category";
import { CategoryDocument } from "@infra/categories/categories.schema";
import { CategoryDto } from "@shared/dto/catogory.dto";
import { map } from "lodash/fp";

export const toCategoriesTree = (all: CategoryDocument[]): Category => {
  const root = all.find((c) => c.left === 1)!;
  return toCategory(root, all);
}

export const toCategory = (current: CategoryDocument, all: CategoryDocument[],): Category => ({
  id: current._id.toString(),
  name: current.name,
  children: all.filter(
    (c) => c.left > current.left && c.right < current.right,
  ).map((c) => toCategory(c, all)),
});

// export const toCategoryZ = (c: CategoryDocument, children: Category[] | null): Category => ({
//   id: c.id,
//   name: c.name,
//   children: children
// });

// export const toCategory2 = (current: CategoryDocument, all: CategoryDocument[],): Category => {
//   const directChildren = current.left;
//   const firstDirectChild = all.find(c => c.left === current.left + 1)
//   const deepestNodes = all.filter(c => c.left - c.right === 1);
//   const g = deepestNodes.

// };

export const toCategoryDto = (c: Category): CategoryDto =>
  ({ ...c });

export const toCategoryDtos = map(toCategoryDto)
import { Category, ProductCategory } from "@domain/category/category";
import { CategoryDocument } from "@infra/categories/categories.schema";
import { CategoryDto } from "@shared/dto/catogory.dto";
import { map } from "lodash/fp";

export const toCategory = (c: CategoryDocument): Category => c as any as Category;

export const toProductCategory = (c: CategoryDocument): ProductCategory => ({
  id: c.id, name: c.name
});

export const toCategories = map(toCategory)

export const toCategoriesTree = (docs: CategoryDocument[]): Category => {
  const root = docs.find(d => d.depth === 1)!;
  const rootCategory = toCategory(root);

  const buildTree = (parentNode: Category, parentDoc: CategoryDocument) => {
    const childDocs = docs
      .filter(subC =>
        subC.left > parentDoc.left &&
        subC.right < parentDoc.right &&
        subC.depth === parentDoc.depth + 1
      );
    const childNodes = childDocs.map(toCategory);

    parentNode.children = childNodes.length ? childNodes : null;

    for (let i = 0; i < childDocs.length; i++) {
      buildTree(childNodes[i], childDocs[i]);
    }
  }

  buildTree(rootCategory, root);

  return rootCategory;
}

export const toCategoryDto = (c: Category): CategoryDto =>
  ({ ...c });

export const toProductCategoryDto = (c: ProductCategory): ProductCategory => ({
  id: c.id, name: c.name
});

export const toCategoryDtos = map(toCategoryDto)
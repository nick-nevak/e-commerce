import { Category } from "@domain/category/category";
import { CategoryDocument, CategoryDocumentWithDepth } from "@infra/categories/categories.schema";
import { CategoryDto } from "@shared/dto/catogory.dto";
import { map } from "lodash/fp";

export const toCategory = (c: CategoryDocument): Category => ({
  id: c._id,
  name: c.name,
  children: null
});

export const toCategories = map(toCategory)

export const toCategoriesTree = (docs: CategoryDocumentWithDepth[]): Category => {
  const root = docs.find(d => d.depth === 1)!;
  const rootCategory = toCategory(root);

  const buildTree = (parentNode: Category, parentDoc: CategoryDocumentWithDepth) => {
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

export const toCategoryDtos = map(toCategoryDto)
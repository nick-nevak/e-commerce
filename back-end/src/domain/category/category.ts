export type Category = {
  id: string;
  name: string;
  children: Category[] | null;
};

export type ProductCategory = {
  id: string;
  name: string;
};
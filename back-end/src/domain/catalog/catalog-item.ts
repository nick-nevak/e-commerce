import { v4 as uuidv4 } from 'uuid';

export class CatalogItem {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly brand: string,
    public readonly price: number,
    public readonly description: string,
    public readonly imageUrl: string,
  ) {}

  static create(data: Partial<CatalogItem>): CatalogItem {
    const id = data.id || uuidv4();
    const title = data.title || '';
    const brand = data.brand || '';
    const price = data.price || 0;
    const description = data.description || '';
    const imageUrl = data.imageUrl || '';

    return new CatalogItem(id, title, brand, price, description, imageUrl);
  }
}

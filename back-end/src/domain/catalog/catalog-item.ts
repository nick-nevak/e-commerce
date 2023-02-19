export class CatalogItem {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly brand: string,
    public readonly price: number,
    public readonly description: string,
    public readonly imageUrl: string,
  ) {}

  static create(item: InstanceType<typeof CatalogItem>): CatalogItem {
    return new CatalogItem(
      item.id,
      item.title,
      item.brand,
      item.price,
      item.description,
      item.imageUrl,
    );
  }
}

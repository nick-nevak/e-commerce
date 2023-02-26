import { CategoriesRepository } from '@infra/categories/categories.repository';
import { toCategories, toCategoriesTree } from '@mappers/categories.mapper';
import { Injectable } from '@nestjs/common';
import { map } from 'rxjs';

@Injectable()
export class CategoriesService {
  constructor(private readonly repository: CategoriesRepository) { }

  getFullTree = () => this.repository.findFullTree();

  getChildrenOf = (id: string) =>
    this.repository.findChildrenOf(id).pipe(
      map(toCategoriesTree)
    );

  getPathById = (id: string) =>
    this.repository.findParentsOf(id).pipe(
      map(toCategories)
    );

}

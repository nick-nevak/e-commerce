import { CategoriesRepository } from '@infra/categories/categories.repository';
import { toCategories, toCategoriesTree } from '@mappers/categories.mapper';
import { Injectable } from '@nestjs/common';
import { throwErrorIfNullish } from '@shared/utils/rx/rx-js';
import { map, switchMap } from 'rxjs';

@Injectable()
export class CategoriesService {
  constructor(private readonly repository: CategoriesRepository) { }

  getFullTree = () =>
    this.repository.findByName('root').pipe(
      throwErrorIfNullish('Root category not found'),
      switchMap(({ id }) => this.getTreeById(id)),
    );

  getTreeById = (id: string) =>
    this.repository.findWithDepthById(id).pipe(
      map(toCategoriesTree)
    );

  getDirectChildrenById = (id: string) =>
    this.repository.findDirectChildrenById(id).pipe(
      map(toCategories)
    );

  getPathById = (id: string) =>
    this.repository.findPathById(id).pipe(
      map(toCategories)
    );

  getLeafs = () =>
    this.repository.findLeafs().pipe(
      map(toCategories)
    );

}

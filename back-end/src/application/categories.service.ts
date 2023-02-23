import { CategoriesRepository } from '@infra/categories/categories.repository';
import { toCategories } from '@mappers/categories.mapper';
import { Injectable } from '@nestjs/common';
import { throwErrorIfNullish } from '@shared/utils/rx/rx-js';
import { map, switchMap, tap } from 'rxjs';

@Injectable()
export class CategoriesService {
  constructor(private readonly repository: CategoriesRepository) { }

  getFullTree = (): any =>
    this.repository.findByName('root').pipe(
      throwErrorIfNullish('Root category not found'),
      switchMap(({ id }) => this.getChildrenOf(id)),
    );

  getChildrenOf = (id: string) =>
    this.repository.findChildrenOf2(id).pipe(
      // map(toCategoriesTree),
      tap((x) => { console.log('mapped'); })
    );

  getPathById = (id: string) =>
    this.repository.findParentsOf(id).pipe(
      map(toCategories)
    );

}

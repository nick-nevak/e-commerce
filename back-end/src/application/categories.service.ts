import { CategoriesRepository } from '@infra/categories/categories.repository';
import { toCategoriesTree } from '@mappers/categories.mapper';
import { Injectable } from '@nestjs/common';
import { from, map, tap } from 'rxjs';

@Injectable()
export class CategoriesService {
  constructor(private readonly repository: CategoriesRepository) { }

  getAll = () => from(this.repository.findWithDepthById('63f29af1f5b735243ec7049d')).pipe(
    tap(x => {
      console.warn('CATEGORIES FROM DB', JSON.stringify(x))
    }),
    map(toCategoriesTree),
    tap(x => {
      //console.warn('CATEGORIES AFTER MAPPING');
    }),
  );
}

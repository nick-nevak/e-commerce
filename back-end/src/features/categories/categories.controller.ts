import { CategoriesService } from '@app/categories.service';
import { toCategoryDto } from '@mappers/categories.mapper';
import { Controller, Get } from '@nestjs/common';
import { map } from 'rxjs';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly serive: CategoriesService) { }

  @Get()
  getAll() {
    return this.serive.getAll().pipe(map(toCategoryDto));
  }
}

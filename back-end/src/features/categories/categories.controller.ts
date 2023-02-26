import { CategoriesService } from '@app/categories/categories.service';
import { toCategoryDto, toCategoryDtos } from '@mappers/categories.mapper';
import { Controller, Get, Param } from '@nestjs/common';
import { map } from 'rxjs';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly serive: CategoriesService) { }

  @Get('/')
  getFullTree() {
    return this.serive.getFullTree();
  }

  @Get('subcategories/:id')
  getSubtree(@Param('id') id: string) {
    return this.serive.getChildrenOf(id).pipe(map(toCategoryDto));
  }


  @Get('path-to/:id')
  getPathById(@Param('id') id: string) {
    return this.serive.getPathById(id).pipe(map(toCategoryDtos));
  }
}

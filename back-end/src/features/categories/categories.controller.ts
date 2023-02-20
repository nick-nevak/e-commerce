import { CategoriesService } from '@app/categories.service';
import { toCategoryDto, toCategoryDtos } from '@mappers/categories.mapper';
import { Controller, Get, Param } from '@nestjs/common';
import { map } from 'rxjs';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly serive: CategoriesService) { }

  @Get()
  getFullTree() {
    return this.serive.getFullTree().pipe(map(toCategoryDto));
  }

  @Get('subcategories/:id')
  getSubtree(@Param('id') id: string) {
    return this.serive.getTreeById(id).pipe(map(toCategoryDto));
  }

  @Get('direct-children/:id')
  getDirectChildrenOf(@Param('id') id: string) {
    return this.serive.getDirectChildrenById(id).pipe(map(toCategoryDtos));
  }

  @Get('path-to/:id')
  getPathById(@Param('id') id: string) {
    return this.serive.getPathById(id).pipe(map(toCategoryDtos));
  }
  @Get('leafs')
  getLeafs() {
    return this.serive.getLeafs().pipe(map(toCategoryDtos));
  }
}

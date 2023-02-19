import { ProductsService } from '@app/product/products.service';
import { mapProductToDto } from '@mappers/product.mapper';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductDto } from '@shared/dto/product.dto';
import { map } from 'rxjs/operators';

@Controller('products')
export class ProductsController {
  constructor(private readonly serive: ProductsService) {}

  @Get()
  getAllProducts() {
    return this.serive
      .getAllProducts()
      .pipe(map((products) => products.map(mapProductToDto)));
  }

  @Get(':id')
  getProductById(@Param('id') id: string) {
    console.warn('NEVAK id is:', id);
    return this.serive.getProductById(id).pipe(map(mapProductToDto));
  }

  @Post()
  createProduct(@Body() product: ProductDto) {
    return this.serive.createProduct(product).pipe(map(mapProductToDto));
  }

  @Put(':id')
  updateProduct(@Param('id') id: string, @Body() product: ProductDto) {
    return this.serive.updateProduct(id, product).pipe(map(mapProductToDto));
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return this.serive.deleteProduct(id);
  }
}

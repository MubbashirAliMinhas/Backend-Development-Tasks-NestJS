import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { UpdateQuantityDto } from './dtos/update-quantity.dto';

@Controller('product')
export class ProductController {
    constructor(private productService: ProductService) {}

    @Get(':id')
    async getProduct(@Param('id', ParseIntPipe) id: number) {
        return await this.productService.getProduct(id)
    }

    @Get()
    async getProducts() {
        return await this.productService.getProducts()
    }

    @Post()
    async createProduct(@Body() createProductDto: CreateProductDto) {
        return await this.productService.createProduct(createProductDto)
    }

    @Put(':id')
    async updateProduct(@Param('id', ParseIntPipe) id: number, @Body() updateProductDto: UpdateProductDto) {
        return await this.productService.updateProduct(id, updateProductDto)
    }

    @Delete(':id')
    async deleteProduct(@Param('id', ParseIntPipe) id: number) {
        return await this.productService.deleteProduct(id)
    }

    @Patch(':id')
    async updateQuantity(@Param('id', ParseIntPipe) id: number, @Body() updateQuantityDto: UpdateQuantityDto) {
        return await this.productService.updateQuantity(id, updateQuantityDto.quantity)
    }
}

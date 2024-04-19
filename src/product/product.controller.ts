import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { UpdateQuantityDto } from './dtos/update-quantity.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Product } from 'src/TypeORM/entities/product.entity';

@ApiTags('Product')
@Controller('product')
export class ProductController {
    constructor(private productService: ProductService) {}

    @ApiResponse({
        status: 200,
        description: 'Product with the specified id is returned.',
        type: Product
    })
    @ApiResponse({
        status: 404,
        description: 'When product is not found.'
    })
    @Get(':id')
    async getProduct(@Param('id', ParseIntPipe) id: number) {
        return await this.productService.getProduct(id)
    }

    @ApiResponse({
        status: 200,
        description: 'Returns all the products.',
        type: [Product]
    })
    @Get()
    async getProducts() {
        return await this.productService.getProducts()
    }

    @ApiResponse({
        status: 200,
        description: 'Product is added when correct details are entered.',
        type: Product
    })
    @ApiResponse({
        status: 400,
        description: 'When incorrect product details are entered.'
    })
    @Post()
    async createProduct(@Body() createProductDto: CreateProductDto) {
        return await this.productService.createProduct(createProductDto)
    }

    @ApiResponse({
        status: 200,
        description: 'Updated product with the specified id is returned.',
        type: Product
    })
    @ApiResponse({
        status: 404,
        description: 'When product is not found.'
    })
    @ApiResponse({
        status: 400,
        description: 'When incorrect product details are entered.'
    })
    @Put(':id')
    async updateProduct(@Param('id', ParseIntPipe) id: number, @Body() updateProductDto: UpdateProductDto) {
        return await this.productService.updateProduct(id, updateProductDto)
    }

    @ApiResponse({
        status: 200,
        description: 'Product with the specified id is returned and deleted from the db.',
        type: Product
    })
    @ApiResponse({
        status: 404,
        description: 'When product is not found.'
    })
    @Delete(':id')
    async deleteProduct(@Param('id', ParseIntPipe) id: number) {
        return await this.productService.deleteProduct(id)
    }

    @ApiResponse({
        status: 200,
        description: 'Updates quantity of product and product with the specified id is returned.',
        type: Product
    })
    @ApiResponse({
        status: 404,
        description: 'When product is not found.'
    })
    @ApiResponse({
        status: 400,
        description: 'When incorrect product details are entered.'
    })
    @Patch(':id')
    async updateQuantity(@Param('id', ParseIntPipe) id: number, @Body() updateQuantityDto: UpdateQuantityDto) {
        return await this.productService.updateQuantity(id, updateQuantityDto.quantity)
    }
}

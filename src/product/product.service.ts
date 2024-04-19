import { HttpException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../TypeORM/entities/product.entity';
import { Repository } from 'typeorm';
import { CreateProductType } from './types/create-product.type';
import { UpdateProductType } from './types/update-product.type';
import { QuantityProductType } from './types/quantity-product.type';

@Injectable()
export class ProductService {
    private logger = new Logger(ProductService.name)

    constructor(
        @InjectRepository(Product) private productRepository: Repository<Product>,
    ) {}

    async createProduct(product: CreateProductType) {
        const newProduct = this.productRepository.create(product)
        this.logger.log('Creating new product.')
        return await this.productRepository.save(newProduct)
    }

    async getProduct(id: number) {
        const product = await this.productRepository.findOne({where: {id}})
        if (!product) {
            this.logger.warn('Product not found.')
            throw new NotFoundException(`Product with id: ${id} does not exist.`)
        }
        this.logger.log('Getting a product.')
        return product
    }

    async getProducts() {
        this.logger.log('Getting all the products.')
        return await this.productRepository.find()
    }

    async updateProduct(id: number, product: UpdateProductType) {
        const updatedProduct = await this.productRepository.update({id}, product)
        if (!updatedProduct) {
            this.logger.warn('Product not found.')
            throw new NotFoundException(`Product with id: ${id} does not exist.`)
        }
        this.logger.log('Updating a product.')
        return updatedProduct
    }

    async updateQuantity(id: number, quantity: number) {
        const product = await this.productRepository.update(
            { id },
            { quantity }
        )
        if (!product) {
            this.logger.warn('Product not found.')
            throw new NotFoundException(`Product with id: ${id} does not exist.`)
        }
        this.logger.log('Updating quantity of a product.')
        return product
    }

    async deleteProduct(id: number) {
        const product = await this.productRepository.delete({id})
        if (!product) {
            this.logger.warn('Product not found.')
            throw new NotFoundException(`Product with id: ${id} does not exist.`)
        }
        this.logger.log('Deleting a product.')
        return product
    }

    async reduceQuantities(productQuantities: QuantityProductType[]) {
        const productIds = productQuantities.map(prod => { 
            return { 
                id: prod.id
            }
        })
        const products = await this.productRepository.find({
            where: productIds
        })

        if (!products) {
            throw new NotFoundException(`Product with the ids do not exist.`)
        }

        for (let i = 0; i < products.length; i++) {
            let quantity = productQuantities[i].quantity
            if (products[i].quantity - quantity < 0) {
                throw new HttpException(`Only ${products[i].quantity} items of product ${products[i].name} available in the stock. You have entered ${quantity}.`, 400)
            }
            
            products[i].quantity -= quantity
        }
        return await this.productRepository.save(products)
    }
}

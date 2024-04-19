import { Get, HttpException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/TypeORM/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserType } from './types/create-user.type';
import * as bcrypt from 'bcrypt'
import { CreateOrderType } from './types/create-order.type';
import { ProductService } from 'src/product/product.service';
import { Order } from 'src/TypeORM/entities/order.entity';

@Injectable()
export class UserService {
    private logger = new Logger(UserService.name)

    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Order) private orderRepository: Repository<Order>,
        private productService: ProductService
    ) {}

    async createUser(user: CreateUserType) {
        const existUser = await this.userRepository.findOne({
            where: {
                email: user.email
            }
        })

        if (existUser) {
            this.logger.warn('User already exist.')
            throw new HttpException('User already exist with that email', 400)
        }

        user.password = await bcrypt.hash(user.password, 10)
        const newUser = this.userRepository.create(user)

        this.logger.log('Creating a new user.')
        return await this.userRepository.save(newUser)
    }

    async findUser(email: string) {
        const user = await this.userRepository.findOne({
            where: {
                email
            }
        })
        this.logger.log('Getting a user using email.')
        return user
    }

    async getUser(id: number) {
        this.logger.log('Getting a user using id.')
        return await this.userRepository.findOne({
            where: {
                id
            }
        })
    }

    async createOrder(order: CreateOrderType) {
        const purchasedProducts = (await this.productService.reduceQuantities(order.products)).map(product => {
            const { id, ...purchasedProduct } = product
            return purchasedProduct
        })

        let totalPrice = 0
        for (let i = 0; i < purchasedProducts.length; i++) {
            totalPrice += purchasedProducts[i].price * order.products[i].quantity
        }

        const createOrder = this.orderRepository.create({
            user: {
                id: order.userId
            },
            purchasedProduct: purchasedProducts,
            totalPrice
        })

        this.logger.log('Creating an order for the user.')
        return await this.orderRepository.save(createOrder)
    }
    
    async getOrder(userId: number) {
        this.logger.log('Getting all the orders of the user.')
        return await this.orderRepository.find({
            where: {
                user: {
                    id: userId
                },
            },
            relations: ['purchasedProduct']
        })
    }
}

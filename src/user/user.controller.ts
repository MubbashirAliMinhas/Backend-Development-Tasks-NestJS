import { Body, Controller, Get, Post, Request, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.gaurd';
import { CreateOrderDto } from './dtos/create-order.dto';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { NestedBody } from '../utils/nested-body.decorator';
import { Order } from '../TypeORM/entities/order.entity';
import { UserPasswordInterceptor } from './user-password.interceptor';
import { UserResponseModel } from './models/user-res.model';

@ApiTags('User')
@Controller('user')
export class UserController {
    constructor(
        private userService: UserService,
    ) {

    }

    @ApiResponse({
        status: 200,
        description: 'Newly created user is returned.',
        type: UserResponseModel
    })
    @ApiResponse({
        status: 400,
        description: 'When wrong user details are entered. Also when user already exist.'
    })
    @UseInterceptors(UserPasswordInterceptor)
    @Post()
    async createUser(@Body() createUserDto: CreateUserDto) {
        const {confirmPassword, ...user} = createUserDto
        return await this.userService.createUser(user)
    }

    @ApiBearerAuth()
    @ApiResponse({
        status: 200,
        description: 'User details is returned as response.',
        type: UserResponseModel
    })
    @ApiUnauthorizedResponse({
        description: 'User is unauthorized.'
    })
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(UserPasswordInterceptor)
    @Get('profile')
    async getProfile(@Request() req) {
        return await this.userService.getUser(req.user.id as number)
    }

    @ApiBearerAuth()
    @ApiBody({
        type: CreateOrderDto
    })
    @ApiResponse({
        status: 200,
        description: 'Newly created order is returned.',
        type: Order
    })
    @ApiResponse({
        status: 400,
        description: 'When wrong order details are entered.'
    })
    @ApiUnauthorizedResponse({
        description: 'User is unauthorized.'
    })
    @UsePipes(ValidationPipe)
    @UseGuards(JwtAuthGuard)
    @Post('order')
    async createOrder(@Request() req, @NestedBody() createOrderDto: CreateOrderDto) {
        const order = {
            userId: req.user.id,
            ...createOrderDto
        }
        return await this.userService.createOrder(order)
    }

    @ApiBearerAuth()
    @ApiResponse({
        status: 200,
        description: 'Returns all the orders of the authorized user.',
        type: [Order]
    })
    @ApiUnauthorizedResponse({
        description: 'User is unauthorized.'
    })
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(CacheInterceptor)
    @Get('order')
    async getOrder(@Request() req) {
        return await this.userService.getOrder(req.user.id)
    }
}

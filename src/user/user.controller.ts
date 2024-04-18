import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.gaurd';
import { CreateOrderDto } from './dtos/create-order.dto';

@Controller('user')
export class UserController {
    constructor(
        private userService: UserService,
    ) {

    }

    @Post()
    async createUser(@Body() createUserDto: CreateUserDto) {
        const {confirmPassword, ...user} = createUserDto
        return await this.userService.createUser(user)
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    async getProfile(@Request() req) {
        return await this.userService.getUser(req.user.id)
    }

    @UseGuards(JwtAuthGuard)
    @Post('order')
    async createOrder(@Request() req, @Body() createOrderDto: CreateOrderDto) {
        const order = {
            userId: req.user.id as number,
            ...createOrderDto
        }
        return await this.userService.createOrder(order)
    }

    @UseGuards(JwtAuthGuard)
    @Get('order')
    async getOrder(@Request() req) {
        return await this.userService.getOrder(req.user.id)
    }
}

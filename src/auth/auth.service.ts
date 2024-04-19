import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
    private logger = new Logger(AuthService.name)

    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) {}

    async validateUser(email: string, password: string) {
        const user = await this.userService.findUser(email)
        if (!user) {
            this.logger.warn('User not found.')
            throw new NotFoundException('User does not exist with entered email')
        }

        if (await bcrypt.compare(password, user.password)) {
            const { password, ...result } = user
            this.logger.log('logged in successfully.')
            return result
        }
        
        this.logger.warn('Password does not match.')
        throw new BadRequestException('Password does not match.')
    }

    async login(user: any) {
        const payload = { id: user.id }
        this.logger.log('Generating a JWT token.')
        return {
            access_token: this.jwtService.sign(payload)
        }
    }
}

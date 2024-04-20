import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "./auth.service";
import { plainToInstance } from "class-transformer";
import { LoginUserDto } from "../user/dtos/login-user.dto";
import { validate } from "class-validator";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({
            usernameField: 'email'
        })
    }

    async validate(email: string, password: string) {
        const loginUserDto = plainToInstance(LoginUserDto, { email, password })
        const errors = await validate(loginUserDto)
        if (errors.length != 0) {
            throw new BadRequestException(errors.map(error => {
                return {
                    field: error.property,
                    message: Object.values(error.constraints)[0]
                }
            }))
        }
        const user = await this.authService.validateUser(email, password)
        return user
    }
}
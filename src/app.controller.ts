import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginUserDto } from './user/dtos/login-user.dto';
import { TokenResponseModel } from './auth/models/token.model';

@ApiTags('Auth Login')
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService
  ) {}

  @ApiBody({
    type: LoginUserDto
  })
  @ApiResponse({
    status: 200,
    description: 'When a user successfully logs in with the correct credentials.',
    type: TokenResponseModel
  })
  @ApiResponse({
    status: 404,
    description: 'When user does not exist with the entered email.'
  })
  @ApiResponse({
    status: 400,
    description: 'When validation fails or when incorrect password is entered.'
  })
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}

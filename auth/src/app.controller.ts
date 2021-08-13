import {
  Body,
  ConflictException,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user/user.service';
import { UserSignUpDto } from './user/dtos/user-sign-up.dto';
import { User } from './schemas/user.schema';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';

@Controller('api/users')
export class AppController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(AuthGuard('local'))
  @Post('/sign-in')
  async signIn(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('/sign-out')
  signOut(): string {
    return 'Hello World!';
  }

  @Post('/sign-up')
  async signUp(@Body() userSignUpDto: UserSignUpDto): Promise<User> {
    const user = await this.userService.createUser(userSignUpDto);
    if (!user) {
      throw new ConflictException('Email already taken');
    }
    return user;
  }

  @Get('/current-user')
  getHello(): string {
    return 'Hello World!';
  }
}

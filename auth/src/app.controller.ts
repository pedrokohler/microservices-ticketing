import {
  Body,
  ConflictException,
  Controller,
  Get,
  Post,
  Request,
  Session,
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
  async signIn(@Request() req, @Session() session) {
    const jwt = await this.authService.login(req.user);
    session.jwt = jwt;
    return 'Ok';
  }

  @Post('/sign-out')
  signOut(@Session() session) {
    session = null;
    return 'Ok';
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/whoami')
  getCurrentUser(@Request() req) {
    return req.user;
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

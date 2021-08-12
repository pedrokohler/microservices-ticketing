import { Body, ConflictException, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserSignUpDto } from '../dtos/user-sign-up.dto';
import { User } from '../schemas/user.schema';

@Controller('api/users')
export class UserController {
  constructor(private readonly appService: UserService) {}

  @Post('/sign-in')
  signIn(): string {
    return 'Hello World!';
  }

  @Post('/sign-out')
  signOut(): string {
    return 'Hello World!';
  }

  @Post('/sign-up')
  async signUp(@Body() userSignUpDto: UserSignUpDto): Promise<User> {
    const user = await this.appService.createUser(userSignUpDto);
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

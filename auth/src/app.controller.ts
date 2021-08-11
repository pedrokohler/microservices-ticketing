import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { UserSignUpDto } from './dtos/user-sign-up.dto';

@Controller('api/users')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/sign-in')
  signIn(): string {
    return this.appService.getHello();
  }

  @Post('/sign-out')
  signOut(): string {
    return this.appService.getHello();
  }

  @Post('/sign-up')
  signUp(@Body() userSignUpDto: UserSignUpDto): string {
    console.log("Creating user")
    return this.appService.getHello();
  }

  @Get('/current-user')
  getHello(): string {
    return this.appService.getHello();
  }
}

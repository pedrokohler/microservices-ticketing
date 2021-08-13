import { Injectable } from '@nestjs/common';
import { PasswordService } from 'src/password/password.service';
import { UserDocument } from 'src/schemas/user.schema';
import { UserService } from 'src/user/user.service';
import { UserSignInDto } from './dtos/user-sign-in.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private passwordService: PasswordService,
  ) {}

  async validateUser(credentials: UserSignInDto): Promise<UserDocument | null> {
    const { email, password } = credentials;
    const user = await this.userService.findOneByEmail(email);
    if (
      user &&
      (await this.passwordService.isCorrect(user.password, password))
    ) {
      return user;
    }
    return null;
  }
}

import { Injectable } from '@nestjs/common';
import { PasswordService } from 'src/password/password.service';
import { UserDocument } from 'src/schemas/user.schema';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private passwordService: PasswordService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<UserDocument | null> {
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

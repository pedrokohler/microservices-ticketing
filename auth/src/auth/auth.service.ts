import { Injectable } from '@nestjs/common';
import { PasswordService } from 'src/password/password.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private passwordService: PasswordService,
  ) {}

}

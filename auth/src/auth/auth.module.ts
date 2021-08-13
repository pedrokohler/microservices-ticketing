import { Module } from '@nestjs/common';
import { PasswordModule } from 'src/password/password.module';
import { UserModule } from 'src/user/user.module';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
})
export class AuthModule {}

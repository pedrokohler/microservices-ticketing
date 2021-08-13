import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { PasswordModule } from 'src/password/password.module';
import { UserModule } from 'src/user/user.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthController } from './auth.controller';

@Module({
  imports: [UserModule, PasswordModule, PassportModule],
  providers: [AuthService, LocalStrategy],
  controllers: [AuthController],
})
export class AuthModule {}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserProvider } from 'src/schemas/user.provider';
import { UserService } from './user.service';

@Module({
  imports: [MongooseModule.forFeatureAsync([UserProvider])],
  providers: [UserService],
  controllers: [],
  exports: [UserService],
})
export class UserModule {}

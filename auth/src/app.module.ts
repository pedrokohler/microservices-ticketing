import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PasswordModule } from './password/password.module';
import { UserProvider } from './schemas/user.provider';

@Module({
  imports: [
    PasswordModule,
    MongooseModule.forRoot('mongodb://auth-mongo-cluster-ip:27017/auth', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }),
    MongooseModule.forFeatureAsync([UserProvider]),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}

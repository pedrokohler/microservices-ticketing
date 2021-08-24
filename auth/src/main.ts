import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieSession from 'cookie-session';

async function bootstrap() {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }

  const app = await NestFactory.create(AppModule);
  app.use(
    cookieSession({
      signed: false,
    }),
  );
  await app.listen(3000);
}
bootstrap();

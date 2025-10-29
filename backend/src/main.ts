import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LogLevel } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'] as LogLevel[],
  });
  app.enableCors({
    origin: [process.env.FRONTEND_URL],
    credentials: true,
  });
  await app.listen(3000);
}
bootstrap();

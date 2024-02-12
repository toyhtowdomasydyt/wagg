import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT || 3000;

  app.setGlobalPrefix('api');

  await app.listen(PORT);

  logger.log(`Server is running on: ${await app.getUrl()}`);
}

bootstrap();

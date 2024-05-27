import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { logger } from './logger.middleware';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './exceptions/ForbiddenException';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(logger)
  // app.useGlobalPipes(new ValidationPipe)
  app.useGlobalFilters(new HttpExceptionFilter)
  app.enableCors()
  await app.listen(3000);
}
bootstrap();
  
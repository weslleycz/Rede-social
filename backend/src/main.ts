import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';
import { json } from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  const corsOptions: CorsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization,token',
  };
  app.enableCors(corsOptions);
  app.useGlobalPipes(new ValidationPipe());
  app.use(json({ limit: '500mb' }));
  await app.listen(3001);
}
bootstrap();

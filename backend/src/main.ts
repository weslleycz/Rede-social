import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { SMTPServer } from 'smtp-server';
import { json } from 'body-parser';
import { EventEmitter2 } from '@nestjs/event-emitter';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  const corsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization,token',
    credentials: true,
    optionsSuccessStatus: 204,
  };

  app.enableCors(corsOptions);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  if (process.env.NODE_ENV === 'dev') {
    const server = new SMTPServer({
      disabledCommands: ['STARTTLS', 'AUTH'],
      logger: true,
      onData(stream, session, callback) {
        stream.pipe(process.stdout);
        stream.on('end', callback);
      },
    });

    server.listen(1025);
  }

  const config = new DocumentBuilder()
    .setTitle('API rede social')
    .setDescription(
      'A API Rede Social oferece uma solução simples e eficiente para gerenciar todos os aspectos da uma rede social. ',
    )
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/doc', app, document);

  const eventEmitter = app.get(EventEmitter2);
  eventEmitter.setMaxListeners(1000);

  app.use(json({ limit: '500mb' }));
  await app.listen(process.env.PORT);
}
bootstrap();

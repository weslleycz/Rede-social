import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';
import { PostController } from './controllers/post/post.controller';
import { PostService } from './controllers/post/post.service';
import { UserController } from './controllers/user/user.controller';
import { InterceptorJwt } from './middlewares/roles.middleware';
import { BcryptService } from './services/bcrypt.service';
import { JWTService } from './services/jwt.service';
import { NextcloudService } from './services/nextcloud.service';
import { EmailService } from './services/nodemailer.service';
import { PrismaService } from './services/prisma.service';
import { RedisService } from './services/redis.service';
import { FeedGateway } from './websockets/feed/feed.gateway';
import { UserService } from './controllers/user/user.service';
import { OnlineCheckGateway } from './websockets/online-check/online-check.gateway';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { NotificationsGateway } from './websockets/notifications/notifications.gateway';
import { NotificationsController } from './controllers/notifications/notifications.controller';
import { NotificationsService } from './controllers/notifications/notifications.service';

@Module({
  imports: [EventEmitterModule.forRoot()],
  controllers: [
    AppController,
    UserController,
    PostController,
    NotificationsController,
  ],
  providers: [
    { provide: 'String', useValue: '' },
    AppService,
    PrismaService,
    BcryptService,
    JWTService,
    NextcloudService,
    RedisService,
    EmailService,
    InterceptorJwt,
    PostService,
    UserService,
    NotificationsService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    FeedGateway,
    OnlineCheckGateway,
    NotificationsGateway,
  ],
})
export class AppModule {}

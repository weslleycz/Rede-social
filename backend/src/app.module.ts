import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './services/prisma.service';
import { UserController } from './controllers/user/user.controller';
import { BcryptService } from './services/bcrypt.service';
import { JWTService } from './services/jwt.service';
import { NextcloudService } from './services/nextcloud.service';
import { PostController } from './controllers/post/post.controller';
import { RedisService } from './services/redis.service';
import { EmailService } from './services/nodemailer.service';

@Module({
  imports: [],
  controllers: [AppController, UserController, PostController],
  providers: [
    AppService,
    PrismaService,
    BcryptService,
    JWTService,
    NextcloudService,
    RedisService,
    EmailService,
  ],
})
export class AppModule {}

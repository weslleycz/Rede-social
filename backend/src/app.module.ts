import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './services/prisma.service';
import { UserController } from './controllers/user/user.controller';
import { BcryptService } from './services/bcrypt.service';
import { JWTService } from './services/jwt.service';
import { NextcloudService } from './services/nextcloud.service';

@Module({
  imports: [],
  controllers: [AppController, UserController],
  providers: [
    AppService,
    PrismaService,
    BcryptService,
    JWTService,
    NextcloudService,
  ],
})
export class AppModule {}

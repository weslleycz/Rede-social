import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CreateUserDto } from './user.dto';
import { PrismaService } from '../../services/prisma.service';
import { BcryptService } from 'src/services/bcrypt.service';
import { JWTService } from 'src/services/jwt.service';
import { NextcloudService } from 'src/services/nextcloud.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly bcryptService: BcryptService,
    private readonly jwtService: JWTService,
    private readonly nextcloudService: NextcloudService,
  ) {}

  @Post()
  async create(@Body() { email, name, password }: CreateUserDto) {
    try {
      const passwordCrypt = await this.bcryptService.hashPassword(password);
      const user = await this.prismaService.user.create({
        data: {
          email,
          name,
          password: passwordCrypt,
        },
      });
      await this.nextcloudService.createFolder(user.id);
      const token = this.jwtService.login(user.id);
      return { token };
    } catch (error) {
      throw new HttpException(
        'Não foi possível cadastrar o usuário',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}

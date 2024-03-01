import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../../services/prisma.service';
import { BcryptService } from 'src/services/bcrypt.service';
import { JWTService } from 'src/services/jwt.service';
import { NextcloudService } from 'src/services/nextcloud.service';
import { Response } from 'express';
import { CreateUserDto, LoginUserDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly bcryptService: BcryptService,
    private readonly jwtService: JWTService,
    private readonly nextcloudService: NextcloudService,
  ) {}

  async createUser({ email, name, password }: CreateUserDto) {
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
      const token = await this.jwtService.login(user.id);
      return { token, id: user.id };
    } catch (error) {
      throw new HttpException(
        'Não foi possível cadastrar o usuário',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async login({ email, password }: LoginUserDto) {
    try {
      const user = await this.prismaService.user.findFirst({
        where: { email },
      });
      if (!user) {
        throw new HttpException('Usuário ou senha inválidos', 401);
      }
      const isPasswordValid = await this.bcryptService.comparePasswords(
        password,
        user.password,
      );
      if (!isPasswordValid) {
        throw new HttpException('Usuário ou senha inválidos', 401);
      }
      const token = await this.jwtService.login(user.id);
      return { token, id: user.id };
    } catch (error) {
      throw new HttpException('Usuário ou senha inválidos', 401);
    }
  }

  async getAvatar(id: string, res: Response) {
    try {
      const avatar = await this.nextcloudService.getFile({
        fileBaseName: 'avatar.jpg',
        folderName: id,
      });
      res.setHeader(
        'Content-Disposition',
        `attachment; filename=${id}-avatar.jpg`,
      );
      res.setHeader('Content-Type', 'image/jpeg');
      res.send(avatar);
    } catch (error) {
      throw new HttpException('Avatar não encontrado', 400);
    }
  }

  async uploadAvatar(data: any, id: string) {
    if (typeof data?.data !== 'string') {
      throw new Error('Os dados devem ser uma string base64 válida');
    }
    const file = Buffer.from(data?.data, 'base64');
    return await this.nextcloudService.upload({
      data: file,
      fileBaseName: 'avatar.jpg',
      folderName: id,
    });
  }

  async select(id: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id,
      },
      include: {
        friends: true,
      },
    });
    delete user.password;
    delete user.chatId;
    return user;
  }
}

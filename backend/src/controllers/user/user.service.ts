import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../../services/prisma.service';
import { BcryptService } from 'src/services/bcrypt.service';
import { JWTService } from 'src/services/jwt.service';
import { NextcloudService } from 'src/services/nextcloud.service';
import { Response, Request } from 'express';
import { CreateUserDto, LoginUserDto } from './user.dto';
import { RedisService } from 'src/services/redis.service';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly bcryptService: BcryptService,
    private readonly jwtService: JWTService,
    private readonly nextcloudService: NextcloudService,
    private readonly redisService: RedisService,
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
      return avatar;
    } catch (error) {
      throw new HttpException('Avatar não encontrado', 400);
    }
  }

  async uploadAvatar(data: any, id: string) {
    const file = Buffer.from(
      data.img.replace(
        `${data.img.substring(0, data.img.indexOf(';'))};base64,`,
        '',
      ),
      'base64',
    );
    await this.nextcloudService.upload({
      data: file,
      fileBaseName: `avatar.jpg`,
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
        friendOf: true,
      },
    });
    delete user.password;
    delete user.chatId;
    return user;
  }

  async search(name: string) {
    const users = await this.prismaService.user.findMany({
      where: {
        name: {
          search: name,
        },
      },
      select: {
        status: true,
        email: true,
        name: true,
        id: true,
        friends: {
          select: {
            id: true,
          },
        },
        friendOf: {
          select: {
            id: true,
          },
        },
      },
    });
    return users;
  }

  async addFriend(friendId: string, req: Request) {
    const userId = await this.redisService.getValue(
      req.headers.token as string,
    );
    try {
      await this.prismaService.user.update({
        where: { id: userId },
        data: {
          friends: { connect: [{ id: friendId }] },
        },
      });
    } catch (error) {
      throw new HttpException(
        'Não foi possível adicionar amigo',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async cancelFriend(friendId: string, req: Request) {
    const userId = await this.redisService.getValue(
      req.headers.token as string,
    );
    try {
      await this.prismaService.user.update({
        where: { id: userId },
        data: {
          friends: { disconnect: [{ id: friendId }] },
        },
      });
    } catch (error) {
      throw new HttpException(
        'Não foi possível cancelar amizade',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}

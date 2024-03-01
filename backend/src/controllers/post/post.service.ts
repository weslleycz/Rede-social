import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Request } from 'express';
import { NextcloudService } from 'src/services/nextcloud.service';
import { PrismaService } from 'src/services/prisma.service';
import { RedisService } from 'src/services/redis.service';

@Injectable()
export class PostService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly nextcloudService: NextcloudService,
    private readonly redisService: RedisService,
  ) {}

  async createPost(img: string, text: string, req: Request) {
    if (img === '' && text === '') {
      throw new HttpException(
        'Não foi possível criar a postagem',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      const id = await this.redisService.getValue(req.headers.token as string);
      const post = await this.prismaService.post.create({
        data: {
          content: text,
          userId: id,
          createDate: String(new Date()),
        },
      });
      const user = await this.prismaService.user.findFirst({
        where: {
          id: id,
        },
        select: {
          friends: {
            select: {
              id: true,
            },
          },
        },
      });
      user.friends.map(async (friend) => {
        await this.redisService.setValue(`feed/${friend.id}`, '@', 120);
      });
      if (img !== '') {
        const file = Buffer.from(
          img.replace(`${img.substring(0, img.indexOf(';'))};base64,`, ''),
          'base64',
        );

        await this.nextcloudService.upload({
          data: file,
          fileBaseName: `${post.id}.jpg`,
          folderName: id,
        });

        await this.prismaService.post.update({
          data: {
            urlImg: `/${id}/${post.id}.jpg`,
          },
          where: {
            id: post.id,
          },
        });

        return { status: 'Postagem criada' };
      } else {
        return { status: 'Postagem criada' };
      }
    } catch (error) {
      throw new HttpException(
        'Não foi possível criar a postagem',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getPostsByUser(req: Request) {
    const userId = await this.redisService.getValue(
      req.headers.token as string,
    );
    const user = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        friends: {
          select: {
            id: true,
          },
        },
      },
    });

    const friendIds = user?.friends.map((friend) => friend.id) || [];

    const posts = await this.prismaService.post.findMany({
      where: {
        OR: [
          {
            userId: userId,
          },
          {
            userId: {
              in: friendIds,
            },
          },
        ],
      },
      include: {
        comments: true,
        user: {
          select: {
            name: true,
            id: true,
          },
        },
      },
    });

    return posts.reverse();
  }

  async getImage(userId: string, nameFile: string) {
    try {
      const img = await this.nextcloudService.getFile({
        fileBaseName: nameFile,
        folderName: userId,
      });
      return img;
    } catch (error) {
      throw new HttpException('Imagem não encontrada', 400);
    }
  }

  async getAllByIdUser(userId: string) {
    try {
      return await this.prismaService.post.findMany({
        where: {
          user: {
            id: userId,
          },
        },
        include: {
          comments: true,
        },
      });
    } catch (error) {
      throw new HttpException('Post não encontrado', 400);
    }
  }
}

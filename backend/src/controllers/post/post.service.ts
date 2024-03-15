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
        friendOf: {
          select: {
            id: true,
          },
        },
      },
    });

    const friendOfIds = user?.friendOf.map((friend) => friend.id) || [];
    const friendsIds = user?.friends.map((friend) => friend.id) || [];

    const posts = await this.prismaService.post.findMany({
      where: {
        OR: [
          {
            userId: userId,
          },
          {
            userId: {
              in: friendOfIds,
            },
          },
          {
            userId: {
              in: friendsIds,
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
      const posts = await this.prismaService.post.findMany({
        where: {
          user: {
            id: userId,
          },
        },
        include: {
          comments: true,
          user: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });
      return posts.reverse();
    } catch (error) {
      throw new HttpException('Post não encontrado', 400);
    }
  }

  async linkPost(id: string, req: Request) {
    try {
      const token = req.headers.token as string;
      if (!token) {
        throw new HttpException('Token not provided', 400);
      }

      const idUser = await this.redisService.getValue(token);

      const post = await this.prismaService.post.findFirst({
        where: {
          id,
        },
      });

      if (!post) {
        throw new HttpException('Post não encontrado', 404);
      }

      const userIndex = post.links.indexOf(idUser);

      if (userIndex !== -1) {
        // Remove idUser from links
        const links = post.links
          .slice(0, userIndex)
          .concat(post.links.slice(userIndex + 1));

        const postUpdate = await this.prismaService.post.update({
          where: {
            id: post.id,
          },
          data: {
            links: links,
          },
        });

        return postUpdate.links;
      } else {
        // Add idUser to links
        const links = [...post.links, idUser];

        const postUpdate = await this.prismaService.post.update({
          where: {
            id: post.id,
          },
          data: {
            links: links,
          },
        });

        return postUpdate.links;
      }
    } catch (error) {
      throw new HttpException('Erro interno', 500);
    }
  }

  async select(id: string) {
    return await this.prismaService.post.findFirst({
      where: {
        id,
      },
      include: {
        user: {
          select: {
            name: true,
            id: true,
          },
        },
        comments: true,
      },
    });
  }

  async addComment(postId: string, text: string, req: Request) {
    const userId = await this.redisService.getValue(
      req.headers.token as string,
    );
    try {
      await this.prismaService.comment.create({
        data: {
          text,
          userId,
          postId,
        },
      });
    } catch (error) {
      throw new HttpException('Não foi possível fazer o comentario', 400);
    }
  }

  async getComments(postId: string) {
    try {
      const comments = await this.prismaService.comment.findMany({
        where: {
          postId,
        },
        include: {
          user: {
            select: {
              name: true,
              id: true,
            },
          },
        },
      });
      return comments.reverse();
    } catch (error) {
      throw new HttpException('Postagem não encontrada', 404);
    }
  }
}

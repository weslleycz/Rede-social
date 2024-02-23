import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { CreatePostDto } from './post.dto';
import { PrismaService } from 'src/services/prisma.service';
import { NextcloudService } from 'src/services/nextcloud.service';
import { RoleInterceptor } from 'src/middlewares/roles.middleware';
import { Request } from 'express';
import { RedisService } from 'src/services/redis.service';

@Controller('post')
export class PostController {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly nextcloudService: NextcloudService,
    private readonly redisService: RedisService,
  ) {}
  @Post()
  @UseInterceptors(RoleInterceptor)
  async create(@Body() { img, text }: CreatePostDto, @Req() req: Request) {
    if (img === '' && text == '') {
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
        },
      });
      if (img !== '') {
        const file = Buffer.from(
          img.replace('data:image/png;base64,', ''),
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
}

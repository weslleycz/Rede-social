import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Req,
  Res,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import { CreatePostDto } from './post.dto';
import { PrismaService } from 'src/services/prisma.service';
import { NextcloudService } from 'src/services/nextcloud.service';
import { RoleInterceptor } from 'src/middlewares/roles.middleware';
import { Request } from 'express';
import { RedisService } from 'src/services/redis.service';
import { FeedGateway } from 'src/websockets/feed/feed.gateway';
import * as imageType from 'image-type';
import { Response } from 'express';

@Controller('post')
export class PostController {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly nextcloudService: NextcloudService,
    private readonly redisService: RedisService,
    private readonly feedGateway: FeedGateway,
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
          createDate: String(new Date()),
        },
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

  @UseInterceptors(RoleInterceptor)
  @Get('/feed')
  async getPostsByUser(@Req() req: Request) {
    const id = await this.redisService.getValue(req.headers.token as string);
    const posts = await this.prismaService.post.findMany({
      where: {
        userId: id,
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

  @Get('/img/:userId/:nameFile')
  async getImage(
    @Param('userId') userId: string,
    @Param('nameFile') nameFile: string,
    @Res() res: Response,
  ) {
    try {
      const img = await this.nextcloudService.getFile({
        fileBaseName: nameFile,
        folderName: userId,
      });
      res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all origins (adjust for specific origins if appropriate)
      res.setHeader('Access-Control-Allow-Methods', 'GET');
      res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
      res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept',
      );
      res.setHeader('Content-Disposition', `attachment; filename=${nameFile}`);
      res.setHeader('Content-Type', 'image/jpeg');
      res.send(img);
    } catch (error) {
      throw new HttpException('Imagem não encontrada', 400);
    }
  }
}

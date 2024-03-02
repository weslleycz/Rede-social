import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Post,
  Req,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { InterceptorJwt } from 'src/middlewares/roles.middleware';
import { PostService } from './post.service';
import { CreatePostDto } from './post.dto';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @UseInterceptors(InterceptorJwt)
  async create(@Body() { img, text }: CreatePostDto, @Req() req: Request) {
    return await this.postService.createPost(img, text, req);
  }

  @UseInterceptors(InterceptorJwt)
  @Get('/feed')
  async getPostsByUser(@Req() req: Request) {
    return await this.postService.getPostsByUser(req);
  }

  @Get('/user/:userId')
  async getAllByIdUser(@Param('userId') userId: string) {
    return await this.postService.getAllByIdUser(userId);
  }

  @Get('/img/:userId/:nameFile')
  async getImage(
    @Param('userId') userId: string,
    @Param('nameFile') nameFile: string,
    @Res() res: Response,
  ) {
    try {
      const img = await this.postService.getImage(userId, nameFile);
      res.setHeader('Access-Control-Allow-Origin', '*');
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

  @UseInterceptors(InterceptorJwt)
  @Get('/link/:id')
  async linkPost(@Param('id') id: string, @Req() req: Request) {
    return await this.postService.linkPost(id, req);
  }
}

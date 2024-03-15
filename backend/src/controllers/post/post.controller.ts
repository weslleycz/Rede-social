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
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Request, Response } from 'express';
import { InterceptorJwt } from 'src/middlewares/roles.middleware';
import { CreatePostComment, CreatePostDto } from './post.dto';
import { PostService } from './post.service';

@ApiTags('post')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @UseInterceptors(InterceptorJwt)
  @ApiBearerAuth()
  @ApiInternalServerErrorResponse({ description: 'Erro interno do servidor' })
  @ApiOperation({
    summary: 'Criar um novo post',
    description: 'Endpoint para criar um novo post com imagem e texto.',
  })
  @ApiBadRequestResponse({ description: 'Não foi possível criar a postagem' })
  @ApiOkResponse({ description: 'Postagem criada', type: Object })
  async create(@Body() { img, text }: CreatePostDto, @Req() req: Request) {
    return await this.postService.createPost(img, text, req);
  }

  @UseInterceptors(InterceptorJwt)
  @Get('/feed')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Obter posts por usuário',
    description: 'Endpoint para obter os posts de um usuário autenticado.',
  })
  @ApiOkResponse({ description: 'Posts obtidos com sucesso', type: Object })
  async getPostsByUser(@Req() req: Request) {
    return await this.postService.getPostsByUser(req);
  }

  @Get('/user/:userId')
  @ApiParam({ name: 'userId', description: 'ID do usuário' })
  @ApiOperation({
    summary: 'Obter todos os posts de um usuário pelo ID',
    description: 'Endpoint para obter todos os posts de um usuário pelo ID.',
  })
  @ApiOkResponse({ description: 'Posts obtidos com sucesso', type: Object })
  @ApiNotFoundResponse({ description: 'Usuário não encontrado' })
  async getAllByIdUser(@Param('userId') userId: string) {
    return await this.postService.getAllByIdUser(userId);
  }

  @Get('/img/:userId/:nameFile')
  @ApiParam({ name: 'userId', description: 'ID do usuário' })
  @ApiParam({ name: 'nameFile', description: 'Nome do arquivo de imagem' })
  @ApiOperation({
    summary: 'Obter uma imagem',
    description: 'Endpoint para obter uma imagem relacionada a um post.',
  })
  @ApiNotFoundResponse({ description: 'Imagem não encontrada' })
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
  @ApiParam({ name: 'id', description: 'ID do post' })
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Linkar um post',
    description: 'Endpoint para linkar um post.',
  })
  @ApiInternalServerErrorResponse({ description: 'Erro interno do servidor' })
  @ApiBadRequestResponse({ description: 'Token não fornecido' })
  @ApiNotFoundResponse({ description: 'Post não encontrado' })
  async linkPost(@Param('id') id: string, @Req() req: Request) {
    return await this.postService.linkPost(id, req);
  }

  @Get('/select/:id')
  @ApiParam({ name: 'id', description: 'ID do post' })
  @ApiOkResponse({ description: 'Post selecionado com sucesso', type: Object })
  @ApiOperation({
    summary: 'Selecionar um post pelo ID',
    description: 'Endpoint para selecionar um post pelo ID.',
  })
  @ApiNotFoundResponse({ description: 'Post não encontrado' })
  async select(@Param('id') id: string) {
    return await this.postService.select(id);
  }

  @Post('/addComment/:id')
  @UseInterceptors(InterceptorJwt)
  @ApiParam({ name: 'id', description: 'ID do post' })
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Adicionar um comentário a um post',
    description: 'Endpoint para adicionar um comentário a um post.',
  })
  @ApiBadRequestResponse({ description: 'Não foi possível fazer o comentário' })
  async addComment(
    @Param('id') postId: string,
    @Req() req: Request,
    @Body() { text }: CreatePostComment,
  ) {
    await this.postService.addComment(postId, text, req);
  }

  @Get('/comments/:id')
  @ApiParam({ name: 'id', description: 'ID do post' })
  @ApiOperation({
    summary: 'Obter comentários de um post pelo ID',
    description: 'Endpoint para obter os comentários de um post pelo ID.',
  })
  @ApiOkResponse({
    description: 'Comentários obtidos com sucesso',
    type: Object,
  })
  @ApiNotFoundResponse({ description: 'Postagem não encontrada' })
  async getComments(@Param('id') postId: string) {
    return await this.postService.getComments(postId);
  }
}

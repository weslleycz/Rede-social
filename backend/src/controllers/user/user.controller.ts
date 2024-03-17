import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  Req,
  UseInterceptors,
  Put,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { InterceptorJwt } from 'src/middlewares/roles.middleware';
import { CreateUserDto, LoginUserDto } from './user.dto';
import { UserService } from './user.service';
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

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({
    summary: 'Criar um novo usuário',
    description: 'Endpoint para criar um novo usuário.',
  })
  @ApiBadRequestResponse({
    description: 'Não foi possível cadastrar o usuário',
  })
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.createUser(createUserDto);
  }

  @Post('/login')
  @ApiOperation({
    summary: 'Login de usuário',
    description: 'Endpoint para fazer login de um usuário.',
  })
  @ApiBadRequestResponse({ description: 'Usuário ou senha inválidos' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno do servidor' })
  async login(@Body() loginUserDto: LoginUserDto) {
    return await this.userService.login(loginUserDto);
  }

  @Get('/avatar/:id')
  @ApiOperation({
    summary: 'Obter avatar de usuário',
    description: 'Endpoint para obter o avatar de um usuário.',
  })
  @ApiParam({ name: 'id', description: 'ID do usuário' })
  @ApiOkResponse({ description: 'Avatar obtido com sucesso', type: Object })
  @ApiNotFoundResponse({ description: 'Usuário não encontrado' })
  async getAvatar(@Param('id') id: string, @Res() res: Response) {
    const img = await this.userService.getAvatar(id, res);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept',
    );
    res.setHeader('Content-Disposition', `attachment; filename=avatar`);
    res.setHeader('Content-Type', 'image/jpeg');
    res.send(img);
  }

  @Put('/upload/:id')
  @ApiOperation({
    summary: 'Fazer upload de avatar',
    description: 'Endpoint para fazer upload do avatar de um usuário.',
  })
  @ApiParam({ name: 'id', description: 'ID do usuário' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno do servidor' })
  async upload(@Body() data: any, @Param('id') id: string) {
    return await this.userService.uploadAvatar(data, id);
  }

  @Get('/select/:id')
  @ApiOperation({
    summary: 'Selecionar usuário pelo ID',
    description: 'Endpoint para selecionar um usuário pelo ID.',
  })
  @ApiParam({ name: 'id', description: 'ID do usuário' })
  @ApiOkResponse({
    description: 'Usuário selecionado com sucesso',
    type: Object,
  })
  @ApiNotFoundResponse({ description: 'Usuário não encontrado' })
  async select(@Param('id') id: string) {
    return await this.userService.select(id);
  }

  @Get('/search/:name')
  @ApiOperation({
    summary: 'Buscar usuário por nome',
    description: 'Endpoint para buscar um usuário pelo nome.',
  })
  @ApiParam({ name: 'name', description: 'Nome do usuário' })
  @ApiOkResponse({
    description: 'Usuários encontrados com sucesso',
    type: Object,
  })
  async search(@Param('name') name: string) {
    return await this.userService.search(name);
  }

  @Get('/addFriend/:id')
  @ApiOperation({
    summary: 'Adicionar amigo',
    description: 'Endpoint para adicionar um amigo.',
  })
  @ApiParam({ name: 'id', description: 'ID do usuário amigo' })
  @ApiBearerAuth()
  @ApiInternalServerErrorResponse({ description: 'Erro interno do servidor' })
  @UseInterceptors(InterceptorJwt)
  async addFriend(@Param('id') id: string, @Req() req: Request) {
    return await this.userService.addFriend(id, req);
  }

  @Get('/cancelFriend/:id')
  @ApiOperation({
    summary: 'Cancelar amizade',
    description: 'Endpoint para cancelar uma amizade.',
  })
  @ApiParam({ name: 'id', description: 'ID do usuário amigo' })
  @ApiBearerAuth()
  @ApiInternalServerErrorResponse({ description: 'Erro interno do servidor' })
  async cancelFriend(@Param('id') id: string, @Req() req: Request) {
    return await this.userService.cancelFriend(id, req);
  }
}

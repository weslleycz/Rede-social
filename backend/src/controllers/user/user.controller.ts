import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { InterceptorJwt } from 'src/middlewares/roles.middleware';
import { CreateUserDto, LoginUserDto } from './user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.createUser(createUserDto);
  }

  @Post('/login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return await this.userService.login(loginUserDto);
  }

  @Get('/avatar/:id')
  async getAvatar(@Param('id') id: string, @Res() res: Response) {
    return await this.userService.getAvatar(id, res);
  }

  @Post('/upload/:id')
  async upload(@Body() data: any, @Param('id') id: string) {
    return await this.userService.uploadAvatar(data, id);
  }

  @Get('/select/:id')
  async select(@Param('id') id: string) {
    return await this.userService.select(id);
  }

  @Get('/search/:name')
  async search(@Param('name') name: string) {
    return await this.userService.search(name);
  }

  @Get('/addFriend/:id')
  @UseInterceptors(InterceptorJwt)
  async addFriend(@Param('id') id: string, @Req() req: Request) {
    return await this.userService.addFriend(id, req);
  }

  @Get('/cancelFriend/:id')
  @UseInterceptors(InterceptorJwt)
  async cancelFriend(@Param('id') id: string, @Req() req: Request) {
    return await this.userService.cancelFriend(id, req);
  }
}

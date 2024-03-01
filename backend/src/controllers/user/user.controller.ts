import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { UserService } from './user.service';
import { CreateUserDto, LoginUserDto } from './user.dto';

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
}

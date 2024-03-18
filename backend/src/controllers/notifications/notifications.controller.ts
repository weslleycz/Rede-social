import {
  Controller,
  Delete,
  Get,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { InterceptorJwt } from 'src/middlewares/roles.middleware';
import { NotificationsService } from './notifications.service';

@Controller('notifications')
@ApiTags('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @UseInterceptors(InterceptorJwt)
  @ApiParam({ name: 'userId', description: 'ID do usuário' })
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Obter todas as notificações de um usuário pelo ID',
    description:
      'Endpoint para obter todos as notificações de um usuário pelo ID.',
  })
  @Get('/:userId')
  async getNotifications(@Param('userId') id: string) {
    return await this.notificationsService.getNotifications(id);
  }

  @UseInterceptors(InterceptorJwt)
  @ApiParam({ name: 'id', description: 'ID da notificação' })
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Deleta a notificação pelo ID',
    description: 'Endpoint para deletar a notificação pelo ID.',
  })
  @Delete('/:id')
  async deleteNotifications(@Param('id') id: string) {
    return await this.notificationsService.deleteNotifications(id);
  }
}

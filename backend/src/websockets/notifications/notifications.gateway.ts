import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { RedisService } from 'src/services/redis.service';
import { EventEmitter2 } from '@nestjs/event-emitter';

@WebSocketGateway()
export class NotificationsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  constructor(private readonly eventEmitter: EventEmitter2) {}
  handleDisconnect(client: any) {}

  async handleConnection(client: any, ...args: any[]) {}

  @SubscribeMessage('notifications')
  async handleMessage(client: any, payload: any) {
    this.eventEmitter.on(`event.notification.${payload.clientId}`, () => {
      this.server.emit(
        `notification.${payload.clientId}`,
        'Mensagem de notificação',
      );
    });
  }
}

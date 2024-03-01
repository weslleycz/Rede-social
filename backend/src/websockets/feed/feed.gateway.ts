import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { RedisService } from 'src/services/redis.service';

@WebSocketGateway()
export class FeedGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  constructor(private readonly redisService: RedisService) {}
  handleDisconnect(client: any) {}
  handleConnection(client: any, ...args: any[]) {}

  @SubscribeMessage('feed')
  async handleMessage(client: any, payload: any) {
    const id = await this.redisService.getValue(payload.clientId);
    const feedUpdate = await this.redisService.getValue(`feed/${id}`);
    setInterval(async () => {
      if (feedUpdate !== null) {
        this.server.emit('feed', {
          message: 'Update feed',
        });
      }
    }, 1000);
  }
}

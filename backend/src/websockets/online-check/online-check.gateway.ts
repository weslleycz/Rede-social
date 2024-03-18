import { EventEmitter2 } from '@nestjs/event-emitter';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { PrismaService } from 'src/services/prisma.service';
import { RedisService } from 'src/services/redis.service';

@WebSocketGateway()
export class OnlineCheckGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  private clientMap: Map<any, any> = new Map();

  constructor(
    private readonly redisService: RedisService,
    private readonly prismaService: PrismaService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async handleDisconnect(client: any) {
    const id = await this.redisService.getValue(
      this.clientMap.get(client.handshake.auth.token),
    );
    if (id != null) {
      await this.prismaService.user.update({
        where: {
          id: id,
        },
        data: {
          status: 'Offline',
        },
      });
    }
    this.clientMap.delete(client.id);
  }

  async handleConnection(client: any) {
    const id = await this.redisService.getValue(
      this.clientMap.get(client.handshake.auth.token),
    );
    if (id != null) {
      await this.prismaService.user.update({
        where: {
          id: id,
        },
        data: {
          status: 'Online',
        },
      });
    }
  }

  @SubscribeMessage('onlineCheck')
  async handleMessage(client: any, payload: any) {
    const clientId = payload.clientId;
    this.clientMap.set(client.handshake.auth.token, clientId);
  }
}

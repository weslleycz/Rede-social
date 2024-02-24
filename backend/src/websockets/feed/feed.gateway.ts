import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';

@WebSocketGateway()
export class FeedGateway {
  constructor() {}

  @SubscribeMessage('feed')
  handleMessage(client: any, payload: any): string {
    //console.log(payload.clientId);
    return 'Hello world!';
  }
}

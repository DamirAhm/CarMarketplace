import {
  ConnectedSocket,
  MessageBody,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { ISendMessageWebsocket } from '../../../common/interfaces/messages/SendMessageWebsocket.interface';
import { IEditMessageWebsocket } from '../../../common/interfaces/messages/EditMessageWebsocket.interface';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatsGateway implements OnGatewayDisconnect {
  private connectionsByUserId: Record<string, Socket> = {};
  private connectionsBySocket: Map<Socket, string> = new Map();

  @SubscribeMessage('join')
  handleJoin(
    @ConnectedSocket() socket: Socket,
    @MessageBody('userId') userId: string,
  ) {
    console.log(userId, 'join');
    this.connectionsByUserId[userId] = socket;
    this.connectionsBySocket.set(socket, userId);
  }

  handleDisconnect(socket: Socket) {
    const userId = this.connectionsBySocket.get(socket);

    if (!userId) {
      return;
    }

    delete this.connectionsByUserId[userId];
    this.connectionsBySocket.delete(socket);
    console.log(userId, 'disconnects');
  }

  @SubscribeMessage('message')
  handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() { newMessage, to }: ISendMessageWebsocket,
  ) {
    const userId = this.connectionsBySocket.get(client);

    const receiver = this.connectionsByUserId[to];

    if (receiver) {
      receiver.emit('message', { to: userId, newMessage });
    }
  }

  @SubscribeMessage('delete')
  handleDelete(
    @ConnectedSocket() client: Socket,
    @MessageBody() { id, to }: any,
  ) {
    const userId = this.connectionsBySocket.get(client);

    const receiver = this.connectionsByUserId[to];

    if (receiver) {
      receiver.emit('delete', { to: userId, id });
    }
  }

  @SubscribeMessage('edit')
  handleEdit(
    @ConnectedSocket() client: Socket,
    @MessageBody() { changedMessage, to }: IEditMessageWebsocket,
  ) {
    const userId = this.connectionsBySocket.get(client);

    const receiver = this.connectionsByUserId[to];

    if (receiver) {
      receiver.emit('edit', { to: userId, changedMessage });
    }
  }
}

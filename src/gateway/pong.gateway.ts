import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  ConnectedSocket,
  MessageBody,
} from "@nestjs/websockets/decorators";

import { Server, Socket } from "socket.io";
import { OnModuleInit } from "@nestjs/common";

@WebSocketGateway({
  cors: {
    origin: "*",
  },
})
export class PongGateway implements OnModuleInit {
  players: { id: string; name: string }[] = [];

  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.emit("pong.members", this.players);
  }

  @SubscribeMessage("chat-message")
  chat(@ConnectedSocket() socket: Socket, @MessageBody() data: any) {
    socket.broadcast.emit("chat-message", data);
    console.log(`New message from: ${socket.id}`, data);
  }

  @SubscribeMessage("pong.join")
  pongJoinMember(
    @ConnectedSocket() socket: Socket,
    @MessageBody() name: string
  ) {
    this.players.push({ id: socket.id, name });
    this.server.emit("pong.members", this.players);
  }
}

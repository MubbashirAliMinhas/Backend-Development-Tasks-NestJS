import { OnModuleInit } from "@nestjs/common";
import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from "socket.io";

@WebSocketGateway()
export class ChatGateway implements OnModuleInit {
    @WebSocketServer()
    server: Server

    onModuleInit() {
        this.server.on('connection', socket => {
            console.log(socket.id)
        })
    }

    @SubscribeMessage('client-message')
    handleMessage(@MessageBody() data: any) {
        this.server.emit('server-message', data)
    }
}
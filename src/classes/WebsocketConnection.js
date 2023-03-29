import io from 'socket.io-client';

export class WebsocketConnection {
    socket;

    constructor() {
        this.socket = io('localhost:3000');
    }

    send (message) {
        console.log(message)
        this.socket.emit('SEND_MESSAGE', message)
    }
}

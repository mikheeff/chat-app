import io from 'socket.io-client';

export class WebsocketConnection {
    socket;

    constructor() {
        this.socket = io('localhost:3000');
    }

    send (key, message, callback) {
        this.socket.emit(key, message, callback)
    }

    on (key, callback) {
        this.socket.on(key, callback)
    }
}

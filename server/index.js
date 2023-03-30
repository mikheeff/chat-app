const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ['GET', "POST"]
    }
});
const ChatEvent = {
    USER_JOINED: 'USER_JOINED',
    NEW_MESSAGE: 'NEW_MESSAGE'
}

const getMessage = (name, text, id) => ({ name, text, id })

server.listen(3000, () => {
    console.log('Chat server is running on 3000')
})

io.on('connection', (socket) => {
    socket.on(ChatEvent.USER_JOINED, (data, callback) => {
        if (!data || !data.room) {
            return callback('no data')
        }

        socket.join(data.room)
        callback({ sessionId: socket.id })
        socket.emit(ChatEvent.NEW_MESSAGE, getMessage('admin', `Welcome to the chat, ${data.name}`))
        socket.broadcast.to(data.room)
            .emit(ChatEvent.NEW_MESSAGE, getMessage('admin', `User ${data.name} has joined!`))
    })
});


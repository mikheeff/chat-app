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
    NEW_MESSAGE: 'NEW_MESSAGE',
    CREATE_MESSAGE: 'CREATE_MESSAGE',
    LEAVE_CHAT: 'LEAVE_CHAT',
    UPDATE_USERS: 'UPDATE_USERS',
}
const users = require('./users')()
const getMessage = (name, text, id) => ({ name, text, id })
const removeUser = (id) => {
    const user = users.remove(id)

    if (user) {
        io.to(user.room).emit(ChatEvent.UPDATE_USERS, users.getByRoom(user.room))
        io.to(user.room).emit(ChatEvent.NEW_MESSAGE, getMessage('admin', `User ${user.name} has left`))
    }
}

server.listen(3000, () => {
    console.log('Chat server is running on 3000')
})

io.on('connection', (socket) => {
    socket.on(ChatEvent.USER_JOINED, (data, callback) => {
        if (!data || !data.room) {
            return callback('no data')
        }

        socket.join(data.room)

        users.remove(socket.id)
        users.add({
            id: socket.id,
            name: data.name,
            room: data.room
        })

        callback({ sessionId: socket.id })
        io.to(data.room).emit(ChatEvent.UPDATE_USERS, users.getByRoom(data.room))
        socket.emit(ChatEvent.NEW_MESSAGE, getMessage('admin', `Welcome to the chat, ${data.name}`))
        socket.broadcast.to(data.room)
            .emit(ChatEvent.NEW_MESSAGE, getMessage('admin', `User ${data.name} has joined!`))
    })

    socket.on(ChatEvent.CREATE_MESSAGE, (data, callback) => {
        if (!data.text) {
            return callback('Text is empty')
        }

        const user = users.get(data.id)

        if (user) {
            io.to(user.room).emit(ChatEvent.NEW_MESSAGE, getMessage(user.name, data.text, data.id))
        }

        callback()
    })

    socket.on(ChatEvent.LEAVE_CHAT, (id, callback) => {
        removeUser(id)
        callback()
    })

    socket.on('disconnect', () => {
        removeUser(socket.id)
    })
});


import { defineStore } from 'pinia'
import { WebsocketConnection } from '../classes/WebsocketConnection'
import { ChatEvent } from '../constansts/socket-event'
import router from '../router'

export const useChatStore = defineStore('chatStore',{
  state: () => ({
    username: '',
    room: '',
    sessionId: null,
    messages: [],
    websocketConnection: null
  }),
  actions: {
    initChat () {
      this.websocketConnection = new WebsocketConnection()
      this.websocketConnection.on(ChatEvent.NEW_MESSAGE, (message) => {
        this.messages = [...this.messages, message]
      })
    },
    sendMessage (key, message, callback) {
      this.websocketConnection.send(key, message, callback)
    },
    joinChat () {
      this.sendMessage(ChatEvent.USER_JOINED, {
        name: this.username,
        room: this.room
      }, (data) => {
        if (typeof data === 'string') {
          console.error(data)

          return
        }

        this.sessionId = data.sessionId
        router.push({ name: 'chat' })
      })
    }
  }
})

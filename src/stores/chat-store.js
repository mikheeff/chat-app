import { defineStore } from 'pinia'
import { WebsocketConnection } from '../classes/WebsocketConnection'
import { ChatEvent } from '../constansts/socket-event'
import router from '../router'

export const useChatStore = defineStore('chatStore',{
  state: () => ({
    username: '',
    room: '',
    sessionId: null,
    newMessage: '',
    isLoading: false,
    messages: [],
    users: [],
    websocketConnection: null
  }),
  actions: {
    initChat () {
      this.websocketConnection = new WebsocketConnection()
      this.websocketConnection.on(ChatEvent.NEW_MESSAGE, (message) => {
        this.messages = [...this.messages, message]
      })
      this.websocketConnection.on(ChatEvent.UPDATE_USERS, (users) => {
        this.users = users
      })
    },
    sendMessage () {
      this.websocketConnection.send(ChatEvent.CREATE_MESSAGE, {
        text: this.newMessage,
        id: this.sessionId
      }, (data) => {
        if (typeof data === 'string') {
          console.error('Message error')

          return
        }

        this.newMessage = ''
      })
    },
    joinChat () {
      this.isLoading = true
      this.websocketConnection.send(ChatEvent.USER_JOINED, {
        name: this.username,
        room: this.room
      }, (data) => {
        this.isLoading = false

        if (typeof data === 'string') {
          console.error(data)

          return
        }

        this.sessionId = data.sessionId
        router.push({ name: 'chat' })
      })
    },
    leaveChat() {
      this.websocketConnection.send(ChatEvent.LEAVE_CHAT, this.sessionId, async () => {
        await router.push({ name: 'home', query: { message: 'leftChat' } })
        this.$reset()
      })
    }
  }
})

import { defineStore } from 'pinia'
import { WebsocketConnection } from '../classes/WebsocketConnection'

export const useChatStore = defineStore('chatStore',{
  state: () => ({
    websocketConnection: null
  }),
  actions: {
    initChat () {
      this.websocketConnection = new WebsocketConnection()
    },
    sendMessage (message) {
      this.websocketConnection.send(message)
    }
  }
})

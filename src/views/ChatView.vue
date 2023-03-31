<template>
  <v-card>
    <v-layout>
      <!-- <v-system-bar color="deep-purple darken-3"></v-system-bar> -->

      <v-app-bar
        color="primary"
        prominent
      >
        <v-toolbar-title>{{ chatStore.room }} room</v-toolbar-title>

        <v-spacer />

        <v-btn
          variant="text"
          icon="mdi-chevron-left"
          @click="chatStore.leaveChat()"
        />
      </v-app-bar>

      <v-navigation-drawer
        :model-value="true"
        location="left"
        permanent
      >
        <v-list>
          <v-list-subheader>Users</v-list-subheader>
          <v-list-item
            v-for="user in chatStore.users"
            :key="user.title"
            prepend-icon="mdi-account"
            class="list-item"
            :class="{'is-owner': user.id === chatStore.sessionId}"
            :title="user.name"
            :active="false"
            :link="false"
          />
        </v-list>
      </v-navigation-drawer>

      <v-main style="height: 500px;">
        <v-card-text class="chat">
          <ul class="chat-messages">
            <ChatMessage
              v-for="(message, index) in chatStore.messages"
              :key="index"
              :message="message"
              :is-owner="message.id === chatStore.sessionId"
            />
          </ul>
          <div class="chat-form">
            <v-text-field
              v-model="chatStore.newMessage"
              label="Text"
              @keydown.enter="chatStore.sendMessage()"
            />
          </div>
        </v-card-text>
      </v-main>
    </v-layout>
  </v-card>
</template>

<script setup>
  import { onBeforeRouteLeave, useRouter } from 'vue-router'
  import { useChatStore } from '../stores/chat-store'
  import ChatMessage from '../components/ChatMessage.vue'

  const chatStore = useChatStore()


  onBeforeRouteLeave((_to, _from, next) => {
    document.title = 'Welcome to chat app'
    next()
  })
</script>

<style lang="scss" scoped>

  .chat {
    position: relative;
    height: 100%;

    .chat-messages {
      height: 348px;
      overflow-y: auto;
    }
  }

  .list-item {
    &.is-owner {
      color: blue;
    }
  }

</style>

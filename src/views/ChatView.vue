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
          @click="leaveChat"
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
            v-for="user in items"
            :key="user.title"
            prepend-icon="mdi-account"
            :title="user.title"
            :value="user.value"
            :active="false"
            :link="false"
          />
        </v-list>
      </v-navigation-drawer>

      <v-main style="height: 500px;">
        <v-card-text>
          <ul>
            <li
              v-for="(message, index) in chatStore.messages"
              :key="index"
            >
              {{ message.text }}
            </li>
          </ul>
        </v-card-text>
      </v-main>
    </v-layout>
  </v-card>
</template>

<script setup>
  import { onBeforeRouteLeave, useRouter } from 'vue-router'
  import { useChatStore } from '../stores/chat-store'
  import { reactive, toRefs } from 'vue'

  const chatStore = useChatStore()
  const router = useRouter()

  const state = reactive({
    group: null,
    items: [
      {
        title: 'Foo',
        value: 'foo',
      },
      {
        title: 'Bar',
        value: 'bar',
      },
      {
        title: 'Fizz',
        value: 'fizz',
      },
      {
        title: 'Buzz',
        value: 'buzz',
      },
    ],
  })


  onBeforeRouteLeave((_to, _from, next) => {
    document.title = 'Welcome to chat app'
    next()
  })

  const leaveChat = async () => {
    await router.push({ name: 'home', query: { message: 'leftChat' } })
    chatStore.$reset()
  }

  const {items} = toRefs(state)
</script>

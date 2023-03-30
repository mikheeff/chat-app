<template>
  <v-card>
    <v-card-title>
      Chat App
    </v-card-title>
    <v-card-text>
      <v-sheet
        width="400"
        class="mx-auto"
      >
        <v-form ref="form">
          <v-text-field
            v-model="chatStore.username"
            :counter="10"
            :rules="nameRules"
            label="Name"
            required
          />

          <v-text-field
            v-model="chatStore.room"
            :counter="15"
            :rules="roomRules"
            label="Enter a room name"
            required
          />

          <div class="d-flex flex-column">
            <v-btn
              color="success"
              class="mt-4"
              block
              @click="enter"
            >
              Enter
            </v-btn>
          </div>
        </v-form>
      </v-sheet>
    </v-card-text>
  </v-card>
</template>

<script setup>
  import { useChatStore } from '../stores/chat-store'
  import { reactive, ref, toRefs } from 'vue'

  const chatStore = useChatStore()

  const state = reactive({
    user: '',
    message: '',
    nameRules: [
      v => !!v || 'Name is required',
      v => (v && v.length <= 10) || 'Name must be less than 10 characters',
    ],
    roomRules: [
      v => !!v || 'Room name is required',
      v => (v && v.length <= 15) || 'Name must be less than 15 characters',
    ],
  })

  const {
    nameRules,
    roomRules,
  } = toRefs(state)

  const form = ref(null)

  const enter = async() => {
    const { valid } = await form.value.validate()

    if (valid) {
      chatStore.initChat()
      chatStore.joinChat()
    }
  }
</script>


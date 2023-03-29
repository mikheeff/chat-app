<template>
  <div class="the-chat card mt-3">
    <div class="card-body">
      <div class="card-title">
        <h3>Chat Group</h3>
        <hr>
      </div>
      <div class="card-body">
        <div class="messages">

        </div>
      </div>
    </div>
    <div class="card-footer">
      <form @submit.prevent="sendMessage">
        <div class="gorm-group">
          <label for="user">User:</label>
          <input type="text" v-model="user" class="form-control">
        </div>
        <div class="gorm-group pb-3">
          <label for="message">Message:</label>
          <input type="text" v-model="message" class="form-control">
        </div>
        <v-btn
            type="submit"
            class="btn btn-success">Send</v-btn>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, toRefs } from 'vue'
import { useChatStore } from '../stores/chat-store'

useChatStore().initChat()

const state = reactive({
  user: '',
  message: '',
})

const { user, message } = toRefs(state)

const sendMessage = () => {
  useChatStore().sendMessage({
    user: user.value,
    message: message.value
  });

  state.message = ''
}

</script>

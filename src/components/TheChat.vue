<template>
  <v-sheet
    width="400"
    class="mx-auto"
  >
    <v-form ref="form">
      <v-text-field
        v-model="name"
        :counter="10"
        :rules="nameRules"
        label="Name"
        required
      />

      <v-select
        v-model="select"
        :items="items"
        :rules="[v => !!v || 'Item is required']"
        label="Item"
        required
      />

      <div class="d-flex flex-column">
        <v-btn
          color="success"
          class="mt-4"
          block
          @click="validate"
        >
          Validate
        </v-btn>

        <v-btn
          color="error"
          class="mt-4"
          block
          @click="reset"
        >
          Reset Form
        </v-btn>

        <v-btn
          color="warning"
          class="mt-4"
          block
          @click="resetValidation"
        >
          Reset Validation
        </v-btn>
      </div>
    </v-form>
  </v-sheet>
</template>

<script setup>
  import { reactive, ref, toRefs } from 'vue'
  import { useChatStore } from '../stores/chat-store'

  useChatStore().initChat()

  const state = reactive({
    user: '',
    message: '',
    valid: true,
    name: '',
    nameRules: [
      v => !!v || 'Name is required',
      v => (v && v.length <= 10) || 'Name must be less than 10 characters',
    ],
    select: null,
    items: [
      'Item 1',
      'Item 2',
      'Item 3',
      'Item 4',
    ],
    checkbox: false,
  })

  const {
    // user,
    // message,
    name,
    nameRules,
    select,
    items,
  } = toRefs(state)

  // const sendMessage = () => {
  //   useChatStore().sendMessage({
  //     user: user.value,
  //     message: message.value
  //   });
  //
  //   state.message = ''
  // }

  const form = ref(null)

  const validate = async() => {
    const { valid } = await form.value.validate()

    if (valid) {
      alert('Form is valid')
    }
  }

  const reset = () => {
    form.value.reset()
  }

  const resetValidation = () => {
    form.value.resetValidation()
  }

</script>

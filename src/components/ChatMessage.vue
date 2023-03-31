<template>
  <li class="chat-message">
    <strong
      class="chat-message-author"
      :class="{'is-admin': name === 'admin', 'is-owner': isOwner}"
    >{{ name }}:</strong>
    {{ text }}
  </li>
</template>

<script setup>

  import { computed } from 'vue'

  const props = defineProps({
    message: {
      type: Object,
      required: true
    },
    isOwner: {
      type: Boolean,
      default: false
    }
  })

  const name = computed(() => props.message.name)
  const text = computed(() => props.message.text)
</script>

<style lang="scss" scoped>
  .chat-message {
    .chat-message-author {
      color: black;

      &.is-owner {
        color: blue;
      }

      &.is-admin {
        color: red;
      }
    }
  }
</style>

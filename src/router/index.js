import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ChatView from '../views/ChatView.vue'
import { useChatStore } from '../stores/chat-store'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/chat',
      name: 'chat',
      beforeEnter: (_to, _from, next) => {
        const chatStore = useChatStore()

        if (!chatStore.username || !chatStore.room) {
          next({ name: 'home', query: { message: 'noUser' } })

          return
        }

        document.title = `${chatStore.room} room`
        next()
      },
      component: ChatView
    }
  ]
})

export default router

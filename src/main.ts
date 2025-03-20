import './assets/index.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { useSessionStore } from './stores/session'

const app = createApp(App)

app.use(createPinia())
app.use(router)

const session = useSessionStore()
session.rehydrate()

app.mount('#app')

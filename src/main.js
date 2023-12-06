import { createApp } from 'vue'

import pinia from './store'
import App from './App.vue'
import router from './router/router'
import Particles from 'particles.vue3'

import "normalize.css"
import "./assets/css/index.css"

const app = createApp(App)

app.use(Particles)
app.use(pinia)
app.use(router)

app.mount('#app')

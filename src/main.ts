import { createApp } from 'vue'
import App from './App.vue'
import router from './config/router'
import { createPinia } from 'pinia'
import VConsole from 'vconsole'

createApp(App)
  .use(router)
  .use(createPinia())
  .mount('#app')

if (import.meta.env.MODE == 'development') {
  new VConsole()
}
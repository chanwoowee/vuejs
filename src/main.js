import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vue3TouchEvents from "vue3-touch-events";

createApp(App)
.use(store)
.use(router)
.use(Vue3TouchEvents, {
	disableClick: true,
  dragFrequency: 10,
})
.mount('#app')
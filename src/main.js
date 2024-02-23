// 外部套件
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/scss/bootstrap.scss'
import 'bootstrap'
// Supports weights 100-900
import '@fontsource-variable/noto-sans-tc'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import './assets/main.scss'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

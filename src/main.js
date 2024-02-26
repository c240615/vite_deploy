// 外部套件
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/scss/bootstrap.scss'
// 引入 Bootstrap 的 JavaScript 文件
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
// 引入 Bootstrap 的 CSS 樣式
import 'bootstrap/dist/css/bootstrap.min.css'

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

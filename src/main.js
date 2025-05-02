import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'

import routes from './router'

const router = createRouter({
  history: createWebHistory(),
  routes
})

import "./styles/main.css"

import { createPinia } from 'pinia'
const pinia = createPinia()


const savedTheme = localStorage.getItem('theme') || 'light'
document.documentElement.classList.toggle('dark', savedTheme === 'dark')
console.log(savedTheme)

createApp(App).use(router).use(pinia).mount('#app')

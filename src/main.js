import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'

// 路由配置
const routes = [
  { path: '/', component: () => import('./views/Home.vue') },
  { path: '/diagnosis', component: () => import('./views/Diagnosis.vue') },
  { path: '/study', component: () => import('./views/Study.vue') },
  { path: '/archive', component: () => import('./views/Archive.vue') },
  { path: '/profile', component: () => import('./views/Profile.vue') }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')

import { createRouter, createWebHistory } from 'vue-router'
import HomeView from './views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior() {
    return { top: 0 }
  },
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/work', name: 'work', component: () => import('./views/WorkView.vue') },
    { path: '/studio', name: 'studio', component: () => import('./views/StudioView.vue') },
    { path: '/game-assets', name: 'game-assets', component: () => import('./views/GameAssetsView.vue') },
    { path: '/assets', redirect: '/game-assets' },
    { path: '/shop', name: 'shop', component: () => import('./views/ShopView.vue') },
    { path: '/about', name: 'about', component: () => import('./views/AboutView.vue') },
    { path: '/contact', name: 'contact', component: () => import('./views/ContactView.vue') },
  ],
})

export default router

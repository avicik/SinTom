import { createRouter, createWebHashHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/chart',
      name: 'chart',
      component: () => import('../views/ChartPage.vue')
    },
    {
      path: '/smile',
      name: 'smile',
      component: () => import('../views/SmilePage.vue')
    },
    {
      path: '/bell',
      name: 'bell',
      component: () => import('../views/BellPage.vue')
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('../views/SearchPage.vue')
    }
  ]
})

export default router

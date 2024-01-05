import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Home.vue')
    },
    {
      path: '/shop',
      name: 'shop',
      component: () => import('../views/shop.vue')
    },
    {
      path: '/mypage',
      name: 'mypage',
      component: () => import('../views/mypage.vue')
    },
    {
      path: '/create',
      name: 'create',
      component: () => import('../views/Create.vue')
    },
  ]
})

export default router

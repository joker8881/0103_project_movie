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
      path: '/ticket',
      name: 'shop',
      component: () => import('../views/Ticket.vue')
    },
    {
      path: '/mypage',
      name: 'mypage',
      component: () => import('../views/Mypage.vue')
    },
    {
      path: '/create',
      name: 'create',
      component: () => import('../views/Create.vue')
    },
    {
      path: '/introduce',
      name: 'introduce',
      component: () => import('../views/ticket/Introduce.vue')
    },
    {
      path: '/seat',
      name: 'seat',
      component: () => import('../views/ticket/Seat.vue')
    },
  ]
})

export default router

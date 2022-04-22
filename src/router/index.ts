import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue')
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import('@/views/Auth/Auth.vue'),
      redirect: '/auth/login',
      children: [
        {
          path: '/auth/login',
          name: 'login',
          component: () => import('@/views/AuthLogin/AuthLogin.vue'),
        },
        {
          path: '/auth/register',
          name: 'register',
          component: () => import('@/views/AuthRegister/AuthRegister.vue'),
        },
        // {
        //   path: '/auth/forgot-password',
        //   name: 'ForgotPassword',
        //   component: () => import(/* webpackChunkName: "forgot-password-page" */ '../views/Auth/SubViews/ForgotPassword.vue'),
        // },
      ]
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/views/Dashboard/Dashboard.vue')
    },
  ]
})

export default router

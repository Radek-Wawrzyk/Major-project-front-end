import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // Public views
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Home/Home.vue'),
    },
    {
      path: '/offers/:id',
      name: 'offer',
      component: () => import('@/views/Offer/Offer.vue'),
    },
    {
      path: '/host/:id',
      name: 'host',
      component: () => import('@/views/Host/Host.vue'),
    },
    // Auth views
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
          meta: {
            isAuthPage: true,
          },
        },
        {
          path: '/auth/register',
          name: 'register',
          component: () => import('@/views/AuthRegister/AuthRegister.vue'),
          meta: {
            isAuthPage: true,
          },
        },
        {
          path: '/auth/forgot-password',
          name: 'forgotPassword',
          component: () => import('@/views/AuthForgetPassword/AuthForgetPassword.vue'),
          meta: {
            isAuthPage: true,
          },
        },
        {
          path: '/auth/reset-password',
          name: 'resetPassword',
          component: () => import('@/views/AuthResetPassword/AuthResetPassword.vue'),
          meta: {
            isAuthPage: true,
          },
        },
      ]
    },
    // Dashboard views
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/views/Dashboard/Dashboard.vue'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/my-account',
      name: 'myAccount',
      component: () => import('@/views/DashboardSettings/DashboardSettings.vue'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/questions',
      name: 'questions',
      component: () => import('@/views/DashboardQuestions/DashboardQuestions.vue'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/favorite-offers',
      name: 'favoriteOffers',
      component: () => import('@/views/DashboardFavOffers/DashboardFavOffers.vue'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/my-offers',
      name: 'myOffers',
      component: () => import('@/views/DashboardOffers/DashboardOffers.vue'),
      meta: {
        requiresAuth: true,
      },
    },
    // 404
    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      component: () => import('@/views/NotFound/NotFound.vue'),
    }
  ]
});

// Guard for auth pages
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (authStore.isAuthenticated) {
    // If user is logged, he should not be able to navigate to auth pages
    if (to.meta.isAuthPage) {
      next(false);
      return;
    }

    if (to.meta.requiresAuth) {
      next();
      return;
    }
  }

  if (!authStore.isAuthenticated && to.meta.requiresAuth) {
    next('/auth');
    return 
  }

  next();
  return;
});

export default router

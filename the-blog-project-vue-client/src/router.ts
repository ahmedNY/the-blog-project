import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

import blogRoutes from '@/modules/blogs/routes';
import umRoutes from '@/modules/um/routes';

export default new Router({
  routes: [
    {
      path: '/',
      component: () =>
        import('@/modules/main/components/index.vue'),
    },
    {
      path: '/auth/profile',
      component: () => import('@/modules/auth/components/showUserProfile.vue')
    },
    ...blogRoutes,
    ...umRoutes,
  ],
});

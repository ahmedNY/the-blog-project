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
        import('@/components/index.vue'),
    },
    ...blogRoutes,
    ...umRoutes,
  ],
});

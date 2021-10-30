import { createRouter, createWebHistory } from 'vue-router';
import store from '../store';
import routes from './routes';

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: 'active',
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta)) {
    if (to.meta.guest && store.getters.isLoggedIn) {
      next({
        name: 'Home',
      });
    }

    if (to.meta.auth && !store.getters.isLoggedIn) {
      next({
        name: 'Login',
      });
    }
  }

  next();
});

export default router;

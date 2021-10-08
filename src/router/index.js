import { createRouter, createWebHistory } from 'vue-router';
import store from '../store/index';
import Register from '../pages/Register.vue';
import Login from '../pages/Login.vue';
import Profile from '../pages/Profile.vue';
import NotFound from '../pages/NotFound.vue';

const routes = [
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/:username',
    name: 'Profile',
    component: Profile,
    meta: {
      auth: true,
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.auth)) {
    if (!store.getters.isLoggedIn) {
      next({
        path: '/login',
      });
      return;
    }
  }

  next();
});

export default router;

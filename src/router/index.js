import { createRouter, createWebHistory } from 'vue-router';
import store from '../store/index';
import Register from '../pages/Register.vue';
import Login from '../pages/Login.vue';
import Profile from '../pages/Profile.vue';
import Posts from '../components/Profile/Posts.vue';
import About from '../components/Profile/About.vue';
import Friends from '../components/Profile/Friends.vue';
import Photos from '../components/Profile/Photos.vue';
import NotFound from '../pages/NotFound.vue';

const routes = [
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
      guest: true,
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      guest: true,
    },
  },
  {
    path: '/:username',
    name: 'Profile',
    component: Profile,
    props: true,
    meta: {
      auth: true,
    },
    children: [
      {
        path: '',
        name: Posts,
        component: Posts,
        props: true,
      },
      {
        path: 'about',
        name: About,
        component: About,
        props: true,
      },
      {
        path: 'friends',
        name: Friends,
        component: Friends,
        props: true,
      },
      {
        path: 'photos',
        name: Photos,
        component: Photos,
        props: true,
      },
    ],
  },
  {
    path: '/:catchAll(.*)*',
    name: 'NotFound',
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
  linkActiveClass: 'active',
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta)) {
    if (to.meta.guest && store.getters.isLoggedIn) {
      next({
        name: 'Home',
      });

      return;
    }

    if (to.meta.auth && !store.getters.isLoggedIn) {
      next({
        path: '/login',
      });
    }
  }

  next();
});

export default router;

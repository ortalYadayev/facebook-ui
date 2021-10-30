import { createRouter, createWebHistory } from 'vue-router';
import store from '../store';

const routes = [
  {
    path: '/register',
    name: 'Register',
    component: () => import('../pages/Register.vue'),
    meta: {
      guest: true,
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../pages/Login.vue'),
    meta: {
      guest: true,
    },
  },
  {
    path: '/',
    component: () => import('../layouts/SignedLayout.vue'),
    children: [
      {
        path: '/',
        name: 'Home',
        component: () => import('../pages/Home.vue'),
      },
      {
        path: '/search?query=:search',
        name: 'Search',
        component: () => import('../pages/Search.vue'),
        props: true,
        meta: {
          auth: true,
        },
      },
      {
        path: '/:username',
        name: 'Profile',
        component: () => import('../pages/Profile.vue'),
        props: true,
        meta: {
          auth: true,
        },
        children: [
          {
            path: '',
            name: 'Posts',
            component: () => import('../components/Profile/Posts.vue'),
            props: true,
          },
          {
            path: 'about',
            name: 'About',
            component: () => import('../components/Profile/About.vue'),
            props: true,
          },
          {
            path: 'friends',
            name: 'Friends',
            component: () => import('../components/Profile/Friends.vue'),
            props: true,
          },
          {
            path: 'photos',
            name: 'Photos',
            component: () => import('../components/Profile/Photos.vue'),
            props: true,
          },
        ],
      },
    ],
  },
  {
    path: '/:catchAll(.*)*',
    name: 'NotFound',
    component: () => import('../pages/NotFound.vue'),
  },
];

const router = createRouter({
  mode: 'history',
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

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

// css import
import './assets/css/tailwind.css';
import './assets/css/app.scss';

// Auth
store.dispatch('getAuthUser');

// Font Awesome imports
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import {
  // Solid font awesome
  faSearch,
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons';

import {
  // Regular font awesome
  faEye,
} from '@fortawesome/free-regular-svg-icons';
import {
  // Brands font awesome
  faRedditAlien,
} from '@fortawesome/free-brands-svg-icons';

library.add(
  // Solid f-a
  faSearch,
  faArrowRight,

  // Regular f-a
  faEye,

  // Brands f-a
  faRedditAlien
);

createApp(App)
  .use(router)
  .use(store)
  .component('font-awesome-icon', FontAwesomeIcon)
  .mount('#app');

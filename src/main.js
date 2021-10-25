import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

// Font Awesome\
import './helpers/font_awesome';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// Auth
store.dispatch('getAuthUser');

createApp(App)
  .use(router)
  .use(store)
  .component('fa-icon', FontAwesomeIcon)
  .mount('#app');

<template>
  <div>
    <Spinner v-if="$store.state.showLoading" />
    <router-view :key="$route.name !== 'Profile' ? $route.fullPath : $route.name" />
  </div>
</template>

<script>
import Spinner from './components/Spinner.vue';
import { useStore } from 'vuex';

export default {
  components: {
    Spinner,
  },
  setup() {
    const store = useStore();
  }
}
</script>

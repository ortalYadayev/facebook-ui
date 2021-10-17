<template>
  <div>
    <Spinner v-if="$store.state.showLoading" />
    <router-view :key="$route.name !== 'Profile' ? $route.fullPath : $route.name" />
  </div>
</template>

<script>
import Spinner from './components/Spinner.vue';

export default {
  components: {
    Spinner,
  },
}
</script>

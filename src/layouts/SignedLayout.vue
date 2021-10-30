<template>
  <div>
    <FbHeader v-if="store.state.token" />
    <router-view :key="$route.name !== 'Profile' ? $route.fullPath : $route.name" />
  </div>
</template>

<script>
import FbHeader from '../components/FbHeader.vue'
import { useStore } from "vuex";

export default {
  name: "NotFound",
  components: {
    FbHeader,
  },
  setup() {
    const store = useStore();
    return {
      store,
    }
  }
}
</script>
<template>
  <div>
    <FbHeader v-if="$store.getters.isLoggedIn" />

    <router-view :key="!$route.name.startsWith('Profile') ? $route.fullPath : $route.name" />
  </div>
</template>

<script>
import FbHeader from '../components/FbHeader.vue'

export default {
  name: "NotFound",
  components: {
    FbHeader,
  },
}
</script>
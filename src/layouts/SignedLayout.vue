<template>
  <div>
    <FbHeader />
    <router-view :key="$route.name !== 'Profile' ? $route.fullPath : $route.name" />
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
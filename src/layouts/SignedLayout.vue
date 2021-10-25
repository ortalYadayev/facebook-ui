<template>
  <div>
    <FbHeader />
    <router-view />
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
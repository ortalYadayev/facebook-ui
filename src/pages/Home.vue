<template>
  <SignedHome
    v-if="$store.getters.isLoggedIn"
  />
  <UnsignedHome v-else />
</template>

<script>
import UnsignedHome from '../components/UnsignedHome.vue'
import SignedHome from '../components/SignedHome.vue'

export default {
  name: "Home",
  components: {
    UnsignedHome,
    SignedHome,
  },
}
</script>

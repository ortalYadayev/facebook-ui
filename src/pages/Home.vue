<template>
  <div
    v-if="$store.getters.isLoggedIn"
    class=""
  >
    <FbHeader />
  </div>
  <div
    v-else
    class="home min-h-screen overflow-hidden bg-gray_rgb"
  >
    <div class="unsigned-header flex flex-wrap container m-auto flex justify-between items-center">
      <router-link
        :to="{ name: 'Home' }"
      >
        <div class="logo" />
      </router-link>
      <div class="flex flex-1 justify-end items-center mr-4 md:mr-10">
        <router-link
          :to="{ name: 'Login' }"
          class="duration-300 border-primary border-2 hover:border-primary hover:text-white hover:bg-primary text-sm sm:text-lg text-primary font-bold uppercase rounded-lg px-2 sm:px-4 md:px-6 py-2 mr-3 sm:mr-6"
        >
          Login
        </router-link>
        <router-link
          :to="{ name: 'Register' }"
          class="duration-300 hover:border-primary border-primary border-2 hover:bg-primary hover:text-white bg-gray_rgb text-sm sm:text-lg text-primary font-bold uppercase rounded-lg px-2 sm:px-4 md:px-6 py-2"
        >
          Register
        </router-link>
      </div>
    </div>
    <h1 class="unsigned-home flex justify-center items-center text-center text-primary text-5xl px-4">
      welcome to facebook
    </h1>
  </div>
</template>

<script>
import FbHeader from '../components/FbHeader.vue'

export default {
  name: "Home",
  components: {
    FbHeader,
  },
  setup() {
  }
}
</script>

<style lang="scss" scoped>

.home{
  background: url("../assets/images/circle.png") no-repeat center;
  background-size: 80% 200%;
}
</style>
<template>
  <div
    v-if="$store.getters.isLoggedIn"
    class=""
  >
    login
  </div>
  <div
    v-else
    class="home h-screen overflow-hidden bg-gray"
  >
    <div class="unsigned-header container m-auto flex justify-between items-center">
      <router-link :to="{ name: 'Home' }">
        <div class="logo" />
      </router-link>
      <div class="flex flex-1 justify-end items-center mr-4 md:mr-10">
        <router-link
          :to="{ name: 'Login' }"
          class="duration-300 border-white border-2 hover:border-lightblue hover:bg-lightblue hover:opacity-90 hover:text-primary text-sm sm:text-lg text-white font-bold uppercase rounded-lg px-2 sm:px-4 md:px-6 py-2 mr-3 sm:mr-6"
        >
          Login
        </router-link>
        <router-link
          :to="{ name: 'Register' }"
          class="transform -rotate-6 duration-300 hover:border-white border-primary border-2 hover:bg-primary hover:text-white bg-white text-sm sm:text-lg text-primary font-bold uppercase rounded-lg px-2 sm:px-4 md:px-6 py-2"
        >
          Register
        </router-link>
      </div>
    </div>
    <h1 class="unsigned-home flex justify-center items-center text-white text-5xl">
      welcome to facebook
    </h1>
  </div>
</template>

<script>

export default {
  name: "Home",
  setup() {
  }
}
</script>

<style scoped>

</style>
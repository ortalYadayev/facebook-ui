<template>
  <header class="profile-header flex flex-col justify-between items-center shadow-lg pb-3">
    <div class="mt-10">
      <img
        class="border-4 border-lightblue h-40 w-40 rounded-full bg-white mb-2"
        :src="imageSrc"
        alt="user image"
      >
      <div class="flex items-end text-2xl">
        {{ firstName }} {{ lastName }}
      </div>
    </div>
    <nav>
      <router-link
        :to="{ name: 'Register' }"
        class="duration-300 border-b-2 border-transparent hover:text-primary focus:text-primary focus:border-primary hover:border-primary uppercase px-3 py-2"
      >
        Posts
      </router-link>
      <router-link
        :to="{ name: 'Register' }"
        class="duration-300 border-b-2 border-transparent hover:text-primary focus:text-primary focus:border-primary hover:border-primary uppercase ml-2 px-3 py-2"
      >
        About
      </router-link>
      <router-link
        :to="{ name: 'Register' }"
        class="duration-300 border-b-2 border-transparent hover:text-primary focus:text-primary focus:border-primary hover:border-primary uppercase ml-2 px-3 py-2"
      >
        Friends
      </router-link>
      <router-link
        :to="{ name: 'Register' }"
        class="duration-300 border-b-2 border-transparent hover:text-primary focus:text-primary focus:border-primary hover:border-primary uppercase ml-2 px-3 py-2"
      >
        Photos
      </router-link>
      <router-link
        :to="{ name: 'Register' }"
        class="duration-300 border-b-2 border-transparent hover:text-primary focus:text-primary focus:border-primary hover:border-primary uppercase ml-2 px-3 py-2"
      >
        More
      </router-link>
    </nav>
  </header>
</template>

<script>
export default {
  name: "SignHeader",
  props: {
    firstName: String,
    lastName: String,
    imageSrc: String,
  },
  setup(props) {

    return {
    }
  }
}
</script>

<style scoped>

</style>
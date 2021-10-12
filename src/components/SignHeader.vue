<template>
  <header class="profile-header flex flex-col justify-between items-center shadow-sm pb-2">
    <div class="mt-10">
      <img
        v-if="user.imageUrl"
        class="border-4 border-lightblue h-40 w-40 rounded-full bg-white mb-2"
        :src="user.imageUrl"
        :alt="user.firstName"
      >
      <div class="text-center text-2xl">
        {{ user.firstName }} {{ user.lastName }}
      </div>
    </div>
    <nav class="profile-nav">
      <router-link
        :to="{ name: Posts }"
        :class=" $route.fullPath.split('/').length === 2 ? 'active': ''"
        active-class=""
        class="duration-300 hover:text-primary hover:border-primary uppercase px-3 py-2"
      >
        Posts
      </router-link>
      <router-link
        :to="{ name: About }"
        class="duration-300 border-b-2 border-transparent hover:text-primary hover:border-primary uppercase ml-2 px-3 py-2"
      >
        About
      </router-link>
      <router-link
        :to="{ name: Friends }"
        class="duration-300 border-b-2 border-transparent hover:text-primary hover:border-primary uppercase ml-2 px-3 py-2"
      >
        Friends
      </router-link>
      <router-link
        :to="{ name: Photos }"
        class="duration-300 border-b-2 border-transparent hover:text-primary hover:border-primary uppercase ml-2 px-3 py-2"
      >
        Photos
      </router-link>
      <router-link
        :to="{ name: 'Register' }"
        active-class="active"
        class="duration-300 border-b-2 border-transparent hover:text-primary hover:border-primary uppercase ml-2 px-3 py-2"
      />
    </nav>
  </header>
</template>

<script>
import Posts from "../components/Profile/Posts.vue";
import About from "../components/Profile/About.vue";
import Friends from "../components/Profile/Friends.vue";
import Photos from "../components/Profile/Photos.vue";

export default {
  name: "SignHeader",
  props: {
    user: {
      type: Object,
      required: true
    },
  },
  setup(props) {

    return {
      Posts,
      About,
      Friends,
      Photos,
    }
  }
}
</script>

<style scoped>
</style>
<template>
  <header class="profile-header flex flex-col justify-between items-center shadow-sm pb-3">
    <div class="mt-10">
      <img
        v-if="user.imageUrl"
        class="border-4 border-lightblue h-40 w-40 rounded-full bg-white mb-2"
        :src="user.imageUrl"
        :alt="user.firstName"
      >
      <div class="text-2xl">
        {{ user.firstName }} {{ user.lastName }}
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
        :to="{ name: 'Profile', params: { username: 'ortalo12' } }"
        class="duration-300 border-b-2 border-transparent hover:text-primary focus:text-primary focus:border-primary hover:border-primary uppercase ml-2 px-3 py-2"
      >
        More
      </router-link>
    </nav>
  </header>
</template>

<script>
import { useStore } from "vuex";
import {computed, ref} from "vue";

export default {
  name: "SignHeader",

  props: {
    user: {
      type: Object,
      required: true
    },
  },
  setup(props) {
    const store = useStore();

    const isMyProfile = computed(() => store.state.user.username === props.user.username)

    return {
      isMyProfile,
    }
  }
}
</script>

<style scoped>

</style>
<template>
  <header class="profile-header flex flex-col justify-between items-center shadow-sm pb-2">
    <div class="mt-10">
      <img
        v-if="user.profilePicturePath"
        class="border-4 border-lightblue h-40 w-40 rounded-full bg-white mb-2"
        :src="user.profilePicturePath"
        :alt="user.firstName"
      >
      <img
        v-else
        src="../assets/images/user.png"
        alt="user icon"
        class="border-4 border-lightblue h-40 w-40 rounded-full bg-white mb-2"
      >
      <div class="text-center text-2xl">
        {{ user.firstName }} {{ user.lastName }}
      </div>
    </div>
    <nav class="profile-nav">
      <router-link
        :to="{ name: 'Profile.Posts', params: { user } }"
        :class=" $route.fullPath.split('/').length === 2 ? 'active': ''"
        active-class=""
        class="duration-300 hover:border-primary uppercase px-3 py-2"
      >
        Posts
      </router-link>
      <router-link
        :to="{ name: 'Profile.About', params: { user } }"
        class="duration-300 border-b-2 border-transparent uppercase ml-2 px-3 py-2"
      >
        About
      </router-link>
      <router-link
        :to="{ name: 'Profile.Friends', params: { user } }"
        class="duration-300 border-b-2 border-transparent uppercase ml-2 px-3 py-2"
      >
        Friends
      </router-link>
      <router-link
        :to="{ name: 'Profile.Photos', params: { user } }"
        class="duration-300 border-b-2 border-transparent hover:text-primary hover:border-primary uppercase ml-2 px-3 py-2"
      >
        Photos
      </router-link>
      <router-link
        :to="{ name: 'Register' }"
        active-class="active"
        class="duration-300 border-b-2 border-transparent hover:text-primary hover:border-primary uppercase ml-2 px-3 py-2"
      >
        More
      </router-link>
    </nav>
  </header>
</template>

<script>
import Posts from './Profile/Posts.vue';
import About from './Profile/About.vue';
import Friends from './Profile/Friends.vue';
import Photos from './Profile/Photos.vue';

export default {
  name: "SignedHeaderProfile",
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    return {
      Posts,
      About,
      Friends,
      Photos,
      props,
    }
  }
}
</script>

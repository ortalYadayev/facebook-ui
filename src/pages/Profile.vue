<template>
  <div>
    <SignHeader
      :user="user"
    />
    <About v-if="$route.fullPath.split('/')[2] === 'about'" />
    <Friends v-else-if="$route.fullPath.split('/')[2] === 'friends'" />
    <Photos v-else-if="$route.fullPath.split('/')[2] === 'photos'" />
    <Posts v-else />
  </div>
</template>

<script>
import { useStore } from "vuex";
import { ref, watchEffect } from "vue";
import { useRouter } from "vue-router";
import SignHeader from "../components/SignHeader.vue";
import Posts from "../components/Profile/Posts.vue";
import About from "../components/Profile/About.vue";
import Friends from "../components/Profile/Friends.vue";
import Photos from "../components/Profile/Photos.vue";

export default {
  name: "Profile",
  components: {
    SignHeader,
    Posts,
    About,
    Friends,
    Photos,
  },
  props: {
    username: {
      type: String,
      required: true,
    }
  },
  setup(props, { slots }) {
    const store = useStore();
    const router = useRouter();
    const user = ref({
      id: '',
      email: '',
      lastName: '',
      firstName: '',
      username: '',
      imageUrl: '',
    });

    watchEffect(() => {
      if (props.username !== user.value.username) {
        showUser();
      }
    });


    // this.$slots.default().filter(child => child.type.name === 'Posts')

    return {
      router,
      props,
      user,
    }

    async function showUser() {
      try {
        const response = await store.dispatch('showUser', props.username);
        user.value = response.data;
      } catch (error) {
        if (error.response.status === 404) {
          await router.push({ name: "NotFound" });
        }
      }
    }
  }
}
</script>
<template>
  <div>
    <sync-loader
      v-if="user.username.length === 0"
      :loading="isLoading"
      :color="color"
      :size="size"
      class="h-screen flex justify-center items-center"
    />
    <div v-else>
      <SignHeader
        :user="user"
      />
      <About
        v-if="$route.fullPath.split('/')[2] === 'about'"
        :user="user"
      />
      <Friends
        v-else-if="$route.fullPath.split('/')[2] === 'friends'"
        :user="user"
      />
      <Photos
        v-else-if="$route.fullPath.split('/')[2] === 'photos'"
        :user="user"
      />
      <Posts
        v-else
        :user="user"
      />
    </div>
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
import SyncLoader from 'vue-spinner/src/SyncLoader.vue'

export default {
  name: "Profile",
  components: {
    SignHeader,
    Posts,
    About,
    Friends,
    Photos,
    SyncLoader,
  },
  props: {
    username: {
      type: String,
      required: true,
    }
  },
  setup(props) {
    const store = useStore();
    const router = useRouter();

    const isLoading = ref(false);
    const color = ref('rgb(24, 119, 241)');
    const size = ref('20px');

    const user = ref(  {
      id: '',
      email: '',
      lastName: '',
      firstName: '',
      username: '',
      profilePicturePath: '',
      profilePictureUrl: '',
      isAuth: false,
    });

    watchEffect(() => {
      if (props.username.toLowerCase() !== user.value.username) {
        getUser();
      }
    });


    return {
      router,
      props,
      user,
      isLoading,
      color,
      size,
    };

    async function getUser() {
      isLoading.value = true;
      try {
        const response = await store.dispatch('getUser', props.username);

        response.data.isAuth = store.state.user.username.toLowerCase() === response.data.username.toLowerCase();
        user.value = response.data;
      } catch (error) {
        if (error.response.status === 404) {
          await router.push({ name: "NotFound" });
        }
      }
      isLoading.value = false;
    }
  }
}
</script>

<style lang="scss" scoped >
@import '../assets/css/app.scss';

.profile-header {
  height: $profile-header-height;
  background-image: linear-gradient(to bottom, $lightblue, #c0daff, #dbe4ff, #f0f1ff, #ffffff);
}
</style>
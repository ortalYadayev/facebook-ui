<template>
  <div>
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
  setup(props) {
    const store = useStore();
    const router = useRouter();

    const user = ref( null | {
      id: '',
      email: '',
      lastName: '',
      firstName: '',
      username: '',
      profilePicturePath: '',
      profilePictureUrl: '',
      isAuth: false,
    });

    console.log(user);
    // watchEffect(() => {
    //   if (props.username.toLowerCase() !== user.value.username) {
        getUser();
    //   }
    // });


    return {
      router,
      props,
      user,
    };

    async function getUser() {
      try {
        store.commit("onLoad");
        const response = await store.dispatch('getUser', props.username);
        response.data.isAuth = store.state.user.username.toLowerCase() === response.data.username.toLowerCase();
        user.value = response.data;
      } catch (error) {
        if (error.response.status === 404) {
          await router.push({ name: "NotFound" });
        }
      }
      store.commit("offLoad");
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

.profile-header a.active {
  color: $primary;
  border-bottom: 2px solid $primary;
}

</style>
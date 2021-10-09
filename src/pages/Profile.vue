<template>
  <div>
    <SignHeader
      :user="user"
    />

    not nav
  </div>
</template>

<script>
import { useStore } from "vuex";
import { ref, watchEffect } from "vue";
import { useRouter } from "vue-router";
import SignHeader from "../components/SignHeader.vue";

export default {
  name: "Profile",
  components: {
    SignHeader,
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

    return {
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

<style scoped>

</style>
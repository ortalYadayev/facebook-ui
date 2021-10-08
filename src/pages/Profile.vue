<template>
  <div>
    <SignHeader
      :first-name="$store.state.user.firstName"
      :last-name="$store.state.user.lastName"
      :image-src="$store.state.user.imageUrl"
    />
    not nav
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { computed } from "vue";
import SignHeader from "../components/SignHeader.vue";

export default {
  name: "Profile",
  components: {
    SignHeader,
  },
  props: ['username'],
  setup(props) {
    const store = useStore();
    const route = useRoute();
    const isMyProfile = computed(() => {
      const username = store.state.user.username;

      return username.toString() === props.username;
    })

    return {
      isMyProfile,
      props
    }
  }
}
</script>

<style scoped>

</style>
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
import router from "../router";
import SignHeader from "../components/SignHeader.vue";

export default {
  name: "Profile",
  components: {
    SignHeader,
  },
  setup(props) {
    const store = useStore();

    const route = useRoute();

    setTimeout(()=> {
      const username = store.state.user.username;

      console.log(props.username)

      // if(username.toString() !== props.username){
      //   router.push({ name: "NotFound" });
      // }
    }, 0);

    return {
      route,

    }
  }
}
</script>

<style scoped>

</style>
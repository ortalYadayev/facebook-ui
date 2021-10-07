<template>
  <div>
    test
  </div>
</template>
<script>

import { useRoute } from "vue-router";
import { useStore } from "vuex";
import router from "../router";

export default {
  name: "Profile",
  props: ["id"],
  setup(props) {
    const store = useStore();

    const route = useRoute();

    setTimeout(()=> {
      const id = store.state.user.id;

      if(id.toString() !== props.id){
        router.push({ name: "NotFound" });
      }
    }, 0);




    return {
      route,
    }
  }
}
</script>

<style scoped>

</style>
<template>
  <div>
    friends
  </div>
</template>
<script>
import {useStore} from "vuex";
import {computed} from "vue";

export default {
  name: "Posts",
  props: {
    user: {
      type: Object,
      required: true
    },
  },
  setup(props) {
    const store = useStore();

    let isMyProfile = computed(() => store.state.user.username === props.user.username);

    return {
      isMyProfile,
    }
  }
}
</script>

<style scoped>

</style>
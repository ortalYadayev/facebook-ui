<template>
  <div class="body">
    <Posts :user="$store.state.user" />
  </div>
</template>

<script>

import Posts from "./Profile/Posts.vue";

export default {
  name: "SignedHome",
  components: {
    Posts
  },
}

</script>
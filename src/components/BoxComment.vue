<template>
  <div class="flex justify-between items-center">
    <div class="max-w-comment flex">
      <router-link
        :to="{ name: 'Profile', params: { username: comment.user.username } }"
        class="mt-2"
      >
        <img
          v-if="comment.user.profilePicturePath"
          :src="comment.user.profilePicturePath"
          :alt="comment.user.firstName"
          class="hover:opacity-90 h-6 w-6 rounded-full"
        >
        <img
          v-else
          src="../assets/images/user.png"
          alt="user icon"
          class="hover:opacity-90 bg-gray-rgb h-6 w-6 rounded-full"
        >
      </router-link>
      <div class="max-w-comment flex flex-col mx-2 break-words">
        <div class="flex flex-col rounded-3xl bg-gray-rgb px-4 py-2">
          <router-link
            :to="{ name: 'Profile', params: { username: comment.user.username } }"
            class="font-bold hover:underline"
          >
            {{ comment.user.firstName }} {{ comment.user.lastName }}
          </router-link>
          <span>
            {{ comment.content }}
          </span>
        </div>
      </div>
    </div>
    <div class="">
      ...
    </div>
  </div>
</template>

<script>
export default {
  name: "BoxComment",
  props: {
    comment: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.max-w-comment {
  max-width: 90%;
}
</style>
<template>
  <div class="flex justify-between items-center mb-3">
    <div class="max-w-comment flex">
      <router-link
        :to="{ name: 'Profile', params: { username: comment.user.username } }"
        class="mt-2 mr-2"
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
      <div class="max-w-comment break-words flex-1">
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
      <transition name="slide-fade">
        <div
          v-if="comment.likes.length > 0"
          class="flex items-end"
        >
          <div class="-ml-7 -mb-2">
            <div class="flex items-center justify-center text-sm rounded-full px-1 bg-white shadow-lg">
              <div class="bg-primary rounded-full w-4 h-4 flex items-center justify-center mr-1">
                <fa-icon
                  icon="thumbs-up"
                  class="text-white p-0.5"
                />
              </div>
              {{ comment.likes.length }}
            </div>
          </div>
        </div>
      </transition>
    </div>

    <div class="ml-2 rounded-full w-7 h-7 flex items-center justify-center hover:bg-gray-rgb">
      <fa-icon
        icon="ellipsis-v"
        class="fa-sm"
      />
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

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.4s ease-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(110%);
  opacity: 0;
}

</style>
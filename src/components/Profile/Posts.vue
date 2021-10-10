<template>
  <div class="h-screen bg-gray_rgb">
    <div class="container m-auto flex flex-col items-center">
      <div class="body-posts">
        <div class="rounded-lg shadow-md bg-white my-2 py-3 px-5">
          <div class="flex items-center">
            <img
              v-if="user.imageUrl"
              class="h-9 w-9 rounded-full mr-2"
              :src="user.imageUrl"
              :alt="user.firstName"
            >
            <div class="flex-1 flex justify-between rounded-2xl">
              <input
                type="text"
                class="flex-1 duration-300 hover:bg-gray-300 bg-gray_rgb text-gray-700 rounded-2xl py-2 px-4"
                placeholder="What do you think ?"
                v-model="payload.post"
              >
              <button
                v-if="payload.post.length > 0"
                class="ml-2"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {computed, reactive } from "vue";
import {useStore} from "vuex";

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

    const payload = reactive({
      post: ''
    })


    return {
      isMyProfile,
      payload
    }
  }
}
</script>

<style scoped>

</style>
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
                class="flex-1 hover:bg-gray-300 bg-gray_rgb text-gray-700 rounded-2xl py-2 px-4"
                placeholder="What do you think ?"
                v-model="payload.description"
              >
              <transition name="slide-fade">
                <button
                  v-if="payload.description.length > 0"
                  class="ml-2"
                  @click="addPost"
                >
                  Send
                </button>
              </transition>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { reactive } from "vue";
import { useStore } from "vuex";

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

    const payload = reactive({
      user: '',
      description: '',
    })

    console.log(payload);
    return {
      addPost,
      payload,
      props,
    }

    async function addPost(){
      console.log(props)
      payload.user = props.user.username;
      console.log(payload)
      try {
        await store.dispatch('post', payload);

        console.log(payload);
        // await router.push({ name: "Home" });
      } catch (error) {
        // if (error.response.status === 422) {
          console.log(error)
          // errors.value.message = error.response.data.message;
        // }
      }
    }
  }
}

</script>

<style lang="scss" scoped>
@import '../../assets/css/app.scss';

.body-posts {
  width: $post-width;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.8s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>

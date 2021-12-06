<template>
  <div>
    <div
      v-for="(item, index) in items"
      :key="index"
      class="flex items-center justify-between py-1"
    >
      <div class="max-w-comment flex">
        <router-link
          :to="{ name: 'Profile', params: { username: store.state.user.username } }"
          class="mt-2"
        >
          <img
            v-if="store.state.user.profilePicturePath"
            :src="store.state.user.profilePicturePath"
            :alt="store.state.user.firstName"
            class="hover:opacity-90 h-6 w-6 rounded-full"
          >
          <img
            v-else
            src="../../assets/images/user.png"
            alt="user icon"
            class="hover:opacity-90 bg-gray-rgb h-6 w-6 rounded-full"
          >
        </router-link>
        <div class="max-w-comment flex flex-col mx-2 break-words">
          <div class="flex flex-col rounded-3xl bg-gray-rgb px-4 py-2">
            <router-link
              :to="{ name: 'Profile', params: { username: store.state.user.username } }"
              class="font-bold hover:underline"
            >
              {{ item.user.firstName }} {{ item.user.lastName }}
            </router-link>
            <span>
              {{ item.content }}
            </span>
          </div>
          <div class="text-xs">
            <button
              @click="like(index)"
              class="hover:underline"
              :class="item.likeAuth ? 'text-primary' : ''"
            >
              like
            </button>
            <button class="hover:underline mx-3">
              comment
            </button>
            {{ item.commentFormat }}
          </div>
        </div>
      </div>
      <div class="">
        ...
      </div>
    </div>
  </div>
</template>

<script>
import {useStore} from "vuex";
import {ref} from "vue";

export default {
  name: "Comment",
  props: {
    items: {
      type: Array,
      required: true
    },
  },
  setup(props) {
    const store = useStore();

    return {
      store,
      like,
    }

    async function like(index) {
      try {
        if (!props.items[index].likeAuth) {
          await store.dispatch('commentLike', {
            commentId: props.items[index].id,
          });

          // eslint-disable-next-line vue/no-mutating-props
          props.items[index].likeAuth = true;
        } else {
          await store.dispatch('commentUnlike', {
            commentId: props.items[index].id,
          });

          // eslint-disable-next-line vue/no-mutating-props
          props.items[index].likeAuth = false;
        }
      } catch (error) {
        if (error.response.status === 404) {
          await $router.push({name: "NotFound"});
        }
      }
    }
  }
}
</script>

<style scoped>

.max-w-comment {
  max-width: 90%;
}
</style>
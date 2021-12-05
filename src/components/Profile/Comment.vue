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
              :class="likeAuth[index] ? 'text-primary' : ''"
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
    postId: {
      type: Number,
      required: true
    },
  },
  setup(props) {
    const store = useStore();

    const likeAuth = ref([]);

    for (let i = 0; i < props.items.length; i++) {
      likeAuth[i] = ref(props.items[i].likeAuth);
    }

    return {
      store,
      likeAuth,
      like,
    }

    async function like(index) {
      console.log(`postId: ${props.postId},
          commentId: ${props.items[index].id}`)
      try {
        if (!likeAuth.value[index]) {
          await store.dispatch('commentLike', {
            postId: props.postId,
            commentId: props.items[index].id,
          });

          likeAuth.value[index] = true;
          // props.items[index].likesCount++;
        } else {
          await store.dispatch('commentUnlike', {
            postId: props.postId,
            commentId: props.items[index].id,
          });

          likeAuth.value[index] = false;
          // props.items[index].likesCount--;
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
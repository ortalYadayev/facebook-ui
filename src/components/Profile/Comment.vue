<template>
  <div>
    <div
      v-for="(item, index) in items"
      :key="index"
      class="mb-2"
    >
      <BoxComment :comment="item" />
      <div class="text-xs ml-9">
        <button
          @click="like(index)"
          class="hover:underline"
          :class="item.likeAuth ? 'text-primary' : ''"
        >
          like
        </button>
        <label
          :for="commentsOfComments[index].commentId"
          class="hover:underline mx-3"
        >comment</label>
        {{ item.commentFormat }}
        <span class="text-blue-500 font-bold">
          {{ item.likesCount }} likes
          {{ item.commentsCount }} comments
        </span>
      </div>
      <div class="mb-1 ml-8">
        <button
          @click="openOrCloseComments(index)"
          v-if="item.commentsCount > 0 && commentsOfComments[index].showComments"
          class="hover:underline mb-1"
        >
          <fa-icon icon="caret-down" />
          {{ item.commentsCount }} comment{{ item.commentsCount > 1 ? 's' : '' }}
        </button>
        <div v-if="item.comments.length > 0">
          <div
            v-for="(comment, commentIdx) in item.comments"
            :key="commentIdx"
            class="my-2"
          >
            <BoxComment :comment="comment" />
            <div class="text-xs ml-9">
              <button
                @click="like(commentIdx)"
                class="hover:underline"
                :class="comment.likeAuth ? 'text-primary' : ''"
              >
                like
              </button>
              <label
                :for="commentsOfComments[index].commentId"
                class="hover:underline mx-3"
              >comment</label>
              {{ comment.commentFormat }}
              <span class="text-blue-500 font-bold">
                {{ comment.likesCount }} likes
                {{ comment.commentsCount }} comments
              </span>
            </div>
          </div>
        </div>
        <div class="flex items-center">
          <router-link :to="{ name: 'Profile', params: { username: store.state.user.username } }">
            <img
              v-if="store.state.user.profilePicturePath"
              :src="store.state.user.profilePicturePath"
              :alt="store.state.user.firstName"
              class="hover:opacity-90 h-6 w-6 rounded-full mr-2"
            >
            <img
              v-else
              src="../../assets/images/user.png"
              alt="user icon"
              class="hover:opacity-90 bg-gray-rgb h-6 w-6 rounded-full mr-2"
            >
          </router-link>
          <input
            type="text"
            :id="commentsOfComments[index].commentId"
            @keyup.enter="addComment(index)"
            class="flex-1 rounded-3xl bg-gray-rgb px-4 py-2"
            placeholder="Type Your Comment"
            v-model="payloadComments[index].content"
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {useStore} from "vuex";
import {reactive, watchEffect} from "vue";
import getMessageDateService from "../../helpers/getMessageDate";
import {useRouter} from "vue-router";
import BoxComment from "../BoxComment.vue";

export default {
  name: "Comment",
  props: {
    items: {
      type: Array,
      required: true
    },
  },
  components: {
    BoxComment,
  },
  setup(props) {
    const store = useStore();
    const router = useRouter();

    const payloadComments = reactive([]);
    const commentsOfComments = reactive([]);

    preparation();

    watchEffect(() => {
      if (props.items.length > payloadComments.length) {
        payloadComments.push(reactive({
          content: '',
        }));

        const mainComment = props.items[props.items.length - 1];

        commentsOfComments.push(reactive({
          comments: [...mainComment.comments],
          showComments: true,
          opened: false,
          commentId: mainComment.id,
        }));
      }
    })

    return {
      store,
      router,
      payloadComments,
      commentsOfComments,
      addComment,
      like,
      openOrCloseComments,
      moreComments,
    }

    async function preparation() {
      for (let i = 0; i < props.items.length; i++) {
        // eslint-disable-next-line vue/no-setup-props-destructure
        const mainComment = props.items[i];

        payloadComments[i] = reactive({
          content: '',
        })

        commentsOfComments[i] = reactive({
          comments: [...mainComment.comments],
          showComments: true,
          opened: false,
          commentId: mainComment.id,
        })
        mainComment.comments = [];
      }
    }

    async function addComment(index) {
      try {
        const response = await store.dispatch('commentOnComment', {
          commentId: props.items[index].id,
          content: payloadComments[index],
        });
        payloadComments[index].content = '';

        const m = getMessageDateService(response.data);
        console.log(m)
        response.data.commentFormat = m;
        response.data.likeAuth = false;
        response.data.comments = [];
        response.data.likes = [];
        response.data.commentsCount = 0;
        response.data.likesCount = 0;

        commentsOfComments[index].comments.push(response.data);
        // eslint-disable-next-line vue/no-mutating-props
        props.items[index].comments.push(response.data);
        // eslint-disable-next-line vue/no-mutating-props
        props.items[index].commentsCount++;
      } catch (error) {
        if (error.response.status === 422) {
          errors.comment = error.response.data[0].message;
          console.log(error)
        }
        if (error.response.status === 404) {
          await router.push({name: "NotFound"});
        }
      }
    }

    async function like(index) {
      try {
        if (!props.items[index].likeAuth) {
          await store.dispatch('commentLike', {
            commentId: props.items[index].id,
          });

          // eslint-disable-next-line vue/no-mutating-props
          props.items[index].likeAuth = true;
          // eslint-disable-next-line vue/no-mutating-props
          props.items[index].likesCount++;
        } else {
          await store.dispatch('commentUnlike', {
            commentId: props.items[index].id,
          });

          // eslint-disable-next-line vue/no-mutating-props
          props.items[index].likeAuth = false;
          // eslint-disable-next-line vue/no-mutating-props
          props.items[index].likesCount--;
        }
      } catch (error) {
        if (error.response.status === 404) {
          await $router.push({name: "NotFound"});
        }
      }
    }

    async function openOrCloseComments(index) {
      if (commentsOfComments[index].opened === true) {
        commentsOfComments[index].opened = false;
        commentsOfComments[index].showComments = true;
        return;
      }

      await moreComments(index);
    }

    async function moreComments(index) {
      commentsOfComments[index].opened = true;

      const lengthStart = props.items[index].comments.length;
      let lengthEnd = lengthStart + 5;
      const lengthComments = commentsOfComments[index].comments.length;

      if (lengthComments <= lengthEnd) {
        lengthEnd = lengthComments;
        commentsOfComments[index].showComments = false;
      }

      for (let i = lengthComments - lengthEnd; i < lengthComments - lengthStart; i++) {
        commentsOfComments[index].comments[i].commentFormat = getMessageDateService(commentsOfComments[index].comments[i]);
      }

      // eslint-disable-next-line vue/no-mutating-props
      props.items[index].comments.unshift(...commentsOfComments[index].comments.slice(lengthComments - lengthEnd, lengthComments - lengthStart));

      console.log(props.items[index].comments)
    }
  }
}
</script>

<style scoped>

.max-w-comment {
  max-width: 90%;
}
</style>
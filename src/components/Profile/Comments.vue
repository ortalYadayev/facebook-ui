<template>
  <div>
    <div class="flex flex-col-reverse">
      <div
        v-for="(comment, index) in comments"
        :key="index"
        class="mb-2"
      >
        <BoxComment :comment="comment" />
        <div class="text-xs ml-9">
          <button
            @click="like(index)"
            class="hover:underline"
            :class="comment.likeAuth ? 'text-primary' : ''"
          >
            like
          </button>
          <label
            @click="openText(index)"
            class="hover:underline mx-3"
            :for="commentsOfComments[index].commentId"
          >comment</label>
          {{ comment.commentFormat }}
        </div>
        <div class="mb-1 ml-8">
          <div
            v-for="(commentOn, commentIdx) in comment.comments"
            :key="commentIdx"
            class="my-2"
          >
            <BoxComment :comment="commentOn" />
            <div class="text-xs ml-9">
              <button
                @click="commentLike(index, commentIdx)"
                class="hover:underline"
                :class="commentOn.likeAuth ? 'text-primary' : ''"
              >
                like
              </button>
              <label
                @click="openText(index)"
                class="hover:underline mx-3"
                :for="commentsOfComments[index].commentId"
              >comment</label>
              {{ commentOn.commentFormat }}
            </div>
          </div>
          <button
            @click="showComments(index)"
            v-if="commentsOfComments[index].showComments"
            class="hover:underline"
          >
            <fa-icon
              icon="reply"
              class="fa-flip-vertical fa-xs"
            />
            {{ comment.commentsCount - (commentsOfComments[index].page - 1) * 5 }}
            comment{{ comment.commentsCount - (commentsOfComments[index].page - 1) * 5 > 1 ? 's' : '' }}
          </button>
          <div
            v-if="commentsOfComments[index].openText"
            class="flex items-center"
          >
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
            <div class="flex-1 flex items-center bg-gray-rgb rounded-3xl mt-1">
              <input
                type="text"
                @keyup.enter="addComment(index)"
                class="flex-1 rounded-3xl bg-gray-rgb px-4 py-2 mt1"
                placeholder="Type Your Comment"
                v-model="payloadComments[index].content"
                :id="commentsOfComments[index].commentId"
              >
              <sync-loader
                class="pr-2"
                :loading="isLoading[index]"
                :color="color"
                :size="size"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {useStore} from "vuex";
import {reactive, ref, watchEffect} from "vue";
import getMessageDateService from "../../helpers/getMessageDate";
import {useRouter} from "vue-router";
import BoxComment from "../BoxComment.vue";
import SyncLoader from 'vue-spinner/src/SyncLoader.vue';

export default {
  name: "Comments",
  props: {
    show: {
      type: Object,
      required: true
    },
    commentsCount: {
      type: Number,
      required: true
    },
    postId: {
      type: Number,
      required: true
    },
  },
  components: {
    BoxComment,
    SyncLoader,
  },
  setup(props) {
    const store = useStore();
    const router = useRouter();

    const isLoading = ref([]);
    const color = ref('rgb(24, 119, 241)');
    const size = ref('6px');

    const payloadComments = reactive([]);
    const commentsOfComments = reactive([]);
    let comments = reactive([]);
    let countOfComments = ref();
    let page = ref(props.show.page);

    preparation();

    watchEffect(() => {
      if (countOfComments.value < props.commentsCount) {
        getLastComment();
        countOfComments.value++;
      }
      
      if (props.show.page !== page.value) {
        page.value = props.show.page;
        preparation();
      }
    })

    return {
      store,
      router,
      payloadComments,
      commentsOfComments,
      comments,
      isLoading,
      color,
      size,
      addComment,
      like,
      commentLike,
      showComments,
      openText,
    }

    async function preparation() {
      const first = props.commentsCount - props.show.skip - (props.show.page - 1) * 5;

      try {
        const response = await store.dispatch('getComments', {
          postId: props.postId,
          page: props.show.page,
          skip: props.show.skip,
          take: first > 5 ? 5 : first,
        });
        countOfComments.value = response.data.count;

        if (!response.data.comments) {
          return;
        }

        response.data.comments.forEach(comment => {
          payloadComments.push(reactive({
            content: '',
          }))
          isLoading.value.push(false);

          let likeAuth = false;
          comment.likes.forEach((like) => {
            if (like.user.id === store.state.user.id) {
              likeAuth = true;
            }
          })

          comment.commentFormat = getMessageDateService(comment);
          comment.likeAuth = likeAuth;

          let show = false;
          if (comment.commentsCount > 0) {
            show = true;
          }

          commentsOfComments.push(reactive({
            skip: 0,
            openText: false,
            showComments: show,
            page: 1,
            commentId: comment.id,
          }))
        })

        comments.push(...response.data.comments);
      } catch (error) {
        console.log(error);
      }
    }

    async function getLastComment() {
      try {
        const response = await store.dispatch('getLastComment', {
          postId: props.postId,
        });

        isLoading.value.unshift(false);
        payloadComments.unshift(reactive({
          content: '',
        }));

        response.data.commentFormat = getMessageDateService(response.data);
        response.data.likeAuth = false;
        response.data.commentsCount = 0;

        commentsOfComments.unshift(reactive({
          skip: 0,
          openText: false,
          showComments: false,
          page: 1,
          commentId: response.data.id,
        }))

        comments.unshift(response.data);
      } catch (error) {
        console.log(error);
      }
    }


    async function addComment(index) {
      isLoading.value[index] = true;

      try {
        const response = await store.dispatch('commentOnComment', {
          commentId: comments[index].id,
          content: payloadComments[index],
        });
        payloadComments[index].content = '';

        response.data.commentFormat = getMessageDateService(response.data);
        response.data.likeAuth = false;
        response.data.comments = [];
        response.data.likes = [];

        comments[index].comments.push(response.data);
        commentsOfComments[index].skip++;

        isLoading.value[index] = false;
      } catch (error) {
        if (error.response.status === 404) {
          await router.push({name: "NotFound"});
        }

        isLoading.value[index] = false;
      }
    }

    async function like(index) {
      try {
        if (!comments[index].likeAuth) {
          const response = await store.dispatch('commentLike', {
            commentId: comments[index].id,
          });


          if (response.status === 200) {
            return;
          }

          comments[index].likeAuth = true;
          comments[index].likes.push(response.data);
        } else {
          await store.dispatch('commentUnlike', {
            commentId: comments[index].id,
          });

          comments[index].likeAuth = false;
          comments[index].likes = comments[index].likes.filter(like => like.user.id !== store.state.user.id)
        }
      } catch
          (error) {
        if (error.response.status === 404) {
          await $router.push({name: "NotFound"});
        }
      }
    }

    async function commentLike(index, commentIndex) {
      try {
        if (!comments[index].comments[commentIndex].likeAuth) {
          const response = await store.dispatch('commentLike', {
            commentId: comments[index].comments[commentIndex].id,
          });

          comments[index].comments[commentIndex].likeAuth = true;
          comments[index].comments[commentIndex].likes.push(response.data);
        } else {
          await store.dispatch('commentUnlike', {
            commentId: comments[index].comments[commentIndex].id,
          });

          comments[index].comments[commentIndex].likeAuth = false;
          comments[index].comments[commentIndex].likes = comments[index].comments[commentIndex].likes.filter(like => like.user.id !== store.state.user.id)
        }
      } catch
          (error) {
        if (error.response.status === 404) {
          await $router.push({name: "NotFound"});
        }
      }
    }

    async function showComments(index) {
      if (!commentsOfComments[index].page) {
        return;
      }

      try {
        const response = await store.dispatch('getCommentsOnComment', {
          commentId: comments[index].id,
          page: commentsOfComments[index].page,
          skip: commentsOfComments[index].skip,
        });
        commentsOfComments[index].page = response.data.nextPage;
        comments[index].comments.push(...response.data.comments);

        if (!commentsOfComments[index].page) {
          commentsOfComments[index].showComments = false;
        }

        response.data.comments.forEach(comment => {
          let likeAuth = false;

          comment.likes.forEach((like) => {
            if (like.user.id === store.state.user.id) {
              likeAuth = true;
            }
          })

          comment.commentFormat = getMessageDateService(comment);
          comment.likeAuth = likeAuth;
          comment.commentsCount = comment.comments.length;
        });
      } catch (error) {
        console.log(error)
      }
    }

    async function openText(index) {
      commentsOfComments[index].openText = true;
    }
  }
}
</script>

<style scoped>

.max-w-comment {
  max-width: 90%;
}
</style>
<template>
  <div class="tag-profile bg-gray-rgb">
    <div class="container m-auto flex flex-col justify-center items-center">
      <div
        v-if="user.id === $store.state.user.id"
        class="w-body-post"
      >
        <div class="box border-t border-primary">
          <transition name="top-slide-fade">
            <div
              v-if="v$.content.$error"
              class="flex justify-center italic text-red-500 py-2 mb-3"
            >
              {{ v$.content.$errors[0].$message }}
            </div>
            <div
              v-else-if="errors.content"
              class="flex justify-center italic text-red-500 py-2 mb-3"
            >
              {{ errors.content }}
            </div>
          </transition>
          <div class="flex items-center">
            <img
              v-if="user.profilePicturePath"
              :src="user.profilePicturePath"
              :alt="user.firstName"
              class="hover:opacity-90 h-9 w-9 rounded-full mr-2"
            >
            <img
              v-else
              src="../../assets/images/user.png"
              alt="user icon"
              class="hover:opacity-90 bg-gray-rgb h-9 w-9 rounded-full mr-2"
            >
            <div class="flex-1 flex justify-between items-center rounded-3xl">
              <textarea
                class="think-about flex-1 hover:bg-gray-300 bg-gray-rgb text-gray-700 rounded-3xl resize-none py-2 px-4"
                placeholder="What do you think?"
                v-model="payload.content"
                @keydown="resetErrors('content')"
              />
              <transition name="right-slide-fade">
                <button
                  v-if="payload.content"
                  class="button-post ml-2 border rounded-3xl border-primary bg-primary text-white py-2 px-4"
                  @click="addPost"
                  :disabled="isLoading"
                >
                  <template v-if="!isLoading">
                    Send
                  </template>
                  <sync-loader
                    v-else
                    :loading="isLoading"
                    color="#fff"
                    :size="size"
                    class="ml-2"
                  />
                </button>
              </transition>
            </div>
          </div>
        </div>
      </div>
      <div class="box w-body-post flex justify-center text-xl font-bold border-t border-primary">
        Posts
      </div>
      <sync-loader
        :loading="isLoadingOfPosts"
        :color="color"
        :size="size"
      />
      <div
        v-for="(post, index) in posts"
        :key="index"
        class="box w-body-post border-t border-primary divide-y divide-gray-300"
      >
        <div class="flex items-center mb-2">
          <router-link :to="{ name: 'Profile', params: { username: user.username } }">
            <img
              v-if="user.profilePictureUrl"
              :src="user.profilePictureUrl"
              :alt="user.firstName"
              class="hover:opacity-90 h-9 w-9 rounded-full mr-2"
            >
            <img
              v-else
              src="../../assets/images/user.png"
              alt="user icon"
              class="hover:opacity-90 bg-gray-rgb h-9 w-9 rounded-full mr-2"
            >
          </router-link>
          <div class="flex-1">
            <div class="text-lg font-bold">
              <router-link
                :to="{ name: 'Profile', params: { username: user.username } }"
                class="hover:underline"
              >
                {{ user.firstName }} {{ user.lastName }}
              </router-link>
              >
              <router-link
                :to="{ name: 'Profile', params: { username: user.username } }"
                class="hover:underline"
              >
                {{ user.firstName }} {{ user.lastName }}
              </router-link>
            </div>
            <div class="text-sm">
              {{ post.postFormat }}
            </div>
          </div>
        </div>
        <div class="py-2 break-words">
          {{ post.content }}

          <div
            class="flex mt-2"
            :class="post.likesCount === 0 ? 'justify-end' : 'justify-between'"
          >
            <div
              v-if="post.likesCount > 0"
              class="flex items-center"
            >
              <div class="bg-primary rounded-full w-5 h-5 flex items-center justify-center mr-1">
                <fa-icon
                  icon="thumbs-up"
                  class="text-white p-0.5"
                />
              </div>
              <p v-if="post.likeAuth && post.likesCount - 1 > 1">
                {{ post.likesCount - 1 }} likes and you
              </p>
              <p v-if="post.likeAuth && post.likesCount - 1 === 1">
                {{ post.likesCount - 1 }} like and you
              </p>
              <p v-if="post.likeAuth && post.likesCount === 1">
                you
              </p>
              <p v-if="!post.likeAuth && post.likesCount > 1">
                {{ post.likesCount }} likes
              </p>
              <p v-if="!post.likeAuth && post.likesCount === 1">
                {{ post.likesCount }} like
              </p>
            </div>

            <button
              v-if="post.commentsCount > 0"
              class="flex items-center text-right hover:underline"
              @click="openOrCloseComments(index)"
            >
              <div class="bg-primary rounded-full w-5 h-5 flex items-center justify-center mr-1">
                <fa-icon
                  icon="comments"
                  class="text-white p-0.5"
                />
              </div>
              {{ post.commentsCount }} comments
            </button>
          </div>
        </div>
        <div class="py-2 flex">
          <button
            @click="like(index)"
            class="rounded-md hover:bg-gray-rgb w-1/2 py-1 mr-1"
            :class="post.likeAuth ? 'text-primary' : ''"
          >
            <fa-icon
              icon="thumbs-up"
              class="mr-1"
            />
            like
          </button>
          <label
            for="comment"
            class="rounded-md text-center hover:bg-gray-rgb w-1/2 py-1 ml-1"
          >
            <fa-icon
              :icon="['far', 'comment']"
              class="mr-1"
            />
            comment
          </label>
        </div>
        <div class="pt-2">
          <div
            v-if="commentsOfPosts[index].opened"
          >
            <div
              v-for="(comment, index) in post.comments"
              :key="index"
              class="flex items-center justify-between py-1"
            >
              <div class="max-w-comment flex items-center">
                <router-link :to="{ name: 'Profile', params: { username: store.state.user.username } }">
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
                      :to="{ name: 'Profile', params: { username: user.username } }"
                      class="font-bold hover:underline"
                    >
                      {{ comment.user.firstName }} {{ comment.user.lastName }}
                    </router-link>
                    <span>
                      {{ comment.content }}
                    </span>
                  </div>
                  <div class="text-xs">
                    <button class="hover:underline">
                      like
                    </button>
                    <button class="hover:underline mx-3">
                      comment
                    </button>
                    {{ comment.commentFormat }}
                  </div>
                </div>
              </div>
              <div class="">
                ...
              </div>
            </div>
          </div>
          <button
            v-if="commentsOfPosts[index].showComments"
            @click="moreComments(index)"
            class="text-lg mb-2 hover:underline"
          >
            show more comments
          </button>
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
              id="comment"
              @keyup.enter="addComment(index)"
              class="flex-1 rounded-3xl bg-gray-rgb px-4 py-2"
              placeholder="Type Your Comment"
              v-model="payloadComments[index].content"
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import {reactive, ref} from "vue";
import {useStore} from "vuex";
import useVuelidate from '@vuelidate/core';
import {required, minLength, maxLength, helpers} from '@vuelidate/validators';
import SyncLoader from 'vue-spinner/src/SyncLoader.vue';
import getMessageDateService from "../../helpers/getMessageDate";

export default {
  name: "Posts",
  components: {
    SyncLoader,
  },
  props: {
    user: {
      type: Object,
      required: true
    },
  },
  setup(props) {
    const store = useStore();

    const isLoadingOfPosts = ref(false);
    const isLoading = ref(false);
    const color = ref('rgb(24, 119, 241)');
    const size = ref('10px');

    const errors = reactive({
      content: '',
    });

    const payload = reactive({
      content: '',
    });

    const rules = {
      content: {
        required: helpers.withMessage('Your content is required', required),
        minLength: helpers.withMessage(({$params}) => `Minimum ${$params.min} characters required.`, minLength(1)),
        maxLength: helpers.withMessage(({$params}) => `Maximum ${$params.max} characters required.`, maxLength(255)),
      },
    };

    const v$ = useVuelidate(rules, payload);

    const payloadComments = reactive([]);
    const commentsOfPosts = reactive([]);

    let posts = ref([]);

    getPosts();

    return {
      store,
      payload,
      payloadComments,
      commentsOfPosts,
      props,
      errors,
      v$,
      posts,
      isLoadingOfPosts,
      isLoading,
      color,
      size,
      addPost,
      like,
      moreComments,
      openOrCloseComments,
      addComment,
      resetErrors,
    };

    async function getPosts() {
      isLoadingOfPosts.value = true;

      try {
        const response = await store.dispatch('getPosts', {userId: props.user.id});
        if (response.data.length === 0) {
          isLoadingOfPosts.value = false;
          return;
        }

        for (let i = 0; i < response.data.length; i++) {
          const post = response.data[i];

          let likeAuth = false;

          post.likes.forEach((like) => {
            if (like.user.id === store.state.user.id) {
              likeAuth = true;
            }
          });

          post.likeAuth = likeAuth;
          post.likesCount = post.likes.length;
          post.commentsCount = post.comments.length;

          commentsOfPosts[i] = reactive({
            comments: [...post.comments],
            showComments: false,
            opened: true,
          })

          if (post.comments.length > 5) {
            commentsOfPosts[i].showComments = true;
            commentsOfPosts[i].opened = false;

            post.comments = [];
          } else {
            post.comments.forEach(comment => {
              comment.commentFormat = getMessageDateService(comment);
            })
          }

          payloadComments[i] = reactive({
            content: '',
          })

          post.postFormat = getMessageDateService(post);
        }

        posts.value = response.data;

        isLoadingOfPosts.value = false;
      } catch (error) {
        isLoadingOfPosts.value = false;
      }
    }

    async function addPost() {
      if (props.user.username !== store.state.user.username) {
        errors.content = "You don't have permission";
        return;
      }

      v$.value.$touch();
      if (v$.value.$invalid) {
        return;
      }

      resetErrors('content');
      isLoading.value = true;
      try {
        const response = await store.dispatch('post', payload);

        response.data.likeAuth = false;
        response.data.likesCount = 0;
        response.data.commentsCount = 0;
        response.data.comments = [];
        response.data.likes = [];
        response.data.postFormat = getMessageDateService(response.data);

        posts.value.unshift(response.data);

        commentsOfPosts.unshift(reactive({
          comments: [],
          showComments: false,
          opened: true,
        }));

        payloadComments.unshift(reactive({
          content: '',
        }));

        payload.content = '';

        isLoading.value = false;
      } catch (error) {
        if (error.response.status === 422) {
          errors.content = error.response.data[0].message;
        }

        isLoading.value = false;
      }
    }

    async function like(index) {
      try {
        if (!posts.value[index].likeAuth) {
          await store.dispatch('like', {
            postId: posts.value[index].id,
          });

          posts.value[index].likeAuth = true;
          posts.value[index].likesCount++;
        } else {
          await store.dispatch('unlike', {
            postId: posts.value[index].id,
          });

          posts.value[index].likeAuth = false;
          posts.value[index].likesCount--;
        }
      } catch (error) {
        if (error.response.status === 404) {
          await $router.push({name: "NotFound"});
        }
      }
    }

    async function moreComments(index) {
      commentsOfPosts[index].opened = true;

      const lengthStart = posts.value[index].comments.length;
      let lengthEnd = lengthStart + 5;
      const lengthComments = commentsOfPosts[index].comments.length;

      if (lengthComments <= lengthEnd) {
        lengthEnd = lengthComments;
        commentsOfPosts[index].showComments = false;
      }

      for (let i = lengthComments - lengthEnd; i < lengthComments - lengthStart; i++) {
        commentsOfPosts[index].comments[i].commentFormat = getMessageDateService(commentsOfPosts[index].comments[i]);
      }

      posts.value[index].comments.unshift(...commentsOfPosts[index].comments.slice(lengthComments - lengthEnd, lengthComments - lengthStart));
    }

    async function openOrCloseComments(index) {
      if (commentsOfPosts[index].opened === true) {
        commentsOfPosts[index].opened = false;
        commentsOfPosts[index].showComments = true;
        posts.value[index].comments = [];
        return;
      }

      await moreComments(index);
    }

    async function addComment(index) {
      commentsOfPosts[index].opened = true;

      try {
        const response = await store.dispatch('comment', {
          postId: posts.value[index].id,
          content: payloadComments[index],
        });
        payloadComments[index].content = '';

        response.data.commentFormat = getMessageDateService(response.data);
        commentsOfPosts[index].comments.push(response.data);
        posts.value[index].comments.push(response.data);
        posts.value[index].commentsCount++;
      } catch (error) {
        console.log(`error: ${error}`)
        if (error.response.status === 422) {
          errors.comment = error.response.data[0].message;
        }
      }
    }

    function resetErrors(key) {
      v$.value[key].$reset();
      delete errors[key];
    }

  }
}

</script>

<style src="../../assets/css/app.scss"/>

<style lang="scss" scoped>
.w-body-post {
  width: var(--post-width);
}

@media (max-width: var(--post-width)) {
  .w-body-post, .think-about {
    width: 100%;
  }
  .w-body-post {
    width: 94%;
  }
}

.right-slide-fade-enter-from,
.right-slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

.right-slide-fade-enter-active,
.right-slide-fade-leave-active {
  transition: all 0.8s ease;
}

.top-slide-fade-enter-from,
.top-slide-fade-leave-to {
  transform: translateY(-30px);
  opacity: 0;
}

.top-slide-fade-enter-active,
.top-slide-fade-leave-active {
  transition: all 0.2s ease;
}

.button-post {
  width: 90px;
}

.tag-profile {
  height: 100%;
  min-height: calc(100vh - var(--profile-header-height));
}

.max-w-comment {
  max-width: 90%;
}

</style>

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
            class="flex justify-between mt-2"
            :class="post.commentsCount > 0 ? 'flex-row-reverse': ''"
          >
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
              {{ post.commentsCount }} comment{{ post.commentsCount > 1 ? 's' : '' }}
            </button>
            <div
              class="flex items-center"
            >
              <div
                v-if="post.likes.length > 0"
                class="bg-primary rounded-full w-5 h-5 flex items-center justify-center mr-1"
              >
                <fa-icon
                  icon="thumbs-up"
                  class="text-white p-0.5"
                />
              </div>
              {{ post.likeMessage }}
            </div>
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
            :for="post.id"
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
          <div v-if="comments[index].opened">
            <Comments
              :show="{show: comments[index].show, skip: comments[index].skip, page: comments[index].page}"
              :comments-count="post.commentsCount"
              :post-id="post.id"
            />
          </div>
          <button
            v-if="comments[index].show"
            @click="moreComments(index)"
            class="text-lg mb-2 hover:underline"
          >
            <fa-icon
              icon="caret-down"
              class="mr-1"
            />
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
              :id="post.id"
              @keyup.enter="addComment(index)"
              class="flex-1 rounded-3xl bg-gray-rgb px-4 py-2"
              placeholder="Type Your Comment"
              v-model="payloadComments[index].content"
            >
          </div>
        </div>
      </div>
      <InfiniteLoading
        :posts="posts"
        @infinite="load"
      />
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
import Comments from "./Comments.vue";
import InfiniteLoading from "v3-infinite-loading";
import "v3-infinite-loading/lib/style.css";

export default {
  name: "Posts",
  components: {
    SyncLoader,
    Comments,
    InfiniteLoading,
  },
  props: {
    user: {
      type: Object,
      required: true
    },
  },
  setup(props) {
    const store = useStore();

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
    const comments = reactive([]);

    let posts = ref([]);
    let page = ref(1);
    let skip = ref(0);

    return {
      store,
      payload,
      payloadComments,
      comments,
      props,
      errors,
      v$,
      posts,
      isLoading,
      color,
      size,
      load,
      addPost,
      like,
      moreComments,
      openOrCloseComments,
      addComment,
      resetErrors,
    };

    async function load($state) {
      try {
        const response = await store.dispatch('getPosts', {
          userId: props.user.id, page: page.value, skip: skip.value
        });

        if (response.data.length < 10) {
          $state.complete();
        } else {
          for (let i = 0; i < response.data.length; i++) {
            const post = response.data[i];
            let likeAuth = false;
            let likeMessage = '';

            post.likes.forEach((like) => {
              if (like.user.id === store.state.user.id) {
                likeAuth = true;
                if (post.likes.length - 1 > 1) {
                  likeMessage = `${post.likes.length - 1} likes and `;
                } else if (post.likes.length - 1 === 1) {
                  likeMessage = `${post.likes.length - 1} like and `;
                }
                likeMessage += 'you';
              }
            });

            if (!likeAuth) {
              if (post.likes.length > 1) {
                likeMessage = `${post.likes.length} likes`
              } else if (post.likes.length === 1) {
                likeMessage = `${post.likes.length} like`
              }
            }

            post.likeAuth = likeAuth;
            post.likeMessage = likeMessage;
            post.postFormat = getMessageDateService(post);

            if (post.commentsCount > 5) {
              comments.push(reactive({
                skip: 0,
                show: true,
                opened: false,
                page: 0,
              }));
            } else {
              comments.push(reactive({
                skip: 0,
                show: false,
                opened: true,
                page: 1,
              }));
            }

            payloadComments.push(reactive({
              content: '',
            }));
          }
          posts.value.push(...response.data);

          $state.loaded();
        }
        page.value++;
      } catch (error) {
        console.log(error)
        $state.error();
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
        response.data.likeMessage = '';
        response.data.commentsCount = 0;
        response.data.postFormat = getMessageDateService(response.data);

        posts.value.push(response.data);
        comments.push(reactive({
          skip: 0,
          show: false,
          opened: true,
          page: 1,
        }));

        payloadComments.push(reactive({
          content: '',
        }));

        payload.content = '';

        skip.value++;

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
          const response = await store.dispatch('like', {
            postId: posts.value[index].id,
          });

          if (response.status === 200) {
            return;
          }
          if (posts.value[index].likes.length > 1) {
            posts.value[index].likeMessage += ' and ';
          }
          posts.value[index].likeMessage += 'you';
          posts.value[index].likeAuth = true;
          posts.value[index].likes.push(response.data);

        } else {
          await store.dispatch('unlike', {
            postId: posts.value[index].id,
          });

          if (posts.value[index].likes.length > 1) {
            posts.value[index].likeMessage = posts.value[index].likeMessage.replace(' and ', '');
          }
          posts.value[index].likeMessage = posts.value[index].likeMessage.replace('you', '');
          posts.value[index].likeAuth = false;
          posts.value[index].likes = posts.value[index].likes.filter(like => like.user.id !== store.state.user.id)
        }
      } catch (error) {
        if (error.response.status === 404) {
          await $router.push({name: "NotFound"});
        }
      }
    }

    async function moreComments(index) {
      comments[index].opened = true;

      comments[index].page++;

      if (posts.value[index].commentsCount <= comments[index].page * 5 + comments[index].skip) {
        comments[index].show = false;
      }
    }

    async function openOrCloseComments(index) {
      if (comments[index].opened) {
        comments[index].opened = false;
        comments[index].show = true;
        comments[index].skip = 0;
        comments[index].page = 0;

        return;
      }

      comments[index].opened = true;
      await moreComments(index);
    }

    async function addComment(index) {
      try {
        const response = await store.dispatch('comment', {
          postId: posts.value[index].id,
          content: payloadComments[index],
        });

        payloadComments[index].content = '';

        response.data.likeAuth = false;
        response.data.commentsCount = 0;
        response.data.commentFormat = getMessageDateService(response.data);

        if (comments[index].opened) {
          comments[index].skip++;
        } else {
          comments[index].opened = true;
          comments[index].page = 1;
        }

        posts.value[index].commentsCount++;

      } catch (error) {
        if (error.response.status === 422) {
          errors.comment = error.response.data[0].message;
        }
        if (error.response.status === 404) {
          await $router.push({name: "NotFound"});
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

</style>

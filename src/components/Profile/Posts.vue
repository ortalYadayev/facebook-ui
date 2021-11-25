<template>
  <div class="tag-profile bg-gray-rgb">
    <div class="container m-auto flex flex-col justify-center items-center">
      <div
        v-if="user.isAuth"
        class="w-body-post"
      >
        <div class="box">
          <transition name="top-slide-fade">
            <div
              v-if="v$.content.$error"
              class="flex justify-center italic text-red-500 py-2 mb-3"
            >
              {{ v$.content.$errors[0].$message }}
            </div>
            <div
              v-else-if="errors.message"
              class="flex justify-center italic text-red-500 py-2 mb-3"
            >
              {{ errors.message }}
            </div>
          </transition>
          <div class="flex items-center">
            <img
              v-if="user.profilePicturePath"
              :src="user.profilePicturePath"
              :alt="user.firstName"
              class="h-9 w-9 rounded-full mr-2"
            >
            <img
              v-else
              src="../../assets/images/user.png"
              alt="user icon"
              class="h-9 w-9 rounded-full mr-2"
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
      <div class="box w-body-post flex justify-center text-xl font-bold">
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
        class="box w-body-post"
      >
        <div class="flex items-center mb-2">
          <img
            v-if="user.profilePictureUrl"
            :src="user.profilePictureUrl"
            :alt="user.firstName"
            class="h-9 w-9 rounded-full mr-2"
          >
          <img
            v-else
            src="../../assets/images/user.png"
            alt="user icon"
            class="bg-gray-rgb h-9 w-9 rounded-full mr-2"
          >
          <div class="flex-1">
            <div class="text-lg font-bold">
              {{ user.firstName }} {{ user.lastName }} > {{ user.firstName }} {{ user.lastName }}
            </div>
            <div class="text-sm">
              {{ post.createdAt }}
            </div>
          </div>
        </div>
        {{ post.content }}
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
      message: '',
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

    let posts = ref([]);

    getPosts();

    return {
      store,
      payload,
      props,
      errors,
      v$,
      posts,
      isLoadingOfPosts,
      isLoading,
      color,
      size,
      addPost,
      resetErrors,
    };

    async function getPosts() {
      isLoadingOfPosts.value = true;
      try {
        const response = await store.dispatch('getPosts', props.user.id);

        if (response.data.length === 0) {
          return;
        }

        posts.value = response.data;

        isLoadingOfPosts.value = false;
      } catch (error) {
        if (error.response.status === 422) {
          errors.message = error.response.data[0].message;
        }

        isLoadingOfPosts.value = false;
      }
    }

    async function addPost() {
      if (props.user.username !== store.state.user.username) {
        errors.message = "You don't have permission";
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
        posts.value.unshift(response.data);

        payload.content = '';
        isLoading.value = false;
      } catch (error) {
        if (error.response.status === 422) {
          errors.message = error.response.data[0].message;
        }

        isLoading.value = false;
      }
    }

    function resetErrors(key) {
      v$.value[key].$reset();
      delete errors.message;
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

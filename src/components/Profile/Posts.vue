<template>
  <div class="tag-profile bg-gray_rgb">
    <div class="container m-auto flex justify-center items-center">
      <div class="body-posts">
        <div class="error-transition post">
          <transition name="slide-fade">
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
              src="../../assets/images/user-icon.png"
              alt="user icon"
              class="h-9 w-9 rounded-full mr-2"
            >
            <div class="send-transition flex-1 flex justify-between rounded-2xl">
              <input
                type="text"
                class="think-about flex-1 hover:bg-gray-300 bg-gray_rgb text-gray-700 rounded-2xl py-2 px-4"
                placeholder="What do you think ?"
                v-model="payload.content"
                @keydown="resetErrors('content')"
              >
              <transition name="slide-fade">
                <button
                  v-if="payload.content.length > 0 && !isLoading"
                  class="ml-2"
                  @click="addPost"
                >
                  Send
                </button>
                <sync-loader
                  v-else
                  :loading="isLoading"
                  :color="color"
                  :size="size"
                  class="ml-2"
                />
              </transition>
            </div>
          </div>
        </div>
        <div
          class="post flex justify-center text-xl font-bold"
        >
          Posts
        </div>
        <div
          v-if="isSend"
          class="post"
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
              src="../../assets/images/user-icon.png"
              alt="user icon"
              class="h-9 w-9 rounded-full mr-2"
            >
            <div class="flex-1">
              <div class="text-lg font-bold">
                {{ posts.createdBy.fullName }} > {{ posts.user.fullName }}
              </div>
              <div class="text-sm">
                {{ posts.createdAt }}
              </div>
            </div>
          </div>
          {{ posts.content }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { reactive, ref } from "vue";
import { useStore } from "vuex";
import useVuelidate from '@vuelidate/core';
import { required, minLength, maxLength, helpers } from '@vuelidate/validators';
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

    const isLoading = ref(false);
    const color = ref('rgb(24, 119, 241)');
    const size = ref('10px');

    const errors = reactive({
      message: '',
    });

    const isSend = ref(false);

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

    let posts = ref({
      createdAt: '',
      updatedAt: '',
      content: '',
      createdBy: {
        firstName: '',
        lastName: '',
        username: '',
        fullName: '',
        profilePicturePath: '',
      },
      user: {
        firstName: '',
        lastName: '',
        username: '',
        fullName: '',
        profilePicturePath: '',
      }
    });

    return {
      store,
      payload,
      props,
      errors,
      v$,
      posts,
      isLoading,
      color,
      size,
      isSend,
      addPost,
      resetErrors,
    };

    async function addPost(){
      const content = reactive({
        username: props.user.username,
        content: payload.content,
      });

      v$.value.$touch();

      if (v$.value.$invalid) {
        return;
      }

      payload.content = '';
      resetErrors('content');

      isLoading.value = true;
      try {
        const response = await store.dispatch('storePost', content);
        posts.value = response.data;
        posts.value.createdBy.fullName = posts.value.createdBy.firstName + ' ' + posts.value.createdBy.lastName;
        posts.value.user.fullName = posts.value.user.firstName + ' ' + posts.value.user.lastName;

        isSend.value = true;
      } catch (error) {
        if (error.response.status === 422) {
          errors.message = error.response.data[0].message;
         }
      }
      isLoading.value = false;
    }

    function resetErrors(key) {
      v$.value[key].$reset();
      delete errors.message;
    }

  }
}

</script>

<style lang="scss" scoped>
@import '../../assets/css/app.scss';

.body-posts {
  width: $post-width;
}

@media (max-width: $post-width) {
  .body-posts, .think-about {
    width: 100%;
  }
  .body-posts {
    width: 94%;
  }
}

.send-transition > {
  .slide-fade-enter-from,
  .slide-fade-leave-to {
    transform: translateX(20px);
    opacity: 0;
  }

  .slide-fade-enter-active,
  .slide-fade-leave-active {
    transition: all 0.8s ease;
  }
}

.error-transition > {
  .slide-fade-enter-from,
  .slide-fade-leave-to {
    transform: translateY(-30px);
    opacity: 0;
  }

  .slide-fade-enter-active,
  .slide-fade-leave-active {
    transition: all 0.2s ease;
  }
}

.post {
  @apply rounded-lg shadow-md bg-white my-4 py-3 px-5;
}
</style>

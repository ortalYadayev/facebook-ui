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
                v-model="payload.content"
                @keydown="resetErrors('content')"
              >
              <transition name="slide-fade">
                <button
                  v-if="payload.content.length > 0"
                  class="ml-2"
                  @click="addPost"
                >
                  Send
                </button>
              </transition>
            </div>
          </div>
          <span
            v-if="v$.content.$error"
            class="italic text-xs text-red-500"
          >{{ v$.content.$errors[0].$message }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { reactive } from "vue";
import { useStore } from "vuex";
import useVuelidate from '@vuelidate/core';
import { required, email, minLength, maxLength, helpers } from '@vuelidate/validators';

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
      username: props.user.username,
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

    return {
      payload,
      props,
      v$,
      addPost,
      resetErrors,
    };

    async function addPost(){
      v$.value.$touch();

      if (v$.value.$invalid) {
        return;
      }

      payload.username = props.user.username;
      try {

        await store.dispatch('storePost', payload);
      } catch (error) {
        if (error.response.status === 422) {
          console.log(error);
          errors.value.message = error.response.data.message;
         }
      }
    }

    function resetErrors(key) {
      v$.value[key].$reset();
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

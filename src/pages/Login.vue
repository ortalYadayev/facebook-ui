<template>
  <div class="bg-lightblue min-h-screen flex flex-col justify-center items-center">
    <img
      class="mt-6 mb-12 md:mb-16 h-10"
      src="../assets/logo.png"
      alt="online forms"
    >
    <form
      @submit.prevent="login"
      method="post"
      class="login-form flex bg-white flex-col justify-center rounded-md px-6 sm:px-12 py-10 mb-4"
    >
      <transition name="slide-fade">
        <div
          v-if="errors.message"
          class="flex justify-center text-center italic text-sm text-red-500 border-2 border-red-500 rounded p-3 mb-4"
        >
          {{ errors.message }}
        </div>
      </transition>
      <div class="flex flex-col mb-4">
        <label
          for="email"
          class="mb-1 text-primary text-xs sm:text-sm tracking-wide uppercase"
        >email</label>
        <input
          v-model="payload.email"
          @keydown="resetErrors('email', 'message')"
          id="email"
          name="email"
          placeholder="Email"
          type="text"
          class="duration-150 border-2 border-gray-300 text-gray-300 hover:text-black focus:text-black rounded-md px-3 py-1.5 mb-2"
          :class="errors.email || v$.email.$error ? 'border-red-500 focus:border-red-500' : 'hover:border-primary focus:border-primary focus:border-opacity-50'"
        >
        <span
          v-if="v$.email.$error"
          class="italic text-xs text-red-500"
        >{{ v$.email.$errors[0].$message }}</span>
      </div>
      <div class="flex flex-col mb-6">
        <label
          for="password"
          class="mb-1 text-primary text-xs sm:text-sm tracking-wide uppercase"
        >password</label>
        <input
          v-model="payload.password"
          @keydown="resetErrors('password', 'message')"
          id="password"
          name="password"
          placeholder="Password"
          type="password"
          class="duration-150 border-2 border-gray-300 text-gray-300 hover:text-black focus:text-black rounded-md px-3 py-1.5 mb-2"
          :class="errors.password || v$.password.$error ? 'border-red-500 focus:border-red-500' : 'hover:border-primary focus:border-primary focus:border-opacity-50'"
        >
        <span
          v-if="v$.password.$error"
          class="italic text-xs text-red-500"
        >{{ v$.password.$errors[0].$message }}</span>
      </div>
      <div>
        <button
          class="w-full border-primary bg-primary text-lg text-gray_rgb uppercase rounded-lg py-1 sm:py-2"
        >
          Login
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { reactive, ref } from 'vue';
import { useStore } from 'vuex';
import useVuelidate from '@vuelidate/core'
import { required, email, minLength, maxLength, helpers } from '@vuelidate/validators'
import store from "../store";

export default {
  setup() {
    const store = useStore();

    const payload = reactive({
      email: '',
      password: '',
    });

    const errors = ref({});

    const rules = {
      email: {
        required: helpers.withMessage('An email is required', required),
        email: helpers.withMessage('Wrong or invalid email address, try again', email),
      },
      password: {
        required: helpers.withMessage('Password is required', required),
        minLength: helpers.withMessage(({ $params }) => `Minimum ${$params.min} characters required.`, minLength(8)),
        maxLength: helpers.withMessage(({ $params }) => `Minimum ${$params.max} characters required.`, maxLength(255)),
      },
    };

    const v$ = useVuelidate(rules, payload);

    return {
      payload,
      errors,
      v$,
      login,
      resetErrors
    }

    async function login() {
      v$.value.$touch();

      if (v$.value.$invalid) {
        return;
      }

      try {
        await store.dispatch('login', payload)

         //  @TODO redirect to home page

      } catch (error) {
        if (error.response.status === 422) {
          errors.value.message = error.response.data.message;
        }
      }
    }

    function resetErrors(key, message) {
      v$.value[key].$reset();
      delete errors.value[key];
      delete errors.value[message];
    }
  }
}

</script>

<style lang="sass" scoped>
.slide-fade-enter-active,
.slide-fade-leave-active
  transition: all 0.3s ease-out

.slide-fade-enter-from,
.slide-fade-leave-to4
  transform: translateY(-100%)
  opacity: 0

</style>
<template>
  <div class="pb-6 md:pb-8 bg-lightblue min-h-screen flex flex-col justify-center items-center">
    <img
      class="my-6 md:my-8 h-24"
      src="../assets/images/logo.svg"
      alt="facebook logo"
    >
    <form
      @submit.prevent="register"
      method="post"
      class="register-form bg-white flex flex-col justify-center rounded-md px-6 sm:px-12 py-10 mb-4"
    >
      <div class="flex flex-col mb-4">
        <label
          for="firstName"
          class="mb-1 text-primary text-xs sm:text-sm tracking-wide uppercase"
        >first name</label>
        <input
          v-model="payload.firstName"
          @keydown="resetErrors('firstName')"
          id="firstName"
          name="firstName"
          placeholder="First name"
          type="text"
          class="duration-150 border-2 border-gray-300 text-gray-300 hover:text-black focus:text-black rounded-md px-3 py-1.5 mb-2"
          :class="errors.firstName || v$.firstName.$error ? 'border-red-500 focus:border-red-500' : 'hover:border-primary focus:border-primary focus:border-opacity-50'"
        >
        <span
          v-if="errors.firstName"
          class="italic text-xs text-red-500"
        >{{ errors.firstName }}</span>
        <span
          v-else-if="v$.firstName.$error"
          class="italic text-xs text-red-500"
        >{{ v$.firstName.$errors[0].$message }}</span>
      </div>
      <div class="flex flex-col mb-4">
        <label
          for="lastName"
          class="mb-1 text-primary text-xs sm:text-sm tracking-wide uppercase"
        >last name</label>
        <input
          v-model="payload.lastName"
          @keydown="resetErrors('lastName')"
          id="lastName"
          name="lastName"
          placeholder="Last name"
          type="text"
          class="duration-150 border-2 border-gray-300 text-gray-300 hover:text-black focus:text-black rounded-md px-3 py-1.5 mb-2"
          :class="errors.lastName || v$.lastName.$error ? 'border-red-500 focus:border-red-500' : 'hover:border-primary focus:border-primary focus:border-opacity-50'"
        >
        <span
          v-if="errors.lastName"
          class="italic text-xs text-red-500"
        >{{ errors.lastName }}</span>
        <span
          v-else-if="v$.lastName.$error"
          class="italic text-xs text-red-500"
        >{{ v$.lastName.$errors[0].$message }}</span>
      </div>
      <div class="flex flex-col mb-4">
        <label
          for="email"
          class="mb-1 text-primary text-xs sm:text-sm tracking-wide uppercase"
        >email</label>
        <input
          v-model="payload.email"
          @keydown="resetErrors('email')"
          id="email"
          name="email"
          placeholder="Email"
          type="text"
          class="duration-150 border-2 border-gray-300 text-gray-300 hover:text-black focus:text-black rounded-md px-3 py-1.5 mb-2"
          :class="errors.email || v$.email.$error ? 'border-red-500 focus:border-red-500' : 'hover:border-primary focus:border-primary focus:border-opacity-50'"
        >
        <span
          v-if="errors.email"
          class="italic text-xs text-red-500"
        >{{ errors.email }}</span>
        <span
          v-else-if="v$.email.$error"
          class="italic text-xs text-red-500"
        >{{ v$.email.$errors[0].$message }}</span>
      </div>
      <div class="flex flex-col mb-4">
        <label
          for="username"
          class="mb-1 text-primary text-xs sm:text-sm tracking-wide uppercase"
        >
          username
          <span class="text-black normal-case break-all">({{ url }}/{{ payload.username === '' ? 'username' : payload.username }})</span>
        </label>
        <input
          v-model="payload.username"
          @keydown="resetErrors('username')"
          id="username"
          name="username"
          placeholder="Username"
          type="text"
          class="duration-150 border-2 border-gray-300 text-gray-300 hover:text-black focus:text-black rounded-md px-3 py-1.5 mb-2"
          :class="errors.username || v$.username.$error ? 'border-red-500 focus:border-red-500' : 'hover:border-primary focus:border-primary focus:border-opacity-50'"
          maxlength="20"
        >
        <span
          v-if="errors.username"
          class="italic text-xs text-red-500"
        >{{ errors.username }}</span>
        <span
          v-else-if="v$.username.$error"
          class="italic text-xs text-red-500"
        >{{ v$.username.$errors[0].$message }}</span>
      </div>
      <div class="flex flex-col mb-4">
        <label
          for="password"
          class="mb-1 text-primary text-xs sm:text-sm tracking-wide uppercase"
        >password</label>
        <input
          v-model="payload.password"
          @keydown="resetErrors('password')"
          id="password"
          name="password"
          placeholder="Password"
          type="password"
          class="duration-150 border-2 border-gray-300 text-gray-300 hover:text-black focus:text-black rounded-md px-3 py-1.5 :mb-2"
          :class="errors.password || v$.password.$error ? 'border-red-500 focus:border-red-500' : 'hover:border-primary focus:border-primary focus:border-opacity-50'"
        >
        <span
          v-if="errors.password"
          class="italic text-xs text-red-500"
        >{{ errors.password }}</span>
        <span
          v-else-if="v$.password.$error"
          class="italic text-xs text-red-500"
        >{{ v$.password.$errors[0].$message }}</span>
      </div>
      <div class="flex flex-col mb-6">
        <label
          for="confirm"
          class="mb-1 text-primary text-xs sm:text-sm tracking-wide uppercase"
        >confirm password</label>
        <input
          v-model="payload.confirm"
          @keydown="resetErrors('confirm')"
          id="confirm"
          name="confirm"
          placeholder="Confirm Password"
          type="password"
          class="duration-150 border-2 border-gray-300 text-gray-300 hover:text-black focus:text-black rounded-md px-3 py-1.5 mb-2"
          :class="errors.confirm || v$.confirm.$error ? 'border-red-500 focus:border-red-500' : 'hover:border-primary focus:border-primary focus:border-opacity-50'"
        >
        <span
          v-if="errors.confirm"
          class="italic text-xs text-red-500"
        >{{ errors.confirm }}</span>
        <span
          v-else-if="v$.confirm.$error"
          class="italic text-xs text-red-500"
        >{{ v$.confirm.$errors[0].$message }}</span>
      </div>
      <div class="flex justify-center text-center">
        <button
          class="w-full border-primary bg-primary text-lg text-gray-rgb uppercase rounded-lg py-1 sm:py-2"
        >
          <template v-if="!isLoading">
            Register
          </template>
          <sync-loader
            v-else
            :loading="isLoading"
            :color="color"
            :size="size"
          />
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { reactive, ref } from 'vue';
import { useStore } from 'vuex';
import useVuelidate from '@vuelidate/core';
import { required, email, minLength, maxLength, helpers } from '@vuelidate/validators';
import { useRouter } from 'vue-router';
import SyncLoader from 'vue-spinner/src/SyncLoader.vue';

export default {
  components: {
    SyncLoader,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const url = window.location.host;

    const isLoading = ref(false);
    const color = ref('#ffffff');
    const size = ref('10px');

    const payload = reactive({
      firstName: '',
      lastName: '',
      email: '',
      username: '',
      password: '',
      confirm: ''
    });

    const errors = ref({
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: '',
      confirm: '',
    });

    const rules = {
      firstName: {
        required: helpers.withMessage('Your first name is required', required),
        minLength: helpers.withMessage(({ $params }) => `Minimum ${$params.min} characters required.`, minLength(2)),
        maxLength: helpers.withMessage(({ $params }) => `Maximum ${$params.max} characters required.`, maxLength(50)),
      },
      lastName: {
        required: helpers.withMessage('Your last name is required', required),
        minLength: helpers.withMessage(({ $params }) => `Minimum ${$params.min} characters required.`, minLength(2)),
        maxLength: helpers.withMessage(({ $params }) => `Maximum ${$params.max} characters required.`, maxLength(50)),
      },
      email: {
        required: helpers.withMessage('An email is required', required),
        email: helpers.withMessage('Wrong or invalid email address, try again', email),
      },
      username: {
        required: helpers.withMessage('Your username is required', required),
        minLength: helpers.withMessage(({ $params }) => `Minimum ${$params.min} characters required.`, minLength(2)),
        maxLength: helpers.withMessage(({ $params }) => `Maximum ${$params.max} characters required.`, maxLength(20)),
      },
      password: {
        required: helpers.withMessage('Password is required', required),
        minLength: helpers.withMessage(({ $params }) => `Minimum ${$params.min} characters required.`, minLength(8)),
        maxLength: helpers.withMessage(({ $params }) => `Maximum ${$params.max} characters required.`, maxLength(255)),
      },
      confirm: {
        required: helpers.withMessage('Password is required', required),
        confirmPassword: helpers.withMessage("Type password again", (confirmPassword) => confirmPassword === payload.password),
      },
    };

    const v$ = useVuelidate(rules, payload);

    return {
      url,
      payload,
      errors,
      v$,
      isLoading,
      color,
      size,
      register,
      resetErrors,
    };

    async function register() {
      v$.value.$touch();

      if (v$.value.$invalid) {
        return;
      }

      isLoading.value = true;
      try {
        await store.dispatch('register', payload);
        await router.push({ name: "Login" });

        isLoading.value = false;
      } catch (error) {
        if (error.response.status === 422) {
          errors.value.email = error.response.data.type === 'email' ? error.response.data.message : '';
          errors.value.username = error.response.data.type === 'username' ? error.response.data.message : '';
        }

        isLoading.value = false;
      }
    }

    function resetErrors(key) {
      v$.value[key].$reset();
      delete errors.value[key];
    }
  }
}
</script>

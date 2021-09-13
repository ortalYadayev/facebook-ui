<template>
  <div class="bg-gray_rgb min-h-screen flex flex-col justify-center items-center">
    <img
      class="mb-2 md:mb-8 h-20"
      src="https://static.xx.fbcdn.net/rsrc.php/y8/r/dF5SId3UHWd.svg"
      alt="online forms"
    >
    <form
      @submit.prevent="addUser"
      method="post"
      class="register-form bg-white flex flex-col justify-center rounded-lg px-8 py-10 mb-4"
    >
      <div class="flex flex-col mb-3">
        <label
          for="firstName"
          class="mb-1 text-primary text-lg tracking-wide"
        >first name</label>
        <input
          v-model="firstName"
          id="firstName"
          name="firstName"
          placeholder="first name"
          type="text"
          class="border-2 hover:border-primary focus:border-primary focus:border-opacity-50 border-gray-300 text-gray-300 hover:text-black focus:text-black rounded-md px-3 py-1.5"
        >
      </div>
      <div class="flex flex-col mb-3">
        <label
          for="lastName"
          class="mb-1 text-primary text-lg tracking-wide"
        >last name</label>
        <input
          v-model="lastName"
          id="lastName"
          name="lastName"
          placeholder="last name"
          type="text"
          class="border-2 hover:border-primary focus:border-primary focus:border-opacity-50 border-gray-300 text-gray-300 hover:text-black focus:text-black rounded-md px-3 py-1.5"
        >
      </div>
      <div class="flex flex-col mb-3">
        <label
          for="email"
          class="mb-1 text-primary text-lg tracking-wide"
        >email</label>
        <input
          v-model="email"
          id="email"
          name="email"
          placeholder="email"
          type="email"
          class="border-2 hover:border-primary focus:border-primary focus:border-opacity-50 border-gray-300 text-gray-300 hover:text-black focus:text-black rounded-md px-3 py-1.5"
        >
      </div>
      <div class="flex flex-col mb-3">
        <label
          for="password"
          class="mb-1 text-primary text-lg tracking-wide"
        >password</label>
        <input
          v-model="password"
          id="password"
          name="password"
          placeholder="password"
          type="password"
          class="border-2 hover:border-primary focus:border-primary focus:border-opacity-50 border-gray-300 text-gray-300 hover:text-black focus:text-black rounded-md px-3 py-1.5"
        >
      </div>
      <div class="flex flex-col mb-6">
        <label
          for="confirm"
          class="mb-1 text-primary text-lg tracking-wide"
        >confirm password</label>
        <input
          v-model="confirm"
          id="confirm"
          name="confirm"
          placeholder="confirm password"
          type="password"
          class="border-2 hover:border-primary focus:border-primary focus:border-opacity-50 border-gray-300 text-gray-300 hover:text-black focus:text-black rounded-md px-3 py-1.5"
        >
      </div>
      <div>
        <button
          class="w-full border-2 border-primary bg-primary text-lg text-gray_rgb rounded-3xl py-2 px-10"
        >
          submit
        </button>
      </div>
    </form>
    <p>email: {{ email }}</p>
    <p>password: {{ password }}</p>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore();

    const firstName = ref('');
    const lastName = ref('');
    const email = ref('');
    const password = ref('');
    const confirm = ref('');

    const addUser = async () => {
      if(password.value != confirm.value) {
        return { message: "passwords don't match" };
      }

      const payload = JSON.stringify({
        "firstName": firstName.value,
        "lastName": lastName.value,
        "email": email.value,
        "password": password.value
      });

      try {
        await store.dispatch('register', payload)
        console.log('123');
      } catch (e) {
        console.log(e);
      }

      // await fetch("http://localhost:8000/register", {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     "firstName": firstName.value,
      //     "lastName": lastName.value,
      //     "email": email.value,
      //     "password": password.value
      //   })
      // })
    }

    return {
      firstName,
      lastName,
      email,
      password,
      confirm,
      addUser,
    }
  }
}

</script>

<style lang="sass" scoped>
@import "../assets/css/app"
</style>
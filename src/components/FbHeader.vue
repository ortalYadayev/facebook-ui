<template>
  <div class="signed-header flex bg-white shadow-lg">
    <nav class="container m-auto flex justify-between items-center">
      <div class="flex items-center ml-4">
        <div class="logo mr-2" />
        <div class="search flex-1 flex items-center justify-between rounded-3xl bg-gray-rgb">
          <label
            for="search"
            class="flex items-center pl-2"
          >
            <font-awesome-icon
              v-if="!payload.body"
              icon="search"
              class="text-gray-400 ml-2"
            />
            <input
              type="text"
              id="search"
              class="rounded-3xl bg-transparent p-2"
              v-model="payload.body"
              placeholder="Search in Facebook"
            >
          </label>
          <transition name="slide-fade">
            <button
              v-if="payload.body"
              @click="search"
              class="search-button flex justify-center items-center duration-300 hover:bg-gray400 hover:border-primary border border-transparent rounded-full w-10 h-10"
            >
              <font-awesome-icon
                icon="arrow-right"
                class="fa-lg"
              />
            </button>
          </transition>
        </div>
      </div>
      <div class="flex-1 flex justify-end mr-4">
        settings
      </div>
    </nav>
  </div>
</template>

<script>
import { useStore } from "vuex/dist/vuex.mjs";
import { ref, reactive } from 'vue';

export default {
  name: "FbHeader",
  setup() {
    const store = useStore();

    const payload = reactive({
      body: '',
    });

    const users = ref([]);

    const isLoading = ref(false);
    const color = ref('rgb(24, 119, 241)');
    const size = ref('10px');

    return {
      payload,
      isLoading,
      color,
      size,
      search,
    };

    async function search() {
      isLoading.value = true;
      try {
        const response = await store.dispatch('search', payload);
        users.value = response.data;

        console.log(response.data);

        isLoading.value = false;
      } catch (error) {
        if (error.response.status === 422) {
          errors.message = error.response.data[0].message;
        }

        isLoading.value = false;
      }
    }
  }
}
</script>

<style scoped>
.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}

.search {
  width: 320px;
}

.search-button:hover svg {
  @apply text-primary;
}
</style>
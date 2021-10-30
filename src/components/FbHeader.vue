<template>
  <div class="signed-header flex bg-white fixed w-full shadow-md">
    <nav class="container m-auto flex justify-between items-center">
      <div class="flex items-center ml-4">
        <div class="logo mr-2" />
        <div class="search flex-1 flex items-center justify-between rounded-3xl bg-gray-rgb">
          <label
            for="search"
            class="flex items-center pl-2"
          >
            <fa-icon
              v-if="!payload.search"
              icon="search"
              class="text-gray-400 ml-2"
            />
            <input
              type="text"
              id="search"
              @keyup.enter="search"
              class="rounded-3xl bg-transparent p-2"
              v-model="payload.search"
              placeholder="Search in Facebook"
            >
          </label>
          <transition name="slide-fade">
            <button
              v-if="payload.search"
              @click="search"
              class="search-button flex justify-center items-center duration-300 hover:bg-gray400 hover:border-primary border border-transparent rounded-full w-10 h-10"
            >
              <template v-if="!isLoading">
                <fa-icon
                  icon="arrow-right"
                  class="fa-lg"
                />
              </template>
              <sync-loader
                v-else
                :loading="isLoading"
                :color="color"
                :size="size"
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
import {ref, reactive } from 'vue';
import SyncLoader from 'vue-spinner/src/SyncLoader.vue';
import { useRouter, useRoute } from "vue-router";

export default {
  name: "FbHeader",
  components: {
    SyncLoader
  },
  setup(props) {
    const router = useRouter();
    const route = useRoute();

    const payload = reactive({
      search: route.params.search ? route.params.search: route.query.query,
    });

    if(payload.search){
      search();
    }

    const isLoading = ref(false);
    const color = ref('rgb(24, 119, 241)');
    const size = ref('4px');

    return {
      router,
      payload,
      props,
      isLoading,
      color,
      size,
      search,
    };

    async function search() {
      await router.push({ name: "Search", params: {search: payload.search} });
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
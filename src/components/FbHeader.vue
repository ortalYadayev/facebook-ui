<template>
  <div class="signed-header flex bg-white fixed w-full shadow-md">
    <nav class="container m-auto flex justify-between items-center">
      <div class="flex items-center ml-4">
        <router-link
          :to="{ name: 'Home' }"
          class="logo mr-2"
        />
        <div class="search flex-1 flex items-center justify-between rounded-3xl bg-gray-rgb">
          <label
            for="search"
            class="flex items-center pl-2 w-full"
          >
            <fa-icon
              v-if="!searchQuery"
              icon="search"
              class="text-gray-400 ml-2"
            />
            <input
              type="text"
              id="search"
              @keyup.enter="searchQuery ? $router.push({ name: 'Search', query: { query: searchQuery } }) : ''"
              class="flex-1 rounded-3xl bg-transparent p-2"
              v-model="searchQuery"
              placeholder="Search in Facebook"
            >
          </label>
          <transition name="slide-fade">
            <router-link
              :to="{ name: 'Search', query: { query: searchQuery } }"
              v-if="searchQuery"
              class="search-button flex justify-center items-center duration-300 hover:bg-gray400 hover:border-primary border border-transparent rounded-full w-10 h-10"
            >
              <template v-if="!isLoading">
                <fa-icon
                  icon="arrow-right"
                  class="fa-lg fa-w-40"
                />
              </template>
              <sync-loader
                v-else
                :loading="isLoading"
                :color="color"
                :size="size"
              />
            </router-link>
          </transition>
        </div>
      </div>
      <div class="flex-1 flex justify-end items-center mr-4">
        <router-link
          :to="{ name: 'Profile', params: { username: store.state.user.username } }"
          class="duration-150 hover:bg-gray-rgb flex items-center p-2 rounded-full mr-3"
        >
          <img
            v-if="store.state.user.profilePicturePath"
            :src="store.state.user.profilePicturePath"
            :alt="store.state.user.firstName"
            class="h-6 w-6 rounded-full mr-4"
          >
          <img
            v-else
            src="../assets/images/user.png"
            alt="user icon"
            class="h-6 w-6 rounded-full mr-4"
          >
          <div class="text-lg font-light tracking-wide">
            {{ store.state.user.firstName }}
          </div>
        </router-link>
        <button
          @click="signout"
          class="duration-150 hover:bg-gray-rgb py-2 px-2 rounded-full"
        >
          <fa-icon
            icon="sign-out-alt"
            class="mr-1"
          />
          sign out
        </button>
      </div>
    </nav>
  </div>
</template>

<script>
import SyncLoader from 'vue-spinner/src/SyncLoader.vue';
import {ref} from 'vue';
import {useRoute} from "vue-router";
import {useStore} from "vuex";

export default {
  name: "FbHeader",
  components: {
    SyncLoader
  },
  setup() {
    const route = useRoute();
    const store = useStore();

    const searchQuery = ref(route.query.query || '');
    const isLoading = ref(false);
    const color = ref('rgb(24, 119, 241)');
    const size = ref('4px');

    return {
      store,
      searchQuery,
      isLoading,
      color,
      size,
      signout,
    };

    async function signout() {
      await store.dispatch('logout');
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
<template>
  <div>
    <div
      class="body flex justify-center"
    >
      <div
        v-if="users.length"
        class="search-body sm:w-1/2 lg:w-1/3 pt-8"
      >
        <div
          v-for="(user, index) in users"
          :key="index"
          class="box flex items-center justify-between mb-2"
        >
          <div class="flex items-center">
            <router-link :to="{ name: 'Profile', params: { username: user.username } }">
              <img
                v-if="user.profilePictureUrl"
                :src="user.profilePictureUrl"
                :alt="user.firstName"
                class="hover:opacity-90 h-16 w-16 rounded-full mr-2"
              >
              <img
                v-else
                src="../assets/images/user.png"
                alt="user icon"
                class="hover:opacity-90 bg-gray-rgb h-16 w-16 rounded-full mr-2"
              >
            </router-link>
            <div class="flex-1">
              <router-link
                :to="{ name: 'Profile', params: { username: user.username } }"
                class="hover:underline"
              >
                <div class="text-lg font-bold">
                  {{ user.firstName }} {{ user.lastName }}
                </div>
              </router-link>
              <div v-if="user.isFriend">
                A friend
              </div>
              <div v-if="user.isAuth">
                You
              </div>
            </div>
          </div>

          <button
            v-if="!user.isAuth"
            class="duration-150 flex justify-center items-center bg-gray-rgb hover:bg-lightblue rounded-full w-10 h-10"
          >
            <template v-if="!user.isFriend">
              <fa-icon icon="user-plus" />
            </template>
            <template v-else>
              <fa-icon
                :icon="['far', 'comment']"
              />
            </template>
          </button>
        </div>
      </div>
      <div
        v-else
        class="no-users flex flex-col items-center text-gray-600 text-xl md:text-2xl text-center p-10"
      >
        <img
          src="../assets/images/cantFind.png"
          alt="can't find results"
        >
        We didn't find any results
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { ref } from 'vue';

export default {
  name: "Search",
  setup() {
    const route = useRoute();
    const store = useStore();

    const isLoading = ref(false);

    if (route.query.query) {
      search();
    }

    const users = ref([]);

    return {
      route,
      isLoading,
      users,
      search,
    };

    async function search() {
      try {
        const response = await store.dispatch('search', route.query.query);
        if(!response.data) {
          return;
        }

        users.value = response.data;

        users.value.map(user => {
          if(user.username === store.state.user.username) {
            user.isAuth = true;
          }
        });
      } catch (error) {
        // console.log(error);
      }
    }
  }
}
</script>

<style scoped>
@media (max-width: 639px) {
  .search-body {
    width: 98%;
  }
}
</style>

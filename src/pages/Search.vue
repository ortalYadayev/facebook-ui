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
              <div v-if="user.statusFriend.status === 'approved'">
                A friend
              </div>
              <div v-if="user.isAuth">
                You
              </div>
            </div>
          </div>

          <div v-if="!user.isAuth">
            <template
              v-if="!isLoading || indexFriend !== index"
            >
              <button
                v-if="!user.statusFriend.status"
                @click="addFriend(index)"
                class="box-friend bg-gray-rgb hover:bg-gray-200"
              >
                <fa-icon icon="user-plus" />
              </button>
              <button
                v-if="user.statusFriend.status === 'approved'"
                @click="removeFriend(index)"
                class="box-friend bg-gray-rgb hover:bg-gray-200"
              >
                <fa-icon
                  :icon="['fab', 'facebook-messenger']"
                  class="fa-lg"
                />
              </button>
              <div
                v-if="user.statusFriend.status === 'pending' && user.statusFriend.sentBy === user.id"
                class="flex"
              >
                <button
                  @click="approveFriend(index)"
                  class="box-friend mr-2 bg-lightblue hover:opacity-80"
                >
                  <fa-icon
                    icon="user-plus"
                    class="text-primary"
                  />
                </button>
                <button
                  @click="rejectFriend(index)"
                  class="box-friend bg-lightblue hover:opacity-80"
                >
                  <fa-icon
                    icon="user-times"
                    class="text-primary"
                  />
                </button>
              </div>
              <button
                v-if="user.statusFriend.status === 'pending' && user.statusFriend.sentBy === $store.state.user.id"
                @click="deleteFriend(index)"
                class="box-friend bg-lightblue hover:opacity-80"
              >
                <fa-icon
                  icon="user-times"
                  class="text-primary"
                />
              </button>
            </template>
            <template v-else>
              <sync-loader
                :loading="isLoading"
                :color="color"
                :size="size"
              />
            </template>
          </div>
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
import {useRoute} from "vue-router";
import {useStore} from "vuex";
import {ref} from 'vue';
import SyncLoader from 'vue-spinner/src/SyncLoader.vue'

export default {
  name: "Search",
  components: {
    SyncLoader,
  },
  setup() {
    const route = useRoute();
    const store = useStore();

    const isLoading = ref(false);
    const color = ref('rgb(24, 119, 241)');
    const size = ref('5px');

    if (route.query.query) {
      search();
    }

    const users = ref([]);

    const indexFriend = ref(0);

    return {
      route,
      isLoading,
      color,
      size,
      users,
      indexFriend,
      search,
      addFriend,
      deleteFriend,
      approveFriend,
      rejectFriend,
      removeFriend,
    };

    async function search() {
      try {
        const response = await store.dispatch('search', route.query.query);
        users.value = response.data;
      } catch (error) {
        console.log(error);
      }
    }

    async function addFriend(index) {
      indexFriend.value = index;
      isLoading.value = true;
      try {
        const response = await store.dispatch('friendRequest', {id: users.value[index].id});

        users.value[index].statusFriend.status = 'pending';
        users.value[index].statusFriend.idRequest = response.data.id;
        users.value[index].statusFriend.sentBy = store.state.user.id;

        isLoading.value = false;
      } catch (error) {
        isLoading.value = false;
      }
    }

    async function deleteFriend(index) {
      indexFriend.value = index;
      isLoading.value = true;
      try {
        await store.dispatch('deleteFriend', {idRequest: users.value[index].statusFriend.idRequest});
        users.value[index].statusFriend = {};

        isLoading.value = false;
      } catch (error) {
        isLoading.value = false;
      }
    }

    async function rejectFriend(index) {
      indexFriend.value = index;
      isLoading.value = true;
      try {
        await store.dispatch('rejectFriend', {idRequest: users.value[index].statusFriend.idRequest});
        users.value[index].statusFriend = {};

        isLoading.value = false;
      } catch (error) {
        isLoading.value = false;
      }
    }

    async function approveFriend(index) {
      indexFriend.value = index;
      isLoading.value = true;
      try {
        await store.dispatch('approveFriend', {idRequest: users.value[index].statusFriend.idRequest});

        users.value[index].statusFriend.status = 'approved';

        isLoading.value = false;
      } catch (error) {
        isLoading.value = false;
      }
    }

    async function removeFriend(index) {
      indexFriend.value = index;
      isLoading.value = true;
      try {
        await store.dispatch('removeFriend', {idRequest: users.value[index].statusFriend.idRequest});
        users.value[index].statusFriend = {};

        isLoading.value = false;
      } catch (error) {
        isLoading.value = false;
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

.box-friend {
  @apply duration-150 flex justify-center items-center rounded-full w-10 h-10;
}
</style>

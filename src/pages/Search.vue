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
            <button @click="profile(index)">
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
            </button>
            <div class="flex-1">
              <button
                @click="profile(index)"
                class="hover:underline"
              >
                <div class="text-lg font-bold">
                  {{ user.firstName }} {{ user.lastName }}
                </div>
              </button>
              <div v-if="user.statusFriend === 'approved'">
                A friend
              </div>
              <div v-if="user.isAuth">
                You
              </div>
            </div>
          </div>

          <button
            v-if="!user.isAuth"
            @click="addFriend(index)"
            class="duration-150 flex justify-center items-center bg-gray-rgb hover:bg-lightblue rounded-full w-10 h-10"
          >
            <template v-if="!isLoading || indexFriend !== index">
              <template v-if="!user.statusFriend">
                <fa-icon icon="user-plus" />
              </template>
              <template v-else-if="user.statusFriend === 'approved'">
                <fa-icon
                  :icon="['fab', 'facebook-messenger']"
                  class="fa-lg"
                />
              </template>
              <template v-else-if="user.statusFriend === 'pending' && user.sentBy === user.id">
                <fa-icon
                  icon="user-plus"
                  class="text-primary"
                />
              </template>
              <template v-else-if="user.statusFriend === 'pending' && user.sentBy === $store.state.user.id">
                <fa-icon
                  icon="user-times"
                  class="text-primary"
                />
              </template>
            </template>
            <template v-else>
              <sync-loader
                :loading="isLoading"
                :color="color"
                :size="size"
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
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { watchEffect, ref } from 'vue';
import SyncLoader from 'vue-spinner/src/SyncLoader.vue'

export default {
  name: "Search",
  components: {
    SyncLoader,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();

    const isLoading = ref(false);
    const color = ref('rgb(24, 119, 241)');
    const size = ref('5px');

    search();
    const users = ref([{
      id: Number,
      email: '',
      lastName: '',
      firstName: '',
      username: '',
      profilePicturePath: '',
      profilePictureUrl: '',
      statusFriend: '',
      sentBy: Number,
      isAuth: false,
    }]);

    const statusFriend = ref('');
    const indexFriend = ref(0);

    watchEffect(() => {
      users.value.map((user) => {
        if (user.statusFriend) {
          statusFriend.value = user.statusFriend;
        }
      })
    });

    return {
      route,
      isLoading,
      color,
      size,
      users,
      indexFriend,
      search,
      profile,
      addFriend,
    };

    async function profile(index) {
      await router.push({ name: 'Profile', params: { username: users.value[index].username } })
    }

    async function search() {
      try {
        const response = await store.dispatch('search', route.params.search);
        if(!response.data) {
          return;
        }

        const requests = response.data.requests;

        users.value = response.data.users;

        users.value.forEach(user => {
          if(user.username === store.state.user.username) {
            user.isAuth = true;
          }
          else requests.forEach(request => {
            if(request.status === 'approved' && (request.receiver === user.id || request.sent === user.id)){
              user.statusFriend = 'approved';
            } else if(request.status === 'pending') {
              if (request.receiver === user.id) {
                user.statusFriend = 'pending';
                user.sentBy = request.sent;
              } else if (request.sent === user.id) {
                user.statusFriend = 'pending';
                user.sentBy = user.id;
              }
            }
          });
        });
      } catch (error) {
        // console.log(error);
      }
    }

    async function addFriend(index) {
      indexFriend.value = index;
      isLoading.value = true;
      try {
        const response = await store.dispatch('friendRequest', { id: users.value[index].id });

        if(response.status === 201) {
          users.value[index].statusFriend = 'pending';
          users.value[index].sentBy = store.state.user.id;
        }
        isLoading.value = false;
      } catch (error){
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
</style>

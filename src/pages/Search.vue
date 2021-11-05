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
              <div v-if="user.statusFriend.status === 'approved'">
                A friend
              </div>
              <div v-if="user.isAuth">
                You
              </div>
            </div>
          </div>

          <div
            v-if="!user.isAuth"
            class="box-friend"
          >
            <template
              v-if="!isLoading || indexFriend !== index"
            >
              <button
                v-if="!user.statusFriend.status"
                @click="addFriend(index)"
                class="box-friend"
              >
                <fa-icon icon="user-plus" />
              </button>
              <button
                v-if="user.statusFriend.status === 'approved'"
                @click="removeFriend(index)"
                class="box-friend"
              >
                <fa-icon
                  :icon="['fab', 'facebook-messenger']"
                  class="fa-lg"
                />
              </button>
              <button
                v-if="user.statusFriend.status === 'pending' && user.statusFriend.sentBy === user.id"
                @click="approveFriendOrReject(index)"
                class="box-friend"
              >
                <fa-icon
                  icon="user-plus"
                  class="text-primary"
                />
              </button>
              <button
                v-if="user.statusFriend.status === 'pending' && user.statusFriend.sentBy === $store.state.user.id"
                @click="deleteFriend(index)"
                class="box-friend"
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
      statusFriend: {
        status: '',
        sentBy: Number,
        receiver: Number,
      },
      isAuth: false,
    }]);

    const statusFriend = ref({
      status: '',
      sentBy: Number,
      receiver: Number,
    });
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

        users.value = response.data;
      } catch (error) {
        // console.log(error);
      }
    }

    async function addFriend(index) {
      indexFriend.value = index;
      isLoading.value = true;
      try {
        const response = await store.dispatch('friendRequest', { id: users.value[index].id });

        users.value[index].statusFriend.status = response.data.statusFriend.status;
        users.value[index].statusFriend.sentBy = response.data.statusFriend.sentBy;

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

.box-friend {
  @apply duration-150 flex justify-center items-center bg-gray-rgb rounded-full w-10 h-10;
}
</style>

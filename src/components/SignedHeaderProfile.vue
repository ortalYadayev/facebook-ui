<template>
  <header class="profile-header flex flex-col justify-between items-center shadow-sm pb-2">
    <div class="mt-10">
      <img
        v-if="user.profilePicturePath"
        class="border-4 border-lightblue h-40 w-40 rounded-full bg-white mb-2"
        :src="user.profilePicturePath"
        :alt="user.firstName"
      >
      <img
        v-else
        src="../assets/images/user.png"
        alt="user icon"
        class="border-4 border-lightblue h-40 w-40 rounded-full bg-white mb-2"
      >
      <div class="text-center text-2xl">
        {{ user.firstName }} {{ user.lastName }}
      </div>
    </div>
    <nav class="flex justify-between items-center">
      <div class="flex-1">
        <router-link
          :to="{ name: 'Posts', params: { user } }"
          :class=" $route.name === 'Posts' ? 'active': ''"
          active-class=""
          class="duration-300 hover:border-primary uppercase px-3 py-4"
        >
          Posts
        </router-link>
        <router-link
          :to="{ name: 'About', params: { user } }"
          class="duration-300 border-b-2 border-transparent uppercase ml-2 px-3 py-4"
        >
          About
        </router-link>
        <router-link
          :to="{ name: 'Friends', params: { user } }"
          class="duration-300 border-b-2 border-transparent uppercase ml-2 px-3 py-4"
        >
          Friends
        </router-link>
        <router-link
          :to="{ name: 'Photos', params: { user } }"
          class="duration-300 border-b-2 border-transparent uppercase ml-2 px-3 py-4"
        >
          Photos
        </router-link>
        <router-link
          :to="{ name: 'Register' }"
          active-class="active"
          class="duration-300 border-b-2 border-transparent uppercase ml-2 px-3 py-4"
        >
          More
        </router-link>
      </div>
      <div v-if="user.isAuth">
        <button class="duration-150 border-2 border-primary uppercase tracking-wider bg-primary text-gray-rgb hover:opacity-90 rounded-lg p-2 mr-2">
          <fa-icon
            icon="pen"
            class="mr-1"
          />
          edit the profile
        </button>
      </div>
      <div
        v-else
        class="flex"
      >
        <div>
          <button
            @click="addFriend"
            v-if="!statusFriend.status"
            class="not-friend flex justify-center items-center duration-150 border-2 uppercase tracking-wider rounded-lg p-2 mr-2"
          >
            <template v-if="!isLoading">
              <fa-icon
                icon="user-plus"
                class="mr-1"
              />
            </template>
            <template v-else>
              <sync-loader
                class="mr-1"
                :loading="isLoading"
                :color="color"
                :size="size"
              />
            </template>
            add a friend
          </button>
          <button
            @click="deleteFriend"
            v-else-if="statusFriend.status === 'pending' && statusFriend.sentBy === $store.state.user.id"
            class="not-friend flex justify-center items-center duration-150 border-2 uppercase tracking-wider rounded-lg p-2 mr-2"
          >
            <template v-if="!isLoading">
              <fa-icon
                icon="user-plus"
                class="mr-1"
              />
            </template>
            <template v-else>
              <sync-loader
                class="mr-1"
                :loading="isLoading"
                :color="color"
                :size="size"
              />
            </template>
            cancel
          </button>
          <div
            v-if="statusFriend.status === 'pending' && statusFriend.sentBy === user.id"
            class="flex"
          >
            <button
              @click="approveFriend"
              class="not-friend flex justify-center items-center duration-150 border-2 uppercase tracking-wider rounded-lg p-2 mr-2"
            >
              <template v-if="!isLoading">
                <fa-icon
                  icon="user-check"
                  class="mr-1"
                />
              </template>
              <template v-else>
                <sync-loader
                  class="mr-1"
                  :loading="isLoading"
                  :color="color"
                  :size="size"
                />
              </template>
              approve
            </button>
            <button
              @click="rejectFriend"
              class="not-friend flex justify-center items-center duration-150 border-2 uppercase tracking-wider rounded-lg p-2 mr-2"
            >
              <template v-if="!isReject">
                <fa-icon
                  icon="user-times"
                  class="mr-1"
                />
              </template>
              <template v-else>
                <sync-loader
                  class="mr-1"
                  :loading="isReject"
                  :color="color"
                  :size="size"
                />
              </template>
              reject
            </button>
          </div>
          <button
            @click="removeFriend"
            v-if="statusFriend.status === 'approved'"
            class="not-friend flex justify-center items-center duration-150 border-2 uppercase tracking-wider rounded-lg p-2 mr-2"
          >
            <template v-if="!isLoading">
              <fa-icon
                icon="user-check"
                class="mr-1"
              />
            </template>
            <template v-else>
              <sync-loader
                class="mr-1"
                :loading="isLoading"
                :color="color"
                :size="size"
              />
            </template>
            friend
          </button>
        </div>
        <button
          class="message-box duration-150 border-2 uppercase tracking-wider rounded-lg p-2"
          v-if="!(statusFriend.status === 'pending' && statusFriend.sentBy === user.id)"
        >
          <fa-icon
            :icon="['fab', 'facebook-messenger']"
            class="mr-1"
          />
          message
        </button>
      </div>
    </nav>
  </header>
</template>

<script>
import Posts from './Profile/Posts.vue';
import About from './Profile/About.vue';
import Friends from './Profile/Friends.vue';
import Photos from './Profile/Photos.vue';
import { useStore } from 'vuex';
import { ref } from "vue";
import SyncLoader from 'vue-spinner/src/SyncLoader.vue'
import { useRouter } from "vue-router";

export default {
  name: "SignedHeaderProfile",
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  components: {
    SyncLoader,
  },
  setup(props) {
    const store = useStore();
    const router = useRouter();

    const statusFriend = ref(
       props.user.statusFriend || {},
    );

    const isReject = ref(false);
    const isLoading = ref(false);
    const color = ref('#fff');
    const size = ref('7px');

    return {
      Posts,
      About,
      Friends,
      Photos,
      statusFriend,
      isLoading,
      color,
      size,
      isReject,
      addFriend,
      deleteFriend,
      rejectFriend,
      approveFriend,
      removeFriend,
    };

    async function addFriend() {
      isLoading.value = true;
      try {
        const response = await store.dispatch('friendRequest', { id: props.user.id });

        statusFriend.value.status = 'pending';
        statusFriend.value.sentBy = response.data.sender.id;
        statusFriend.value.idRequest = response.data.id;

        isLoading.value = false;
      } catch (error){
        isLoading.value = false;

        if (error.response.status === 404) {
          await router.push({name: "NotFound"});
        }
      }
    }

    async function deleteFriend() {
      isLoading.value = true;
      try {
        await store.dispatch('deleteFriend', { idRequest: statusFriend.value.idRequest });
        statusFriend.value = {};

        isLoading.value = false;
      } catch (error){
        isLoading.value = false;
      }
    }

    async function rejectFriend() {
      isReject.value = true;
      try {
        await store.dispatch('rejectFriend', { idRequest: statusFriend.value.idRequest });
        statusFriend.value = {};

        isReject.value = false;
      } catch (error){
        isReject.value = false;
      }
    }

    async function approveFriend(index) {
      isLoading.value = true;
      try {
        await store.dispatch('approveFriend', { idRequest: statusFriend.value.idRequest });
        statusFriend.value.status = 'approved';

        isLoading.value = false;
      } catch (error){
        isLoading.value = false;
      }
    }

    async function removeFriend(index) {
      isLoading.value = true;
      try {
        await store.dispatch('removeFriend', { idRequest: statusFriend.value.idRequest });
        statusFriend.value = {};

        isLoading.value = false;
      } catch (error){
        isLoading.value = false;
      }
    }
  }
}
</script>

<style lang="scss" scoped >
nav {
  width: 800px;
}
.profile-header {
  height: var(--profile-header-height);
  background-image: linear-gradient(to bottom, var(--lightblue), #c0daff, #dbe4ff, #f0f1ff, #fff);
}

.not-friend {
  @apply border-primary bg-primary text-gray-rgb hover:opacity-90;
}

.message-box {
  @apply border-gray-rgb bg-gray-rgb hover:border-gray-200 hover:bg-gray-200;
}
</style>
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
        <button
          @click="addFriend"
          class="flex justify-center items-center duration-150 border-2 uppercase tracking-wider rounded-lg p-2 mr-2"
          :class="statusFriend.status === 'approved' ? 'status-approved' : 'status-all'"
        >
          <template v-if="!isLoading">
            <fa-icon
              :icon="statusFriend.status === 'approved'? 'user-check' : 'user-plus'"
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
          <template v-if="statusFriend.status === 'approved'">
            friend
          </template>
          <template v-else-if="statusFriend.status === 'pending' && statusFriend.sentBy === $store.state.user.id">
            cancel
          </template>
          <template v-else-if="statusFriend.status === 'pending' && statusFriend.sentBy === user.id">
            approve
          </template>
          <template v-else>
            add a friend
          </template>
        </button>
        <button
          class="duration-150 border-2 uppercase tracking-wider rounded-lg p-2"
          :class="statusFriend.status === 'approved' ? 'status-all' : 'status-approved'"
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

    const statusFriend = ref({
      status: props.user.statusFriend,
      sentBy: props.user.sentBy
    });

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
      addFriend,
    };

    async function addFriend() {
      isLoading.value = true;
      try {
        const response = await store.dispatch('friendRequest', { id: props.user.id });

        statusFriend.value.status = response.data.statusFriend.status;
        statusFriend.value.sentBy = response.data.statusFriend.sentBy;

        isLoading.value = false;
      } catch (error){
        isLoading.value = false;

        if (error.response.status === 404) {
          await router.push({name: "NotFound"});
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped >
nav {
  width: 800px;
}
</style>


<style lang="scss" scoped >

.profile-header {
  height: var(--profile-header-height);
  background-image: linear-gradient(to bottom, var(--lightblue), #c0daff, #dbe4ff, #f0f1ff, #fff);
}

.status-all {
  @apply border-primary bg-primary text-gray-rgb hover:opacity-90;
}

.status-approved {
  @apply border-gray-rgb bg-gray-rgb hover:border-gray-200 hover:bg-gray-200;
}
</style>
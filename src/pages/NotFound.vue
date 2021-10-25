<template>
  <div>
    <FbHeader />
    <div class="body flex flex-col justify-center items-center text-red-500 bg-lightblue py-10">
      <h1 class="text-9xl mb-12">
        404
      </h1>
      <div class="text-center text-2xl mx-10 mb-10">
        Oops, It looks like the page you're looking for doesn't exist
      </div>
      <div>
        <router-link
          :to="{ name: 'Login' }"
          class="hover:shadow-xl duration-300 border-red-500 border-2 text-lg uppercase rounded-lg px-8 md:px-12 py-4 mb-10"
        >
          Go back home
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import FbHeader from '../components/FbHeader.vue'

export default {
  name: "NotFound",
  components: {
    FbHeader,
  }
}
</script>
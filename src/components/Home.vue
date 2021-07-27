<template>
  <div>Home</div>
  <p> Name in store is: {{ name }}</p>

  <input
      v-model="newName"
      type="text"
      class="p-2 border rounded mr-4"
  />

  <button @click="saveName" class="p-2 bg-indigo-600 rounded">
    Submit
  </button>
</template>

<script setup>
import { computed, ref } from "vue";
import { useStore } from 'vuex'

const store = useStore();

const name = computed(() =>  {
  return store.state.user.name
});

const newName = ref('')
function saveName() {
  store.dispatch('saveName', newName.value)
  newName.value = ''
}

</script>

<style lang="sass" scoped>
@import "../assets/css/app.sass"

p
  color: $red


</style>
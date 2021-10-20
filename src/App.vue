<template>
  <div>
    <router-view :key="$route.name !== 'Profile' ? $route.fullPath : $route.name" />
  </div>
</template>

<style src="./assets/css/app.sass" />
<style src="./assets/css/tailwind.css" />

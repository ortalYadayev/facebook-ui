<template>
  <div>
    <router-view :key="$route.name !== 'Profile' ? $route.fullPath : $route.name" />
  </div>
</template>

<style lang="scss" src="./assets/css/app.scss" />
<style src="./assets/css/tailwind.css" />
<template>
  <router-view :key="$route.name !== 'Profile' ? $route.fullPath : $route.name" />
</template>

<style src="./assets/css/app.sass" />

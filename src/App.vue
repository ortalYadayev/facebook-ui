<template>
  <router-view :key="$route.name !== 'Profile' ? $route.fullPath : $route.name" />
</template>

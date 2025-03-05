<template>
  <q-layout class="main-layout">
    <app-header />
    <app-drawer />
    <q-page-container class="main-layout__page-container">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import AppHeader from 'components/app/app-header/app-header';
import AppDrawer from 'components/app/app-drawer/app-drawer';
</script>

<style lang="scss" scoped>
.main-layout {
  background-color: $bg-secondary;
  &__page-container {
    height: calc(100vh - 64px);
  }
}
</style>

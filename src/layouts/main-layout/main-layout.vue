<template>
  <q-layout class="main-layout">
    <app-header />
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import AppHeader from 'components/app/app-header/app-header';
</script>

<style lang="scss" scoped>
.main-layout {
  background-color: $bg-secondary;
}
</style>

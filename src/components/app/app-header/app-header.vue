<template>
  <q-header bordered class="app-header text-color--dark">
    <div class="navigation"></div>
    <app-header-user />
  </q-header>
</template>

<script setup>
// define[]

// Variables

// Reactive variables

// Composition

// Computed

// Watch

// Hooks

// Methods
import AppHeaderUser from 'components/app/app-header/app-header-user/app-header-user';
</script>

<style lang="scss" scoped>
.app-header {
  height: 64px;
  background-color: $bg-primary;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 32px;
}
</style>

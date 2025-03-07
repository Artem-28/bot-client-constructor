<template>
  <q-layout class="main-layout">
    <app-header />
    <app-drawer v-if="showDrawer" />
    <q-page-container class="main-layout__page-container">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import AppHeader from 'components/app/app-header/app-header';
import AppDrawer from 'components/app/app-drawer/app-drawer';
import { onBeforeMount, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

// Props

// Emits

// Variables
const route = useRoute();

// Reactive variables
const showDrawer = ref(false);

// Composition

// Computed

// Watch
watch(route, () => {
  showDrawer.value = !route.meta?.root;
});

// Hooks
onBeforeMount(() => (showDrawer.value = !route.meta?.root));

// Methods

</script>

<style lang="scss" scoped>
.main-layout {
  background-color: $bg-secondary;
  &__page-container {
    height: calc(100vh - 64px);
  }
}
</style>

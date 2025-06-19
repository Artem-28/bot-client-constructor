<template>
  <q-layout class="bg-system--secondary">
    <app-header />
    <app-drawer v-if="showDrawer" />
    <q-page-container class="page-container">
      <div class="page-content">
        <router-view />
      </div>
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
.page-container {
  height: 100vh;
}
.page-content {
  height: 100%;
}
</style>

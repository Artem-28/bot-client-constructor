<template>
  <q-header bordered class="app-header bg-system--primary text-color--primary">
    <div class="navigation"></div>
    <q-toggle
      false-value="light"
      true-value="dark"
      v-model="themeModel"
    />
    <app-header-user />
  </q-header>
</template>

<script setup>
import AppHeaderUser from 'components/app/app-header/app-header-user/app-header-user';
import { computed, ref } from 'vue';
// define[]

// Variables

// Reactive variables
const themeToggle = ref('light');
const themeModel = computed({
  get() {
    return themeToggle.value;
  },
  set(value) {
    themeToggle.value = value;
    document.documentElement.setAttribute('data-theme', value);
    console.log(value);
  },
});

// Composition

// Computed

// Watch

// Hooks

// Methods

</script>

<style lang="scss" scoped>
.app-header {
  height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 32px;
}
</style>

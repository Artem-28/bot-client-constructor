<template>
  <q-layout class="main-layout" view="hHh Lpr lff">
    <app-header />

    <q-drawer
      v-model="drawer"
      v-model:mini="miniState"
      show-if-above
      bordered
      :width="250"
      :mini-width="113"
      @mouseout="showMiniState"
      @mouseover="hideMiniState"
    >
      <app-menu/>
      <div class="main-layout__lock-menu">
        <q-checkbox
          v-model="lock"
          dense
          checked-icon="lock"
          indeterminate-icon="lock_open"
          unchecked-icon="lock_open"
          class="no-hover-effect"
        />
      </div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';

/* Composition */
// import you composition api...

/* Components */
// import you components...
import AppHeader from 'components/global/app-header/AppHeader.vue';
import AppMenu from 'components/global/app-menu/AppMenu.vue';

/* Types */
// declare components component...

/* Props */
// property default value...

/* Emits */

/* Data */
// declare reactive variables...
const drawer = ref<boolean>(true);
const miniState = ref<boolean>(false);
const lock = ref<boolean>(false);

/* Composition */
// declare you composition api...

/* Life hooks */
// life cycle hooks...

/* Computed */
// you computational properties...

/* Methods */
// promote your methods...
const showMiniState = () => {
  if (lock.value) return;
  miniState.value = true;
};
const hideMiniState = () => {
  if (lock.value) return;
  miniState.value = false;
};
</script>

<style scoped lang="scss">
/* Variables */
// declare you variables scss...

/* Selector */
// style component...
.main-layout {
  background-color: $light-page;
  &__lock-menu {
    position: absolute;
    top: 13px;
    right: -13px;
    width: 26px;
    height: 26px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background-color: #ffffff;
    border-bottom: 1px solid rgba(0, 0, 0, 0.12)
  }
}
.lock-menu-btn {
  position: absolute;
  right: 0;
  padding: 0;
}
</style>

<template>
  <q-item class="app-menu-item-wrapper">
    <router-link
      :to="item.path"
      class="app-menu-item"
      active-class="app-menu-item--active"
    >
      <q-item-section avatar class="app-menu-item__icon">
        <q-icon :name="item.icon" />
      </q-item-section>
      <span class="app-menu-item__label" v-text="$t(item.label)" />
    </router-link>
  </q-item>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { MenuItem } from 'src/types/component.type';

/* Composition */
// import you composition api...

/* Components */
// import you components...

/* Types */
// declare components component...
interface Props {
  item: MenuItem;
}
/* Props */
// property default value...
defineProps<Props>();

/* Emits */

/* Data */
// declare reactive variables...

/* Composition */
// declare you composition api...

/* Life hooks */
// life cycle hooks...

/* Computed */
// you computational properties...

/* Methods */
// promote your methods...
</script>

<style scoped lang="scss">
/* Variables */
// declare you variables scss...

/* Selector */
// style component...
.app-menu-item-wrapper {
  height: 80px;
  padding: 12px !important;
}
.app-menu-item {
  display: grid;
  grid-template-columns: 54px 1fr;
  cursor: pointer;
  align-items: center;
  width: 100%;
  border: 2px solid #ffffff;
  border-radius: 6px;
  color: $text-body-secondary;
  text-decoration: none;
  transition: all 0.2s;
  &:hover {
    border: 2px solid $primary;
    color: $primary;
  }
  &__icon {
    flex-shrink: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding: 0 2px 0 0;
  }
  &__label {
    overflow: hidden;
    font-size: 16px;
    font-weight: 600;
  }
}
.app-menu-item--active {
  background-color: $primary;
  color: #ffffff;
  border: 2px solid $primary;
  &:hover {
    color: #ffffff;
  }
}
</style>

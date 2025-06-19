<template>
  <div class="script-menu">
    <q-item
      v-for="item in scriptMenuItems"
      :key="item.code"
      v-close-popup
      clickable
      class="script-menu-item color--primary"
      @click="clickHandle(item.code)"
    >
      <span v-text="$t(item.label)" class="script-menu-item__text text-color--primary" />
    </q-item>
  </div>
</template>

<script setup>
import { scriptMenuItems } from 'components/general/scripts-list/script-menu/script-menu-items';

// Props

// Emits
const emit = defineEmits(['command']);

// Variables

// Reactive variables

// Composition

// Computed

// Watch

// Hooks

// Methods
function clickHandle(code) {
  emit('command', code);
}
</script>

<style scoped lang="scss">
.script-menu-item {
  min-height: 40px;
  text-align: center;
  &__text {
    font-size: 14px;
    text-align: center;
  }
}
</style>

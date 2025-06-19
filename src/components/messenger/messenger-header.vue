<template>
  <div class="messenger-header">
    <div class="messenger-header__actions">
      <base-icon-btn
        icon="space_dashboard"
        :active="template.drawer.value.right"
        @click="toggleDrawer"
      />
    </div>
  </div>
</template>

<script setup>
import { inject } from 'vue';
import { MessengerTemplateKey } from 'src/utils/symbols.util';
import BaseIconBtn from 'components/base/base-icon-btn/base-icon-btn';

// Props

// Emits

// Variables
const template = inject(MessengerTemplateKey, {});

// Reactive variables

// Composition

// Computed

// Watch

// Hooks

// Methods
function closeDrawer() {
  template.closeDrawer('right');
}

function openDrawer() {
  template.openDrawer('right');
}

function toggleDrawer() {
  const toggle = template.drawer.value.right ? closeDrawer : openDrawer;
  toggle();
}
</script>

<style scoped lang="scss">
.messenger-header {
  padding: 0 12px;
  display: flex;
  height: 64px;
  align-items: center;
  &__actions {
    margin-left: auto;
  }
}
</style>

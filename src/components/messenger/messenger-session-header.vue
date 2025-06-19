<template>
  <header class="messenger-session-header">
    <base-icon-btn
      icon="arrow_back"
      class="text--xxl"
      @click="backHandler"
    />
    <span class="text--truncate text--md text--bold" v-if="title" v-text="title" />
  </header>
</template>

<script setup>
import { computed, inject } from 'vue';
import { MessengerKey, MessengerTemplateKey } from 'src/utils/symbols.util';
import BaseIconBtn from 'components/base/base-icon-btn/base-icon-btn';

// Props

// Emits

// Variables

// Reactive variables

const messenger = inject(MessengerKey, {});
const template = inject(MessengerTemplateKey, {});

// Composition
const title = computed(() => messenger.activeGroup.value?.title || '');

// Computed

// Watch

// Hooks

// Methods
async function backHandler() {
  await template.closeDrawer('left');
  messenger.clearActiveGroup();
}
</script>

<style scoped lang="scss">
.messenger-session-header {
  display: flex;
  align-items: center;
  gap: 4px;
  height: 64px;
  width: 100%;
  padding: 12px;
}

</style>

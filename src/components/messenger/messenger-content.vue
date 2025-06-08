<template>
  <div class="messenger-content">
    <pre>{{ messenger.messages }}</pre>
  </div>
</template>

<script setup>
import { inject } from 'vue';
import { MessengerKey } from 'src/utils/symbols.util';

// Props

// Emits

// Variables

// Reactive variables

// Composition
const messenger = inject(MessengerKey, {});

// Computed

// Watch

// Hooks

// Methods
</script>

<style scoped lang="scss">

</style>

<template>
  <div class="messenger-group-header">
    <q-input
      v-model="search"
      outlined
      dense
      :placeholder="$t('field.placeholder.search')"
      class="scripts-search"
    >
      <template v-slot:prepend>
        <q-icon name="search" />
      </template>
    </q-input>
  </div>
</template>

<script setup>

// Props

// Emits

// Variables

// Reactive variables
import { ref } from 'vue';

const search = ref('');

// Composition

// Computed

// Watch

// Hooks

// Methods
</script>

<style scoped lang="scss">
.messenger-group-header {
  padding: 12px;
}

</style>

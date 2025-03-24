<template>
  <header class="app-page-header">
    <h1 class="font-24 q-ma-none text-bold">
      <slot name="title">
        <span v-text="title"  />
      </slot>
    </h1>
    <div class="app-page-header__actions">
      <slot name="actions" />
    </div>
  </header>
</template>

<script setup>

// Props
defineProps({
  title: {
    type: String,
    required: false,
  },
});

// Emits

// Variables

// Reactive variables

// Composition

// Computed

// Watch

// Hooks

// Methods
</script>

<style scoped lang="scss">
.app-page-header {
  display: flex;
  align-items: center;
  width: 100%;
  min-height: 40px;
  justify-content: space-between;
  &__actions {
    display: flex;
    width: 100%;
    gap: 24px;
    align-items: center;
    justify-content: flex-end;
  }
}
</style>

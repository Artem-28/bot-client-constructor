<template>
  <div class="app-page">
    <div class="app-page__content">
      <slot />
    </div>
  </div>
</template>

<script setup>

// Props

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
.app-page {
  height: 100%;
  width: 100%;
  padding: 40px 32px;
  &__content {
    height: 100%;
    width: 100%;
    padding: 24px 16px;
    background-color: $bg-primary;
    display: flex;
    flex-direction: column;
    gap: 32px;
    border-radius: 8px;
  }
}
</style>

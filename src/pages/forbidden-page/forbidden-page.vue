<template>
  <div class="forbidden text-color--gray">
    <span class="forbidden__error">403</span>
    <span class="forbidden__title" v-text="$t('page.forbidden.title')" />
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
.forbidden {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  &__error {
    font-size: 100px;
    font-weight: bold;
    line-height: 100px;
  }
  &__title {
    font-size: 24px;
    font-weight: bold;
  }
}
</style>

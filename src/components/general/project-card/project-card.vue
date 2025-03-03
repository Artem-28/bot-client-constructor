<template>
  <div class="project-card">
    <div class="project-card__preview"></div>
    <span v-text="project.title" class="font-16 text-bold q-my-auto" />
  </div>
</template>

<script setup>
// Props
// eslint-disable-next-line no-unused-vars
const props = defineProps({
  project: {
    type: Object,
    required: true,
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
.project-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  aspect-ratio: 1/1;
  padding: 8px;
  border: 1px solid $light-primary;
  border-radius: 8px;
  cursor: pointer;
  transition: $default-transition;
  &:hover {
    background-color: $color-hover-primary;
    border: 1px solid $primary;
  }
  &__preview {
    aspect-ratio: 4/3;
    width: 100%;
    border-radius: inherit;
    background-color: $fill-image;
  }
}
</style>

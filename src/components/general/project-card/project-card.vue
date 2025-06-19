<template>
  <div class="project-card clickable-el" @click="clickHandle">
    <div class="project-card__preview"></div>
    <span v-text="project.title" class="text--md text--bold q-my-auto" />
  </div>
</template>

<script setup>
// Props
// eslint-disable-next-line no-unused-vars
import { useRouter } from 'vue-router';

const props = defineProps({
  project: {
    type: Object,
    required: true,
  },
});
// Emits

// Variables
const router = useRouter();

// Reactive variables

// Composition

// Computed

// Watch

// Hooks

// Methods
function clickHandle() {
  router.push({ name: 'project', params: { project_id: props.project.id } });
}
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
  transition: $default-transition;
  &:hover {
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

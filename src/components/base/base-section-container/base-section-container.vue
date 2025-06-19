<template>
  <div
    v-if="canInstance"
    :style="rootStyle"
    class="base-section-container"
  >
    <div class="base-section-container__content">
      <slot />
    </div>
  </div>
</template>

<script setup>
import { computed, inject } from 'vue';
import { BaseSectionKey } from 'src/utils/symbols.util';

// Props

// Emits

// Variables
const instance = inject(BaseSectionKey, null);
const canInstance = instance !== null;

// Reactive variables

// Composition

// Computed
const rootStyle = computed(() => {
  let height = instance.rootSize.value.height;
  const transition = [];
  const styles = {};
  transition.push(`padding-left ${instance.left.value.duration}ms`);
  transition.push(`padding-right ${instance.right.value.duration}ms`);

  if (instance.header.value.space) {
    const offset = instance.header.value.size;
    styles.marginTop = `${offset}px`;
    height -= offset;
  }

  if (instance.footer.value.space) {
    const offset = instance.footer.value.size;
    height -= offset;
  }

  if (instance.left.value.space) {
    styles.paddingLeft = `${instance.left.value.size}px`;
  }
  if (instance.right.value.space) {
    styles.paddingRight = `${instance.right.value.size}px`;
  }

  styles.height = `${height}px`;
  styles.transition = transition.join(', ');
  return styles;
});

// Watch

// Hooks

// Methods
</script>

<style scoped lang="scss">
.base-section-container {
  width: 100%;
  &__content {
    width: 100%;
    height: 100%;
  }
}

</style>

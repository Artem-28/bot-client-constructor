<template>
  <footer
    ref="rootRef"
    v-if="canInstance"
    :style="rootStyle"
    class="base-section-footer"
  >
    <slot />
  </footer>
</template>

<script setup>
import { computed, inject, ref } from 'vue';
import { BaseSectionKey } from 'src/utils/symbols.util';
import { useResizeObserver } from 'src/composable';

// Props

// Emits

// Variables
const instance = inject(BaseSectionKey, null);
const canInstance = instance !== null;

// Reactive variables
const rootRef = ref(null);

// Composition
useResizeObserver(rootRef, onResize);

// Computed
const rootStyle = computed(() => {
  const matrix = instance.rows.value.bottom;
  const transition = [];
  const styles = {};

  transition.push(`padding-left ${instance.left.value.duration}ms`);
  transition.push(`padding-right ${instance.right.value.duration}ms`);

  if (matrix[0] === 'l' && instance.left.value.space) {
    styles.paddingLeft = `${instance.left.value.size}px`;
  }
  if (matrix[2] === 'r' && instance.right.value.space) {
    styles.paddingRight = `${instance.right.value.size}px`;
  }
  styles.transition = transition.join(', ');
  return styles;
});

// Watch

// Hooks

// Methods
function updateInstance(key, value) {
  instance.update('footer', key, value);
}

function onResize(size) {
  updateInstance('size', size.height);
}

updateInstance('space', true);
</script>

<style scoped lang="scss">
.base-section-footer {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>

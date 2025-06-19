<template>
  <div ref="rootRef" class="base-section">
    <slot />
  </div>
</template>

<script setup>
import { computed, provide, ref } from 'vue';
import { useResizeObserver } from 'src/composable';
import { BaseSectionKey } from 'src/utils/symbols.util';

// Props
const props = defineProps({
  view: {
    type: String,
    default: 'hhh lpr fff',
  },
});

// Emits

// Variables

// Reactive variables
const rootRef = ref(null);
const initialized = ref(false);
const header = ref({ size: 0, space: false, show: false, duration: 0 });
const footer = ref({ size: 0, space: false, show: false, duration: 0 });
const left = ref({ size: 0, space: false, show: false, duration: 0 });
const right = ref({ size: 0, space: false, show: false, duration: 0 });

// Composition
const { size: rootSize } = useResizeObserver(rootRef, () => {
  initialized.value = true;
});

// Computed
const rows = computed(() => {
  const matrix = props.view.toLowerCase().split(' ');
  return {
    top: matrix[0].split(''),
    middle: matrix[1].split(''),
    bottom: matrix[2].split(''),
  };
});

// Watch

// Hooks

// Methods
function update(part, key, value) {
  switch (part) {
    case 'left':
      left.value[key] = value;
      break;
    case 'right':
      right.value[key] = value;
      break;
    case 'header':
      header.value[key] = value;
      break;
    case 'footer':
      footer.value[key] = value;
  }
}

provide(BaseSectionKey, {
  rootSize,
  initialized,
  rows,
  left,
  right,
  header,
  footer,
  update,
});
</script>

<style scoped lang="scss">
.base-section {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
}

</style>

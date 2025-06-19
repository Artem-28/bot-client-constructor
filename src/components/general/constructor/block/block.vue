<template>
  <div class="block" :style="style">
    <block-header
      @mousedown="dragStart"
    />
    {{ block.id }}
    <component :is="component" :block="block" />
  </div>
</template>

<script setup>
import { computed, defineAsyncComponent, inject, ref } from 'vue';
import BlockHeader from 'components/general/constructor/block/block-header/block-header';

// Props
const props = defineProps({
  block: {
    type: Object,
    required: true,
  },
});

// Emits

// Variables

// Reactive variables
const position = ref({ x: props.block.x, y: props.block.y });
const dragging = ref(false);
const startPosition = ref({ x: 0, y: 0 });
const scene = inject('scene');

// Composition
const component = computed(() => defineAsyncComponent(() => import(`./types/${props.block.type}/${props.block.type}`)));
const style = computed(() => {
  const { x, y } = position.value;
  const s = {
    left: `${x}px`,
    top: `${y}px`,
  };
  return s;
});

// Computed

// Watch

// Hooks

// Methods
function dragStart(e) {
  dragging.value = true;

  if (window.getSelection) {
    window.getSelection().removeAllRanges();
  }
  if (document.selection) {
    document.selection.empty();
  }

  startPosition.value = {
    x: e.clientX - position.value.x,
    y: e.clientY - position.value.y,
  };

  scene.value.addEventListener('mousemove', dragMove);
  window.addEventListener('mouseup', dragEnd);
}
function dragEnd(e) {
  dragging.value = false;

  scene.value.removeEventListener('mousemove', dragMove);
  window.removeEventListener('mouseup', dragEnd);
}
function dragMove(e) {
  if (!dragging.value) return;

  position.value = {
    x: e.clientX - startPosition.value.x,
    y: e.clientY - startPosition.value.y,
  };
}
</script>

<style scoped lang="scss">
.block {
  position: absolute;
  width: 200px;
  height: 200px;
  border: 1px solid black;
}
</style>

<template>
  <div>
    <span v-text="label" />
    <span v-text="zoom" />
    <q-btn-group>
      <q-btn icon="remove" @click="zoomOut1" />
      <q-btn icon="add" @click="zoomIn1" />
    </q-btn-group>
  </div>
</template>

<script setup>

// Props
import { computed } from 'vue';
import { useZoom } from 'components/general/constructor/composables';

const props = defineProps({
  modelValue: {
    type: Number,
    default: 1,
  },
});
// Emits
const emits = defineEmits(['update:modelValue']);

// Variables
const step = 0.05;
const min = 0.25;
const max = 2;

// Reactive variables
const { zoom, zoomOut, zoomIn } = useZoom();

// Composition

// Computed
const label = computed(() => `${Math.round(props.modelValue * 100)}%`);

// Watch

// Hooks

// Methods
function zoomOut1() {
  zoomOut();
  const value = Math.round((props.modelValue - step) * 100) / 100;
  if (value < min) return;
  emits('update:modelValue', value);
}
function zoomIn1() {
  zoomIn();
  const value = Math.round((props.modelValue + step) * 100) / 100;
  if (value > max) return;
  emits('update:modelValue', value);
}
</script>

<style scoped lang="scss">

</style>

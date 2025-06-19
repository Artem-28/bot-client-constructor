<template>
  <div class="constructor">
    <constructor-scene />
    <zoom-control v-model="zoom" class="constructor__zoom" />
  </div>
</template>

<script setup>

// Props

// Emits

// Variables
import { useConstructor } from 'components/general/constructor/composables';
import { onBeforeMount, provide, ref } from 'vue';
import ZoomControl from 'components/general/constructor/zoom-control/zoom-control';
import ConstructorScene from 'components/general/constructor/constructor-scene/constructor-scene';

const constructor = useConstructor();

// Reactive variables
const scene = ref(null);
const zoom = ref(1);

provide('scene', scene);
// Composition

// Computed

// Watch

// Hooks
onBeforeMount(async () => {
  await constructor.getBlocks();
});

// Methods
</script>

<style scoped lang="scss">
.constructor {
  height: 100%;
  position: relative;
  &__zoom {
    position: absolute;
    top: 0;
    right: 0;
  }
}
</style>

<template>
  <div
    ref="root"
    class="scene"
    tabindex="0"
    @scroll="scrollHandle"
    @mousedown="grabStart"
  >
    <div :style="style" class="scene__content">

    </div>
  </div>
</template>

<script setup>
import { useZoom } from 'components/general/constructor/composables';
import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue';

// Props

// Emits

// Variables
const offset = { x: 300, y: 300 };

// Reactive variables
const { zoom } = useZoom();
const root = ref(null);
const rootW = ref(0);
const rootH = ref(0);
const size = ref({ w: 0, h: 0 });
const isSpacePressed = ref(false);
const grabbing = ref(false);
const grabPossition = ref({ x: 0, y: 0 });

// Composition

// Computed
const style = computed(() => {
  const s = {
    transform: `scale(${zoom.value}) translate(${0}%, ${0}%)`,
    height: `${size.value.h}px`,
    width: `${size.value.w}px`,
  };

  if (isSpacePressed.value) s.cursor = 'grab';
  if (grabbing.value) s.cursor = 'grabbing';

  return s;
});

// Watch

// Hooks
onMounted(() => {
  init();

  root.value.addEventListener('keydown', keyHandle);
  root.value.addEventListener('keyup', keyHandle);
});
onUnmounted(() => {
  root.value.removeEventListener('keydown', keyHandle);
  root.value.removeEventListener('keyup', keyHandle);
});

// Methods
async function init() {
  await nextTick();
  const { width, height } = root.value.getBoundingClientRect();
  rootW.value = width;
  rootH.value = height;

  calcSize();
}
function calcSize() {
  size.value.w = rootW.value + offset.x;
  size.value.h = rootH.value + offset.y;
}
function scrollHandle() {
  const { scrollTop, scrollLeft } = root.value;

  let height = scrollTop + rootH.value + offset.y;
  if (height < rootH.value) height = rootH.value;

  let width = scrollLeft + rootW.value + offset.x;
  if (width < rootW.value) width = rootW.value;

  size.value.w = width;
  size.value.h = height;
}
function keyHandle(e) {
  if (e.code !== 'Space') return;

  e.preventDefault();

  if (e.type === 'keydown') isSpacePressed.value = true;
  if (e.type === 'keyup') isSpacePressed.value = false;
}
function grabStart(e) {
  if (!isSpacePressed.value) return;

  grabbing.value = true;

  grabPossition.value.x = e.clientX;
  grabPossition.value.y = e.clientY;

  window.addEventListener('mouseup', grabStop);
  window.addEventListener('mousemove', grabMove);
}
function grabStop() {
  grabbing.value = false;
  window.removeEventListener('mouseup', grabStop);
  window.removeEventListener('mousemove', grabMove);
}
function grabMove(e) {
  const x = grabPossition.value.x - e.clientX;
  const y = grabPossition.value.y - e.clientY;
  console.log('move', x);
  root.value.scrollBy(x, y);

  grabPossition.value.x = e.clientX;
  grabPossition.value.y = e.clientY;
}
</script>

<style scoped lang="scss">
.scene {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: auto;
  &:focus {
    outline: none;
  }
  &__content {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }
}
</style>

<template>
  <div v-if="canInstance" class="base-drawer-container">
    <aside :class="rootClasses" :style="rootStyle">
      <slot />
    </aside>
  </div>
</template>

<script setup>
import { computed, inject, ref, watch } from 'vue';
import { BaseSectionKey } from 'src/utils/symbols.util';
import { hClasses } from 'src/helpers/h-classes.helper';
import { useModelToggleEmits, useTimeout, useToggle } from 'src/composable';

// Props
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  side: {
    type: String,
    default: 'left',
    validator: (v, props) => ['left', 'right'].includes(v),
  },
  width: {
    type: [String, Number],
    default: 300,
  },
  fill: {
    type: Boolean,
    default: false,
  },
  overlay: {
    type: Boolean,
    default: false,
  },
  animationDuration: {
    type: [String, Number],
    default: 300,
  },
});

// Emits
const emit = defineEmits([...useModelToggleEmits]);

// Variables
const instance = inject(BaseSectionKey, null);
const canInstance = instance !== null;

// Reactive variables
const duration = parseInt(String(props.animationDuration));
const animated = ref(false);
const showing = ref(props.modelValue);

// Composition
useToggle({ showing, showHandle, hideHandle });
const timeout = useTimeout(onTimeout, duration);

// Computed
const isRightSide = computed(() => props.side === 'right');
const stateDirection = computed(() => isRightSide.value ? 1 : -1);
const onSection = computed(() => !props.overlay && showing.value);

const headerSlot = computed(() => {
  const matrix = instance.rows.value.top;
  return isRightSide.value ? matrix[2] === 'r' : matrix[0] === 'l';
});

const size = computed(() => {
  if (props.fill) {
    return instance.rootSize.value.width;
  }
  return parseInt(String(props.width));
});
const flagContentPosition = ref(stateDirection.value * size.value);

const rootClasses = computed(() => {
  const classes = hClasses('base-drawer');

  classes.mixin().append(props.side);

  return classes.value();
});

const rootStyle = computed(() => {
  const styles = {
    width: `${size.value}px`,
    transform: `translateX(${flagContentPosition.value}px)`,
  };
  let height = instance.rootSize.value.height;

  if (animated.value) {
    styles.transition = `transform ${duration}ms, width ${duration}ms`;
  }

  if (instance.header.value.space && !headerSlot.value) {
    const offset = instance.header.value.size;
    styles.top = `${offset}px`;
    height -= offset;
  }
  styles.height = `${height}px`;
  return styles;
});

// Methods
function updateInstance(key, value) {
  instance.update(props.side, key, value);
}

function applyPosition(position) {
  if (position === undefined) {
    position = showing.value ? 0 : size.value;
    applyPosition(position);
  }
  flagContentPosition.value = position;
}

function onTimeout() {
  emit(showing.value ? 'show' : 'hide');
  animated.value = false;
}

function showHandle(noEvent) {
  applyPosition(0);
  updateInstance('duration', duration);
  updateInstance('space', onSection.value);
  updateInstance('size', size.value);
  updateInstance('show', true);
  if (noEvent) return;
  animated.value = true;
  timeout.restart();
}

function hideHandle(noEvent) {
  applyPosition(stateDirection.value * size.value);
  updateInstance('duration', duration);
  updateInstance('space', onSection.value);
  updateInstance('size', 0);
  updateInstance('show', false);
  if (noEvent) return;
  animated.value = true;
  timeout.restart();
}

// Watch
watch(instance.initialized, () => {
  showing.value ? showHandle(true) : hideHandle(true);
});

// Hooks
</script>

<style scoped lang="scss">
.base-drawer-container {
}
.base-drawer {
  position: absolute;
  top: 0;
  bottom: 0;
}

/* Left side prop */
.base-drawer--left.base-drawer {
  left: 0;
  transform: translateX(-100%);
}

/* RightSideProp */
.base-drawer--right.base-drawer {
  right: 0;
  transform: translateX(100%);
}

</style>

<template>
  <div class="avatar bg-color--primary" :style="mainStyle">
    <div v-if="hasImage">img</div>
    <span
      v-else
      v-text="abbreviation"
      class="text-uppercase text--bold text-color--white"
      :style="abbreviationStyle"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue';

// Props
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  size: {
    type: Number,
    default: 40,
  },
  square: {
    type: Boolean,
    default: false,
  },
  titleKey: {
    type: String,
    default: 'title',
  },
});
// Emits

// Variables

// Reactive variables

// Composition

// Computed
const hasImage = computed(() => false);
const titleParts = computed(() => {
  const title = props.item[props.titleKey];
  if (typeof title !== 'string') return [];

  const parts = title.split(' ');
  parts.splice(2, parts.length);
  return parts;
});
const abbreviation = computed(() => {
  let str = '';

  titleParts.value.forEach(item => {
    str += item[0];
  });

  return str;
});
const mainStyle = computed(() => {
  const s = {
    width: `${props.size}px`,
    height: `${props.size}px`,
  };
  if (props.rounded) s['border-radius'] = '50%';

  return s;
});
const abbreviationStyle = computed(() => {
  const fontSize = Math.round(props.size * 0.4);
  const s = {
    'font-size': `${fontSize}px`,
    'line-height': `${fontSize}px`,
  };
  if (props.square) s['border-radius'] = '10%';

  return s;
});
// Watch

// Hooks

// Methods
</script>

<style lang="scss" scoped>
.avatar {
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
}
</style>

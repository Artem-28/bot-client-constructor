<template>
  <button :class="rootClasses">
    <div class="base-icon-btn__content">
      <q-icon v-if="icon" :name="icon" />
    </div>
  </button>
</template>

<script setup>
import { computed } from 'vue';
import { hClasses } from 'src/helpers/h-classes.helper';

const props = defineProps({
  icon: {
    type: String,
    required: false,
  },
  active: {
    type: Boolean,
    default: false,
  },
});

const rootClasses = computed(() => {
  const classes = hClasses('base-icon-btn');
  if (props.active) classes.mixin().append('active');
  return classes.value();
});

</script>

<style scoped lang="scss">
.base-icon-btn {
  color: $primary;
  font-size: 24px;
  padding: 0;
  margin: 0;
  background: none;
  cursor: pointer;
  outline: none;
  border: none;
  width: fit-content;
  height: fit-content;
  &__content {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #9A9AB0;
    width: fit-content;
    height: fit-content;
    transition: all 0.3s;
  }
  &:hover {
    .base-icon-btn__content {
      color: currentColor;
    }
  }
}
.base-icon-btn--active {
  .base-icon-btn__content {
    color: currentColor !important;
  }
}
</style>

<template>
  <q-dialog v-model="modelDialog" persistent>
    <div class="base-dialog-wrap">
      <div class="base-dialog">
        <slot name="icon">
          <q-icon v-if="icon" :name="icon" size="64px" color="primary" />
        </slot>

        <slot name="title">
          <span v-if="title" v-text="title" class="font-24 text-bold" />
        </slot>

        <slot />

        <slot name="actions"></slot>
      </div>
    </div>
  </q-dialog>
</template>

<script setup>
import { computed } from 'vue';

// Props
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    required: false,
  },
  icon: {
    type: String,
    required: false,
  },
});

// Emits
const emits = defineEmits(['update:modelValue', 'create:project']);

// Variables

// Reactive variables

// Composition

// Computed
const modelDialog = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emits('update:modelValue', value);
  },
});

// Watch

// Hooks

// Methods
</script>

<style scoped lang="scss">
.base-dialog-wrap {
  max-width: 326px;
  width: 100%;
}
.base-dialog {
  height: 100%;
  width: 100%;
  padding: 24px 16px;
  background-color: $bg-primary;
  display: flex;
  flex-direction: column;
  gap: 32px;
  border-radius: 8px;
  align-items: center;
}
</style>

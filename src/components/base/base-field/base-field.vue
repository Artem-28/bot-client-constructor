<template>
  <div class="base-field">
    <div v-if="label" class="base-field__label">
      <span v-text="label" />
      <span v-if="required" v-text="`*`" class="base-field__label__required" />
    </div>
    <slot />
  </div>
</template>

<script setup>
defineProps({
  label: {
    type: String,
    required: false,
  },
  required: {
    type: Boolean,
    default: false,
  },
});
</script>

<style lang="scss" scoped>
.base-field {
  display: flex;
  flex-direction: column;
  gap: 8px;
  &__label {
    font-weight: 700;
    font-size: 16px;
    padding: 0 16px;
    display: flex;
    gap: 4px;
    align-items: center;
    line-height: 20px;
    &__required {
      color: #ff0000;
    }
  }
}
</style>

<template>
  <div class="base-form">
    <slot />
  </div>
</template>

<script setup>
import { useValidateForm } from 'src/composable';

defineProps({
  form: {
    type: Object,
    required: true,
  },
});

useValidateForm();

</script>

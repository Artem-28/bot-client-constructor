<template>
  <q-btn v-bind="$props" @click="onclick">
    <slot />
  </q-btn>
</template>

<script setup>
import { inject } from 'vue';
import { BaseFormKey } from 'src/utils/symbols.util';

const form = inject(BaseFormKey, null);

const emit = defineEmits(['click']);

function validate() {
  if (!form) return;
  return form.validate.value.$validate();
}

function touch() {
  if (!form) return false;
  form.validate.value.$touch();
}

function submit() {
  if (!form) return false;
  form.submit();
}

async function onclick(e) {
  emit('click', e);
  const isValid = await validate();
  if (!isValid) {
    touch();
    return;
  }
  submit();
}
</script>

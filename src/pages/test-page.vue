<template>
  <base-form :form="form">
    <base-form-field
      v-model="form.password"
      field="password"
      rules="password"
    />
    <base-form-field
      v-model="form.confirmPassword"
      field="confirmPassword"
      rules="confirmPassword"
    />
  </base-form>
</template>

<script setup>
import { ref } from 'vue';
import BaseForm from 'components/base/base-form/base-form';
import BaseFormField from 'components/base/base-form/base-form-field';

const form = ref({
  password: '',
  confirmPassword: '',
});
</script>

<style scoped>

</style>

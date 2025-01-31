<template>
  <base-form :form="form">
    <base-form-field
      v-model="form.name"
      field="name"
      rules="registrationCode"
    />
  </base-form>
</template>

<script setup>
import { ref } from 'vue';
import BaseForm from 'components/base/base-form/base-form';
import BaseFormField from 'components/base/base-form/base-form-field';

const form = ref({
  name: '',
});
</script>

<style scoped>

</style>

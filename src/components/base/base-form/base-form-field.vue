<template>
  <base-field :label="label" :required="required">
    <q-input
      v-model="model"
      outlined
      :placeholder="placeholder"
      :error="isError"
      @blur="onblur"
      :error-message="errorMessage"
      :loading="loading"
    >
      <template v-if="checkIcon" v-slot:append>
        <q-icon name="check" color="positive" />
      </template>
    </q-input>
  </base-field>
</template>

<script setup>
import BaseField from 'components/base/base-field/base-field';
import { computed, inject, onUnmounted } from 'vue';
import { BaseFormKey } from 'src/utils/symbols.util';
import { toArray } from 'src/utils/array.util';

const props = defineProps({
  modelValue: {
    type: [String, Number, null],
    required: true,
  },
  field: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: false,
  },
  required: {
    type: Boolean,
    default: false,
  },
  placeholder: {
    type: String,
    required: false,
  },
  rules: {
    type: [String, Array],
    required: false,
  },
});

const form = inject(BaseFormKey, null);
const emit = defineEmits(['update:modelValue', 'blur']);

const model = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  },
});

const validate = computed(() => {
  if (!form) return {};
  return form.validate.value[props.field];
});

const loading = computed(() => {
  return validate.value?.$pending;
});

const isError = computed(() => {
  return !loading.value && validate.value?.$error;
});

const checkIcon = computed(() => {
  return validate.value && Object.prototype.hasOwnProperty.call(validate.value, 'asyncValidator') &&
    !loading.value && !isError.value && !validate.value?.$invalid;
});

const errorMessage = computed(() => {
  const messages = toArray(validate.value?.$errors).map(error => error.$message);
  if (messages.length === 0) return '';
  return messages[0];
});

function onblur(e) {
  emit('blur', e);
  validate.value.$touch();
}

if (form) {
  const instance = {
    rules: computed(() => {
      const rules = toArray(props.rules);
      if (props.required && !rules.includes('required')) {
        rules.push('required');
      }
      return rules;
    }),
  };
  form.registrationField(props.field, instance);
  onUnmounted(() => {
    form.destroyField(props.field);
  });
}
</script>

<style scoped>

</style>

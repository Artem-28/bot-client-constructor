<template>
  <div class="base-form">
    <slot />
  </div>
</template>

<script setup>
import { computed, provide, reactive } from 'vue';
import { BaseFormKey } from 'src/utils/symbols.util';
import useVuelidate from '@vuelidate/core';
import { formRules } from 'boot/form-rules';

const props = defineProps({
  form: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['submit']);
const rulesKey = reactive({});

const rules = computed(() => {
  const data = {};
  Object.entries(rulesKey).forEach(([name, keys]) => {
    data[name] = getRules(keys);
  });
  return data;
});

const validate = useVuelidate(rules, props.form);

function getRules(rulesKey) {
  return rulesKey.reduce((acc, key) => {
    if (!Object.prototype.hasOwnProperty.call(formRules, key)) return acc;
    const rules = formRules[key];
    if (Object.prototype.hasOwnProperty.call(rules, '$params')) {
      acc[key] = rules;
      return acc;
    }
    return { ...acc, ...formRules[key] };
  }, {});
}

function registrationField(name, field) {
  rulesKey[name] = field.rules;
}

function destroyField(name) {
  delete rulesKey[name];
}

function submit() {
  emit('submit', props.form);
}

const instance = {
  registrationField,
  destroyField,
  submit,
  validate,
};

provide(BaseFormKey, instance);
</script>

<style scoped lang="scss">
</style>

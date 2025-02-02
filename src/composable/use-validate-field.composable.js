import { computed, getCurrentInstance, inject, onUnmounted } from 'vue';
import { BaseFormKey } from 'src/utils/symbols.util';
import { toArray } from 'src/utils/array.util';

function useValidateField() {
  const { props } = getCurrentInstance();
  const form = inject(BaseFormKey, null);

  const rules = computed(() => {
    const rules = toArray(props.rules);
    if (props.required && !rules.includes('required')) {
      rules.push('required');
    }
    return rules;
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

  const asyncCheck = computed(() => {
    return validate.value && Object.prototype.hasOwnProperty.call(validate.value, 'asyncValidator') &&
      !loading.value && !isError.value && !validate.value?.$invalid && validate.value.$dirty;
  });

  const errorMessage = computed(() => {
    const messages = toArray(validate.value?.$errors).map(error => error.$message);
    if (messages.length === 0) return '';
    return messages[0];
  });

  function touch() {
    if (!validate.value) return;
    validate.value.$touch();
  }

  if (form) {
    form.registrationField(props.field, { rules });
    onUnmounted(() => {
      form.destroyField(props.field);
    });
  }

  return {
    isError,
    loading,
    errorMessage,
    asyncCheck,
    touch,
  };
}

export default useValidateField;

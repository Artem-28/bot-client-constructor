<template>
  <base-field :label="label" :required="required">
    <q-input
      v-model="model"
      outlined
      :placeholder="placeholder"
      :error="isError"
      :type="localTypeField"
      @blur="onblur"
      :error-message="errorMessage"
      :loading="loading"
    >
      <template v-slot:append>
        <q-icon v-if="asyncCheck" name="check" color="positive" />
        <q-checkbox
          v-if="toggleVisible"
          v-model="localTypeField"
          dense
          true-value="text"
          false-value="password"
          checked-icon="visibility"
          unchecked-icon="visibility_off"
          size="48px"
        />
      </template>
    </q-input>
  </base-field>
</template>

<script setup>
import BaseField from 'components/base/base-field/base-field';
import { ref, useModel } from 'vue';
import { useValidateField } from 'src/composable';

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
  type: {
    type: String,
    default: 'text',
  },
  toggleVisible: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['update:modelValue', 'blur']);

const { isError, loading, errorMessage, asyncCheck, touch } = useValidateField();

const localTypeField = ref(props.type);

const model = useModel(props, 'modelValue');

function onblur(e) {
  emit('blur', e);
  touch();
}
</script>

<style scoped>

</style>

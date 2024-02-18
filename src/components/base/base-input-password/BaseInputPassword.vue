<template>
  <q-input
    v-model="model"
    :outlined="outlined"
    :placeholder="placeholder"
    :error-message="errorMessage"
    :error="error"
    :type="inputType"
    @blur="emit('blur')"
    class="base-input-password"
  >
    <template v-slot:append>
      <q-btn
        round
        dense
        flat
        :icon="btnIcon"
        class="base-input-password__toggle-btn"
        @click="toggle"
      />
    </template>
  </q-input>
</template>

<script setup lang="ts">
import { computed, defineEmits, defineProps, withDefaults } from 'vue';

/* Composition */
// import you composition api...
import useToggle from 'src/composition/use-toggle';
import useModel from 'src/composition/use-model';

/* Components */
// import you components...

/* Types */
// declare components component...
interface Props {
  modelValue?: string;
  label?: string;
  placeholder?: string;
  outlined?: boolean;
  error?: boolean;
  errorMessage?: string | null
}
interface Emit {
  (e: 'update:modelValue', value: string): void;
  (e: 'blur'): void;
}

/* Props */
// property default value...
const props = withDefaults(defineProps<Props>(), {
  outlined: false,
  error: false,
  errorMessage: null
});

/* Emits */
const emit = defineEmits<Emit>();
/* Data */
// declare reactive variables...

/* Composition */
// declare you composition api...
const model = useModel<Props, Emit>(props, emit, 'modelValue');
const { isToggle, toggle } = useToggle(false);

/* Life hooks */
// life cycle hooks...

/* Computed */
// you computational properties...
const btnIcon = computed(() => isToggle.value ? 'visibility' : 'visibility_off');
const inputType = computed(() => isToggle.value ? 'text' : 'password');

/* Methods */
// promote your methods...
</script>

<style scoped lang="scss">
/* Variables */
// declare you variables scss...

/* Selector */
// style component...
.base-input-password {
  &__toggle-btn {
    transition: color 0.2s;
  }
  &__toggle-btn:hover {
    color: $primary;
  }
}
</style>

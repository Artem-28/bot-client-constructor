<template>
  <q-dialog v-model="modelDialog" persistent>
    <div class="base-dialog-wrap">
      <div class="base-dialog bg-system--primary">
        <slot name="icon">
          <q-icon v-if="icon" :name="icon" size="64px" color="primary" />
        </slot>

        <slot name="title">
          <span v-if="title" v-text="title" class="text--xl text--bold text-center" />
        </slot>

        <slot :data="confirm?.data?.value" />

        <slot name="actions">
          <div v-if="hasActions" class="base-dialog__actions">
            <q-btn
              v-if="accept"
              :label="accept"
              color="primary"
              unelevated
              no-caps
              @click="onAccept"
            />
            <q-btn
              v-if="cancel"
              :label="cancel"
              color="primary"
              unelevated
              no-caps
              outline
              @click="onCancel"
            />
          </div>
        </slot>
      </div>
    </div>
  </q-dialog>
</template>

<script setup>
import { computed, inject, ref } from 'vue';

// Props
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    required: false,
  },
  confirmKey: {
    type: String,
  },
  icon: {
    type: String,
    required: false,
  },
  accept: {
    type: String,
    required: false,
  },
  cancel: {
    type: String,
    required: false,
  },
  acceptFn: {
    type: Function,
    required: false,
  },
  cancelFn: {
    type: Function,
    required: false,
  },
  sync: {
    type: Boolean,
    default: false,
  },
});

// Emits
const emits = defineEmits(['update:modelValue', 'accept', 'cancel']);

// Variables
const confirm = inject(props.confirmKey, null);

// Reactive variables
const loading = ref(false);

// Composition

// Computed
const modelDialog = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emits('update:modelValue', value);
  },
});
const hasActions = computed(() => !!(props.accept || props.cancel));

// Watch

// Hooks

// Methods
async function fnHandle(fn) {
  if (!fn || typeof fn !== 'function') return;
  loading.value = true;
  const data = confirm?.data?.value;
  props.sync ? await fn(data) : fn(data);
  loading.value = false;
}
async function onAccept() {
  await fnHandle(props.acceptFn);
  if (confirm) {
    confirm.accept();
  }
  emits('confirm');
}

async function onCancel() {
  await fnHandle(props.cancelFn);
  if (confirm) {
    confirm.cancel();
  }
  emits('cancel');
}
</script>

<style scoped lang="scss">
.base-dialog-wrap {
  max-width: 326px;
  width: 100%;
}
.base-dialog {
  height: 100%;
  width: 100%;
  padding: 24px 16px;
  display: flex;
  flex-direction: column;
  gap: 32px;
  border-radius: 8px;
  align-items: center;
  &__actions {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
  }
}
</style>

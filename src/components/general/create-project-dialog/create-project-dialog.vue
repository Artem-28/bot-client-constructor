<template>
  <q-dialog v-model="modelDialog" persistent>
    <div class="create-project">
      <div class="create-project__content">
        <span v-text="$t('page.create_project.title')" class="font-24 text-bold" />
        <base-form
          :form="form"
          class="create-project-form"
          @submit="onsubmit"
        >
          <base-form-input
            v-model="form.title"
            dense
            field="title"
            :rules="['required']"
            :label="$t('field.label.project_title')"
            :placeholder="$t('field.placeholder.project_title')"
          />

          <div class="create-project-form__actions">
            <q-btn
              v-close-popup
              :label="$t('button.cancel')"
              color="primary"
              outline
              unelevated
              no-caps
              class="text-bold full-width"
            />
            <base-form-submit-btn
              :label="$t('button.create')"
              color="primary"
              unelevated
              no-caps
              :loading="loading"
              class="text-bold full-width"
            />
          </div>
        </base-form>
      </div>
    </div>
  </q-dialog>
</template>

<script setup>
import BaseFormInput from 'components/base/base-form/base-form-input/base-form-input';
import BaseFormSubmitBtn from 'components/base/base-form/base-form-submit-btn/base-form-submit-btn';
import BaseForm from 'components/base/base-form/base-form';
import { computed, ref } from 'vue';
import useApi from 'src/api';

// Props
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
});

// Emits
const emits = defineEmits(['update:modelValue', 'create:project']);

// Variables
const api = useApi();

// Reactive variables
const form = ref({
  title: '',
});
const loading = ref(false);
// Composition

// Computed
const modelDialog = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emits('update:modelValue', value);
    if (!value) resetForm();
  },
});

// Watch

// Hooks

// Methods
async function onsubmit() {
  loading.value = true;
  try {
    const payload = {
      title: form.value.title,
    };
    const { data } = await api.createProject(payload);
    modelDialog.value = false;
    emits('create:project', data);
  } catch (e) {}

  loading.value = false;
}
function resetForm() {
  form.value.title = '';
}
</script>

<style lang="scss" scoped>
.create-project {
  max-width: 376px;
  width: 100%;
  &__content {
    height: 100%;
    width: 100%;
    padding: 24px 16px;
    background-color: $bg-primary;
    display: flex;
    flex-direction: column;
    gap: 32px;
    border-radius: 8px;
  }
}
.create-project-form {
  display: flex;
  flex-direction: column;
  gap: 4px;
  &__actions {
    display: flex;
    width: 100%;
    gap: 4px;
    margin-top: 8px;
  }
}
</style>

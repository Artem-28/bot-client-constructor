<template>
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
      <base-form-submit-btn
        :label="$t('button.create')"
        color="primary"
        unelevated
        no-caps
        :loading="loading"
        class="text-bold full-width"
      />
      <q-btn
        v-close-popup
        :label="$t('button.cancel')"
        color="primary"
        outline
        unelevated
        no-caps
        class="text-bold full-width"
      />
    </div>
  </base-form>
</template>

<script setup>
import BaseFormInput from 'components/base/base-form/base-form-input/base-form-input';
import BaseFormSubmitBtn from 'components/base/base-form/base-form-submit-btn/base-form-submit-btn';
import BaseForm from 'components/base/base-form/base-form';
import { ref } from 'vue';
import useApi from 'src/api';

// Props

// Emits
const emits = defineEmits(['create:project']);

// Variables
const api = useApi();

// Reactive variables
const form = ref({
  title: '',
});
const loading = ref(false);
// Composition

// Computed

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
    emits('create:project', data);
  } catch (e) {}

  loading.value = false;
}
</script>

<style lang="scss" scoped>
.create-project-form {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  &__actions {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 4px;
  }
}
</style>

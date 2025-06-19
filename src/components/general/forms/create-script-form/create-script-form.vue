<template>
  <base-form
    :form="form"
    class="create-scripts-form"
    @submit="onsubmit"
  >
    <base-form-input
      v-model="form.title"
      dense
      required
      field="title"
      :rules="['required']"
      :label="$t('field.label.script_title')"
      :placeholder="$t('field.placeholder.script_title')"
    />

    <div class="create-scripts-form__actions">
      <base-form-submit-btn
        :label="$t('button.create')"
        color="primary"
        unelevated
        no-caps
        :loading="loading"
        class="text--bold full-width"
      />
      <q-btn
        v-close-popup
        :label="$t('button.cancel')"
        color="primary"
        outline
        unelevated
        no-caps
        class="text--bold full-width"
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
import { useProjectStore } from 'src/stores';

// Props

// Emits
const emits = defineEmits(['create:scripts']);

// Variables
const api = useApi();
const projectStore = useProjectStore();

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
    const projectId = projectStore.project.id;
    const payload = {
      title: form.value.title,
    };
    const { data } = await api.createScript({ projectId, payload });
    emits('create:script', data);
  } catch (e) {}

  loading.value = false;
}
</script>

<style lang="scss" scoped>
.create-scripts-form {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  &__actions {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 8px;
  }
}
</style>

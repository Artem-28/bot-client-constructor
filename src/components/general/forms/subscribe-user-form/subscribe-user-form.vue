<template>
  <base-form
    :form="form"
    class="add-user-form"
    @submit="onsubmit"
  >
    <base-form-input
      v-model="form.email"
      dense
      required
      field="email"
      rules="email"
      :label="$t('field.label.email')"
      :placeholder="$t('field.placeholder.email')"
    />

    <div class="add-user-form__actions">
      <base-form-submit-btn
        :label="$t('button.add')"
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
const emits = defineEmits(['subscribe']);

// Variables
const projectStore = useProjectStore();
const api = useApi();

// Reactive variables
const form = ref({
  email: '',
});
const loading = ref(false);
// Composition

// Computed

// Watch

// Hooks

// Methods
async function onsubmit() {
  loading.value = true;
  const projectId = projectStore.project.id;
  try {
    const payload = {
      email: form.value.email,
    };
    const { data } = await api.addSubscriber({ projectId, payload });
    emits('subscribe', data);
  } catch (e) {}

  loading.value = false;
}
</script>

<style lang="scss" scoped>
.add-user-form {
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

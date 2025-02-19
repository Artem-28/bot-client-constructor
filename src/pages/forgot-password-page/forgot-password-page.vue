<template>
  <div class="forgot-password-page">
    <header class="forgot-password-page__header">
      <h1 v-text="$t('page.forgot_password.title')" class="forgot-password-page__title"/>
    </header>
    <div v-if="!sent" class="forgot-password-page__content">
      <span v-text="$t('page.forgot_password.desc')" class="text-color--gray q-mb-md" />
      <base-form :form="form" class="full-width full-height flex column" @submit="onsubmit">
        <base-form-input
          v-model="form.email"
          field="email"
          rules="email"
          required
          :label="$t('field.label.email')"
          :placeholder="$t('field.placeholder.email')"
        />
        <base-form-submit-btn
          :label="$t('button.next')"
          color="primary"
          padding="12px"
          unelevated
          no-caps
          :loading="loading"
          class="forgot-password-page__submit text-bold full-width"
        />
      </base-form>
    </div>
    <div v-else class="forgot-password-page__sent-desc text-color--gray">
      <span v-text="$t('page.forgot_password.sent_desc')" />
      <span v-text="` ${form.email}`" class="text-color--primary text-bold" />
    </div>
  </div>
</template>

<script setup>
import { BaseForm, BaseFormSubmitBtn, BaseFormInput } from 'components/base/base-form';
import { ref } from 'vue';
import useApi from 'src/api';

const api = useApi();

const form = ref({
  email: '',
});
const sent = ref(false);
const loading = ref(false);

async function onsubmit() {
  loading.value = true;
  try {
    const payload = { destination: form.value.email };
    await api.resetPasswordMessage(payload);
    sent.value = true;
  } catch (e) {}
  loading.value = false;
}
</script>

<style lang="scss" scoped>
.forgot-password-page {
  margin: auto 8px;
  box-sizing: border-box;
  padding: 0 calc(50% - 234px);
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 466px;
  &__header {
    display: flex;
    width: 100%;
    justify-content: center;
  }
  &__title {
    font-size: 30px;
    font-weight: 700;
    line-height: 30px;
    margin: 0;
    padding: 0;
  }
  &__content {
    margin-top: 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    gap: 16px;
    height: 100%;
  }
  &__sent-desc {
    margin-top: 32px;
    text-align: center;
  }
  &__submit {
    margin: auto 0 48px 0;
    height: fit-content;
  }
}

</style>

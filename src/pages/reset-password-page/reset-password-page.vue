<template>
  <div class="reset-password-page">
    <header class="reset-password-page__header">
      <h1 v-text="$t('page.reset_password.header')" class="reset-password-page__title"/>
    </header>
    <base-form :form="form" class="reset-password-page__form">
      <base-form-input
        v-model="form.password"
        field="password"
        rules="password"
        type="password"
        required
        :label="$t('field.label.new_password')"
        :placeholder="$t('field.placeholder.new_password')"
      />
      <base-form-input
        v-model="form.confirmPassword"
        field="confirmPassword"
        type="password"
        rules="confirmPassword"
        required
        toggle-visible
        :label="$t('field.label.confirm_password')"
        :placeholder="$t('field.placeholder.confirm_password')"
      />
      <base-form-submit-btn
        :label="$t('button.save')"
        color="primary"
        padding="12px"
        unelevated
        no-caps
        class="reset-password-page__submit text-bold full-width"
      />
    </base-form>
  </div>
</template>

<script setup>
import { BaseForm, BaseFormInput, BaseFormSubmitBtn } from 'components/base/base-form';
import { ref } from 'vue';

const form = ref({
  password: '',
  confirmPassword: '',
});
</script>

<style lang="scss" scoped>
.reset-password-page {
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
  &__form {
    margin-top: 32px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 4px;
    height: 100%;
    width: 100%;
  }
  &__submit {
    margin: auto 0 48px 0;
  }
}

</style>

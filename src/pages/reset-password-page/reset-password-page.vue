<template>
  <div class="reset-password-page-wrap">
    <div class="reset-password-page">
      <h1
        v-text="$t('page.reset_password.header')"
        class="reset-password-page__header"
      />
      <div class="reset-password-page__content full-width">
        <base-form class="reset-password-page__content__form">
          <base-field :label="$t('field.label.new_password')">
            <q-input
              v-model="password"
              outlined
              :placeholder="$t('field.placeholder.new_password')"
            />
          </base-field>
          <base-field :label="$t('field.label.confirm_password')">
            <q-input
              v-model="confirmPassword"
              outlined
              :placeholder="$t('field.placeholder.confirm_password')"
            />
          </base-field>
        </base-form>
        <q-btn
          :label="$t('button.save')"
          color="primary"
          padding="12px"
          unelevated
          no-caps
          class="reset-password-page__content__save text-bold full-width"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import BaseForm from 'components/base/base-form/base-form';
import BaseField from 'components/base/base-field/base-field';
import { ref } from 'vue';

const password = ref('');
const confirmPassword = ref('');
</script>

<style lang="scss" scoped>
.reset-password-page-wrap {
  margin: 0 auto;
  width: 100%;
  max-width: 500px;
  padding: 24px;
  height: inherit;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.reset-password-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  gap: 16px;
  height: 472px;
  &__header {
    font-size: 30px;
    font-weight: 700;
    line-height: 30px;
    margin: 0 0 16px;
  }
  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    gap: 16px;
    height: 100%;
    &__form {
      display: flex;
      flex-direction: column;
      width: 100%;
      gap: 24px;
    }
    &__save {
      margin: auto 0 64px 0;
    }
  }
  &__sent-desc {
    text-align: center;
  }
}

</style>

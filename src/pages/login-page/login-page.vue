<template>
  <div class="login-page-wrap">
    <div class="login-page">
      <h1
        v-text="$t('page.login.header')"
        class="login-page__header"
      />
      <base-form class="login-page__form">
        <base-field :label="$t('field.label.email')">
          <q-input
            v-model="email"
            outlined
            :placeholder="$t('field.placeholder.email')"
          />
        </base-field>
        <base-field :label="$t('field.label.password')">
          <q-input
            v-model="password"
            outlined
            :placeholder="$t('field.placeholder.password')"
          />
        </base-field>
      </base-form>
      <router-link to="/forgot_password" class="login-page__pass-link text-color--gray">
        <span v-text="$t('button.forgot_password')" />
      </router-link>
      <q-btn
        :label="$t('button.sign_in')"
        color="primary"
        padding="12px"
        unelevated
        no-caps
        class="login-page__sign_in text-bold full-width"
      />
      <div class="login-page__sign_up text-color--gray">
        <span v-text="$t('page.login.not_account')" />
        <router-link to="/sign_up" class="text-bold text-color--primary">
          <span v-text="$t('button.sign_up')" />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import BaseForm from 'components/base/base-form/base-form';
import BaseField from 'components/base/base-field/base-field';

const email = ref('');
const password = ref('');
</script>

<style lang="scss" scoped>
.login-page-wrap {
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
.login-page {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 16px;
  height: 472px;
  &__header {
    font-size: 30px;
    font-weight: 700;
    line-height: 30px;
    margin: 0 0 16px;
  }
  &__form {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 24px;
  }
  &__pass-link {
    font-weight: 700;
    margin-left: auto;
    transition: .3s;
    text-decoration: none;
    &:hover {
      color: $primary;
    }
  }
  &__sign_in {
    margin-top: auto;
  }
  &__sign_up {
    margin-top: 24px;
    display: flex;
    gap: 8px;
  }
}
</style>

<template>
  <div class="login-page">
    <header class="login-page__header">
      <h1 v-text="$t('page.login.title')" class="login-page__title"/>
    </header>
    <base-form
      :form="form"
      class="login-page__form"
      @submit="onsubmit"
    >
      <base-form-input
        v-model="form.email"
        field="email"
        :rules="['required', 'email']"
        :label="$t('field.label.email')"
        :placeholder="$t('field.placeholder.email')"
      />
      <base-form-input
        v-model="form.password"
        field="password"
        type="password"
        rules="required"
        toggle-visible
        :label="$t('field.label.password')"
        :placeholder="$t('field.placeholder.password')"
      />
      <router-link to="/forgot_password" class="login-page__pass-link text-color--gray">
        <span v-text="$t('button.forgot_password')" />
      </router-link>

      <base-form-submit-btn
        :label="$t('button.sign_in')"
        color="primary"
        padding="12px"
        unelevated
        no-caps
        :loading="loading"
        class="login-page__submit text-bold full-width"
      />
    </base-form>
    <div class="login-page__sign_up text-color--gray">
      <span v-text="$t('page.login.not_account')" />
      <router-link to="/sign_up" class="text-bold text-color--primary">
        <span v-text="$t('button.sign_up')" />
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { BaseFormInput, BaseForm, BaseFormSubmitBtn } from 'components/base/base-form';
import useApi from 'src/api';
import { useRouter } from 'vue-router';

const api = useApi();
const router = useRouter();

const form = ref({
  email: '',
  password: '',
});
const loading = ref(false);

async function onsubmit() {
  loading.value = true;
  try {
    await api.signIn(form.value);
    await router.push('/projects');
  } catch (e) {}

  loading.value = false;
}

</script>

<style lang="scss" scoped>
.login-page {
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
    width: 100%;
    height: 100%;
    gap: 4px;
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
  &__submit {
    margin-top: auto;
  }
  &__sign_up {
    margin-top: 24px;
    display: flex;
    gap: 8px;
  }
}
</style>

<template>
  <div class="login-page-wrap">
    <div class="login-page">
      <h1
        v-text="$t('page.login.header')"
        class="login-page__header"
      />
      <base-form
        :form="form"
        class="login-page__form"
        @submit="onsubmit"
      >
        <base-form-field
          v-model="form.email"
          field="email"
          :label="$t('field.label.email')"
          :placeholder="$t('field.placeholder.email')"
        />
        <base-form-field
          v-model="form.password"
          field="password"
          type="password"
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
          class="login-page__sign_in text-bold full-width"
        />
      </base-form>
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
import { BaseFormField, BaseForm, BaseFormSubmitBtn } from 'components/base/base-form';
import useApi from 'src/api';
import { useRouter } from 'vue-router';

const api = useApi();
const router = useRouter();
const form = ref({
  email: '',
  password: '',
});

async function onsubmit() {
  const response = await api.signIn(form.value);
  if (!response.success) return;
  await router.push('/main');
}

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

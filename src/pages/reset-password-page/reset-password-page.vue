<template>
  <div class="reset-password-page">
    <header class="reset-password-page__header">
      <h1 v-text="$t('page.reset_password.title')" class="reset-password-page__title"/>
    </header>
    <base-form :form="form" class="reset-password-page__form" @submit="onsubmit">
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
        :loading="loading"
        class="reset-password-page__submit text-bold full-width"
      />
    </base-form>
  </div>
</template>

<script setup>
import { BaseForm, BaseFormInput, BaseFormSubmitBtn } from 'components/base/base-form';
import { onBeforeMount, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import useApi from 'src/api';

const router = useRouter();
const route = useRoute();
const api = useApi();

const form = ref({
  password: '',
  confirmPassword: '',
});
const token = ref(null);
const loading = ref(false);

onBeforeMount(() => {
  token.value = getToken();
  if (!token.value) router.push('/login');
});

function getToken() {
  return route.query.token;
}
async function onsubmit() {
  loading.value = true;
  localStorage.setItem('accessToken', token.value);
  try {
    const payload = {
      password: form.value.password,
      confirmPassword: form.value.confirmPassword,
    };
    await api.resetPassword(payload);
    localStorage.setItem('accessToken', '');
    await router.push('/login');
  } catch (e) {
    localStorage.setItem('accessToken', '');
  }

  loading.value = false;
}
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

<template>
  <div class="sign-up-page">
    <header class="sign-up-page__header">
      <q-btn
        v-if="canBack"
        flat
        dense
        icon="arrow_back"
        color="primary"
        class="sign-up-page__back"
        @click="backStep"
      />
      <h1 class="sign-up-page__title" v-text="$t('page.sign_up.header')"/>
    </header>

    <base-form
      :form="form"
      class="sign-up-page__form"
      @submit="onsubmit"
    >
      <q-tab-panels v-model="step" class="full-width full-height">

        <q-tab-panel :name="1" class="sign-up-page__tab">
          <base-form-input
            v-model="form.name"
            field="name"
            required
            :label="$t('field.label.name')"
            :placeholder="$t('field.placeholder.name')"
          />
          <base-form-input
            v-model="form.email"
            field="email"
            rules="email"
            required
            :label="$t('field.label.email')"
            :placeholder="$t('field.placeholder.email')"
          />
          <q-checkbox v-model="form.licenseAgreement">
            <div class="sign-up-page__terms text-color--gray">
              <span v-text="$t('field.label.terms_of_service')" />
              <router-link
                to=""
                class="text-color--primary"
                target="_blank"
                @click.stop
              >
                <span v-text="$t('button.terms_of_service')" />
              </router-link>
            </div>
          </q-checkbox>
        </q-tab-panel>

        <q-tab-panel :name="2" class="sign-up-page__tab">
          <div class="sign-up-page__confirm-message text-color--gray">
            <span v-text="$t('page.sign_up.code_sent')" />
            <span v-text="` ${form.email}`" class="text-color--primary text-bold" />
          </div>
          <base-form-input
            v-model="form.code"
            field="code"
            rules="registrationCode"
            :label="$t('field.label.confirm_code')"
            :placeholder="$t('field.placeholder.confirm_code')"
          />
          <div v-if="running" class="sign-up-page__timer">
            <span v-text="$t('page.sign_up.timer_desc')" />
            <span v-text="time" class="text-color--primary text-bold" />
          </div>
          <q-btn
            v-else
            :label="$t('button.send_code')"
            outline
            color="primary"
            padding="12px"
            unelevated
            no-caps
            :loading="loading"
            class="text-bold"
            @click="sendConfirmMessage"
          />
        </q-tab-panel>

        <q-tab-panel :name="3" class="sign-up-page__tab">
          <base-form-input
            v-model="form.password"
            field="password"
            rules="password"
            type="password"
            :label="$t('field.label.password')"
            :placeholder="$t('field.placeholder.password')"
          />
          <base-form-input
            v-model="form.confirmPassword"
            field="confirmPassword"
            type="password"
            rules="confirmPassword"
            toggle-visible
            :label="$t('field.label.confirm_password')"
            :placeholder="$t('field.placeholder.confirm_password')"
          />
        </q-tab-panel>

      </q-tab-panels>
      <base-form-submit-btn
        :label="submitBtnLabel"
        color="primary"
        padding="12px"
        unelevated
        :loading="loading"
        no-caps
        class="sign-up-page__submit text-bold full-width"
      />
    </base-form>

    <div v-if="!canBack" class="sign-up-page__login text-color--gray">
      <span v-text="$t('page.sign_up.have_account')" />
      <router-link to="/login" class="text-bold text-color--primary">
        <span v-text="$t('button.sign_in')" />
      </router-link>
    </div>

  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { BaseForm, BaseFormSubmitBtn, BaseFormInput } from 'components/base/base-form';
import { useI18n } from 'vue-i18n';
import useApi from 'src/api';
import { useRouter } from 'vue-router';
import { useTimer } from 'src/composable';
import moment from 'moment';

const step = ref(1);
const form = ref({
  name: '',
  email: '',
  licenseAgreement: false,
  code: '',
  password: '',
  confirmPassword: '',
});
const loading = ref(false);
const codeLiveTime = ref(180000);

const { t } = useI18n();
const api = useApi();
const router = useRouter();

const { time, init, start, running } = useTimer({ format: 'mm:ss' });

const canBack = computed(() => step.value > 1);
const canNext = computed(() => step.value < 3);
const submitBtnLabel = computed(() => canNext.value ? t('button.next') : t('button.sign_up'));

function nextStep() {
  if (!canNext.value) return;
  step.value += 1;
}

function backStep() {
  if (!canBack.value) return;
  step.value -= 1;
}

async function sendConfirmMessage() {
  loading.value = true;
  const payload = { destination: form.value.email };
  try {
    const { data } = await api.signUpConfirmMessage(payload);
    if (!data) return;
    codeLiveTime.value = moment(data.liveAt) - moment();
    startTimer();
  } catch (e) {
    throw new Error(e);
  }
  loading.value = false;
}

async function registration() {
  loading.value = true;
  try {
    await api.signUp(form.value);
    const { email, password } = form.value;
    await api.signIn({ email, password });
    await router.push('/main');
  } catch (e) {
  }
  loading.value = false;
}

function startTimer() {
  init(codeLiveTime.value, 0);
  start();
}

async function onsubmit() {
  try {
    if (step.value === 1 && form.value.licenseAgreement) {
      await sendConfirmMessage();
      nextStep();
      return;
    }
    if (step.value === 2) {
      nextStep();
      return;
    }
    if (step.value === 3) {
      await registration();
    }
  } catch (e) {}
}
</script>

<style lang="scss" scoped>
.sign-up-page {
  margin: auto 8px;
  box-sizing: border-box;
  padding: 0 calc(50% - 234px);
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 466px;
  &__header {
    position: relative;
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
  &__back {
    position: absolute;
    top: 0;
    left: 0;
  }
  &__form {
    margin-top: 32px;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 356px;
  }
  &__tab {
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 4px;
    height: 100%;
  }
  &__login {
    margin-top: auto;
    display: flex;
    gap: 8px;
    width: 100%;
    justify-content: center;
  }
  &__terms {
    font-size: 14px;
  }
  &__confirm-message {
    margin-bottom: 20px;
    text-align: center;
  }
  &__submit {
    min-height: 48px !important;
  }
  &__timer {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>

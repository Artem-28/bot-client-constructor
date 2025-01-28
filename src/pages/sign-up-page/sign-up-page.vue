<template>
  <div class="sign-up-page-wrap">
    <div class="sign-up-page">
      <div class="sign-up-page__header">
        <q-btn
          v-if="step > 1"
          flat
          dense
          icon="arrow_back"
          color="primary"
          class="sign-up-page__header__back"
          @click="step--"
        />
        <h1 v-text="$t('page.sign_up.header')" class="sign-up-page__header__title" />
      </div>
      <q-tab-panels v-model="step" class="full-width full-height">
        <q-tab-panel :name="1" class="sign-up-page__tab sign-up-page__tab--first">
          <base-form class="sign-up-page__form">
            <base-field :label="$t('field.label.name')">
              <q-input
                v-model="name"
                outlined
                :placeholder="$t('field.placeholder.name')"
              />
            </base-field>
            <base-field :label="$t('field.label.email')">
              <q-input
                v-model="email"
                outlined
                :placeholder="$t('field.placeholder.email')"
              />
            </base-field>
            <q-checkbox v-model="terms" class="sign-up-page__form__terms">
              <div class="sign-up-page__form__terms__label text-color--gray">
                <span v-text="$t('field.label.terms_of_service')" />
                <router-link to="/terms_of_service" class="login-page__pass-link text-color--primary" target="_blank" @click.stop>
                  <span v-text="$t('button.terms_of_service')" />
                </router-link>
              </div>
            </q-checkbox>
          </base-form>
          <q-btn
            :label="$t('button.next')"
            color="primary"
            padding="12px"
            unelevated
            no-caps
            class="sign-up-page__sign-up text-bold full-width"
            @click="step = 2"
          />
          <div class="sign-up-page__login text-color--gray">
            <span v-text="$t('page.sign_up.have_account')" />
            <router-link to="/login" class="text-bold text-color--primary">
              <span v-text="$t('button.sign_in')" />
            </router-link>
          </div>
        </q-tab-panel>

        <q-tab-panel :name="2" class="sign-up-page__tab">
          <base-form class="sign-up-page__form">
            <div class="text-color--gray">
              <span v-text="$t('page.sign_up.code_sent')" />
              <span v-text="` ${email}`" class="text-color--primary text-bold" />
            </div>
            <base-field :label="$t('field.label.confirm_code')">
              <q-input
                v-model="code"
                outlined
                :placeholder="$t('field.placeholder.confirm_code')"
              />
            </base-field>
          </base-form>
          <q-btn
            :label="$t('button.next')"
            color="primary"
            padding="12px"
            unelevated
            no-caps
            class="sign-up-page__sign-up text-bold full-width"
            @click="step = 3"
          />
        </q-tab-panel>

        <q-tab-panel :name="3" class="sign-up-page__tab">
          <base-form class="sign-up-page__form">
            <base-field :label="$t('field.label.password')">
              <q-input
                v-model="password"
                outlined
                :placeholder="$t('field.placeholder.password')"
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
            :label="$t('button.sign_up')"
            color="primary"
            padding="12px"
            unelevated
            no-caps
            class="sign-up-page__sign-up text-bold full-width"
            @click="step = 3"
          />
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import BaseForm from 'components/base/base-form/base-form';
import BaseField from 'components/base/base-field/base-field';

const step = ref(1);
const name = ref('');
const email = ref('');
const terms = ref(false);
const code = ref('');
const password = ref('');
const confirmPassword = ref('');
</script>

<style lang="scss" scoped>
.sign-up-page-wrap {
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
.sign-up-page {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 472px;
  gap: 16px;
  &__header {
    position: relative;
    display: flex;
    width: 100%;
    justify-content: center;
    margin: 0 0 16px;
    &__title {
      font-size: 30px;
      font-weight: 700;
      line-height: 30px;
      margin: 0;
    }
    &__back {
      position: absolute;
      top: 0;
      left: 0;
    }
  }
  &__form {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 24px;
    &__terms {
      font-size: 14px;
    }
  }
  &__tab {
    padding: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 40px;
    height: 100%;
    &--first {
      justify-content: start;
      .sign-up-page__sign-up {
        margin: 0;
      }
    }
  }
  &__login {
    display: flex;
    gap: 8px;
    width: 100%;
    justify-content: center;
  }
  &__sign-up {
    height: fit-content;
    margin-bottom: 64px;
  }
}
</style>

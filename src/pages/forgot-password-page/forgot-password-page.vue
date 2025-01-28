<template>
  <div class="forgot-password-page-wrap">
    <div class="forgot-password-page">
      <h1
        v-text="$t('page.forgot_password.header')"
        class="forgot-password-page__header"
      />
      <div v-if="!sent" class="forgot-password-page__content">
        <span v-text="$t('page.forgot_password.desc')" class="text-color--gray q-mb-md" />
        <base-form class="full-width">
          <base-field :label="$t('field.label.email')">
            <q-input
              v-model="email"
              outlined
              :placeholder="$t('field.placeholder.email')"
            />
          </base-field>
        </base-form>
        <q-btn
          :label="$t('button.next')"
          color="primary"
          padding="12px"
          unelevated
          no-caps
          class="forgot-password-page__content__send text-bold full-width"
          @click="send"
        />
      </div>
      <div v-else class="forgot-password-page__sent-desc text-color--gray">
        <span v-text="$t('page.forgot_password.sent_desc')" />
        <span v-text="` ${email}`" class="text-color--primary text-bold" />
      </div>
    </div>
  </div>
</template>

<script setup>
import BaseForm from 'components/base/base-form/base-form';
import BaseField from 'components/base/base-field/base-field';
import { ref } from 'vue';

const email = ref('');
const sent = ref(false);

function send() {
  sent.value = true;
}
</script>

<style lang="scss" scoped>
.forgot-password-page-wrap {
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
.forgot-password-page {
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
  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    gap: 16px;
    height: 100%;
    &__send {
      margin: auto 0 64px 0;
    }
  }
  &__sent-desc {
    text-align: center;
  }
}

</style>

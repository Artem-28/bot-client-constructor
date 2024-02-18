<template>
  <div class="form-login">
    <base-input-wrapper :label="$t('input.label.email')">
      <q-input
        v-model="formData.email"
        :error="false"
        outlined
        :placeholder="$t('input.placeholder.email')"
      />
    </base-input-wrapper>
    <base-input-wrapper :label="$t('input.label.password')">
      <base-input-password
        v-model="formData.password"
        :error="false"
        outlined
        :placeholder="$t('input.placeholder.password')"
      />
    </base-input-wrapper>
    <router-link
      to="auth/forgot"
      class="form-login__forgot-password-link"
    >
      {{ $t('auth.forgot_password') }}
    </router-link>
    <q-btn
      color="primary"
      no-caps
      :label="$t('button.login')"
      @click="sendFormHandle"
      class="form-login__submit-btn"
    />

  </div>
</template>

<script setup lang="ts">
import { defineEmits, reactive } from 'vue';

/* Composition */
// import you composition api...

/* Components */
// import you components...
import BaseInputWrapper from 'components/base/base-input-wrapper/BaseInputWrapper.vue';
import BaseInputPassword from 'components/base/base-input-password/BaseInputPassword.vue';

/* Types */
// declare components component...
import { LoginDto } from 'src/api/modules/auth-module/auth.dto';

interface Emit {
  (e: 'submit', dto: LoginDto): void;
}

/* Props */
// property default value...

/* Emits */
const emit = defineEmits<Emit>();

/* Data */
// declare reactive variables...
const formData = reactive<LoginDto>({
  email: '',
  password: ''
});

/* Composition */
// declare you composition api...

/* Life hooks */
// life cycle hooks...

/* Computed */
// you computational properties...

/* Methods */
// promote your methods...
const sendFormHandle = () => emit('submit', formData);
</script>

<style scoped lang="scss">
/* Variables */
// declare you variables scss...

/* Selector */
// style component...
.form-login {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 4px;
  &__forgot-password-link {
    margin-left: auto;
    margin-bottom: 36px;
    font-size: 16px;
    font-weight: bold;
    color: $text-body-secondary;
    text-decoration: none;
    transition: color 0.2s;
  }
  &__forgot-password-link:active {
    color: $text-body-secondary;
  }
  &__forgot-password-link:hover {
    color: $primary;
  }
  &__submit-btn {
    height: 56px;
  }
}
</style>

<template>
  <div class="auth-page">
    <q-tabs
      v-model="tab"
      no-caps
      active-color="primary"
      align="justify"
      class="auth-page__tabs"
    >
      <q-tab
        name="login"
        :ripple="false"
        :label="$t('auth.login')"
        class="no-hover-effect"
      />
      <q-tab
        name="registration"
        disable
        :ripple="false"
        :label="$t('auth.registration')"
        class="no-hover-effect"
      />
    </q-tabs>

    <q-tab-panels v-model="tab" animated>
      <q-tab-panel
        name="login"
        class="auth-page__tabs__tab-login"
      >
        <form-login @submit="loginHandle" />
      </q-tab-panel>

      <q-tab-panel
        name="registration"
        class="auth-page__tabs__tab-registration"
      >
      </q-tab-panel>
    </q-tab-panels>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import AuthService from 'src/api/modules/auth-module/auth.service';

/* Composition */
// import you composition api...

/* Components */
// import you components...
import FormLogin from 'components/form/form-login/FormLogin.vue';

/* Types */
// declare components component...
import { LoginDto } from 'src/api/modules/auth-module/auth.dto';
import { useRouter } from 'vue-router';

/* Props */
// property default value...

/* Emits */

/* Data */
// declare reactive variables...
const tab = ref<string>('login');

/* Composition */
// declare you composition api...
const router = useRouter();

/* Life hooks */
// life cycle hooks...

/* Computed */
// you computational properties...

/* Methods */
// promote your methods...
const loginHandle = async (dto: LoginDto) => {
  const user = await AuthService.login(dto);
  if (!user) return;
  await router.push('/projects');
};
</script>

<style lang="scss">
/* Variables */
// declare you variables scss...

/* Selector */
// style component...
.auth-page {
  &__tabs {
    background-color: #ffffff;
  }
  .q-tab {
    &:hover {
      color: $primary;
    }
    &__label {
      font-size: 16px;
      font-weight: 700;
    }
  }

  &__tabs__tab-login {
    padding: 40px 104px 40px;
  }
  &__tabs__tab-registration {
    padding: 16px 16px 0;
  }
}
</style>

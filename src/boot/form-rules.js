import { boot } from 'quasar/wrappers';
import * as validators from '@vuelidate/validators';
import { i18n } from 'boot/i18n';
import { ref } from 'vue';

const withI18nMessage = validators.createI18nMessage({ t: i18n.global.t.bind(i18n) });

function checkCode(payload) {
  const code = '111111';
  return new Promise((resolve) => {
    setTimeout(() => resolve({
      matched: code === payload.code,
      live: true,
    }), 2000);
  });
}

function checkCodeValidator(type) {
  const params = ref(null);
  const validator = validators.helpers.withAsync(async(value, form) => {
    if (value.length !== 6) return false;
    const payload = {
      destination: form.email,
      type,
      code: value,
    };
    params.value = await checkCode(payload);
    return params.value.matched && params.value.live;
  });
  return validators.helpers.withParams({ type: 'data', value: params }, validator);
}

const formRules = {
  required: withI18nMessage(validators.required),
  email: withI18nMessage(validators.email),
  minLength: withI18nMessage(validators.minLength(6)),

  registrationCode: {
    $lazy: true,
    required: withI18nMessage(validators.required),
    minLength: withI18nMessage(validators.minLength(6), {
      messagePath: () => 'validations.confirm_code.invalid',
    }),
    asyncValidator: withI18nMessage(checkCodeValidator('registration'), {
      messagePath: ({ $params }) => {
        const data = $params.value;
        if (!data) return 'validations.required';
        if (!data.live) return 'validations.confirm_code.live';
        if (!data.matched) return 'validations.confirm_code.invalid';
        return 'validations.required';
      },
    }),
  },
};

export default boot(({ app }) => {
  app.config.globalProperties.$formRules = formRules;
});

export { formRules };

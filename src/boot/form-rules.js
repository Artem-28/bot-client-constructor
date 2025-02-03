import { boot } from 'quasar/wrappers';
import * as validators from '@vuelidate/validators';
import { i18n } from 'boot/i18n';
import { ref } from 'vue';
import useApi from 'src/api';

const withI18nMessage = validators.createI18nMessage({ t: i18n.global.t.bind(i18n) });
const api = useApi();

function checkCodeValidator(type) {
  const params = ref(null);
  const validator = validators.helpers.withAsync(async (value, form, ctx) => {
    const isEmail = validators.email.$validator(ctx.form?.email, ctx.form, ctx);
    const isBetween = value.length === 6;

    if (!isEmail || !isBetween) return false;
    const payload = {
      destination: ctx.form.email,
      type,
      code: value,
    };

    try {
      const { success, data } = await api.checkConfirmCode(payload);
      if (success) params.value = data;
      return params.value.matched && params.value.live;
    } catch (e) {
      return false;
    }
  });
  return validators.helpers.withParams({ type: 'data', value: params }, validator);
}

function sameAsPassword(value, form) {
  return validators.sameAs(form.password).$validator(value);
}

const formRules = {
  required: withI18nMessage(validators.required),
  email: withI18nMessage(validators.email),
  minLength: withI18nMessage(validators.minLength(6)),

  registrationCode: {
    $lazy: true,
    required: withI18nMessage(validators.required),
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
  password: {
    required: withI18nMessage(validators.required),
    minLength: withI18nMessage(validators.minLength(6), {
      messagePath: () => 'validations.password.min_length',
    }),
  },
  confirmPassword: {
    required: withI18nMessage(validators.required),
    sameAsPassword: withI18nMessage(sameAsPassword, {
      messagePath: () => 'validations.password.same_as',
    }),
  },

};

export default boot(({ app }) => {
  app.config.globalProperties.$formRules = formRules;
});

export { formRules };

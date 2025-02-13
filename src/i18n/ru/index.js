export default {
  page: {
    login: {
      header: 'Вход',
      not_account: 'Нет аккаунта?',
    },
    sign_up: {
      header: 'Регистрация',
      have_account: 'Уже есть аккаунт?',
      code_sent: 'Код подтверждения отправлен на почту',
      timer_desc: 'Не пришел код? Отправить снова можно через',
    },
    forgot_password: {
      header: 'Восстановление пароля',
      desc: 'Введите адрес электронной почты, который вы указывали при регистрации, чтобы мы отправили вам инструкцию по сбросу пароля',
      sent_desc: 'Инструкция по сбросу пароля отправлена на почту',
    },
    reset_password: {
      header: 'Восстановление пароля',
    },
  },
  field: {
    placeholder: {
      email: 'Введите email',
      password: 'Введите пароль',
      new_password: 'Введите новый пароль',
      name: 'Введите имя пользователя',
      confirm_code: 'Введите код подтверждения',
      confirm_password: 'Подтвердите пароль',
    },
    label: {
      email: 'Email',
      password: 'Пароль',
      new_password: 'Новый пароль',
      name: 'Имя пользователя',
      terms_of_service: 'Я прочитал и согласен с условиями ',
      confirm_code: 'Код подтверждения',
      confirm_password: 'Подтверждение пароля',
    },
  },
  button: {
    forgot_password: 'Забыли пароль?',
    sign_in: 'Войти',
    sign_up: 'Зарегистрироваться',
    terms_of_service: 'Пользовательского соглашения',
    next: 'Далее',
    save: 'Сохранить',
    send_code: 'Отправить код',
  },
  validations: {
    required: 'Поле обязательно для заполнения',
    email: 'ВВеден не корректные email',
    confirm_code: {
      invalid: 'Неверный код подтверждения',
      live: 'Код подтверждения не действительный',
    },
    password: {
      min_length: 'Пароль должен содержать не менее 6 символов',
      same_as: 'Пароли не совпадают',
    },
  },
  account: {
    logout: 'Выйти',
  },
};

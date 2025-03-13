export default {
  page: {
    login: {
      title: 'Вход',
      not_account: 'Нет аккаунта?',
    },
    sign_up: {
      title: 'Регистрация',
      have_account: 'Уже есть аккаунт?',
      code_sent: 'Код подтверждения отправлен на почту',
      timer_desc: 'Не пришел код? Отправить снова можно через',
    },
    forgot_password: {
      title: 'Восстановление пароля',
      desc: 'Введите адрес электронной почты, который вы указывали при регистрации, чтобы мы отправили вам инструкцию по сбросу пароля',
      sent_desc: 'Инструкция по сбросу пароля отправлена на почту',
    },
    reset_password: {
      title: 'Восстановление пароля',
    },
    projects: {
      title: 'Проекты',
      create_project: 'Создание проекта',
    },
    scripts: {
      title: 'Сценарии',
      create_script: 'Создание сценария',
    },
    project_settings: {
      title: 'Настройки проекта',
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
      search: 'Поиск',
      project_title: 'Введите название проекта',
      script_title: 'Введите название сценария',
    },
    label: {
      email: 'Email',
      password: 'Пароль',
      new_password: 'Новый пароль',
      name: 'Имя пользователя',
      terms_of_service: 'Я прочитал и согласен с условиями ',
      confirm_code: 'Код подтверждения',
      confirm_password: 'Подтверждение пароля',
      project_title: 'Название проекта',
      script_title: 'Название сценария',
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
    create_project: 'Создать проект',
    create_script: 'Создать сценарий',
    create: 'Создать',
    cancel: 'Отмена',
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
  base: {
    title: 'Название',
  },
  account: {
    logout: 'Выйти',
  },
};

export default {
  page: {
    forbidden: {
      title: 'Доступ запрещен',
    },
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
      rename_script: 'Изминение названия',
      delete_script: 'Удаление сценария',
      delete_script_confirm: 'Вы действительно хотите удалить сценарий?',
    },
    project_settings: {
      title: 'Настройки проекта',
    },
    subs: {
      title: 'Пользователи',
      add_user: 'Добавление пользователя',
      delete_user: 'Удаление пользователя',
      delete_user_confirm: 'Вы действительно хотите удалить пользователя из проекта?',
    },
    sub: {
      title: {
        info: 'Информация о пользователе',
        rights: 'Права пользователя',
      },
      tabs: {
        info: 'Информация',
        rights: 'Права',
      },
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
    rename: 'Изменить название',
    delete: 'Удалить',
    apply: 'Применить',
    add_user: 'Добавить пользователя',
    add: 'Добавить',
  },
  validations: {
    required: 'Поле обязательно для заполнения',
    email: 'Введен некорректный email',
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
    email: 'Почта',
    user: 'Пользователь',
    added_at: 'Дата добавления',
  },
  account: {
    logout: 'Выйти',
  },
  permissions: {
    write_project: 'Изминение проекта',
    access_script: 'Управление сценариями',
    read_script: 'Просмотр сценариев',
    write_script: 'Изминение сценариев',
    remove_script: 'Удаление сценариев',
    access_permission: 'Управление правами пользователей',
    read_permission: 'Просмотр прав пользователей',
    write_permission: 'Изминение прав пользователей',
    access_subscriber: 'Управление пользователями',
    create_subscriber: 'Добавление пользователей',
    remove_subscriber: 'Удаление пользователей',
    read_subscriber: 'Просмотр пользователей',
    access_respondent: 'Управление респондетнами',
    read_respondent: 'Просмотр респондетнов',
    write_respondent: 'Изминение респондетнов',
    remove_respondent: 'Изминение респондетнов',
  },
};

// Local copy of example steps from @hexlet/chatbot-v2
const steps = [
  {
    id: 'welcome',
    messages: [
      'Привет! Я ваш виртуальный помощник. Нажмите "Начать разговор", чтобы открыть чат',
    ],
    buttons: [
      {
        text: 'Начать разговор',
        nextStepId: 'start',
        type: 'button',
      },
    ],
  },
  {
    id: 'start',
    messages: [
      'Помогу вам выбрать подходящий курс. Выбирайте категорию вопроса, и буквально через пару шагов я смогу рассказать вам то, что нужно.',
    ],
    buttons: [
      {
        text: 'Сменить профессию или трудоустроиться',
        nextStepId: 'switch',
        type: 'button',
      },
      {
        text: 'Попробовать себя в IT',
        nextStepId: 'try',
        type: 'button',
      },
    ],
  },
  {
    id: 'try',
    messages: ['Вы выбрали "Попробовать себя в IT".'],
    buttons: [
      {
        text: 'Назад',
        nextStepId: 'start',
        type: 'button',
      },
    ],
  },
  {
    id: 'switch',
    messages: ['Вы выбрали "Сменить профессию".'],
    buttons: [
      {
        text: 'Назад',
        nextStepId: 'start',
        type: 'button',
      },
    ],
  },
];

export default steps;

export default [
  {
    id: 'welcome',
    messages: ['Hello! Welcome to our chatbot.'],
    buttons: [
      {
        text: 'Get started',
        nextStepId: 'start',
        type: 'button',
      },
    ],
  },
  {
    id: 'start',
    messages: ['This is the start menu.'],
    buttons: [
      {
        text: 'Option 1',
        nextStepId: 'try',
        type: 'button',
      },
    ],
  },
  {
    id: 'try',
    messages: ['You selected Option 1.'],
    buttons: [
      {
        text: 'Back',
        nextStepId: 'start',
        type: 'button',
      },
    ],
  },
];

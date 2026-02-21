/**
 * Fixture: Minimal chatbot configuration
 * Used for basic component testing
 */
export default [
  {
    id: 'start',
    messages: ['Hello! Welcome to our chatbot.'],
    buttons: [
      {
        text: 'Get started',
        nextStepId: 'main',
        type: 'button',
      },
    ],
  },
  {
    id: 'main',
    messages: ['This is the main menu.'],
    buttons: [
      {
        text: 'Option 1',
        nextStepId: 'option1',
        type: 'button',
      },
      {
        text: 'Option 2',
        nextStepId: 'option2',
        type: 'button',
      },
    ],
  },
  {
    id: 'option1',
    messages: ['You selected Option 1.'],
    buttons: [
      {
        text: 'Back',
        nextStepId: 'main',
        type: 'button',
      },
    ],
  },
  {
    id: 'option2',
    messages: ['You selected Option 2.'],
    buttons: [
      {
        text: 'Back',
        nextStepId: 'main',
        type: 'button',
      },
    ],
  },
];

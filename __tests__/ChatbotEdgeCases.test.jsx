import path from 'path';
import { fileURLToPath } from 'url';
import { describe, it, expect, beforeEach } from 'vitest';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import { userEvent } from "@testing-library/user-event";
import Widget from '@hexlet/chatbot-v2';
import '@hexlet/chatbot-v2/styles';
import { debug } from 'vitest-preview';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFixture = async (filename) => {
  const fixturePath = getFixturePath(filename);
  const module = await import(fixturePath);
  return module.default;
};

beforeEach(() => {
  cleanup();
})

describe('Chatbot Edge Cases and Error Handling', () => {
  it('handles step with empty messages array', async () => {
    const steps = [
      {
        id: 'welcome',
        messages: [],
        buttons: [
          { text: 'Continue', nextStepId: 'next', type: 'button' },
        ],
      },
      {
        id: 'next',
        messages: ['Next step'],
        buttons: [],
      },
    ];
    const user = userEvent.setup();
    await render(Widget(steps));

    await userEvent.click(screen.getByText('Открыть Чат'));
    expect(screen.getByText('Виртуальный помощник')).toBeInTheDocument();

    await user.click(screen.getByText('Continue'));
    await waitFor(() => {
      expect(screen.getByText('Next step')).toBeInTheDocument();
    });
    const closeButton = screen.getByRole('button', { name: /close/i });
    await user.click(closeButton);
  });

  it('handles step with empty buttons array', async () => {
    const steps = await readFixture('singleStep.js');
    console.log(steps)
    const user = userEvent.setup();
    render(Widget(steps));

    await user.click(screen.getByText('Открыть Чат'));
    expect(screen.getByText('Виртуальный помощник')).toBeInTheDocument();
    debug()
    expect(screen.getByText('This is a single step chatbot.')).toBeInTheDocument();

    const navigationButtons = screen.queryAllByRole('button', { name: /^(?!close).+$/i });
    expect(navigationButtons).toHaveLength(1);
  });

  it('handles button with non-existent nextStepId', async () => {
    const steps = [
      {
        id: 'welcome',
        messages: ['Start message'],
        buttons: [
          { text: 'Go nowhere', nextStepId: 'non-existent-step', type: 'button' },
        ],
      },
    ];
    const user = userEvent.setup();
    render(Widget(steps));

    await user.click(screen.getByText('Открыть Чат'));
    expect(screen.getByText('Виртуальный помощник')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Start message')).toBeInTheDocument();
    });

    // Кликаем по кнопке с несуществующим nextStepId
    await user.click(screen.getByText('Go nowhere'));

    // Чат-бот остаётся на том же шаге
    await waitFor(() => {
      expect(screen.getByText('Start message')).toBeInTheDocument();
    });
  });

  it('handles button with missing nextStepId', async () => {
    const steps = [
      {
        id: 'welcome',
        messages: ['Start message'],
        buttons: [
          { text: 'No destination', type: 'button' },
        ],
      },
    ];
    const user = userEvent.setup();
    render(Widget(steps));

    await user.click(screen.getByText('Открыть Чат'));
    expect(screen.getByText('Виртуальный помощник')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Start message')).toBeInTheDocument();
    });

    // Кликаем по кнопке без nextStepId
    await user.click(screen.getByText('No destination'));

    // Чат-бот остаётся на том же шаге
    await waitFor(() => {
      expect(screen.getByText('Start message')).toBeInTheDocument();
    });
  });

  it('displays special characters and XSS attempts correctly', async () => {
    const steps = [
      {
        id: 'welcome',
        messages: ['<script>alert("xss")</script>', 'Special: & < > " \''],
        buttons: [],
      },
    ];
    const user = userEvent.setup();
    render(Widget(steps));

    await user.click(screen.getByText('Открыть Чат'));
    expect(screen.getByText('Виртуальный помощник')).toBeInTheDocument();

    // Проверяем, что специальные символы отображаются как текст
    await waitFor(() => {
      expect(screen.getByText('<script>alert("xss")</script>')).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText('Special: & < > " \'')).toBeInTheDocument();
    });
  });

  it('handles button with empty text', async () => {
    const steps = [
      {
        id: 'welcome',
        messages: ['Start message'],
        buttons: [
          { text: '', nextStepId: 'next', type: 'button' },
        ],
      },
      {
        id: 'next',
        messages: ['Next step'],
        buttons: [],
      },
    ];
    const user = userEvent.setup();
    render(Widget(steps));

    await user.click(screen.getByText('Открыть Чат'));
    expect(screen.getByText('Виртуальный помощник')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Start message')).toBeInTheDocument();
    });

    const allButtons = screen.getAllByRole('button');
    const emptyButton = allButtons.find(btn => btn.textContent === '');
    expect(emptyButton).toBeInTheDocument();

    await user.click(emptyButton);
  });
});
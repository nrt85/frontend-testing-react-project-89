import path from 'path';
import { fileURLToPath } from 'url';
import { describe, it, expect, afterAll } from 'vitest';
import { render, screen, waitFor, cleanup } from '@testing-library/react';
import { userEvent } from "@testing-library/user-event";
import Widget from '@hexlet/chatbot-v2';
import { debug } from 'vitest-preview'
import '@hexlet/chatbot-v2/styles';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFixture = async (filename) => {
  const fixturePath = getFixturePath(filename);
  const module = await import(fixturePath);
  return module.default;
}

afterAll(() => {
  cleanup()
})

describe('Chatbot User Interactions', () => {
  describe('Step Transitions', async () => {
    it('transitions between steps when clicking buttons', async () => {
      const user = userEvent.setup();
      const steps = await readFixture('minimalSteps.js');
      render(Widget(steps));

      await user.click(screen.getByText('Открыть Чат'));
      expect(screen.getByText('Виртуальный помощник')).toBeInTheDocument();

      await user.click(screen.getByText('Get started'));
      expect(screen.getByText('This is the start menu.')).toBeInTheDocument();
      debug();

      await user.click(screen.getByText('Option 1'));
      expect(screen.getByText('You selected Option 1.')).toBeInTheDocument();

      waitFor(() => {
        user.click(screen.getByText('Back'));
      }, {
        timeout: 100
      })
      expect(screen.getByText('This is the start menu.')).toBeInTheDocument();
      debug();

      const closeButton = screen.getByRole('button', { name: /close/i });
      expect(closeButton).toBeInTheDocument();
      await user.click(closeButton);

      expect(screen.queryByText('Виртуальный помощник')).not.toBeInTheDocument();
      expect(screen.queryByText('Открыть Чат')).toBeInTheDocument();
      debug();
    });
  });
});

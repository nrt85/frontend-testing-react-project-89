import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { describe, it, expect, afterEach, afterAll } from 'vitest';
import { render, screen, waitFor, cleanup } from '@testing-library/react';
import { userEvent } from "@testing-library/user-event";
import Widget from '@hexlet/chatbot-v2';
import '@hexlet/chatbot-v2/styles';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFixture = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

afterAll(() => {
  render(<></>)
})

describe('Chatbot User Interactions - Modal Window Open/Close', () => {
  it('opens chat modal when clicking the open button', async () => {
    const user = userEvent.setup();
    const steps = readFixture('minimalSteps.js');
    render(Widget(steps));
    const openButton = screen.getByText('Открыть Чат');
    expect(openButton).toBeInTheDocument();
    await user.click(openButton);

    await waitFor(() => {
      expect(screen.getByText('Виртуальный помощник')).toBeInTheDocument();
    }, { timeout: 1000 });

    const closeButton = screen.getByRole('button', { name: /close/i });
    expect(closeButton).toBeInTheDocument();
    await user.click(closeButton);
    expect(screen.queryByText('Виртуальный помощник')).not.toBeInTheDocument();
    expect(screen.queryByText('Открыть Чат')).toBeInTheDocument();
  });
});

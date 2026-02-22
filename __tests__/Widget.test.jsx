import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { userEvent } from "@testing-library/user-event";
import Widget from '@hexlet/chatbot-v2';
import '@hexlet/chatbot-v2/styles';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFixture = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

describe('Chatbot Widget', () => {
  it('renders without errors', async () => {
    const user = userEvent.setup();
    const steps = readFixture("minimalSteps.js");
    render(Widget(steps));
    screen.debug();
    expect(screen.getByText('Открыть Чат')).toBeInTheDocument();
    await user.click(screen.getByText('Открыть Чат'))
    await waitFor(() => {
      expect(screen.getByText('Виртуальный помощник')).toBeInTheDocument()
    })
  });
});

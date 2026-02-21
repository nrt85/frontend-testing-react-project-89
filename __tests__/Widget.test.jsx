import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { describe, it, expect } from 'vitest';
import { debug } from 'vitest-preview'
import { render, screen } from '@testing-library/react';
import Widget from '@hexlet/chatbot-v2';
import steps from '@hexlet/chatbot-v2/example-steps';
import '@hexlet/chatbot-v2/styles';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFixture = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

describe('Chatbot Widget', () => {
  it('renders without errors', () => {
    const steps = readFixture("minimalSteps.js");
    render(Widget(steps));
    debug();
    expect(screen.getByText('Открыть Чат')).toBeInTheDocument();
  });
});

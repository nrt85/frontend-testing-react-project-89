import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import App from '../src/App.jsx';

beforeEach(() => {
  cleanup();
})

describe('App Component', () => {
  it('renders the registration form', () => {
    render(<App />);

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/пароль/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/адрес/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/город/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/страна/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/принять правила/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /зарегистрироваться/i })).toBeInTheDocument();
  });

  it('fills the form and submits', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByLabelText(/email/i), 'test@example.com');
    await user.type(screen.getByLabelText(/пароль/i), 'password123');
    await user.type(screen.getByLabelText(/адрес/i), 'Невский проспект, 12');
    await user.type(screen.getByLabelText(/город/i), 'Санкт-Петербург');
    await user.selectOptions(screen.getByLabelText(/страна/i), 'Россия');
    await user.click(screen.getByLabelText(/принять правила/i));

    await user.click(screen.getByRole('button', { name: /зарегистрироваться/i }));

    expect(screen.getByText('Назад')).toBeInTheDocument();
    expect(screen.getByText('test@example.com')).toBeInTheDocument();
    expect(screen.getByText('password123')).toBeInTheDocument();
    expect(screen.getByText('Невский проспект, 12')).toBeInTheDocument();
    expect(screen.getByText('Санкт-Петербург')).toBeInTheDocument();
    expect(screen.getByText('Россия')).toBeInTheDocument();
    expect(screen.getByText('true')).toBeInTheDocument();
  });

  it('goes back to form after submission', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByLabelText(/email/i), 'test@example.com');
    await user.click(screen.getByRole('button', { name: /зарегистрироваться/i }));

    expect(screen.getByText('Назад')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /назад/i }));

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /зарегистрироваться/i })).toBeInTheDocument();
  });

  it('opens chat modal when clicking the open button', async () => {
    const user = userEvent.setup();
    render(<App />);

    const openButton = screen.getByText('Открыть Чат');
    expect(openButton).toBeInTheDocument();
    await user.click(openButton);
    expect(screen.getByText('Виртуальный помощник')).toBeInTheDocument();

    const closeButton = screen.getByRole('button', { name: /close/i });
    expect(closeButton).toBeInTheDocument();
    await user.click(closeButton);
    expect(screen.queryByText('Виртуальный помощник')).not.toBeInTheDocument();
    expect(screen.queryByText('Открыть Чат')).toBeInTheDocument();
  });
});

# React Testing Skill

## Stack
- **Vitest** - тестовый раннер
- **@testing-library/react** - рендеринг и запросы
- **@testing-library/user-event** - симуляция действий пользователя
- **@testing-library/jest-dom** - матчеры

## Основные правила

### 1. Импорт и настройка

```javascript
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor, cleanup } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
```

### 2. userEvent setup

**Всегда** создавай instance через `userEvent.setup()`:

```javascript
const user = userEvent.setup();
```

**Используй `user` для всех кликов**, а не `userEvent.click`:

```javascript
// ✅ ПРАВИЛЬНО
await user.click(screen.getByText('Button'));
await user.type(screen.getByLabelText('Email'), 'test@example.com');

// ❌ НЕПРАВИЛЬНО
await userEvent.click(screen.getByText('Button'));
```

### 3. Рендеринг компонента

```javascript
// Для этого проекта - Widget принимает steps как аргумент
await render(Widget(steps));
```

### 4. Ожидания с waitFor

Используй `waitFor` для асинхронных операций:

```javascript
await waitFor(() => {
  expect(screen.getByText('Expected text')).toBeInTheDocument();
}, { timeout: 1000 });
```

### 5. Поиск элементов

| Query | Использование |
|-------|--------------|
| `getByText` | Элемент должен существовать |
| `queryByText` | Проверка отсутствия (возвращает null) |
| `getAllByRole` | Несколько элементов |
| `queryAllByRole` | Проверка отсутствия нескольких |

### 6. Проверка отсутствия элементов

```javascript
// ✅ ПРАВИЛЬНО
expect(screen.queryByText('Not exists')).not.toBeInTheDocument();

// Для кнопок - исключить close
const navButtons = screen.queryAllByRole('button', { name: /^(?!close).+$/i });
expect(navButtons).toHaveLength(0);
```

### 7. Частые ошибки

```javascript
// ❌ ОШИБКА: смешивание user и userEvent
const user = userEvent.setup();
await userEvent.click(...); // ❌

// ✅ ПРАВИЛЬНО
const user = userEvent.setup();
await user.click(...); // ✅
```

### 8. cleanup

```javascript
// В beforeEach или afterEach
beforeEach(() => {
  cleanup();
});
```

## Паттерны для чат-бота

### Открытие чат-бота

```javascript
await user.click(screen.getByText('Открыть Чат'));
await waitFor(() => {
  expect(screen.getByText('Виртуальный помощник')).toBeInTheDocument();
});
```

### Клик по кнопке с ожиданием

```javascript
await user.click(screen.getByText('Button Text'));
await waitFor(() => {
  expect(screen.getByText('Expected result')).toBeInTheDocument();
});
```

### Гибкий поиск текста

```javascript
// Если текст может быть разбит на элементы
await waitFor(() => {
  expect(screen.getByText((content) => content && content.includes('partial'))).toBeInTheDocument();
});
```

# Project Documentation

## Overview

**Project Name:** @hexlet/code  
**Type:** Frontend Testing Project  
**Purpose:** Testing and development environment for the `@hexlet/chatbot-v2` React component

This project serves as a testing sandbox for the Hexlet Chatbot V2 widget, providing a minimal React application with comprehensive testing setup using Vitest and React Testing Library.

---

## Architecture

### Project Structure

```
frontend-testing-react-project-89/
├── src/
│   └── App.jsx              # Main React application component
├── __tests__/
│   └── Widget.test.jsx      # Chatbot widget integration tests
├── __fixtures__/
│   ├── minimalSteps.js      # Test fixture: minimal chatbot configuration
│   └── singleStep.js        # Test fixture: single-step chatbot configuration
├── index.html               # Entry HTML file
├── vite.config.js           # Vite configuration (includes Vitest setup)
├── vitest.setup.js          # Vitest test environment setup
├── eslint.config.js         # ESLint configuration
└── package.json             # Dependencies and scripts
```

### Component Architecture

- **Main App (`src/App.jsx`):** Minimal React shell that displays instructions to access the chatbot
- **Chatbot Widget (`@hexlet/chatbot-v2`):** External package containing the actual chatbot UI component
- **Test Fixtures:** JSON-like step configurations defining chatbot conversation flows

---

## Technologies

### Core Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19.2.0 | UI framework |
| Vite | 7.3.1 | Build tool & dev server |
| Vitest | 4.0.18 | Testing framework |

### Testing Libraries

| Library | Purpose |
|---------|---------|
| `@testing-library/react` | React component testing |
| `@testing-library/dom` | DOM testing utilities |
| `@testing-library/jest-dom` | Jest DOM matchers for Vitest |
| `@testing-library/user-event` | User interaction simulation |
| `vitest-preview` | Visual debugging for tests |

### Development Tools

| Tool | Purpose |
|------|---------|
| ESLint 9.x | Code linting |
| `eslint-plugin-react-hooks` | React Hooks linting rules |
| `eslint-plugin-react-refresh` | Vite React Refresh linting |

### External Dependencies

| Package | Purpose |
|---------|---------|
| `@hexlet/chatbot-v2` | Chatbot widget component (v0.2.5) |

---

## Configuration

### Vite + Vitest (`vite.config.js`)

```javascript
test: {
  environment: 'jsdom',      // DOM environment for tests
  setupFiles: ['./vitest.setup.js'],
  css: true,                 // Process CSS in tests
  server: {
    deps: {
      inline: ['@hexlet/chatbot-v2'],  // Bundle chatbot package
    },
  },
}
```

### Vitest Setup (`vitest.setup.js`)

- Imports `@testing-library/jest-dom` for DOM matchers
- Mocks `scrollIntoView` (required for chatbot component)

### ESLint (`eslint.config.js`)

- Flat config format (ESLint 9.x)
- Ignores `dist/` directory
- React Hooks and React Refresh plugins enabled
- Custom rule: ignores unused variables starting with `A-Z` or `_`

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite development server |
| `npm run build` | Build for production |
| `npm run lint` | Run ESLint |
| `npm run test` | Run Vitest tests (single run) |
| `npm run watch` | Run Vitest in watch mode |
| `npm run watch:ui` | Run Vitest with UI dashboard |
| `npm run preview` | Preview test results with vitest-preview |

---

## Testing Approach

### Test Structure

Tests are located in `__tests__/` directory with `.test.jsx` extension.

**Example Test Pattern:**
```javascript
import { render, screen, waitFor } from '@testing-library/react';
import { userEvent } from "@testing-library/user-event";
import Widget from '@hexlet/chatbot-v2';

describe('Chatbot Widget', () => {
  it('renders without errors', async () => {
    const user = userEvent.setup();
    const steps = readFixture("minimalSteps.js");
    render(Widget(steps));
    
    // Test chatbot button visibility
    expect(screen.getByText('Открыть Чат')).toBeInTheDocument();
    
    // Test user interaction
    await user.click(screen.getByText('Открыть Чат'));
    
    // Test async content loading
    await waitFor(() => {
      expect(screen.getByText('Виртуальный помощник')).toBeInTheDocument();
    });
  });
});
```

### Fixtures

Test fixtures in `__fixtures__/` define chatbot conversation flows:

- **`minimalSteps.js`:** Complete multi-step conversation with navigation
- **`singleStep.js`:** Simple single-message configuration

Fixture format:
```javascript
export default [
  {
    id: 'start',
    messages: ['Welcome message'],
    buttons: [{ text: 'Button', nextStepId: 'main', type: 'button' }],
  },
  // ... more steps
];
```

### Debug Tools

- `screen.debug()` - Log DOM state to console
- `debug()` from `vitest-preview` - Visual DOM preview
- `vitest-preview` package provides browser-based test visualization

---

## Key Implementation Details

### Chatbot Widget Integration

1. Import widget: `import Widget from '@hexlet/chatbot-v2'`
2. Import styles: `import '@hexlet/chatbot-v2/styles'`
3. Render with step configuration: `render(Widget(steps))`

### Test Utilities

- **`getFixturePath()` / `readFixture()`:** Helper functions for loading test fixtures
- **`waitFor()`:** For async assertions (chatbot state changes)
- **`userEvent.setup()`:** For simulating user interactions

### Important Notes

- The `@hexlet/chatbot-v2` package must be inlined in Vite config for proper testing
- `scrollIntoView` mock is required (not implemented in jsdom)
- Tests use Russian text strings (chatbot UI language)

---

## Development Workflow

1. **Start Development:**
   ```bash
   npm run dev
   ```

2. **Run Tests:**
   ```bash
   npm run test          # Single run
   npm run watch         # Watch mode
   npm run watch:ui      # Watch with UI
   ```

3. **Lint Code:**
   ```bash
   npm run lint
   ```

4. **Debug Tests:**
   - Add `screen.debug()` or `debug()` in test files
   - Run `npm run preview` to see visual output

---

## Notes for Future Sessions

- This is a **testing-focused project** for the Hexlet Chatbot V2 component
- The main application (`App.jsx`) is a placeholder; real work happens in tests
- All chatbot configurations are defined as step arrays in fixtures
- Test assertions check for Russian UI text (e.g., "Открыть Чат", "Виртуальный помощник")
- The project uses **ESM modules** (`"type": "module"` in package.json)

# Anthropic Web App Testing Skill

## Core Principles

### 1. Use `container.textContent` for Text That May Be Split

When text might be split across multiple DOM nodes (common in React components), use `container.textContent` instead of `getByText`:

```javascript
// ❌ May fail if text is split across elements
expect(screen.getByText('expected text')).toBeInTheDocument();

// ✅ Reliable for any text content
const { container } = render(<Component />);
expect(container.textContent).toContain('expected text');
```

### 2. Always Use `user` Instance from `userEvent.setup()`

```javascript
// ✅ CORRECT
const user = userEvent.setup();
await user.click(screen.getByText('Button'));

// ❌ WRONG - mixing user and userEvent
const user = userEvent.setup();
await userEvent.click(screen.getByText('Button'));
```

### 3. Use `waitFor` for Async Operations

```javascript
await user.click(screen.getByText('Open'));
await waitFor(() => {
  expect(screen.getByText('Loaded')).toBeInTheDocument();
}, { timeout: 1000 });
```

### 4. Cleanup in `beforeEach` or `afterEach`

```javascript
import { cleanup } from '@testing-library/react';

beforeEach(() => {
  cleanup();
});
```

### 5. Query Variants

| Query | Use Case |
|-------|----------|
| `getBy*` | Element must exist (throws if not found) |
| `queryBy*` | Element may not exist (returns null) |
| `getAllBy*` | Multiple elements must exist |
| `queryAllBy*` | Multiple elements, may be empty |

### 6. Excluding Elements by Role

```javascript
// Exclude 'close' buttons when looking for navigation buttons
const navButtons = screen.queryAllByRole('button', { 
  name: /^(?!close).+$/i 
});
```

### 7. Render Pattern for This Project

```javascript
// Widget accepts steps as function argument
const { container } = await render(Widget(steps));
```

## Common Mistakes

### Mistake 1: Using `userEvent.click` After `userEvent.setup()`

```javascript
// ❌ WRONG
const user = userEvent.setup();
await userEvent.click(element);

// ✅ CORRECT
const user = userEvent.setup();
await user.click(element);
```

### Mistake 2: Expecting Exact Text Match When Text Is Split

```javascript
// ❌ May fail
expect(screen.getByText('Hello World')).toBeInTheDocument();

// ✅ Reliable
expect(container.textContent).toContain('Hello World');
```

### Mistake 3: Not Using `waitFor` for Async Content

```javascript
// ❌ May fail - content not yet rendered
expect(screen.getByText('Loaded')).toBeInTheDocument();

// ✅ Wait for content
await waitFor(() => {
  expect(screen.getByText('Loaded')).toBeInTheDocument();
});
```

## Debugging Tips

1. Use `debug()` from `vitest-preview` to see rendered DOM
2. Use `container.textContent` to see all text content
3. Use `screen.logTestingPlaygroundURL()` to get Testing Playground URL

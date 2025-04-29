# 🧪 Unit Testing with JavaScript

We write automated tests (unit & integration tests) for JavaScript projects with Vitest.
This project demonstrates how to write automated **Unit Tests** for JavaScript functions using **Vitest** (or Jest).  
It includes basic examples, edge case handling, and clear folder structure for best practices.

---

## 📦 Features

- Clear and educational examples of Unit Testing
- Tests for basic logic functions (e.g. addition, averaging, filtering)
- Uses **Vitest** as the testing framework
- Practice writing assertions with `expect()`
- Demonstrates testing of edge cases and error handling

---

## 🚀 Technologies Used

- **Language:** JavaScript (ES6+)
- **Testing Framework:** Vitest _(Jest compatible)_
- **Tools:** Node.js, npm / yarn

---

## 📂 Folder Structure

unit-testing-project/ ├── src/ # Source code (functions/modules to be tested) │ ├── math.js # Example: add, subtract, etc. │ └── stringUtils.js # Example: capitalize, trim, etc. │ ├── tests/ # Test files │ ├── math.test.js # Unit tests for math.js │ └── string.test.js # Unit tests for stringUtils.js │ ├── vitest.config.js # Vitest configuration file ├── package.json # Project metadata and dependencies └── README.md # Project documentation

---

## 🧪 Running Tests

You can run the unit tests using the following commands:

### ▶️ Run tests once

```bash
npm test
# or
yarn test


```

## 🔁 Watch mode

```

npm run test:watch

# or

yarn test:watch

```

## ⚙️ With Vitest directly

```

npx vitest
npx vitest --watch

```

---

## 🧾 Example Test

```

// tests/math.test.js
import { add } from '../src/math';

test('should summarize all number values in an array', () => {
const result = add([1, 2, 3]);
expect(result).toBe(6);
});

```

---

## 📖 Notes

All tests are written with a focus on clarity and maintainability.

Good tests are fast, isolated, and predictable.

Use watch mode during development for faster feedback.

📬 Contact
Created with ❤️ by Uriel – aspiring Full Stack Developer.

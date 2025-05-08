import fs from 'fs';
import path from 'path';

import { beforeEach, expect, it, vi } from 'vitest';

// Import a simulated browser window and DOM from happy-dom
import { Window } from 'happy-dom';

// Import the function we're testing
import { showError } from './dom';

// ***We added this `--environment happy-dom` in package.json***
// Using `happy-dom` to simulate a browser-like environment in Node.js.
// This allows us to test DOM-related code (like document.createElement, innerHTML, etc.)
// without needing a real browser. Great for testing frontend logic in Vitest.
//  "scripts": {
//     "start": "http-server -c-1",
//     "test": "vitest --run --environment happy-dom --reporter verbose"
//   },

// Build the absolute path to the index.html file (assuming it's in the root of the project)
const htmlDocPath = path.join(process.cwd(), 'index.html');
// Read the contents of index.html and convert the buffer to a string
const htmlDocumentContent = fs.readFileSync(htmlDocPath).toString();

// Create a new simulated browser window
const window = new Window();
// Accesses the `document` property from the `window` object.
// This allows us to interact with the DOM of the simulated window, just like we would in a real browser.
// It's similar to destructuring, but here we're directly assigning the `document` property to a local variable.
// so, const { document } = window;
const document = window.document;

// 📌 vi.stubGlobal(name, value)
// -----------------------------
// Used in testing environments (like Vitest) to define or override global variables
// that normally exist in the browser but not in Node.js.
// This is useful when testing frontend-related code that depends on globals.
//
// Common use cases:
// - `document` (e.g., document.querySelector)
// - `window` (e.g., window.location or window.innerWidth)
// - `fetch` (for API calls)
// - `localStorage`, `sessionStorage`
// - `navigator`, `location`, and more
//
// Without stubbing, tests that rely on these globals may throw ReferenceErrors.
// vi.stubGlobal allows you to inject mocks or fake implementations
// so the code can run and be tested properly in a Node.js environment.

// Replace the global `document` with our simulated one so that DOM-related code works in the test
vi.stubGlobal('document', document);

// ✅ Reset the DOM before each test to ensure test isolation
// - Clears any previous changes (like inserted elements from prior tests)
// - Re-injects the original HTML structure from index.html
// - Prevents test interference and makes each test run with a clean DOM state
beforeEach(() => {
  // Clear the current DOM content to remove any elements added by previous tests
  document.body.innerHTML = '';

  // Re-inject the original HTML structure from index.html into the document
  document.write(htmlDocumentContent);
});

it('should add an error paragraph to the id="errors" element', () => {
  // ✅ We must call showError first so that it modifies the DOM
  // and adds the <p> element inside the #errors div.
  // If we try to access DOM elements before this call, they won't exist.
  showError('Test');

  const errorsEl = document.getElementById('errors');

  // ✅ Since the #errors div is empty before calling showError,
  // the new <p> element becomes both the firstElementChild and lastElementChild.
  // So we can safely use either one to access the added paragraph.
  const errorParagraph = errorsEl.firstElementChild;

  expect(errorParagraph).not.toBeNull();
  // ✅ Verifies that the <p> element contains the correct error message text.
  // expect(errorParagraph.textContent).toBe('Test');
});

it('should not contain an error paragraph initially', () => {
  const errorsEl = document.getElementById('errors');
  const errorParagraph = errorsEl.firstElementChild;

  // Since we didn't call the showError(), the errorParagraph should not be exist
  expect(errorParagraph).toBeNull();
});

it('should output the provided message in the error paragraph', () => {
  const testErrorMessage = 'Test';

  showError(testErrorMessage);

  const errorsEl = document.getElementById('errors');
  const errorParagraph = errorsEl.firstElementChild;

  // ✅ Verifies that the <p> element contains the correct error message text.
  expect(errorParagraph.textContent).toBe(testErrorMessage);
});

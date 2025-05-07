import { it } from 'vitest';
import { showError } from './dom';

// ***We added this `--environment happy-dom` in package.json***
// Using `happy-dom` to simulate a browser-like environment in Node.js.
// This allows us to test DOM-related code (like document.createElement, innerHTML, etc.)
// without needing a real browser. Great for testing frontend logic in Vitest.
//  "scripts": {
//     "start": "http-server -c-1",
//     "test": "vitest --run --environment happy-dom --reporter verbose"
//   },

it('first test', () => {
  showError('test');
});

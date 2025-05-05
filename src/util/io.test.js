import { it, expect, vi } from 'vitest';
import { promises as fs } from 'fs';

import writeData from './io';

// *IMPORTANT*
// 1️⃣ Mocking only affects test files, NOT production code
// The mock is only active during test execution.
// Your real app (production code) uses the actual fs module.
vi.mock('fs');

// 2️⃣ vi.mock is hoisted (moved to the top) automatically
// Unlike Jest, you can place vi.mock anywhere in the file.
// Vitest moves it above the imports behind the scenes.
import fs from 'fs';

// 3️⃣ Mocks are isolated per test file
// If you have another test file and don't call vi.mock('fs') there,
// fs will NOT be mocked in that file — it will behave normally.
// So always mock explicitly in every test file that needs it.

// ----------------------------------------------------------------

// 🔍 Spies vs Mocks - What's the difference? - To see what is spies, check on data.test.js

// A **mock** replaces the original function with a fake one.
// It doesn't run the real logic, just records interactions.
// This is useful when:
//   - You want to isolate your test from side effects (DB, network)
//   - You want full control over what the function returns
//
// Example:
// const mockFn = jest.fn().mockReturnValue(42);
// mockFn('hello');
// expect(mockFn).toHaveBeenCalledWith('hello');
// expect(mockFn()).toBe(42);
//
// 🔁 Summary:
// - Use spies to observe real behavior.
// - Use mocks to isolate and simulate behavior.

// Mock the entire 'fs' module (so all its methods) to prevent actual file system operations during the test.
vi.mock('fs');

it('should execute the writeFile method', () => {
  // Define test data that will be written to the file.
  const testData = 'Test';
  // Define a test filename for the mock write operation.
  const testFilename = 'test.txt';

  // Why toBeUndefined? because writeData returns a Promise that resolves with undefined because fs.writeFile
  // doesn't return any value. The actual file is written as a side effect, not as a return value.
  // This side effect is the act of saving the file to the hard drive via the file system (disk I/O)
  // return expect(writeData(testData, testFilename)).resolves.toBeUndefined();

  // Call the function under test (our own function), which should use fs.writeFile internally.
  writeData(testData, testFilename);

  // Assert that the mocked fs.writeFile function was called — verifying that our function behaved correctly.
  expect(fs.writeFile).toBeCalled();
});

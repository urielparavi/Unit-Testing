import { describe, expect, it, vi } from 'vitest';
import { generateReportData } from './data';

// 🔍 Spies vs Mocks - What's the difference?
//
// A **spy** tracks a real function without replacing it.
// It lets you observe:
//   - Was the function called?
//   - How many times?
//   - With what arguments?
//   - What did it return?
//
// ✅ The real function still runs!
// Use a spy when you want to monitor behavior without interfering.
//
// Example:
// const spy = jest.spyOn(Math, 'max');
// Math.max(3, 5);
// expect(spy).toHaveBeenCalledWith(3, 5);
// spy.mockRestore(); // Always clean up after spying
//
// ---
//
// 🔁 Summary:
// - Use spies to observe real behavior.
// - Use mocks to isolate and simulate behavior.

// We demonstrate test with spy
describe('generateReportData()', () => {
  it('should execute logFn if provided', () => {
    // Create a mock function using Vitest's vi.fn().
    // This function is not linked to any real implementation — it's a fake function (mock).
    // It "records" every time it's called, including:
    // - How many times it was called
    // - With what arguments it was called
    // - In what order (if used alongside other mocks)
    //
    // This makes it useful for *spying* on how it was used during tests,
    // even though it's technically a mock (not a spy on a real function).
    //
    // In this context, we're passing it to our function under test (generateReportData),
    // and later verifying whether our function *called* this logger at least once.
    // So, vi.fn() records how the function is used, and expect(...) verifies that usage.
    const logger = vi.fn(); // Create a mock function using Vitest (vi.fn)

    // 🧪 Replaces the behavior of the **first call only** to the logger function.
    // The function does nothing (noop) on the first call.
    // Useful when you want to test a different behavior only for the first call (e.g., simulating a temporary failure).
    // logger.mockImplementationOnce(() => {});

    // 🧪 Replaces the behavior of **all calls** to the logger function (not just the first one).
    // The function does nothing — it doesn't print anything, return a value, it simply ignores the call.
    // Useful when you want to "silence" or control the behavior of the function during the entire test.
    // logger.mockImplementation(() => {});

    generateReportData(logger); // Call the function under test and pass the mock logger

    expect(logger).toBeCalled(); // Verify that the logger was called at least once
  });
});

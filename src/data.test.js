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

    generateReportData(logger); // Call the function under test and pass the mock logger

    expect(logger).toBeCalled(); // Verify that the logger was called at least once
  });
});

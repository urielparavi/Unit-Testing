import { expect, it } from 'vitest';
import { generateToken } from './async-example';

it('should generate a token value', (done) => {
  const testUserEmail = 'test@test.com';

  generateToken(testUserEmail, (err, token) => {
    // ***Explanation for done***
    // ⚠️ 'done' is a function provided by Jest/Vitest to indicate when
    // an asynchronous test (with a callback) has completed.
    //
    // 🧠 This is necessary when testing functions that use callbacks
    // (like 'generateToken') instead of returning a Promise.
    //
    // ❗ If you don't call 'done()', the test framework will assume
    // the test is still running and eventually fail due to a timeout.
    //
    // ✅ Calling 'done()' tells the framework: "We're done, go ahead and evaluate the test."

    // expect(token).toBeDefined();
    // done(); // 🏁 Signal that the test is finished

    // *Sidenote* - If we were doing wrong expectation, the test will not catch it, because he won't continue.
    // So for this case we wanna do trycatch for success and fail, or to use Promise
    // expect(token).toBe(2); // ⛔ An error will be thrown here
    // done(); // ❌ This will never run because the line above threw an error
    try {
      expect(token).toBeDefined();
      // expect(token).toBe(2);
      done();
    } catch (err) {
      done(err);
    }
  });
});

it('should generate a token value', (done) => {
  const testUserEmail = 'test@test.com';

  generateToken(testUserEmail, (err, token) => {
    expect(token).toBe(2);
    done();
  });
});

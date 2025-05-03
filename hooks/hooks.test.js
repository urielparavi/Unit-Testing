import { it, expect, beforeAll, beforeEach, afterEach, afterAll } from 'vitest';

import { User } from './hooks';

// 🧪 TEST HOOKS:
// "Hooks" are special functions used to run code before or after tests.
// They help prepare or clean up the test environment so that each test starts fresh.

// Commonly used hooks:
// - beforeAll: runs once before all tests.
// - beforeEach: runs before every single test (useful for setting up).
// - afterEach: runs after every test (useful for cleanup).
// - afterAll: runs once after all tests are done.

// Example:
// beforeEach(() => {
//   user = new User('test@test.com'); // creates a new user before each test
// });

const testEmail = 'test@test.com';
let user;

beforeAll(() => {
  user = new User(testEmail);
  console.log('beforeAll()');
});

beforeEach(() => {
  user = new User(testEmail);
  console.log('beforeEach()');
});

afterEach(() => {
  // user = new User(testEmail);
  console.log('afterEach()');
});

afterAll(() => {
  console.log('afterAll()');
});

// 🧪 .concurrent in Vitest:
// Use .concurrent to run multiple tests at the same time (in parallel).
// It can speed up your test suite when tests are independent of each other.

// Example:
// it.concurrent('should do something quickly', async () => {
//   // Your test logic here
// });

// ⚠️ Be careful:
// Don't use .concurrent if tests rely on shared state or modify global variables,
// as this can cause unexpected behavior or test failures.

// If we doing concurrent in suit, we add this only to our suit, so we don't need to add this for each single test
// describe.concurrent();

// concurrent - here we using it individual for each test
it.concurrent('should update the email', () => {
  const newTestEmail = 'test2@test.com';

  user.updateEmail(newTestEmail);

  expect(user.email).toBe(newTestEmail);
});

it.concurrent('should have an email property', () => {
  expect(user).toHaveProperty('email');
});

it.concurrent('should store the provided email value', () => {
  expect(user.email).toBe(testEmail);
});

it.concurrent('should clear the email', () => {
  user.clearEmail();

  expect(user.email).toBe('');
});

it.concurrent(
  'should still have an email property after clearing the email',
  () => {
    user.clearEmail();

    expect(user).toHaveProperty('email');
  }
);

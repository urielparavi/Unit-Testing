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

it('should update the email', () => {
  const newTestEmail = 'test2@test.com';

  user.updateEmail(newTestEmail);

  expect(user.email).toBe(newTestEmail);
});

it('should have an email property', () => {
  expect(user).toHaveProperty('email');
});

it('should store the provided email value', () => {
  expect(user.email).toBe(testEmail);
});

it('should clear the email', () => {
  user.clearEmail();

  expect(user.email).toBe('');
});

it('should still have an email property after clearing the email', () => {
  user.clearEmail();

  expect(user).toHaveProperty('email');
});

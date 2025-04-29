import { it, expect } from 'vitest';

import { add } from './math';

it('should summarize all number values in an array', () => {
  // Arrange - Set up everything needed for the test: inputs, variables, mocks, etc.
  const numbers = [1, 2];

  // Act - Execute the function or code we're testing.
  const result = add(numbers);

  // Assert - Check the result to make sure it matches expectations.
  const expectedResult = numbers.reduce(
    (prevValue, currentValue) => prevValue + currentValue,
    0
  );
  expect(result).toBe(expectedResult);
});

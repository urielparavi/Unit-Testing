import { it, expect } from 'vitest';

import { add } from './math';

it('should summarize all number values in an array', () => {
  // Arrange - Set up everything needed for the test: inputs, variables, mocks, etc.
  const numbers = [1, 2];

  // Act - Execute the function or code we're testing.
  const result = add(numbers);

  // Assert - Check the result to make sure it matches expectations.
  const expectedResult = numbers.reduce(
    (prevValue, curValue) => prevValue + curValue,
    0
  );
  expect(result).toBe(expectedResult);
});

// *Sidenote* -  This test works since we forced convert to a number in the function
it('should yield NaN if a least one invalid number is provided', () => {
  // Arrange
  const inputs = ['invalid', 1];

  // Act
  const result = add(inputs);

  // Assert
  expect(result).toBeNaN();
});

// *Sidenote* - This test works since we forced convert to a number in the function
it('should yield a correct sum if an array of numeric string values is provided', () => {
  const numbers = ['1', '2'];

  const result = add(numbers);

  const expectedResult = numbers.reduce(
    (prevValue, curValue) => +prevValue + +curValue
  );

  expect(result).toBe(expectedResult);
});

it('should yield 0 if an empty array is provided', () => {
  const numbers = [];

  const result = add(numbers);

  expect(result).toBe(0);
});

it('should throw an error if no value is passed into the function', () => {
  // We can to the same like resultFn, but the resultFn is a better approach
  // try {
  //   const result = add();
  // } catch (error) {
  //   expect(error).toBeDefined();
  // }

  // We wrap our add function with anonymous function, so that our add function will not execute immediately when JS will come
  // to this line, but when our resultFn will call, so it will be when we run 'npm test with vitest
  const resultFn = () => {
    add();
  };
  expect(resultFn).toThrow();
});

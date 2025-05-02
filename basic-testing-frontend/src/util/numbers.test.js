import { describe, it, expect } from 'vitest';

import { cleanNumbers, transformToNumber } from './numbers';

describe('transformToNumber()', () => {
  it('should transform a string number to a number of type number', () => {
    const input = '1';

    const result = transformToNumber(input);

    expect(result).toBeTypeOf('number');
  });

  // We demonstrated that if we return NaN in our function (which its type is actually a number), this test will
  // fail, because now we check the case that our function convert our value,  but since it returned NaN, it will
  // no longer convert it to a number
  it('should transform a string number to a number of type number', () => {
    const input = '1';

    const result = transformToNumber(input);

    expect(result).toBe(+input);
  });

  // We demonstrate that we can add multiple expectations to one and the same test, but we want they test one and same thing
  // in the end but with another values. (we could also write seperate tests for that)
  it('should yield NaN for non-transfromable values', () => {
    const input = 'invalid';
    const input2 = {};

    const result = transformToNumber(input);
    const result2 = transformToNumber(input2);

    expect(result).toBeNaN();
    expect(result2).toBeNaN();
  });
});

describe('cleanNumbers()', () => {
  // We fix this test with the following test below
  it('should return an array of number values if an array of string number values is provided', () => {
    const numberValues = ['1', '2'];

    const cleanedNumbers = cleanNumbers(numberValues);

    // *The difference between toBe() and toEqual()*

    // ✅ toBe() checks for strict equality (===) – use it for primitives:
    // numbers, strings, booleans, null, undefined

    // ✅ toEqual() checks for deep equality – use it for objects, arrays, and complex structures

    // expect(cleanedNumbers[0]).toBeTypeOf('number');
    expect(cleanedNumbers).toEqual([1, 2]); // toBe()
  });

  // // We added this for the first value instead previous check, because it's is not the most accurate.
  // it('should convert the first value to a number if string number values are provided', () => {
  //   const numberValues = ['1', '2'];

  //   const cleanedNumbers = cleanNumbers(numberValues);

  //   expect(cleanedNumbers[0]).toBeTypeOf('number');
  // });

  // // We added this for checking the all array instead previous check, because it's is not the most accurate.
  // it('should return an array of number values if an array of string number values is provided', () => {
  //   const numberValues = ['1', '2'];

  //   const cleanedNumbers = cleanNumbers(numberValues);

  //   expect(cleanedNumbers.every((val) => typeof val === 'number')).toBe(true);
  // });

  it('should throw an error if an array with at least one empty string is provided', () => {
    const numberValues = ['', 1];

    const cleanFn = () => cleanNumbers(numberValues);

    expect(cleanFn).toThrow();
  });
});

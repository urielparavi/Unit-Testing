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

describe('transformToNumber()', () => {
  it('should return an array of number values if an array of string number values is provided', () => {
    const numberValues = ['1', '2'];

    const cleanedNumbers = cleanNumbers(numberValues);

    expect(cleanedNumbers[0]).toBeTypeOf('number');
  });
});

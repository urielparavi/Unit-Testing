export function validateStringNotEmpty(value) {
  if (value.trim().length === 0) {
    throw new Error('Invalid input - must not be empty.');
  }
}

export function validateNumber(number) {
  // So if our number is of the type NaN or that is not from the typeof number, we throwing an error
  if (isNaN(number) || typeof number !== 'number') {
    throw new Error('Invalid number input.');
  }
}

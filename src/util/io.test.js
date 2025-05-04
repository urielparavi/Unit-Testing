import { it, expect } from 'vitest';
import writeData from './io';

it('should execute the writeFile method', () => {
  const testData = 'Test';
  const testFilename = 'test.txt';

  // Why toBeUndefined? because writeData returns a Promise that resolves with undefined because fs.writeFile
  // doesn't return any value. The actual file is written as a side effect, not as a return value.
  // This side effect is the act of saving the file to the hard drive via the file system (disk I/O)
  return expect(writeData(testData, testFilename)).resolves.toBeUndefined();
});

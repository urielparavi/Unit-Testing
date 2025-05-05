// Importing Vitest's mocking utilities to create mock functions
import { vi } from 'vitest';

// Creating a mock version of the 'promises' object to simulate 'fs.promises'
export const promises = {
  // Mocking the 'writeFile' function, accepting 'path' and 'data' as arguments
  writeFile: vi.fn((path, data) => {
    // Returning a manually created Promise to simulate async behavior
    return new Promise((resolve, reject) => {
      // Resolving the Promise immediately to mimic a successful file write
      resolve();
    });
  }),
};

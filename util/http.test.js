import { expect, it, vi } from 'vitest';
import { sendDataRequest } from './http';

// First way
// This represents the data we expect to receive from the server's response (response.json())
// const testResponseData = { testKey: 'testData' };
// // Mocking the fetch function
// const testFetch = vi.fn((url, options) => {
//   return new Promise((resolve, reject) => {
//     // This is the mocked response from fetch
//     const testResponse = {
//       ok: true, // Simulates a successful response (HTTP status 200)
//       json() {
//         // Simulating the json() method of the response object
//         return new Promise((resolve, reject) => {
//           resolve(testResponseData); // The data we expect to receive from the server
//         });
//       },
//     };
//     resolve(testResponse); // Resolves the promise with the mocked response
//   });
// });

// Second way - The cleaner way
const testResponseData = { testKey: 'testData' };

const testFetch = vi.fn((url, options) => {
  const testResponse = {
    ok: true,
    json() {
      // Returning a Promise directly from json() – just like the real fetch
      return Promise.resolve(testResponseData);
    },
  };

  // Return the whole mocked response as a Promise
  return Promise.resolve(testResponse);
});

// Stub the global fetch function to replace it with our mocked version.
// This is used for global functions like fetch, setTimeout, etc. — functions that are not imported manually.
// It prevents real network requests during testing and lets us fully control the response behavior.
vi.stubGlobal('fetch', testFetch);

it('should return any available response data', () => {
  // 💾 testData – the data we send to the function and the server (the body of the POST request)
  const testData = { key: 'test' };

  return expect(sendDataRequest(testData)).resolves.toEqual(testResponseData);
});

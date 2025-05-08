import { expect, it, vi } from 'vitest';
import { sendDataRequest } from './http';
import { HttpError } from './errors';

// First way
// This represents the data we expect to receive from the server's response (response.json())
// const testResponseData = { testKey: 'testData' };
// // Mocking the fetch function
// const testFetch = vi.fn((url, options) => {
// Simulate a validation step in the mock fetch function:
// If the request body is not a string (i.e., not JSON.stringify-ed),
// we reject the promise to mimic a client-side error.
// This prevents the simulated request from being "sent" to the server,
// and helps ensure that the tested code is properly converting data to JSON
// before making an HTTP request.
//   if (typeof options.body !== 'string'){
//     return reject('Not a srting.')
//   }
//     return new Promise((resolve, reject) => {
//       // This is the mocked response from fetch
//       const testResponse = {
//         ok: true, // Simulates a successful response (HTTP status 200)
//         json() {
//           // Simulating the json() method of the response object
//           return new Promise((resolve, reject) => {
//             resolve(testResponseData); // The data we expect to receive from the server
//           });
//         },
//       };
//       resolve(testResponse); // Resolves the promise with the mocked response
//     });
// });

// Second way - The cleaner way
const testResponseData = { testKey: 'testData' };

const testFetch = vi.fn((url, options) => {
  // Simulate a validation step in the mock fetch function:
  // If the request body is not a string (i.e., not JSON.stringify-ed),
  // we reject the promise to mimic a client-side error.
  // This prevents the simulated request from being "sent" to the server,
  // and helps ensure that the tested code is properly converting data to JSON
  // before making an HTTP request.
  if (typeof options.body !== 'string') {
    return Promise.reject('Not a srting.');
  }
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

it('should convert the provided data to JSON before sending the request', async () => {
  const testData = { key: 'test' };

  let errorMessage;

  try {
    await sendDataRequest(testData);
  } catch (error) {
    // errorMessage = error - So the error we provided 'Not a string'
    errorMessage = error;
  }
  // return expect(sendDataRequest(testData)).not.rejects.toBe('Not a srting.');

  // We expect that the error message will NOT be 'Not a string.'
  // This means that the body was properly converted to a string (using JSON.stringify)
  // before being sent to the mock fetch function.
  // If the body was correctly stringified, the fetch mock will not reject the promise
  // with the error 'Not a string.', and the request will proceed as expected.
  // Essentially, this test ensures that the code is correctly handling the conversion
  // of the data into JSON format before making the HTTP request.
  expect(errorMessage).not.toBe('Not a string.');
});

it('should throw an HttpError in case of non-ok responses', () => {
  // In this test, we use mockImplementationOnce to temporarily override the behavior of the fetch mock function
  // for a single call.
  // This is useful when we want to simulate a specific scenario – in this case, a failed HTTP response with ok: false.
  // Normally, our fetch mock returns ok: true, but here we deliberately return ok: false to test error handling.
  // This allows us to verify that sendDataRequest correctly throws a custom HttpError (and not a generic Error)
  // when it encounters a non-ok response from the server.
  // mockImplementationOnce is ideal for one-time overrides like this, letting us test edge cases without affecting
  // other tests.
  testFetch.mockImplementationOnce((url, options) => {
    const testResponse = {
      ok: false,
      json() {
        return Promise.resolve(testResponseData);
      },
    };
    return Promise.resolve(testResponse);
  });

  const testData = { key: 'test' };

  return expect(sendDataRequest(testData)).rejects.toBeInstanceOf(HttpError);
});

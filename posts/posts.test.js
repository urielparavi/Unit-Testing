// Importing the necessary functions from the vitest library (including beforeEach, describe, expect, it)
import { beforeEach, describe, expect, it } from 'vitest';
// Importing the extractPostData function that is being tested from the posts.js file
import { extractPostData } from './posts';

// Defining sample values that will be used for testing
const testTitle = 'Test title';
const testContent = 'Test content';
// Variable for the form data, which will be defined before each test
let testFormData;

// Describing the group of tests for the extractPostData function
describe('extractPostData()', () => {
  // beforeEach runs the code inside it before each test. Here, we create the testFormData anew for every test.
  beforeEach(() => {
    // Defining the fake (without vitest) testFormData object with title and content values
    testFormData = {
      title: testTitle, // The title of the post
      content: testContent, // The content of the post
      // The get function simulates the behavior of FormData.get()
      get(identifier) {
        return this[identifier]; // Returns the value of the corresponding field (title or content)
      },
    };
  });

  // A single test to ensure that the extractPostData function works correctly
  it('should extract title and content from the provided form data', () => {
    // Calling the extractPostData function with testFormData, which returns the extracted data from the form
    const data = extractPostData(testFormData);

    // Checking if the function returns the correct title as expected
    expect(data.title).toBe(testTitle); // Expects the title to be 'Test title'
    // Checking if the function returns the correct content as expected
    expect(data.content).toBe(testContent); // Expects the content to be 'Test content'
  });
});

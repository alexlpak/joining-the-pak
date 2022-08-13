import { capitalizeString, generateRandomString } from '../text';

test(`strings can be capitalized individually`, () => {
    const string = 'alex';
    const expectedOutput = 'Alex';
    const actualOutput = capitalizeString(string);
    expect(actualOutput).toBe(expectedOutput);
});

test('all words in string can be capitalized', () => {
    const string = 'the cow jumped over the moon';
    const expectedOutput = 'The Cow Jumped Over The Moon';
    const actualOutput = capitalizeString(string);
    expect(actualOutput).toBe(expectedOutput);
});

test('random string generates with correct length', () => {
    const actualOutput = generateRandomString();
    expect(actualOutput).toHaveLength(13);
})
import { sliceIntoChunks } from '../array';

test('arrays can be split up into chunks', () => {
    const array = [1,2,3,4,5,6,7,8,9,10];
    const expectedValue = [[1,2,3,4,5],[6,7,8,9,10]];

    const chunks = sliceIntoChunks(array, 5);

    expect(chunks).toEqual(expectedValue);
});
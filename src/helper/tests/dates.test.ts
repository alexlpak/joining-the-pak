import { getDifferenceSinceDate } from '../dates';

test('get difference from 2022-01-01 to 2020-01-01', () => {
    const expectedDifference = {
        days: 731,
        months: 24,
        years: 2
    };
    const actualDifference = getDifferenceSinceDate('2020-01-01', '2022-01-01');
    expect(actualDifference).toEqual(expectedDifference);
});
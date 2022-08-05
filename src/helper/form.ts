import { Record } from '../api/guests';

export const getNameFromRecord = (record: Record) => {
    const { firstName, lastName } = record.fields;
    return `${firstName} ${lastName}`;
};
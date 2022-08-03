import { Record } from '../db/airtable';

export const getNameFromRecord = (record: Record) => {
    const { firstName, lastName } = record.fields;
    return `${firstName} ${lastName}`;
};
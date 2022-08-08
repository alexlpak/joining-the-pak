import { Record } from '../api/guests';

export const getFirstAndLastNameByRecordId = (records: Record[], id: string) => {
    const foundRecord = records.find(record => record.id === id);
    if (foundRecord) {
        const { firstName, lastName } = foundRecord.fields;
        const name = `${firstName} ${lastName}`;
        return name;
    };
    return id;
};
import axios from 'axios';
import { sliceIntoChunks } from '../helper/array';
import { auditEvent } from './audit';

const requestURL = `https://api.airtable.com/v0/appZEyPrBKugppqwn/tblDVFDWh4XLMIcC3`;
const authHeader = { Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}` };

const baseURL = 'https://joining-the-pak.herokuapp.com';

export type RSVPResponse = 'Yes' | 'No' | '';

export type GuestEntry = {
    firstName: string;
    lastName: string;
    partyId?: string;
    allowedGuests?: number;
    response?: RSVPResponse;
    type?: 'Invited' | 'Guest';
    changedBy?: string;
    dateModified?: string;
};

export type GuestEntries = GuestEntry[];

export type Record = {
    id?: string;
    fields: GuestEntry;
    createdTime?: string;
};

export type FetchedRecord = {
    id: string;
    fields: GuestEntry;
    createdTime: string;
};

export type RequestResponse = {
    data?: Record[];
    status?: number;
};

export type FetchResponse = {
    records: FetchedRecord[];
};

export const getDataFromTable = async () => {
    const response = await axios.get(`${baseURL}/get-guests`);
    return await response.data as FetchResponse;
};

export const getRSVPByFirstAndLastName = async (first: string , last: string) => {
    const response: FetchResponse = await getDataFromTable();
    if (response.records) {
        const results = response.records.filter(record => {
            const { firstName, lastName } = record.fields;
            return (firstName.toLowerCase() === first.toLowerCase()) && (lastName.toLowerCase() === last.toLowerCase());
        });
        return results;
    };
    return [];
};

export const getRSVPByPartyId = async (id: string) => {
    const response: FetchResponse = await getDataFromTable();
    if (response.records) {
        const results = response.records.filter(record => {
            const { partyId } = record.fields;
            return partyId === id;
        });
        return results;
    };
    return [];
};

export const updateGuests = async (records: Record[]) => {
    const updateRecords = records.map(record => {
        const output: Record = {
            ...record,
            fields: {
                ...record.fields,
                dateModified: new Date().toISOString()
            }
        }
        return output;
    });
    const response: RequestResponse = await axios({
        method: 'patch',
        url: requestURL,
        headers: authHeader,
        data: { records: updateRecords }
    });
    const ip = await axios.get('https://api.ipify.org');
    await auditEvent({
        data: JSON.stringify(updateRecords),
        type: ['modified'],
        recordId: records[0].fields.changedBy || '',
        ipAddress: ip.data || ''
    });
    return response;
};

export const deleteGuests = async (recordIds: string[]) => {
    const recordIdsSlices = sliceIntoChunks(recordIds, 10);
    const requests = recordIdsSlices.map(slice => {
        const queryString = slice.map(id => {
            return encodeURI(`records[]=${id}`);
        });
        const composedUrl = `${requestURL}?${queryString.join('&')}`;
        const request = axios({
            method: 'delete',
            url: composedUrl,
            headers: authHeader
        });
        return request;
    });
    const fetchedRecords = await getDataFromTable();
    const deleteRecords = fetchedRecords.records.filter(record => recordIds.includes(record.id));
    const ip = await axios.get('https://api.ipify.org');
    await auditEvent({
        data: JSON.stringify(deleteRecords),
        type: ['deleted'],
        recordId: 'System',
        ipAddress: ip.data || ''
    });
    return await Promise.all(requests);
};

export const createNewEntries = async (records: Record[]) => {
    const updateRecords = records.map(record => {
        const output: Record = {
            ...record,
            fields: {
                ...record.fields,
                dateModified: new Date().toISOString()
            }
        }
        return output;
    });
    const response: RequestResponse = await axios({
        method: 'post',
        url: requestURL,
        headers: authHeader,
        data: { records: updateRecords }
    });
    const ip = await axios.get('https://api.ipify.org');
    await auditEvent({
        data: JSON.stringify(records),
        type: ['created'],
        recordId: records[0].fields.changedBy || '',
        ipAddress: ip.data || ''
    });
    return response;
};
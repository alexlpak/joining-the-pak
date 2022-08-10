import axios from 'axios';

const requestURL = `https://api.airtable.com/v0/appZEyPrBKugppqwn/tblDVFDWh4XLMIcC3`;
const authHeader = { Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}` };

const baseURL = `https://joining-the-pak.herokuapp.com`;
// const baseURL = `http://localhost:5505`;


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
    return await fetch(`${baseURL}/get-guests`).then(res => res.json()).then(data => data) as FetchResponse;
};

export const getMetrics = async () => {
    const response: FetchResponse = await getDataFromTable();
    if (response.records) {
        const invited = response.records.filter(record => {
            const { type } = record.fields;
            return type === 'Invited';
        });
        const guests = response.records.filter(record => {
            const { type } = record.fields;
            return type === 'Guest';
        });
        const yesResponse = response.records.filter(record => {
            const { response } = record.fields;
            return response === 'Yes';
        });
        const noReponse = response.records.filter(record => {
            const { response } = record.fields;
            return response === 'No';
        });
        const pendingResponse = response.records.filter(record => {
            const { response } = record.fields;
            return !response;
        });
        const totalResponse = response.records.filter(record => {
            const { response } = record.fields;
            return response;
        });
        return {
            invited: invited.length,
            guests: guests.length,
            yesResponse: yesResponse.length,
            noResponse: noReponse.length,
            pendingResponse: pendingResponse.length,
            totalResponse: totalResponse.length
        };
    };
    return false;
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
    return response;
};

export const deleteGuests = async (recordIds: string[]) => {
    const queryString = recordIds.map(id => {
        return encodeURI(`records[]=${id}`);
    });
    const composedUrl = `${requestURL}?${queryString.join('&')}`;
    const response = await axios({
        method: 'delete',
        url: composedUrl,
        headers: authHeader
    });
    return response;
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
    return response;
};
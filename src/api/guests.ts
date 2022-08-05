import axios from 'axios';

const requestURL = `https://api.airtable.com/v0/appZEyPrBKugppqwn/guest-list`;
const authHeader = { Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}` };

const baseURL = `https://joining-the-pak.herokuapp.com`;

export type RSVPResponse = 'Yes' | 'No' | '';

export type GuestEntry = {
    firstName?: string;
    lastName?: string;
    partyId?: string;
    allowedGuests?: number;
    response?: RSVPResponse;
    type?: 'Invited' | 'Guest';
    dateModified?: string;
};

export type GuestEntries = GuestEntry[];

export type Record = {
    id?: string;
    fields: GuestEntry;
    createdTime?: string;
};

export type RequestResponse = {
    data?: Record[];
    status?: number;
}

export const getDataFromTable = async () => {
    return await fetch(`${baseURL}/get-guests`).then(res => res.json()).then(data => data) as Record[];
};

export const getRSVPByFirstAndLastName = async (firstName: string | undefined, lastName: string | undefined) => {
    if (!firstName && !lastName) return false;
    const filterRequestURL = `${requestURL}?filterByFormula=AND(firstName="${firstName}", lastName="${lastName}")`;
    try {
        const response = await axios({ method: 'get', url: filterRequestURL, headers: authHeader });
        const { records } = response.data;
        return records;
    }
    catch { return [] };
};

export const getRSVPByPartyId = async (partyId: string | undefined) => {
    if (!partyId) return [];
    const filterRequestURL = `${requestURL}?filterByFormula={partyId}="${partyId}"`;
    try {
        const response = await axios({ method: 'get', url: filterRequestURL, headers: authHeader });
        const { records } = response.data;
        return records;
    }
    catch {
        return [];
    };
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
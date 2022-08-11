import axios from 'axios';

const baseURL = 'https://joining-the-pak.herokuapp.com';
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
    const response = await axios.get(`${baseURL}/getGuests`);
    return await response.data as FetchResponse;
};

export const getRSVPByFirstAndLastName = async (first: string , last: string) => {
    const rsvp = await axios.get(`${baseURL}/getRsvpByName?firstName=${first}&lastName=${last}`);
    if (rsvp.data) return rsvp.data;
    else return [];
};

export const getRSVPByPartyId = async (id: string) => {
    const rsvp = await axios.get(`${baseURL}/getRsvpByPartyId?id=${id}`);
    if (rsvp.data) return rsvp.data;
    else return [];
};

export const updateGuests = async (records: Record[]) => {
    const response = await axios({
        method: 'post',
        url: `${baseURL}/updateGuests`,
        data: { records: records }
    });
    return response;
};

export const deleteGuests = async (recordIds: string[]) => {
    const response = await axios({
        method: 'post',
        url: `${baseURL}/deleteGuests`,
        data: recordIds
    });
    return response;
};

export const createNewEntries = async (records: Record[]) => {
    const response = await axios({
        method: 'post',
        url: `${baseURL}/createNewGuests`,
        data: records
    });
    return response;
};
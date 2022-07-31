import axios from 'axios';

const requestURL = `https://api.airtable.com/v0/appZEyPrBKugppqwn/guest-list`;
const authHeader = { Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}` };

export const getDataFromTable = async () => {
    try {
        const response = await axios({
            method: 'get',
            url: requestURL,
            headers: authHeader
        });
        const { records } = response.data;
        return records;
    }
    catch (e) {
        return false;
    };
};

export const getRSVPByFirstAndLastName = async (firstName: string | undefined, lastName: string | undefined) => {
    if (!firstName && !lastName) return false;
    const filterRequestURL = `${requestURL}?filterByFormula=AND(firstName="${firstName}", lastName="${lastName}")`;
    try {
        const response = await axios({
            method: 'get',
            url: filterRequestURL,
            headers: authHeader
        });
        const { records } = response.data;
        return records;
    }
    catch {
        return false;
    };
};

export const getRSVPByPartyId = async (partyId: string | undefined) => {
    if (!partyId) return false;
    const filterRequestURL = `${requestURL}?filterByFormula={partyId}="${partyId}"`;
    try {
        const response = await axios({
            method: 'get',
            url: filterRequestURL,
            headers: authHeader
        });
        const { records } = response.data;
        return records;
    }
    catch {
        return false;
    };
};

export type GuestEntry = {
    firstName?: string;
    lastName?: string;
    partyId?: string;
    allowedGuests?: number;
    response?: 'Yes' | 'No';
    type?: 'Invited' | 'Guest';
    dateModified?: string;
};

export type Record = {
    id: string;
    fields: GuestEntry;
};

export type Records = {
    records: Record[];
};

// TODO: type this correctly
export const updateEntries = async (records: any) => {
    if (!records) return false;
    try {
        const response = await axios({
            method: 'put',
            url: requestURL,
            headers: authHeader,
            data: records
        });
        return response;
    }
    catch {
        return false;
    };
};

export const createNewEntry = ({
        firstName,
        lastName,
        partyId,
        allowedGuests,
        response,
        type = 'Invited'
    }: GuestEntry) => {
    const data = {
        records: [
            { fields: {
                firstName,
                lastName,
                partyId,
                allowedGuests,
                response,
                type,
                dateModified: new Date().toISOString()
            }}
        ]
    };
    axios({
        method: 'post',
        url: requestURL,
        headers: authHeader,
        data: data
    })
    .then(response => console.log(response))
    .catch(error => console.log(error));
};
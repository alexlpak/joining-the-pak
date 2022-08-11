import axios from 'axios';

const requestURL = `https://api.airtable.com/v0/appZEyPrBKugppqwn/tblaeJbhnclvbWKm7`;
const authHeader = { Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}` };

type AuditEntry = {
    data: string;
    type: ['created' | 'modified' | 'deleted'];
    recordId: string;
    ipAddress: string;
};

export const auditEvent = async (auditObj: AuditEntry) => {
    try {
        const response = axios({
            url: requestURL,
            method: 'post',
            headers: authHeader,
            data: { records: [{ fields: auditObj }] }
        });
        return response;
    }
    catch {
        return false;
    };
};
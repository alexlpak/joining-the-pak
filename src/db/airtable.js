import axios from 'axios';

const requestURL = `https://api.airtable.com/v0/appZEyPrBKugppqwn/guest-list`;
const authHeader = { Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}` };

export const getDataFromTable = () => {
    axios({
        method: 'get',
        url: requestURL,
        headers: authHeader
    })
    .then(response => { console.log(response.data.records) })
    .catch(error => console.error('ahhh!', error) );
};

export const createNewEntry = ({
        firstName,
        lastName,
        householdId,
        allowedGuests,
        response,
        type = 'Invited'
    }) => {
    const data = {
        records: [
            { fields: {
                firstName,
                lastName,
                householdId,
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
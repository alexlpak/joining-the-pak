import React, { useState } from 'react';
import Form from '../../../components/Form';
import ButtonSelect from '../../../components/ButtonSelect';
import Button, { ButtonWrapper } from '../../../components/Button';
import Typography from '../../../components/Typography';
import { getRSVPByPartyId } from '../../../db/airtable';
import { useRSVPFormContext } from '../../../contexts/RSVPFormContext';

interface FormValue {
    response: 'Yes' | 'No' | '';
};

const RSVPResponse: React.FC = () => {
    const { record, setStep, setResponse, setParty } = useRSVPFormContext();

    const initValue: FormValue = {
        response: ''
    };

    const [value, setValue] = useState(initValue);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setResponse(value.response);
        setLoading(true);
        const party = await getRSVPByPartyId(record.fields.partyId);
        setLoading(false);
        if (party.length) {
            setParty(party);
            setStep('Party');
        }
        else {
            setStep('Guests');
        };
    };

    const handleChange = (value: FormValue) => {
        setValue(value);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Typography>RSVP found! Will you be attending?</Typography>
            <ButtonSelect
                name='response'
                options={['Yes', 'No']}
                onChange={handleChange}
            />
            <ButtonWrapper>
                <Button
                    onClick={() => setStep('Search')}
                >
                    <Typography bold>Back</Typography>
                </Button>
                <Button
                    loading={loading}
                    secondary
                    type='submit'
                    disabled={!value.response}
                >
                    <Typography bold>Next</Typography>
                </Button>
            </ButtonWrapper>
        </Form>
    );
};

export default RSVPResponse;
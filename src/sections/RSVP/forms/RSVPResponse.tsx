import React, { useState } from 'react';
import Form from '../../../components/Form';
import ButtonSelect from '../../../components/ButtonSelect';
import Button, { ButtonWrapper } from '../../../components/Button';
import Typography from '../../../components/Typography';
import { getRSVPByPartyId } from '../../../api/guests';
import { useRSVPFormContext } from '../../../contexts/RSVPFormContext';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

interface FormValue {
    response: 'Yes' | 'No' | '';
};

const RSVPResponse: React.FC = () => {
    const { record, setStep, setResponse, setParty, setModalOpen } = useRSVPFormContext();

    const initValue: FormValue = {
        response: ''
    };

    const { allowedGuests } = record?.fields || {};

    const [value, setValue] = useState(initValue);
    const [loading, setLoading] = useState(false);

    const handleSubmitClick = () => {
        setResponse(value.response);
        setModalOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setResponse(value.response);
        setLoading(true);
        const { partyId } = record.fields;
        if (partyId) {
            const party = await getRSVPByPartyId(partyId);
            setLoading(false);
            if (party.length) {
                setParty(party);
                setStep('Party');
            }
        }
        else if (!partyId && (allowedGuests && allowedGuests > 0)) {
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
                {((!!record.fields.partyId) || (!!allowedGuests && value.response !== 'No')) && <Button
                    loading={loading}
                    secondary
                    type='submit'
                    disabled={!value.response}
                >
                    <Typography bold>Next</Typography>
                </Button>}
                {((!allowedGuests && !record.fields.partyId) || (!!allowedGuests && !record.fields.partyId && value.response === 'No')) && <Button
                    loading={loading}
                    secondary
                    onClick={handleSubmitClick}
                    disabled={!value.response}
                    icon={faPaperPlane}
                >
                    <Typography bold>Submit</Typography>
                </Button>}
            </ButtonWrapper>
        </Form>
    );
};

export default RSVPResponse;

import React, { useState } from 'react';
import Form from '../../../components/Form';
import Button, { ButtonWrapper } from '../../../components/Button';
import ButtonSelect from '../../../components/ButtonSelect';
import { useRSVPFormContext } from '../../../contexts/RSVPFormContext';
import Typography from '../../../components/Typography';
import { Record } from '../../../api/guests';
import Checkbox from '../../../components/Checkbox';
import { FormFieldValue } from '../../../types/forms';

const RSVPParty: React.FC = () => {
    const { party, setGuests, setStep, setModalOpen } = useRSVPFormContext();
    const [selectedParty, setSelectedParty] = useState([] as Record[]);
    const [singleResponse, setSingleResponse] = useState(false);

    type Name = `${string} ${string}`;
    type ChangeValue = {
        party: Name[];
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setGuests(selectedParty.map(record => record.fields));
        setModalOpen(true);
    };

    const handleChange = (value: ChangeValue) => {
        const partyRecords = value.party.map(guest => {
            const firstName = guest.split(' ')[0];
            const lastName = guest.split(' ')[1];
            const filtered = party.filter(guest => {
                return guest.fields.firstName === firstName &&
                guest.fields.lastName === lastName;
            });
            return filtered[0];
        });
        setSelectedParty(partyRecords);
    };

    const { record } = useRSVPFormContext();

    const handleCheck = (value: FormFieldValue) => {
        const response = Object.values(value)[0];
        setSingleResponse(response);
        if (response === true) setSelectedParty([]);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Typography>{`Your RSVP is linked to others in your party.\nYou can RSVP for them by clicking their name below.`}</Typography>
            <Typography>RSVP for yourself only by clicking the checkbox below.</Typography>
            <ButtonSelect
                name='party'
                onChange={handleChange}
                multi
                disabled={singleResponse}
                deselectAll={singleResponse}
                options={party.filter(party => party.id !== record.id).map(party => `${party.fields.firstName} ${party.fields.lastName}`)}
            />
            <Checkbox name='singleResponse' onChange={handleCheck} secondary initValue={singleResponse} label='I am only responding for myself.' />
            <ButtonWrapper>
                <Button onClick={() => setStep('Response')}>
                    <Typography bold>Back</Typography>
                </Button>
                <Button type='submit' secondary disabled={(selectedParty.length === 0 && !singleResponse) || (selectedParty.length > 0 && singleResponse)}>
                    <Typography bold>Confirm</Typography>
                </Button>
            </ButtonWrapper>
        </Form>
    );
};

export default RSVPParty;
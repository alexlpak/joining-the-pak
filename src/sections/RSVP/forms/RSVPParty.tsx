import React, { useState } from 'react';
import Form from '../../../components/Form';
import Button, { ButtonWrapper } from '../../../components/Button';
import ButtonSelect from '../../../components/ButtonSelect';
import { useRSVPFormContext } from '../../../contexts/RSVPFormContext';
import Typography from '../../../components/Typography';
import { Record } from '../../../db/airtable';

const RSVPParty: React.FC = () => {
    const { party, setGuests, setStep, setModalOpen } = useRSVPFormContext();
    const [selectedParty, setSelectedParty] = useState([] as Record[]);

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

    return (
        <Form onSubmit={handleSubmit}>
            <Typography>{'Your RSVP is linked to others in your party.\nYou can RSVP for them by selecting them below.'}</Typography>

            <ButtonSelect
                name='party'
                onChange={handleChange}
                multi
                options={party.filter(party => party.id !== record.id).map(party => {
                    const guestName = `${party.fields.firstName} ${party.fields.lastName}`;
                    return guestName;
                })}
            />

            <ButtonWrapper>
                <Button
                    onClick={() => setStep('Response')}
                >
                    <Typography bold>Back</Typography>
                </Button>
                <Button
                    type='submit'
                    secondary
                >
                    <Typography bold>Confirm</Typography>
                </Button>
            </ButtonWrapper>
        </Form>
    );
};

export default RSVPParty;
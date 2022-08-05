import { faPaperPlane, faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import styled from 'styled-components';
import Button, { ButtonWrapper } from '../../../components/Button';
import Form from '../../../components/Form';
import Input from '../../../components/Input';
import Typography from '../../../components/Typography';
import { useRSVPFormContext } from '../../../contexts/RSVPFormContext';
import { FormFieldValue } from '../../../types/forms';
import { GuestEntry } from '../../../api/guests';
import { generateRandomString } from '../../../helper/text';

const GuestWrapper = styled.ul`
    display: flex;
    flex-direction: column;
    border: 2px solid white;
    border-radius: .5rem;
`;

const GuestItem = styled.li`
    display: flex;
    padding: 1rem;
    align-items: center;
    justify-content: space-between;
    position: relative;
    &:not(:last-child) {
        border-bottom: 2px solid white;
    };
`;

interface FormValue {
    firstName: string;
    lastName: string;
};

type Guest = `${string} ${string}`;

const ClearButton = styled(FontAwesomeIcon)`
    padding: 1rem;
    position: absolute;
    right: 0;
    &:hover {
        cursor: pointer;
    };
`;

const RSVPGuests: React.FC = () => {
    const initValue: FormValue = {
        firstName: '',
        lastName: ''
    };
    const [value, setValue] = useState(initValue);
    const [userGuests, setUserGuests] = useState([] as Guest[]);

    const { record, setStep, response, setGuests, setPartyId, setModalOpen } = useRSVPFormContext();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const partyId = generateRandomString();
        const newGuests: GuestEntry[] = userGuests.map((guest) => {
            const firstName = guest.split(' ')[0];
            const lastName = guest.split(' ')[1];
            return {
                firstName: firstName,
                lastName: lastName,
                response: response,
                partyId: partyId,
                allowedGuests: 0,
                type: 'Guest',
                dateModified: new Date().toISOString()
            } as GuestEntry;
        });
        setGuests(newGuests);
        setPartyId(partyId);
        setModalOpen(true);
    };

    const { allowedGuests } = record.fields;
    const plural = allowedGuests && allowedGuests > 1 ? 's' : '';

    const handleChange = (value: FormFieldValue) => {
        setValue((prev) => ({ ...prev, ...value }));
    };

    const addGuest = () => {
        const { firstName, lastName } = value;
        const name: Guest = `${firstName} ${lastName}`;
        if (firstName && lastName) {
            setUserGuests((prev) => [...prev, name]);
            setValue(initValue);
        };
    };

    const handleGuestClick = (guest: Guest) => {
        setUserGuests((prev) => prev.filter(listGuest => listGuest !== guest));
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Typography>{`You can add ${allowedGuests && allowedGuests} guest${plural} to your RSVP.\nPlease enter their name${plural} below to add them.`}</Typography>
            {!!userGuests.length && (
                <GuestWrapper>
                    {userGuests && userGuests.map(guest => (
                        <GuestItem key={guest}>
                            {guest}
                            <ClearButton icon={faXmark} onClick={() => handleGuestClick(guest)} />
                        </GuestItem>
                    ))}
                </GuestWrapper>
            )}
            {userGuests.length !== allowedGuests && <Input
                type='text'
                name='firstName'
                placeholder='First Name'
                onChange={handleChange}
                initValue={value.firstName}
            />}
            {userGuests.length !== allowedGuests && <Input
                type='text'
                name='lastName'
                placeholder='Last Name'
                onChange={handleChange}
                initValue={value.lastName}
            />}
            <Button
                icon={faPlus}
                onClick={addGuest}
                disabled={!(value.firstName && value.lastName) || (userGuests.length === allowedGuests) || (userGuests.includes(`${value.firstName} ${value.lastName}`))}
            >
                <Typography bold>Add Guest</Typography>
            </Button>
            <ButtonWrapper>
                <Button
                    onClick={() => setStep('Response')}
                >
                    <Typography bold>Back</Typography>
                </Button>
                <Button
                    type='submit'
                    secondary
                    icon={faPaperPlane}
                >
                    <Typography bold>Submit</Typography>
                </Button>
            </ButtonWrapper>
        </Form>
    );
};

export default RSVPGuests;
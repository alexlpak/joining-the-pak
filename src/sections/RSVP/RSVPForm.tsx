import styled, { useTheme } from 'styled-components';
import React, { useState, useEffect } from 'react';
import Button from '../../components/Button';
import ButtonSelect from '../../components/ButtonSelect';
import Input from '../../components/Input';
import Typography from '../../components/Typography';
import { addConfetti } from '../../utilities/confetti';
import { FormFieldValue } from '../../types/forms';
import { getRSVPByFirstAndLastName, GuestEntry, getRSVPByPartyId, updateEntries } from '../../db/airtable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import Modal from '../../components/Modal';

const FormWrapper = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    color: white;
    align-items: center;
    width: 20rem;
`;

const FormContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
`;

const ButtonWrapper = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    gap: 1rem;
`;

const ErrorMessage = styled.span`
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: left;
    width: 100%;
    border: 2px solid white;
    padding: 1rem;
    border-radius: .5rem;
    line-height: 1.5;
`;

const ConfirmationInfoWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const ConfirmationLabelWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const ErrorIcon = styled(FontAwesomeIcon).attrs({
    icon: faCircleExclamation,
    size: '2x'
})`
    padding: 1rem;
`;

interface FormValue {
    firstName?: string;
    lastName?: string;
    response?: string;
    guests?: string;
    [item: string]: any;
};

export type RecordValue = {
    id?: string;
    createdTime?: string;
    fields?: GuestEntry;
};

const RSVPForm: React.FC = () => {
    const theme = useTheme();

    const [value, setValue] = useState<FormValue>({});
    const [step, setStep] = useState(1);
    const [error, setError] = useState('');
    const [record, setRecord] = useState<RecordValue>({});
    const [party, setParty] = useState<RecordValue[]>([]);
    const [loading, setLoading] = useState(false);
    const [confirmModal, setConfirmModal] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const combinedRecords = [record, ...party];
        const requestRecords = combinedRecords.map(record => {
            delete record.createdTime;
            return {
                ...record,
                fields: {
                    ...record.fields,
                    response: value.response,
                    dateModified: new Date().toISOString()
                }
            };
        });
        const data = {
            records: requestRecords
        };
        try {
            const response = await updateEntries(data);
            setLoading(false);
            setConfirmModal(false);
            setStep(5);
            addConfetti();
        }
        catch {
            setLoading(false);
            alert('Something went wrong.');
        };
    };

    const handleChange = (value: FormFieldValue) => {
        setValue(prev => ({ ...prev, ...value }));
    };

    const firstStepComplete = value?.firstName && value?.lastName;

    const handleRSVPSearchClick = async () => {
        setLoading(true);
        try {
            const { firstName, lastName } = value;
            const rsvp = await getRSVPByFirstAndLastName(firstName, lastName);
            if (rsvp.length) {
                setRecord(rsvp[0]);
                setLoading(false);
                setError('');
                setStep(step => step + 1);
            }
            else {
                setLoading(false);
                setError('RSVP not found. Please make sure your first and last name is spelled correctly.');
                setValue(prev => {
                    return {
                        ...prev,
                        firstName: '',
                        lastName: ''
                    };
                });
            }            
        }
        catch {
            setLoading(false);
        };
    };

    const RSVPSearch = (
        <>
            <Typography>Please enter your first and last name to begin.</Typography>
            <Input
                initValue={value?.firstName}
                onChange={handleChange}
                type='text'
                placeholder='First Name'
                name='firstName'
            />
            <Input
                initValue={value?.lastName}
                onChange={handleChange}
                type='text'
                placeholder='Last Name'
                name='lastName'
            />
            <Button loading={loading} onClick={handleRSVPSearchClick} secondary disabled={!firstStepComplete}>Next</Button>
        </>
    );

    const secondStepComplete = !!value?.response;

    const handleRSVPResponseClick = async () => {
        setLoading(true);
        try {
            const rsvp = await getRSVPByPartyId(record?.fields?.partyId);

            if (rsvp.length) {
                setParty(() => rsvp.filter((rsvp: RecordValue) => rsvp.id !== record.id));
                setLoading(false);
                setError('');
                setStep(step => step + 1);
            }
            else if (rsvp.length === 0 || rsvp === false) {
                setLoading(false);
                setStep(4);
            }
            else {
                setLoading(false);
                setError('Something went wrong. Please try again later.')
            }
        }
        catch {
            setLoading(false);
        };
    };

    const RSVPReponse = (
        <>
            <Typography>RSVP found! Will you be attending?</Typography>
            <ButtonSelect initValue={value?.response} onChange={handleChange} name='response' options={['Yes', 'No']} />
            <ButtonWrapper>
                <Button disabled={loading} onClick={() => setStep(step => step - 1)}>Back</Button>
                <Button loading={loading} onClick={handleRSVPResponseClick} secondary disabled={!secondStepComplete}>Next</Button>
            </ButtonWrapper>
        </>
    );

    const RSVPParty = (
        <>
            <Typography>Your RSVP is linked to others in your party. You can RSVP for them by selecting them below.</Typography>
            <ButtonSelect
                initValue={value?.guests}
                onChange={handleChange}
                name='guests'
                multi
                options={party.map((record: RecordValue) => `${record?.fields?.firstName} ${record.fields?.lastName}`)}
            />
            <ButtonWrapper>
                <Button disabled={loading} onClick={() => setStep(step => step - 1)}>Back</Button>
                <Button loading={loading} onClick={() => setConfirmModal(true)} secondary>Submit</Button>
            </ButtonWrapper>
        </>
    );

    const allowedGuests = record.fields?.allowedGuests;

    const RSVPGuests = (
        <>
            <Typography>Your RSVP allows you to bring {allowedGuests} {allowedGuests && allowedGuests > 1 ? 'guests' : 'guest'}. Please enter the {allowedGuests && allowedGuests > 1 ? 'names' : 'name'} of your {allowedGuests && allowedGuests > 1 ? 'guests' : 'guest'} below.</Typography>
            <Input type='text' name='guests1' placeholder='First Name'/>
            <Input type='text' name='guests1' placeholder='Last Name'/>
        </>
    );

    const ConfirmationModal = (
        <Modal title='Confirmation'>
            <Typography>
                Please confirm the below information.
                {Array.isArray(value.guests) && value.guests.length && '\n\nYour response will update the RSVPs for all guests mentioned below.'}
            </Typography>
            <ConfirmationInfoWrapper>
                <ConfirmationLabelWrapper>
                    <Typography size='1.25rem' fontFamily='Quincy CF' color={theme.colors.main} bold>Name</Typography>
                    <Typography>{`${value?.firstName} ${value?.lastName}`}</Typography>
                </ConfirmationLabelWrapper>
                <ConfirmationLabelWrapper>
                    <Typography size='1.25rem' fontFamily='Quincy CF' color={theme.colors.main} bold>Response</Typography>
                    <Typography>{value?.response}</Typography>
                </ConfirmationLabelWrapper>
                {Array.isArray(value.guests) && value?.guests.length && <ConfirmationLabelWrapper>
                    <Typography size='1.25rem' fontFamily='Quincy CF' color={theme.colors.main} bold>Guests</Typography>
                    {value.guests && value.guests.map((guest: string) => {
                        return <Typography key={guest}>{guest}</Typography>
                    })}
                </ConfirmationLabelWrapper>}
            </ConfirmationInfoWrapper>
            <ButtonWrapper>                
                <Button disabled={loading} onClick={() => setConfirmModal(false)} secondary>Cancel</Button>
                <Button loading={loading} type='submit'>Submit</Button>
            </ButtonWrapper>
        </Modal>
    );

    const RSVPThankYou = (
        <>
            <Typography>Thank you for responding! We look forward to seeing you at the wedding!</Typography>
        </>
    );

    return (
        <FormWrapper onSubmit={handleSubmit}>
            <FormContentWrapper>
                {error && <ErrorMessage>
                    <ErrorIcon />
                    {error}
                </ErrorMessage>}
                {step === 1 && RSVPSearch}
                {step === 2 && RSVPReponse}
                {step === 3 && RSVPParty}
                {step === 4 && RSVPGuests}
                {step === 5 && RSVPThankYou}
                {confirmModal && ConfirmationModal}
            </FormContentWrapper>
        </FormWrapper>
    );
};

export default RSVPForm;
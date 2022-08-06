import React, { useState } from 'react';
import { useTheme } from 'styled-components';
import styled from 'styled-components';
import Modal from '../../../components/Modal';
import Form from '../../../components/Form';
import Typography from '../../../components/Typography';
import { getNameFromRecord } from '../../../helper/form';
import { useRSVPFormContext } from '../../../contexts/RSVPFormContext';
import Button, { ButtonWrapper } from '../../../components/Button';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { createNewEntries, Record, RSVPResponse, updateGuests } from '../../../api/guests';
import { renderConfetti } from '../../../utilities/confetti';

const LabelWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

interface LabelProps {
    children: React.ReactNode[] | React.ReactNode;
};

const Label: React.FC<LabelProps> = ({ children }) => {
    const theme = useTheme();
    return <Typography size='1.25rem' bold color={theme.colors.main}>{children}</Typography>;
};

const RSVPModal: React.FC = () => {
    const { record, response, party, partyId, guests, setModalOpen, setStep } = useRSVPFormContext();
    const [loading, setLoading] = useState(false);

    const changedByName = `${record.fields.firstName} ${record.fields.lastName}`;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (party.length) {
            const guestRecords: Record[] = guests.map(guest => {
                const guestRecord = party.filter(partyGuest => {
                    const { firstName, lastName } = partyGuest.fields;
                    return firstName === guest.firstName && lastName === guest.lastName;
                });
    
                delete guestRecord[0].createdTime;
    
                return {
                    ...guestRecord[0],
                    fields: {
                        ...guestRecord[0].fields,
                        changedBy: record.id,
                        response: response as RSVPResponse
                    }
                } as Record;
            });
            const userRecord = {
                ...record,
                fields: {
                    ...record.fields,
                    changedBy: record.id,
                    response: response as RSVPResponse
                }
            };
            delete userRecord.createdTime;
            guestRecords.push(userRecord);
    
            setLoading(true);
            const updated = await updateGuests(guestRecords);
            setLoading(false);
    
            if (updated && updated.status === 200) {
                response === 'Yes' && renderConfetti();
                setModalOpen(false);
                setStep('ThankYou');
            };
        }
        else if (!party.length && guests.length) {
            const records = guests.map(guest => {
                return {
                    fields: {
                        ...guest,
                        changedBy: record.id
                    }
                };
            });
            const userRecord = {
                ...record,
                fields: {
                    ...record.fields,
                    partyId: partyId,
                    changedBy: record.id,
                    response: response as RSVPResponse
                }
            };
            delete userRecord.createdTime;
            setLoading(true);
            const newEntries = await createNewEntries(records);
            const updatedEntry = await updateGuests([userRecord]);
            setLoading(false);
            if (newEntries.status === 200 && updatedEntry.status === 200) {
                response === 'Yes' && renderConfetti();
                setModalOpen(false);
                setStep('ThankYou');
            };
        }
        else {
            setLoading(true);
            const userRecord = {
                ...record,
                fields: {
                    ...record.fields,
                    changedBy: record.id,
                    response: response as RSVPResponse
                }
            };
            delete userRecord.createdTime;
            const updatedEntry = await updateGuests([userRecord]);
            setLoading(false);
            if (updatedEntry.status === 200 && updatedEntry.status === 200) {
                response === 'Yes' && renderConfetti();
                setModalOpen(false);
                setStep('ThankYou');
            };
        };
    };

    return (
        <Modal title='Confirmation'>
            <Form onSubmit={handleSubmit}>  
                <Typography>Please confirm the below information.
                {!!guests.length && '\n\nYour response will update the RSVPs for all guests mentioned below.'}</Typography>  
                <LabelWrapper>
                    <Label>Your Name</Label>
                    <Typography>{getNameFromRecord(record)}</Typography>
                </LabelWrapper>
                <LabelWrapper>
                    <Label>Response</Label>
                    <Typography>{response}</Typography>
                </LabelWrapper>
                {!!guests.length && <LabelWrapper>
                    <Label>Guests</Label>
                    {guests.map(guest => {
                        const { firstName, lastName } = guest;
                        const guestName = `${firstName} ${lastName}`;
                        return (
                            <Typography key={guestName}>{guestName}</Typography>
                        );
                    })}
                </LabelWrapper>}
                <ButtonWrapper>
                    <Button
                        onClick={() => setModalOpen(false)}
                        secondary
                    >
                        <Typography bold>Back</Typography>
                    </Button>
                    <Button
                        type='submit'
                        loading={loading}
                        icon={faPaperPlane}
                    >
                        <Typography bold>Submit</Typography>
                    </Button>
                </ButtonWrapper>
            </Form>
        </Modal>
    );
};

export default RSVPModal;
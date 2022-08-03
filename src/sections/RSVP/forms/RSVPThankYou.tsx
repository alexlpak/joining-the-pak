import React from 'react';
import Button, { ButtonWrapper } from '../../../components/Button';
import Form from '../../../components/Form';
import Typography from '../../../components/Typography';
import { useRSVPFormContext } from '../../../contexts/RSVPFormContext';

const RSVPThankYou: React.FC = () => {
    const { setModalOpen, setStep } = useRSVPFormContext();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Typography>Thank you for responding!</Typography>
            <ButtonWrapper>
                <Button
                    onClick={() => setModalOpen(true)}
                >
                    <Typography bold>View RSVP</Typography>
                </Button>
                <Button
                    secondary
                    onClick={() => setStep('Search')}
                >
                    <Typography bold>Edit RSVP</Typography>
                </Button>
            </ButtonWrapper>
        </Form>
    );
};

export default RSVPThankYou;
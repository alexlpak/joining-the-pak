import React from 'react';
import Form from '../../../components/Form';
import Typography from '../../../components/Typography';
import { useRSVPFormContext } from '../../../contexts/RSVPFormContext';

const RSVPThankYou: React.FC = () => {
    const { response } = useRSVPFormContext();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Typography>Thank you for responding!</Typography>
            {response === 'Yes' && <Typography>We look forward to seeing you at the wedding!</Typography>}
        </Form>
    );
};

export default RSVPThankYou;
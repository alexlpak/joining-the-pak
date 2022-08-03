import React from 'react';
import styled from 'styled-components';
import RSVPSearch from './forms/RSVPSearch';
import RSVPResponse from './forms/RSVPResponse';
import RSVPParty from './forms/RSVPParty';
import RSVPGuests from './forms/RSVPGuests';
import { useRSVPFormContext } from '../../contexts/RSVPFormContext';
import { Steps } from '../../contexts/RSVPFormContext';
import RSVPThankYou from './forms/RSVPThankYou';

const FormWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const RSVPForm: React.FC = () => {
    const { step } = useRSVPFormContext();

    const Steps: Steps = {
        Search: <RSVPSearch />,
        Response: <RSVPResponse />,
        Party: <RSVPParty />,
        Guests: <RSVPGuests />,
        ThankYou: <RSVPThankYou />
    };

    return (
        <FormWrapper>
            {Steps[step]}
        </FormWrapper>
    );
};

export default RSVPForm;
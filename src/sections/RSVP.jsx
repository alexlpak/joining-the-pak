import Section from '../components/Section';
import Typography from '../components/Typography';
import { useTheme } from 'styled-components';
import styled from 'styled-components';
import Line from '../components/Line';
import { ImagePlaceholder } from './OurStory';
import Button from '../components/Button';
import Input from '../components/Input';
import { useState } from 'react';
import RSVPImage from '../assets/images/rsvp.jpg';
import { useMediaQuery } from 'react-responsive';
import { addConfetti } from '../utilities/confetti';
import { capitalizeString } from '../helper/text';

const RSVPContentsStyled = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: .5rem;
    width: 100%;
    max-width: 20rem;
    line-height: 1.5;
    text-align: left;
`;

const SectionContentsWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 1.5rem;
    text-align: center;
    @media (max-width: 780px) {
        flex-direction: column;
    }
`;

const FormWrapper = styled.form`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 1rem;
`;

const RSVPSection = () => {
    const theme = useTheme();
    const isMobileDevice = useMediaQuery({
        query: '(max-width: 780px)',
    });
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const handleSubmit = e => {
        e.preventDefault();
        setFirstName('');
        setLastName('');
        addConfetti();
    };

    const handleFocus = e => {
        e.target.focus();
        e.target.select();
    };

    const handleFirstNameChange = e => {
        const { value } = e.target;
        const capitalizedValue = capitalizeString(value);
        const regex = /^[A-Za-z]*$/g;
        const validInput = regex.test(value)
        if (validInput) setFirstName(() => capitalizedValue);
    };

    const handleLastNameChange = e => {
        const { value } = e.target;
        const capitalizedValue = capitalizeString(value);
        const regex = /^[A-Za-z]*$/g;
        const validInput = regex.test(value)
        if (validInput) setLastName(() => capitalizedValue);
    };

    return (
        <Section id='rsvp' color={theme.colors.main}>
            <SectionContentsWrapper>                
                <RSVPContentsStyled>
                    <Typography type='header' color='white'>RSVP</Typography>
                    <Typography color='white'>Please enter your first and last name.</Typography>
                    <FormWrapper onSubmit={handleSubmit}>
                        <Input
                            onFocus={handleFocus}
                            required
                            value={firstName}
                            onChange={handleFirstNameChange}
                            placeholder='First Name'
                        />
                        <Input
                            onFocus={handleFocus}
                            required
                            value={lastName}
                            onChange={handleLastNameChange}
                            placeholder='Last Name'
                        />
                        <Button
                        type='submit'
                        disabled={!(firstName && lastName)}
                        $secondary
                        >
                            <Typography bold>Submit</Typography>
                        </Button>
                    </FormWrapper>
                </RSVPContentsStyled>
                <Line orientation={isMobileDevice ? 'horizontal' : 'vertical'} length='20rem' color='white' />
                <ImagePlaceholder $backgroundImage={RSVPImage} />
            </SectionContentsWrapper>
        </Section>
    );
};

export default RSVPSection;
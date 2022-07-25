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

const RSVPContentsStyled = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: .5rem;
    width: 20rem;
    line-height: 1.5;
    text-align: left;
`;

const SectionContentsWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 1.5rem;
    text-align: center;
`;

const FormWrapper = styled.form`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 1rem;
`;

const RSVPSection = () => {
    const theme = useTheme();
    const [submitted, setSubmitted] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const handleSubmit = e => {
        e.preventDefault();
        setFirstName('');
        setLastName('');
        setSubmitted(true);
    };

    const handleFirstNameChange = e => {
        const { value } = e.target;
        setFirstName(() => value);
    };

    const handleLastNameChange = e => {
        const { value } = e.target;
        setLastName(() => value);
    };

    return (
        <Section color={theme.colors.main}>
            <SectionContentsWrapper>                
                <RSVPContentsStyled>
                    <Typography type='header' color='white'>RSVP</Typography>
                    <Typography color='white'>Please enter your first and last name to look up your RSVP.</Typography>
                    <FormWrapper onSubmit={handleSubmit}>
                        <Input value={firstName} onChange={handleFirstNameChange} placeholder='First Name' />
                        <Input value={lastName} onChange={handleLastNameChange} placeholder='Last Name' />
                        <Button secondary>Submit</Button>
                    </FormWrapper>
                </RSVPContentsStyled>
                <Line orientation='vertical' length='20rem' color='white' />
                <ImagePlaceholder $backgroundImage={RSVPImage} />
            </SectionContentsWrapper>
        </Section>
    );
};

export default RSVPSection;
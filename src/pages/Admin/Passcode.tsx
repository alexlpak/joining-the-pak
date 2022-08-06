import React, { useState } from 'react';
import Form from '../../components/Form';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Typography, { Heading } from '../../components/Typography';
import { faUnlock } from '@fortawesome/free-solid-svg-icons';
import Section from '../../components/Section';
import { useTheme } from 'styled-components';
import { FormFieldValue } from '../../types/forms';
import { validatePasscode } from '../../api/admin';
import { useAdminContext } from '../../contexts/AdminContext';

type FormValue = {
    passcode: string;
};

const Passcode: React.FC = () => {
    const initValue: FormValue = {
        passcode: ''
    };
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [value, setValue] = useState(initValue);

    const { setValidated } = useAdminContext();

    const theme = useTheme();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const validPasscode = await validatePasscode(value.passcode);
        console.log(validPasscode);
        setLoading(false);
        if (validPasscode) {
            if (error) setError('');
            setValue(initValue);
            setValidated(true);
        }
        else {
            setError('The passcode you entered is incorrect.');
            setValue(initValue);
        };
    };

    const handleChange = (value: FormFieldValue) => {
        setValue((prev) => ({ ...prev, ...value }));
    };

    return (
        <Section centered color={theme.colors.main}>
            <Form onSubmit={handleSubmit} error={error}>
                <Heading>RSVP Management</Heading>
                <Typography>Please enter the passcode to continue.</Typography>
                <Input
                    name='passcode'
                    type='password'
                    placeholder='Passcode'
                    onChange={handleChange}
                    initValue={value.passcode}
                />
                <Button loading={loading} icon={faUnlock} type='submit'>
                    <Typography bold>Unlock</Typography>
                </Button>
            </Form>
        </Section>
    );
};

export default Passcode;
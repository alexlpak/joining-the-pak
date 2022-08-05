import React, { useState, useCallback } from 'react';
import Form from '../../../components/Form';
import Typography from '../../../components/Typography';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import { FormFieldValue } from '../../../types/forms';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { getRSVPByFirstAndLastName } from '../../../api/guests';
import { useRSVPFormContext } from '../../../contexts/RSVPFormContext';

interface FormValue {
    firstName: string;
    lastName: string;
};

const RSVPSearch: React.FC = () => {
    const initValue = {
        firstName: '',
        lastName: ''
    };

    const [value, setValue] = useState<FormValue>(initValue);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const { setRecord, setStep } = useRSVPFormContext();

    const handleChange = useCallback((value: FormFieldValue) => {
        setValue((prev) => ({ ...prev, ...value }));
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const rsvp = await getRSVPByFirstAndLastName(value.firstName, value.lastName);
        setLoading(false);
        if (rsvp.length) {
            setError('');
            setRecord(rsvp[0]);
            setStep('Response');
        }
        else {
            setError('RSVP not found. Please make sure your first and last name is spelled correctly.');
            setValue(initValue);
        };
    };

    return (
        <Form onSubmit={handleSubmit} error={error}>
            <Typography>Please enter your first and last name to begin.</Typography>
            <Input
                type='text'
                name='firstName'
                placeholder='First Name'
                initValue={value.firstName}
                onChange={handleChange}
                required
            />
            <Input
                type='text'
                name='lastName'
                placeholder='Last Name'
                initValue={value.lastName}
                onChange={handleChange}
                required
            />
            <Button
                type='submit'
                loading={loading}
                disabled={!(value.firstName && value.lastName)}
                icon={faSearch}
                secondary
            >
                <Typography bold>Search</Typography>
            </Button>
        </Form>
    );
};

export default RSVPSearch;
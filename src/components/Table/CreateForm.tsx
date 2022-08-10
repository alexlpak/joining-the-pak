import React, { useState } from 'react';
import Form from '../Form';
import Input from '../Input';
import Select from '../Select';
import Button, { ButtonWrapper } from '../Button';
import { useAdminContext } from '../../contexts/AdminContext';
import { FormFieldValue } from '../../types/forms';
import Typography from '../Typography';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { createNewEntries, GuestEntry } from '../../api/guests';

const CreateForm: React.FC = () => {
    const [value, setValue] = useState({} as GuestEntry);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const { setModalOpen, getRecords, records } = useAdminContext();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await createNewEntries([{ fields: {
                ...value,
                allowedGuests: value.allowedGuests || 0,
                type: 'Invited',
                changedBy: 'System'
            } }]);
            setLoading(false);
            setModalOpen(false);
            await getRecords();
        }
        catch {
            setLoading(false);
            setError('Failed to create a new entry. Please try again later.');
        };
    };

    const handleChange = (value: FormFieldValue) => {
        setValue((prev) => ({ ...prev, ...value }));
    };

    const guestExistsInRecords = (first: string, last: string) => {
        return records.some(record => {
            return record.fields.firstName.toLowerCase() === first.toLowerCase()
            && record.fields.lastName.toLowerCase() === last.toLowerCase()
        });
    };

    return (
        <Form onSubmit={handleSubmit} error={error} secondary>
            <Input
                focus
                name='firstName'
                placeholder='First Name'
                capitalize
                type='text'
                onChange={handleChange}
                required
            />
            <Input
                name='lastName'
                placeholder='Last Name'
                capitalize
                type='text'
                onChange={handleChange}
                required
            />
            <Input
                name='allowedGuests'
                placeholder='Allowed Guests'
                type='number'
                onChange={handleChange}
                disabled={!!value?.partyId}
            />
            <Input
                name='partyId'
                placeholder='Party ID'
                type='text'
                onChange={handleChange}
                disabled={value?.allowedGuests && value?.allowedGuests > 0 || false}
            />
            <Select
                options={['Yes', 'No']}
                onChange={handleChange}
                name='response'
                placeholder='Response'
            />
            <ButtonWrapper>
                <Button secondary onClick={() => setModalOpen(false)} disabled={loading}>
                    <Typography bold>Cancel</Typography>
                </Button>
                <Button type='submit' icon={faPaperPlane} loading={loading} disabled={!(value.firstName && value.lastName) || guestExistsInRecords(value.firstName, value.lastName) || loading}>
                    <Typography bold>Submit</Typography>
                </Button>
            </ButtonWrapper>
        </Form>
    );
};

export default CreateForm;